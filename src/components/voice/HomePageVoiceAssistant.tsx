
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

interface HomePageVoiceAssistantProps {
  language?: string;
  userName?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN',
  userName = ''
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const location = useLocation();
  const { speakMessage, isSpeaking } = useVoiceAnnouncer({ lang: language });
  
  // If this is the homepage, use a 4-second delay to allow for page load
  // If this is another page, use a shorter delay
  const delayTime = location.pathname === '/' ? 4000 : 2000;
  
  useEffect(() => {
    // Only play the greeting if speech synthesis is supported
    if ('speechSynthesis' in window && !greetingPlayed) {
      const timer = setTimeout(() => {
        let message = '';
        
        // Determine appropriate welcome message based on page and user status
        if (location.pathname === '/') {
          if (userName) {
            message = `Welcome back to PREPZR${userName ? ', ' + userName : ''}. Would you like to continue your NEET exam preparation journey?`;
          } else {
            message = `Welcome to PREPZR, your AI-powered exam preparation platform. I'm your voice assistant and I can guide you through our features. Would you like to try our free exam readiness test for NEET?`;
          }
        } else if (location.pathname.includes('/signup')) {
          message = `Welcome to PREPZR's free trial signup. Get access to our AI-powered exam preparation tools for 7 days. I'm here to help you get started.`;
        }
        
        if (message) {
          speakMessage(message);
          setGreetingPlayed(true);
        }
      }, delayTime);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, userName, greetingPlayed, delayTime, speakMessage]);

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default HomePageVoiceAssistant;
