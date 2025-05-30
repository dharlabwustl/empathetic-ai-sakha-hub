
import React, { useEffect, useRef } from 'react';
import { speakWithFemaleVoice, createUserActivityDetector, createNavigationCleanup } from '@/utils/voiceConfig';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  isReturningUser = false,
  lastActivity,
  pendingTasks = [],
  language = 'en-US'
}) => {
  const hasSpokenRef = useRef(false);
  const userActiveRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (hasSpokenRef.current || userName === 'there') return;
    
    // User activity detection - pauses voice immediately on interaction
    const handleActivity = () => {
      userActiveRef.current = true;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
    
    const removeActivityDetector = createUserActivityDetector(handleActivity);
    const removeNavigationCleanup = createNavigationCleanup();
    
    cleanupRef.current = () => {
      removeActivityDetector();
      removeNavigationCleanup();
    };
    
    const speakGreeting = () => {
      if (userActiveRef.current || hasSpokenRef.current) return;
      
      let greeting = '';
      
      // Check if actually returning user (not first-time after signup)
      const isNewUserSignup = localStorage.getItem('new_user_signup') === 'true';
      const actuallyReturning = isReturningUser && !isNewUserSignup;
      
      if (actuallyReturning) {
        greeting = `Welcome back, ${userName}! `;
        
        if (lastActivity) {
          greeting += `Last time, you worked on ${lastActivity}. `;
        }
        
        if (pendingTasks.length > 0) {
          greeting += `You have ${pendingTasks.length} pending activities waiting for you. `;
        }
        
        greeting += `Let's pick up where you left off.`;
      } else if (isFirstTimeUser || isNewUserSignup) {
        greeting = `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`;
      } else {
        greeting = `Hello ${userName}! Ready to continue your learning journey today.`;
      }
      
      const success = speakWithFemaleVoice(
        greeting,
        { 
          rate: 0.95,
          pitch: 1.1,
          volume: 0.8,
          language
        },
        () => {
          hasSpokenRef.current = true;
          console.log('🔊 Voice Greeting: Started speaking');
        },
        () => {
          console.log('🔇 Voice Greeting: Finished speaking');
          // Clear the new user signup flag after first greeting
          if (isNewUserSignup) {
            localStorage.removeItem('new_user_signup');
          }
        }
      );
      
      if (success) {
        hasSpokenRef.current = true;
      }
    };

    // Load voices if not already loaded
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speakGreeting, { once: true });
    } else {
      // Small delay to ensure page is ready
      setTimeout(speakGreeting, 2000);
    }
    
    return cleanupRef.current;
  }, [isFirstTimeUser, userName, isReturningUser, lastActivity, pendingTasks, language]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return null;
};

export default VoiceGreeting;
