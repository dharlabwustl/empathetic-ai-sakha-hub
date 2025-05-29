
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice, createUserActivityDetector, createNavigationCleanup, createIntelligentPause } from '@/utils/voiceConfig';

interface PrepzrVoiceAssistantProps {
  userName?: string;
  language?: string;
  isNewUser?: boolean;
  context?: 'home' | 'signup' | 'welcome' | 'dashboard';
}

const PrepzrVoiceAssistant: React.FC<PrepzrVoiceAssistantProps> = ({ 
  userName = 'there',
  language = 'en-US',
  isNewUser = false,
  context
}) => {
  const [hasSpoken, setHasSpoken] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const location = useLocation();
  const timeoutRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  
  // Determine context from URL if not provided
  const getContextFromPath = (path: string): string => {
    if (path === '/' || path === '/home') return 'home';
    if (path.includes('/signup') || path.includes('/login')) return 'signup';
    if (path.includes('/welcome')) return 'welcome';
    if (path.includes('/dashboard')) return 'dashboard';
    return 'other';
  };
  
  const currentContext = context || getContextFromPath(location.pathname);
  
  // Smart suggestions for home page
  const homeSuggestions = [
    "Want to try PREPZR free before signing up? Just say 'Free trial'.",
    "Curious how PREPZR is different from coaching centers? Ask me – I'll explain.",
    "Looking for scholarships or readiness tests? I'll help you get started."
  ];
  
  // User activity detection
  useEffect(() => {
    const handleActivity = () => {
      setUserActive(true);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Reset activity after a brief pause
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setUserActive(false);
      }, 5000);
    };
    
    const removeActivityDetector = createUserActivityDetector(handleActivity);
    const removeNavigationCleanup = createNavigationCleanup();
    
    cleanupRef.current = () => {
      removeActivityDetector();
      removeNavigationCleanup();
    };
    
    return cleanupRef.current;
  }, []);
  
  // Main voice logic based on context
  useEffect(() => {
    if (userActive || hasSpoken) return;
    
    const speakMessage = async (message: string) => {
      if (userActive) return;
      
      const success = speakWithFemaleVoice(message, { language });
      if (success) {
        setHasSpoken(true);
      }
    };
    
    const handleContextMessage = async () => {
      switch (currentContext) {
        case 'home':
          await speakMessage(`Hi ${userName}! I'm Prep Zer AI, your personal exam prep guide. PREPZR isn't just another study app – it's your smart companion, built to help you crack your exams with confidence, structure, and speed.`);
          
          // Start suggestions after initial message
          setTimeout(() => {
            if (!userActive) {
              startHomeSuggestions();
            }
          }, 8000);
          break;
          
        case 'welcome':
          if (isNewUser && userName !== 'there') {
            await speakMessage(`Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`);
          }
          break;
          
        case 'dashboard':
          if (userName !== 'there') {
            if (isNewUser) {
              await speakMessage(`Hi ${userName}, welcome to your dashboard. Let's explore how we'll help you prepare better every day.`);
            } else {
              await speakMessage(`Welcome back, ${userName}! Last time, you worked on your studies. Let's pick up where you left off.`);
            }
          }
          break;
          
        case 'signup':
          // No voice on signup/login pages as per requirements
          break;
          
        default:
          // No voice on other pages
          break;
      }
    };
    
    // Delay initial message slightly
    const timer = setTimeout(handleContextMessage, 1500);
    
    return () => clearTimeout(timer);
  }, [currentContext, userName, isNewUser, userActive, hasSpoken, language]);
  
  // Home page suggestions system
  const startHomeSuggestions = async () => {
    if (currentContext !== 'home' || userActive) return;
    
    const speakSuggestion = async (index: number) => {
      if (userActive || currentContext !== 'home') return;
      
      if (index < homeSuggestions.length) {
        await createIntelligentPause(60000); // 60-second pause
        
        if (!userActive && currentContext === 'home') {
          const success = speakWithFemaleVoice(homeSuggestions[index], { language });
          if (success) {
            setCurrentSuggestionIndex(index + 1);
            
            // Schedule next suggestion
            setTimeout(() => {
              speakSuggestion(index + 1);
            }, 65000); // 65 seconds to account for speech duration
          }
        }
      } else {
        // After all suggestions, offer to pause
        await createIntelligentPause(60000);
        if (!userActive && currentContext === 'home') {
          speakWithFemaleVoice("I'll pause now. Ask me anything when you're ready.", { language });
        }
      }
    };
    
    speakSuggestion(0);
  };
  
  // Reset when context changes
  useEffect(() => {
    setHasSpoken(false);
    setUserActive(false);
    setCurrentSuggestionIndex(0);
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [currentContext]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
