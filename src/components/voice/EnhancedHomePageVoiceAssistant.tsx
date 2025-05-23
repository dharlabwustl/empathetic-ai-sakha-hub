
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
  const [currentPhase, setCurrentPhase] = useState(0); // Track current speaking phase
  const { toast } = useToast();
  const location = useLocation();
  
  // Refs for cleanup
  const recognitionRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  const phaseTimeoutRef = useRef<number | null>(null);
  
  // Check if current page should have voice assistant
  const shouldActivate = location.pathname === '/' || 
                        location.pathname.includes('/signup') ||
                        location.pathname.includes('/login') ||
                        location.pathname.includes('/exam-readiness');

  // Enhanced greeting phases with smart breaks
  const getGreetingPhases = (pathname: string): string[] => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    if (pathname === '/') {
      return [
        // Phase 1: Welcome and Introduction
        `${timeGreeting}! Welcome to PREPZR, India's most advanced exam preparation platform. I'm Sakha AI, your intelligent learning companion.`,
        
        // Phase 2: About PREPZR with correct pronunciation
        `PREPZR is the world's first emotionally intelligent and hyper-personalized exam preparation platform. We use advanced AI to understand not just what you study, but how you feel while studying.`,
        
        // Phase 3: Features Overview
        `Our platform offers personalized study plans, interactive concept cards, AI-powered practice tests, and real-time emotional support. Everything adapts to your unique learning style and emotional state.`,
        
        // Phase 4: Free Trial and Benefits
        `You can start your transformation journey with our 7-day free trial. Experience personalized learning paths for JEE, NEET, UPSC, CAT, and other competitive exams.`,
        
        // Phase 5: Exam Readiness and Success
        `Try our AI Exam Readiness Analysis to discover your strengths and areas for improvement. We'll create a customized study plan that guarantees your success.`,
        
        // Phase 6: Why PREPZR is Superior
        `Unlike other platforms in India that only focus on content delivery, PREPZR understands your emotions, adapts to your mood, and provides psychological support. We're not just teaching concepts - we're building champions.`,
        
        // Phase 7: Global Aspiration
        `Our mission is to become the global leader in exam preparation by revolutionizing how students learn and feel about their studies. Join millions of successful students who trust PREPZR for their exam success.`,
        
        // Phase 8: Call to Action
        `Ready to transform your exam preparation? Say 'Sign up' for free trial, 'Analyze readiness' for assessment, or ask me about any feature. I'm here to guide your success journey.`
      ];
    } else if (pathname.includes('/signup')) {
      return [
        `${timeGreeting}! Welcome to PREPZR signup. You've made an excellent choice for your exam preparation.`,
        `I'm Sakha AI, and I'll assist you through the registration process. You can use voice commands or ask me questions anytime.`,
        `PREPZR will personalize your entire learning experience based on your exam goals and emotional state. Let's get you started on your success journey.`
      ];
    } else if (pathname.includes('/login')) {
      return [
        `${timeGreeting}! Welcome back to PREPZR. I'm here to help you access your personalized learning dashboard.`,
        `Say 'Demo login' for a quick preview, or let me know if you need assistance with anything else.`
      ];
    } else if (pathname.includes('/exam-readiness')) {
      return [
        `${timeGreeting}! Our AI-powered exam readiness analyzer will evaluate your preparation level across all subjects.`,
        `We'll identify your strengths, weaknesses, and create a personalized study plan that adapts to your emotional state and learning patterns.`
      ];
    }
    
    return [`${timeGreeting}! Welcome to PREPZR. I'm Sakha AI, your intelligent exam preparation assistant.`];
  };

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
    if (phaseTimeoutRef.current) {
      clearTimeout(phaseTimeoutRef.current);
      phaseTimeoutRef.current = null;
    }
  };

  // Speak with female voice preference and correct pronunciation
  const speakMessage = (message: string, isLastPhase: boolean = false) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create utterance with correct PREPZR pronunciation
    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/g, 'PREP-ZER').replace(/Prepzr/g, 'PREP-ZER');
    speech.lang = language;
    speech.rate = 0.95; // Slightly slower for clarity
    speech.pitch = 1.1; // Pleasant, confident female tone
    speech.volume = 0.85;

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
    speech.onstart = () => console.log('Voice phase started:', currentPhase);
    speech.onend = () => {
      console.log('Voice phase completed:', currentPhase);
      
      // Start listening after the last phase
      if (isLastPhase) {
        setTimeout(() => {
          if (!isMuted && shouldActivate) {
            startVoiceRecognition();
          }
        }, 1000);
      }
    };
    speech.onerror = (e) => {
      console.error('Speech error:', e);
      // Try to start recognition anyway if it's the last phase
      if (isLastPhase) {
        setTimeout(() => {
          if (!isMuted && shouldActivate) {
            startVoiceRecognition();
          }
        }, 1500);
      }
    };

    speechRef.current = speech;
    window.speechSynthesis.speak(speech);
  };

  // Play greeting phases with smart breaks
  const playGreetingPhases = (phases: string[]) => {
    if (phases.length === 0) return;
    
    const playPhase = (index: number) => {
      if (index >= phases.length || isMuted || !shouldActivate) return;
      
      setCurrentPhase(index);
      const isLastPhase = index === phases.length - 1;
      speakMessage(phases[index], isLastPhase);
      
      // Schedule next phase with smart break (3-4 seconds between phases)
      if (!isLastPhase) {
        phaseTimeoutRef.current = window.setTimeout(() => {
          playPhase(index + 1);
        }, phases[index].length * 50 + 3500); // Adaptive timing based on text length
      }
    };
    
    playPhase(0);
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
      };
      
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
        
        // Smart breaks - auto-restart with appropriate delays
        if (!isMuted && shouldActivate && document.visibilityState === 'visible') {
          retryTimeoutRef.current = window.setTimeout(() => {
            startVoiceRecognition();
          }, 4000); // 4 second break between recognition sessions
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        recognitionRef.current = null;
        
        // Smart retry based on error type
        const retryDelay = event.error === 'network' ? 10000 : 
                          event.error === 'audio' ? 8000 : 6000;
        
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
      }, 8000);
    }
  };

  // Handle intelligent voice commands with smart routing
  const handleVoiceCommand = (command: string) => {
    // Navigation commands
    if (command.includes('sign up') || command.includes('signup') || command.includes('register') || command.includes('free trial')) {
      window.location.href = '/signup';
      speakMessage('Taking you to sign up for your free trial.');
    } else if (command.includes('login') || command.includes('log in')) {
      window.location.href = '/login';
      speakMessage('Taking you to login page.');
    } else if (command.includes('demo') || command.includes('try demo') || command.includes('take demo')) {
      window.location.href = '/login';
      speakMessage('Opening demo access for you to explore PREPZR.');
    } else if (command.includes('home') || command.includes('go home')) {
      window.location.href = '/';
      speakMessage('Going to home page.');
    } else if (command.includes('analyze') || command.includes('readiness') || command.includes('assessment') || command.includes('analyze my readiness')) {
      // Trigger exam readiness analyzer
      window.dispatchEvent(new Event('open-exam-analyzer'));
      speakMessage('Opening your AI-powered exam readiness analysis.');
    } else if (command.includes('help') || command.includes('what can you do')) {
      const helpMessage = `I can help you navigate PREPZR and explain our features. Try saying: Sign up for free trial, Login, Demo, Analyze readiness, or ask about our competitive advantages.`;
      speakMessage(helpMessage);
    } else if (command.includes('features') || command.includes('what is prepzr') || command.includes('what is prep-zer') || command.includes('tell me about prepzr')) {
      const featuresMessage = `PREPZR is India's most advanced exam preparation platform with emotional intelligence. We provide personalized study plans, adaptive learning paths, psychological support, and real-time performance tracking for JEE, NEET, UPSC, and CAT exams.`;
      speakMessage(featuresMessage);
    } else if (command.includes('why prepzr') || command.includes('why choose prepzr') || command.includes('better than others')) {
      const advantageMessage = `PREPZR is superior because we understand your emotions, not just your academic performance. While other platforms only deliver content, we provide psychological support, mood-adaptive learning, and personalized motivation. We're building exam champions, not just teaching concepts.`;
      speakMessage(advantageMessage);
    } else if (command.includes('global') || command.includes('international') || command.includes('worldwide')) {
      const globalMessage = `PREPZR aspires to become the global leader in exam preparation by revolutionizing how students worldwide approach competitive exams. We're expanding our emotionally intelligent platform to help students across all countries achieve their academic dreams.`;
      speakMessage(globalMessage);
    } else if (command.includes('mute') || command.includes('stop') || command.includes('quiet')) {
      setIsMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      cleanup();
      speakMessage('Voice assistant muted. You can unmute in settings.');
    } else {
      // Smart response for unrecognized commands
      const responses = [
        "I didn't catch that. Try saying 'Sign up', 'Demo', 'Features', or 'Why PREPZR' for assistance.",
        "Please repeat that. You can ask about our features, free trial, exam readiness analysis, or why PREPZR is better than other platforms.",
        "Could you try again? Say 'Help' to hear what I can do, or ask about our global aspirations and competitive advantages."
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

  // Main effect for enhanced greeting and page changes
  useEffect(() => {
    // Better cleanup on page changes
    cleanup();
    setHasGreeted(false);
    setIsListening(false);
    setCurrentPhase(0);

    // Check mute preference
    const mutePref = localStorage.getItem('voice_assistant_muted');
    if (mutePref === 'true') {
      setIsMuted(true);
      return;
    }

    // Only activate on valid pages
    if (!shouldActivate) return;

    // Enhanced greeting with phases
    const initializeVoice = () => {
      if (window.speechSynthesis && !hasGreeted && !isMuted) {
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
          setHasGreeted(true);
          const greetingPhases = getGreetingPhases(location.pathname);
          
          // Start with minimal delay for immediate greeting
          timeoutRef.current = window.setTimeout(() => {
            playGreetingPhases(greetingPhases);
            
            // Show helpful toast
            toast({
              title: "Sakha AI Voice Assistant Active",
              description: "Enhanced greeting with smart features explanation. Say 'Help' for commands.",
              duration: 6000,
            });
          }, 800); // Slightly longer delay for enhanced content
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
          setTimeout(loadVoices, 100);
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
        const greetingPhases = getGreetingPhases(location.pathname);
        setTimeout(() => playGreetingPhases(greetingPhases), 500);
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
        }, 2000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [shouldActivate, isMuted, hasGreeted]);

  return null; // This component renders no UI
};

export default EnhancedHomePageVoiceAssistant;
