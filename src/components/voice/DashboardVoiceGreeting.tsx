
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  speakWithFemaleVoice, 
  isUserCurrentlyActive, 
  cleanupOnNavigation 
} from '@/utils/voiceConfig';

interface DashboardVoiceGreetingProps {
  userName?: string;
  isFirstTimeUser?: boolean;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const DashboardVoiceGreeting: React.FC<DashboardVoiceGreetingProps> = ({
  userName = 'Student',
  isFirstTimeUser = false,
  language = 'en-US',
  onSpeakingChange
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const location = useLocation();
  const greetingTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Only active on dashboard
  const isOnDashboard = location.pathname.includes('/dashboard/student');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const shouldGreet = isOnDashboard && isLoggedIn;

  // Handle dashboard greeting based on user type
  useEffect(() => {
    if (!shouldGreet || hasGreeted || !userName) {
      return;
    }

    const speakDashboardGreeting = () => {
      if (isUserCurrentlyActive()) {
        console.log('🔇 Voice: User is active, not speaking dashboard greeting');
        return;
      }

      let greetingMessage = '';
      
      // Check if this is truly first time on dashboard
      const hasSeenDashboard = localStorage.getItem('hasSeenDashboard') === 'true';
      
      if (isFirstTimeUser && !hasSeenDashboard) {
        greetingMessage = `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`;
        localStorage.setItem('hasSeenDashboard', 'true');
      } else {
        // Returning user message
        const hour = new Date().getHours();
        const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
        greetingMessage = `${timeGreeting}, ${userName}! Ready to continue your exam preparation?`;
      }

      if (onSpeakingChange) onSpeakingChange(true);
      
      const success = speakWithFemaleVoice(greetingMessage, { language }, 'dashboard-greeting',
        () => {
          if (onSpeakingChange) onSpeakingChange(true);
        },
        () => {
          if (onSpeakingChange) onSpeakingChange(false);
        }
      );
      
      if (success) {
        setHasGreeted(true);
      }
    };

    // Delay greeting to avoid conflicts with other voice assistants
    greetingTimeoutRef.current = setTimeout(speakDashboardGreeting, 3000);

    return () => {
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    };
  }, [shouldGreet, hasGreeted, userName, isFirstTimeUser, language, onSpeakingChange]);

  // Reset when leaving dashboard
  useEffect(() => {
    if (!isOnDashboard) {
      setHasGreeted(false);
      cleanupOnNavigation();
      
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    }
  }, [isOnDashboard]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupOnNavigation();
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    };
  }, []);

  return null;
};

export default DashboardVoiceGreeting;
