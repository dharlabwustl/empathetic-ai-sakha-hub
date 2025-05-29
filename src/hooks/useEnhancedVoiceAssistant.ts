
import { useState, useEffect, useRef, useCallback } from 'react';
import { speakWithFemaleVoice, stopAllSpeech } from '@/utils/voiceConfig';

interface VoiceAssistantProps {
  context: 'homepage' | 'post-signup' | 'dashboard';
  userName?: string;
  onCommand?: (command: string, confidence: number) => void;
  isActive?: boolean;
}

export const useEnhancedVoiceAssistant = ({
  context,
  userName,
  onCommand,
  isActive = true
}: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check for speech recognition support
  useEffect(() => {
    const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsSupported(supported);
    
    if (supported && isActive) {
      initializeSpeechRecognition();
    }
    
    return () => {
      cleanup();
    };
  }, [isActive, context]);
  
  const cleanup = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Voice: Recognition cleanup');
      }
    }
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
    }
    
    stopAllSpeech();
    setIsListening(false);
    setIsSpeaking(false);
  }, []);
  
  const initializeSpeechRecognition = useCallback(() => {
    if (!isSupported) return;
    
    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 3;
      
      recognition.onstart = () => {
        setIsListening(true);
        console.log(`🎙️ Voice: Started listening in ${context} context`);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        console.log(`🔇 Voice: Stopped listening in ${context} context`);
        
        // Auto-restart based on context
        if (isActive && shouldAutoRestart()) {
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 2000);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('🚨 Voice: Recognition error:', event.error);
        setIsListening(false);
        
        // Restart on recoverable errors
        if (isActive && ['no-speech', 'audio-capture', 'network'].includes(event.error)) {
          restartTimerRef.current = setTimeout(() => {
            startListening();
          }, 3000);
        }
      };
      
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        
        const currentTranscript = finalTranscript || interimTranscript;
        const currentConfidence = event.results[event.results.length - 1]?.[0]?.confidence || 0;
        
        setTranscript(currentTranscript.trim());
        setConfidence(currentConfidence);
        
        // Process final results
        if (finalTranscript && onCommand) {
          onCommand(finalTranscript.trim(), currentConfidence);
          resetInactivityTimer();
        }
      };
      
      recognitionRef.current = recognition;
    } catch (error) {
      console.error('🚨 Voice: Failed to initialize recognition:', error);
    }
  }, [isSupported, isActive, context, onCommand]);
  
  const shouldAutoRestart = useCallback(() => {
    switch (context) {
      case 'homepage':
        return true; // Always restart on homepage
      case 'post-signup':
        return false; // Don't auto-restart after signup
      case 'dashboard':
        return false; // Only restart when explicitly triggered
      default:
        return false;
    }
  }, [context]);
  
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Set inactivity reminders based on context
    const inactivityTime = context === 'homepage' ? 45000 : 60000; // 45s for homepage, 60s for others
    
    inactivityTimerRef.current = setTimeout(() => {
      if (context === 'homepage' && !isSpeaking) {
        speak("Hi there! I'm here to help you learn about Prep-Zer. Feel free to ask me anything about our exam preparation platform!");
      } else if (context === 'dashboard' && !isSpeaking) {
        speak(`${userName ? `${userName}, ` : ''}Need any help with your studies? I'm here to assist you!`);
      }
    }, inactivityTime);
  }, [context, isSpeaking, userName]);
  
  const speak = useCallback(async (text: string): Promise<void> => {
    if (!isActive) return;
    
    return new Promise((resolve) => {
      speakWithFemaleVoice(
        text,
        {},
        () => setIsSpeaking(true),
        () => {
          setIsSpeaking(false);
          resolve();
        }
      );
    });
  }, [isActive]);
  
  const startListening = useCallback(() => {
    if (!isSupported || !isActive || isListening) return;
    
    try {
      if (!recognitionRef.current) {
        initializeSpeechRecognition();
      }
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
        resetInactivityTimer();
      }
    } catch (error) {
      console.error('🚨 Voice: Failed to start listening:', error);
    }
  }, [isSupported, isActive, isListening, initializeSpeechRecognition, resetInactivityTimer]);
  
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Voice: Stop listening cleanup');
      }
    }
    
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
    }
  }, []);
  
  const stopSpeaking = useCallback(() => {
    stopAllSpeech();
    setIsSpeaking(false);
  }, []);
  
  return {
    isListening,
    isSpeaking,
    transcript,
    confidence,
    isSupported,
    speak,
    startListening,
    stopListening,
    stopSpeaking,
    cleanup
  };
};
