
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  isReturningUser = false,
  lastActivity,
  pendingTasks = []
}) => {
  const hasInitializedRef = useRef(false);
  const { language, t } = useLanguage();
  
  useEffect(() => {
    // Prevent multiple initialization
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    console.log('🔊 Voice Greeting: Initialized for', userName);
    
    // Simple voice greeting for new users
    if (isFirstTimeUser && 'speechSynthesis' in window) {
      const greeting = language === 'hi' 
        ? `${t('congratulations')} ${userName}! ${t('welcomeMessage')}। ${t('signupComplete')}।`
        : `${t('congratulations')} ${userName}! ${t('welcomeMessage')}. ${t('signupComplete')}.`;
      
      const utterance = new SpeechSynthesisUtterance(greeting);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      // Small delay to ensure page is loaded
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 1000);
    }
    
    // Clean up speech synthesis on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [userName, isFirstTimeUser, language, t]);

  // This component doesn't render anything visible - voice is handled internally
  return null;
};

export default VoiceGreeting;
