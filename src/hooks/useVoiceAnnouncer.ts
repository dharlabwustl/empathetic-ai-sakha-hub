import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DEFAULT_VOICE_SETTINGS, 
  VoiceSettings, 
  speakMessage, 
  getGreeting,
  getReminderAnnouncement,
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
  const [voiceInitialized, setVoiceInitialized] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(() => {
    // Try to get settings from localStorage
    const savedSettings = localStorage.getItem('prepzr-voice-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings) as VoiceSettings;
        // Force Indian English for consistency
        return { ...parsed, language: 'en-IN' };
      } catch (e) {
        console.error('Error parsing voice settings from localStorage:', e);
      }
    }
    return { ...DEFAULT_VOICE_SETTINGS, language: 'en-IN' };
  });
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const hasGreetedRef = useRef<boolean>(false);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastAnnouncementRef = useRef<string>(''); // Track last announcement to reduce repetition
  const messageHistoryRef = useRef<string[]>([]); // Keep track of recent messages
  
  // Force initialize speech synthesis when component mounts
  useEffect(() => {
    const initVoice = async () => {
      console.log("Forcibly initializing speech synthesis");
      try {
        // Create a dummy utterance to get the browser to initialize the speech synthesis
        const dummyUtterance = new SpeechSynthesisUtterance('');
        dummyUtterance.lang = 'en-IN'; // Always use Indian English
        window.speechSynthesis.speak(dummyUtterance);
        
        // Chrome requires user interaction before audio can play
        // Force cancel to ensure it's ready for future use
        window.speechSynthesis.cancel();
        
        // Wait a bit to ensure initialization
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setVoiceInitialized(true);
        console.log("Speech synthesis forcibly initialized");
      } catch (error) {
        console.error("Failed to initialize speech synthesis:", error);
      }
    };
    
    initVoice();
    
    // Make sure to always cancel any ongoing speech when the component unmounts
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
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
        recognitionRef.current.lang = 'en-IN'; // Always use Indian English
        
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
                // Always switch back to Indian English for consistency
                setVoiceSettings(prev => ({ ...prev, language: 'en-IN' }));
              },
              showFlashcards: onShowFlashcards,
              examGoal: examGoal
            }
          );
          
          // Check if this response is different from recent ones
          const isRepeatedMessage = messageHistoryRef.current.includes(response);
          if (!isRepeatedMessage) {
            // Add to message history
            messageHistoryRef.current.push(response);
            // Keep only last 5 messages
            if (messageHistoryRef.current.length > 5) {
              messageHistoryRef.current.shift();
            }
            
            // Handle special commands
            if (response === "MUTE_COMMAND") {
              toggleMute(true);
              speakMessage("Voice assistant muted. I'll still listen for commands.", voiceSettings, true);
              return;
            } else if (response === "UNMUTE_COMMAND") {
              toggleMute(false);
              speakMessage("Voice assistant unmuted. I'll speak responses again.", voiceSettings, true);
              return;
            }
            
            // Speak the response if not muted
            if (!voiceSettings.muted) {
              speakMessage(response, voiceSettings, true);
            }
          } else {
            // If it's a repeated message, generate a variation
            const variations = [
              "I'd like to add to what I mentioned earlier.",
              "Let me clarify that point.",
              "As I was saying about PREPZR,"
            ];
            const prefix = variations[Math.floor(Math.random() * variations.length)];
            if (!voiceSettings.muted) {
              speakMessage(`${prefix} ${response}`, voiceSettings, true);
            }
          }
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
      recognitionRef.current.lang = 'en-IN'; // Always use Indian English
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
    
    // Don't greet if voice is disabled or muted
    if (!voiceSettings.enabled || voiceSettings.muted) {
      console.log("Voice is disabled or muted, skipping greeting");
      return;
    }
    
    console.log("Generating greeting for user:", userName, "mood:", mood, "first time:", isFirstTimeUser);
    const greeting = getGreeting(userName, mood, isFirstTimeUser);
    
    // Skip greeting if it's the same as the last announcement
    if (greeting === lastAnnouncementRef.current) {
      console.log("Skipping repeated greeting");
      hasGreetedRef.current = true;
      return;
    }
    
    console.log("Speaking greeting:", greeting);
    speakMessage(greeting, voiceSettings, true);
    lastAnnouncementRef.current = greeting;
    
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
  
  // Toggle mute/unmute
  const toggleMute = useCallback((forceMute?: boolean) => {
    setVoiceSettings(prev => {
      const newMuted = forceMute !== undefined ? forceMute : !prev.muted;
      const newSettings = { ...prev, muted: newMuted };
      console.log("Voice muted toggled to:", newSettings.muted);
      return newSettings;
    });
  }, []);
  
  // Update voice settings
  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => {
      // Always maintain Indian English regardless of settings update
      const updatedSettings = { 
        ...prev, 
        ...newSettings, 
        language: 'en-IN' 
      };
      console.log("Voice settings updated:", updatedSettings);
      return updatedSettings;
    });
  }, []);
  
  // Test the current voice settings
  const testVoice = useCallback(() => {
    const testMessage = "Hello! This is how PREPZR will sound with your current settings.";
    
    console.log("Testing voice with message:", testMessage);
    speakMessage(testMessage, voiceSettings, true); // Force it to speak regardless of settings
  }, [voiceSettings]);

  // Auto-test voice when initialized if it's enabled
  useEffect(() => {
    if (voiceInitialized && voiceSettings.enabled && !voiceSettings.muted) {
      // Wait a bit to ensure the browser is ready
      const timer = setTimeout(() => {
        const shortMsg = "PREPZR voice system ready.";
        speakMessage(shortMsg, voiceSettings, false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [voiceInitialized, voiceSettings]);

  return {
    isListening,
    isSpeaking,
    transcript,
    voiceSettings,
    voiceInitialized,
    startListening,
    stopListening,
    speakGreeting,
    speakMessage: (message: string, force?: boolean) => {
      // Check for repetition
      if (messageHistoryRef.current.includes(message)) {
        // Skip repetitive messages unless forced
        if (!force) return;
      }
      
      // Add to history
      messageHistoryRef.current.push(message);
      if (messageHistoryRef.current.length > 5) {
        messageHistoryRef.current.shift();
      }
      
      speakMessage(message, voiceSettings, force);
    },
    toggleVoiceEnabled,
    toggleMute,
    updateVoiceSettings,
    testVoice,
    isVoiceSupported: Boolean(window.speechSynthesis)
  };
}
