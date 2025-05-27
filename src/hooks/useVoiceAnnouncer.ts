
import { useState, useEffect, useCallback, useRef } from 'react';

interface VoiceSettings {
  enabled: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: string;
  muted: boolean;
}

const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  volume: 0.8,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-US',
  muted: false
};

interface UseVoiceAnnouncerProps {
  userName?: string;
}

const useVoiceAnnouncer = (props?: UseVoiceAnnouncerProps) => {
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(DEFAULT_VOICE_SETTINGS);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceInitialized, setVoiceInitialized] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Track spoken messages to prevent repetition
  const spokenMessagesRef = useRef<Set<string>>(new Set());
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setIsVoiceSupported(true);
      setVoiceInitialized(true);
      
      // Load available voices
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };
      
      loadVoices();
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = voiceSettings.language;
        
        recognitionRef.current.onresult = (event) => {
          const result = event.results[0][0].transcript;
          setTranscript(result);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };
      }
    }
  }, [voiceSettings.language]);

  const speakMessage = useCallback((message: string, force = false) => {
    if (!isVoiceSupported || voiceSettings.muted || !voiceSettings.enabled) {
      return;
    }

    // FIXED: Check if message was already spoken (prevent repetition)
    const messageKey = message.toLowerCase().trim();
    if (!force && spokenMessagesRef.current.has(messageKey)) {
      console.log('🔇 Voice: Message already spoken, skipping:', message);
      return;
    }

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.lang = voiceSettings.language;

    // Find appropriate voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang === voiceSettings.language);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      // Add to spoken messages to prevent repetition
      spokenMessagesRef.current.add(messageKey);
      console.log('🔊 Voice: Speaking:', message);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      console.log('🔇 Voice: Finished speaking');
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      console.error('Voice synthesis error:', event);
    };

    speechSynthesis.speak(utterance);
  }, [isVoiceSupported, voiceSettings]);

  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const toggleVoiceEnabled = useCallback(() => {
    setVoiceSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  }, []);

  const toggleMute = useCallback(() => {
    setVoiceSettings(prev => ({ ...prev, muted: !prev.muted }));
  }, []);

  const testVoice = useCallback(() => {
    const testMessage = props?.userName 
      ? `Hello ${props.userName}, this is your PREPZR voice assistant. I'm here to help you with your studies.`
      : "Hello, this is your PREPZR voice assistant. I'm here to help you with your studies.";
    
    // Force speaking for test (bypass repetition check)
    speakMessage(testMessage, true);
  }, [speakMessage, props?.userName]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript('');
      } catch (error) {
        console.error('Speech recognition start error:', error);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  // Clear spoken messages periodically to allow re-speaking after some time
  useEffect(() => {
    const interval = setInterval(() => {
      spokenMessagesRef.current.clear();
      console.log('🔄 Voice: Cleared spoken messages cache');
    }, 300000); // Clear every 5 minutes

    return () => clearInterval(interval);
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
export { useVoiceAnnouncer };
