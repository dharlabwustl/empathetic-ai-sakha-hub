
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [isActivelyListening, setIsActivelyListening] = useState(false);
  const lastCommandTimeRef = useRef<number>(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if the current location is appropriate for voice greeting
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome') ||
                            location.pathname.includes('/free-trial') ||
                            location.pathname.includes('/exam-readiness');
  
  // Get concise, context-aware message based on page
  const getContextMessage = (path: string, lang: string) => {
    if (path === '/') {
      return "Welcome to PREPZR, the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. I'm Sakha AI, your learning assistant.";
    } else if (path.includes('/signup')) {
      return "Welcome to PREPZR signup. You can use voice commands to fill in the form. Click the microphone button when you're ready to speak.";
    } else if (path.includes('/free-trial')) {
      return "Welcome to your free trial of PREPZR's emotionally intelligent exam platform. I'm Sakha AI, and I'll help you experience personalized learning.";
    } else if (path.includes('/exam-readiness')) {
      return "Our exam readiness analyzer will evaluate your preparation and identify areas for improvement.";
    }
    
    return "Welcome to PREPZR. I'm Sakha AI, your exam preparation assistant.";
  };
  
  // Stop speech when route changes
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Also abort any ongoing speech recognition on route change
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      } catch (error) {
        console.error("Error stopping recognition on route change:", error);
      }
    }
    
    setIsActivelyListening(false);
    
  }, [location.pathname]);
  
  // Setup voice command recognition with improved handling to avoid continuous prompting
  useEffect(() => {
    let recognition: any = null;
    
    const setupVoiceRecognition = () => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        return null;
      }
      
      // Skip setting up recognition if we already have an active instance
      if (recognitionRef.current) {
        return recognitionRef.current;
      }
      
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language;
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Voice command recognized:", transcript);
        
        // Set last command time to prevent spamming
        lastCommandTimeRef.current = Date.now();
        
        // Handle page navigation commands
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
          // Trigger the exam readiness analyzer
          window.dispatchEvent(new Event('open-exam-analyzer'));
        }
      };
      
      recognitionInstance.onstart = () => {
        setIsActivelyListening(true);
        console.log("Started listening for voice commands");
      };
      
      recognitionInstance.onend = () => {
        setIsActivelyListening(false);
        console.log("Stopped listening for voice commands");
        
        // Only restart listening after a significant delay to prevent constant listening prompts
        // and only if we're still on a page that should use voice
        if (shouldPlayGreeting && document.visibilityState === 'visible' && !audioMuted) {
          const timeSinceLastCommand = Date.now() - lastCommandTimeRef.current;
          const delayBeforeRestart = timeSinceLastCommand < 10000 ? 8000 : 30000; // Much longer delay if no recent commands
          
          console.log(`Will restart listening in ${delayBeforeRestart/1000} seconds`);
          
          setTimeout(() => {
            if (shouldPlayGreeting && document.visibilityState === 'visible' && !audioMuted) {
              try {
                recognitionInstance.start();
              } catch (error) {
                console.error("Error restarting speech recognition:", error);
              }
            }
          }, delayBeforeRestart);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsActivelyListening(false);
        
        // Don't auto-restart on errors to prevent browser warnings
        if (event.error === "no-speech") {
          // If no speech detected, wait longer before restarting
          setTimeout(() => {
            if (shouldPlayGreeting && document.visibilityState === 'visible' && !audioMuted) {
              try {
                recognitionInstance.start();
              } catch (error) {
                console.error("Error restarting speech recognition after no-speech error:", error);
              }
            }
          }, 20000); // Long delay to avoid browser complaints
        }
      };
      
      // Reference the instance
      recognitionRef.current = recognitionInstance;
      
      return recognitionInstance;
    };
    
    // Setup recognition if we're on a page that should have voice, not muted, 
    // and no active instance already
    if (shouldPlayGreeting && !audioMuted && !isActivelyListening && !recognitionRef.current) {
      recognition = setupVoiceRecognition();
      
      // Start after a delay to ensure proper initialization
      setTimeout(() => {
        if (recognition && shouldPlayGreeting && document.visibilityState === 'visible' && !audioMuted) {
          try {
            recognition.start();
          } catch (error) {
            console.error("Failed to start speech recognition:", error);
          }
        }
      }, 3000);
    }
    
    return () => {
      if (recognition) {
        try {
          recognition.abort();
        } catch (error) {
          console.error("Error stopping recognition:", error);
        }
      }
      
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [location.pathname, audioMuted, navigate, language, shouldPlayGreeting, isActivelyListening]);
  
  // Play greeting once when page loads
  useEffect(() => {
    // Load mute preference
    const muteSetting = localStorage.getItem('voice_assistant_muted');
    if (muteSetting === 'true') {
      setAudioMuted(true);
    }
    
    // Only play the greeting if speech synthesis is supported and we're on the right page
    if ('speechSynthesis' in window && !greetingPlayed && shouldPlayGreeting && !audioMuted) {
      // Use a timeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        try {
          const message = getContextMessage(location.pathname, language);
          
          // Create speech synthesis utterance
          const speech = new SpeechSynthesisUtterance();
          
          // Correct PREPZR pronunciation
          speech.text = message;
          speech.lang = language;
          speech.rate = 0.98; // Normal rate for clarity
          speech.pitch = 1.05; // Slightly higher for a more vibrant tone
          speech.volume = 0.8;
          
          // Get available voices
          const voices = window.speechSynthesis.getVoices();
          
          // Try to find a clear, vibrant voice - preferring Indian English voices for en-IN
          const preferredVoiceNames = language === 'en-IN' 
            ? ['Google India', 'Microsoft Kajal', 'en-IN', 'English India', 'India']
            : ['Google US English Female', 'Microsoft Zira', 'Samantha', 'Alex', 'en-US', 'en-GB'];
          
          // Try to find a preferred voice
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
          
          // If still no voice selected, use any available voice
          if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices[0];
          }
          
          // Set the selected voice if found
          if (selectedVoice) {
            speech.voice = selectedVoice;
          }
          
          // Handle events
          speech.onstart = () => console.log("Voice greeting started");
          speech.onend = () => {
            setGreetingPlayed(true);
            console.log("Voice greeting completed");
            
            // Dispatch an event that voice greeting has completed
            document.dispatchEvent(new CustomEvent('voice-greeting-completed'));
          };
          speech.onerror = (e) => {
            console.error("Speech synthesis error", e);
            setGreetingPlayed(true);
          };
          
          // Store speech object globally to be able to cancel it when needed
          window.currentSpeech = speech;
          
          // Speak the message
          window.speechSynthesis.speak(speech);
          
          // Show toast notification with available commands - less intrusive
          toast({
            title: "Sakha AI Voice Assistant",
            description: "Available for hands-free navigation",
            duration: 3000,
          });
        } catch (error) {
          console.error("Error playing greeting:", error);
          setGreetingPlayed(true);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    // Cleanup function to cancel any ongoing speech when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [greetingPlayed, shouldPlayGreeting, location.pathname, language, audioMuted, toast]);
  
  // Listen for custom events to mute/unmute
  useEffect(() => {
    const handleMuteEvent = () => {
      setAudioMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      
      // Also stop any active listening
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
          recognitionRef.current = null;
        } catch (error) {
          console.error("Error stopping recognition on mute:", error);
        }
      }
      
      setIsActivelyListening(false);
    };
    
    const handleUnmuteEvent = () => {
      setAudioMuted(false);
      localStorage.setItem('voice_assistant_muted', 'false');
    };
    
    document.addEventListener('voice-assistant-mute', handleMuteEvent);
    document.addEventListener('voice-assistant-unmute', handleUnmuteEvent);
    
    // Also listen for page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Stop speech when tab is not visible
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        
        // Also stop any active listening
        if (recognitionRef.current) {
          try {
            recognitionRef.current.abort();
            recognitionRef.current = null;
          } catch (error) {
            console.error("Error stopping recognition on visibility change:", error);
          }
        }
        
        setIsActivelyListening(false);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('voice-assistant-mute', handleMuteEvent);
      document.removeEventListener('voice-assistant-unmute', handleUnmuteEvent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return null; // This component doesn't render any UI
};

export default HomePageVoiceAssistant;
