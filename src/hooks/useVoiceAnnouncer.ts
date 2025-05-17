
import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceSettings } from '@/types/voice';
import { fixPronunciation } from '@/components/dashboard/student/voice/voiceUtils';
import { MoodType } from '@/types/user/base';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  muted: false,
  language: 'en-IN',
  rate: 0.92,
  pitch: 1.1,
  volume: 1.0
};

// Language options
export const LANGUAGE_OPTIONS = [
  { value: 'en-IN', label: 'English (India)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'hi-IN', label: 'Hindi' }
];

// Find the best voice for the given language
export const findBestVoice = (language: string, preferFemale: boolean = true) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  
  // Get all available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Filter voices by language
  let matchedVoices = voices.filter(voice => voice.lang.startsWith(language));
  
  // If we have no exact match but have a language base match, use it
  if (matchedVoices.length === 0) {
    const languageBase = language.split('-')[0];
    matchedVoices = voices.filter(voice => voice.lang.startsWith(languageBase));
  }
  
  // If still no match, fallback to any English voice
  if (matchedVoices.length === 0) {
    matchedVoices = voices.filter(voice => voice.lang.startsWith('en'));
  }
  
  // If still no voices available, return first voice or null
  if (matchedVoices.length === 0) {
    return voices.length > 0 ? voices[0] : null;
  }
  
  // Try to find a female voice if preferred
  if (preferFemale) {
    // Common substrings indicating female voices across different TTS systems
    const femaleIndicators = ['female', 'woman', 'girl', 'f', 'samantha', 'victoria', 'joan', 'karen', 'ava', 'lisa', 'susan'];
    
    const femaleVoice = matchedVoices.find(voice => {
      const lowerName = voice.name.toLowerCase();
      return femaleIndicators.some(indicator => lowerName.includes(indicator));
    });
    
    if (femaleVoice) return femaleVoice;
  }
  
  // Return the first matched voice as fallback
  return matchedVoices[0];
};

// Function to speak a message
export const speakMessage = (message: string, settings: VoiceSettings) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(message);
  
  // Find appropriate voice
  const voice = findBestVoice(settings.language);
  if (voice) utterance.voice = voice;
  
  // Apply settings
  utterance.lang = settings.language;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.volume = settings.volume;
  
  // Add events to track speaking status
  utterance.onstart = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-started', { detail: { message } }));
    document.body.classList.add('voice-speaking');
  };
  
  utterance.onend = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    document.body.classList.remove('voice-speaking');
  };
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    document.body.classList.remove('voice-speaking');
  };
  
  // Speak the utterance
  window.speechSynthesis.speak(utterance);
};

interface UseVoiceAnnouncerProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
  isFirstTimeUser?: boolean;
  mood?: MoodType;
}

const useVoiceAnnouncer = (props?: UseVoiceAnnouncerProps) => {
  const { userName, initialSettings, isFirstTimeUser = false, mood } = props || {};
  
  // Merge default settings with any initialSettings
  const mergedSettings = { ...DEFAULT_VOICE_SETTINGS, ...initialSettings };
  
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(mergedSettings);
  const [isVoiceSupported, setIsVoiceSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceInitialized, setVoiceInitialized] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [lastMoodSuggestion, setLastMoodSuggestion] = useState<MoodType | null>(null);
  
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
    };
    
    const handleSpeakingEnded = () => {
      setIsSpeaking(false);
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
      if (prev.muted && !force && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      return { ...prev, muted: force !== undefined ? force : !prev.muted };
    });
  }, []);
  
  // Function to speak a message with proper PREPZR pronunciation
  const speakMessage = useCallback((message: string, forceSpeech: boolean = false) => {
    // Only speak if enabled or force speech is true
    if (voiceSettings.enabled || forceSpeech) {
      if (!voiceSettings.muted || forceSpeech) {
        // Improved pronunciation for PREPZR - spoken as "Prep-zer" with proper pause
        const correctedMessage = message.replace(/PREPZR/gi, 'Prep, zer').replace(/prepzr/gi, 'Prep, zer');
        
        speakMessage(correctedMessage, voiceSettings);
      }
    }
  }, [voiceSettings]);
  
  // Test voice function with language support
  const testVoice = useCallback(() => {
    // Use language-specific test messages with correct PREPZR pronunciation
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
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported by this browser');
      return;
    }
    
    // @ts-ignore - webkitSpeechRecognition may not be in types
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language based on current voice settings
      recognitionRef.current.lang = voiceSettings.language;
      
      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        console.log('Speech recognized:', result);
        setTranscript(result);
        
        // Process the voice command
        processVoiceCommand(result);
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
  
  // Process voice commands with intelligence and navigation understanding
  const processVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Helper function to speak responses
    const respond = (message: string) => {
      speakMessage(message, true);
    };
    
    // Handle navigation commands
    if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('open dashboard')) {
      respond('Opening the dashboard for you.');
      window.location.href = '/dashboard/student';
      return;
    }
    
    if (lowerCommand.includes('go to study plan') || lowerCommand.includes('open study plan')) {
      respond('Opening your study plan.');
      window.location.href = '/dashboard/student/study-plan';
      return;
    }
    
    if (lowerCommand.includes('go to practice') || lowerCommand.includes('open practice tests')) {
      respond('Opening practice tests for you.');
      window.location.href = '/dashboard/student/practice';
      return;
    }
    
    if (lowerCommand.includes('go to concepts') || lowerCommand.includes('open concepts')) {
      respond('Opening the concepts section.');
      window.location.href = '/dashboard/student/concepts';
      return;
    }
    
    if (lowerCommand.includes('go to analytics') || lowerCommand.includes('show analytics')) {
      respond('Opening your analytics dashboard.');
      window.location.href = '/dashboard/student/analytics';
      return;
    }
    
    // NEET exam specific commands
    if (lowerCommand.includes('neet') || lowerCommand.includes('medical') || lowerCommand.includes('entrance')) {
      respond("PREPZR offers comprehensive NEET exam preparation with specialized concept cards for Biology, Physics, and Chemistry. Our AI-driven study plans are tailored specifically for NEET aspirants to help you achieve your best possible score.");
      return;
    }
    
    if (lowerCommand.includes('free trial') || lowerCommand.includes('sign up')) {
      respond("You can sign up for our 7-day free trial to access all premium features including personalized study plans, NEET-specific concept cards, and full-length practice tests. Would you like me to guide you to the registration page?");
      return;
    }
    
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('test my preparation')) {
      respond("Our Exam Readiness Analyzer will evaluate your current preparation level for NEET. It provides a comprehensive analysis of your strengths and areas of improvement. Would you like me to open the analyzer for you?");
      
      // Dispatch event to open exam analyzer
      setTimeout(() => {
        const event = new Event('open-exam-analyzer');
        window.dispatchEvent(event);
      }, 2000);
      
      return;
    }
    
    // Handle general inquiry
    respond("I'm processing your request about " + command + ". How else can I assist with your exam preparation today?");
    
  }, [speakMessage]);
  
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
    return LANGUAGE_OPTIONS;
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
    processVoiceCommand
  };
};

export default useVoiceAnnouncer;
