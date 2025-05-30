
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice, createUserActivityDetector, createNavigationCleanup } from '@/utils/voiceConfig';

interface DashboardVoiceGreetingProps {
  userName: string;
  isFirstTimeUser: boolean;
  lastActivity?: string;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const DashboardVoiceGreeting: React.FC<DashboardVoiceGreetingProps> = ({
  userName,
  isFirstTimeUser,
  lastActivity,
  language = 'en-US',
  onSpeakingChange
}) => {
  const location = useLocation();
  const hasSpokenRef = useRef(false);
  const userActiveRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  
  const isDashboard = location.pathname.includes('/dashboard');
  
  useEffect(() => {
    if (!isDashboard || hasSpokenRef.current || userName === 'there') return;
    
    // User activity detection
    const handleActivity = () => {
      userActiveRef.current = true;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (onSpeakingChange) {
        onSpeakingChange(false);
      }
    };
    
    const removeActivityDetector = createUserActivityDetector(handleActivity);
    const removeNavigationCleanup = createNavigationCleanup();
    
    cleanupRef.current = () => {
      removeActivityDetector();
      removeNavigationCleanup();
    };
    
    // Dashboard greeting logic
    const speakDashboardGreeting = () => {
      if (userActiveRef.current || hasSpokenRef.current) return;
      
      let greetingMessage = '';
      
      if (isFirstTimeUser) {
        greetingMessage = `Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`;
      } else {
        if (lastActivity) {
          greetingMessage = `Welcome back, ${userName}! Last time, you worked on ${lastActivity}. Let's pick up where you left off.`;
        } else {
          greetingMessage = `Welcome back, ${userName}! Let's continue your learning journey.`;
        }
      }
      
      const success = speakWithFemaleVoice(
        greetingMessage,
        { language },
        () => {
          if (onSpeakingChange) onSpeakingChange(true);
          hasSpokenRef.current = true;
        },
        () => {
          if (onSpeakingChange) onSpeakingChange(false);
        }
      );
      
      if (success) {
        hasSpokenRef.current = true;
      }
    };
    
    // Wait for voices to load, then speak
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speakDashboardGreeting, { once: true });
    } else {
      setTimeout(speakDashboardGreeting, 2000);
    }
    
    return cleanupRef.current;
  }, [isDashboard, userName, isFirstTimeUser, lastActivity, language, onSpeakingChange]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  if (!isDashboard) return null;
  
  return null;
};

export default DashboardVoiceGreeting;
