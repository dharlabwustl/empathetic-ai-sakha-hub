
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
  const [messagesSent, setMessagesSent] = useState<Set<string>>(new Set());
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [isUserActive, setIsUserActive] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Minimum 60 seconds between messages
  const MESSAGE_COOLDOWN = 60000;
  
  // Track user activity (mouse, scroll, click) - immediately pause voice
  useEffect(() => {
    const handleUserActivity = () => {
      setIsUserActive(true);
      
      // Stop any current speech immediately
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Clear existing timeout
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      
      // Clear message timeout
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      
      // Set user as inactive after 5 seconds of no activity
      activityTimeoutRef.current = setTimeout(() => {
        setIsUserActive(false);
      }, 5000);
    };

    const events = ['mousemove', 'mousedown', 'scroll', 'keydown', 'click', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
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
    const allowedPages = ['/'];
    const isOnAllowedPage = allowedPages.includes(location.pathname);
    
    return (
      isOnAllowedPage &&
      !isUserActive &&
      (now - lastMessageTime) >= MESSAGE_COOLDOWN
    );
  };

  const speakMessage = async (message: string, messageKey: string) => {
    if (!shouldPlayMessage() || messagesSent.has(messageKey)) {
      return;
    }

    const success = speakWithFemaleVoice(message, { language });
    if (success) {
      setLastMessageTime(Date.now());
      setMessagesSent(prev => new Set(prev).add(messageKey));
    }
  };

  // Home page behavior with timed suggestions
  useEffect(() => {
    if (location.pathname === '/' && !hasGreeted) {
      const messageKey = 'home-intro';
      
      setTimeout(() => {
        if (!isUserActive) {
          speakMessage(
            `Welcome to PREPZR! I'm your AI companion, here to guide you through the world's first emotionally aware exam preparation platform. PREPZR helps students like you crack competitive exams with personalized study plans, smart practice, and confidence building.`,
            messageKey
          );
          setHasGreeted(true);
          
          // Schedule smart suggestions with 60s intervals
          scheduleNextSuggestion();
        }
      }, 1500);
    }
  }, [location.pathname, hasGreeted, isUserActive]);

  const scheduleNextSuggestion = () => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    messageTimeoutRef.current = setTimeout(() => {
      if (shouldPlayMessage() && location.pathname === '/') {
        const suggestions = [
          "Ready to start your personalized journey? Sign up and get ready to conquer your exams with PREPZR.",
          "I'm here to help you explore PREPZR. Would you like to know about our features?",
          "Need assistance? I can tell you about PREPZR's benefits for exam success.",
          "Wondering how PREPZR can help you? Just ask me anything!"
        ];
        
        const suggestion = suggestions[currentSuggestionIndex % suggestions.length];
        const messageKey = `suggestion-${currentSuggestionIndex}`;
        
        speakMessage(suggestion, messageKey);
        setCurrentSuggestionIndex(prev => prev + 1);
        
        // Schedule next suggestion
        scheduleNextSuggestion();
      }
    }, MESSAGE_COOLDOWN);
  };

  // Welcome screen behavior (after signup) - only once
  useEffect(() => {
    if (location.pathname === '/welcome' && isNewUser && userName) {
      const messageKey = 'welcome-congratulation';
      const hasSpokenWelcome = localStorage.getItem('hasSpokenWelcome') === 'true';
      
      if (!hasSpokenWelcome) {
        setTimeout(() => {
          if (!isUserActive) {
            speakMessage(
              `Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`,
              messageKey
            );
            localStorage.setItem('hasSpokenWelcome', 'true');
          }
        }, 1500);
      }
    }
  }, [location.pathname, isNewUser, userName, isUserActive]);

  // Voice command processing
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('signup') || lowerCommand.includes('sign up')) {
      speakMessage("Let's start your personalized journey. Sign up and get ready to conquer your exams with PREPZR.", 'command-signup');
      // Navigate to signup
      setTimeout(() => navigate('/signup'), 1000);
    } else if (lowerCommand.includes('features') || lowerCommand.includes('what can prepzr do')) {
      speakMessage("PREPZR offers emotionally aware learning with personalized study plans, adaptive practice, AI tutoring, and comprehensive exam preparation for NEET, JEE, and other competitive exams.", 'command-features');
    } else if (lowerCommand.includes('free trial') || lowerCommand.includes('trial')) {
      speakMessage("Great choice! Our free trial gives you full access to PREPZR's features for 7 days. You can explore personalized study plans, take practice tests, and experience our AI guidance.", 'command-trial');
    }
  };

  // Reset context when changing routes
  useEffect(() => {
    // Cancel any ongoing speech on route change
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    // Reset state for new page
    if (location.pathname !== '/') {
      setHasGreeted(false);
      setCurrentSuggestionIndex(0);
      setIsUserActive(false);
    }
  }, [location.pathname]);

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
