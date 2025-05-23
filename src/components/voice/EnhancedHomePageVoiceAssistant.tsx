
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [greetingPhase, setGreetingPhase] = useState<'initial' | 'intro' | 'features' | 'complete'>('initial');
  const [audioMuted, setAudioMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Refs for better control
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const phaseTimeoutRef = useRef<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  const activityTimeoutRef = useRef<number | null>(null);
  const greetingPlayedRef = useRef<boolean>(false);
  
  // Check if the current location is appropriate for voice greeting
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome') ||
                            location.pathname.includes('/free-trial') ||
                            location.pathname.includes('/exam-readiness');
  
  // Phased greeting messages with correct PREPZR pronunciation
  const getPhaseMessage = (phase: string, path: string) => {
    // Replace all instances of PREPZR to ensure proper pronunciation
    const correctPronunciation = (text: string) => {
      return text.replace(/PREPZR/gi, 'prep-zer').replace(/Prepzr/g, 'prep-zer');
    };
    
    let message = "";
    
    switch (phase) {
      case 'initial':
        message = "Hello! Welcome to PREPZR. I'm Sakha AI, your personal learning assistant.";
        break;
      
      case 'intro':
        if (path === '/') {
          message = "PREPZR is the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. We understand your mindset, not just the exam content.";
        } else if (path.includes('/signup')) {
          message = "You're on the signup page. I can help you navigate through the registration process using voice commands.";
        } else {
          message = "PREPZR adapts to your unique learning style and emotional state to maximize your exam success.";
        }
        break;
      
      case 'features':
        if (path === '/') {
          message = "Our AI-powered platform offers personalized study plans, adaptive learning paths, and emotional intelligence support for Indian competitive exams like JEE, NEET, UPSC, and CAT. You can use voice commands like 'Sign up', 'Analyze readiness', or 'Go home' to navigate.";
        } else {
          message = "Try voice commands like 'Sign up for free trial', 'Login', or 'Analyze my readiness' to get started.";
        }
        break;
      
      default:
        message = "";
    }
    
    return correctPronunciation(message);
  };
  
  // Enhanced voice synthesis with female preference and correct pronunciation
  const speakMessage = (text: string, callback?: () => void) => {
    if (audioMuted || !('speechSynthesis' in window) || !text.trim()) {
      callback?.();
      return;
    }
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create speech synthesis utterance with correct PREPZR pronunciation
    const speech = new SpeechSynthesisUtterance();
    
    // Ensure correct pronunciation by adding hyphens or syllable breaks
    speech.text = text.replace(/PREPZR/gi, 'prep-zer').replace(/Prepzr/g, 'prep-zer');
    speech.lang = language;
    speech.rate = 0.95; // Slightly slower for clarity
    speech.pitch = 1.1; // Higher pitch for pleasant female voice
    speech.volume = 0.85;
    
    // Get available voices and prefer female voices
    const voices = window.speechSynthesis.getVoices();
    
    // Enhanced voice selection with female preference
    const femaleVoiceKeywords = [
      'female', 'woman', 'samantha', 'zira', 'aria', 'sarah', 'alice', 'karen', 'susan',
      'google us english female', 'microsoft zira', 'google uk english female'
    ];
    
    // First try to find a female voice
    let selectedVoice = null;
    for (const keyword of femaleVoiceKeywords) {
      const voice = voices.find(v => 
        v.name?.toLowerCase().includes(keyword) ||
        (v.name?.toLowerCase().includes('female'))
      );
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }
    
    // If no female voice found, try regional preferences
    if (!selectedVoice) {
      const regionalKeywords = language === 'en-IN' 
        ? ['india', 'en-in', 'indian']
        : ['us', 'en-us', 'american', 'uk', 'en-gb', 'british'];
      
      for (const keyword of regionalKeywords) {
        const voice = voices.find(v => 
          v.lang?.toLowerCase().includes(keyword) ||
          v.name?.toLowerCase().includes(keyword)
        );
        if (voice) {
          selectedVoice = voice;
          break;
        }
      }
    }
    
    // Fallback to any available voice
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0];
    }
    
    if (selectedVoice) {
      speech.voice = selectedVoice;
    }
    
    // Event handlers
    speech.onstart = () => {
      setLastActivityTime(Date.now());
    };
    
    speech.onend = () => {
      setLastActivityTime(Date.now());
      callback?.();
    };
    
    speech.onerror = (e) => {
      console.error("Speech synthesis error", e);
      callback?.();
    };
    
    speechRef.current = speech;
    window.speechSynthesis.speak(speech);
  };
  
  // Enhanced command processing with intelligent breaks
  const processVoiceCommand = (transcript: string) => {
    const lowerTranscript = transcript.toLowerCase();
    
    // Prevent rapid fire commands
    const now = Date.now();
    if (now - lastCommandTimeRef.current < 2000) {
      return;
    }
    lastCommandTimeRef.current = now;
    setLastActivityTime(now);
    
    console.log("Voice command recognized:", transcript);
    
    // Get context-aware response based on current page
    const getContextAwareResponse = (command: string): string => {
      const path = location.pathname;
      
      if (path === '/') {
        if (command.includes('what is') || command.includes('tell me about')) {
          return "PREPZR is an advanced AI-powered exam preparation platform that adapts to your unique learning style and emotional state. It helps you prepare for competitive exams like JEE, NEET, UPSC, and CAT with personalized study plans.";
        } else if (command.includes('feature') || command.includes('offer')) {
          return "PREPZR offers AI-powered personalized study plans, emotional intelligence support, adaptive learning paths, comprehensive analytics, and performance tracking. Would you like to learn more about any specific feature?";
        }
      } else if (path.includes('/signup')) {
        if (command.includes('help') || command.includes('how')) {
          return "To sign up, fill in your details in the form and click the Sign Up button. You can also use the demo option to explore PREPZR without creating an account.";
        }
      } else if (path.includes('/exam-readiness')) {
        if (command.includes('how') || command.includes('work')) {
          return "The Exam Readiness Analyzer evaluates your current preparation level and provides personalized recommendations to improve your readiness score. Just answer a few questions to get started.";
        }
      }
      
      return "";
    };
    
    // Navigation commands
    if (lowerTranscript.includes('signup') || lowerTranscript.includes('sign up') || lowerTranscript.includes('register')) {
      speakMessage("Taking you to the signup page now.");
      navigate('/signup');
    } else if (lowerTranscript.includes('login') || lowerTranscript.includes('log in') || lowerTranscript.includes('sign in')) {
      speakMessage("Opening the login page.");
      navigate('/login');
    } else if (lowerTranscript.includes('home') || lowerTranscript.includes('go home') || lowerTranscript.includes('main page')) {
      speakMessage("Going to the home page.");
      navigate('/');
    } else if (lowerTranscript.includes('demo')) {
      speakMessage("Opening the demo login.");
      navigate('/login');
      setTimeout(() => {
        const demoButton = document.querySelector('button[role="demo-login"]');
        if (demoButton) (demoButton as HTMLButtonElement).click();
      }, 1000);
    } else if (lowerTranscript.includes('analyze') || lowerTranscript.includes('readiness') || lowerTranscript.includes('assessment')) {
      speakMessage("Opening the exam readiness analyzer.");
      window.dispatchEvent(new Event('open-exam-analyzer'));
    } else if (lowerTranscript.includes('tell me more') || lowerTranscript.includes('learn more') || lowerTranscript.includes('features')) {
      const contextResponse = getContextAwareResponse(lowerTranscript);
      if (contextResponse) {
        speakMessage(contextResponse);
      } else {
        speakMessage("PREPZR offers AI-powered study plans, emotional intelligence support, adaptive learning, and comprehensive analytics for your exam preparation journey.");
      }
    } else if (lowerTranscript.includes('help') || lowerTranscript.includes('what can you do')) {
      speakMessage("I can help you navigate PREPZR using voice commands. Try saying 'Sign up', 'Login', 'Analyze readiness', or ask me to tell you more about our features.");
    } else {
      // Try to get context-aware response
      const contextResponse = getContextAwareResponse(lowerTranscript);
      if (contextResponse) {
        speakMessage(contextResponse);
      } else {
        speakMessage("I didn't understand that command. Try saying 'Sign up', 'Login', 'Analyze readiness', or 'Tell me more about features'.");
      }
    }
  };
  
  // Setup enhanced speech recognition
  const setupVoiceRecognition = () => {
    if (recognitionRef.current || audioMuted || !shouldPlayGreeting) {
      return;
    }
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return;
    }
    
    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = language;
      
      recognition.onstart = () => {
        setIsListening(true);
        setLastActivityTime(Date.now());
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        processVoiceCommand(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        
        // Restart with intelligent breaks based on activity
        if (shouldPlayGreeting && !audioMuted && document.visibilityState === 'visible') {
          const timeSinceActivity = Date.now() - lastActivityTime;
          const restartDelay = timeSinceActivity > 30000 ? 10000 : 3000; // Longer delay if inactive
          
          timeoutRef.current = window.setTimeout(() => {
            if (!recognitionRef.current) {
              setupVoiceRecognition();
            }
          }, restartDelay);
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        
        const restartDelay = (event.error === 'network' || event.error === 'audio') ? 8000 : 5000;
        
        if (shouldPlayGreeting && !audioMuted && document.visibilityState === 'visible') {
          timeoutRef.current = window.setTimeout(() => {
            recognitionRef.current = null;
            setupVoiceRecognition();
          }, restartDelay);
        }
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      
    } catch (error) {
      console.error("Error setting up recognition:", error);
    }
  };
  
  // Phased greeting system with intelligent timing
  const startPhasedGreeting = () => {
    if (audioMuted || !shouldPlayGreeting || greetingPhase !== 'initial' || greetingPlayedRef.current) {
      return;
    }
    
    // Mark greeting as played to prevent duplicate greetings
    greetingPlayedRef.current = true;
    
    // Phase 1: Initial greeting - Start immediately
    speakMessage(getPhaseMessage('initial', location.pathname), () => {
      setGreetingPhase('intro');
      
      // Intelligent pause before next phase
      phaseTimeoutRef.current = window.setTimeout(() => {
        if (!audioMuted && shouldPlayGreeting) {
          speakMessage(getPhaseMessage('intro', location.pathname), () => {
            setGreetingPhase('features');
            
            // Longer pause before features
            phaseTimeoutRef.current = window.setTimeout(() => {
              if (!audioMuted && shouldPlayGreeting) {
                speakMessage(getPhaseMessage('features', location.pathname), () => {
                  setGreetingPhase('complete');
                  
                  // Start voice recognition after greeting completes
                  setTimeout(() => {
                    if (!audioMuted) {
                      setupVoiceRecognition();
                    }
                  }, 1000);
                  
                  // Show helpful toast
                  toast({
                    title: "Sakha AI Voice Assistant Active",
                    description: "Try commands like 'Sign up', 'Login', or 'Analyze readiness'",
                    duration: 6000,
                  });
                });
              }
            }, 1500); // Reduced pause between phases for better user experience
          });
        }
      }, 1200); // Reduced pause between phases for better user experience
    });
  };
  
  // Cleanup function
  const cleanupVoiceResources = () => {
    // Stop speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Clear timeouts
    [timeoutRef, phaseTimeoutRef, activityTimeoutRef].forEach(ref => {
      if (ref.current) {
        clearTimeout(ref.current);
        ref.current = null;
      }
    });
    
    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onstart = null;
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (error) {
        // Ignore cleanup errors
      } finally {
        recognitionRef.current = null;
      }
    }
    
    setIsListening(false);
  };
  
  // Activity monitoring for intelligent breaks
  useEffect(() => {
    const handleUserActivity = () => {
      setLastActivityTime(Date.now());
    };
    
    // Monitor user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });
    
    // Check for inactivity and pause recognition
    const checkInactivity = () => {
      const timeSinceActivity = Date.now() - lastActivityTime;
      
      if (timeSinceActivity > 60000 && isListening) { // 1 minute of inactivity
        cleanupVoiceResources();
        
        // Restart after a longer break
        activityTimeoutRef.current = window.setTimeout(() => {
          if (!audioMuted && shouldPlayGreeting && document.visibilityState === 'visible') {
            setupVoiceRecognition();
          }
        }, 30000);
      }
    };
    
    const inactivityInterval = setInterval(checkInactivity, 10000); // Check every 10 seconds
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
      clearInterval(inactivityInterval);
    };
  }, [isListening, lastActivityTime, audioMuted, shouldPlayGreeting]);
  
  // Check if we should autoplay based on browser session
  useEffect(() => {
    // Check if this is the first visit of the session
    const isFirstVisit = sessionStorage.getItem('voiceGreetingPlayed') !== 'true';
    
    // If first visit and should play greeting, then load voices and prepare
    if (isFirstVisit && shouldPlayGreeting && !audioMuted) {
      // Force load voices first
      if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
        
        // Handle browsers that load voices asynchronously
        window.speechSynthesis.onvoiceschanged = () => {
          // Immediate start greeting after voices load
          setTimeout(() => {
            startPhasedGreeting();
          }, 800);
        };
        
        // Set visited flag
        sessionStorage.setItem('voiceGreetingPlayed', 'true');
      }
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);
  
  // Main effect for page changes and initialization
  useEffect(() => {
    cleanupVoiceResources();
    setGreetingPhase('initial');
    greetingPlayedRef.current = false;
    
    // Load mute preference
    const muteSetting = localStorage.getItem('voice_assistant_muted');
    if (muteSetting === 'true') {
      setAudioMuted(true);
      return;
    }
    
    // Start with small delay to prevent overlapping 
    if (shouldPlayGreeting && !audioMuted) {
      const initTimer = setTimeout(() => {
        startPhasedGreeting();
      }, 800);
      
      return () => clearTimeout(initTimer);
    }
    
    return cleanupVoiceResources;
  }, [location.pathname]);
  
  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanupVoiceResources();
      } else if (document.visibilityState === 'visible' && !audioMuted && shouldPlayGreeting) {
        setTimeout(() => {
          if (greetingPhase === 'complete') {
            setupVoiceRecognition();
          } else {
            startPhasedGreeting();
          }
        }, 1000);
      }
    };
    
    // Custom event listeners
    const handleMuteEvent = () => {
      setAudioMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      cleanupVoiceResources();
    };
    
    const handleUnmuteEvent = () => {
      setAudioMuted(false);
      localStorage.setItem('voice_assistant_muted', 'false');
      setGreetingPhase('initial');
      greetingPlayedRef.current = false;
      setTimeout(() => {
        startPhasedGreeting();
      }, 500);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('voice-assistant-mute', handleMuteEvent);
    document.addEventListener('voice-assistant-unmute', handleUnmuteEvent);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('voice-assistant-mute', handleMuteEvent);
      document.removeEventListener('voice-assistant-unmute', handleUnmuteEvent);
      cleanupVoiceResources();
    };
  }, [greetingPhase, audioMuted, shouldPlayGreeting]);
  
  return null; // This component doesn't render any UI
};

export default EnhancedHomePageVoiceAssistant;
