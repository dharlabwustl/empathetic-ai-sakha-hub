
import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceSettings } from '@/types/voice';
import { 
  DEFAULT_VOICE_SETTINGS, 
  findBestVoice, 
  speakMessage as speakVoiceMessage, 
  fixPronunciation,
  LANGUAGE_OPTIONS 
} from '@/components/dashboard/student/voice/voiceUtils';
import { MoodType } from '@/types/user/base';

interface UseVoiceAnnouncerProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
  isFirstTimeUser?: boolean;
  mood?: MoodType;
}

export const useVoiceAnnouncer = (props?: UseVoiceAnnouncerProps) => {
  const { userName, initialSettings, isFirstTimeUser = false, mood } = props || {};
  
  // Merge default settings with any initialSettings and stored settings
  const getInitialSettings = () => {
    // Start with default settings (Hindi as default)
    let settings = { ...DEFAULT_VOICE_SETTINGS };
    
    // Try to get stored settings
    try {
      const savedSettings = localStorage.getItem('voiceSettings');
      if (savedSettings) {
        settings = { ...settings, ...JSON.parse(savedSettings) };
      }
      
      // Get saved language preference
      const savedLanguage = localStorage.getItem('voiceAssistantLanguage');
      if (savedLanguage) {
        settings.language = savedLanguage;
      }
    } catch (err) {
      console.error('Error loading saved voice settings:', err);
    }
    
    // Apply any passed settings
    if (initialSettings) {
      settings = { ...settings, ...initialSettings };
    }
    
    return settings;
  };
  
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(getInitialSettings());
  const [isVoiceSupported, setIsVoiceSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceInitialized, setVoiceInitialized] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [lastMoodSuggestion, setLastMoodSuggestion] = useState<MoodType | null>(null);
  const [supportedLanguages, setSupportedLanguages] = useState<string[]>([]);
  
  const recognitionRef = useRef<any>(null);
  
  // Check if speech synthesis is supported and initialize
  useEffect(() => {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setIsVoiceSupported(supported);
    
    if (supported) {
      // Initialize voice
      const initializeVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Extract supported languages
        const languages = new Set(voices.map(v => v.lang));
        setSupportedLanguages(Array.from(languages));
        
        setVoiceInitialized(true);
        console.log("Voice system initialized with available voices:", voices.length);
        
        // Log available voices and languages for debugging
        console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
        
        // Check for Hindi and Indian English voices
        const hindiVoices = voices.filter(v => v.lang.includes('hi-IN'));
        console.log("Hindi voices available:", hindiVoices.length > 0, hindiVoices.map(v => v.name));
        
        const indianVoices = voices.filter(v => v.lang.includes('en-IN'));
        console.log("Indian English voices available:", indianVoices.length > 0, indianVoices.map(v => v.name));
      };
      
      // Ensure voices are loaded before initializing
      if (window.speechSynthesis.getVoices().length > 0) {
        initializeVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = initializeVoice;
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
        document.body.classList.add('voice-speaking');
        console.log("Speech started:", event.detail?.message);
      };
      
      const handleSpeakingEnded = () => {
        setIsSpeaking(false);
        document.body.classList.remove('voice-speaking');
        console.log("Speech ended");
      };
      
      document.addEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
      document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
      
      return () => {
        document.removeEventListener('voice-speaking-started', handleSpeakingStarted as EventListener);
        document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
        document.head.removeChild(styleElement);
      };
    }
  }, []);
  
  // Update settings in local storage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('voiceSettings', JSON.stringify(voiceSettings));
      localStorage.setItem('voiceAssistantLanguage', voiceSettings.language);
    }
  }, [voiceSettings]);
  
  // Track mood changes and offer suggestions
  useEffect(() => {
    if (mood && mood !== lastMoodSuggestion && voiceSettings.enabled && !voiceSettings.muted) {
      const getMoodSuggestion = () => {
        // Hindi mood suggestions
        if (voiceSettings.language === 'hi-IN') {
          switch (mood) {
            case MoodType.HAPPY:
              return `चूंकि आप खुश महसूस कर रहे हैं, यह अधिक चुनौतीपूर्ण विषयों को संभालने या अपनी सकारात्मक गति बनाए रखने के लिए एक अभ्यास परीक्षण का प्रयास करने का एक अच्छा समय है।`;
            case MoodType.FOCUSED:
              return `मैं देखता हूं कि आप केंद्रित महसूस कर रहे हैं। यह जटिल विषयों पर गहन शिक्षण सत्र के लिए एकदम सही समय है।`;
            case MoodType.TIRED:
              return `आज आप थके हुए लग रहे हैं। गहन अध्ययन के बजाय हल्के समीक्षा सत्र या कुछ शैक्षिक वीडियो देखने पर ध्यान केंद्रित करने का प्रयास करें।`;
            case MoodType.STRESSED:
              return `मैं देख सकता हूं कि आप तनावग्रस्त महसूस कर रहे हैं। कुछ सांस लेने के व्यायामों के साथ एक छोटा ब्रेक लें, फिर उन विषयों की आत्मविश्वास-निर्माण समीक्षा करें जिन्हें आप पहले से ही अच्छी तरह जानते हैं।`;
            case MoodType.CURIOUS:
              return `आपका जिज्ञासु मूड नए अवधारणाओं का अन्वेषण करने के लिए एकदम सही है। आपकी अध्ययन योजना में कुछ उन्नत विषयों पर नज़र डालने का प्रयास क्यों नहीं करते?`;
            case MoodType.OVERWHELMED:
              return `परीक्षा की तैयारी के दौरान अभिभूत महसूस करना सामान्य है। आइए आज आपकी अध्ययन योजना को छोटे, प्रबंधनीय टुकड़ों में विभाजित करें।`;
            case MoodType.ANXIOUS:
              return `चिंतित महसूस करते समय, एक त्वरित जीत से शुरुआत करने में मदद मिलती है। आत्मविश्वास बढ़ाने के लिए किसी ऐसे विषय की समीक्षा करें जिससे आप पहले से ही सहज हैं।`;
            case MoodType.MOTIVATED:
              return `आज आपका मोटिवेशन अधिक है! यह उन चुनौतीपूर्ण विषयों को संभालने का एकदम सही समय है जिन्हें आप टाल रहे थे।`;
            case MoodType.CONFUSED:
              return `मैं देखता हूं कि आप उलझन महसूस कर रहे हैं। अधिक जटिल विषयों पर जाने से पहले आइए मूलभूत अवधारणाओं को स्पष्ट करने पर ध्यान केंद्रित करें।`;
            default:
              return `क्या हम आपके वर्तमान मूड के आधार पर आज की अध्ययन योजना को समायोजित करें?`;
          }
        } 
        // English mood suggestions
        else {
          switch (mood) {
            case MoodType.HAPPY:
              return `Since you're feeling happy, it's a great time to tackle more challenging topics or try a practice test to maintain your positive momentum.`;
            case MoodType.FOCUSED:
              return `I notice you're feeling focused. This is the perfect time for deep learning sessions on complex topics.`;
            case MoodType.TIRED:
              return `You seem tired today. How about focusing on lighter review sessions or watching some educational videos instead of intense study?`;
            case MoodType.STRESSED:
              return `I can see you're feeling stressed. Let's take a short break with some breathing exercises, then try some confidence-building review of topics you already know well.`;
            case MoodType.CURIOUS:
              return `Your curious mood is perfect for exploring new concepts. Why not check out some of the advanced topics in your study plan?`;
            case MoodType.OVERWHELMED:
              return `Feeling overwhelmed is normal during exam preparation. Let's break down your study plan into smaller, manageable chunks today.`;
            case MoodType.ANXIOUS:
              return `When feeling anxious, it helps to start with a quick win. Try reviewing a topic you're already comfortable with to build confidence.`;
            case MoodType.MOTIVATED:
              return `Your motivation is high today! This is the perfect time to tackle those challenging topics you've been putting off.`;
            case MoodType.CONFUSED:
              return `I see you're feeling confused. Let's focus on clarifying fundamental concepts before moving to more complex topics.`;
            default:
              return `How about we adjust today's study plan based on your current mood?`;
          }
        }
      };

      // Delay the suggestion to not overwhelm the user right away
      setTimeout(() => {
        const name = userName || (voiceSettings.language === 'hi-IN' ? 'विद्यार्थी' : 'there');
        const greeting = voiceSettings.language === 'hi-IN' ? `हेलो ${name}!` : `Hey ${name}!`;
        const suggestion = `${greeting} ${getMoodSuggestion()}`;
        speakMessage(suggestion);
        setLastMoodSuggestion(mood);
      }, 10000); // 10 seconds delay
    }
  }, [mood, lastMoodSuggestion, userName, voiceSettings.enabled, voiceSettings.muted, voiceSettings.language]);
  
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
  
  // Function to speak a message with proper PREPZR pronunciation
  const speakMessage = useCallback((message: string, forceSpeech: boolean = false) => {
    // Only speak if enabled or force speech is true
    if ((voiceSettings.enabled || forceSpeech) && !(!forceSpeech && voiceSettings.muted)) {
      speakVoiceMessage(message, voiceSettings);
      return true;
    }
    return false;
  }, [voiceSettings]);
  
  // Test voice function with language-appropriate messages
  const testVoice = useCallback(() => {
    // Use language-specific test messages
    let testMessage = "";
    
    if (voiceSettings.language === 'hi-IN') {
      testMessage = `नमस्ते ${userName || 'विद्यार्थी'}, मैं आपका प्रेप ज़र वॉइस असिस्टेंट हूं।`;
    } else if (voiceSettings.language === 'en-IN') {
      testMessage = `Namaste ${userName || 'there'}, I'm your Prep zer voice assistant with an Indian accent.`;
    } else if (voiceSettings.language === 'en-US') {
      testMessage = `Hello ${userName || 'there'}, I'm your Prep zer voice assistant with an American accent.`;
    } else if (voiceSettings.language === 'en-GB') {
      testMessage = `Hello ${userName || 'there'}, I'm your Prep zer voice assistant with a British accent.`;
    } else {
      testMessage = `Hello ${userName || 'there'}, I'm your Prep zer voice assistant.`;
    }
    
    return speakMessage(testMessage, true);
  }, [userName, speakMessage, voiceSettings.language]);
  
  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported by this browser');
      return false;
    }
    
    // @ts-ignore - webkitSpeechRecognition may not be in types
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      if (!recognitionRef.current) {
        recognitionRef.current = new SpeechRecognitionAPI();
      }
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language based on current voice settings
      recognitionRef.current.lang = voiceSettings.language;
      
      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        console.log('Speech recognized:', result);
        setTranscript(result);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      return true;
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
      return false;
    }
  }, [voiceSettings.language]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (initializeSpeechRecognition()) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        return true;
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
    return false;
  }, [initializeSpeechRecognition]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
    setIsListening(false);
  }, []);
  
  // Process voice commands
  const processVoiceCommand = useCallback((command: string) => {
    if (!command) return;
    
    console.log("Processing voice command:", command);
    
    // Process command logic can be implemented here
    // For now, we'll just speak a confirmation
    
    const response = voiceSettings.language === 'hi-IN'
      ? `आपने कहा: "${command}". मैं इस कमांड पर काम कर रहा हूं।`
      : `You said: "${command}". I'm processing this command.`;
      
    speakMessage(response);
  }, [speakMessage, voiceSettings.language]);
  
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
    processVoiceCommand,
    voiceInitialized,
    supportedLanguages
  };
};

export default useVoiceAnnouncer;
