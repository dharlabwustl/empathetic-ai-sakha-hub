
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

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
  const [hasGreeted, setHasGreeted] = useState(false);
  const [userActivityDetected, setUserActivityDetected] = useState(false);
  const location = useLocation();
  const activityTimeoutRef = useRef<NodeJS.Timeout>();
  const greetingTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Only be active on welcome/onboarding screens
  const shouldGreet = location.pathname.includes('/welcome') || 
                     location.pathname.includes('/post-login-welcome') ||
                     location.pathname.includes('/onboarding');

  // Activity detection
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
    
    if (shouldGreet) {
      events.forEach(event => {
        document.addEventListener(event, handleUserActivity, { passive: true });
      });
    }

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, [shouldGreet]);

  // Handle greeting logic
  useEffect(() => {
    if (!shouldGreet || hasGreeted || userActivityDetected) {
      return;
    }

    const deliverGreeting = () => {
      let greetingMessage = '';
      
      if (isFirstTimeUser) {
        greetingMessage = `Congratulations ${userName}! Welcome to PREPZR. You've taken the first step towards exam success. Let's begin your transformation journey!`;
      } else {
        greetingMessage = `Welcome back to PREPZR, ${userName}! Ready to continue your learning journey?`;
      }

      const success = speakWithFemaleVoice(greetingMessage, { language });
      
      if (success) {
        setHasGreeted(true);
      }
    };

    // Delay greeting to avoid conflicts
    greetingTimeoutRef.current = setTimeout(deliverGreeting, 2000);

    return () => {
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    };
  }, [shouldGreet, hasGreeted, userActivityDetected, isFirstTimeUser, userName, language]);

  // Reset when route changes
  useEffect(() => {
    setHasGreeted(false);
    setUserActivityDetected(false);
    
    // Cancel speech when leaving
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, []);

  return null;
};

export default VoiceGreeting;
