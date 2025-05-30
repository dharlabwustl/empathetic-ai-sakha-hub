
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  speakWithFemaleVoice, 
  isUserCurrentlyActive, 
  cleanupOnNavigation 
} from '@/utils/voiceConfig';

interface SignupVoiceAssistantProps {
  userName?: string;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const SignupVoiceAssistant: React.FC<SignupVoiceAssistantProps> = ({ 
  userName,
  language = 'en-US',
  onSpeakingChange
}) => {
  const [hasSpokenCongrats, setHasSpokenCongrats] = useState(false);
  const location = useLocation();
  const messageTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Check if user just signed up
  const justSignedUp = localStorage.getItem('justSignedUp') === 'true';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // Only speak congratulations once after signup
  useEffect(() => {
    if (!justSignedUp || !isLoggedIn || hasSpokenCongrats || !userName) {
      return;
    }

    const speakCongratulations = () => {
      if (isUserCurrentlyActive()) {
        console.log('🔇 Voice: User is active, not speaking congratulations');
        return;
      }

      const congratsMessage = `Congratulations ${userName}! You've officially joined PREPZR – your exam prep companion. Welcome to the family!`;
      
      if (onSpeakingChange) onSpeakingChange(true);
      
      const success = speakWithFemaleVoice(congratsMessage, { language }, 'signup-congrats', 
        () => {
          if (onSpeakingChange) onSpeakingChange(true);
        },
        () => {
          if (onSpeakingChange) onSpeakingChange(false);
        }
      );
      
      if (success) {
        setHasSpokenCongrats(true);
        // Clear the justSignedUp flag so it doesn't repeat
        localStorage.removeItem('justSignedUp');
      }
    };

    // Slight delay to ensure page is ready
    messageTimeoutRef.current = setTimeout(speakCongratulations, 1500);

    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [justSignedUp, isLoggedIn, hasSpokenCongrats, userName, language, onSpeakingChange]);

  // Cleanup on navigation
  useEffect(() => {
    return () => {
      cleanupOnNavigation();
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  return null; // This component only handles voice logic
};

export default SignupVoiceAssistant;
