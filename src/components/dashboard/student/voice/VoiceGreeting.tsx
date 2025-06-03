
import React, { useEffect, useRef, useState } from 'react';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  isReturningUser = false,
  lastActivity,
  pendingTasks = [],
  language = 'en-US'
}) => {
  const hasInitializedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    const playWelcomeMessage = () => {
      if (!('speechSynthesis' in window)) {
        console.log('Speech synthesis not supported');
        return;
      }

      const hasSpokenWelcome = localStorage.getItem('hasSpokenWelcome') === 'true';
      if (hasSpokenWelcome) return;

      let message = '';
      if (isFirstTimeUser) {
        message = `Congratulations ${userName}! Welcome to PREPZR. We're excited to help you achieve your exam goals. Let's get started on your personalized study journey!`;
      } else {
        message = `Welcome back ${userName}! Ready to continue your study journey with PREPZR?`;
      }

      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = language;
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;

      utterance.onstart = () => {
        setIsPlaying(true);
        console.log('🔊 Voice greeting started for', userName);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        localStorage.setItem('hasSpokenWelcome', 'true');
        console.log('🔊 Voice greeting completed');
      };

      utterance.onerror = (error) => {
        setIsPlaying(false);
        console.error('Voice greeting error:', error);
      };

      // Small delay to ensure page is ready
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 1000);
    };

    playWelcomeMessage();
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [userName, isFirstTimeUser, language]);

  return null;
};

export default VoiceGreeting;
