
import React, { useEffect, useState } from 'react';
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
      return "Welcome to PREP-zer, the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. I'm Sakha AI, your learning assistant. Our platform adapts to your unique learning style and emotional state, giving you a powerful edge in competitive exams. How can I assist you today?";
    } else if (path.includes('/signup')) {
      return "Welcome to PREP-zer! I'm Sakha AI. We provide hyper-personalized study plans based on your emotional state and learning style. Would you like assistance with signing up?";
    } else if (path.includes('/free-trial')) {
      return "Welcome to your free trial of PREP-zer's emotionally intelligent exam platform. I'm Sakha AI, and I'll help you experience personalized learning paths tailored to your needs. What would you like to explore first?";
    } else if (path.includes('/exam-readiness')) {
      return "Our exam readiness analyzer will evaluate your preparation and identify areas for improvement. We'll customize your learning path based on your emotional state and learning style. Ready to begin?";
    }
    
    return "Welcome to PREP-zer. I'm Sakha AI, your emotionally intelligent exam preparation assistant.";
  };
  
  // Stop speech when route changes
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [location.pathname]);
  
  // Setup voice command recognition
  useEffect(() => {
    let recognition: any = null;
    
    const setupVoiceRecognition = () => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        return null;
      }
      
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language;
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Voice command recognized:", transcript);
        
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
        }
      };
      
      recognitionInstance.onend = () => {
        // Only restart if we're still on a page that should use voice
        if (shouldPlayGreeting && document.visibilityState === 'visible') {
          setTimeout(() => {
            recognitionInstance.start();
          }, 1000);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };
      
      // Start recognition
      try {
        recognitionInstance.start();
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
      }
      
      return recognitionInstance;
    };
    
    // Setup recognition if we're on a page that should have voice
    if (shouldPlayGreeting && !audioMuted) {
      recognition = setupVoiceRecognition();
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
  }, [location.pathname, audioMuted, navigate, language, shouldPlayGreeting]);
  
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
          
          // Correct PREPZR pronunciation by using proper spelling in the text
          speech.text = message.replace(/PREPZR/gi, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
          speech.lang = language;
          speech.rate = 0.98; // Normal rate for clarity
          speech.pitch = 1.05; // Slightly higher for a more vibrant tone
          speech.volume = 0.9;
          
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
          
          // Show toast notification
          toast({
            title: "Sakha AI Voice Assistant",
            description: "Voice commands are available. Try saying 'Sign up' or 'Login'",
            duration: 5000,
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
