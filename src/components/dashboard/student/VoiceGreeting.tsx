
import React, { useEffect, useState } from 'react';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';

interface VoiceGreetingProps {
  isFirstTimeUser?: boolean;
  userName?: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({
  isFirstTimeUser = false,
  userName = 'Student',
  language = 'en'
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const { speakMessage } = useVoiceAnnouncer({
    userName,
    initialSettings: { language, enabled: true, muted: false },
    isFirstTimeUser
  });

  useEffect(() => {
    const welcomeKey = isFirstTimeUser ? 'first_time_welcome_played' : 'return_welcome_played';
    const hasPlayedWelcome = sessionStorage.getItem(welcomeKey) === 'true';

    if (!hasPlayedWelcome && !hasGreeted) {
      // Set a short delay before speaking to allow the page to load
      const timer = setTimeout(() => {
        // Fix PREPZR pronunciation to be /ˈprɛp.zər/
        const prepzrPronunciation = "Prepzər";
        
        if (isFirstTimeUser) {
          // Welcome sequence for first-time users
          speakMessage(`Welcome to ${prepzrPronunciation}, ${userName}! I'm your personal AI voice assistant to help with your exam preparation journey.`);
          
          // Continue with more guidance after a pause
          setTimeout(() => {
            speakMessage("I'll provide smart tips based on your study patterns and can help you stay on track with your goals. You can customize my voice settings or mute me using the voice controls at the bottom right of your screen.");
          }, 7000);
        } else {
          // Simpler welcome for returning users
          speakMessage(`Welcome back to ${prepzrPronunciation}, ${userName}. I'm here to assist with your exam preparation today.`);
        }

        sessionStorage.setItem(welcomeKey, 'true');
        setHasGreeted(true);
      }, 3000); // Reduced delay to 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName, speakMessage, hasGreeted, language]);

  // This component doesn't render anything visible
  return null;
};

export default VoiceGreeting;
