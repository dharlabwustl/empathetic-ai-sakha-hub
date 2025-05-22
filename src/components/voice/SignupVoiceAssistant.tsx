
import React, { useEffect, useState, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SignupVoiceAssistantProps {
  onVoiceInput: (fieldName: string, text: string) => void;
  currentStep: string;
  isOpen: boolean;
}

const SignupVoiceAssistant: React.FC<SignupVoiceAssistantProps> = ({ 
  onVoiceInput, 
  currentStep,
  isOpen = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [targetField, setTargetField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const cooldownRef = useRef<boolean>(false);
  const lastCommandTimeRef = useRef<number>(0);
  
  // Clean up function to ensure proper resource management
  const cleanupRecognition = () => {
    if (recognitionRef.current) {
      try {
        // Always remove all event listeners before stopping
        if (recognitionRef.current.onresult) recognitionRef.current.onresult = null;
        if (recognitionRef.current.onerror) recognitionRef.current.onerror = null;
        if (recognitionRef.current.onend) recognitionRef.current.onend = null;
        if (recognitionRef.current.onstart) recognitionRef.current.onstart = null;
        
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors during cleanup
      } finally {
        recognitionRef.current = null;
      }
    }
    
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsListening(false);
  };
  
  // Reset everything when component unmounts or visibility changes
  useEffect(() => {
    return cleanupRecognition;
  }, []);
  
  // Handle changes in the open state
  useEffect(() => {
    if (!isOpen) {
      cleanupRecognition();
    }
  }, [isOpen]);
  
  // Handle step change - reset targeting
  useEffect(() => {
    setTargetField(null);
  }, [currentStep]);
  
  const getFieldsForCurrentStep = (): string[] => {
    // Return available field names based on current step
    switch (currentStep) {
      case "role":
        return [];
      case "goal":
        return [];
      case "demographics":
        return ["name", "age", "location", "institute"];
      case "personality":
        return [];
      case "sentiment":
        return [];
      case "habits":
        return ["studyTime", "studyMethod"];
      case "interests":
        return ["interests"];
      case "signup":
        return ["name", "email", "mobile"];
      default:
        return [];
    }
  };
  
  const handleStartListening = (fieldName: string) => {
    // Don't start if cooldown is active
    if (cooldownRef.current) {
      toast({
        title: "Please wait",
        description: "Voice recognition is cooling down. Try again in a moment.",
        variant: "default",
      });
      return;
    }
    
    // Prevent rapid fire commands
    const now = Date.now();
    if (now - lastCommandTimeRef.current < 1000) {
      return;
    }
    lastCommandTimeRef.current = now;
    
    // Clean up any existing recognition instance
    cleanupRecognition();
    
    setTargetField(fieldName);
    setError(null);
    
    // Start cooldown
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 1000);
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError("Speech recognition is not supported in this browser");
      return;
    }
    
    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        
        // Auto-stop after 5 seconds to prevent endless listening
        timeoutRef.current = window.setTimeout(() => {
          if (recognitionRef.current) {
            try {
              recognitionRef.current.stop();
            } catch (e) {
              // Ignore errors during auto-stop
            }
          }
        }, 5000);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log(`Voice recognized for field ${fieldName}: ${transcript}`);
        
        // Process and pass the transcript to the parent component
        onVoiceInput(fieldName, transcript);
        
        // Provide feedback
        toast({
          title: "Input recognized", 
          description: `You said: "${transcript}"`,
        });
        
        // Auto-cleanup after successful recognition
        timeoutRef.current = window.setTimeout(() => {
          setIsListening(false);
          setTargetField(null);
        }, 500);
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        
        if (event.error === 'no-speech') {
          setError("No speech was detected. Please try again.");
        } else if (event.error === 'aborted') {
          // Ignore abort errors
        } else {
          setError(`Error: ${event.error}`);
        }
        
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      // Store the recognition object and start
      recognitionRef.current = recognition;
      recognition.start();
      
    } catch (error) {
      console.error("Failed to initialize speech recognition:", error);
      setError("Failed to start voice recognition");
      setIsListening(false);
    }
  };
  
  const handleStopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsListening(false);
    setTargetField(null);
  };
  
  // Don't render if assistant is not open
  if (!isOpen) return null;
  
  // Get available fields for the current step
  const availableFields = getFieldsForCurrentStep();
  
  if (availableFields.length === 0) {
    return (
      <div className="fixed bottom-20 right-5 z-50 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          No voice input fields available for this step
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-20 right-5 z-50 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
      <h4 className="text-sm font-medium mb-2">Voice Assistant</h4>
      
      {error && (
        <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded-md flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="space-y-2">
        {availableFields.map((field) => (
          <div key={field} className="flex items-center justify-between">
            <span className="text-sm capitalize">{field}</span>
            <button
              onClick={() => targetField === field && isListening ? handleStopListening() : handleStartListening(field)}
              className={`p-2 rounded-full ${
                targetField === field && isListening
                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              }`}
              aria-label={targetField === field && isListening ? "Stop listening" : `Speak for ${field}`}
            >
              {targetField === field && isListening ? (
                <MicOff className="h-4 w-4 animate-pulse" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>
      
      {isListening && (
        <div className="mt-3 text-xs text-center">
          <span className="text-blue-600 dark:text-blue-400">Listening...</span>
          <span className="inline-block w-5 overflow-hidden">
            <span className="animate-bounce inline-block">.</span>
            <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="animate-bounce inline-block" style={{ animationDelay: '0.4s' }}>.</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default SignupVoiceAssistant;
