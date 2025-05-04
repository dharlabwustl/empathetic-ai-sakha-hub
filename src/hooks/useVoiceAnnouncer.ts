
import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceSettings } from '@/types/voice';
import { DEFAULT_VOICE_SETTINGS, findBestVoice, speakMessage as speakVoiceMessage } from '@/components/dashboard/student/voice/voiceUtils';

interface UseVoiceAnnouncerProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
}

export const useVoiceAnnouncer = (props?: UseVoiceAnnouncerProps) => {
  const { userName, initialSettings } = props || {};
  
  // Merge default settings with any initialSettings
  const mergedSettings = { ...DEFAULT_VOICE_SETTINGS, ...initialSettings };
  
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(mergedSettings);
  const [isVoiceSupported, setIsVoiceSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceInitialized, setVoiceInitialized] = useState<boolean>(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Check if speech synthesis is supported
  useEffect(() => {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setIsVoiceSupported(supported);
    
    if (supported) {
      // Load stored settings if available
      const savedSettings = localStorage.getItem('voiceSettings');
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          setVoiceSettings(prev => ({ ...prev, ...parsedSettings }));
        } catch (err) {
          console.error('Error parsing saved voice settings:', err);
        }
      }
      
      // Initialize voice
      const initializeVoice = () => {
        setVoiceInitialized(true);
      };
      
      // Ensure voices are loaded before initializing
      if (window.speechSynthesis.getVoices().length > 0) {
        initializeVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = initializeVoice;
      }
    }
    
    // Set up event listeners for tracking speaking status
    const handleSpeakingStarted = () => setIsSpeaking(true);
    const handleSpeakingEnded = () => setIsSpeaking(false);
    
    document.addEventListener('voice-speaking-started', handleSpeakingStarted);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
    
    return () => {
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
    };
  }, []);
  
  // Update settings in local storage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('voiceSettings', JSON.stringify(voiceSettings));
    }
  }, [voiceSettings]);
  
  // Function to update voice settings
  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
  }, []);
  
  // Toggle voice enabled state
  const toggleVoiceEnabled = useCallback(() => {
    setVoiceSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  }, []);
  
  // Toggle mute state
  const toggleMute = useCallback(() => {
    setVoiceSettings(prev => {
      // If turning on sound after being muted, cancel any ongoing speech
      if (prev.muted && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      return { ...prev, muted: !prev.muted };
    });
  }, []);
  
  // Function to speak a message
  const speakMessage = useCallback((message: string, forceSpeech: boolean = false) => {
    // Only speak if enabled or force speech is true
    if (voiceSettings.enabled || forceSpeech) {
      if (!voiceSettings.muted || forceSpeech) {
        speakVoiceMessage(message, voiceSettings);
      }
    }
  }, [voiceSettings]);
  
  // Test voice function
  const testVoice = useCallback(() => {
    const testMessage = `Hello ${userName || 'there'}, I'm your PREP-EZER voice assistant.`;
    speakMessage(testMessage, true);
  }, [userName, speakMessage]);
  
  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported by this browser');
      return;
    }
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Use Indian English
      
      recognitionRef.current.onresult = (event) => {
        const result = event.results[0][0].transcript;
        console.log('Speech recognized:', result);
        // Process result
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
    }
  }, []);
  
  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      initializeSpeechRecognition();
    }
    
    try {
      recognitionRef.current?.start();
      setIsListening(true);
    } catch (e) {
      console.error('Error starting speech recognition:', e);
    }
  }, [initializeSpeechRecognition]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.abort();
      setIsListening(false);
    } catch (e) {
      console.error('Error stopping speech recognition:', e);
    }
  }, []);
  
  return {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    testVoice,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    voiceInitialized
  };
};

export default useVoiceAnnouncer;
