
import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { speakWithFemaleVoice, stopAllSpeech } from '@/utils/voiceConfig';

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
  const restartTimerRef = useRef<number | null>(null);
  const reminderTimerRef = useRef<number | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;
  const isActiveRef = useRef(true);

  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>({
    enabled: true,
    muted: false,
    volume: 0.7,
    rate: 0.9,
    pitch: 1.0,
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

  // Initialize speech recognition with intelligent partial matching
  const initSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return false;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Enhanced configuration for faster response
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = voiceConfig.language;
      recognition.maxAlternatives = 3; // Get multiple alternatives
      recognition.serviceURI = undefined; // Use default service

      recognition.onstart = () => {
        setIsListening(true);
        retryCountRef.current = 0;
        setLastInteraction(Date.now());
        console.log('🎤 Enhanced speech recognition started');
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log('🎤 Speech recognition ended');
        
        // Auto-restart with intelligent backoff
        if (voiceConfig.enabled && !voiceConfig.muted && retryCountRef.current < maxRetries && isActiveRef.current) {
          const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), 5000);
          restartTimerRef.current = window.setTimeout(() => {
            if (isActiveRef.current) {
              startListening();
            }
          }, delay);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('🚨 Speech recognition error:', event.error);
        setIsListening(false);
        
        retryCountRef.current++;
        if (retryCountRef.current < maxRetries && voiceConfig.enabled && isActiveRef.current) {
          const delay = Math.min(2000 * retryCountRef.current, 10000);
          restartTimerRef.current = window.setTimeout(() => {
            if (isActiveRef.current) {
              initSpeechRecognition();
              startListening();
            }
          }, delay);
        }
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript.trim();
          const confidence = result[0].confidence || 0.8;
          
          if (result.isFinal) {
            finalTranscript += transcript;
            setTranscript(finalTranscript);
            setConfidence(confidence);
            setPartialTranscript('');
            setLastInteraction(Date.now());
            
            // Process final command with high confidence
            if (onCommand && finalTranscript && confidence > 0.6) {
              console.log('🗣️ Processing final command:', finalTranscript, 'confidence:', confidence);
              onCommand(finalTranscript, confidence);
            }
          } else {
            interimTranscript += transcript;
            setPartialTranscript(interimTranscript);
            
            // Intelligent partial matching for faster responses
            if (interimTranscript.length > 4 && confidence > 0.8 && onCommand) {
              const partialConfidence = confidence * 0.7; // Reduce confidence for partial
              console.log('🔄 Processing partial command:', interimTranscript, 'confidence:', partialConfidence);
              onCommand(interimTranscript, partialConfidence);
            }
          }
        }
      };

      recognitionRef.current = recognition;
      return true;
    } catch (error) {
      console.error('❌ Error initializing speech recognition:', error);
      return false;
    }
  }, [voiceConfig.language, voiceConfig.enabled, voiceConfig.muted, onCommand]);

  // Enhanced speak function with PREPZR pronunciation
  const speak = useCallback((text: string, options?: Partial<VoiceConfig>) => {
    if (!voiceConfig.enabled || voiceConfig.muted || !isActiveRef.current) {
      return false;
    }

    return speakWithFemaleVoice(
      text,
      { ...voiceConfig, ...options },
      () => {
        setIsSpeaking(true);
        setLastInteraction(Date.now());
      },
      () => setIsSpeaking(false)
    );
  }, [voiceConfig]);

  // Start listening with robust error handling
  const startListening = useCallback(() => {
    if (!voiceConfig.enabled || voiceConfig.muted || !isActiveRef.current) return false;

    if (!recognitionRef.current) {
      const initialized = initSpeechRecognition();
      if (!initialized) return false;
    }

    try {
      // Stop any ongoing recognition first
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setTimeout(() => {
          if (recognitionRef.current && isActiveRef.current) {
            recognitionRef.current.start();
          }
        }, 200);
      } else {
        recognitionRef.current?.start();
      }
      return true;
    } catch (error) {
      console.error('❌ Error starting speech recognition:', error);
      // Reinitialize on error
      setTimeout(() => {
        if (isActiveRef.current) {
          initSpeechRecognition();
        }
      }, 1000);
      return false;
    }
  }, [voiceConfig.enabled, voiceConfig.muted, initSpeechRecognition, isListening]);

  // Stop listening function
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('❌ Error stopping speech recognition:', error);
      }
    }
    
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  }, []);

  // Stop speaking function
  const stopSpeaking = useCallback(() => {
    stopAllSpeech();
    setIsSpeaking(false);
  }, []);

  // Context-aware reminder system
  useEffect(() => {
    if (!voiceConfig.enabled || voiceConfig.muted || !isActiveRef.current) return;

    const checkForReminder = () => {
      const timeSinceLastInteraction = Date.now() - lastInteraction;
      const shouldRemind = timeSinceLastInteraction >= (reminderInterval * 1000);
      
      if (shouldRemind && !isSpeaking && isActiveRef.current) {
        let reminderMessage = '';
        
        switch (context) {
          case 'homepage':
            reminderMessage = "Hi there! I'm your PREPZR assistant. I can help you learn about our exam preparation platform, start a free trial, or answer any questions about how PREPZR can boost your exam success!";
            break;
          case 'post-signup':
            reminderMessage = `${userName}, ready to start your PREPZR journey? I can guide you to take the exam readiness test or help you explore your new dashboard!`;
            break;
          case 'dashboard':
            reminderMessage = `${userName}, need any study guidance? I'm here to help with your learning journey, suggest study topics, or provide motivation!`;
            break;
        }
        
        if (reminderMessage) {
          speak(reminderMessage);
          setLastInteraction(Date.now()); // Reset timer after reminder
        }
      }
    };

    reminderTimerRef.current = window.setInterval(checkForReminder, 15000); // Check every 15 seconds

    return () => {
      if (reminderTimerRef.current) {
        clearInterval(reminderTimerRef.current);
      }
    };
  }, [context, userName, reminderInterval, lastInteraction, isSpeaking, voiceConfig.enabled, voiceConfig.muted, speak]);

  // Listen for voice activation events
  useEffect(() => {
    const handleStartVoiceRecognition = () => {
      if (!isSpeaking && isActiveRef.current) {
        setLastInteraction(Date.now());
        startListening();
      }
    };

    window.addEventListener('start-voice-recognition', handleStartVoiceRecognition);
    
    return () => {
      window.removeEventListener('start-voice-recognition', handleStartVoiceRecognition);
    };
  }, [startListening, isSpeaking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isActiveRef.current = false;
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
        setTimeout(startListening, 500);
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
        setTimeout(startListening, 500);
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
