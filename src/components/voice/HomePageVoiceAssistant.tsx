
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { Volume2, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' 
}) => {
  const { toast } = useToast();
  const location = useLocation();
  const welcomeMessagePlayed = useRef<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isFloatingActive, setIsFloatingActive] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceVolume, setVoiceVolume] = useState<number>(0.8);
  const [voiceRate, setVoiceRate] = useState<number>(0.9);
  const [voicePitch, setVoicePitch] = useState<number>(1.1);
  const [recognition, setRecognition] = useState<any>(null);
  const [transcript, setTranscript] = useState<string>('');
  
  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        console.log("Available voices loaded:", voices.length);
      }
    };
    
    // Load voices right away in case they're already available
    loadVoices();
    
    // Also set up event for when voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    // Check if the browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language;
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        console.log("Recognized speech:", transcript);
        
        // Process voice command
        processVoiceCommand(transcript);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    } else {
      console.warn("Speech recognition not supported in this browser");
    }
  }, [language]);

  // Play welcome message when component mounts
  useEffect(() => {
    // Only play welcome message on first visit to home page
    if (location.pathname === '/' && !welcomeMessagePlayed.current) {
      const isFirstTime = localStorage.getItem('first_visit') !== 'false';
      
      if (isFirstTime) {
        // Short delay to ensure voices are loaded
        const timer = setTimeout(() => {
          speakWelcomeMessage(isFirstTime);
          welcomeMessagePlayed.current = true;
          localStorage.setItem('first_visit', 'false');
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, availableVoices]);

  const speakWelcomeMessage = (isFirstTime: boolean) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      setIsSpeaking(true);
      
      // Create message based on whether it's the user's first visit
      const welcomeText = isFirstTime 
        ? "Namaste! Welcome to Prepzr. I'm your voice assistant with an Indian accent. I'm here to help you prepare for your exams. Click the voice assistant button in the bottom right to talk with me."
        : "Welcome back to Prepzr. I'm your voice assistant. How can I help you today?";
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(welcomeText);
      
      // Find a suitable Indian voice
      const preferredVoiceNames = [
        'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google English India'
      ];
      
      // Look for preferred voices first
      let selectedVoice = null;
      for (const name of preferredVoiceNames) {
        const voice = availableVoices.find(v => v.name.includes(name));
        if (voice) {
          selectedVoice = voice;
          break;
        }
      }
      
      // If no preferred voice found, try to find any English (India) voice
      if (!selectedVoice) {
        selectedVoice = availableVoices.find(v => 
          v.lang === 'en-IN' || 
          v.lang === 'hi-IN' || 
          v.lang.includes('en') || 
          v.lang.includes('hi')
        );
      }
      
      // If still no voice found, use default voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log("Using voice:", selectedVoice.name);
      } else {
        console.log("No Indian voice found, using default voice");
      }
      
      // Set properties for Indian English accent
      utterance.lang = language;
      utterance.rate = voiceRate;  // Slightly slower for clearer pronunciation
      utterance.pitch = voicePitch; // Slightly higher pitch for female voice
      utterance.volume = voiceVolume;
      
      // Add event listeners to track when speaking starts and ends
      utterance.onstart = () => {
        setIsSpeaking(true);
        document.dispatchEvent(new CustomEvent('voice-speaking-started', {
          detail: { message: welcomeText }
        }));
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        document.dispatchEvent(new Event('voice-speaking-ended'));
      };
      
      // Speak the welcome message
      window.speechSynthesis.speak(utterance);
      
      // Show a toast message instead of a popup modal
      toast({
        title: "Voice Assistant",
        description: isFirstTime ? 
          "Welcome! I'll be your guide on Prepzr." : 
          "Welcome back to Prepzr!",
        duration: 5000,
      });
    }
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
      
      toast({
        title: "Voice Assistant",
        description: "Listening...",
        duration: 2000,
      });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Simple command processing
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('go to dashboard')) {
      window.location.href = '/dashboard/student';
    } else if (lowerCommand.includes('login') || lowerCommand.includes('sign in')) {
      window.location.href = '/login';
    } else if (lowerCommand.includes('signup') || lowerCommand.includes('register')) {
      window.location.href = '/signup';
    } else {
      // Speak a response
      speakResponse(`I heard: ${command}. How can I help you with Prepzr?`);
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      setIsSpeaking(true);
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Find a suitable Indian voice
      const preferredVoiceNames = [
        'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google English India'
      ];
      
      // Look for preferred voices first
      let selectedVoice = null;
      for (const name of preferredVoiceNames) {
        const voice = availableVoices.find(v => v.name.includes(name));
        if (voice) {
          selectedVoice = voice;
          break;
        }
      }
      
      // If still no voice found, use default voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Set properties for Indian English accent
      utterance.lang = language;
      utterance.rate = voiceRate;
      utterance.pitch = voicePitch; 
      utterance.volume = voiceVolume;
      
      // Add event listeners
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      // Speak the response
      window.speechSynthesis.speak(utterance);
    }
  };

  // Render a floating button that doesn't block the UI
  return (
    <>
      {/* Floating voice assistant button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          className={`rounded-full p-4 shadow-lg flex items-center justify-center ${isListening || isSpeaking ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? (
            <Mic className="h-6 w-6 animate-pulse" />
          ) : isSpeaking ? (
            <Volume2 className="h-6 w-6 animate-pulse" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      {/* Voice status indicator (small, non-intrusive) */}
      <AnimatePresence>
        {(isListening || isSpeaking) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-50 text-sm max-w-xs"
          >
            {isListening ? (
              <p className="flex items-center">
                <Mic className="h-4 w-4 text-red-500 mr-2 animate-pulse" />
                Listening...
              </p>
            ) : isSpeaking ? (
              <p className="flex items-center">
                <Volume2 className="h-4 w-4 text-blue-500 mr-2 animate-pulse" />
                Speaking...
              </p>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePageVoiceAssistant;
