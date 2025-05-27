
import React, { useEffect, useRef } from 'react';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  isReturningUser = false,
  lastActivity,
  pendingTasks = []
}) => {
  const hasSpokenRef = useRef(false);
  const lastSpokenTimeRef = useRef<number>(0);

  useEffect(() => {
    // Prevent multiple announcements within a short time period
    const now = Date.now();
    const timeSinceLastSpoken = now - lastSpokenTimeRef.current;
    const MIN_INTERVAL = 30000; // 30 seconds minimum between announcements

    // Only speak once per mount and respect time interval
    if (hasSpokenRef.current || timeSinceLastSpoken < MIN_INTERVAL) {
      console.log('🔇 Voice Greeting: Skipping announcement - already spoken or too soon');
      return;
    }
    
    const speakGreeting = () => {
      if (!('speechSynthesis' in window)) return;
      
      let greeting = '';
      
      // Check if user is truly returning (not first time after signup)
      const isNewUserSignup = localStorage.getItem('new_user_signup') === 'true';
      const actuallyReturning = isReturningUser && !isNewUserSignup;
      
      if (actuallyReturning) {
        greeting = `Welcome back to PREPZR, ${userName}! I'm your PREPZR AI assistant, ready to help you continue your studies today.`;
        
        if (lastActivity) {
          greeting += ` Last time you were ${lastActivity}. `;
        }
        
        if (pendingTasks.length > 0) {
          greeting += `You have ${pendingTasks.length} pending activities waiting for you. `;
        }
        
        greeting += `Let's make today productive!`;
      } else if (isFirstTimeUser || isNewUserSignup) {
        greeting = `Congratulations ${userName}! Welcome to PREPZR! I'm your PREPZR AI assistant, and I'm excited to guide you on your exam preparation journey. PREPZR will be with you at every step, helping you become exam-ready with personalized study plans, adaptive learning, and continuous support. Let's start this amazing journey together and achieve your goals!`;
      } else {
        greeting = `Hello ${userName}! I'm your PREPZR AI assistant, ready to help you achieve your learning goals today.`;
      }
      
      // Use the centralized female voice function
      speakWithFemaleVoice(
        greeting,
        {
          rate: 0.95,
          pitch: 1.1,
          volume: 0.8
        },
        () => {
          hasSpokenRef.current = true;
          lastSpokenTimeRef.current = Date.now();
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
    };

    // Load voices if not already loaded
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speakGreeting, { once: true });
    } else {
      // Small delay to ensure voices are loaded and prevent conflicts
      setTimeout(speakGreeting, 1500);
    }
    
    return () => {
      // Clean up speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isFirstTimeUser, userName, isReturningUser, lastActivity, pendingTasks]);

  // This component doesn't render anything visible
  return null;
};

export default VoiceGreeting;
