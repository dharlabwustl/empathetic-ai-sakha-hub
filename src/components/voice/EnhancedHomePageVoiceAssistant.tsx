
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  
  // Refs for cleanup
  const recognitionRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  
  // Check if current page should have voice assistant
  const shouldActivate = location.pathname === '/' || 
                        location.pathname.includes('/signup') ||
                        location.pathname.includes('/login') ||
                        location.pathname.includes('/exam-readiness');

  // Cleanup function
  const cleanup = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (error) {
        // Ignore cleanup errors
      }
      recognitionRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    setIsSpeaking(false);
  };

  // Get contextual greeting based on page
  const getContextualGreeting = (pathname: string): string => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    if (pathname === '/') {
      return `${timeGreeting}! Welcome to PREP-zer, the world's first emotionally intelligent exam preparation platform. I'm Sakha AI, your adaptive learning companion. I can help you navigate our features or answer questions about your exam preparation journey. Try saying "Sign up", "Take demo", or "Analyze my readiness".`;
    } else if (pathname.includes('/signup')) {
      return `${timeGreeting}! Welcome to PREP-zer signup. I'm Sakha AI, and I can assist you through the registration process. You can use voice commands like "Next", "Continue", or ask me questions anytime.`;
    } else if (pathname.includes('/login')) {
      return `${timeGreeting}! Welcome back to PREP-zer. I'm here to help you access your personalized learning dashboard. Say "Demo login" for a quick preview or ask me anything about our features.`;
    } else if (pathname.includes('/exam-readiness')) {
      return `${timeGreeting}! Our AI-powered exam readiness analyzer will evaluate your preparation level and create a personalized study plan. I'll guide you through the assessment process.`;
    }
    
    return `${timeGreeting}! Welcome to PREP-zer. I'm Sakha AI, your intelligent exam preparation assistant.`;
  };

  // Speak with female voice preference and correct pronunciation
  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Set speaking state to true
    setIsSpeaking(true);

    // Create utterance with correct PREP-zer pronunciation
    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/g, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
    speech.lang = language;
    speech.rate = 1.0; // Natural speed
    speech.pitch = 1.15; // Pleasant, confident female tone
    speech.volume = 0.9;

    // Get available voices and prefer female voices
    const voices = window.speechSynthesis.getVoices();
    
    // Priority list for female voices with pleasant, confident tone
    const preferredFemaleVoices = [
      'Google US English Female',
      'Microsoft Zira Desktop',
      'Microsoft Zira',
      'Samantha',
      'Karen',
      'Victoria',
      'Alice',
      'Emma',
      'Moira'
    ];

    // Find best female voice
    let selectedVoice = null;
    for (const voiceName of preferredFemaleVoices) {
      const voice = voices.find(v => 
        v.name?.toLowerCase().includes(voiceName.toLowerCase())
      );
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }

    // Fallback to any available female voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.name?.toLowerCase().includes('female') && 
        !v.name?.toLowerCase().includes('male')
      );
    }

    // Final fallback to first available voice
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0];
    }

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    // Event handlers
    speech.onstart = () => {
      console.log('Voice greeting started');
      setIsSpeaking(true);
      
      // Show a visual indicator that the assistant is speaking
      document.dispatchEvent(new CustomEvent('voice-assistant-speaking', { 
        detail: { speaking: true }
      }));
    };
    
    speech.onend = () => {
      console.log('Voice greeting completed');
      setIsSpeaking(false);
      
      // Update visual indicator
      document.dispatchEvent(new CustomEvent('voice-assistant-speaking', { 
        detail: { speaking: false }
      }));
      
      // Start listening after greeting with smart delay
      setTimeout(() => {
        if (!isMuted && shouldActivate) {
          startVoiceRecognition();
        }
      }, 1000);
    };
    
    speech.onerror = (e) => {
      console.error('Speech error:', e);
      setIsSpeaking(false);
      
      // Update visual indicator
      document.dispatchEvent(new CustomEvent('voice-assistant-speaking', { 
        detail: { speaking: false }
      }));
      
      // Try to start recognition anyway with smart delay
      setTimeout(() => {
        if (!isMuted && shouldActivate) {
          startVoiceRecognition();
        }
      }, 1500);
    };

    speechRef.current = speech;
    window.speechSynthesis.speak(speech);
  };

  // Voice recognition setup with intelligent command handling
  const startVoiceRecognition = () => {
    if (!shouldActivate || isMuted || recognitionRef.current) return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      
      recognition.onstart = () => {
        setIsListening(true);
        // Notify UI that we're listening
        document.dispatchEvent(new CustomEvent('voice-assistant-listening', { 
          detail: { listening: true }
        }));
      };
      
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
        
        // Notify UI that we're no longer listening
        document.dispatchEvent(new CustomEvent('voice-assistant-listening', { 
          detail: { listening: false }
        }));
        
        // Smart breaks - auto-restart with appropriate delays
        if (!isMuted && shouldActivate && document.visibilityState === 'visible') {
          retryTimeoutRef.current = window.setTimeout(() => {
            startVoiceRecognition();
          }, 3000); // 3 second break between recognition sessions
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        recognitionRef.current = null;
        
        // Notify UI that we're no longer listening
        document.dispatchEvent(new CustomEvent('voice-assistant-listening', { 
          detail: { listening: false }
        }));
        
        // Smart retry based on error type
        const retryDelay = event.error === 'network' ? 8000 : 
                          event.error === 'audio' ? 6000 : 5000;
        
        if (event.error !== 'aborted' && !isMuted && shouldActivate) {
          retryTimeoutRef.current = window.setTimeout(() => {
            startVoiceRecognition();
          }, retryDelay);
        }
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log('Voice command:', transcript);
        
        // Prevent rapid commands
        const now = Date.now();
        if (now - lastCommandTimeRef.current < 3000) {
          return;
        }
        lastCommandTimeRef.current = now;
        
        // Handle intelligent voice commands
        handleVoiceCommand(transcript);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      
    } catch (error) {
      console.error('Error starting recognition:', error);
      // Retry with longer delay on error
      retryTimeoutRef.current = window.setTimeout(() => {
        startVoiceRecognition();
      }, 6000);
    }
  };

  // Handle intelligent voice commands with smart routing
  const handleVoiceCommand = (command: string) => {
    // Navigation commands
    if (command.includes('sign up') || command.includes('signup') || command.includes('register')) {
      window.location.href = '/signup';
      speakMessage('Taking you to sign up page.');
    } else if (command.includes('login') || command.includes('log in')) {
      window.location.href = '/login';
      speakMessage('Taking you to login page.');
    } else if (command.includes('demo') || command.includes('try demo') || command.includes('take demo')) {
      window.location.href = '/login';
      speakMessage('Opening demo access.');
    } else if (command.includes('home') || command.includes('go home')) {
      window.location.href = '/';
      speakMessage('Going to home page.');
    } else if (command.includes('analyze') || command.includes('readiness') || command.includes('assessment') || command.includes('analyze my readiness')) {
      // Trigger exam readiness analyzer
      window.dispatchEvent(new Event('open-exam-analyzer'));
      speakMessage('Opening your exam readiness analysis.');
    } else if (command.includes('help') || command.includes('what can you do')) {
      const helpMessage = `I can help you navigate PREP-zer. Try saying: Sign up, Login, Demo, Analyze readiness, or ask me about our features.`;
      speakMessage(helpMessage);
    } else if (command.includes('features') || command.includes('what is prepzr') || command.includes('what is prep-zer')) {
      const featuresMessage = `PREP-zer is an AI-powered exam preparation platform that adapts to your learning style and emotional state. We provide personalized study plans, concept cards, practice exams, and emotional support for competitive exams like JEE, NEET, UPSC, and CAT.`;
      speakMessage(featuresMessage);
    } else if (command.includes('mute') || command.includes('stop') || command.includes('quiet')) {
      setIsMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      cleanup();
      speakMessage('Voice assistant muted. You can unmute in settings.');
    } else {
      // Smart response for unrecognized commands
      const responses = [
        "I didn't catch that. Try saying 'Sign up', 'Demo', or 'Help' for assistance.",
        "Please repeat that. You can say commands like 'Login', 'Analyze readiness', or ask about our features.",
        "Could you try again? Say 'Help' to hear what I can do for you."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      speakMessage(randomResponse);
    }
  };

  // Initialize voices separately to ensure they're loaded
  useEffect(() => {
    if (window.speechSynthesis) {
      // Force voice loading
      window.speechSynthesis.getVoices();
      
      // Setup event listener for when voices are loaded
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          console.log("Voices loaded:", window.speechSynthesis.getVoices().length);
        };
      }
    }
  }, []);

  // Main effect for instant greeting and page changes
  useEffect(() => {
    // Better cleanup on page changes
    cleanup();
    setHasGreeted(false);
    setIsListening(false);

    // Check mute preference
    const mutePref = localStorage.getItem('voice_assistant_muted');
    if (mutePref === 'true') {
      setIsMuted(true);
      return;
    }

    // Only activate on valid pages
    if (!shouldActivate) return;

    // Instant greeting with minimal delay for page loading
    const initializeVoice = () => {
      if (window.speechSynthesis && !hasGreeted && !isMuted) {
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
          setHasGreeted(true);
          const greeting = getContextualGreeting(location.pathname);
          
          // Very short delay to ensure page has loaded
          timeoutRef.current = window.setTimeout(() => {
            speakMessage(greeting);
            
            // Show helpful toast
            toast({
              title: "Sakha AI Voice Assistant Active",
              description: "Say 'Help' to hear available commands",
              duration: 4000,
            });
          }, 300); // Just 0.3 second delay for immediate greeting
        }
      }
    };

    // Load voices and initialize
    if (window.speechSynthesis) {
      // Force voices to load
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          initializeVoice();
        } else {
          // Retry if voices not loaded yet
          setTimeout(loadVoices, 50);
        }
      };

      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        initializeVoice();
      };
      
      // Trigger voice loading
      loadVoices();
    }

    // Cleanup on unmount
    return cleanup;
  }, [location.pathname, shouldActivate, hasGreeted, isMuted]);

  // Listen for mute/unmute events
  useEffect(() => {
    const handleMute = () => {
      setIsMuted(true);
      cleanup();
    };
    
    const handleUnmute = () => {
      setIsMuted(false);
      if (shouldActivate && !hasGreeted) {
        const greeting = getContextualGreeting(location.pathname);
        setTimeout(() => speakMessage(greeting), 500);
      }
    };

    document.addEventListener('voice-assistant-mute', handleMute);
    document.addEventListener('voice-assistant-unmute', handleUnmute);

    return () => {
      document.removeEventListener('voice-assistant-mute', handleMute);
      document.removeEventListener('voice-assistant-unmute', handleUnmute);
    };
  }, [shouldActivate, hasGreeted, location.pathname]);

  // Handle page visibility changes for better cleanup
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanup();
      } else if (document.visibilityState === 'visible' && shouldActivate && !isMuted) {
        // Smart restart when page becomes visible
        setTimeout(() => {
          if (!recognitionRef.current && hasGreeted) {
            startVoiceRecognition();
          }
        }, 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [shouldActivate, isMuted, hasGreeted]);

  return (
    <>
      {/* Visual indicator showing when the assistant is speaking or listening */}
      {(isSpeaking || isListening) && (
        <div className="fixed bottom-24 right-6 z-50 animate-pulse">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-3 shadow-lg flex items-center space-x-2">
            {isSpeaking && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            )}
            {isListening && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            )}
            <span className="text-sm font-medium">
              {isSpeaking ? "Sakha AI is speaking..." : "Listening..."}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedHomePageVoiceAssistant;
