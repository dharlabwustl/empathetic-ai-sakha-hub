
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrepzrVoiceAssistant } from '@/hooks/usePrepzrVoiceAssistant';

interface EnhancedHomePageAssistantProps {
  language?: string;
}

const EnhancedHomePageAssistant: React.FC<EnhancedHomePageAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const location = useLocation();
  
  // Use the enhanced voice assistant for homepage
  const { isSpeaking, isUserActive } = usePrepzrVoiceAssistant({
    isLoggedIn: false,
    isFirstTimeUser: false
  });
  
  useEffect(() => {
    console.log('🔊 Homepage Voice Assistant: Initialized on', location.pathname);
    
    return () => {
      // Cleanup handled by the hook
      console.log('🔇 Homepage Voice Assistant: Cleanup');
    };
  }, [location.pathname]);

  // This component only handles voice logic - no visual rendering
  return null;
};

export default EnhancedHomePageAssistant;
