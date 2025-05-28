
import React, { useEffect, useState } from 'react';
import { getDefaultVoiceConfig } from '@/utils/voiceConfig';
import { 
  firstTimeDashboardMessages, 
  returningUserMessages,
  speakMessagesWithBreaks 
} from '@/utils/voiceMessages';

interface DashboardVoiceGreetingProps {
  userName: string;
  isFirstTimeUser: boolean;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const DashboardVoiceGreeting: React.FC<DashboardVoiceGreetingProps> = ({
  userName,
  isFirstTimeUser,
  language = 'en-US',
  onSpeakingChange
}) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const playDashboardGreeting = async () => {
    if (hasPlayed) return;
    
    const voiceConfig = getDefaultVoiceConfig();
    const messages = isFirstTimeUser 
      ? firstTimeDashboardMessages(userName)
      : returningUserMessages(userName);
    
    await speakMessagesWithBreaks(
      messages,
      { ...voiceConfig, language },
      () => {
        setIsSpeaking(true);
        if (onSpeakingChange) onSpeakingChange(true);
      },
      () => {
        setIsSpeaking(false);
        if (onSpeakingChange) onSpeakingChange(false);
        setHasPlayed(true);
      }
    );
  };

  useEffect(() => {
    if (userName && !hasPlayed) {
      // Delay to ensure dashboard is loaded
      setTimeout(() => {
        playDashboardGreeting();
      }, 3000);
    }
  }, [userName, hasPlayed]);

  return null;
};

export default DashboardVoiceGreeting;
