
import { useState, useEffect, useRef } from 'react';
import { useToast } from './use-toast';

type VoiceFieldType = 'text' | 'email' | 'password' | 'tel' | 'select' | 'checkbox' | 'button' | 'radio';
type FieldMapping = Record<string, {id: string, type: VoiceFieldType}>;

interface UseVoiceCommandsOptions {
  fieldMappings: FieldMapping;
  handleSubmit?: () => void;
  onCommandDetected?: (command: string, fieldId?: string) => void;
  language?: string;
  autoStart?: boolean;
}

export const useVoiceCommands = ({
  fieldMappings,
  handleSubmit,
  onCommandDetected,
  language = 'en-US',
  autoStart = false
}: UseVoiceCommandsOptions) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [transcript, setTranscript] = useState('');
  
  // Map of common voice command patterns to actual field identifiers
  const commandPatterns: Record<string, string[]> = {
    name: ['name', 'full name', 'my name', 'username', 'first name', 'last name'],
    email: ['email', 'email address', 'my email', 'mail', 'e-mail'],
    password: ['password', 'pass', 'my password', 'secret', 'security code'],
    confirmPassword: ['confirm password', 'confirm pass', 'password again', 'repeat password', 'verify password'],
    mobile: ['mobile', 'phone', 'mobile number', 'phone number', 'cell phone', 'cell', 'telephone'],
    age: ['age', 'my age', 'years', 'years old'],
    institute: ['institute', 'school', 'college', 'institution', 'university', 'place of study'],
    otp: ['otp', 'verification code', 'code', 'one time password', 'verification'],
    submit: ['submit', 'create account', 'sign up', 'signup', 'register', 'continue', 'next', 'go ahead', 'proceed'],
    back: ['back', 'go back', 'previous', 'return', 'revert'],
    agree: ['agree', 'terms', 'accept terms', 'accept', 'conditions', 'privacy policy', 'check box'],
  };

  // Find field by voice command
  const findFieldByCommand = (command: string): string | null => {
    // Lowercase and remove extra spaces
    command = command.toLowerCase().trim();
    console.log("Finding field for command:", command);
    
    // Direct field match (if they say the exact field name)
    const directField = Object.keys(fieldMappings).find(fieldId => {
      const fieldName = fieldId.toLowerCase();
      return command === fieldName ||
        command === `${fieldName} field` ||
        command.includes(`select ${fieldName}`) ||
        command.includes(`go to ${fieldName}`) ||
        command.includes(`fill ${fieldName}`);
    });
    
    if (directField) {
      console.log("Direct field match found:", directField);
      return directField;
    }
    
    // Pattern match
    for (const [key, patterns] of Object.entries(commandPatterns)) {
      if (patterns.some(pattern => {
        return command === pattern ||
          command === `${pattern} field` ||
          command.includes(`select ${pattern}`) ||
          command.includes(`go to ${pattern}`) ||
          command.includes(`fill ${pattern}`) ||
          command.includes(`${pattern} box`) ||
          command.includes(`enter ${pattern}`);
      })) {
        // Find the matching field ID in the mappings
        const matchingField = Object.keys(fieldMappings).find(fieldId => 
          fieldId.toLowerCase().includes(key.toLowerCase())
        );
        
        if (matchingField) {
          console.log("Pattern match found:", key, "->", matchingField);
          return matchingField;
        }
      }
    }
    
    // Try to match based on similar field names
    for (const fieldId of Object.keys(fieldMappings)) {
      const fieldNameWords = fieldId.toLowerCase().split(/[-_\s]/);
      for (const word of fieldNameWords) {
        if (command.includes(word) && word.length > 2) {
          console.log("Partial field name match found:", word, "->", fieldId);
          return fieldId;
        }
      }
    }
    
    console.log("No field match found for:", command);
    return null;
  };

  // Handle setting a specific value in a field
  const setFieldValue = (fieldId: string, value: string) => {
    console.log(`Setting value for field ${fieldId}: "${value}"`);
    const field = document.getElementById(fieldId) as HTMLInputElement | HTMLSelectElement;
    if (!field) {
      console.error("Field not found:", fieldId);
      return false;
    }
    
    const fieldType = fieldMappings[fieldId]?.type || 'text';
    console.log(`Field type: ${fieldType}`);
    
    // Apply appropriate value based on field type
    switch (fieldType) {
      case 'text':
      case 'email':
      case 'tel':
        if (field instanceof HTMLInputElement) {
          field.value = value;
          field.dispatchEvent(new Event('input', { bubbles: true }));
          field.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        break;
      case 'password':
        if (field instanceof HTMLInputElement) {
          // For security, don't display the password but set it
          field.value = value;
          field.dispatchEvent(new Event('input', { bubbles: true }));
          field.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        break;
      case 'checkbox':
        if (field instanceof HTMLInputElement) {
          const shouldCheck = ['yes', 'true', 'check', 'enable', 'agree', 'accept', 'okay', 'ok'].includes(value.toLowerCase());
          field.checked = shouldCheck;
          field.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        break;
      case 'select':
        if (field instanceof HTMLSelectElement) {
          // Try to find option that contains the spoken value
          const options = Array.from(field.options);
          const matchingOption = options.find(option => 
            option.text.toLowerCase().includes(value.toLowerCase())
          );
          
          if (matchingOption) {
            field.value = matchingOption.value;
            field.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
          }
          
          // If no direct match, try to find partial matches
          const partialMatchingOption = options.find(option => {
            const optionWords = option.text.toLowerCase().split(/\s+/);
            return optionWords.some(word => value.toLowerCase().includes(word) && word.length > 2);
          });
          
          if (partialMatchingOption) {
            field.value = partialMatchingOption.value;
            field.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
          }
        }
        break;
      case 'radio':
        // Find radio buttons in the same group
        const radioGroup = document.querySelectorAll(`input[name="${field.name}"]`);
        const matchingRadio = Array.from(radioGroup).find((radio) => {
          const radioElement = radio as HTMLInputElement;
          const label = document.querySelector(`label[for="${radioElement.id}"]`);
          return label && label.textContent?.toLowerCase().includes(value.toLowerCase());
        }) as HTMLInputElement | undefined;
        
        if (matchingRadio) {
          matchingRadio.checked = true;
          matchingRadio.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        break;
      case 'button':
        if (field instanceof HTMLButtonElement || field instanceof HTMLInputElement) {
          field.click();
          return true;
        }
        break;
      default:
        return false;
    }
    
    return false;
  };

  // Process voice commands
  const processVoiceCommand = (transcript: string) => {
    setTranscript(transcript);
    
    // Convert to lowercase for easier matching
    const command = transcript.toLowerCase().trim();
    console.log('Voice command detected:', command);
    
    // Handle special commands
    if (command.includes('submit') || command.includes('sign up') || command.includes('create account') || 
        command.includes('continue') || command.includes('next') || command.includes('submit form')) {
      if (handleSubmit) {
        handleSubmit();
        toast({ title: "Submitting form", description: "Your form has been submitted" });
        return;
      }
    }
    
    if (command.includes('stop listening') || command.includes('stop voice') || command.includes('cancel voice')) {
      stopListening();
      toast({ title: "Voice commands stopped", description: "Voice input has been disabled" });
      return;
    }
    
    // If we have an active field, try to fill it with the spoken value
    if (activeField) {
      const success = setFieldValue(activeField, transcript);
      
      if (success) {
        toast({ 
          title: `Field updated`,
          description: `"${activeField}" field has been filled` 
        });
        
        // Auto-advance to the next field
        const fieldIds = Object.keys(fieldMappings);
        const currentIndex = fieldIds.indexOf(activeField);
        
        if (currentIndex >= 0 && currentIndex < fieldIds.length - 1) {
          const nextFieldId = fieldIds[currentIndex + 1];
          setActiveField(nextFieldId);
          focusField(nextFieldId);
          toast({ 
            title: `Next field activated`,
            description: `Say a value for "${nextFieldId}"` 
          });
        } else {
          setActiveField(null);
        }
        
        return;
      }
    }
    
    // Check for field navigation commands
    if (command.includes('next field')) {
      const fieldIds = Object.keys(fieldMappings);
      const currentIndex = activeField ? fieldIds.indexOf(activeField) : -1;
      
      if (currentIndex >= -1 && currentIndex < fieldIds.length - 1) {
        const nextFieldId = fieldIds[currentIndex + 1];
        setActiveField(nextFieldId);
        focusField(nextFieldId);
        toast({ 
          title: `Field activated`,
          description: `Say a value for "${nextFieldId}"` 
        });
      }
      return;
    }
    
    if (command.includes('previous field')) {
      const fieldIds = Object.keys(fieldMappings);
      const currentIndex = activeField ? fieldIds.indexOf(activeField) : fieldIds.length;
      
      if (currentIndex > 0) {
        const prevFieldId = fieldIds[currentIndex - 1];
        setActiveField(prevFieldId);
        focusField(prevFieldId);
        toast({ 
          title: `Field activated`,
          description: `Say a value for "${prevFieldId}"` 
        });
      }
      return;
    }
    
    // Try to detect which field the user wants to fill
    const detectedField = findFieldByCommand(command);
    
    if (detectedField) {
      setActiveField(detectedField);
      focusField(detectedField);
      
      toast({ 
        title: `Field activated`,
        description: `Say a value for "${detectedField}"` 
      });
      
      return;
    }
    
    // Notify the parent component about command detection
    if (onCommandDetected) {
      onCommandDetected(command, activeField || undefined);
    }
  };

  // Focus a field by ID
  const focusField = (fieldId: string) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.focus();
      
      // If it's an input, also set cursor at the end
      if (field instanceof HTMLInputElement) {
        field.setSelectionRange(field.value.length, field.value.length);
      }
    }
  };

  // Start listening for voice commands
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive"
      });
      return;
    }
    
    // Clear any existing recognition
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    
    // Create new recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.lang = language;
    recognition.continuous = true;  // Changed to true for continuous listening
    recognition.interimResults = true;
    recognition.maxAlternatives = 2;  // Increased to get better matching
    
    recognition.onstart = () => {
      setIsListening(true);
      console.log('Voice recognition started');
      toast({
        title: "Listening for voice commands",
        description: activeField 
          ? `Say a value for "${activeField}"` 
          : "Say a field name or command"
      });
    };
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current];
      
      if (result.isFinal) {
        const transcript = result[0].transcript.trim();
        console.log("Final transcript:", transcript);
        processVoiceCommand(transcript);
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
      console.log('Voice recognition ended');
      
      // Auto-restart recognition after a short delay to allow continuous interaction
      setTimeout(() => {
        if (document.visibilityState === 'visible' && recognitionRef.current) {
          try {
            recognitionRef.current.start();
            console.log('Voice recognition auto-restarted');
          } catch (error) {
            console.error('Error auto-restarting voice recognition:', error);
          }
        }
      }, 500);
    };
    
    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      setIsListening(false);
      
      if (event.error !== 'aborted') {
        toast({
          title: "Voice recognition error",
          description: "Please try again or use keyboard input",
          variant: "destructive"
        });
      }
      
      // Auto-restart on non-critical errors after a delay
      if (event.error !== 'aborted' && event.error !== 'not-allowed') {
        setTimeout(() => {
          if (document.visibilityState === 'visible' && recognitionRef.current) {
            try {
              recognitionRef.current.start();
              console.log('Voice recognition restarted after error');
            } catch (error) {
              console.error('Error restarting voice recognition:', error);
            }
          }
        }, 2000);
      }
    };
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      toast({
        title: "Voice recognition error",
        description: "Could not start voice input. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Stop listening for voice commands
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setActiveField(null);
  };

  // Auto-start listening if enabled
  useEffect(() => {
    if (autoStart) {
      startListening();
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [autoStart]);
  
  // When visibility changes, restart or stop recognition
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (isListening && !recognitionRef.current) {
          startListening();
        }
      } else {
        if (recognitionRef.current) {
          recognitionRef.current.abort();
          recognitionRef.current = null;
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isListening]);

  return {
    isListening,
    startListening,
    stopListening,
    activeField,
    setActiveField,
    transcript
  };
};
