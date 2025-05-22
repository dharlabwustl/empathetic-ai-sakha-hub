
import React, { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface SignupVoiceAssistantProps {
  onVoiceInput: (fieldName: string, text: string) => void;
  currentStep: string;
  isOpen: boolean;
}

const SignupVoiceAssistant: React.FC<SignupVoiceAssistantProps> = ({ 
  onVoiceInput, 
  currentStep,
  isOpen 
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isFieldPromptVisible, setIsFieldPromptVisible] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Field specific voice prompts - made shorter and more direct
  const fieldPrompts: Record<string, string> = {
    name: "Say your name",
    email: "Say your email",
    mobile: "Say your mobile number",
    password: "Say your password",
    confirmPassword: "Confirm your password",
    goal: "Say which exam you're preparing for",
    role: "Say student or tutor", 
    institute: "Say your institute name",
    examDate: "Say your exam date",
    studyHours: "Say daily study hours",
    studyLocation: "Say where you usually study",
  };
  
  // Get currently focused element and set as active field
  const handleFieldFocus = () => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.id && fieldPrompts[activeElement.id]) {
      setActiveField(activeElement.id);
      
      // Only show the field prompt popup instead of speaking it
      setIsFieldPromptVisible(true);
      setTimeout(() => setIsFieldPromptVisible(false), 3000);
    }
  };
  
  // Initialize speech recognition
  const initSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive"
      });
      return;
    }
    
    // Create speech recognition instance
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Set to Indian English
    
    // Handle speech recognition results
    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript.trim();
      
      if (activeField && event.results[last].isFinal) {
        let processedText = transcript;
        
        // Process email input (replace "at" with @ and "dot" with .)
        if (activeField === 'email') {
          processedText = processedText
            .toLowerCase()
            .replace(/\s+at\s+/g, '@')
            .replace(/\s+dot\s+/g, '.')
            .replace(/\s+/g, '');
        }
        
        // Process mobile input (remove spaces for numbers)
        if (activeField === 'mobile') {
          processedText = processedText
            .replace(/\D/g, '')
            .substring(0, 10);
        }
        
        // Pass final transcript to parent component
        onVoiceInput(activeField, processedText);
        
        // Show success toast instead of speaking
        toast({
          title: "Voice Captured",
          description: `${activeField}: ${transcript.substring(0, 30)}${transcript.length > 30 ? '...' : ''}`,
        });
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
      
      toast({
        title: "Voice Recognition Error",
        description: "Please try again",
        variant: "destructive"
      });
    };
    
    recognitionRef.current = recognition;
  };
  
  // Function to start listening
  const startListening = () => {
    if (!recognitionRef.current) {
      initSpeechRecognition();
    }
    
    if (recognitionRef.current && activeField) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        
        toast({
          title: "Listening...",
          description: `Speak now for ${activeField}`,
        });
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
    } else {
      toast({
        title: "Click on a field first",
        description: "Tap any form field before using voice",
      });
    }
  };
  
  // Function to stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping speech recognition:", err);
      }
    }
    setIsListening(false);
  };
  
  // Function to toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (!isMuted) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
    }
  };
  
  // Function to speak text
  const speakText = (text: string) => {
    if (isMuted || !isOpen) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    
    // Try to find Indian English voice
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(voice => 
      voice.lang === 'en-IN' || voice.name.includes('Indian')
    );
    
    if (indianVoice) {
      utterance.voice = indianVoice;
    }
    
    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };
  
  // Set up event listeners for field focus
  useEffect(() => {
    // Voice guidance for the current step - shortened and more direct
    const stepGuidance: Record<string, string> = {
      role: "Select your role: student or tutor",
      goal: "Select your exam goal",
      demographics: "Enter your details",
      personality: "Select your personality",
      sentiment: "How are you feeling today?",
      habits: "Tell us about your study habits",
      interests: "Select your interests",
      signup: "Complete your signup details"
    };
    
    // Provide guidance when step changes - only on initial load
    if (currentStep && stepGuidance[currentStep] && isOpen && !isMuted) {
      setTimeout(() => {
        speakText(stepGuidance[currentStep]);
      }, 500);
    }
    
    // Add focus event listeners
    document.addEventListener('focusin', handleFieldFocus);
    
    // Load available voices
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Voices loaded
      };
    }
    
    return () => {
      // Clean up
      document.removeEventListener('focusin', handleFieldFocus);
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          // Ignore
        }
      }
      
      // Stop any ongoing speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentStep, isOpen, isMuted]);
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Field prompt tooltip - shows when a field is focused */}
      <AnimatePresence>
        {isFieldPromptVisible && activeField && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-32 right-6 z-50 bg-indigo-600 text-white rounded-lg px-4 py-2 shadow-lg"
          >
            <p className="flex items-center">
              <Mic size={16} className="mr-2" />
              {fieldPrompts[activeField]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Voice Assistant Controls */}
      <motion.div 
        className="fixed bottom-20 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              variant={isListening ? "destructive" : "default"}
              className="w-10 h-10 rounded-full"
              onClick={isListening ? stopListening : startListening}
              disabled={!activeField}
              title={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <MicOff size={18} />
                </motion.div>
              ) : (
                <Mic size={18} />
              )}
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              variant="outline"
              className="w-10 h-10 rounded-full"
              onClick={toggleMute}
              title={isMuted ? "Unmute voice guidance" : "Mute voice guidance"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>
          </motion.div>
          
          <div className="text-xs max-w-[150px] truncate">
            {activeField ? (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={activeField}
              >
                {activeField}
              </motion.span>
            ) : 'Click on a field'}
          </div>
        </div>
        
        {/* Pulsing hint when field is active but not listening */}
        {activeField && !isListening && (
          <motion.div 
            className="absolute -top-2 -right-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-4 w-4 rounded-full bg-indigo-500"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default SignupVoiceAssistant;
