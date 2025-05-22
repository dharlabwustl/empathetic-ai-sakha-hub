
import React, { useEffect, useState } from 'react';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { useLocation } from 'react-router-dom';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const location = useLocation();
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Define field mappings based on current step
  const getFieldMappings = () => {
    const baseFields: Record<string, {id: string, type: 'text' | 'email' | 'password' | 'tel' | 'select' | 'checkbox' | 'button' | 'radio'}> = {};
    
    // Map fields based on current step
    switch (currentStep) {
      case "role":
        return {
          "role": { id: "role-student", type: "radio" },
          "continue": { id: "continue-button", type: "button" }
        };
      case "goal":
        return {
          "exam": { id: "exam-goal", type: "select" },
          "neet": { id: "neet-goal", type: "button" },
          "jee": { id: "jee-goal", type: "button" },
          "upsc": { id: "upsc-goal", type: "button" },
          "continue": { id: "continue-button", type: "button" }
        };
      case "demographics":
        return {
          "age": { id: "age", type: "text" },
          "gender": { id: "gender", type: "select" },
          "institute": { id: "institute", type: "text" },
          "examDate": { id: "examDate", type: "text" },
          "continue": { id: "continue-button", type: "button" }
        };
      case "personality":
        return {
          "analytical": { id: "analytical", type: "button" },
          "creative": { id: "creative", type: "button" },
          "practical": { id: "practical", type: "button" },
          "social": { id: "social", type: "button" },
          "continue": { id: "continue-button", type: "button" }
        };
      case "mood":
        return {
          "happy": { id: "happy", type: "button" },
          "focused": { id: "focused", type: "button" },
          "stressed": { id: "stressed", type: "button" },
          "tired": { id: "tired", type: "button" },
          "curious": { id: "curious", type: "button" },
          "continue": { id: "continue-button", type: "button" }
        };
      case "account":
        return {
          "name": { id: "name", type: "text" },
          "email": { id: "email", type: "email" },
          "password": { id: "password", type: "password" },
          "confirmPassword": { id: "confirmPassword", type: "password" },
          "mobile": { id: "mobile", type: "tel" },
          "otp": { id: "otp", type: "text" },
          "agreeTerms": { id: "agreeTerms", type: "checkbox" },
          "submit": { id: "submit-button", type: "button" }
        };
      default:
        return baseFields;
    }
  };

  const fieldMappings = getFieldMappings();
  
  const handleCommandDetected = (command: string, fieldId?: string) => {
    // Handle specific button clicks
    if (command.includes('continue') || command.includes('next')) {
      const continueButton = document.getElementById('continue-button') || 
                             document.querySelector('button[type="submit"]') ||
                             document.querySelector('button:contains("Continue")') ||
                             document.querySelector('button:contains("Next")');
      
      if (continueButton) {
        continueButton.click();
        return;
      }
    }
    
    if (command.includes('submit') || command.includes('create account') || command.includes('sign up')) {
      const submitButton = document.getElementById('submit-button') || 
                           document.querySelector('button[type="submit"]') ||
                           document.querySelector('button:contains("Create")') ||
                           document.querySelector('button:contains("Sign up")');
      
      if (submitButton) {
        submitButton.click();
        return;
      }
    }
    
    // For selection-based steps like personality, mood, role
    if (['role', 'goal', 'personality', 'mood'].includes(currentStep)) {
      const buttons = document.querySelectorAll('button');
      
      for (const button of buttons) {
        const buttonText = button.textContent?.toLowerCase() || '';
        if (command.includes(buttonText)) {
          button.click();
          return;
        }
      }
    }
    
    // Try to find field by command
    for (const [fieldName, field] of Object.entries(fieldMappings)) {
      if (command.toLowerCase().includes(fieldName.toLowerCase())) {
        onVoiceInput(fieldName, command.replace(fieldName, '').trim());
        return;
      }
    }
    
    // Notify user if we couldn't understand the command
    toast({
      title: "Command not recognized",
      description: `Try saying a field name like "${Object.keys(fieldMappings)[0]}" or a value`,
      variant: "default"
    });
  };
  
  // Check if speech synthesis is currently speaking
  useEffect(() => {
    const checkSpeaking = () => {
      setIsSpeaking(window.speechSynthesis?.speaking || false);
    };
    
    // Check every second if speech synthesis is speaking
    const interval = setInterval(checkSpeaking, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  const {
    isListening,
    startListening,
    stopListening,
    cleanup
  } = useVoiceCommands({
    fieldMappings,
    onCommandDetected: handleCommandDetected,
    language: 'en-US',
    autoStart: isOpen && !isSpeaking // Only auto-start if not speaking
  });
  
  // Effect to handle cleanup on route change
  useEffect(() => {
    return () => {
      // Make sure to clean up speech recognition on unmount
      cleanup();
      
      // Also stop any ongoing speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [location.pathname, cleanup]);
  
  // Effect to start/stop listening based on isOpen prop and speech status
  useEffect(() => {
    // Don't listen while speaking to avoid interference
    if (isOpen && !isListening && !isSpeaking) {
      startListening();
    } else if ((!isOpen || isSpeaking) && isListening) {
      stopListening();
    }
  }, [isOpen, isListening, isSpeaking, startListening, stopListening]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-5 left-5 z-50">
      <div 
        className={`p-3 rounded-full shadow-lg cursor-pointer transition-all ${
          isListening 
            ? 'bg-indigo-600 text-white animate-pulse' 
            : 'bg-white text-indigo-600 hover:bg-indigo-50'
        }`}
        onClick={isListening ? stopListening : startListening}
      >
        {isListening ? (
          <Mic className="h-6 w-6" />
        ) : (
          <MicOff className="h-6 w-6" />
        )}
      </div>
    </div>
  );
};

export default SignupVoiceAssistant;
