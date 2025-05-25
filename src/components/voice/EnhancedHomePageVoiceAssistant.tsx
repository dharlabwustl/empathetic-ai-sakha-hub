
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome') ||
                            location.pathname.includes('/free-trial') ||
                            location.pathname.includes('/exam-readiness');
  
  const getContextMessage = (path: string, lang: string) => {
    if (path === '/') {
      return "Welcome to Prepzer, the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. I'm Sakha AI, your learning assistant. Our platform adapts to your unique learning style and emotional state. How can I assist you today?";
    } else if (path.includes('/signup')) {
      return "Welcome to Prepzer signup! I'm Sakha AI. You can use voice commands to fill in the form. Click on any field and then use the microphone button to speak. Would you like assistance with signing up?";
    } else if (path.includes('/free-trial')) {
      return "Welcome to your free trial of Prepzer's emotionally intelligent exam platform. I'm Sakha AI, and I'll help you experience personalized learning paths tailored to your needs.";
    } else if (path.includes('/exam-readiness')) {
      return "Our exam readiness analyzer will evaluate your preparation and identify areas for improvement. We'll customize your learning path based on your emotional state and learning style.";
    }
    
    return "Welcome to Prepzer. I'm Sakha AI, your emotionally intelligent exam preparation assistant.";
  };
  
  const cleanupVoiceResources = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (recognitionRef.current) {
      try {
        if (recognitionRef.current.onresult) recognitionRef.current.onresult = null;
        if (recognitionRef.current.onerror) recognitionRef.current.onerror = null;
        if (recognitionRef.current.onend) recognitionRef.current.onend = null;
        if (recognitionRef.current.onstart) recognitionRef.current.onstart = null;
        
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (error) {
        // Ignore errors during cleanup
      } finally {
        recognitionRef.current = null;
      }
    }
  };
  
  useEffect(() => {
    cleanupVoiceResources();
    
    const restartTimer = setTimeout(() => {
      if (shouldPlayGreeting && !audioMuted) {
        setupVoiceGreeting();
      }
    }, 1000);
    
    return () => {
      clearTimeout(restartTimer);
      cleanupVoiceResources();
    };
  }, [location.pathname]);
  
  const setupVoiceRecognition = () => {
    if (recognitionRef.current || audioMuted || !shouldPlayGreeting) {
      return;
    }
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error("Speech recognition not supported in this browser");
      return;
    }
    
    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language;
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Voice command recognized:", transcript);
        
        const now = Date.now();
        if (now - lastCommandTimeRef.current < 2000) {
          return;
        }
        lastCommandTimeRef.current = now;
        
        if (transcript.includes('signup') || transcript.includes('sign up')) {
          navigate('/signup');
        } else if (transcript.includes('login') || transcript.includes('log in')) {
          navigate('/login');
        } else if (transcript.includes('home') || transcript.includes('go home')) {
          navigate('/');
        } else if (transcript.includes('demo')) {
          navigate('/login');
          setTimeout(() => {
            const demoButton = document.querySelector('button[role="demo-login"]');
            if (demoButton) demoButton.click();
          }, 1000);
        } else if (transcript.includes('analyze') || transcript.includes('readiness')) {
          window.dispatchEvent(new Event('open-exam-analyzer'));
        }
      };
      
      recognitionInstance.onend = () => {
        if (shouldPlayGreeting && !audioMuted && document.visibilityState === 'visible') {
          timeoutRef.current = window.setTimeout(() => {
            if (recognitionRef.current) {
              try {
                recognitionRef.current = null;
                setupVoiceRecognition();
              } catch (error) {
                console.error("Error restarting recognition:", error);
              }
            } else {
              setupVoiceRecognition();
            }
          }, 3000);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        
        const restartDelay = (event.error === 'network' || event.error === 'audio') ? 5000 : 3000;
        
        if (shouldPlayGreeting && !audioMuted && document.visibilityState === 'visible') {
          timeoutRef.current = window.setTimeout(() => {
            recognitionRef.current = null;
            setupVoiceRecognition();
          }, restartDelay);
        }
      };
      
      try {
        recognitionInstance.start();
        recognitionRef.current = recognitionInstance;
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        timeoutRef.current = window.setTimeout(() => {
          recognitionRef.current = null;
          setupVoiceRecognition();
        }, 5000);
      }
    } catch (error) {
      console.error("Error setting up recognition:", error);
    }
  };
  
  const setupVoiceGreeting = () => {
    if (greetingPlayed || audioMuted || !shouldPlayGreeting || !('speechSynthesis' in window)) {
      return;
    }
    
    try {
      const message = getContextMessage(location.pathname, language);
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = message;
      speech.lang = language;
      speech.rate = 0.98;
      speech.pitch = 1.05;
      speech.volume = 0.9;
      
      const voices = window.speechSynthesis.getVoices();
      
      const preferredVoiceNames = language === 'en-IN' 
        ? ['Google India', 'Microsoft Kajal', 'en-IN', 'English India', 'India']
        : ['Google US English Female', 'Microsoft Zira', 'Samantha', 'Alex', 'en-US', 'en-GB'];
      
      let selectedVoice = null;
      for (const name of preferredVoiceNames) {
        const voice = voices.find(v => 
          v.name?.toLowerCase().includes(name.toLowerCase()) || 
          v.lang?.toLowerCase().includes(name.toLowerCase())
        );
        if (voice) {
          selectedVoice = voice;
          break;
        }
      }
      
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
      }
      
      if (selectedVoice) {
        speech.voice = selectedVoice;
      }
      
      speech.onstart = () => console.log("Voice greeting started");
      speech.onend = () => {
        setGreetingPlayed(true);
        console.log("Voice greeting completed");
        
        setTimeout(() => {
          if (!audioMuted) {
            setupVoiceRecognition();
          }
        }, 500);
        
        document.dispatchEvent(new CustomEvent('voice-greeting-completed'));
      };
      speech.onerror = (e) => {
        console.error("Speech synthesis error", e);
        setGreetingPlayed(true);
        
        setTimeout(() => {
          if (!audioMuted) {
            setupVoiceRecognition();
          }
        }, 500);
      };
      
      speechRef.current = speech;
      window.speechSynthesis.speak(speech);
      
      toast({
        title: "Sakha AI Voice Assistant",
        description: "Try commands like 'Sign up', 'Login', 'Go home', or 'Analyze readiness'",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error playing greeting:", error);
      setGreetingPlayed(true);
      
      setTimeout(() => {
        if (!audioMuted) {
          setupVoiceRecognition();
        }
      }, 500);
    }
  };
  
  useEffect(() => {
    const handleMuteEvent = () => {
      setAudioMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      cleanupVoiceResources();
    };
    
    const handleUnmuteEvent = () => {
      setAudioMuted(false);
      localStorage.setItem('voice_assistant_muted', 'false');
      
      setTimeout(() => {
        if (!greetingPlayed) {
          setupVoiceGreeting();
        } else {
          setupVoiceRecognition();
        }
      }, 500);
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cleanupVoiceResources();
      } else if (document.visibilityState === 'visible' && !audioMuted) {
        setTimeout(() => {
          if (!greetingPlayed) {
            setupVoiceGreeting();
          } else {
            setupVoiceRecognition();
          }
        }, 1000);
      }
    };
    
    const muteSetting = localStorage.getItem('voice_assistant_muted');
    if (muteSetting === 'true') {
      setAudioMuted(true);
    } else if (!audioMuted && shouldPlayGreeting && !greetingPlayed) {
      const initialSetupTimer = setTimeout(() => {
        setupVoiceGreeting();
      }, 2000);
      
      return () => clearTimeout(initialSetupTimer);
    }
    
    document.addEventListener('voice-assistant-mute', handleMuteEvent);
    document.addEventListener('voice-assistant-unmute', handleUnmuteEvent);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('voice-assistant-mute', handleMuteEvent);
      document.removeEventListener('voice-assistant-unmute', handleUnmuteEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cleanupVoiceResources();
    };
  }, [greetingPlayed, shouldPlayGreeting, audioMuted]);
  
  return null;
};

export default EnhancedHomePageVoiceAssistant;
