
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntelligentVoiceAssistant } from '@/hooks/useIntelligentVoiceAssistant';

interface UnifiedVoiceAssistantProps {
  userName?: string;
  userProfile?: any;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({
  userName = 'Student',
  userProfile,
  language = 'en-US',
  onSpeakingChange
}) => {
  const location = useLocation();
  const { 
    isSpeaking, 
    playInitialGreeting, 
    speakWithIntelligentBreaks,
    offerHelpfulGuidance,
    trackActivity 
  } = useIntelligentVoiceAssistant({
    userName,
    language,
    onSpeakingChange,
    inactivityTimeout: 30000
  });

  // Context-aware greetings based on route
  const getContextualGreeting = () => {
    const path = location.pathname;
    
    if (path === '/') {
      return `Welcome to PREPZR, ${userName}! I'm your AI study companion. Ready to transform your exam preparation experience?`;
    } else if (path.includes('/dashboard')) {
      return `Welcome back, ${userName}! Your personalized dashboard is ready. How can I help you succeed today?`;
    } else if (path.includes('/signup')) {
      return `Great to see you joining PREPZR, ${userName}! I'll guide you through creating your personalized learning experience.`;
    } else if (path.includes('/onboarding')) {
      return `Perfect! Let's set up your adaptive dashboard. I'll help you create the most effective study plan.`;
    } else if (path.includes('/concepts')) {
      return `Time to master key concepts! I can help you focus on your weak areas and build confidence.`;
    } else if (path.includes('/practice')) {
      return `Ready for practice? I'll guide you through problems that match your skill level and learning style.`;
    }
    
    return `I'm here to help with your exam preparation, ${userName}. What would you like to work on?`;
  };

  // Play contextual greeting when route changes
  useEffect(() => {
    const greeting = getContextualGreeting();
    playInitialGreeting(greeting);
  }, [location.pathname, userName, playInitialGreeting]);

  // Offer contextual help based on user activity
  useEffect(() => {
    const timer = setTimeout(() => {
      const path = location.pathname;
      
      if (path.includes('/dashboard')) {
        offerHelpfulGuidance('dashboard');
      } else if (path.includes('/concepts') || path.includes('/study')) {
        offerHelpfulGuidance('study');
      } else if (path.includes('/practice') || path.includes('/exam')) {
        offerHelpfulGuidance('practice');
      }
    }, 60000); // Offer help after 1 minute of inactivity

    return () => clearTimeout(timer);
  }, [location.pathname, offerHelpfulGuidance]);

  // Track user interactions
  useEffect(() => {
    const handleUserActivity = () => {
      trackActivity();
    };

    const events = ['click', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [trackActivity]);

  return null; // This component only handles voice logic
};

export default UnifiedVoiceAssistant;
