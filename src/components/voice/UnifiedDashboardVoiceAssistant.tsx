
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useVoiceAssistant from '@/hooks/useVoiceAssistant';

interface UnifiedDashboardVoiceAssistantProps {
  userName?: string;
  isFirstTimeUser?: boolean;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
}

const UnifiedDashboardVoiceAssistant: React.FC<UnifiedDashboardVoiceAssistantProps> = ({
  userName = 'Student',
  isFirstTimeUser = false,
  isReturningUser = false,
  lastActivity,
  pendingTasks = []
}) => {
  const location = useLocation();
  const hasSpokenRef = useRef(false);
  const [hasSpokenForPage, setHasSpokenForPage] = useState<string>('');
  
  const { speakText, settings } = useVoiceAssistant({
    userName,
    initialSettings: {
      enabled: true,
      muted: false,
      rate: 0.95,
      pitch: 1.1,
      volume: 0.8,
      language: 'en-US'
    }
  });

  const getGreetingMessage = () => {
    const timeGreeting = new Date().getHours() < 12 ? 'Good morning' : 
                        new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';
    
    if (isFirstTimeUser) {
      return `${timeGreeting} ${userName}! Congratulations on joining PREPZR! I'm Sakha AI, your personal study companion. Let me help you understand our dashboard features. You have access to your study plan, academic advisor, daily plans, concept cards, flashcards, practice exams, and formula sections. I'm here to guide you through each feature. Where would you like to start exploring?`;
    } else if (isReturningUser) {
      let message = `${timeGreeting} ${userName}! Welcome back to PREPZR. I'm Sakha AI, ready to help with your studies today. `;
      
      if (lastActivity) {
        message += `Last time you were ${lastActivity}. `;
      }
      
      if (pendingTasks.length > 0) {
        message += `You have ${pendingTasks.length} pending tasks waiting for you. `;
      }
      
      message += `I can help you with your daily tasks, study preparation, and answer any questions. Let's make today productive!`;
      return message;
    }
    
    return `${timeGreeting} ${userName}! I'm Sakha AI, your PREPZR study assistant. How can I help you with your preparation today?`;
  };

  const getPageSpecificMessage = (path: string) => {
    if (path.includes('/academic-advisor')) {
      return `You're now in the Academic Advisor section. Here you can view and manage your study plans, track subject-wise progress, and get personalized recommendations. I can help you understand your performance metrics or suggest study plan adjustments.`;
    } else if (path.includes('/today-plan') || path.includes('/todays-plan')) {
      return `Welcome to your Today's Plan. This shows your personalized daily study schedule with concept reviews, practice sessions, and progress tracking. I can help you prioritize tasks or explain any study recommendations.`;
    } else if (path.includes('/concepts')) {
      return `You're in the Concepts section where you can study detailed explanations and master key topics. I can help explain difficult concepts, provide examples, or suggest related topics to study.`;
    } else if (path.includes('/flashcards')) {
      return `Welcome to Flashcards! This is perfect for quick revision and memory reinforcement. I can help you with study techniques, track your progress, or provide tips for better retention.`;
    } else if (path.includes('/formulas')) {
      return `You're in the Formula section with essential formulas and equations. I can help you understand derivations, provide application examples, or suggest practice problems.`;
    }
    
    return null;
  };

  useEffect(() => {
    // Reset speech flag when page changes
    if (hasSpokenForPage !== location.pathname) {
      hasSpokenRef.current = false;
      setHasSpokenForPage(location.pathname);
    }

    // Only speak if enabled, not muted, and haven't spoken for this page
    if (settings.enabled && !settings.muted && !hasSpokenRef.current) {
      const timer = setTimeout(() => {
        if (location.pathname === '/dashboard/student') {
          // Main dashboard greeting
          const greeting = getGreetingMessage();
          speakText(greeting);
        } else {
          // Page-specific message
          const pageMessage = getPageSpecificMessage(location.pathname);
          if (pageMessage) {
            speakText(pageMessage);
          }
        }
        hasSpokenRef.current = true;
      }, 1500); // Delay to ensure page has loaded

      return () => clearTimeout(timer);
    }
  }, [location.pathname, settings.enabled, settings.muted, hasSpokenForPage]);

  // This component doesn't render anything visible
  return null;
};

export default UnifiedDashboardVoiceAssistant;
