
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  
  // Minimum 60 seconds between messages
  const MESSAGE_COOLDOWN = 60000;
  
  // Track user activity (mouse, scroll, click)
  useEffect(() => {
    const handleUserActivity = () => {
      setIsUserActive(true);
      
      // Stop any current speech
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

  const speakWithFemaleVoice = (message: string) => {
    if ('speechSynthesis' in window && shouldPlayMessage()) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(message);
      
      // Configure for confident, empathetic female voice
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      utterance.lang = language;
      
      // Try to get a female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('victoria')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      window.speechSynthesis.speak(utterance);
      return true;
    }
    return false;
  };

  const speakMessage = async (message: string, messageKey: string) => {
    if (!shouldPlayMessage() || messagesSent.has(messageKey)) {
      return;
    }

    const personalizedMessage = userName ? message.replace('[StudentName]', userName) : message;
    
    const success = speakWithFemaleVoice(personalizedMessage);
    if (success) {
      setLastMessageTime(Date.now());
      setMessagesSent(prev => new Set(prev).add(messageKey));
    }
  };

  // Home page behavior
  useEffect(() => {
    if (location.pathname === '/' && !hasGreeted) {
      const messageKey = 'home-intro';
      
      setTimeout(() => {
        if (userName) {
          speakMessage(
            `Hi ${userName}! I'm PREPZR AI, your personal exam prep guide. PREPZR isn't just another study app – it's your smart companion, built to help you crack your exams with confidence, structure, and speed.`,
            messageKey
          );
        } else {
          speakMessage(
            `Hi there! I'm PREPZR AI, your personal exam prep guide. PREPZR isn't just another study app – it's your smart companion, built to help you crack your exams with confidence, structure, and speed.`,
            messageKey
          );
        }
        setHasGreeted(true);
      }, 1500);
    }
  }, [location.pathname, userName, hasGreeted]);

  // Welcome screen behavior (after signup)
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

  // Dashboard behavior
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard') && userName) {
      if (isNewUser) {
        const messageKey = 'dashboard-first-time';
        setTimeout(() => {
          speakMessage(
            `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`,
            messageKey
          );
        }, 1500);
      } else {
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

  // Reset context when changing routes
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

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
