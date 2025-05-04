
import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceSettings } from '@/types/voice';
import { DEFAULT_VOICE_SETTINGS, findBestVoice, speakMessage as speakVoiceMessage, fixPronunciation, LANGUAGE_OPTIONS } from '@/components/dashboard/student/voice/voiceUtils';

interface UseVoiceAnnouncerProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
  isFirstTimeUser?: boolean;
}

export const useVoiceAnnouncer = (props?: UseVoiceAnnouncerProps) => {
  const { userName, initialSettings, isFirstTimeUser = false } = props || {};
  
  // Merge default settings with any initialSettings
  const mergedSettings = { ...DEFAULT_VOICE_SETTINGS, ...initialSettings };
  
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(mergedSettings);
  const [isVoiceSupported, setIsVoiceSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceInitialized, setVoiceInitialized] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
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
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        setVoiceInitialized(true);
        console.log("Voice system initialized with available voices:", voices.length);
        
        // Log available voices and languages
        console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
        const availableLanguages = new Set(voices.map(v => v.lang));
        console.log("Available languages:", Array.from(availableLanguages));
        
        // Check if we have Hindi voices
        const hindiVoices = voices.filter(v => v.lang.includes('hi-IN'));
        console.log("Hindi voices available:", hindiVoices.length > 0, hindiVoices.map(v => v.name));
        
        // Check for Indian English voices
        const indianVoices = voices.filter(v => v.lang.includes('en-IN'));
        console.log("Indian English voices available:", indianVoices.length > 0, indianVoices.map(v => v.name));
      };
      
      // Ensure voices are loaded before initializing
      if (window.speechSynthesis.getVoices().length > 0) {
        initializeVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = initializeVoice;
      }
    }
    
    // Add visual indicator for speaking state
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .voice-speaking {
        position: relative;
      }
      .voice-speaking:after {
        content: '';
        position: fixed;
        top: 10px;
        right: 10px;
        width: 10px;
        height: 10px;
        background-color: #3b82f6;
        border-radius: 50%;
        animation: pulse 1.5s infinite;
        z-index: 9999;
      }
      @keyframes pulse {
        0% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
        }
        70% {
          transform: scale(1);
          box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
        }
        100% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
        }
      }
    `;
    document.head.appendChild(styleElement);
    
    // Set up event listeners for tracking speaking status
    const handleSpeakingStarted = (event: any) => {
      setIsSpeaking(true);
      console.log("Speech started:", event.detail?.message);
    };
    
    const handleSpeakingEnded = () => {
      setIsSpeaking(false);
      console.log("Speech ended");
    };
    
    document.addEventListener('voice-speaking-started', handleSpeakingStarted);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
    
    return () => {
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
      document.head.removeChild(styleElement);
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
  const toggleMute = useCallback((force?: boolean) => {
    setVoiceSettings(prev => {
      // If turning on sound after being muted, cancel any ongoing speech
      if (prev.muted && !force && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      return { ...prev, muted: force !== undefined ? force : !prev.muted };
    });
  }, []);
  
  // Function to speak a message
  const speakMessage = useCallback((message: string, forceSpeech: boolean = false) => {
    // Only speak if enabled or force speech is true
    if (voiceSettings.enabled || forceSpeech) {
      if (!voiceSettings.muted || forceSpeech) {
        // Fix pronunciation before speaking
        speakVoiceMessage(message, voiceSettings);
      }
    }
  }, [voiceSettings]);
  
  // Test voice function
  const testVoice = useCallback(() => {
    // Use language-specific test messages
    let testMessage = `Hello ${userName || 'there'}, I'm your prep-ezer voice assistant.`;
    
    if (voiceSettings.language === 'hi-IN') {
      testMessage = `नमस्ते ${userName || 'आप'}, मैं आपका प्रेप-एज़र वॉइस असिस्टेंट हूं।`;
    } else if (voiceSettings.language === 'en-IN') {
      testMessage = `Hello ${userName || 'there'}, I'm your prep-ezer voice assistant with an Indian accent.`;
    } else if (voiceSettings.language === 'en-US') {
      testMessage = `Hello ${userName || 'there'}, I'm your prep-ezer voice assistant with an American accent.`;
    } else if (voiceSettings.language === 'en-GB') {
      testMessage = `Hello ${userName || 'there'}, I'm your prep-ezer voice assistant with a British accent.`;
    }
    
    speakMessage(testMessage, true);
  }, [userName, speakMessage, voiceSettings.language]);
  
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
      
      // Set language based on current voice settings
      recognitionRef.current.lang = voiceSettings.language;
      
      recognitionRef.current.onresult = (event) => {
        const result = event.results[0][0].transcript;
        console.log('Speech recognized:', result);
        setTranscript(result);
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
  }, [voiceSettings.language]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      initializeSpeechRecognition();
    } else {
      // Update recognition language to match current settings
      recognitionRef.current.lang = voiceSettings.language;
    }
    
    try {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript('');
    } catch (e) {
      console.error('Error starting speech recognition:', e);
    }
  }, [initializeSpeechRecognition, voiceSettings.language]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.abort();
      setIsListening(false);
    } catch (e) {
      console.error('Error stopping speech recognition:', e);
    }
  }, []);
  
  // Get supported languages
  const getSupportedLanguages = useCallback(() => {
    if (!availableVoices.length) return LANGUAGE_OPTIONS;
    
    // Find languages that have at least one voice
    const supportedLanguageCodes = new Set(availableVoices.map(v => v.lang));
    
    // Filter language options to only include those with available voices
    return LANGUAGE_OPTIONS.filter(lang => 
      Array.from(supportedLanguageCodes).some(code => code.includes(lang.value))
    );
  }, [availableVoices]);
  
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
    voiceInitialized,
    transcript,
    availableVoices,
    supportedLanguages: getSupportedLanguages()
  };
};

export default useVoiceAnnouncer;
