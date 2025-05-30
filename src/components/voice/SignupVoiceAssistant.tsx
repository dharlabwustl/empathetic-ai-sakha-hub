
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDefaultVoiceConfig } from '@/utils/voiceConfig';
import { 
  signupCongratulationMessages, 
  speakMessagesWithBreaks 
} from '@/utils/voiceMessages';

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const location = useLocation();
  
  const isSignupSuccess = location.pathname.includes('/signup') && 
                         location.search.includes('success=true');

  const playCongratulations = async () => {
    if (hasPlayed || !userName || userName === "there") return;
    
    const voiceConfig = getDefaultVoiceConfig();
    const messages = signupCongratulationMessages(userName);
    
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
    if (isSignupSuccess && userName && userName !== "there" && !hasPlayed) {
      setTimeout(() => {
        playCongratulations();
      }, 1500);
    }
  }, [isSignupSuccess, userName, hasPlayed]);

  return null;
};

export default SignupVoiceAssistant;
