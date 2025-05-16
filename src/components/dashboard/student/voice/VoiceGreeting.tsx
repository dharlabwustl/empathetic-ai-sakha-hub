
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
          const firstTimeGreeting = `Welcome to PREPZR, ${userName}! I'm your AI voice assistant with an Indian accent. I'll help you navigate through your study journey. You can see your personalized dashboard with study recommendations tailored to your exam goals. Feel free to explore the different sections - your academic advisor, practice tests, concept cards, and analytics. If you need any assistance, just click the voice assistant icon at the bottom right.`;
          speakMessage(firstTimeGreeting);
        } else {
          // For returning users, check time of day for appropriate greeting
          const hour = new Date().getHours();
          let timeGreeting = '';
          
          if (hour < 12) timeGreeting = 'Good morning';
          else if (hour < 18) timeGreeting = 'Good afternoon';
          else timeGreeting = 'Good evening';
          
          const returningGreeting = `${timeGreeting}, ${userName}. Welcome back to PREPZR. Your study dashboard is ready. I see you've made progress since your last visit. Click on any section to explore or ask me for assistance.`;
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
