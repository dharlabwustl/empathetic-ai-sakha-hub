
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
      
      if (isReturningUser) {
        greeting = `Welcome back to PREPZR, ${userName}! I'm your PREPZR AI assistant, ready to help you with your studies today.`;
        
        if (lastActivity) {
          greeting += ` Last time you were ${lastActivity}. `;
        }
        
        if (pendingTasks.length > 0) {
          greeting += `You have ${pendingTasks.length} pending activities waiting for you. `;
        }
        
        greeting += `Let's make today productive!`;
      } else if (isFirstTimeUser) {
        greeting = `Welcome to PREPZR, ${userName}! I'm your PREPZR AI assistant, excited to help you on your journey to exam success. Let's explore what PREPZR has to offer and create your personalized study plan.`;
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
