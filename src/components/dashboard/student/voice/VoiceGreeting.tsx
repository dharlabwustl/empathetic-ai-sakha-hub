
import React, { useEffect, useRef } from 'react';
import { usePrepzrVoiceAssistant } from '@/hooks/usePrepzrVoiceAssistant';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  language = 'en-US',
  isReturningUser = false,
  lastActivity,
  pendingTasks = []
}) => {
  const hasInitializedRef = useRef(false);
  
  // Use the enhanced voice assistant
  const { isSpeaking } = usePrepzrVoiceAssistant({
    userName,
    isLoggedIn: true,
    isFirstTimeUser,
    lastActivity
  });

  useEffect(() => {
    // Prevent multiple initialization
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    console.log('🔊 Voice Greeting: Initialized for', userName);
    
    // Simple welcome greeting using Web Speech API
    const speakWelcome = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance();
        
        if (isFirstTimeUser) {
          utterance.text = `Congratulations ${userName}! Welcome to PREPZR. Your personalized AI learning journey begins now. We're excited to help you achieve your NEET goals!`;
        } else {
          utterance.text = `Welcome back ${userName}! Ready to continue your NEET preparation? Let's make today count!`;
        }
        
        utterance.lang = language;
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        
        // Wait a moment before speaking
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 1500);
      }
    };

    speakWelcome();
    
    // Clean up speech synthesis on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [userName, isFirstTimeUser, language]);

  // This component doesn't render anything visible - voice is handled by the hook
  return null;
};

export default VoiceGreeting;
