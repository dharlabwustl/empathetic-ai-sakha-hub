
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface VoiceSession {
  sessionId: string;
  lastMessageTime: number;
  hasSpokenWelcome: boolean;
  hasSpokenDashboard: boolean;
  hasSpokenHomepage: boolean;
  isUserActive: boolean;
  currentPage: string;
  isFirstTimeUser: boolean;
  isReturningUser: boolean;
}

interface VoiceAssistantConfig {
  userName?: string;
  isLoggedIn?: boolean;
  isFirstTimeUser?: boolean;
  lastActivity?: string;
}

const MINIMUM_PAUSE_BETWEEN_MESSAGES = 60000; // 60 seconds
const USER_ACTIVITY_TIMEOUT = 3000; // 3 seconds

export const usePrepzrVoiceAssistant = (config: VoiceAssistantConfig = {}) => {
  const { userName, isLoggedIn, isFirstTimeUser, lastActivity } = config;
  const location = useLocation();
  const navigate = useNavigate();
  
  const [session, setSession] = useState<VoiceSession>({
    sessionId: Date.now().toString(),
    lastMessageTime: 0,
    hasSpokenWelcome: false,
    hasSpokenDashboard: false,
    hasSpokenHomepage: false,
    isUserActive: false,
    currentPage: location.pathname,
    isFirstTimeUser: isFirstTimeUser || false,
    isReturningUser: false
  });
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const activityTimeoutRef = useRef<number | null>(null);
  const suggestionTimeoutRef = useRef<number | null>(null);
  const spokenMessagesRef = useRef<Set<string>>(new Set());

  // Immediately stop speech and mark user as active on any interaction
  const handleUserActivity = useCallback(() => {
    if (isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      console.log('🔇 Voice: User activity detected - speech cancelled');
    }
    
    setSession(prev => ({ ...prev, isUserActive: true }));
    
    // Clear existing timeout
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
    
    // Set user as inactive after timeout
    activityTimeoutRef.current = window.setTimeout(() => {
      setSession(prev => ({ ...prev, isUserActive: false }));
    }, USER_ACTIVITY_TIMEOUT);
  }, [isSpeaking]);

  // Enhanced speak function with all rules applied
  const speak = useCallback((text: string, messageType: 'welcome' | 'dashboard' | 'homepage' | 'suggestion' = 'suggestion'): boolean => {
    const now = Date.now();
    
    // Don't speak if user is active
    if (session.isUserActive) {
      console.log('🔇 Voice: User is active - message skipped');
      return false;
    }
    
    // Don't speak if we're currently speaking
    if (isSpeaking) {
      console.log('🔇 Voice: Already speaking - message skipped');
      return false;
    }
    
    // Enforce 60-second minimum pause between messages
    if (now - session.lastMessageTime < MINIMUM_PAUSE_BETWEEN_MESSAGES && messageType === 'suggestion') {
      console.log('🔇 Voice: Too soon for next message - pausing');
      return false;
    }
    
    // Check if message was already spoken
    const messageKey = `${messageType}-${text.substring(0, 50)}`;
    if (spokenMessagesRef.current.has(messageKey) && messageType !== 'suggestion') {
      console.log('🔇 Voice: Message already spoken - skipping');
      return false;
    }
    
    // Personalize message with user name if available and appropriate
    let personalizedText = text;
    if (userName && (messageType === 'welcome' || messageType === 'dashboard')) {
      if (!text.includes(userName)) {
        personalizedText = text.replace(/\[StudentName\]/g, userName);
      }
    }
    
    console.log(`🔊 Voice: Speaking ${messageType}:`, personalizedText);
    
    const success = speakWithFemaleVoice(
      personalizedText,
      { language: 'en-US' },
      () => {
        setIsSpeaking(true);
        setSession(prev => ({ ...prev, lastMessageTime: now }));
      },
      () => {
        setIsSpeaking(false);
        spokenMessagesRef.current.add(messageKey);
        
        // Update session flags
        if (messageType === 'welcome') {
          setSession(prev => ({ ...prev, hasSpokenWelcome: true }));
        } else if (messageType === 'dashboard') {
          setSession(prev => ({ ...prev, hasSpokenDashboard: true }));
        } else if (messageType === 'homepage') {
          setSession(prev => ({ ...prev, hasSpokenHomepage: true }));
        }
      }
    );
    
    return success;
  }, [session, isSpeaking, userName]);

  // Homepage behavior
  const handleHomepageBehavior = useCallback(() => {
    if (session.hasSpokenHomepage || session.isUserActive || isSpeaking) return;
    
    // Initial welcome message
    setTimeout(() => {
      if (!session.isUserActive && location.pathname === '/') {
        const welcomeMessage = "Welcome to PREPZR! I'm your AI companion, here to guide you through the world's first emotionally aware exam preparation platform. PREPZR helps students like you crack competitive exams with personalized study plans, smart practice, and confidence building.";
        speak(welcomeMessage, 'homepage');
        
        // Schedule suggestions with 60-second intervals
        const suggestions = [
          "Let's start your personalized journey. Sign up and get ready to conquer your exams with PREPZR.",
          "Ready to explore PREPZR's features? I can show you how we make exam preparation smarter and more effective.",
          "Need help getting started? Just ask me anything about PREPZR's exam preparation benefits."
        ];
        
        suggestions.forEach((suggestion, index) => {
          suggestionTimeoutRef.current = window.setTimeout(() => {
            if (!session.isUserActive && location.pathname === '/' && !isSpeaking) {
              speak(suggestion, 'suggestion');
            }
          }, (index + 1) * MINIMUM_PAUSE_BETWEEN_MESSAGES);
        });
      }
    }, 1500);
  }, [session, speak, location.pathname, isSpeaking]);

  // Welcome screen behavior (after signup)
  const handleWelcomeBehavior = useCallback(() => {
    if (session.hasSpokenWelcome || !userName || session.isUserActive || isSpeaking) return;
    
    setTimeout(() => {
      if (!session.isUserActive && location.pathname.includes('welcome')) {
        const welcomeMessage = `Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`;
        speak(welcomeMessage, 'welcome');
      }
    }, 1500);
  }, [session, speak, userName, location.pathname, isSpeaking]);

  // Dashboard behavior - distinguish between first-time and returning users
  const handleDashboardBehavior = useCallback(() => {
    if (session.hasSpokenDashboard || !userName || session.isUserActive || isSpeaking) return;
    
    setTimeout(() => {
      if (!session.isUserActive && location.pathname.includes('dashboard')) {
        let dashboardMessage = '';
        
        // Check if user has completed welcome flow
        const hasCompletedWelcome = localStorage.getItem('hasSpokenWelcome') === 'true';
        const loginCount = parseInt(localStorage.getItem('loginCount') || '1');
        
        if (isFirstTimeUser && !hasCompletedWelcome) {
          // First-time dashboard message
          dashboardMessage = `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`;
        } else if (loginCount > 1 && lastActivity) {
          // Returning user message
          dashboardMessage = `Welcome back, ${userName}! Last time, you worked on ${lastActivity}. Let's pick up where you left off.`;
          setSession(prev => ({ ...prev, isReturningUser: true }));
        } else if (loginCount > 1) {
          // Returning user without specific activity
          dashboardMessage = `Welcome back, ${userName}! Ready to continue your exam preparation journey?`;
          setSession(prev => ({ ...prev, isReturningUser: true }));
        } else {
          // First-time after welcome
          dashboardMessage = `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`;
        }
        
        speak(dashboardMessage, 'dashboard');
      }
    }, 1500);
  }, [session, speak, userName, isFirstTimeUser, lastActivity, location.pathname, isSpeaking]);

  // Setup activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'keydown'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [handleUserActivity]);

  // Handle page changes - immediately stop speech and reset session
  useEffect(() => {
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    // Clear timeouts
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }
    
    // Reset session for new page
    setSession(prev => ({
      ...prev,
      currentPage: location.pathname,
      isUserActive: false,
      lastMessageTime: 0
    }));
    
    // Clear spoken messages for new session
    spokenMessagesRef.current.clear();
    
    console.log('🔄 Voice: Page changed to', location.pathname, '- speech reset');
  }, [location.pathname]);

  // Handle logout - completely stop voice assistant
  useEffect(() => {
    if (!isLoggedIn && (location.pathname.includes('login') || location.pathname.includes('signup'))) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      
      // Clear all timeouts
      if (suggestionTimeoutRef.current) clearTimeout(suggestionTimeoutRef.current);
      if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
      
      console.log('🔇 Voice: User logged out - voice assistant disabled');
      return;
    }
  }, [isLoggedIn, location.pathname]);

  // Trigger appropriate behavior based on current page
  useEffect(() => {
    if (session.isUserActive || isSpeaking) return;
    
    const currentPath = location.pathname;
    
    // Only speak on designated pages
    if (currentPath === '/') {
      handleHomepageBehavior();
    } else if (currentPath.includes('welcome') && !currentPath.includes('login') && !currentPath.includes('signup')) {
      handleWelcomeBehavior();
    } else if (currentPath.includes('dashboard') && isLoggedIn) {
      handleDashboardBehavior();
    }
  }, [
    location.pathname, 
    session.isUserActive, 
    isSpeaking, 
    isLoggedIn,
    handleHomepageBehavior, 
    handleWelcomeBehavior, 
    handleDashboardBehavior
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, []);

  return {
    isSpeaking,
    speak,
    isUserActive: session.isUserActive,
    currentPage: session.currentPage,
    hasSpoken: {
      welcome: session.hasSpokenWelcome,
      dashboard: session.hasSpokenDashboard,
      homepage: session.hasSpokenHomepage
    }
  };
};
