
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmartVoiceAssistant } from '@/hooks/useSmartVoiceAssistant';

interface HomepageVoiceAssistantProps {
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const HomepageVoiceAssistant: React.FC<HomepageVoiceAssistantProps> = ({ 
  onSpeakingChange 
}) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  
  const { isSpeaking, speak, processCommand, trackActivity } = useSmartVoiceAssistant({
    context: 'homepage',
    inactivityTimeout: 45000, // 45 seconds for homepage
    enableInactivityPrompts: true
  });
  
  // Notify parent component of speaking state changes
  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange]);
  
  // Handle voice commands for homepage
  useEffect(() => {
    const handleVoiceCommand = (event: CustomEvent) => {
      const command = event.detail.command;
      if (command && isHomepage) {
        const handled = processCommand(command);
        if (!handled) {
          // Default response for unrecognized commands
          speak("I can help you learn about Prep-Zer's features, free trial, exam readiness test, or scholarship opportunities. What would you like to know?");
        }
      }
    };
    
    window.addEventListener('voice-command', handleVoiceCommand as EventListener);
    
    return () => {
      window.removeEventListener('voice-command', handleVoiceCommand as EventListener);
    };
  }, [isHomepage, processCommand, speak]);
  
  // Don't render anything if not on homepage
  if (!isHomepage) {
    return null;
  }
  
  return null; // This component only handles voice logic
};

export default HomepageVoiceAssistant;
