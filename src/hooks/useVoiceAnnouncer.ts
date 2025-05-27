import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceSettings } from '@/types/voice';

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 0.9,
  rate: 1.0,
  pitch: 1.1,
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
  const restartTimeoutRef = useRef<number | null>(null);

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
        
        // Prefer female voices for consistent experience
        const femaleVoices = voices.filter(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('zira') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('serena') ||
          voice.name.toLowerCase().includes('alex')
        );
        
        const preferredVoice = femaleVoices.find(voice => 
          voice.lang.includes('en-US')
        ) || voices.find(voice => 
          voice.lang.includes('en-US') || voice.lang.includes('en-GB')
        ) || voices[0];
        
        if (preferredVoice) {
          setVoiceSettings(prev => ({ ...prev, voice: preferredVoice }));
        }
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Initialize speech recognition with better error handling
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setupSpeechRecognition();
    }
    
    setVoiceInitialized(true);
    isInitializedRef.current = true;
  }, []);

  const setupSpeechRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      } catch (error) {
        console.log('Cleanup recognition error:', error);
      }
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false; // Changed to false for better command handling
    recognition.interimResults = false;
    recognition.lang = voiceSettings.language;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
    };
    
    recognition.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
      
      // Clear any existing restart timeout
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      
      // Auto-restart after a short delay if enabled
      if (voiceSettings.enabled && !voiceSettings.muted) {
        restartTimeoutRef.current = window.setTimeout(() => {
          if (voiceSettings.enabled && !voiceSettings.muted) {
            startListening();
          }
        }, 2000);
      }
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      // Clear any existing restart timeout
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      
      // Restart on error after longer delay
      if (voiceSettings.enabled && !voiceSettings.muted && event.error !== 'aborted') {
        restartTimeoutRef.current = window.setTimeout(() => {
          if (voiceSettings.enabled && !voiceSettings.muted) {
            startListening();
          }
        }, 3000);
      }
    };
    
    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        const result = event.results[0];
        if (result.isFinal) {
          const finalTranscript = result[0].transcript.trim();
          console.log('Voice command received:', finalTranscript);
          setTranscript(finalTranscript);
          if (onCommand) {
            onCommand(finalTranscript);
          }
        }
      }
    };
    
    recognitionRef.current = recognition;
  }, [voiceSettings.language, voiceSettings.enabled, voiceSettings.muted, onCommand]);

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
      if (!recognitionRef.current) {
        setupSpeechRecognition();
      }
      if (!voiceSettings.enabled || voiceSettings.muted) {
        return;
      }
    }

    try {
      if (isListening) {
        recognitionRef.current.stop();
        setTimeout(() => {
          if (recognitionRef.current && voiceSettings.enabled && !voiceSettings.muted) {
            recognitionRef.current.start();
          }
        }, 100);
      } else {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error starting recognition:', error);
      // Reinitialize and try again
      setupSpeechRecognition();
      setTimeout(() => {
        if (recognitionRef.current && voiceSettings.enabled && !voiceSettings.muted) {
          try {
            recognitionRef.current.start();
          } catch (retryError) {
            console.error('Retry error:', retryError);
          }
        }
      }, 500);
    }
  }, [isListening, voiceSettings.enabled, voiceSettings.muted, setupSpeechRecognition]);

  const stopListening = useCallback(() => {
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
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
