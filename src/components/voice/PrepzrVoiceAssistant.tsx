
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
  const [sessionMessages, setSessionMessages] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Minimum 60 seconds between messages as per specification
  const MESSAGE_COOLDOWN = 60000;
  
  // Track user activity (mouse, scroll, click) - pauses assistant immediately
  useEffect(() => {
    const handleUserActivity = () => {
      setIsUserActive(true);
      
      // Stop any current speech immediately when user interacts
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Clear existing timeout
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      
      // Set user as inactive after 5 seconds of no activity
      activityTimeoutRef.current = setTimeout(() => {
        setIsUserActive(false);
      }, 5000);
    };

    const events = ['mousemove', 'mousedown', 'scroll', 'keydown', 'click', 'touchstart'];
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

  // Stop speech on page change or logout - immediate cleanup
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
      (now - lastMessageTime) >= MESSAGE_COOLDOWN
    );
  };

  const speakMessage = async (message: string, messageKey: string) => {
    // Check if message was already sent in this session (anti-repetition)
    if (!shouldPlayMessage() || sessionMessages.has(messageKey)) {
      return;
    }

    // Use student name immediately in all messages (personalized communication)
    const personalizedMessage = userName ? message.replace('[StudentName]', userName) : message;
    
    const success = speakWithFemaleVoice(personalizedMessage, { language });
    if (success) {
      setLastMessageTime(Date.now());
      setSessionMessages(prev => new Set(prev).add(messageKey));
      
      // Store in localStorage for persistence across page loads
      const sentMessages = JSON.parse(localStorage.getItem('voice_messages_sent') || '[]');
      sentMessages.push(messageKey);
      localStorage.setItem('voice_messages_sent', JSON.stringify(sentMessages));
      
      // Schedule next message after cooldown (intelligent pause)
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    }
  };

  // Home page behavior - welcome & smart suggestions
  useEffect(() => {
    if (location.pathname === '/' && !hasGreeted) {
      const messageKey = 'home-intro';
      
      setTimeout(() => {
        speakMessage(
          `Hi ${userName || 'there'}! I'm PREPZR AI, your personal exam prep guide. PREPZR isn't just another study app – it's your smart companion, built to help you crack your exams with confidence, structure, and speed.`,
          messageKey
        );
        setHasGreeted(true);
        
        // Smart suggestions with 60s intelligent pause
        messageTimeoutRef.current = setTimeout(() => {
          if (shouldPlayMessage()) {
            speakMessage(
              "Want to try PREPZR free before signing up? Just say 'Free trial'.",
              'suggestion-signup'
            );
          }
        }, MESSAGE_COOLDOWN);
        
      }, 1500);
    }
  }, [location.pathname, userName, hasGreeted]);

  // Welcome screen behavior (after signup) - first-time congratulation
  useEffect(() => {
    if (location.pathname === '/welcome' && isNewUser && userName) {
      const messageKey = 'welcome-congratulation';
      
      setTimeout(() => {
        speakMessage(
          `Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`,
          messageKey
        );
      }, 1500);
    }
  }, [location.pathname, isNewUser, userName]);

  // Dashboard behavior - first-time vs returning user detection
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard') && userName) {
      // Check if user has been welcomed to dashboard before
      const hasSeenDashboardWelcome = localStorage.getItem('dashboard_welcomed') === 'true';
      
      if (isNewUser && !hasSeenDashboardWelcome) {
        const messageKey = 'dashboard-first-time';
        setTimeout(() => {
          speakMessage(
            `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`,
            messageKey
          );
          localStorage.setItem('dashboard_welcomed', 'true');
        }, 1500);
      } else if (!isNewUser && hasSeenDashboardWelcome) {
        const messageKey = 'dashboard-returning';
        setTimeout(() => {
          const message = lastActivity 
            ? `Welcome back, ${userName}! Last time, you worked on ${lastActivity}. Let's pick up where you left off.`
            : `Welcome back, ${userName}! Ready to continue your learning journey?`;
          
          speakMessage(message, messageKey);
        }, 1500);
      }
    }
  }, [location.pathname, userName, isNewUser, lastActivity]);

  // Reset context when changing routes - cleanup and context awareness
  useEffect(() => {
    if (location.pathname !== currentContext) {
      // Cancel any ongoing speech immediately on navigation
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      
      setHasGreeted(false);
      setCurrentContext(location.pathname);
      setIsUserActive(false);
      
      // Don't clear sessionMessages - preserve session memory for anti-repetition
    }
  }, [location.pathname, currentContext]);

  // Load previously sent messages from localStorage on component mount
  useEffect(() => {
    const sentMessages = JSON.parse(localStorage.getItem('voice_messages_sent') || '[]');
    setSessionMessages(new Set(sentMessages));
  }, []);

  // Voice command processing with personalized responses
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('free trial')) {
      speakMessage(`${userName}, let's start your free trial!`, 'command-trial');
      navigate('/signup?trial=true');
    } else if (lowerCommand.includes('explain prepzr')) {
      speakMessage(
        `${userName}, PREPZR is the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. Unlike traditional coaching centers, we understand your mindset, not just the exam content.`,
        'command-explain'
      );
    }
  };

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
