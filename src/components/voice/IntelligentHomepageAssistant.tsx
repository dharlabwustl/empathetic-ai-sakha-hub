
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntelligentVoiceAssistant } from '@/hooks/useIntelligentVoiceAssistant';

interface IntelligentHomepageAssistantProps {
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const IntelligentHomepageAssistant: React.FC<IntelligentHomepageAssistantProps> = ({ 
  language = 'en-US',
  onSpeakingChange
}) => {
  const location = useLocation();
  const shouldPlayWelcome = location.pathname === '/';
  
  const { playInitialGreeting } = useIntelligentVoiceAssistant({
    language,
    onSpeakingChange,
    inactivityTimeout: 20000 // 20 seconds for homepage
  });

  // Play welcome message for homepage visitors
  useEffect(() => {
    if (shouldPlayWelcome) {
      const hasPlayedWelcome = sessionStorage.getItem('homepage_welcome_played');
      if (!hasPlayedWelcome) {
        const welcomeMessage = "Welcome to PREPZR! Discover the world's first emotionally aware exam preparation platform. Ready to transform your learning experience?";
        setTimeout(() => {
          playInitialGreeting(welcomeMessage);
          sessionStorage.setItem('homepage_welcome_played', 'true');
        }, 3000);
      }
    }
  }, [shouldPlayWelcome, playInitialGreeting]);

  return null; // This component only handles voice logic
};

export default IntelligentHomepageAssistant;
