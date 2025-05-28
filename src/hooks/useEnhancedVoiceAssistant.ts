
import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceConfig {
  enabled: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  pitch: number;
  voice: SpeechSynthesisVoice | null;
  language: string;
}

interface UseEnhancedVoiceAssistantProps {
  context: 'homepage' | 'post-signup' | 'dashboard';
  userName?: string;
  onCommand?: (command: string, confidence: number) => void;
  reminderInterval?: number; // in seconds
}

export const useEnhancedVoiceAssistant = ({
  context,
  userName,
  onCommand,
  reminderInterval = context === 'homepage' ? 45 : 60
}: UseEnhancedVoiceAssistantProps) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [partialTranscript, setPartialTranscript] = useState('');
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const restartTimerRef = useRef<number | null>(null);
  const reminderTimerRef = useRef<number | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>({
    enabled: true,
    muted: false,
    volume: 0.8,
    rate: 0.95,
    pitch: 1.1,
    voice: null,
    language: 'en-US'
  });

  // Initialize preferred female voice
  useEffect(() => {
    const loadVoices = () => {
      if (!('speechSynthesis' in window)) return;
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoices = [
        'Google US English Female',
        'Microsoft Zira',
        'Samantha',
        'Karen'
      ];
      
      let selectedVoice = null;
      for (const voiceName of femaleVoices) {
        const voice = voices.find(v => v.name.includes(voiceName));
        if (voice) {
          selectedVoice = voice;
          break;
        }
      }
      
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices.find(v => v.lang.includes('en')) || voices[0];
      }
      
      if (selectedVoice) {
        setVoiceConfig(prev => ({ ...prev, voice: selectedVoice }));
      }
    };

    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Initialize speech recognition with robust error handling
  const initSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return false;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = voiceConfig.language;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        retryCountRef.current = 0;
        setLastInteraction(Date.now());
      };

      recognition.onend = () => {
        setIsListening(false);
        // Auto-restart if enabled and not manually stopped
        if (voiceConfig.enabled && !voiceConfig.muted && retryCountRef.current < maxRetries) {
          restartTimerRef.current = window.setTimeout(() => {
            startListening();
          }, 1000);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        retryCountRef.current++;
        if (retryCountRef.current < maxRetries && voiceConfig.enabled) {
          restartTimerRef.current = window.setTimeout(() => {
            initSpeechRecognition();
            startListening();
          }, 2000 * retryCountRef.current); // Exponential backoff
        }
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript.trim();
          const confidence = result[0].confidence;
          
          if (result.isFinal) {
            finalTranscript += transcript;
            setTranscript(finalTranscript);
            setConfidence(confidence);
            setPartialTranscript('');
            setLastInteraction(Date.now());
            
            // Process command with partial matching
            if (onCommand && finalTranscript) {
              onCommand(finalTranscript, confidence);
            }
          } else {
            interimTranscript += transcript;
            setPartialTranscript(interimTranscript);
            
            // Intelligent partial matching for faster responses
            if (interimTranscript.length > 3 && onCommand) {
              const partialConfidence = Math.min(confidence * 0.7, 0.8);
              onCommand(interimTranscript, partialConfidence);
            }
          }
        }
      };

      recognitionRef.current = recognition;
      return true;
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      return false;
    }
  }, [voiceConfig.language, voiceConfig.enabled, voiceConfig.muted, onCommand]);

  // Enhanced speak function with PREPZR pronunciation fix
  const speak = useCallback((text: string, options?: Partial<VoiceConfig>) => {
    if (!voiceConfig.enabled || voiceConfig.muted || !('speechSynthesis' in window)) {
      return false;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Fix PREPZR pronunciation
    const correctedText = text
      .replace(/PREPZR/gi, 'PREP ZER')
      .replace(/Prepzr/g, 'Prep Zer')
      .replace(/prepzr/gi, 'prep zer');

    const utterance = new SpeechSynthesisUtterance(correctedText);
    const finalConfig = { ...voiceConfig, ...options };

    if (finalConfig.voice) {
      utterance.voice = finalConfig.voice;
    }
    utterance.volume = finalConfig.volume;
    utterance.rate = finalConfig.rate;
    utterance.pitch = finalConfig.pitch;
    utterance.lang = finalConfig.language;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setLastInteraction(Date.now());
    };
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  }, [voiceConfig]);

  // Start listening function
  const startListening = useCallback(() => {
    if (!voiceConfig.enabled || voiceConfig.muted) return false;

    if (!recognitionRef.current) {
      const initialized = initSpeechRecognition();
      if (!initialized) return false;
    }

    try {
      recognitionRef.current?.start();
      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      return false;
    }
  }, [voiceConfig.enabled, voiceConfig.muted, initSpeechRecognition]);

  // Stop listening function
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
    
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  }, []);

  // Stop speaking function
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Reminder system based on context
  useEffect(() => {
    if (!voiceConfig.enabled || voiceConfig.muted) return;

    const checkForReminder = () => {
      const timeSinceLastInteraction = Date.now() - lastInteraction;
      const shouldRemind = timeSinceLastInteraction >= (reminderInterval * 1000);
      
      if (shouldRemind && !isSpeaking) {
        let reminderMessage = '';
        
        switch (context) {
          case 'homepage':
            reminderMessage = "Hi there! I'm here to help you learn about PREPZR. Feel free to ask me anything about our exam preparation platform or say 'free trial' to get started!";
            break;
          case 'post-signup':
            reminderMessage = `Welcome ${userName}! Ready to begin your exam preparation journey? I can help guide you through your first steps.`;
            break;
          case 'dashboard':
            reminderMessage = `${userName}, need any help with your studies? I'm here to assist with your learning journey.`;
            break;
        }
        
        if (reminderMessage) {
          speak(reminderMessage);
        }
      }
    };

    reminderTimerRef.current = window.setInterval(checkForReminder, 10000); // Check every 10 seconds

    return () => {
      if (reminderTimerRef.current) {
        clearInterval(reminderTimerRef.current);
      }
    };
  }, [context, userName, reminderInterval, lastInteraction, isSpeaking, voiceConfig.enabled, voiceConfig.muted, speak]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
      stopSpeaking();
      if (reminderTimerRef.current) {
        clearInterval(reminderTimerRef.current);
      }
    };
  }, [stopListening, stopSpeaking]);

  // Toggle functions
  const toggleMute = useCallback(() => {
    setVoiceConfig(prev => {
      const newMuted = !prev.muted;
      if (newMuted) {
        stopListening();
        stopSpeaking();
      } else if (prev.enabled) {
        startListening();
      }
      return { ...prev, muted: newMuted };
    });
  }, [stopListening, stopSpeaking, startListening]);

  const toggleEnabled = useCallback(() => {
    setVoiceConfig(prev => {
      const newEnabled = !prev.enabled;
      if (!newEnabled) {
        stopListening();
        stopSpeaking();
      } else if (!prev.muted) {
        startListening();
      }
      return { ...prev, enabled: newEnabled };
    });
  }, [stopListening, stopSpeaking, startListening]);

  return {
    // State
    isListening,
    isSpeaking,
    transcript,
    confidence,
    partialTranscript,
    voiceConfig,
    
    // Actions
    speak,
    startListening,
    stopListening,
    stopSpeaking,
    toggleMute,
    toggleEnabled,
    setVoiceConfig,
    
    // Utils
    isSupported: 'speechSynthesis' in window && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  };
};
