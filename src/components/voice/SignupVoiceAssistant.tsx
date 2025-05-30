
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface SignupVoiceAssistantProps {
  userName?: string;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const SignupVoiceAssistant: React.FC<SignupVoiceAssistantProps> = ({
  userName = "there",
  language = 'en-US',
  onSpeakingChange
}) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const location = useLocation();
  
  const isWelcomeFlow = location.pathname.includes('/welcome');
  const isNewUser = localStorage.getItem('new_user_signup') === 'true';

  useEffect(() => {
    // Only speak on welcome screen for new users, once only
    if (!isWelcomeFlow || !isNewUser || hasPlayed || userName === "there") return;
    
    const speakWelcome = () => {
      const welcomeMessage = `Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`;
      
      const success = speakWithFemaleVoice(
        welcomeMessage,
        { language },
        () => {
          if (onSpeakingChange) onSpeakingChange(true);
        },
        () => {
          if (onSpeakingChange) onSpeakingChange(false);
          setHasPlayed(true);
          // Clear the new user flag after welcome
          localStorage.removeItem('new_user_signup');
        }
      );
      
      if (success) {
        setHasPlayed(true);
      }
    };
    
    // Wait for voices to load
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speakWelcome, { once: true });
    } else {
      setTimeout(speakWelcome, 1500);
    }
  }, [isWelcomeFlow, isNewUser, userName, hasPlayed, language, onSpeakingChange]);

  return null;
};

export default SignupVoiceAssistant;
