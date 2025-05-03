
import { useState, useCallback, useEffect } from 'react';
import { 
  getVoiceSettings, 
  saveVoiceSettings, 
  speakMessage, 
  getGreeting, 
  shouldSpeakGreeting,
  testVoiceSystem
} from './voiceUtils';
import type { VoiceSettings } from './voiceUtils';
import { MoodType } from '@/types/user/base';
import { getExamStrategy, getSubjectRecommendation, getLearningStyleTip } from './messageGenerators';

// Track context-aware state
interface UserContext {
  isFirstTimeUser: boolean;
  lastGreetingTime: number;
  lastScreenView: string;
  isInitialLoad: boolean;
  examGoal?: string;
  lastStudyActivity?: string;
}

// React hook for voice announcer
export const useVoiceAnnouncer = () => {
  const [settings, setSettings] = useState<VoiceSettings>(getVoiceSettings);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [lastInteraction, setLastInteraction] = useState<Date>(new Date());
  const [userContext, setUserContext] = useState<UserContext>({
    isFirstTimeUser: localStorage.getItem('new_user_signup') === 'true',
    lastGreetingTime: 0,
    lastScreenView: '',
    isInitialLoad: true,
    examGoal: localStorage.getItem('examGoal') || undefined
  });
  
  // Debug flag for voice issues
  const [voiceSystemReady, setVoiceSystemReady] = useState<boolean>(false);
  
  // Update settings locally and in storage
  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(current => {
      const updated = { ...current, ...newSettings };
      saveVoiceSettings(updated);
      return updated;
    });
  }, []);
  
  // Initialize voices when component mounts
  useEffect(() => {
    // Check if speech synthesis is available
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported in this browser");
      return;
    }
    
    // Load voices
    const loadVoices = () => {
      if (!window.speechSynthesis) return;
      
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log("Voice system initialized with voices:", 
          voices.length, 
          voices.map(v => `${v.name} (${v.lang})`).join(', ')
        );
        setVoiceSystemReady(true);
      } else {
        console.warn("No voices available yet");
      }
    };
    
    // Try loading voices immediately
    loadVoices();
    
    // Some browsers need this event to get voices
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    // Set default to loud volume if not already set
    setSettings(current => {
      if (current.volume < 0.9) {
        const updated = { ...current, volume: 0.9 };
        saveVoiceSettings(updated);
        return updated;
      }
      return current;
    });
    
    // Track speech status
    const handleSpeechStart = () => {
      console.log("Speech started");
      setIsSpeaking(true);
    };
    
    const handleSpeechEnd = () => {
      console.log("Speech ended");
      setIsSpeaking(false);
    };
    
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.addEventListener('start', handleSpeechStart);
        window.speechSynthesis.addEventListener('end', handleSpeechEnd);
        window.speechSynthesis.addEventListener('pause', handleSpeechEnd);
        window.speechSynthesis.addEventListener('resume', handleSpeechStart);
      } catch (e) {
        console.error("Could not add speech synthesis event listeners:", e);
      }
    }
    
    // Allow time for dashboard to load before first greeting
    const greetingDelay = setTimeout(() => {
      setUserContext(prev => ({
        ...prev,
        isInitialLoad: false
      }));
      
      // Test voice system after a delay to ensure browser is ready
      setTimeout(() => {
        const isWorking = testVoiceSystem();
        setVoiceSystemReady(isWorking);
      }, 2000);
      
    }, 3000);
    
    return () => {
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
          window.speechSynthesis.removeEventListener('start', handleSpeechStart);
          window.speechSynthesis.removeEventListener('end', handleSpeechEnd);
          window.speechSynthesis.removeEventListener('pause', handleSpeechEnd);
          window.speechSynthesis.removeEventListener('resume', handleSpeechStart);
        } catch (e) {
          console.error("Could not remove speech synthesis event listeners:", e);
        }
      }
      clearTimeout(greetingDelay);
    };
  }, []);

  // Update exam goal when available
  useEffect(() => {
    const examGoal = localStorage.getItem('examGoal');
    if (examGoal && examGoal !== userContext.examGoal) {
      setUserContext(prev => ({
        ...prev,
        examGoal
      }));
    }
  }, [userContext.examGoal]);

  // Check for period of inactivity and provide helpful prompts - only if user has been active before
  useEffect(() => {
    // Only proceed if voice is enabled and we're past initial load
    if (!settings.enabled || userContext.isInitialLoad) return;

    const inactivityTimer = setInterval(() => {
      const now = new Date();
      const minutesSinceLastActivity = (now.getTime() - lastInteraction.getTime()) / (1000 * 60);

      // After 10 minutes of inactivity, offer assistance (longer time to avoid interrupting)
      if (minutesSinceLastActivity > 10) {
        // Check if we should offer subject-specific advice
        if (userContext.examGoal) {
          const examMessages = [
            `For your ${userContext.examGoal} preparation, need help with any topics?`,
            `I suggest a practice test to assess your ${userContext.examGoal} readiness.`,
            `Would you like to review flashcards for ${userContext.examGoal}?`,
            `For ${userContext.examGoal}, which subject needs most attention?`
          ];
          speakMessage(examMessages[Math.floor(Math.random() * examMessages.length)]);
        } else {
          // General study advice if no exam goal is set
          const inactivityPrompts = [
            "Need help with your study plan?",
            "Would you like me to suggest study techniques?",
            "I recommend checking your progress statistics.",
            "Consider taking a practice test to identify knowledge gaps."
          ];
          speakMessage(inactivityPrompts[Math.floor(Math.random() * inactivityPrompts.length)]);
        }
        
        // Reset the timer after speaking
        setLastInteraction(new Date());
      }
    }, 600000); // Check every 10 minutes
    
    return () => clearInterval(inactivityTimer);
  }, [settings.enabled, lastInteraction, userContext]);

  // Update last interaction time when user interacts with the app
  const updateInteractionTime = useCallback(() => {
    setLastInteraction(new Date());
  }, []);
  
  // Update context when screen changes
  const updateScreenContext = useCallback((screenName: string) => {
    setUserContext(prev => ({
      ...prev,
      lastScreenView: screenName
    }));
    updateInteractionTime();
  }, [updateInteractionTime]);
  
  // Process a text query and respond with voice - with context-aware responses
  const processQuery = useCallback((query: string): string => {
    // Mark that user interacted
    updateInteractionTime();
    
    const lowerQuery = query.toLowerCase();
    
    // Subject-specific responses
    if (lowerQuery.includes("physics") || lowerQuery.includes("chemistry") || lowerQuery.includes("biology") || 
        lowerQuery.includes("math") || lowerQuery.includes("maths")) {
      let subject = "";
      if (lowerQuery.includes("physics")) subject = "Physics";
      else if (lowerQuery.includes("chemistry")) subject = "Chemistry";
      else if (lowerQuery.includes("biology")) subject = "Biology";
      else if (lowerQuery.includes("math") || lowerQuery.includes("maths")) subject = "Mathematics";
      
      return getSubjectRecommendation(subject, lowerQuery.includes("help") || lowerQuery.includes("difficult"));
    }
    
    // Exam-specific responses
    if (lowerQuery.includes("exam") || lowerQuery.includes("test") || 
        lowerQuery.includes("neet") || lowerQuery.includes("jee") ||
        lowerQuery.includes("upsc")) {
      // Extract exam name from query or use stored goal
      let examName = userContext.examGoal || "your exam";
      if (lowerQuery.includes("neet")) examName = "NEET";
      else if (lowerQuery.includes("jee")) examName = "JEE";
      else if (lowerQuery.includes("upsc")) examName = "UPSC";
      
      return getExamStrategy(examName);
    }
    
    // Basic intent detection with more focused, helpful responses
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("namaste")) {
      return "Hello! How can I help with your studies today?";
    }
    
    if (lowerQuery.includes("who are you") || lowerQuery.includes("what are you")) {
      return "I'm your study assistant with an Indian accent. I can help with exam preparation, concept explanations, and study planning.";
    }
    
    if (lowerQuery.includes("how are you")) {
      return "I'm ready to assist with your studies. How can I help you today?";
    }
    
    if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      return "I can announce tasks, help with concepts, suggest study strategies, and track your progress. What do you need help with?";
    }
    
    if (lowerQuery.includes("can't hear") || lowerQuery.includes("cant hear") || 
        lowerQuery.includes("no sound") || lowerQuery.includes("not working")) {
      return "I'm testing the voice system. If you can't hear me, check your device volume and browser permissions.";
    }
    
    if (lowerQuery.includes("flashcards") || lowerQuery.includes("flash cards")) {
      return "Flashcards are excellent for active recall. Would you like me to help you create some for your exam preparation?";
    }
    
    if (lowerQuery.includes("study plan") || lowerQuery.includes("schedule")) {
      return "Your study plan is available in the Academic Advisor section. Would you like me to help you optimize it?";
    }
    
    if (lowerQuery.includes("learning style")) {
      // Extract learning style from query or use default
      let style = "mixed";
      if (lowerQuery.includes("visual")) style = "visual";
      else if (lowerQuery.includes("audio") || lowerQuery.includes("auditory")) style = "auditory";
      else if (lowerQuery.includes("reading") || lowerQuery.includes("writing")) style = "reading/writing";
      else if (lowerQuery.includes("kinesthetic") || lowerQuery.includes("hands on")) style = "kinesthetic";
      
      return getLearningStyleTip(style);
    }
    
    if (lowerQuery.includes("motivate") || lowerQuery.includes("inspire")) {
      const motivationalQuotes = [
        "Success comes from consistent effort and strategic study. Keep going.",
        "Every practice test brings you closer to mastery. You're making progress.",
        "Focus on understanding, not memorizing. True knowledge stays with you.",
        "Your hard work today determines your results tomorrow. Stay committed.",
      ];
      return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }
    
    // Default response
    return "I can help with study strategies, concept explanations, and exam preparation. What would you like to know?";
  }, [updateInteractionTime, userContext.examGoal]);
  
  // Get welcome message for first time or returning users - context-aware and focused
  const getWelcomeMessage = useCallback((isFirstTime: boolean, userName: string = "", loginCount: number = 0): string => {
    // Update interaction time whenever welcome message is shown
    updateInteractionTime();
    
    // Use shorter, more focused welcome for first-time users
    if (isFirstTime) {
      return `Welcome to your study dashboard${userName ? ', ' + userName : ''}. Use the voice icon to ask questions anytime.`;
    } 
    
    // For returning users - contextual messages based on their exam goal
    if (userContext.examGoal) {
      return `Welcome back${userName ? ', ' + userName : ''}. Your ${userContext.examGoal} preparation continues. What would you like to focus on today?`;
    }
    
    // Generic welcome for returning users without specific context
    return `Welcome back${userName ? ', ' + userName : ''}. Ready for today's study session?`;
  }, [updateInteractionTime, userContext.examGoal]);
  
  // Speak with context awareness
  const speak = useCallback((message: string, force: boolean = false) => {
    // Skip if voice is disabled and not forced
    if (!settings.enabled && !force) {
      console.log("Voice disabled and not forced, skipping speech");
      return;
    }
    
    // Skip if in initial loading state and not forced
    if (userContext.isInitialLoad && !force) {
      console.log("Skipping announcement during initial load:", message);
      return;
    }
    
    // Update interaction time whenever something is spoken
    updateInteractionTime();
    
    // If we want to process a query instead of just announcing
    if (force && message.trim().endsWith("?")) {
      const response = processQuery(message);
      speakMessage(response, true);
      return;
    }
    
    // For greetings, check if we should speak based on timing
    if (message.startsWith("Good morning") || 
        message.startsWith("Good afternoon") || 
        message.startsWith("Good evening") ||
        message.startsWith("Welcome back") ||
        message.startsWith("Welcome to")) {
      
      if (shouldSpeakGreeting() || force) {
        console.log("Speaking greeting:", message);
        speakMessage(message, force);
        setUserContext(prev => ({
          ...prev,
          lastGreetingTime: Date.now()
        }));
      } else {
        console.log("Skipping greeting due to recent greeting:", message);
      }
      return;
    }
    
    console.log("Speaking message:", message, "forced:", force);
    speakMessage(message, force);
  }, [settings.enabled, processQuery, updateInteractionTime, userContext.isInitialLoad]);
  
  // Test the current voice settings
  const testVoice = useCallback(() => {
    console.log("Testing voice with settings:", settings);
    
    // First ensure voice is enabled temporarily
    const wasEnabled = settings.enabled;
    if (!wasEnabled) {
      updateSettings({ enabled: true });
    }
    
    // Use a simple, clear test message
    const testMessage = "Hello! I'm your study assistant with an Indian voice. Can you hear me clearly?";
    speak(testMessage, true);
    
    // Restore previous enabled state
    if (!wasEnabled) {
      setTimeout(() => updateSettings({ enabled: wasEnabled }), 5000);
    }
    
    updateInteractionTime();
    return testMessage;
  }, [speak, updateSettings, settings, updateInteractionTime]);
  
  // Stop any ongoing speech
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      console.log("Stopping all speech");
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    updateInteractionTime();
  }, [updateInteractionTime]);
  
  // Update context with exam goal
  const setExamGoal = useCallback((goal: string) => {
    setUserContext(prev => ({
      ...prev,
      examGoal: goal
    }));
    localStorage.setItem('examGoal', goal);
  }, []);
  
  // Mark user as not first time anymore
  const markUserAsReturning = useCallback(() => {
    setUserContext(prev => ({
      ...prev,
      isFirstTimeUser: false
    }));
    localStorage.removeItem('new_user_signup');
  }, []);
  
  // Get available voices
  const getAvailableVoices = useCallback(() => {
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported in this browser");
      return [];
    }
    return window.speechSynthesis.getVoices();
  }, []);
  
  // Fix voice system if it's not working
  const fixVoiceSystem = useCallback(() => {
    console.log("Attempting to fix voice system...");
    
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported in this browser");
      return false;
    }
    
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Force reload of voices
      const voices = window.speechSynthesis.getVoices();
      console.log(`Reloaded ${voices.length} voices`);
      
      // Try a very simple test
      const testUtterance = new SpeechSynthesisUtterance("Test voice system fix");
      testUtterance.volume = 1.0;
      testUtterance.rate = 1.0;
      testUtterance.pitch = 1.0;
      
      // Add listeners
      testUtterance.onstart = () => {
        console.log("Voice system fix - speech started");
        setIsSpeaking(true);
        setVoiceSystemReady(true);
      };
      
      testUtterance.onend = () => {
        console.log("Voice system fix - speech ended");
        setIsSpeaking(false);
      };
      
      testUtterance.onerror = (e) => {
        console.error("Voice system fix - speech error:", e);
        setVoiceSystemReady(false);
      };
      
      // Try to speak
      window.speechSynthesis.speak(testUtterance);
      
      return true;
    } catch (error) {
      console.error("Error fixing voice system:", error);
      return false;
    }
  }, []);
  
  return {
    settings,
    updateSettings,
    speak,
    testVoice,
    stopSpeaking,
    isSpeaking,
    voiceSystemReady,
    processQuery,
    getWelcomeMessage,
    getGreeting,
    updateInteractionTime,
    updateScreenContext,
    getAvailableVoices,
    setExamGoal,
    markUserAsReturning,
    isFirstTimeUser: userContext.isFirstTimeUser,
    fixVoiceSystem
  };
};
