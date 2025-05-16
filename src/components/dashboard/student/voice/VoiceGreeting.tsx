
import React, { useEffect } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ isFirstTimeUser, userName, language = 'en-IN' }) => {
  const { speakMessage, voiceSettings, isVoiceSupported } = useVoiceAnnouncer({
    userName,
    initialSettings: { language }
  });

  useEffect(() => {
    // Only welcome the user if voice is supported, enabled, and not muted
    if (isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted) {
      // Delay the greeting to ensure page has loaded
      const timer = setTimeout(() => {
        // Different messages for first time vs returning users
        if (isFirstTimeUser) {
          const firstTimeGreeting = `Namaste ${userName}! Welcome to PREPZR! I'm your AI voice assistant designed to help you excel in your exams. I'll guide you through our platform's features including concept cards, flashcards, and practice tests. Feel free to ask me any questions about your study journey.`;
          speakMessage(firstTimeGreeting);
        } else {
          // For returning users, check time of day for appropriate greeting
          const hour = new Date().getHours();
          let timeGreeting = '';
          
          if (hour < 12) timeGreeting = 'Good morning';
          else if (hour < 18) timeGreeting = 'Good afternoon';
          else timeGreeting = 'Good evening';
          
          const returningGreeting = `${timeGreeting}, ${userName}. Welcome back to PREPZR. Your personalized study dashboard is ready. Would you like to continue where you left off?`;
          speakMessage(returningGreeting);
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName, speakMessage, isVoiceSupported, voiceSettings.enabled, voiceSettings.muted]);

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default VoiceGreeting;
