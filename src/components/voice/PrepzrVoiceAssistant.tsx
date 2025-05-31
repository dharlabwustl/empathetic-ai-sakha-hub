
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

  const speakMessage = async (message: string, messageKey: string) => {
    if (!shouldPlayMessage() || messagesSent.has(messageKey)) {
      return;
    }

    const personalizedMessage = userName ? message.replace('[StudentName]', userName) : message;
    
    const success = speakWithFemaleVoice(personalizedMessage, { language });
    if (success) {
      setLastMessageTime(Date.now());
      setMessagesSent(prev => new Set(prev).add(messageKey));
      
      // Schedule next message after cooldown
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    }
  };

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
