
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [phaseCompleted, setPhaseCompleted] = useState({
    introduction: false,
    features: false,
    commands: false
  });
  const [audioMuted, setAudioMuted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Refs for better control of timers and recognition
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  
  // Check if the current location is appropriate for voice greeting
  const shouldPlayGreeting = location.pathname === '/';
  
  // Comprehensive context-aware messages for different phases
  const getPhaseMessage = (phase: string, lang: string) => {
    switch(phase) {
      case 'introduction':
        return "Welcome to PREP-zer, the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. I'm Sakha AI, your learning assistant. Our platform adapts to your unique learning style and emotional state.";
      
      case 'features':
        return "PREP-zer offers personalized study plans, AI-driven assessments, and emotional intelligence to help you succeed in competitive exams like JEE, NEET, and UPSC. We understand your mindset, not just the exam content.";
      
      case 'commands':
        return "You can navigate our platform using voice commands. Try saying 'Show me features', 'Tell me about NEET prep', or 'Open exam analyzer'. How can I assist you today?";
        
      default:
        return "Welcome to PREP-zer. I'm Sakha AI, your emotionally intelligent exam preparation assistant.";
    }
  };
  
  // Cleanup function to ensure proper resource management
  const cleanupVoiceResources = () => {
    // Stop speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Stop and cleanup speech recognition
    if (recognitionRef.current) {
      try {
        // Remove all event handlers before stopping
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
  
  // Stop speech when route changes
  useEffect(() => {
    cleanupVoiceResources();
    
    // Only start on homepage
    if (location.pathname !== '/') {
      return;
    }
    
    // Reset phases when returning to homepage
    if (location.pathname === '/') {
      setPhaseCompleted({
        introduction: false,
        features: false,
        commands: false
      });
    }
    
    // Restart with delay to prevent overlapping speech/recognition
    const restartTimer = setTimeout(() => {
      if (shouldPlayGreeting && !audioMuted && !phaseCompleted.introduction) {
        speakPhase('introduction');
      }
    }, 2000);
    
    return () => {
      clearTimeout(restartTimer);
      cleanupVoiceResources();
    };
  }, [location.pathname]);
  
  // Setup voice recognition with improved error handling
  const setupVoiceRecognition = () => {
    // Don't setup if already listening or muted
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
        
        // Prevent rapid fire commands
        const now = Date.now();
        if (now - lastCommandTimeRef.current < 2000) {
          return;
        }
        lastCommandTimeRef.current = now;
        
        // Handle page navigation commands
        if (transcript.includes('signup') || transcript.includes('sign up')) {
          navigate('/signup');
        } else if (transcript.includes('login') || transcript.includes('log in')) {
          navigate('/login');
        } else if (transcript.includes('home') || transcript.includes('go home')) {
          navigate('/');
        } else if (transcript.includes('demo')) {
          navigate('/login');
        } else if (transcript.includes('analyze') || transcript.includes('readiness') || 
                  transcript.includes('exam analyzer') || transcript.includes('check readiness')) {
          // Trigger the exam readiness analyzer
          window.dispatchEvent(new Event('open-exam-analyzer'));
        } else if (transcript.includes('feature') || transcript.includes('tell me more')) {
          // Speak about features if not already done
          if (!phaseCompleted.features) {
            speakPhase('features');
          }
        } else if (transcript.includes('help') || transcript.includes('commands') || 
                  transcript.includes('what can you do')) {
          speakPhase('commands');
        }
      };
      
      recognitionInstance.onend = () => {
        // Only restart after a delay if we're still on the homepage
        if (shouldPlayGreeting && !audioMuted && document.visibilityState === 'visible') {
          // Use timeout to prevent immediate restart
          timeoutRef.current = window.setTimeout(() => {
            setupVoiceRecognition();
          }, 2000); // Short delay before restarting recognition
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        
        // Don't restart immediately after network or audio errors
        const restartDelay = (event.error === 'network' || event.error === 'audio') ? 5000 : 3000;
        
        // Only restart if we should still be listening
        if (shouldPlayGreeting && !audioMuted && document.visibilityState === 'visible') {
          timeoutRef.current = window.setTimeout(() => {
            recognitionRef.current = null;
            setupVoiceRecognition();
          }, restartDelay);
        }
      };
      
      // Start recognition
      try {
        recognitionInstance.start();
        recognitionRef.current = recognitionInstance;
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        // Try again after a delay
        timeoutRef.current = window.setTimeout(() => {
          recognitionRef.current = null;
          setupVoiceRecognition();
        }, 5000);
      }
    } catch (error) {
      console.error("Error setting up recognition:", error);
    }
  };
  
  // Function to speak a specific phase
  const speakPhase = (phase: string) => {
    if (audioMuted || !shouldPlayGreeting || !window.speechSynthesis) {
      return;
    }
    
    try {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const message = getPhaseMessage(phase, language);
      
      // Create speech synthesis utterance
      const speech = new SpeechSynthesisUtterance();
      
      // Preserve "PREP-zer" pronunciation with hyphen
      speech.text = message;
      speech.lang = language;
      speech.rate = 0.98; // Normal rate for clarity
      speech.pitch = 1.05; // Slightly higher for a more vibrant tone
      speech.volume = 0.9;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a clear, vibrant voice
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
      speech.onstart = () => console.log(`Phase ${phase} started speaking`);
      speech.onend = () => {
        console.log(`Phase ${phase} speech completed`);
        
        // Mark this phase as completed
        setPhaseCompleted(prev => ({
          ...prev,
          [phase]: true
        }));
        
        // Progress to the next phase with a deliberate pause between phases
        if (phase === 'introduction' && !phaseCompleted.features) {
          timeoutRef.current = window.setTimeout(() => {
            speakPhase('features');
          }, 3000); // 3 second pause before next phase
        } else if (phase === 'features' && !phaseCompleted.commands) {
          timeoutRef.current = window.setTimeout(() => {
            speakPhase('commands');
          }, 3000); // 3 second pause before next phase
        } else {
          // After all phases or repeated phases, start voice recognition
          timeoutRef.current = window.setTimeout(() => {
            setupVoiceRecognition();
          }, 1000);
        }
        
        // Dispatch an event that voice greeting has completed
        document.dispatchEvent(new CustomEvent('voice-phase-completed', { detail: { phase } }));
      };
      
      speech.onerror = (e) => {
        console.error("Speech synthesis error", e);
        
        // Mark this phase as completed anyway to avoid getting stuck
        setPhaseCompleted(prev => ({
          ...prev,
          [phase]: true
        }));
        
        // Try to start recognition anyway after an error
        setTimeout(() => {
          if (!audioMuted) {
            setupVoiceRecognition();
          }
        }, 1000);
      };
      
      // Store speech object in ref to be able to cancel it when needed
      speechRef.current = speech;
      
      // Speak the message
      window.speechSynthesis.speak(speech);
      
      // Only show toast for first introduction
      if (phase === 'introduction') {
        toast({
          title: "Sakha AI Voice Assistant",
          description: "Try commands like 'Show features', 'Analyze readiness', or 'Tell me about PREP-zer'",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(`Error playing ${phase} phase:`, error);
      
      // Mark as completed anyway to avoid getting stuck
      setPhaseCompleted(prev => ({
        ...prev,
        [phase]: true
      }));
      
      // Try to start recognition anyway after an error
      setTimeout(() => {
        if (!audioMuted) {
          setupVoiceRecognition();
        }
      }, 1000);
    }
  };
  
  // Listen for custom events to mute/unmute
  useEffect(() => {
    const handleMuteEvent = () => {
      setAudioMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      cleanupVoiceResources();
    };
    
    const handleUnmuteEvent = () => {
      setAudioMuted(false);
      localStorage.setItem('voice_assistant_muted', 'false');
      
      // Restart voice systems after unmuting
      if (shouldPlayGreeting) {
        setTimeout(() => {
          if (!phaseCompleted.introduction) {
            speakPhase('introduction');
          } else if (!phaseCompleted.features) {
            speakPhase('features');
          } else if (!phaseCompleted.commands) {
            speakPhase('commands');
          } else {
            setupVoiceRecognition();
          }
        }, 500);
      }
    };
    
    // Also listen for page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Stop speech when tab is not visible
        cleanupVoiceResources();
      } else if (document.visibilityState === 'visible' && !audioMuted && shouldPlayGreeting) {
        // Restart when coming back to visible tab
        setTimeout(() => {
          if (!phaseCompleted.introduction) {
            speakPhase('introduction');
          } else if (!phaseCompleted.features) {
            speakPhase('features');
          } else if (!phaseCompleted.commands) {
            speakPhase('commands');
          } else {
            setupVoiceRecognition();
          }
        }, 1000);
      }
    };
    
    // Load mute preference
    const muteSetting = localStorage.getItem('voice_assistant_muted');
    if (muteSetting === 'true') {
      setAudioMuted(true);
    } else if (!audioMuted && shouldPlayGreeting) {
      // Initial setup if not muted - start with introduction phase
      const initialSetupTimer = setTimeout(() => {
        if (!phaseCompleted.introduction) {
          speakPhase('introduction');
        }
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
  }, [phaseCompleted, shouldPlayGreeting, audioMuted]);
  
  return null; // This component doesn't render any UI
};

export default EnhancedHomePageVoiceAssistant;
