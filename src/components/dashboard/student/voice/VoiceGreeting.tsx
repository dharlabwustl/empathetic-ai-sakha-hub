
import React, { useEffect, useState } from 'react';
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
  const [greetingPlayed, setGreetingPlayed] = useState(false);

  useEffect(() => {
    // Only welcome the user if voice is supported, enabled, and not muted
    if (isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted && !greetingPlayed) {
      // Delay the greeting to ensure page has loaded
      const timer = setTimeout(() => {
        // Different messages for first time vs returning users
        if (isFirstTimeUser) {
          const firstTimeGreeting = `Welcome to PREPZR, ${userName}! I'm your AI voice assistant with an Indian accent. I'll help you navigate through your NEET exam preparation journey. Your dashboard is designed to track your progress and optimize your study plan. You can explore different sections like Concept Cards for in-depth learning, Flashcards for quick review, and Practice Exams to test your knowledge. If you need any assistance, just click on the voice assistant icon at the bottom right corner. Let me know if you'd like a guided tour of the platform.`;
          speakMessage(firstTimeGreeting);
          setGreetingPlayed(true);
        } else {
          // For returning users, check time of day for appropriate greeting
          const hour = new Date().getHours();
          let timeGreeting = '';
          
          if (hour < 12) timeGreeting = 'Good morning';
          else if (hour < 18) timeGreeting = 'Good afternoon';
          else timeGreeting = 'Good evening';
          
          const returningGreeting = `${timeGreeting}, ${userName}. Welcome back to PREPZR. Your study dashboard is ready with the latest updates. You've made progress since your last visit. I recommend checking your analytics section to see your performance trends. Click on any section to explore or ask me for assistance with your NEET preparation.`;
          speakMessage(returningGreeting);
          setGreetingPlayed(true);
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName, speakMessage, isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, greetingPlayed]);

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default VoiceGreeting;
