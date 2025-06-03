
import React, { useEffect, useRef } from 'react';
import { usePrepzrVoiceAssistant } from '@/hooks/usePrepzrVoiceAssistant';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  isReturningUser = false,
  lastActivity,
  pendingTasks = []
}) => {
  const hasInitializedRef = useRef(false);
  
  // Use the enhanced voice assistant
  const { isSpeaking } = usePrepzrVoiceAssistant({
    userName,
    isLoggedIn: true,
    isFirstTimeUser,
    lastActivity
  });

  useEffect(() => {
    // Prevent multiple initialization
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    console.log('🔊 Voice Greeting: Initialized for', userName);
    
    // Clean up speech synthesis on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [userName]);

  // This component doesn't render anything visible - voice is handled by the hook
  return null;
};

export default VoiceGreeting;
