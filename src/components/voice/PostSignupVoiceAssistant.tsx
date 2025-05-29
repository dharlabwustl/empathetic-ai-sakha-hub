
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmartVoiceAssistant } from '@/hooks/useSmartVoiceAssistant';

interface PostSignupVoiceAssistantProps {
  userName?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const PostSignupVoiceAssistant: React.FC<PostSignupVoiceAssistantProps> = ({ 
  userName,
  onSpeakingChange 
}) => {
  const location = useLocation();
  const isPostSignup = location.pathname.includes('/welcome') || 
                      location.pathname.includes('/post-login-welcome') ||
                      location.pathname.includes('/onboarding');
  
  const { isSpeaking, speak, processCommand } = useSmartVoiceAssistant({
    context: 'post-signup',
    userName,
    inactivityTimeout: 30000, // 30 seconds for post-signup
    enableInactivityPrompts: true
  });
  
  // Notify parent component of speaking state changes
  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange]);
  
  // Handle voice commands for post-signup
  useEffect(() => {
    const handleVoiceCommand = (event: CustomEvent) => {
      const command = event.detail.command;
      if (command && isPostSignup) {
        const handled = processCommand(command);
        if (!handled) {
          // Default response for unrecognized commands
          speak("I can help you get started with your exam preparation journey. Would you like to take your exam readiness test or explore your study plan?");
        }
      }
    };
    
    window.addEventListener('voice-command', handleVoiceCommand as EventListener);
    
    return () => {
      window.removeEventListener('voice-command', handleVoiceCommand as EventListener);
    };
  }, [isPostSignup, processCommand, speak]);
  
  // Don't render anything if not in post-signup flow
  if (!isPostSignup) {
    return null;
  }
  
  return null; // This component only handles voice logic
};

export default PostSignupVoiceAssistant;
