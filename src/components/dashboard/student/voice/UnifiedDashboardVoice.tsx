
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUnifiedVoice } from './UnifiedVoiceManager';

interface UnifiedDashboardVoiceProps {
  userName?: string;
  isFirstTimeUser?: boolean;
  loginCount?: number;
}

const UnifiedDashboardVoice: React.FC<UnifiedDashboardVoiceProps> = ({
  userName = "Student",
  isFirstTimeUser = false,
  loginCount = 1
}) => {
  const location = useLocation();
  const { speakMessage, stopSpeaking, isEnabled, voiceSettings } = useUnifiedVoice();
  const [hasGreeted, setHasGreeted] = useState(false);
  const [currentPageMessage, setCurrentPageMessage] = useState<string>('');
  const lastPathRef = useRef<string>('');
  const messageTimeoutRef = useRef<NodeJS.Timeout>();

  // Initial dashboard greeting
  useEffect(() => {
    if (hasGreeted || !isEnabled || voiceSettings.muted) return;
    
    const timer = setTimeout(() => {
      let greeting = "";
      
      if (isFirstTimeUser || loginCount <= 1) {
        greeting = `🎉 Congratulations ${userName}! Welcome to PREPZR, your AI-powered exam preparation platform! 
        
        I'm your unified voice assistant, here to guide you through every step of your learning journey.
        
        Let me introduce you to your dashboard features: 
        
        Your personalized Dashboard tracks your progress and exam readiness.
        
        The Daily Plan creates a smart study schedule that adapts to your needs.
        
        The Academic Advisor provides strategic guidance for exam preparation.
        
        Concept Cards help you master topics with interactive learning.
        
        Smart Flashcards offer spaced repetition for better retention.
        
        Practice Exams simulate real test conditions.
        
        And the Formula Lab provides hands-on learning with interactive calculations.
        
        I'll be your consistent voice companion throughout PREPZR. Are you ready to begin your path to exam success?`;
      } else {
        greeting = `Welcome back, ${userName}! 
        
        I'm your unified voice assistant, ready to continue supporting your exam preparation journey.
        
        Let me update you on today's priorities: You have pending tasks in your study plan that need attention.
        Your daily target includes concept reviews and practice tests.
        
        Based on your recent performance, I recommend focusing on your weaker subjects today.
        
        You have some pending tasks from yesterday that we should address.
        
        I'm here to provide consistent guidance across all your studies. Shall we check your today's plan and tackle those tasks?`;
      }
      
      speakMessage(greeting, 'high');
      setHasGreeted(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [userName, isFirstTimeUser, loginCount, speakMessage, hasGreeted, isEnabled, voiceSettings.muted]);

  // Handle page-specific context messages
  useEffect(() => {
    if (!isEnabled || voiceSettings.muted || !hasGreeted) return;

    const currentPath = location.pathname;
    
    // Only announce if path actually changed
    if (lastPathRef.current === currentPath) return;
    lastPathRef.current = currentPath;

    // Clear any existing timeout
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    // Don't interrupt if already speaking
    messageTimeoutRef.current = setTimeout(() => {
      const contextMessage = getPageContextMessage(currentPath, userName);
      if (contextMessage && contextMessage !== currentPageMessage) {
        setCurrentPageMessage(contextMessage);
        speakMessage(contextMessage, 'medium');
      }
    }, 1000);

    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [location.pathname, userName, speakMessage, isEnabled, voiceSettings.muted, hasGreeted, currentPageMessage]);

  // Stop voice when component unmounts or page changes
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  return null;
};

const getPageContextMessage = (path: string, userName: string): string => {
  // Only provide context for specific learning pages, not the main dashboard
  if (path === '/dashboard/student' || path === '/') {
    return ''; // No message for main dashboard as greeting handles it
  }

  if (path.includes('/academic')) {
    return `You're now in the Academic Advisor section, ${userName}. I can help you create study plans, analyze performance, and set strategic goals for your exam preparation.`;
  }
  
  if (path.includes('/concepts/') && path !== '/concepts') {
    return `You're viewing a concept detail page, ${userName}. I can help explain this topic, provide examples, and suggest related concepts to study.`;
  }
  
  if (path.includes('/today')) {
    return `You're in your Daily Plan section, ${userName}. I can help you prioritize tasks, manage your schedule, and track your daily progress.`;
  }
  
  if (path.includes('/flashcards/') && path.includes('/interactive')) {
    return `You're in an interactive flashcard session, ${userName}. I can provide hints, explanations, and help track your memory retention.`;
  }
  
  if (path.includes('/formula')) {
    return `You're in the Formula Lab, ${userName}. I can help you understand formulas, solve problems, and practice calculations step by step.`;
  }

  return '';
};

export default UnifiedDashboardVoice;
