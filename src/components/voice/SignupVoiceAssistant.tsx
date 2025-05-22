
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
  const [availableFields, setAvailableFields] = useState<string[]>([]);
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
    agreeTerms: "Say 'I agree' to accept terms",
    otp: "Say your OTP code",
  };
  
  // Command recognition for field selection
  const fieldCommandMap: Record<string, string> = {
    "name": "name",
    "email": "email",
    "mobile": "mobile",
    "phone": "mobile",
    "number": "mobile",
    "phone number": "mobile",
    "password": "password",
    "confirm password": "confirmPassword",
    "password confirm": "confirmPassword",
    "goal": "goal",
    "exam": "goal",
    "role": "role",
    "institute": "institute",
    "college": "institute",
    "school": "institute",
    "exam date": "examDate",
    "date": "examDate",
    "study hours": "studyHours",
    "hours": "studyHours",
    "study location": "studyLocation",
    "location": "studyLocation",
    "agree": "agreeTerms",
    "terms": "agreeTerms",
    "otp": "otp",
    "code": "otp",
  };
  
  // Scan the current form for available fields
  useEffect(() => {
    const scanForFields = () => {
      const inputElements = document.querySelectorAll('input, select, textarea');
      const fields: string[] = [];
      
      inputElements.forEach(elem => {
        const id = elem.id;
        if (id && fieldPrompts[id]) {
          fields.push(id);
        }
      });
      
      setAvailableFields(fields);
    };
    
    // Scan when step changes or component opens
    if (isOpen) {
      setTimeout(scanForFields, 500);
    }
  }, [currentStep, isOpen]);
  
  // Function to find field by voice command
  const findFieldByCommand = (command: string): string | null => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Direct match
    if (fieldCommandMap[lowerCommand]) {
      return fieldCommandMap[lowerCommand];
    }
    
    // Partial match
    for (const [key, value] of Object.entries(fieldCommandMap)) {
      if (lowerCommand.includes(key)) {
        return value;
      }
    }
    
    return null;
  };
  
  // Function to focus on a field by id
  const focusFieldById = (id: string) => {
    try {
      const field = document.getElementById(id);
      if (field && field instanceof HTMLElement) {
        field.focus();
        setActiveField(id);
        setIsFieldPromptVisible(true);
        setTimeout(() => setIsFieldPromptVisible(false), 3000);
        
        // Acknowledge field selection
        toast({
          title: "Field Selected",
          description: `Now say your ${id} information`,
        });
        
        // Read field prompt if not muted
        if (!isMuted) {
          speakText(fieldPrompts[id] || `Say your ${id}`);
        }
      }
    } catch (error) {
      console.error("Error focusing field:", error);
    }
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
    
    try {
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
        
        console.log("Voice transcript:", transcript);
        
        // Check if transcript is a field selection command
        if (event.results[last].isFinal) {
          const fieldId = findFieldByCommand(transcript);
          
          // Handle navigation commands
          if (["next", "submit", "continue", "proceed"].some(cmd => 
            transcript.toLowerCase().includes(cmd))) {
            
            // Find and click the next/submit button
            const submitButtons = document.querySelectorAll('button[type="submit"]');
            const nextButtons = document.querySelectorAll('button:not([type="button"])');
            
            if (submitButtons.length > 0) {
              (submitButtons[0] as HTMLButtonElement).click();
              return;
            } else if (nextButtons.length > 0) {
              (nextButtons[0] as HTMLButtonElement).click();
              return;
            }
          }
          
          // Select field if command matches and no field is currently active
          if (fieldId && (!activeField || activeField !== fieldId)) {
            focusFieldById(fieldId);
            return;
          }
          
          // Process value for active field
          if (activeField) {
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
            
            // Handle checkbox for agreeTerms
            if (activeField === 'agreeTerms') {
              const checkbox = document.getElementById(activeField) as HTMLInputElement;
              if (checkbox && ["yes", "agree", "i agree", "accept", "true"].some(val => 
                transcript.toLowerCase().includes(val))) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                
                toast({
                  title: checkbox.checked ? "Terms Accepted" : "Terms Declined",
                  description: "Voice command processed",
                });
              }
              return;
            }
            
            // Pass final transcript to parent component
            onVoiceInput(activeField, processedText);
            
            // Show success toast instead of speaking
            toast({
              title: "Voice Input Captured",
              description: `${activeField}: ${transcript.substring(0, 30)}${transcript.length > 30 ? '...' : ''}`,
            });
          }
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
        
        // Restart listening automatically if not muted
        if (isOpen && !isMuted) {
          setTimeout(() => {
            startListening();
          }, 1000);
        }
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
    } catch (err) {
      console.error("Error initializing speech recognition:", err);
      toast({
        title: "Voice Recognition Error",
        description: "Could not initialize voice recognition",
        variant: "destructive"
      });
    }
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
          title: "Listening...",
          description: activeField 
            ? `Speak now for ${activeField}` 
            : "Say a field name (like 'name', 'email', 'mobile')",
        });
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
    } else {
      toast({
        title: "Voice Recognition Unavailable",
        description: "Please try again or use keyboard input",
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
  
  // Provide guidance on field activation and component mounting
  useEffect(() => {
    // Step specific guidance - shortened and more direct
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
    
    // Load available voices
    if (window.speechSynthesis) {
      const loadVoices = () => {
        // Voices loaded, no need to do anything special
      };
      
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      // Trigger voice loading
      window.speechSynthesis.getVoices();
    }
    
    // Provide guidance when step changes - only on initial load
    if (currentStep && stepGuidance[currentStep] && isOpen && !isMuted) {
      setTimeout(() => {
        speakText(stepGuidance[currentStep]);
      }, 800);
    }
    
    // Start listening automatically when opened
    if (isOpen && !isListening) {
      setTimeout(() => {
        startListening();
      }, 1000);
    }
    
    // Add focus event listeners for field tracking
    document.addEventListener('focusin', handleFieldFocus);
    
    // Set up continuous listening mode
    const listenContinuously = () => {
      if (isOpen && !isMuted && !isListening) {
        startListening();
      }
    };
    
    const intervalId = setInterval(listenContinuously, 5000);
    
    return () => {
      // Clean up
      document.removeEventListener('focusin', handleFieldFocus);
      clearInterval(intervalId);
      
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
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [currentStep, isOpen, isMuted, isListening]);
  
  // Start scanning for available fields when component loads
  useEffect(() => {
    if (isOpen) {
      const scanInterval = setInterval(() => {
        const inputElements = document.querySelectorAll('input, select, textarea');
        const fields: string[] = [];
        
        inputElements.forEach(elem => {
          const id = elem.id;
          if (id && fieldPrompts[id]) {
            fields.push(id);
          }
        });
        
        if (JSON.stringify(fields) !== JSON.stringify(availableFields)) {
          setAvailableFields(fields);
        }
      }, 1000);
      
      return () => clearInterval(scanInterval);
    }
  }, [isOpen, availableFields]);
  
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
      
      {/* Available fields list - helpful for users */}
      <AnimatePresence>
        {isListening && availableFields.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-32 left-6 z-50 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg p-3 shadow-lg max-w-xs"
          >
            <p className="text-xs font-medium mb-1.5">Available voice commands:</p>
            <div className="flex flex-wrap gap-1">
              {availableFields.map(field => (
                <span 
                  key={field}
                  className={`text-xs px-2 py-0.5 rounded ${
                    activeField === field 
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {field}
                </span>
              ))}
              <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                next/continue
              </span>
            </div>
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
            ) : (
              <span className="text-blue-600 font-medium">Say field name</span>
            )}
          </div>
        </div>
        
        {/* Help text */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-2 bg-blue-50 dark:bg-blue-900/30 p-2 rounded text-xs text-blue-700 dark:text-blue-300 shadow-sm"
        >
          <p className="mb-1 font-medium">Voice Commands:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Say <span className="font-medium">"name"</span> to select name field</li>
            <li>Say <span className="font-medium">"email"</span> to select email field</li>
            <li>Say <span className="font-medium">"next"</span> to continue</li>
          </ul>
        </motion.div>
        
        {/* Status indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="h-2 w-2 bg-white rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default SignupVoiceAssistant;
