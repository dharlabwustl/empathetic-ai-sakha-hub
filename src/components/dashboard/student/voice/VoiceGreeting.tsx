
import React, { useEffect, useState } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useLocation } from 'react-router-dom';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName, 
  language = 'en-IN' 
}) => {
  const { speakMessage, voiceSettings, isVoiceSupported } = useVoiceAnnouncer({
    userName,
    initialSettings: { language }
  });
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only welcome the user if voice is supported, enabled, and not muted
    if (isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted && !greetingPlayed) {
      // Delay the greeting to ensure page has loaded
      const timer = setTimeout(() => {
        let message = '';
        
        // Different messages based on the current page and user status
        if (location.pathname.includes('welcome-flow')) {
          if (isFirstTimeUser) {
            message = `Welcome to PREPZR, ${userName}! I'm your AI voice assistant. I'll guide you through our platform setup and help you get started with your NEET exam preparation journey. Please follow the on-screen instructions to complete your onboarding.`;
          } else {
            message = `Welcome back to PREPZR, ${userName}. Let me guide you through your learning journey today.`;
          }
        } else if (location.pathname.includes('dashboard')) {
          if (isFirstTimeUser) {
            message = `Welcome to your personalized dashboard, ${userName}! Here you'll find your study plans, practice tests, and personalized recommendations. Take a moment to explore the different sections and let me know if you need any assistance.`;
          } else {
            const hour = new Date().getHours();
            let timeGreeting = '';
            
            if (hour < 12) timeGreeting = 'Good morning';
            else if (hour < 18) timeGreeting = 'Good afternoon';
            else timeGreeting = 'Good evening';
            
            message = `${timeGreeting}, ${userName}. Welcome back to your PREPZR dashboard. Your study materials are ready for you. Let me know if you need any help navigating the platform.`;
          }
        } else if (location.pathname === '/') {
          message = `Welcome to PREPZR, your AI-powered study companion for NEET preparation. I'm your voice assistant and will help you navigate through the platform. Feel free to explore our features and services.`;
        } else {
          // Generic greeting for other pages
          message = `Welcome to PREPZR, ${userName}. I'm here to assist you with your NEET exam preparation. Let me know how I can help.`;
        }
        
        speakMessage(message);
        setGreetingPlayed(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName, speakMessage, isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, greetingPlayed, location.pathname]);

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default VoiceGreeting;
