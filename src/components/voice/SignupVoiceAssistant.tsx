
import React, { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Field specific voice prompts
  const fieldPrompts: Record<string, string> = {
    name: "Please say your full name",
    email: "Please say your email address. You can spell it out by saying: 'at' for @ and 'dot' for period",
    mobile: "Please say your mobile number digit by digit",
    password: "Please say your password. For privacy, we will not display what you say",
    confirmPassword: "Please confirm your password by saying it again",
    goal: "Please say which exam you are preparing for, like NEET, JEE, UPSC or others",
    role: "Please say your role, either student or tutor", 
    institute: "Please say the name of your institute or school",
    examDate: "Please say your exam date in format day, month, year",
    studyHours: "Please say how many hours you can study daily",
    studyLocation: "Please say where you usually study",
  };
  
  // Get currently focused element and set as active field
  const handleFieldFocus = () => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.id && fieldPrompts[activeElement.id]) {
      setActiveField(activeElement.id);
      
      // Speak prompt for this field
      if (!isMuted && isOpen) {
        speakText(fieldPrompts[activeElement.id]);
      }
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
        
        // Provide feedback
        if (!isMuted) {
          speakText(`You said: ${transcript.substring(0, 30)}${transcript.length > 30 ? '...' : ''}`);
        }
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
        description: "There was a problem understanding you. Please try again.",
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
          description: `Please speak for the ${activeField} field`,
        });
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
    } else {
      toast({
        title: "Please select a field first",
        description: "Click into a form field before using voice input",
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
    // Voice guidance for the current step
    const stepGuidance: Record<string, string> = {
      role: "Please select your role. You can use voice commands to select student or tutor.",
      goal: "Please select which exam you're preparing for. You can use voice commands to make a selection.",
      demographics: "Please fill in your demographic information. Click into any field to use voice input.",
      personality: "Select your personality type. You can use voice commands to make a selection.",
      sentiment: "How are you feeling today? Select your mood or say it using voice commands.",
      habits: "Tell us about your study habits. Click into any field to use voice input.",
      interests: "Select your interests. You can use voice commands to select subjects.",
      signup: "Complete your signup details. Click into any field to use voice input."
    };
    
    // Provide guidance when step changes
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
    <div className="fixed bottom-20 right-6 z-50">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 flex items-center gap-2">
        <Button 
          size="sm" 
          variant={isListening ? "destructive" : "default"}
          className="w-10 h-10 rounded-full"
          onClick={isListening ? stopListening : startListening}
          disabled={!activeField}
          title={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </Button>
        
        <Button 
          size="sm" 
          variant="outline"
          className="w-10 h-10 rounded-full"
          onClick={toggleMute}
          title={isMuted ? "Unmute voice guidance" : "Mute voice guidance"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
        
        <div className="text-xs max-w-[150px] truncate">
          {activeField ? `Active: ${activeField}` : 'Click on a field'}
        </div>
      </div>
    </div>
  );
};

export default SignupVoiceAssistant;
