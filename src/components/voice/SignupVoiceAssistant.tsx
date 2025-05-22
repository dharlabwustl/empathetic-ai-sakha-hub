
import React, { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Volume2, VolumeX, CheckCircle } from 'lucide-react';
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
  const [voiceCommands, setVoiceCommands] = useState<Record<string, boolean>>({});
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Field specific voice prompts - made shorter and direct
  const fieldPrompts: Record<string, string> = {
    name: "Your name",
    email: "Your email",
    mobile: "Your mobile number",
    password: "Your password",
    confirmPassword: "Confirm password",
    goal: "Your exam goal",
    role: "Student or tutor", 
    institute: "Your institute name",
    examDate: "Your exam date",
    studyHours: "Daily study hours",
    studyLocation: "Where you study",
  };

  // List of supported voice commands for automatic field recognition
  const voiceFieldTriggers: Record<string, string[]> = {
    name: ["name", "my name", "full name", "username"],
    email: ["email", "email address", "mail"],
    mobile: ["mobile", "phone", "number", "mobile number", "phone number"],
    password: ["password", "pass", "secret"],
    confirmPassword: ["confirm", "confirm password", "repeat password", "same password"],
    goal: ["goal", "exam goal", "aim", "target", "exam"],
    role: ["role", "student", "tutor", "teacher"],
    institute: ["institute", "school", "college"],
    examDate: ["exam date", "date", "when", "test date"],
    studyHours: ["hours", "time", "study hours", "study time"],
    studyLocation: ["location", "where", "place", "study location"]
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
  
  // Identify field by spoken command
  const identifyFieldByCommand = (transcript: string): string | null => {
    const lowerTranscript = transcript.toLowerCase();
    
    for (const [fieldId, triggers] of Object.entries(voiceFieldTriggers)) {
      for (const trigger of triggers) {
        if (lowerTranscript.includes(trigger)) {
          return fieldId;
        }
      }
    }
    
    return null;
  };
  
  // Focus field programmatically
  const focusField = (fieldId: string) => {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
      setActiveField(fieldId);
      
      toast({
        title: `Field selected: ${fieldId}`,
        description: "Now say your information",
        duration: 2000,
      });
      
      return true;
    }
    return false;
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
      
      // Check if this is a command to select a field
      if (!activeField && event.results[last].isFinal) {
        const detectedField = identifyFieldByCommand(transcript);
        if (detectedField) {
          const focused = focusField(detectedField);
          if (focused) {
            // Field was successfully focused, restart listening for field content
            setTimeout(() => {
              startListening();
            }, 500);
            return;
          }
        }
      }
      
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
        
        // Show success toast
        toast({
          title: "Voice input captured",
          description: processedText.substring(0, 30) + (processedText.length > 30 ? '...' : ''),
          icon: <CheckCircle className="h-4 w-4 text-green-500" />
        });
        
        // Track which fields have been filled by voice
        setVoiceCommands(prev => ({
          ...prev,
          [activeField]: true
        }));
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
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        
        toast({
          title: activeField ? `Listening for ${activeField}...` : "Listening for field name...",
          description: activeField ? "Speak now" : "Say field name like 'name', 'email', etc.",
          duration: 2000
        });
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
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
  
  // Short welcome guidance for current step
  useEffect(() => {
    if (isOpen && !isMuted) {
      // Very brief step guidance
      const stepGuidance: Record<string, string> = {
        role: "Select your role",
        goal: "Choose your exam goal",
        demographics: "Say your details",
        personality: "Select your personality",
        habits: "Tell us your study habits",
        signup: "Complete your signup"
      };
      
      if (currentStep && stepGuidance[currentStep]) {
        setTimeout(() => {
          speakText(stepGuidance[currentStep] + ". Say field name or click on any field.");
        }, 500);
      }
    }

    // Add focus event listeners
    document.addEventListener('focusin', handleFieldFocus);
    
    return () => {
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
      
      {/* Voice command indication */}
      <motion.div 
        className="fixed top-24 right-6 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 max-w-xs"
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs font-medium mb-2">Say field name to focus, then speak to fill:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.keys(fieldPrompts).map(field => (
            <div key={field} className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full ${voiceCommands[field] ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
              <span>{field}</span>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Voice Assistant Controls */}
      <motion.div 
        className="fixed bottom-20 right-6 z-50 flex space-x-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Field focus button */}
        <motion.div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 flex items-center gap-2">
          <p className="text-xs font-medium">
            {activeField ? `Field: ${activeField}` : 'No field selected'}
          </p>
        </motion.div>
        
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
        </div>
      </motion.div>
      
      {/* Listening status indicator */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <motion.div 
            className="bg-indigo-600/90 text-white rounded-full p-8 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <Mic size={48} />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default SignupVoiceAssistant;
