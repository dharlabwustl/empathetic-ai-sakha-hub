
import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceSettings } from '@/types/voice';
import { MoodType } from '@/types/user/base';
import { fixPronunciation, getStudyRecommendationForMood } from '@/components/dashboard/student/mood-tracking/moodUtils';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS = {
  enabled: true,
  volume: 0.8,
  rate: 1,
  pitch: 1,
  language: 'en-US',
  voice: null,
  muted: false
};

// Language options
export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'Hindi' },
];

// Type for supported languages
export type SupportedLanguage = 'en-US' | 'en-GB' | 'en-IN' | 'hi-IN';

// Function to find best matching voice for language
export const findBestVoice = (language: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find an exact match first
  let voice = voices.find(voice => voice.lang === language);
  
  // If no exact match, try to find a voice that starts with the language code
  if (!voice) {
    const langPrefix = language.split('-')[0];
    voice = voices.find(voice => voice.lang.startsWith(langPrefix));
  }
  
  // If still no match, return null or a default voice
  return voice || null;
};

// Main voice function to speak a message
export const speakMessageFunc = (message: string, settings: VoiceSettings) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // Stop any current speech
  window.speechSynthesis.cancel();
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance();
  
  // Fix pronunciation - ensure PREPZR is pronounced correctly
  utterance.text = fixPronunciation(message);
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Find appropriate voice
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const voice = settings.voice || findBestVoice(settings.language);
    if (voice) utterance.voice = voice;
  }
  
  // Add event listeners
  utterance.onstart = () => {
    document.body.classList.add('voice-speaking');
    document.dispatchEvent(new CustomEvent('voice-speaking-started', { detail: { message } }));
  };
  
  utterance.onend = () => {
    document.body.classList.remove('voice-speaking');
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };
  
  // Speak
  window.speechSynthesis.speak(utterance);
};

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
      
      // Check for saved language preference
      const savedLanguage = localStorage.getItem('voiceAssistantLanguage');
      if (savedLanguage) {
        setVoiceSettings(prev => ({ ...prev, language: savedLanguage }));
      }
      
      // Initialize voice
      const initializeVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        setVoiceInitialized(true);
        console.log("Voice system initialized with available voices:", voices.length);
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
    
    // Custom event for voice assistant to speak mood-based messages
    const handleVoiceAssistantSpeak = (event: any) => {
      if (event.detail && event.detail.message) {
        speakMessage(event.detail.message, true);
      }
    };
    
    // Handle mood change events to provide voice feedback
    const handleMoodChanged = (event: any) => {
      if (event.detail && event.detail.mood) {
        const mood = event.detail.mood;
        const acknowledgment = getMoodAcknowledgment(mood);
        const recommendation = getStudyRecommendationForMood(mood);
        
        // Combine acknowledgment with recommendation
        const message = `${acknowledgment} ${recommendation}`;
        
        // Speak the message
        setTimeout(() => {
          speakMessage(message, true);
        }, 500);
      }
    };
    
    document.addEventListener('voice-speaking-started', handleSpeakingStarted);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
    document.addEventListener('voice-assistant-speak', handleVoiceAssistantSpeak as EventListener);
    document.addEventListener('mood-changed', handleMoodChanged as EventListener);
    
    return () => {
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
      document.removeEventListener('voice-assistant-speak', handleVoiceAssistantSpeak as EventListener);
      document.removeEventListener('mood-changed', handleMoodChanged as EventListener);
      
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
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
      // Save language preference separately for VoiceAnnouncer component
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
  const toggleMute = useCallback((force?: boolean) => {
    setVoiceSettings(prev => {
      // If turning on sound after being muted, cancel any ongoing speech
      if (prev.muted && force === false && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      return { ...prev, muted: force !== undefined ? force : !prev.muted };
    });
  }, []);
  
  // Function to speak a message
  const speakMessage = useCallback((message: string, forceSpeech: boolean = false) => {
    // Only speak if enabled or force speech is true
    if ((voiceSettings.enabled || forceSpeech) && (!voiceSettings.muted || forceSpeech)) {
      // Fix pronunciation before speaking (ensure PREPZR is pronounced correctly)
      const fixedMessage = fixPronunciation(message);
      speakMessageFunc(fixedMessage, voiceSettings);
    }
  }, [voiceSettings]);
  
  // Test voice function with language support
  const testVoice = useCallback(() => {
    // Use language-specific test messages
    let testMessage = `Hello ${userName || 'there'}, I'm your Prep-zer voice assistant.`;
    
    if (voiceSettings.language === 'hi-IN') {
      testMessage = `नमस्ते ${userName || 'आप'}, मैं आपका प्रेप-ज़र वॉइस असिस्टेंट हूं।`;
    } else if (voiceSettings.language === 'en-IN') {
      testMessage = `Hello ${userName || 'there'}, I'm your Prep-zer voice assistant with an Indian accent.`;
    } else if (voiceSettings.language === 'en-US') {
      testMessage = `Hello ${userName || 'there'}, I'm your Prep-zer voice assistant with an American accent.`;
    } else if (voiceSettings.language === 'en-GB') {
      testMessage = `Hello ${userName || 'there'}, I'm your Prep-zer voice assistant with a British accent.`;
    }
    
    speakMessage(testMessage, true);
  }, [userName, speakMessage, voiceSettings.language]);
  
  // Initialize speech recognition with language support
  const initializeSpeechRecognition = useCallback(() => {
    if (typeof window === 'undefined') return;
    
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
  
  // Start listening with current language
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
  
  // Get personalized mood acknowledgment
  const getMoodAcknowledgment = useCallback((mood: MoodType): string => {
    switch(mood) {
      case MoodType.Happy:
        return "Great to hear you're feeling happy today!";
      case MoodType.Motivated:
        return "Excellent! You're feeling motivated today!";
      case MoodType.Focused:
        return "Noted you're feeling focused today. Let's keep up the pace!";
      case MoodType.Tired:
        return "I understand you're feeling tired today.";
      case MoodType.Stressed:
        return "I notice you're feeling stressed.";
      case MoodType.Anxious:
        return "I understand you're feeling anxious.";
      case MoodType.Confused:
        return "It's okay to feel confused sometimes.";
      case MoodType.Neutral:
        return "You're feeling neutral today. That's completely fine.";
      case MoodType.Sad:
        return "I'm sorry to hear you're feeling sad today.";
      default:
        return `I've recorded that you're feeling ${mood.toLowerCase()}.`;
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
    voiceInitialized,
    transcript,
    availableVoices,
    supportedLanguages: getSupportedLanguages(),
    getMoodAcknowledgment
  };
};

export default useVoiceAnnouncer;
