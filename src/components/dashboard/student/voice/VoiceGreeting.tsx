
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
          const firstTimeGreeting = `Welcome to PREPZR, ${userName}! I'm your AI voice assistant with an Indian accent. I'll help you navigate through your study journey. Your dashboard is designed to track your progress and optimize your NEET preparation. You can explore different sections like Concept Cards, Flashcards, and Practice Exams. If you need any assistance, just click on the voice assistant icon at the bottom right corner.`;
          speakMessage(firstTimeGreeting);
        } else {
          // For returning users, check time of day for appropriate greeting
          const hour = new Date().getHours();
          let timeGreeting = '';
          
          if (hour < 12) timeGreeting = 'Good morning';
          else if (hour < 18) timeGreeting = 'Good afternoon';
          else timeGreeting = 'Good evening';
          
          const returningGreeting = `${timeGreeting}, ${userName}. Welcome back to PREPZR. Your study dashboard is ready. You've made progress since your last visit. Click on any section to explore or ask me for assistance with your NEET preparation.`;
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
