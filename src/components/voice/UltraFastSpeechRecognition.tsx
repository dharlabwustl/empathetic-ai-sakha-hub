
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface UltraFastSpeechRecognitionProps {
  onCommand: (command: string) => void;
  onListeningChange: (isListening: boolean) => void;
  onStopSpeaking: () => void;
  language?: string;
  continuous?: boolean;
  enabled?: boolean;
  manualActivation?: boolean;
}

const UltraFastSpeechRecognition: React.FC<UltraFastSpeechRecognitionProps> = ({
  onCommand,
  onListeningChange,
  onStopSpeaking,
  language = 'en-US',
  continuous = false,
  enabled = true,
  manualActivation = true
}) => {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const isManuallyActivatedRef = useRef(false);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Recognition already stopped');
      }
    }
    setIsListening(false);
    setIsProcessing(false);
    onListeningChange(false);
    isManuallyActivatedRef.current = false;
  }, [onListeningChange]);

  const startListening = useCallback(() => {
    if (!enabled || !('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('Speech recognition not available');
      return;
    }

    // Stop any existing recognition immediately
    if (recognitionRef.current) {
      stopListening();
    }

    // Stop any ongoing speech immediately
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      onStopSpeaking();
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = continuous;
      recognition.interimResults = true;
      recognition.lang = language;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log('🎤 Voice recognition started');
        setIsListening(true);
        setIsProcessing(false);
        onListeningChange(true);
        isManuallyActivatedRef.current = true;
      };

      recognition.onresult = (event) => {
        setIsProcessing(true);
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            const transcript = result[0].transcript.trim();
            console.log('🎤 Final transcript:', transcript);
            
            if (transcript.length > 0) {
              onCommand(transcript);
            }
          }
        }
      };

      recognition.onend = () => {
        console.log('🎤 Voice recognition ended');
        setIsListening(false);
        setIsProcessing(false);
        onListeningChange(false);
        recognitionRef.current = null;
        isManuallyActivatedRef.current = false;
      };

      recognition.onerror = (event) => {
        console.error('🎤 Speech recognition error:', event.error);
        setIsListening(false);
        setIsProcessing(false);
        onListeningChange(false);
        recognitionRef.current = null;
        isManuallyActivatedRef.current = false;
      };

      recognitionRef.current = recognition;
      recognition.start();

      // Auto-stop after 10 seconds for manual activation
      if (manualActivation) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          stopListening();
        }, 10000);
      }

    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsListening(false);
      setIsProcessing(false);
      onListeningChange(false);
    }
  }, [enabled, continuous, language, onCommand, onListeningChange, onStopSpeaking, manualActivation, stopListening]);

  // Handle microphone click events
  useEffect(() => {
    const handleMicrophoneClick = () => {
      console.log('🎤 Microphone clicked, immediate action triggered');
      
      // Immediate response - stop speech first
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        onStopSpeaking();
      }

      // Toggle listening state
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    };

    const handleStartVoiceRecognition = () => {
      if (!isListening) {
        startListening();
      }
    };

    const handleStopVoiceRecognition = () => {
      if (isListening) {
        stopListening();
      }
    };

    window.addEventListener('microphone-clicked', handleMicrophoneClick);
    window.addEventListener('start-voice-recognition', handleStartVoiceRecognition);
    window.addEventListener('stop-voice-recognition', handleStopVoiceRecognition);

    return () => {
      window.removeEventListener('microphone-clicked', handleMicrophoneClick);
      window.removeEventListener('start-voice-recognition', handleStartVoiceRecognition);
      window.removeEventListener('stop-voice-recognition', handleStopVoiceRecognition);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
          recognitionRef.current.stop();
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, [isListening, startListening, stopListening, onStopSpeaking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
          recognitionRef.current.stop();
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return null;
};

export default UltraFastSpeechRecognition;
