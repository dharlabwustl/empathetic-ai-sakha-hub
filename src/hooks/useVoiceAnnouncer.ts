
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DEFAULT_VOICE_SETTINGS, 
  VoiceSettings, 
  speakMessage, 
  getGreeting,
  processUserQuery,
  initSpeechSynthesis 
} from '@/components/dashboard/student/voice/voiceUtils';

export interface UseVoiceAnnouncerProps {
  userName?: string;
  mood?: string;
  isFirstTimeUser?: boolean;
  pendingTasks?: Array<{title: string, due?: string}>;
  onStartTest?: () => void;
  onShowFlashcards?: () => void;
  examGoal?: string;
}

export function useVoiceAnnouncer({
  userName,
  mood,
  isFirstTimeUser = false,
  pendingTasks = [],
  onStartTest,
  onShowFlashcards,
  examGoal
}: UseVoiceAnnouncerProps = {}) {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(() => {
    // Try to get settings from localStorage
    const savedSettings = localStorage.getItem('prepzr-voice-settings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings) as VoiceSettings;
      } catch (e) {
        console.error('Error parsing voice settings from localStorage:', e);
      }
    }
    return DEFAULT_VOICE_SETTINGS;
  });
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const hasGreetedRef = useRef<boolean>(false);
  
  // Set up speech synthesis when component mounts
  useEffect(() => {
    console.log("Initializing speech synthesis");
    const isSupported = initSpeechSynthesis();
    
    if (!isSupported) {
      console.error("Speech synthesis not supported in this browser");
    }
  }, []);
  
  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem('prepzr-voice-settings', JSON.stringify(voiceSettings));
  }, [voiceSettings]);
  
  // Setup event listeners for speech synthesis status
  useEffect(() => {
    const handleSpeakingStarted = () => {
      console.log("Speaking started event detected");
      setIsSpeaking(true);
    };
    
    const handleSpeakingEnded = () => {
      console.log("Speaking ended event detected");
      setIsSpeaking(false);
    };
    
    document.addEventListener('voice-speaking-started', handleSpeakingStarted);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
    
    return () => {
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
    };
  }, []);
  
  // Initialize speech recognition with error handling
  const initSpeechRecognition = useCallback(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported by this browser');
      return false;
    }
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      try {
        recognitionRef.current = new SpeechRecognitionAPI();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = voiceSettings.language;
        
        recognitionRef.current.onresult = (event) => {
          const result = event.results[0][0].transcript;
          setTranscript(result);
          console.log('Speech recognized:', result);
          
          // Process the query and get a response
          const response = processUserQuery(
            result,
            navigate,
            {
              startTest: onStartTest,
              switchLanguage: (lang) => {
                setVoiceSettings(prev => ({ ...prev, language: lang }));
              },
              showFlashcards: onShowFlashcards,
              examGoal: examGoal
            }
          );
          
          // Speak the response
          speakMessage(response, voiceSettings);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        console.log("Speech recognition initialized successfully");
      } catch (error) {
        console.error("Error initializing speech recognition:", error);
        return false;
      }
    }
    
    // Update the language setting if it changed
    if (recognitionRef.current) {
      recognitionRef.current.lang = voiceSettings.language;
    }
    
    return true;
  }, [navigate, onShowFlashcards, onStartTest, voiceSettings, examGoal]);
  
  // Start listening for voice input
  const startListening = useCallback(() => {
    console.log("Starting speech recognition");
    const initialized = initSpeechRecognition();
    if (!initialized || !recognitionRef.current) {
      console.error("Failed to initialize speech recognition");
      return;
    }
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
      console.log("Speech recognition started");
    } catch (e) {
      console.error('Error starting speech recognition:', e);
    }
  }, [initSpeechRecognition]);
  
  // Stop listening for voice input
  const stopListening = useCallback(() => {
    console.log("Stopping speech recognition");
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("Speech recognition stopped");
    } catch (e) {
      console.error('Error stopping speech recognition:', e);
    }
  }, []);
  
  // Speak a greeting based on user state
  const speakGreeting = useCallback(() => {
    // Check if we've already greeted in this session
    if (hasGreetedRef.current) {
      console.log("Already greeted, skipping");
      return;
    }
    
    // Don't greet if voice is disabled
    if (!voiceSettings.enabled) {
      console.log("Voice is disabled, skipping greeting");
      return;
    }
    
    console.log("Generating greeting for user:", userName, "mood:", mood, "first time:", isFirstTimeUser);
    const greeting = getGreeting(userName, mood, isFirstTimeUser);
    console.log("Speaking greeting:", greeting);
    speakMessage(greeting, voiceSettings);
    
    hasGreetedRef.current = true;
  }, [userName, mood, isFirstTimeUser, voiceSettings]);
  
  // Toggle voice enabled/disabled
  const toggleVoiceEnabled = useCallback(() => {
    setVoiceSettings(prev => {
      const newSettings = { ...prev, enabled: !prev.enabled };
      console.log("Voice enabled toggled to:", newSettings.enabled);
      return newSettings;
    });
  }, []);
  
  // Update voice settings
  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => {
      const updatedSettings = { ...prev, ...newSettings };
      console.log("Voice settings updated:", updatedSettings);
      return updatedSettings;
    });
  }, []);
  
  // Test the current voice settings
  const testVoice = useCallback(() => {
    const testMessage = "Hello! This is how PREPZR will sound with your current settings.";
    console.log("Testing voice with message:", testMessage);
    speakMessage(testMessage, voiceSettings, true);
  }, [voiceSettings]);

  return {
    isListening,
    isSpeaking,
    transcript,
    voiceSettings,
    startListening,
    stopListening,
    speakGreeting,
    speakMessage: (message: string, force?: boolean) => speakMessage(message, voiceSettings, force),
    toggleVoiceEnabled,
    updateVoiceSettings,
    testVoice,
    isVoiceSupported: initSpeechSynthesis()
  };
}
