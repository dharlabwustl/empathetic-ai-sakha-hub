
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
  const [sessionId] = useState(() => Date.now().toString());
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Minimum 60 seconds between messages
  const MESSAGE_COOLDOWN = 60000;
  
  // Track user activity (mouse, scroll, click, keyboard)
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
      
      // Set user as inactive after 3 seconds of no activity
      activityTimeoutRef.current = setTimeout(() => {
        setIsUserActive(false);
      }, 3000);
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
    
    // Don't speak on signup/login pages
    const blockedPages = ['/signup', '/login', '/logout'];
    const isOnBlockedPage = blockedPages.some(page => location.pathname.includes(page));
    
    return (
      isOnAllowedPage &&
      !isOnBlockedPage &&
      !isUserActive &&
      (now - lastMessageTime) >= MESSAGE_COOLDOWN
    );
  };

  const speakMessage = async (message: string, messageKey: string) => {
    if (!shouldPlayMessage() || messagesSent.has(`${sessionId}-${messageKey}`)) {
      return;
    }

    // Personalize message with student name immediately
    const personalizedMessage = userName ? message.replace(/\[StudentName\]/g, userName) : message;
    
    const success = speakWithFemaleVoice(personalizedMessage, { language });
    if (success) {
      setLastMessageTime(Date.now());
      setMessagesSent(prev => new Set(prev).add(`${sessionId}-${messageKey}`));
    }
  };

  // Home page behavior
  useEffect(() => {
    if (location.pathname === '/' && !hasGreeted) {
      const messageKey = 'home-intro';
      
      setTimeout(() => {
        if (shouldPlayMessage()) {
          speakMessage(
            `Hi there! I'm PREPZR AI, your personal exam prep guide. PREPZR isn't just another study app – it's your smart companion, built to help you crack your exams with confidence, structure, and speed.`,
            messageKey
          );
          setHasGreeted(true);
          
          // Smart suggestions with 60s delay
          messageTimeoutRef.current = setTimeout(() => {
            if (shouldPlayMessage()) {
              speakMessage(
                "Let's start your personalized journey. Sign up and get ready to conquer your exams with PREPZR.",
                'signup-prompt'
              );
            }
          }, MESSAGE_COOLDOWN);
        }
      }, 2000);
    }
  }, [location.pathname, hasGreeted]);

  // Welcome screen behavior (after signup)
  useEffect(() => {
    if (location.pathname === '/welcome' && isNewUser && userName) {
      const messageKey = 'welcome-congratulation';
      
      setTimeout(() => {
        if (shouldPlayMessage()) {
          speakMessage(
            `Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`,
            messageKey
          );
        }
      }, 2000);
    }
  }, [location.pathname, isNewUser, userName]);

  // Dashboard behavior
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard') && userName) {
      const hasSeenWelcome = localStorage.getItem('sawWelcomeMessage') === 'true';
      
      if (isNewUser && !hasSeenWelcome) {
        const messageKey = 'dashboard-first-time';
        setTimeout(() => {
          if (shouldPlayMessage()) {
            speakMessage(
              `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`,
              messageKey
            );
            localStorage.setItem('sawWelcomeMessage', 'true');
          }
        }, 2000);
      } else if (!isNewUser) {
        const messageKey = 'dashboard-returning';
        setTimeout(() => {
          if (shouldPlayMessage()) {
            const message = lastActivity 
              ? `Welcome back, ${userName}! Last time, you worked on ${lastActivity}. Let's pick up where you left off.`
              : `Welcome back, ${userName}! Ready to continue your learning journey?`;
            
            speakMessage(message, messageKey);
          }
        }, 2000);
      }
    }
  }, [location.pathname, userName, isNewUser, lastActivity]);

  // Reset context when changing routes
  useEffect(() => {
    if (location.pathname !== currentContext) {
      setCurrentContext(location.pathname);
      
      // Cancel any ongoing speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      
      // Reset greeting for home page
      if (location.pathname === '/') {
        setHasGreeted(false);
      }
    }
  }, [location.pathname, currentContext]);

  // Voice command processing
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('free trial')) {
      speakMessage(`Starting your free trial, ${userName || 'there'}!`, 'command-trial');
      navigate('/signup?trial=true');
    } else if (lowerCommand.includes('explain prepzr')) {
      speakMessage("PREPZR is the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. Unlike traditional coaching centers, we understand your mindset, not just the exam content.", 'command-explain');
    }
  };

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
