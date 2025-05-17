
import React, { useEffect } from 'react';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  language = 'en-IN'
}) => {
  const { speakMessage, voiceInitialized } = useVoiceAnnouncer({
    userName,
    initialSettings: { language }
  });
  
  useEffect(() => {
    // Only play greeting if voice is initialized and it's a first-time user
    if (voiceInitialized && isFirstTimeUser) {
      // Give a slight delay to ensure the page has loaded
      const timer = setTimeout(() => {
        // Check if we should play the greeting (once per session)
        const hasPlayedGreeting = sessionStorage.getItem('hasPlayedWelcomeGreeting');
        if (!hasPlayedGreeting) {
          const welcomeMessage = `Welcome to PREPZR, ${userName}! I'm your AI study assistant. I'll help you navigate the platform and make the most of your exam preparation. Click the microphone icon if you need any assistance or have questions about your study plan.`;
          speakMessage(welcomeMessage);
          
          // Mark as played for this session
          sessionStorage.setItem('hasPlayedWelcomeGreeting', 'true');
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName, speakMessage, voiceInitialized]);
  
  // This is a functional component that doesn't render anything visible
  return null;
};

export default VoiceGreeting;
