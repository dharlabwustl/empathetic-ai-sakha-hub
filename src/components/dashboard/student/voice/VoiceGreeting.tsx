
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  speakWithFemaleVoice, 
  isUserCurrentlyActive, 
  cleanupOnNavigation 
} from '@/utils/voiceConfig';

interface VoiceGreetingProps {
  isFirstTimeUser?: boolean;
  userName?: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({
  isFirstTimeUser = false,
  userName = 'Student',
  language = 'en-US'
}) => {
  const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
  const location = useLocation();
  const greetingTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Only active on welcome screen after signup
  const isWelcomeScreen = location.pathname.includes('/welcome') || 
                         location.pathname.includes('/post-login-welcome');
  const shouldSpeak = isWelcomeScreen && isFirstTimeUser;

  // Handle welcome message for first-time users only
  useEffect(() => {
    if (!shouldSpeak || hasSpokenWelcome) {
      return;
    }

    const speakWelcomeMessage = () => {
      if (isUserCurrentlyActive()) {
        console.log('🔇 Voice: User is active, not speaking welcome');
        return;
      }

      const welcomeMessage = `Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`;
      
      const success = speakWithFemaleVoice(welcomeMessage, { language }, 'welcome-greeting');
      
      if (success) {
        setHasSpokenWelcome(true);
        // Mark that user has heard welcome message to prevent repetition
        localStorage.setItem('hasHeardWelcomeMessage', 'true');
      }
    };

    // Check if user has already heard welcome message
    const hasHeardWelcome = localStorage.getItem('hasHeardWelcomeMessage') === 'true';
    if (hasHeardWelcome) {
      setHasSpokenWelcome(true);
      return;
    }

    // Delay welcome message slightly
    greetingTimeoutRef.current = setTimeout(speakWelcomeMessage, 2000);

    return () => {
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    };
  }, [shouldSpeak, hasSpokenWelcome, userName, language]);

  // Reset when leaving welcome screen
  useEffect(() => {
    if (!isWelcomeScreen) {
      cleanupOnNavigation();
      
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    }
  }, [isWelcomeScreen]);

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

export default VoiceGreeting;
