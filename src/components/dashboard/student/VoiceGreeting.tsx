
import React, { useEffect, useState } from 'react';
import { getGreeting } from './voice/voiceUtils';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
  mood?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  language = 'en',
  mood
}) => {
  const [hasSpoken, setHasSpoken] = useState(false);
  
  useEffect(() => {
    // Only speak for first-time users and only once
    if (isFirstTimeUser && !hasSpoken) {
      // Small delay to let the page load
      const timer = setTimeout(() => {
        const greeting = getGreeting(userName, mood, isFirstTimeUser);
        
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(greeting);
          utterance.lang = language;
          utterance.rate = 0.95;
          utterance.pitch = 1.0;
          
          window.speechSynthesis.speak(utterance);
          setHasSpoken(true);
          localStorage.setItem('has_heard_welcome', 'true');
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName, language, mood, hasSpoken]);
  
  // This component doesn't render anything visually
  return null;
};

export default VoiceGreeting;
