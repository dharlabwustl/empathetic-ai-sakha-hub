
import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceSettings } from '@/types/voice';
import { toast } from '@/hooks/use-toast';

// Default voice settings with Indian English accent
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 1,
  rate: 1,
  pitch: 1,
  language: 'en-IN', // Default to Indian English
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

// Language options for the voice assistant
export const LANGUAGE_OPTIONS = [
  { value: 'en-IN', label: 'Indian English' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'en-US', label: 'American English' },
  { value: 'en-GB', label: 'British English' }
];

// Helper to find the best matching voice
export const findBestVoice = (language: string): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find an exact match for the language
  let exactMatch = voices.find(voice => voice.lang === language);
  if (exactMatch) return exactMatch;
  
  // Try to find a partial match (e.g., 'en-IN' matches 'en')
  const langPrefix = language.split('-')[0];
  const partialMatch = voices.find(voice => voice.lang.startsWith(langPrefix));
  if (partialMatch) return partialMatch;
  
  // Fallback to any available voice
  return voices[0] || null;
};

// Fix pronunciation of technical terms
export const fixPronunciation = (text: string): string => {
  return text
    .replace(/PREPZR/gi, 'Prep-zer')
    .replace(/NEET/gi, 'neat')
    .replace(/(\d+)%/g, '$1 percent')
    .replace(/(\w+)-(\w+)/g, '$1 $2') // Add space between hyphenated words
    .replace(/([A-Z]+)/g, ' $1 ') // Add space around acronyms
    .trim();
};

// Function to speak a message
export const speakMessage = (message: string, settings: VoiceSettings): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // Create a custom event for tracking speaking state
  const startEvent = new CustomEvent('voice-speaking-started', {
    detail: { message }
  });
  document.dispatchEvent(startEvent);
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance(fixPronunciation(message));
  
  // Apply settings
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Find best voice for the language
  const voice = settings.voice || findBestVoice(settings.language);
  if (voice) utterance.voice = voice;
  
  // Dispatch event when speech ends
  utterance.onend = () => {
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };
  
  // Cancel any previous speech and speak
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

// Types
export type SupportedLanguage = 'en-IN' | 'en-US' | 'hi-IN' | 'en-GB';

interface UseVoiceAnnouncerProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
  isFirstTimeUser?: boolean;
  mood?: MoodType;
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
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([]);
  
  const recognitionRef = useRef<any>(null);
  
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
      
      // Check for saved language preference
      const savedLanguage = localStorage.getItem('voiceAssistantLanguage');
      if (savedLanguage) {
        setVoiceSettings(prev => ({ ...prev, language: savedLanguage }));
      }
      
      // Initialize voice
      const initializeVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Extract supported languages
        const languages = [...new Set(voices.map(v => v.lang))];
        setSupportedLanguages(languages);
        
        setVoiceInitialized(true);
        console.log("Voice system initialized with", voices.length, "voices");
        
        // Try to find an Indian English voice
        const indianVoice = voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN');
        if (indianVoice) {
          console.log("Found Indian voice:", indianVoice.name);
          setVoiceSettings(prev => ({ ...prev, voice: indianVoice }));
        }
      };
      
      // Ensure voices are loaded
      if (window.speechSynthesis.getVoices().length > 0) {
        initializeVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = initializeVoice;
      }
    }
    
    // Set up event listeners for speaking status
    const handleSpeakingStarted = () => setIsSpeaking(true);
    const handleSpeakingEnded = () => setIsSpeaking(false);
    
    document.addEventListener('voice-speaking-started', handleSpeakingStarted);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
    
    return () => {
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
    };
  }, []);
  
  // Update settings in localStorage when they change
  useEffect(() => {
    localStorage.setItem('voiceSettings', JSON.stringify(voiceSettings));
  }, [voiceSettings]);
  
  // Function to update voice settings
  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => {
      const updated = { ...prev, ...newSettings };
      
      // Save language preference separately
      if (newSettings.language) {
        localStorage.setItem('voiceAssistantLanguage', newSettings.language);
      }
      
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
      if (prev.muted && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return { ...prev, muted: !prev.muted };
    });
  }, []);
  
  // Speak a message with proper PREPZR pronunciation
  const speakMessage = useCallback((message: string, forceSpeech = false) => {
    if ((voiceSettings.enabled || forceSpeech) && (!voiceSettings.muted || forceSpeech)) {
      speakMessage(message, voiceSettings);
    }
  }, [voiceSettings]);
  
  // Test voice function
  const testVoice = useCallback(() => {
    let testMessage = "";
    
    if (voiceSettings.language === 'hi-IN') {
      testMessage = `नमस्ते ${userName || 'आप'}, मैं आपका प्रेप-ज़र वॉइस असिस्टेंट हूं।`;
    } else if (voiceSettings.language === 'en-IN') {
      testMessage = `Hello ${userName || 'there'}, I'm your PREPZR voice assistant with an Indian accent.`;
    } else if (voiceSettings.language === 'en-US') {
      testMessage = `Hello ${userName || 'there'}, I'm your PREPZR voice assistant with an American accent.`;
    } else if (voiceSettings.language === 'en-GB') {
      testMessage = `Hello ${userName || 'there'}, I'm your PREPZR voice assistant with a British accent.`;
    }
    
    speakMessage(testMessage, true);
  }, [userName, speakMessage, voiceSettings.language]);
  
  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }
    
    // @ts-ignore - webkitSpeechRecognition may not be in types
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = voiceSettings.language;
      
      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
    }
  }, [voiceSettings.language]);
  
  // Process voice command
  const processVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Sample command processing logic
    if (lowerCommand.includes('dashboard')) {
      speakMessage("Opening dashboard for you");
      setTimeout(() => window.location.href = '/dashboard', 1500);
    } else if (lowerCommand.includes('help') || lowerCommand.includes('guide')) {
      speakMessage("I can help you navigate the platform, find study materials, or answer questions about NEET exam preparation.");
    } else if (lowerCommand.includes('mute')) {
      toggleMute();
      speakMessage("Voice has been muted");
    } else {
      speakMessage(`I heard: ${command}. How else can I assist you?`);
    }
  }, [speakMessage, toggleMute]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      initializeSpeechRecognition();
    } else {
      recognitionRef.current.lang = voiceSettings.language;
    }
    
    try {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript('');
    } catch (e) {
      console.error('Error starting speech recognition:', e);
      toast({
        title: "Voice Recognition Error",
        description: "Could not start listening. Please try again.",
        variant: "destructive"
      });
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
    transcript,
    voiceInitialized,
    availableVoices,
    supportedLanguages,
    processVoiceCommand
  };
};

export default useVoiceAnnouncer;
