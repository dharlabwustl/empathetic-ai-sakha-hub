
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
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
  const [hasSpokenDashboard, setHasSpokenDashboard] = useState(false);
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
      
      // Stop any current speech immediately when user is active
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

  // Stop speech on page change or logout immediately
  useEffect(() => {
    // Cancel any ongoing speech when route changes
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Clear any pending timeouts
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    // Reset context for new page
    setCurrentContext(location.pathname);
    setIsUserActive(false); // Reset activity state on navigation
    
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
    
    // Never speak on signup, login, logout pages
    const forbiddenPages = ['/signup', '/login', '/logout', '/auth'];
    const isForbiddenPage = forbiddenPages.some(page => location.pathname.includes(page));
    
    return (
      isOnAllowedPage &&
      !isForbiddenPage &&
      !isUserActive &&
      (now - lastMessageTime) >= MESSAGE_COOLDOWN
    );
  };

  const speakMessage = async (message: string, messageKey: string) => {
    if (!shouldPlayMessage() || messagesSent.has(messageKey)) {
      return;
    }

    // Personalize message with student name immediately
    const personalizedMessage = userName ? message.replace('[StudentName]', userName) : message.replace('[StudentName]', 'there');
    
    try {
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(personalizedMessage);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.volume = 0.7;
        
        // Use female voice
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('Samantha') ||
          voice.name.includes('Karen') ||
          voice.gender === 'female'
        );
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        speechSynthesis.speak(utterance);
        
        setLastMessageTime(Date.now());
        setMessagesSent(prev => new Set(prev).add(messageKey));
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  // Home page behavior (before signup/login)
  useEffect(() => {
    if (location.pathname === '/' && !hasGreeted && userName) {
      const messageKey = 'home-intro';
      
      setTimeout(() => {
        if (shouldPlayMessage()) {
          speakMessage(
            `Hi ${userName}! I'm PREPZR AI, your personal exam prep guide. PREPZR isn't just another study app – it's your smart companion, built to help you crack your exams with confidence, structure, and speed.`,
            messageKey
          );
          setHasGreeted(true);
          
          // Smart suggestions with 60s delay
          messageTimeoutRef.current = setTimeout(() => {
            if (shouldPlayMessage()) {
              speakMessage(
                "Want to try PREPZR free before signing up? Just say 'Free trial'.",
                'suggestion-1'
              );
            }
          }, MESSAGE_COOLDOWN);
        }
      }, 1500);
    }
  }, [location.pathname, userName, hasGreeted]);

  // Welcome screen behavior (after signup only, once)
  useEffect(() => {
    if (location.pathname === '/welcome' && isNewUser && userName && !hasSpokenWelcome) {
      const messageKey = 'welcome-congratulation';
      
      setTimeout(() => {
        if (shouldPlayMessage()) {
          speakMessage(
            `Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`,
            messageKey
          );
          setHasSpokenWelcome(true);
          localStorage.setItem('hasSpokenWelcome', 'true');
        }
      }, 1500);
    }
  }, [location.pathname, isNewUser, userName, hasSpokenWelcome]);

  // Dashboard behavior - first time vs returning user
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard') && userName && !hasSpokenDashboard) {
      // Check if this is truly the first time on dashboard
      const hasSeenDashboard = localStorage.getItem('hasSeenDashboard') === 'true';
      
      if (isNewUser && !hasSeenDashboard) {
        // First-time dashboard message
        const messageKey = 'dashboard-first-time';
        setTimeout(() => {
          if (shouldPlayMessage()) {
            speakMessage(
              `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`,
              messageKey
            );
            setHasSpokenDashboard(true);
            localStorage.setItem('hasSeenDashboard', 'true');
          }
        }, 1500);
      } else if (!isNewUser && hasSeenDashboard) {
        // Returning user message
        const messageKey = 'dashboard-returning';
        setTimeout(() => {
          if (shouldPlayMessage()) {
            const message = lastActivity 
              ? `Welcome back, ${userName}! Last time, you worked on ${lastActivity}. Let's pick up where you left off.`
              : `Welcome back, ${userName}! Ready to continue your learning journey?`;
            
            speakMessage(message, messageKey);
            setHasSpokenDashboard(true);
          }
        }, 1500);
      }
    }
  }, [location.pathname, userName, isNewUser, lastActivity, hasSpokenDashboard]);

  // Reset context when changing routes - but preserve session memory
  useEffect(() => {
    if (location.pathname !== currentContext) {
      setHasGreeted(false);
      setHasSpokenDashboard(false);
      setCurrentContext(location.pathname);
      
      // Don't clear messagesSent - preserve session memory to avoid repetition
      
      // Cancel any ongoing speech immediately
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    }
  }, [location.pathname, currentContext]);

  // Voice command processing
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('free trial')) {
      speakMessage("Starting your free trial!", 'command-trial');
      navigate('/signup?trial=true');
    } else if (lowerCommand.includes('explain prepzr')) {
      speakMessage("PREPZR is the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. Unlike traditional coaching centers, we understand your mindset, not just the exam content.", 'command-explain');
    }
  };

  // Initialize saved states
  useEffect(() => {
    const savedWelcome = localStorage.getItem('hasSpokenWelcome') === 'true';
    setHasSpokenWelcome(savedWelcome);
  }, []);

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
