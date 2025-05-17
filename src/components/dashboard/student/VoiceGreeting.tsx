
import React, { useEffect, useRef } from 'react';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({
  isFirstTimeUser,
  userName,
  language = 'en'
}) => {
  const greetingPlayed = useRef<boolean>(false);
  
  const { speakMessage, voiceSettings, voiceInitialized } = useVoiceAnnouncer({
    userName,
    language
  });
  
  useEffect(() => {
    // Only play the greeting once and only for first-time users or when explicitly requested
    if (isFirstTimeUser && !greetingPlayed.current && voiceInitialized && voiceSettings.enabled) {
      // Small delay to ensure voice is ready and let the UI load first
      const timer = setTimeout(() => {
        // Personalized greeting message
        const message = getGreetingMessage(userName);
        speakMessage(message);
        greetingPlayed.current = true;
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, voiceInitialized, voiceSettings.enabled, userName]);
  
  const getGreetingMessage = (name: string): string => {
    const cleanName = name.split(' ')[0]; // Get first name only
    const hour = new Date().getHours();
    
    let timeGreeting = '';
    if (hour < 12) {
      timeGreeting = 'Good morning';
    } else if (hour < 18) {
      timeGreeting = 'Good afternoon';
    } else {
      timeGreeting = 'Good evening';
    }
    
    if (isFirstTimeUser) {
      return `${timeGreeting}, ${cleanName}! Welcome to your Prepzr dashboard. I'm your AI study companion. I'll help guide you through your exam preparation journey. You can click the voice assistant icon in the bottom right corner anytime you need help. Let's begin by setting up your personalized study plan!`;
    } else {
      return `${timeGreeting}, ${cleanName}! Welcome back to Prepzr. Your study plan is ready, and I've prepared some new material based on your progress.`;
    }
  };
  
  // This is a non-visual component
  return null;
};

export default VoiceGreeting;
