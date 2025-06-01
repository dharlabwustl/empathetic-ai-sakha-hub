
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface VoiceAssistantConfig {
  userName?: string;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  inactivityTimeout?: number;
  context?: 'dashboard' | 'study-plan' | 'concepts' | 'practice' | 'academic';
}

interface PageContext {
  route: string;
  suggestions: string[];
  welcomeMessage?: string;
}

const PAGE_CONTEXTS: Record<string, PageContext> = {
  '/dashboard/student': {
    route: 'overview',
    suggestions: [
      "Ready to start your study session? I can guide you to your priority concepts.",
      "Your physics progress needs attention. Want to access practice questions?",
      "Great work on biology! Ready for some advanced practice tests?"
    ],
    welcomeMessage: "Welcome to your dashboard! Your current study streak is impressive."
  },
  '/dashboard/student/study-plan': {
    route: 'study-plan',
    suggestions: [
      "Your study plan shows thermodynamics as a priority. Want to start there?",
      "I notice you have 2.5 hours scheduled for physics today. Ready to begin?",
      "Your weak areas need focus. Should I guide you to concept cards for organic chemistry?"
    ],
    welcomeMessage: "Here's your personalized study plan. Let's optimize your preparation strategy."
  },
  '/dashboard/student/concepts': {
    route: 'concepts',
    suggestions: [
      "Start with thermodynamics concepts - they're marked as priority for you.",
      "Your mechanics concepts are 60% complete. Want to finish this topic?",
      "Try the interactive concept cards for better understanding."
    ],
    welcomeMessage: "Master key concepts here. Your physics concepts need the most attention."
  },
  '/dashboard/student/practice-exam': {
    route: 'practice',
    suggestions: [
      "Take a physics practice test to identify weak areas.",
      "Your last chemistry score was 65%. Ready to improve?",
      "Try a full-length mock test to simulate exam conditions."
    ],
    welcomeMessage: "Practice makes perfect! Your exam readiness score is 65%."
  },
  '/dashboard/student/academic': {
    route: 'academic',
    suggestions: [
      "Your academic advisor recommends focusing on weak subjects first.",
      "Create a new study plan to optimize your preparation strategy.",
      "Check your subject-wise performance analytics."
    ],
    welcomeMessage: "Get personalized academic guidance here. Your study strategy looks good!"
  }
};

const MINIMUM_PAUSE_BETWEEN_MESSAGES = 60000; // 60 seconds
const USER_ACTIVITY_TIMEOUT = 3000; // 3 seconds
const INACTIVITY_INTERVENTION_DELAY = 30000; // 30 seconds

export const useIntelligentVoiceAssistant = (config: VoiceAssistantConfig = {}) => {
  const { userName, language = 'en-US', onSpeakingChange, inactivityTimeout = 60000, context } = config;
  const location = useLocation();
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const activityTimeoutRef = useRef<number | null>(null);
  const interventionTimeoutRef = useRef<number | null>(null);
  const spokenMessagesRef = useRef<Set<string>>(new Set());
  const lastRouteRef = useRef<string>('');

  // Stop all speech and timers when voice is disabled
  const stopAllVoiceActivity = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
      activityTimeoutRef.current = null;
    }
    
    if (interventionTimeoutRef.current) {
      clearTimeout(interventionTimeoutRef.current);
      interventionTimeoutRef.current = null;
    }
  }, []);

  // Enhanced user activity tracking
  const trackActivity = useCallback(() => {
    if (!voiceEnabled) return;
    
    // Immediately stop speech on user activity
    if (isSpeaking) {
      stopAllVoiceActivity();
      console.log('🔇 Voice: User activity detected - speech stopped');
    }
    
    setIsUserActive(true);
    
    // Clear existing timers
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
    if (interventionTimeoutRef.current) {
      clearTimeout(interventionTimeoutRef.current);
    }
    
    // Set user as inactive after timeout
    activityTimeoutRef.current = window.setTimeout(() => {
      setIsUserActive(false);
      scheduleIntervention();
    }, USER_ACTIVITY_TIMEOUT);
  }, [isSpeaking, voiceEnabled, stopAllVoiceActivity]);

  // Schedule intelligent intervention based on inactivity
  const scheduleIntervention = useCallback(() => {
    if (!voiceEnabled || isUserActive) return;
    
    interventionTimeoutRef.current = window.setTimeout(() => {
      if (!isUserActive && voiceEnabled) {
        offerContextualHelp();
      }
    }, INACTIVITY_INTERVENTION_DELAY);
  }, [isUserActive, voiceEnabled]);

  // Smart speak function with all intelligence rules
  const speak = useCallback((text: string, isWelcome: boolean = false): boolean => {
    if (!voiceEnabled) {
      console.log('🔇 Voice: Voice disabled - message skipped');
      return false;
    }
    
    const now = Date.now();
    
    // Don't speak if user is active
    if (isUserActive && !isWelcome) {
      console.log('🔇 Voice: User is active - message skipped');
      return false;
    }
    
    // Don't speak if we're currently speaking
    if (isSpeaking) {
      console.log('🔇 Voice: Already speaking - message skipped');
      return false;
    }
    
    // Enforce 60-second minimum pause between messages
    if (!isWelcome && now - lastMessageTime < MINIMUM_PAUSE_BETWEEN_MESSAGES) {
      console.log('🔇 Voice: Too soon for next message - 60s pause required');
      return false;
    }
    
    // Check if message was already spoken for this session
    const messageKey = `${location.pathname}-${text.substring(0, 30)}`;
    if (spokenMessagesRef.current.has(messageKey) && !isWelcome) {
      console.log('🔇 Voice: Message already spoken in this session');
      return false;
    }
    
    // Personalize message with user name if available
    let personalizedText = text;
    if (userName && userName !== 'Student' && userName !== 'there') {
      if (!text.includes(userName)) {
        personalizedText = `${userName}, ${text.toLowerCase()}`;
      }
    }
    
    console.log(`🔊 Voice: Speaking (${isWelcome ? 'welcome' : 'suggestion'}):`, personalizedText);
    
    const success = speakWithFemaleVoice(
      personalizedText,
      { language },
      () => {
        setIsSpeaking(true);
        setLastMessageTime(now);
        if (onSpeakingChange) onSpeakingChange(true);
      },
      () => {
        setIsSpeaking(false);
        spokenMessagesRef.current.add(messageKey);
        if (onSpeakingChange) onSpeakingChange(false);
      }
    );
    
    return success;
  }, [voiceEnabled, isUserActive, isSpeaking, lastMessageTime, location.pathname, userName, language, onSpeakingChange]);

  // Play initial greeting for new page
  const playInitialGreeting = useCallback((customMessage?: string) => {
    if (!voiceEnabled || hasSpokenWelcome) return;
    
    const pageContext = PAGE_CONTEXTS[location.pathname];
    const message = customMessage || pageContext?.welcomeMessage || "Welcome! How can I help you study better?";
    
    setTimeout(() => {
      if (!isUserActive && voiceEnabled) {
        const success = speak(message, true);
        if (success) {
          setHasSpokenWelcome(true);
        }
      }
    }, 2000); // 2 second delay for initial greeting
  }, [voiceEnabled, hasSpokenWelcome, location.pathname, isUserActive, speak]);

  // Offer contextual help based on current page
  const offerContextualHelp = useCallback(() => {
    if (!voiceEnabled || isUserActive || isSpeaking) return;
    
    const pageContext = PAGE_CONTEXTS[location.pathname];
    if (!pageContext || !pageContext.suggestions.length) return;
    
    const randomSuggestion = pageContext.suggestions[Math.floor(Math.random() * pageContext.suggestions.length)];
    speak(randomSuggestion);
  }, [voiceEnabled, isUserActive, isSpeaking, location.pathname, speak]);

  // Handle route changes - reset session and stop all activity
  useEffect(() => {
    if (lastRouteRef.current !== location.pathname) {
      console.log('🔄 Voice: Route changed to', location.pathname);
      
      // Stop all voice activity
      stopAllVoiceActivity();
      
      // Reset session state
      setHasSpokenWelcome(false);
      setIsUserActive(false);
      setLastMessageTime(0);
      spokenMessagesRef.current.clear();
      
      lastRouteRef.current = location.pathname;
    }
  }, [location.pathname, stopAllVoiceActivity]);

  // Setup activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'keydown'];
    
    events.forEach(event => {
      document.addEventListener(event, trackActivity, true);
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, trackActivity, true);
      });
    };
  }, [trackActivity]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllVoiceActivity();
    };
  }, [stopAllVoiceActivity]);

  // Voice control methods
  const enableVoice = useCallback(() => {
    setVoiceEnabled(true);
    console.log('🔊 Voice: Voice assistant enabled');
  }, []);

  const disableVoice = useCallback(() => {
    stopAllVoiceActivity();
    setVoiceEnabled(false);
    console.log('🔇 Voice: Voice assistant disabled');
  }, [stopAllVoiceActivity]);

  const toggleVoice = useCallback(() => {
    if (voiceEnabled) {
      disableVoice();
    } else {
      enableVoice();
    }
  }, [voiceEnabled, enableVoice, disableVoice]);

  return {
    isSpeaking,
    isUserActive,
    voiceEnabled,
    speak,
    playInitialGreeting,
    trackActivity,
    enableVoice,
    disableVoice,
    toggleVoice,
    stopAllVoiceActivity
  };
};
