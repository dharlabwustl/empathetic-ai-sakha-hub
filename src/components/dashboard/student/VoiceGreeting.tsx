
import React, { useEffect } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
}

const getGreeting = (name: string, isFirstTime: boolean): string => {
  if (isFirstTime) {
    return `Welcome to Prepzr, ${name}! I'm your AI learning assistant. I'll help you prepare for your exams efficiently. You can navigate through the dashboard using the sidebar menu. Would you like me to give you a quick tour?`;
  } else {
    const hour = new Date().getHours();
    let timeBasedGreeting = "Hello";
    
    if (hour < 12) {
      timeBasedGreeting = "Good morning";
    } else if (hour < 18) {
      timeBasedGreeting = "Good afternoon";
    } else {
      timeBasedGreeting = "Good evening";
    }
    
    return `${timeBasedGreeting}, ${name}. Welcome back to Prepzr. Let's continue your learning journey!`;
  }
};

const VoiceGreeting = ({ isFirstTimeUser, userName, language = 'en-US' }: VoiceGreetingProps) => {
  const { speakMessage, voiceSettings } = useVoiceAnnouncer({
    userName,
    initialSettings: {
      enabled: true,
      muted: false,
      language: language,
      pitch: 1.1, // Higher pitch for female voice
      rate: 0.95 // Slightly faster for more energy
    }
  });

  useEffect(() => {
    // Auto-start voice greeting after 3 seconds
    const timer = setTimeout(() => {
      const greeting = getGreeting(userName, isFirstTimeUser);
      speakMessage(greeting);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isFirstTimeUser, userName, speakMessage]);

  return null; // This component doesn't render anything visible
};

export default VoiceGreeting;
