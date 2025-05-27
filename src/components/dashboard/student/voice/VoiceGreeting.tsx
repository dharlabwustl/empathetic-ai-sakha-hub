
import React, { useEffect, useRef } from 'react';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

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

  useEffect(() => {
    // Only speak once per mount
    if (hasSpokenRef.current) return;
    
    const speakGreeting = () => {
      if (!('speechSynthesis' in window)) return;
      
      let greeting = '';
      
      if (isReturningUser) {
        greeting = `Welcome back to PREPZR, ${userName}! I'm PREPZR AI, your learning companion. `;
        
        if (lastActivity) {
          greeting += `Last time you were ${lastActivity}. `;
        }
        
        if (pendingTasks.length > 0) {
          greeting += `You have ${pendingTasks.length} pending activities waiting for you. `;
        }
        
        greeting += `I'm here to help you with your study plan, daily activities, and any questions you have. Let's make today productive!`;
      } else if (isFirstTimeUser) {
        greeting = `Welcome to PREPZR, ${userName}! I'm PREPZR AI, your AI-powered learning companion. I'm excited to help you on your journey to exam success. Let's explore what PREPZR has to offer and create your personalized study plan.`;
      } else {
        greeting = `Hello ${userName}! I'm PREPZR AI, ready to assist you with your studies today. How can I help you achieve your learning goals?`;
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
      // Small delay to ensure voices are loaded
      setTimeout(speakGreeting, 1000);
    }
    
    return () => {
      // Clean up speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isFirstTimeUser, userName, isReturningUser, lastActivity, pendingTasks, language]);

  // This component doesn't render anything visible
  return null;
};

export default VoiceGreeting;
