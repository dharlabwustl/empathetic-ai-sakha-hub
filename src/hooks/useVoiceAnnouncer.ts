import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceSettings } from '@/types/voice';
import { DEFAULT_VOICE_SETTINGS, findBestVoice, speakMessage as speakVoiceMessage, fixPronunciation, LANGUAGE_OPTIONS } from '@/components/dashboard/student/voice/voiceUtils';
import { MoodType } from '@/types/user/base';

interface UseVoiceAnnouncerProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
  isFirstTimeUser?: boolean;
  mood?: MoodType;
}

export const useVoiceAnnouncer = (props?: UseVoiceAnnouncerProps) => {
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
      
      // Check for saved language preference, default to Hindi if not set
      const savedLanguage = localStorage.getItem('voiceAssistantLanguage') || 'hi-IN';
      setVoiceSettings(prev => ({ ...prev, language: savedLanguage }));
      
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
              return `चूंकि आप खुश महसूस कर रहे हैं, यह अधिक चुनौतीपूर्ण विषयों को संभालने या अपनी सकारात्मक गति बनाए रखने के लिए एक अभ्यास परीक्षण का प्रयास करने का शानदार समय है।`;
            case MoodType.FOCUSED:
              return `मैं देख रहा हूं कि आप ध्यान केंद्रित महसूस कर रहे हैं। यह जटिल विषयों पर गहन अध्ययन सत्रों के लिए एकदम सही समय है।`;
            case MoodType.TIRED:
              return `आप आज थके हुए लग रहे हैं। गहन अध्ययन के बजाय हल्के समीक्षा सत्र या कुछ शैक्षिक वीडियो देखने पर ध्यान केंद्रित करने का क्या विचार है?`;
            case MoodType.STRESSED:
              return `मैं देख सकता हूं कि आप तनाव महसूस कर रहे हैं। कुछ श्वास व्यायाम के साथ एक छोटा ब्रेक लेते हैं, फिर उन विषयों की समीक्षा करके आत्मविश्वास बढ़ाते हैं जिन्हें आप पहले से ही अच्छी तरह से जानते हैं।`;
            case MoodType.CURIOUS:
              return `आपका जिज्ञासु मूड नए अवधारणाओं का पता लगाने के लिए एकदम सही है। आपकी अध्ययन योजना में कुछ उन्नत विषयों को क्यों नहीं देखते?`;
            case MoodType.OVERWHELMED:
              return `परीक्षा की तैयारी के दौरान अभिभूत महसूस करना सामान्य है। आज अपनी अध्ययन योजना को छोटे, प्रबंधनीय टुकड़ों में विभाजित करें।`;
            case MoodType.ANXIOUS:
              return `चिंतित महसूस करते समय, एक त्वरित जीत से शुरू करना मदद करता है। आत्मविश्वास बनाने के लिए एक ऐसे विषय की समीक्षा करने का प्रयास करें जिससे आप पहले से ही सहज हैं।`;
            case MoodType.MOTIVATED:
              return `आपका प्रेरणा आज बहुत अधिक है! यह उन चुनौतीपूर्ण विषयों को संभालने का एकदम सही समय है जिन्हें आप टाल रहे थे।`;
            case MoodType.CONFUSED:
              return `मैं देख रहा हूं कि आप भ्रमित महसूस कर रहे हैं। अधिक जटिल विषयों पर जाने से पहले मौलिक अवधारणाओं को स्पष्ट करने पर ध्यान केंद्रित करें।`;
            default:
              return `आपके ���र्तमान मूड के आधार पर आज की अध्ययन योजना को समायोजित करने का विचार कैसा है?`;
          }
        } else {
          // English mood suggestions
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
        const suggestion = `${voiceSettings.language === 'hi-IN' ? 'नमस्ते' : 'Hey'} ${userName || (voiceSettings.language === 'hi-IN' ? 'दोस्त' : 'there')}! ${getMoodSuggestion()}`;
        speakMessage(suggestion);
        setLastMoodSuggestion(mood);
      }, 10000); // 10 seconds delay
    }
  }, [mood, lastMoodSuggestion, userName, voiceSettings.enabled, voiceSettings.muted, voiceSettings.language]);
  
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
  
  // Function to speak a message with proper PREPZR pronunciation (Prep-zer)
  const speakMessage = useCallback((message: string, forceSpeech: boolean = false) => {
    // Only speak if enabled or force speech is true
    if (voiceSettings.enabled || forceSpeech) {
      if (!voiceSettings.muted || forceSpeech) {
        // Improved pronunciation for PREPZR - spoken as "Prep-zer" with proper pause
        const correctedMessage = message
          .replace(/PREPZR/gi, 'Prep-zer')
          .replace(/prepzr/gi, 'Prep-zer')
          .replace(/Prepzr/g, 'Prep-zer');
        
        speakVoiceMessage(correctedMessage, voiceSettings);
      }
    }
  }, [voiceSettings]);
  
  // Test voice function with language support
  const testVoice = useCallback(() => {
    // Use language-specific test messages with correct PREPZR pronunciation
    let testMessage = `Hello ${userName || 'there'}, I'm your Prep-zer voice assistant.`;
    
    if (voiceSettings.language === 'hi-IN') {
      testMessage = `नमस्ते ${userName || 'आप'}, मैं आपका Prep-zer वॉइस असिस्टेंट हूं।`;
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
    
    // Handle mood-related commands
    if (lowerCommand.includes('i feel tired') || lowerCommand.includes('i am tired')) {
      respond("I understand you feel tired. I recommend a short 15-minute break, followed by reviewing easier topics. Would you like me to suggest some light review topics?");
      return;
    }
    
    if (lowerCommand.includes('i feel stressed') || lowerCommand.includes('i am stressed')) {
      respond("I can see you're feeling stressed. Let's take a deep breath together. Remember, it's okay to take breaks. Would you like me to guide you through a quick breathing exercise?");
      return;
    }
    
    if (lowerCommand.includes('i feel motivated') || lowerCommand.includes('i am motivated')) {
      respond("That's great! Your motivation is your superpower. This is the perfect time to tackle challenging topics. Would you like me to suggest some advanced concepts to study?");
      return;
    }
    
    // Handle study-related commands
    if (lowerCommand.includes('what should i study') || lowerCommand.includes('suggest topics')) {
      respond("Based on your progress, I recommend focusing on Physics concepts, particularly Newton's Laws and Kinematics. Would you like me to open these topics for you?");
      return;
    }
    
    if (lowerCommand.includes('take a practice test') || lowerCommand.includes('start practice test')) {
      respond("I'll help you start a practice test. Would you prefer a full-length test or a quick 15-minute quiz on recent topics?");
      return;
    }
    
    if (lowerCommand.includes('explain') && (lowerCommand.includes('concept') || lowerCommand.includes('topic'))) {
      respond("I'd be happy to explain this concept. Let me break it down for you step by step. First, let's understand the basic principles...");
      return;
    }
    
    // Handle help and information commands
    if (lowerCommand.includes('what can you do') || lowerCommand.includes('help me')) {
      respond("I can help you navigate the platform, suggest study topics, explain concepts, start practice tests, track your mood, and provide personalized learning recommendations. Just ask me what you need help with.");
      return;
    }
    
    // Handle command not understood
    respond("I'm processing your request to " + command + ". How else can I assist you with your studies today?");
    
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
    supportedLanguages: LANGUAGE_OPTIONS,
    processVoiceCommand: (command: string) => {
      console.log("Processing command:", command);
      // Command processing is handled in each specific component
    }
  };
};

export default useVoiceAnnouncer;
