
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
  userName = '',
  language = 'en-US',
  isNewUser = false,
  lastActivity
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [currentContext, setCurrentContext] = useState<string>('');
  const [messagesSent, setMessagesSent] = useState<Set<string>>(new Set());
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [isUserActive, setIsUserActive] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Minimum 120 seconds between messages to prevent spam
  const MESSAGE_COOLDOWN = 120000;
  
  // Track user activity (mouse, scroll, click)
  useEffect(() => {
    const handleUserActivity = () => {
      setIsUserActive(true);
      
      // Stop any current speech immediately when user is active
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Clear existing timeout
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      
      // Set user as inactive after 10 seconds of no activity
      activityTimeoutRef.current = setTimeout(() => {
        setIsUserActive(false);
      }, 10000);
    };

    const events = ['mousemove', 'mousedown', 'scroll', 'keydown', 'click', 'touchstart', 'wheel'];
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
    };
  }, []);

  // Stop speech on page change or logout
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  const shouldPlayMessage = () => {
    const now = Date.now();
    const allowedPages = ['/', '/dashboard', '/welcome'];
    const isOnAllowedPage = allowedPages.some(page => 
      location.pathname === page || location.pathname.startsWith('/dashboard/student')
    );
    
    return (
      isOnAllowedPage &&
      !isUserActive &&
      (now - lastMessageTime) >= MESSAGE_COOLDOWN &&
      !document.hidden // Don't speak if tab is not visible
    );
  };

  const speakMessage = async (message: string, messageKey: string) => {
    if (!shouldPlayMessage() || messagesSent.has(messageKey)) {
      return;
    }

    const personalizedMessage = userName ? message.replace('[StudentName]', userName) : message;
    
    const success = speakWithFemaleVoice(personalizedMessage, { language });
    if (success) {
      setLastMessageTime(Date.now());
      setMessagesSent(prev => new Set(prev).add(messageKey));
    }
  };

  // Only greet on home page, and only once
  useEffect(() => {
    if (location.pathname === '/' && !hasGreeted && !isUserActive) {
      const messageKey = 'home-intro';
      
      setTimeout(() => {
        if (!messagesSent.has(messageKey)) {
          speakMessage(
            `Hi ${userName || 'there'}! I'm PREPZR AI, your exam prep companion.`,
            messageKey
          );
          setHasGreeted(true);
        }
      }, 3000); // Longer delay to let page load
    }
  }, [location.pathname, userName, hasGreeted, isUserActive]);

  // Welcome screen behavior (after signup) - only once
  useEffect(() => {
    if (location.pathname === '/welcome' && isNewUser && userName && !isUserActive) {
      const messageKey = 'welcome-congratulation';
      
      setTimeout(() => {
        if (!messagesSent.has(messageKey)) {
          speakMessage(
            `Congratulations, ${userName}! Welcome to PREPZR.`,
            messageKey
          );
        }
      }, 2000);
    }
  }, [location.pathname, isNewUser, userName, isUserActive]);

  // Dashboard behavior - very limited
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard') && userName && !isUserActive) {
      const messageKey = isNewUser ? 'dashboard-first-time' : 'dashboard-returning';
      
      setTimeout(() => {
        if (!messagesSent.has(messageKey)) {
          const message = isNewUser 
            ? `Welcome to your dashboard, ${userName}.`
            : `Welcome back, ${userName}.`;
          
          speakMessage(message, messageKey);
        }
      }, 2000);
    }
  }, [location.pathname, userName, isNewUser, isUserActive]);

  // Reset context when changing routes but preserve message history
  useEffect(() => {
    if (location.pathname !== currentContext) {
      setHasGreeted(false);
      setCurrentContext(location.pathname);
      
      // Cancel any ongoing speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    }
  }, [location.pathname, currentContext]);

  // Voice command processing - simplified
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('free trial')) {
      navigate('/signup?trial=true');
    }
  };

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
