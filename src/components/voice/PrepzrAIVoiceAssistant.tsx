
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { speakWithFemaleVoice, cleanupVoice } from '@/utils/voiceConfig';

interface PrepzrAIVoiceAssistantProps {
  userName?: string;
  language?: string;
  isNewUser?: boolean;
  lastActivity?: string;
  currentPage?: 'home' | 'signup' | 'welcome' | 'dashboard';
}

const PrepzrAIVoiceAssistant: React.FC<PrepzrAIVoiceAssistantProps> = ({ 
  userName,
  language = 'en-US',
  isNewUser = false,
  lastActivity,
  currentPage
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [userActivityDetected, setUserActivityDetected] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [messagesSent, setMessagesSent] = useState<Set<string>>(new Set());
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const activityTimeoutRef = useRef<NodeJS.Timeout>();
  const suggestionTimeoutRef = useRef<NodeJS.Timeout>();
  const sessionStartRef = useRef(Date.now());

  // Determine current context
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isHomePage = location.pathname === '/';
  const isSignupPage = location.pathname.includes('/signup') || location.pathname.includes('/login');
  const isWelcomePage = location.pathname.includes('/welcome') || location.pathname.includes('/post-login-welcome');
  const isDashboard = location.pathname.includes('/dashboard/student');

  // Activity detection - silence voice when user is active
  useEffect(() => {
    const handleUserActivity = () => {
      setUserActivityDetected(true);
      
      // Cancel any ongoing speech immediately
      cleanupVoice();
      
      // Clear existing timeout
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      
      // Clear suggestion timeout
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
      
      // Set timeout to resume after 60 seconds of inactivity
      activityTimeoutRef.current = setTimeout(() => {
        setUserActivityDetected(false);
      }, 60000);
    };

    const events = ['click', 'keydown', 'scroll', 'mousemove', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
    };
  }, []);

  // Home page suggestions
  const homePageSuggestions = [
    "Let's start your personalized journey. Sign up and get ready to conquer your exams with PREPZR.",
    "Discover how PREPZR adapts to your learning style and exam goals.",
    "Join thousands of students who've already transformed their exam preparation with PREPZR."
  ];

  // Speak message with intelligent timing
  const speakMessage = async (message: string, options?: { skipDuplication?: boolean }) => {
    const now = Date.now();
    
    // Prevent too frequent messages (minimum 60 seconds between messages)
    if (!options?.skipDuplication && now - lastMessageTime < 60000) {
      return false;
    }
    
    // Check if user is active
    if (userActivityDetected) {
      return false;
    }
    
    // Check for message duplication
    const messageKey = message.toLowerCase().trim().substring(0, 50);
    if (!options?.skipDuplication && messagesSent.has(messageKey)) {
      return false;
    }
    
    const success = speakWithFemaleVoice(message, { language });
    if (success) {
      setLastMessageTime(now);
      if (!options?.skipDuplication) {
        setMessagesSent(prev => new Set(prev).add(messageKey));
      }
      return true;
    }
    
    return false;
  };

  // Handle home page behavior
  useEffect(() => {
    if (!isHomePage || isUserLoggedIn || hasGreeted || userActivityDetected) {
      return;
    }
    
    const handleHomePageGreeting = async () => {
      // Initial welcome message
      const welcomeMessage = "Welcome to PREPZR, the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. I'm your PREPZR AI assistant.";
      
      const success = await speakMessage(welcomeMessage);
      if (success) {
        setHasGreeted(true);
        
        // Start suggestion cycle after greeting
        setTimeout(() => {
          if (!userActivityDetected && isHomePage && !isUserLoggedIn) {
            startSuggestionCycle();
          }
        }, 5000);
      }
    };
    
    // Delay initial greeting slightly
    const greetingTimeout = setTimeout(handleHomePageGreeting, 1500);
    
    return () => {
      clearTimeout(greetingTimeout);
    };
  }, [isHomePage, isUserLoggedIn, hasGreeted, userActivityDetected]);

  // Suggestion cycle for home page
  const startSuggestionCycle = () => {
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }
    
    const cycleSuggestions = async () => {
      if (userActivityDetected || !isHomePage || isUserLoggedIn) {
        return;
      }
      
      const suggestion = homePageSuggestions[currentSuggestionIndex];
      if (suggestion) {
        const success = await speakMessage(suggestion);
        if (success) {
          setCurrentSuggestionIndex(prev => (prev + 1) % homePageSuggestions.length);
        }
      }
      
      // Schedule next suggestion
      suggestionTimeoutRef.current = setTimeout(cycleSuggestions, 60000);
    };
    
    suggestionTimeoutRef.current = setTimeout(cycleSuggestions, 60000);
  };

  // Handle welcome page behavior
  useEffect(() => {
    if (!isWelcomePage || !userName || hasGreeted || userActivityDetected) {
      return;
    }
    
    const handleWelcomeGreeting = async () => {
      const welcomeMessage = `Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`;
      
      const success = await speakMessage(welcomeMessage, { skipDuplication: true });
      if (success) {
        setHasGreeted(true);
      }
    };
    
    // Delay welcome greeting
    const welcomeTimeout = setTimeout(handleWelcomeGreeting, 2000);
    
    return () => {
      clearTimeout(welcomeTimeout);
    };
  }, [isWelcomePage, userName, hasGreeted, userActivityDetected]);

  // Handle dashboard behavior
  useEffect(() => {
    if (!isDashboard || !userName || hasGreeted || userActivityDetected) {
      return;
    }
    
    const handleDashboardGreeting = async () => {
      let dashboardMessage = '';
      
      if (isNewUser) {
        dashboardMessage = `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`;
      } else if (lastActivity) {
        dashboardMessage = `Welcome back, ${userName}! Last time, you worked on ${lastActivity}. Let's pick up where you left off.`;
      } else {
        dashboardMessage = `Welcome back, ${userName}! Ready to continue your exam preparation journey?`;
      }
      
      const success = await speakMessage(dashboardMessage, { skipDuplication: true });
      if (success) {
        setHasGreeted(true);
      }
    };
    
    // Delay dashboard greeting
    const dashboardTimeout = setTimeout(handleDashboardGreeting, 2500);
    
    return () => {
      clearTimeout(dashboardTimeout);
    };
  }, [isDashboard, userName, isNewUser, lastActivity, hasGreeted, userActivityDetected]);

  // Reset context when changing routes
  useEffect(() => {
    setHasGreeted(false);
    setUserActivityDetected(false);
    setCurrentSuggestionIndex(0);
    
    // Cancel any ongoing speech when route changes
    cleanupVoice();
    
    // Clear timeouts
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }
    
    // Reset session start for new pages
    sessionStartRef.current = Date.now();
  }, [location.pathname]);

  // Handle logout cleanup
  useEffect(() => {
    if (!isUserLoggedIn) {
      cleanupVoice();
      setHasGreeted(false);
      setMessagesSent(new Set());
    }
  }, [isUserLoggedIn]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupVoice();
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, []);

  // This component only handles voice logic, no visual rendering
  return null;
};

export default PrepzrAIVoiceAssistant;
