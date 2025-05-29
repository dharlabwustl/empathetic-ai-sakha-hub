
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { speakWithFemaleVoice, createIntelligentPause } from '@/utils/voiceConfig';

interface DashboardVoiceAssistantProps {
  userName?: string;
  language?: string;
  userMood?: string;
  userProgress?: any;
  studyStreak?: number;
  lastActivity?: string;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({ 
  userName = 'Student',
  language = 'en-US',
  userMood,
  userProgress,
  studyStreak,
  lastActivity
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [userActivityDetected, setUserActivityDetected] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activityTimeoutRef = useRef<NodeJS.Timeout>();
  const messageTimeoutRef = useRef<NodeJS.Timeout>();
  const sessionStartRef = useRef(Date.now());

  // Check if user is logged in and on dashboard
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isOnDashboard = location.pathname.includes('/dashboard/student');
  const shouldBeActive = isUserLoggedIn && isOnDashboard;

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

  // Session and context management
  useEffect(() => {
    // Reset state when login status or page changes
    if (!shouldBeActive) {
      setHasGreeted(false);
      setIsActive(false);
      
      // Cancel any ongoing speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Clear timeouts
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      
      return;
    }

    setIsActive(true);
    
    // Reset greeting state for new sessions
    const sessionDuration = Date.now() - sessionStartRef.current;
    if (sessionDuration < 5000) { // Only greet within first 5 seconds of session
      setHasGreeted(false);
    }
  }, [shouldBeActive, location.pathname]);

  // Intelligent greeting with proper timing
  useEffect(() => {
    if (!shouldBeActive || hasGreeted || userActivityDetected) {
      return;
    }

    const now = Date.now();
    
    // Prevent too frequent messages (minimum 60 seconds between greetings)
    if (now - lastMessageTime < 60000) {
      return;
    }

    const deliverGreeting = async () => {
      try {
        let greetingMessage = '';
        
        // Context-aware greeting based on time and user state
        const hour = new Date().getHours();
        const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
        
        if (userProgress && userProgress.overallProgress) {
          greetingMessage = `${timeGreeting}, ${userName}! You're making great progress at ${userProgress.overallProgress}% completion. Ready to continue your NEET preparation?`;
        } else {
          greetingMessage = `${timeGreeting}, ${userName}! Welcome to your NEET preparation dashboard. Let's make today count!`;
        }

        const success = speakWithFemaleVoice(greetingMessage, { language });
        
        if (success) {
          setHasGreeted(true);
          setLastMessageTime(now);
          
          // Schedule next message after intelligent pause only if user is still inactive
          messageTimeoutRef.current = setTimeout(() => {
            if (!userActivityDetected && shouldBeActive) {
              const motivationMessage = `I'll be here whenever you need guidance. Focus on your studies - you've got this!`;
              speakWithFemaleVoice(motivationMessage, { language });
            }
          }, 8000);
        }
      } catch (error) {
        console.error('Voice greeting error:', error);
      }
    };

    // Delay initial greeting to avoid overlap with other voice components
    const greetingTimeout = setTimeout(deliverGreeting, 2000);

    return () => {
      clearTimeout(greetingTimeout);
    };
  }, [shouldBeActive, hasGreeted, userActivityDetected, userName, userProgress, language, lastMessageTime]);

  // Cleanup on unmount or route change
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
  }, [location.pathname]);

  // This component only handles voice logic, no visual rendering
  return null;
};

export default DashboardVoiceAssistant;
