
import React, { useEffect } from 'react';
import { useIntelligentVoiceAssistant } from '@/hooks/useIntelligentVoiceAssistant';

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
  const { isSpeaking, playInitialGreeting } = useIntelligentVoiceAssistant({
    userName,
    language,
    onSpeakingChange,
    inactivityTimeout: 12000 // 12 seconds for dashboard
  });

  useEffect(() => {
    if (userName && userName !== 'there') {
      const greetingMessage = isFirstTimeUser 
        ? `Welcome to your PREPZR dashboard, ${userName}! This is your command center for exam preparation excellence. How can I help you get started?`
        : `Great to see you back, ${userName}! Your dedication to consistent learning is impressive. What would you like to focus on today?`;
      
      setTimeout(() => {
        playInitialGreeting(greetingMessage);
      }, 2000);
    }
  }, [userName, isFirstTimeUser, playInitialGreeting]);

  return null;
};

export default DashboardVoiceGreeting;
