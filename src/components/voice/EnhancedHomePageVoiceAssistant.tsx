
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
  const { toast } = useToast();
  const location = useLocation();
  
  // Refs for cleanup
  const recognitionRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<number | null>(null);
  
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
  };

  // Get contextual greeting based on page
  const getContextualGreeting = (pathname: string): string => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    if (pathname === '/') {
      return `${timeGreeting}! Welcome to PREPZR, the world's first emotionally intelligent exam preparation platform. I'm Sakha AI, your adaptive learning companion. I can help you navigate our features or answer questions about your exam preparation journey. Try saying "Sign up", "Take demo", or "Analyze my readiness".`;
    } else if (pathname.includes('/signup')) {
      return `${timeGreeting}! Welcome to PREPZR signup. I'm Sakha AI, and I can assist you through the registration process. You can use voice commands like "Next", "Continue", or ask me questions anytime.`;
    } else if (pathname.includes('/login')) {
      return `${timeGreeting}! Welcome back to PREPZR. I'm here to help you access your personalized learning dashboard. Say "Demo login" for a quick preview or ask me anything about our features.`;
    } else if (pathname.includes('/exam-readiness')) {
      return `${timeGreeting}! Our AI-powered exam readiness analyzer will evaluate your preparation level and create a personalized study plan. I'll guide you through the assessment process.`;
    }
    
    return `${timeGreeting}! Welcome to PREPZR. I'm Sakha AI, your intelligent exam preparation assistant.`;
  };

  // Speak with female voice preference and correct pronunciation
  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create utterance with correct PREPZR pronunciation
    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/g, 'PREP-zar'); // Correct pronunciation
    speech.lang = language;
    speech.rate = 1.0; // Natural speed
    speech.pitch = 1.1; // Slightly higher for pleasant female voice
    speech.volume = 0.9;

    // Get available voices and prefer female voices
    const voices = window.speechSynthesis.getVoices();
    
    // Priority list for female voices
    const preferredFemaleVoices = [
      'Google US English Female',
      'Microsoft Zira Desktop',
      'Microsoft Zira',
      'Samantha',
      'Karen',
      'Victoria',
      'Female'
    ];

    // Find best female voice
    let selectedVoice = null;
    for (const voiceName of preferredFemaleVoices) {
      const voice = voices.find(v => 
        v.name?.toLowerCase().includes(voiceName.toLowerCase()) ||
        (voiceName === 'Female' && v.name?.toLowerCase().includes('female'))
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
    speech.onstart = () => console.log('Voice greeting started');
    speech.onend = () => {
      console.log('Voice greeting completed');
      // Start listening after greeting
      setTimeout(() => {
        if (!isMuted && shouldActivate) {
          startVoiceRecognition();
        }
      }, 1000);
    };
    speech.onerror = (e) => {
      console.error('Speech error:', e);
      // Try to start recognition anyway
      setTimeout(() => {
        if (!isMuted && shouldActivate) {
          startVoiceRecognition();
        }
      }, 1000);
    };

    speechRef.current = speech;
    window.speechSynthesis.speak(speech);
  };

  // Voice recognition setup
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
      };
      
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
        
        // Auto-restart after delay if still on valid page
        if (!isMuted && shouldActivate && document.visibilityState === 'visible') {
          timeoutRef.current = window.setTimeout(() => {
            startVoiceRecognition();
          }, 3000);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        recognitionRef.current = null;
        
        // Restart on recoverable errors
        if (event.error !== 'aborted' && !isMuted && shouldActivate) {
          timeoutRef.current = window.setTimeout(() => {
            startVoiceRecognition();
          }, 5000);
        }
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log('Voice command:', transcript);
        
        // Handle commands based on current page
        handleVoiceCommand(transcript);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  };

  // Handle voice commands with intelligent routing
  const handleVoiceCommand = (command: string) => {
    // Navigation commands
    if (command.includes('sign up') || command.includes('signup') || command.includes('register')) {
      window.location.href = '/signup';
      speakMessage('Taking you to sign up page.');
    } else if (command.includes('login') || command.includes('log in')) {
      window.location.href = '/login';
      speakMessage('Taking you to login page.');
    } else if (command.includes('demo') || command.includes('try demo')) {
      window.location.href = '/login';
      speakMessage('Opening demo access.');
    } else if (command.includes('home') || command.includes('go home')) {
      window.location.href = '/';
      speakMessage('Going to home page.');
    } else if (command.includes('analyze') || command.includes('readiness') || command.includes('assessment')) {
      // Trigger exam readiness analyzer
      window.dispatchEvent(new Event('open-exam-analyzer'));
      speakMessage('Opening your exam readiness analysis.');
    } else if (command.includes('help') || command.includes('what can you do')) {
      const helpMessage = `I can help you navigate PREPZR. Try saying: Sign up, Login, Demo, Analyze readiness, or ask me about our features.`;
      speakMessage(helpMessage);
    } else if (command.includes('features') || command.includes('what is prepzr')) {
      const featuresMessage = `PREPZR is an AI-powered exam preparation platform that adapts to your learning style and emotional state. We provide personalized study plans, concept cards, practice exams, and emotional support for competitive exams like JEE, NEET, UPSC, and CAT.`;
      speakMessage(featuresMessage);
    } else {
      // Generic response for unrecognized commands
      const responses = [
        "I didn't catch that. Try saying 'Sign up', 'Demo', or 'Help' for assistance.",
        "Please repeat that. You can say commands like 'Login', 'Analyze readiness', or ask about our features.",
        "Could you try again? Say 'Help' to hear what I can do for you."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      speakMessage(randomResponse);
    }
  };

  // Main effect for page changes and initialization
  useEffect(() => {
    // Cleanup previous instances
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

    // Force voices to load, then start greeting immediately
    const initializeVoice = () => {
      if (window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0 && !hasGreeted && !isMuted) {
          setHasGreeted(true);
          const greeting = getContextualGreeting(location.pathname);
          
          // Start greeting after short delay to ensure page is loaded
          timeoutRef.current = window.setTimeout(() => {
            speakMessage(greeting);
            
            // Show helpful toast
            toast({
              title: "Sakha AI Voice Assistant Active",
              description: "Say 'Help' to hear available commands",
              duration: 4000,
            });
          }, 1500);
        }
      }
    };

    // Load voices and initialize
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        initializeVoice();
      };
      
      // Trigger voice loading
      window.speechSynthesis.getVoices();
      
      // Fallback initialization
      setTimeout(initializeVoice, 1000);
    }

    // Cleanup on unmount
    return cleanup;
  }, [location.pathname, shouldActivate, hasGreeted, isMuted]);

  // Listen for mute events
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

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanup();
      } else if (document.visibilityState === 'visible' && shouldActivate && !isMuted) {
        // Restart recognition when page becomes visible
        setTimeout(() => {
          if (!recognitionRef.current) {
            startVoiceRecognition();
          }
        }, 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [shouldActivate, isMuted]);

  return null; // This component renders no UI
};

export default EnhancedHomePageVoiceAssistant;
