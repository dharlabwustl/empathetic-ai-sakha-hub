
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntelligentVoiceAssistant } from '@/hooks/useIntelligentVoiceAssistant';

interface EnhancedHomepageAssistantProps {
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const EnhancedHomepageAssistant: React.FC<EnhancedHomepageAssistantProps> = ({ 
  language = 'en-US',
  onSpeakingChange
}) => {
  const location = useLocation();
  const shouldPlayWelcome = location.pathname === '/';
  
  const { isSpeaking, playInitialGreeting, trackActivity } = useIntelligentVoiceAssistant({
    language,
    onSpeakingChange,
    inactivityTimeout: 15000 // 15 seconds for homepage
  });

  // Play welcome message for homepage visitors
  useEffect(() => {
    if (shouldPlayWelcome) {
      const welcomeMessage = "Welcome to PREPZR! I'm your AI companion, here to guide you through the world's first emotionally aware exam preparation platform. How can I help you today?";
      playInitialGreeting(welcomeMessage);
    }
  }, [shouldPlayWelcome, playInitialGreeting]);

  return null; // This component only handles voice logic
};

export default EnhancedHomepageAssistant;
