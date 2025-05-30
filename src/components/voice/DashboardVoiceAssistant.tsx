
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  speakWithFemaleVoice, 
  isUserCurrentlyActive, 
  cleanupOnNavigation 
} from '@/utils/voiceConfig';

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
  lastActivity
}) => {
  const [hasSpokenGreeting, setHasSpokenGreeting] = useState(false);
  const location = useLocation();
  const messageTimeoutRef = useRef<NodeJS.Timeout>();
  const sessionStartRef = useRef(Date.now());

  // Check if user is logged in and on dashboard
  const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isOnDashboard = location.pathname.includes('/dashboard/student');
  const shouldBeActive = isUserLoggedIn && isOnDashboard;

  // Check if this is first time user or returning user
  const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
  const hasSeenDashboardWelcome = localStorage.getItem('hasSeenDashboardWelcome') === 'true';

  // Handle dashboard greeting
  useEffect(() => {
    if (!shouldBeActive || hasSpokenGreeting) {
      return;
    }

    // Only speak if within first few seconds of session
    const sessionDuration = Date.now() - sessionStartRef.current;
    if (sessionDuration > 5000) {
      return;
    }

    const speakDashboardGreeting = () => {
      if (isUserCurrentlyActive()) {
        console.log('🔇 Voice: User is active, not speaking dashboard greeting');
        return;
      }

      let greetingMessage = '';
      
      // First-time user message
      if (isFirstTimeUser && !hasSeenDashboardWelcome) {
        greetingMessage = `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`;
        localStorage.setItem('hasSeenDashboardWelcome', 'true');
      } 
      // Returning user message
      else {
        if (lastActivity) {
          greetingMessage = `Welcome back, ${userName}! Last time, you worked on ${lastActivity}. Let's pick up where you left off.`;
        } else {
          greetingMessage = `Welcome back, ${userName}! Ready to continue your exam preparation?`;
        }
      }

      const success = speakWithFemaleVoice(greetingMessage, { language }, 'dashboard-greeting');
      
      if (success) {
        setHasSpokenGreeting(true);
        
        // No additional messages - single message only as per requirements
      }
    };

    // Delay greeting to avoid conflicts
    const greetingTimeout = setTimeout(speakDashboardGreeting, 2000);

    return () => {
      clearTimeout(greetingTimeout);
    };
  }, [shouldBeActive, hasSpokenGreeting, userName, language, lastActivity, isFirstTimeUser, hasSeenDashboardWelcome]);

  // Reset state when navigating away from dashboard
  useEffect(() => {
    if (!shouldBeActive) {
      setHasSpokenGreeting(false);
      cleanupOnNavigation();
      
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    }
  }, [shouldBeActive]);

  // Cleanup on route change
  useEffect(() => {
    return () => {
      cleanupOnNavigation();
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  return null; // This component only handles voice logic
};

export default DashboardVoiceAssistant;
