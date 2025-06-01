
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntelligentVoiceAssistant } from './useIntelligentVoiceAssistant';

interface VoiceAssistantConfig {
  userName?: string;
  isLoggedIn?: boolean;
  isFirstTimeUser?: boolean;
  lastActivity?: string;
}

export const usePrepzrVoiceAssistant = (config: VoiceAssistantConfig = {}) => {
  const { userName, isLoggedIn, isFirstTimeUser, lastActivity } = config;
  const location = useLocation();
  
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Use the intelligent voice assistant
  const { 
    isSpeaking, 
    isUserActive, 
    voiceEnabled,
    speak, 
    playInitialGreeting, 
    trackActivity,
    stopAllVoiceActivity,
    toggleVoice
  } = useIntelligentVoiceAssistant({
    userName,
    language: 'en-US',
    context: getContextFromPath(location.pathname)
  });

  // Determine context from current path
  function getContextFromPath(pathname: string): 'dashboard' | 'study-plan' | 'concepts' | 'practice' | 'academic' {
    if (pathname.includes('/study-plan')) return 'study-plan';
    if (pathname.includes('/concepts')) return 'concepts';
    if (pathname.includes('/practice-exam')) return 'practice';
    if (pathname.includes('/academic')) return 'academic';
    return 'dashboard';
  }

  // Initialize voice assistant for dashboard
  useEffect(() => {
    if (!isLoggedIn || hasInitialized) return;
    
    // Only initialize for dashboard pages
    if (!location.pathname.includes('/dashboard')) return;
    
    // Wait for page to settle before speaking
    const initTimer = setTimeout(() => {
      if (!isUserActive && voiceEnabled) {
        let greetingMessage = '';
        
        if (isFirstTimeUser) {
          greetingMessage = `Welcome to your PREPZR dashboard, ${userName || 'there'}! Let's explore how we'll help you prepare better every day.`;
        } else if (lastActivity) {
          greetingMessage = `Welcome back, ${userName || 'there'}! Last time, you worked on ${lastActivity}. Ready to continue?`;
        } else {
          greetingMessage = `Good to see you back, ${userName || 'there'}! Your study progress is looking good.`;
        }
        
        playInitialGreeting(greetingMessage);
        setHasInitialized(true);
      }
    }, 2000);
    
    return () => clearTimeout(initTimer);
  }, [isLoggedIn, location.pathname, isFirstTimeUser, lastActivity, userName, hasInitialized, isUserActive, voiceEnabled, playInitialGreeting]);

  // Handle voice assistant control events
  useEffect(() => {
    const handleVoiceToggle = () => {
      toggleVoice();
    };
    
    const handleVoiceDisable = () => {
      stopAllVoiceActivity();
    };
    
    window.addEventListener('toggle-voice-assistant', handleVoiceToggle);
    window.addEventListener('disable-voice-assistant', handleVoiceDisable);
    
    return () => {
      window.removeEventListener('toggle-voice-assistant', handleVoiceToggle);
      window.removeEventListener('disable-voice-assistant', handleVoiceDisable);
    };
  }, [toggleVoice, stopAllVoiceActivity]);

  // Reset on logout
  useEffect(() => {
    if (!isLoggedIn) {
      stopAllVoiceActivity();
      setHasInitialized(false);
    }
  }, [isLoggedIn, stopAllVoiceActivity]);

  return {
    isSpeaking,
    isUserActive,
    voiceEnabled,
    speak,
    trackActivity,
    stopAllVoiceActivity,
    toggleVoice
  };
};
