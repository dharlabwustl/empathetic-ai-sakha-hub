
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { speakWithFemaleVoice, createIntelligentPause } from '@/utils/voiceConfig';

interface PrepzrVoiceAssistantProps {
  userName?: string;
  language?: string;
  isNewUser?: boolean;
  lastActivity?: string;
}

const PrepzrVoiceAssistant: React.FC<PrepzrVoiceAssistantProps> = ({ 
  userName = 'there',
  language = 'en-US',
  isNewUser = false,
  lastActivity
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [userActivityDetected, setUserActivityDetected] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [messagesSent, setMessagesSent] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const activityTimeoutRef = useRef<NodeJS.Timeout>();
  const messageTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Only be active on homepage and signup pages, NOT on dashboard or welcome screens
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const shouldPlayGreeting = (location.pathname === '/' || location.pathname.includes('/signup')) && !isUserLoggedIn;

  // Activity detection - silence voice when user is active
  useEffect(() => {
    const handleUserActivity = () => {
      setUserActivityDetected(true);
      
      // Cancel any ongoing speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Clear existing timeout
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      
      // Set timeout to resume after 60 seconds of inactivity
      activityTimeoutRef.current = setTimeout(() => {
        setUserActivityDetected(false);
      }, 60000);
    };

    const events = ['click', 'keydown', 'scroll', 'mousemove', 'touchstart'];
    
    if (shouldPlayGreeting) {
      events.forEach(event => {
        document.addEventListener(event, handleUserActivity, { passive: true });
      });
    }

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, [shouldPlayGreeting]);

  // Get contextual message based on current page
  const getContextMessage = (path: string, userName: string) => {
    if (path === '/') {
      const messageKey = 'home-intro';
      if (!messagesSent.has(messageKey)) {
        setMessagesSent(prev => new Set(prev).add(messageKey));
        return `Hi ${userName}! I'm PREPZR AI, your personal exam prep guide. PREPZR isn't just another study app – it's your smart companion, built to help you crack your exams with confidence.`;
      }
    } else if (path.includes('/signup')) {
      const messageKey = 'signup-help';
      if (!messagesSent.has(messageKey)) {
        setMessagesSent(prev => new Set(prev).add(messageKey));
        return `Sign up to unlock a customized study journey. PREPZR will guide you at every step.`;
      }
    }
    return null;
  };

  // Speak with intelligent timing and prevent repetition
  const speakMessage = async (message: string) => {
    const now = Date.now();
    
    // Prevent too frequent messages (minimum 60 seconds between messages)
    if (now - lastMessageTime < 60000) {
      return;
    }
    
    const success = speakWithFemaleVoice(message, { language });
    if (success) {
      setLastMessageTime(now);
    }
  };

  // Handle greetings and context-aware messages
  useEffect(() => {
    if (!shouldPlayGreeting || hasGreeted || userActivityDetected) {
      return;
    }
    
    const handleContextualGreeting = async () => {
      const contextMessage = getContextMessage(location.pathname, userName);
      
      if (contextMessage) {
        await speakMessage(contextMessage);
        setHasGreeted(true);
        
        // After greeting, provide additional info with delay only if user is inactive
        if (location.pathname === '/') {
          messageTimeoutRef.current = setTimeout(async () => {
            if (!userActivityDetected && shouldPlayGreeting) {
              const suggestion = "Want to try PREPZR free? Just say 'Free trial' or click the signup button.";
              await speakMessage(suggestion);
            }
          }, 10000);
        }
      }
    };
    
    // Delay initial greeting slightly
    const greetingTimeout = setTimeout(handleContextualGreeting, 1500);
    
    return () => {
      clearTimeout(greetingTimeout);
    };
  }, [location.pathname, userName, hasGreeted, shouldPlayGreeting, userActivityDetected]);

  // Reset context when changing routes
  useEffect(() => {
    setHasGreeted(false);
    setUserActivityDetected(false);
    
    // Cancel any ongoing speech when route changes
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Clear timeouts
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, []);

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
