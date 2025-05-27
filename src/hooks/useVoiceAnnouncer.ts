
import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceSettings } from '@/types/voice';

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 0.8,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-US',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true,
};

interface UseVoiceAnnouncerProps {
  userName?: string;
  autoStart?: boolean;
  onCommand?: (command: string) => void;
}

export const useVoiceAnnouncer = ({ 
  userName = 'Student', 
  autoStart = false,
  onCommand 
}: UseVoiceAnnouncerProps = {}) => {
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(DEFAULT_VOICE_SETTINGS);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [voiceInitialized, setVoiceInitialized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isInitializedRef = useRef(false);

  // Check for voice support
  useEffect(() => {
    const speechSupported = 'speechSynthesis' in window;
    const recognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsVoiceSupported(speechSupported && recognitionSupported);
    
    if (speechSupported && recognitionSupported) {
      initializeVoice();
    }
  }, []);

  // Initialize voice synthesis and recognition
  const initializeVoice = useCallback(() => {
    if (isInitializedRef.current) return;
    
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Find best voice
        const preferredVoice = voices.find(voice => 
          voice.lang.includes('en-US') || voice.lang.includes('en-IN')
        ) || voices[0];
        
        if (preferredVoice) {
          setVoiceSettings(prev => ({ ...prev, voice: preferredVoice }));
        }
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = voiceSettings.language;
      
      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };
      
      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        
        // Auto-restart if enabled
        if (voiceSettings.enabled && !voiceSettings.muted) {
          setTimeout(() => {
            if (recognitionRef.current && voiceSettings.enabled) {
              try {
                recognitionRef.current.start();
              } catch (error) {
                console.log('Recognition restart failed:', error);
              }
            }
          }, 1000);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        // Restart on error after delay
        if (voiceSettings.enabled && !voiceSettings.muted) {
          setTimeout(() => {
            if (recognitionRef.current && voiceSettings.enabled) {
              try {
                recognitionRef.current.start();
              } catch (error) {
                console.log('Recognition error restart failed:', error);
              }
            }
          }, 2000);
        }
      };
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          console.log('Voice command received:', finalTranscript);
          setTranscript(finalTranscript);
          if (onCommand) {
            onCommand(finalTranscript);
          }
        }
      };
      
      recognitionRef.current = recognition;
    }
    
    setVoiceInitialized(true);
    isInitializedRef.current = true;
  }, [voiceSettings.language, voiceSettings.enabled, voiceSettings.muted, onCommand]);

  // Auto-start listening if enabled
  useEffect(() => {
    if (voiceInitialized && autoStart && voiceSettings.enabled && !voiceSettings.muted) {
      startListening();
    }
  }, [voiceInitialized, autoStart, voiceSettings.enabled, voiceSettings.muted]);

  const speakMessage = useCallback((message: string) => {
    if (!voiceSettings.enabled || voiceSettings.muted || !isVoiceSupported) {
      return;
    }

    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(message);
    
    if (voiceSettings.voice) {
      utterance.voice = voiceSettings.voice;
    }
    
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.lang = voiceSettings.language;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voiceSettings, isVoiceSupported]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !voiceSettings.enabled || voiceSettings.muted) {
      return;
    }

    try {
      if (isListening) {
        recognitionRef.current.stop();
        setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 100);
      } else {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  }, [isListening, voiceSettings.enabled, voiceSettings.muted]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  }, []);

  const toggleVoiceEnabled = useCallback(() => {
    setVoiceSettings(prev => {
      const newEnabled = !prev.enabled;
      if (!newEnabled) {
        stopListening();
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      }
      return { ...prev, enabled: newEnabled };
    });
  }, [stopListening]);

  const toggleMute = useCallback(() => {
    setVoiceSettings(prev => {
      const newMuted = !prev.muted;
      if (newMuted) {
        stopListening();
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      }
      return { ...prev, muted: newMuted };
    });
  }, [stopListening]);

  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const testVoice = useCallback(() => {
    speakMessage(`Hello ${userName}! This is a test of the PREPZR voice assistant. How does this sound?`);
  }, [speakMessage, userName]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    testVoice,
    voiceInitialized,
    availableVoices
  };
};

export default useVoiceAnnouncer;
