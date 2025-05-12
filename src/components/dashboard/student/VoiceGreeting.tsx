
import React, { useEffect, useState } from 'react';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';
import { getVoiceGreeting } from './voice/voiceUtils';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  language = 'en'
}) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const { speakMessage, voiceSettings, voiceInitialized } = useVoiceAnnouncer({
    userName,
    initialSettings: {
      language: language as any // Type will be properly handled by the hook
    }
  });

  useEffect(() => {
    // Check if greeting has been played in this session
    if (voiceInitialized && !hasPlayed) {
      const sessionKey = 'voiced_greeted_' + new Date().toDateString();
      const hasGreetedToday = sessionStorage.getItem(sessionKey) === 'true';
      
      // Play greeting for first time users or if not greeted today
      if ((isFirstTimeUser || !hasGreetedToday) && voiceSettings.enabled && !voiceSettings.muted) {
        const greeting = getVoiceGreeting(userName, isFirstTimeUser, language);
        
        // Delay slightly to ensure the page has loaded
        const timer = setTimeout(() => {
          speakMessage(greeting, true);
          sessionStorage.setItem(sessionKey, 'true');
          setHasPlayed(true);
        }, 1500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isFirstTimeUser, userName, language, speakMessage, voiceInitialized, voiceSettings.enabled, voiceSettings.muted, hasPlayed]);

  // This component doesn't render anything
  return null;
};

export default VoiceGreeting;
