
import React, { useState, useEffect, useRef } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useLocation } from 'react-router-dom';

interface UnifiedVoiceAssistantProps {
  userName?: string;
  isFirstTimeUser?: boolean;
  userMood?: string;
  language?: string;
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({
  userName = "Student",
  isFirstTimeUser = false,
  userMood,
  language = "en-IN"
}) => {
  const location = useLocation();
  const { speakMessage, voiceSettings } = useVoiceAnnouncer({
    userName,
    initialSettings: {
      enabled: true,
      muted: false,
      language: language,
      pitch: 1.1,
      rate: 0.95
    }
  });
  
  const [hasSpokenForRoute, setHasSpokenForRoute] = useState<Set<string>>(new Set());
  const currentRoute = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get appropriate greeting based on user type and route
  const getRouteMessage = (pathname: string, isFirstTime: boolean) => {
    if (isFirstTime) {
      if (pathname === '/dashboard/student' || pathname === '/') {
        return `Welcome to PREPZR, ${userName}! Congratulations on starting your exam preparation journey! I'm here to help you understand our features. We have your personalized dashboard with study plans, academic advisor for guidance, daily plans to keep you on track, concept cards for learning, flashcards for quick revision, practice exams, and formula sections. Would you like me to guide you through any specific feature?`;
      } else if (pathname.includes('/dashboard/student/today')) {
        return `This is your Today's Plan page, ${userName}. Here you can see your daily study tasks, track progress, and get smart suggestions for better learning. I'll help you stay focused and organized!`;
      } else if (pathname.includes('/dashboard/student/concepts')) {
        return `Welcome to the Concept Cards section, ${userName}. This is where you'll master key concepts with interactive learning materials. I can help explain topics and guide your study session!`;
      } else if (pathname.includes('/dashboard/student/flashcards')) {
        return `This is your Flashcards page, ${userName}. Perfect for quick revision and memory reinforcement. I'll help you practice and remember important facts!`;
      } else if (pathname.includes('/dashboard/student/academic')) {
        return `Welcome to your Academic Advisor, ${userName}. I'm your personal study coach here to provide strategic guidance, track your progress, and help optimize your preparation!`;
      } else if (pathname.includes('/dashboard/student/formulas')) {
        return `This is your Formula section, ${userName}. Access all important formulas organized by subject. I can help you understand and memorize them effectively!`;
      }
    } else {
      // Returning user messages
      if (pathname === '/dashboard/student' || pathname === '/') {
        return `Welcome back, ${userName}! Ready to continue your preparation? You have some pending tasks in your daily plan. Let me remind you to check your study progress and upcoming deadlines. I'm here to help you stay on track!`;
      } else if (pathname.includes('/dashboard/student/today')) {
        return `Back to your daily plan, ${userName}! Let's review today's tasks and see what needs your attention. I'll help you prioritize and complete your study goals efficiently.`;
      } else if (pathname.includes('/dashboard/student/concepts')) {
        return `Time to dive into concepts, ${userName}! Let's continue building your understanding. Which topic would you like to explore or review today?`;
      } else if (pathname.includes('/dashboard/student/flashcards')) {
        return `Quick revision time, ${userName}! Let's reinforce your learning with flashcards. I'll help you focus on areas that need more practice.`;
      } else if (pathname.includes('/dashboard/student/academic')) {
        return `Your academic advisor is ready, ${userName}! Let's analyze your progress and plan your next steps for optimal preparation.`;
      } else if (pathname.includes('/dashboard/student/formulas')) {
        return `Formula time, ${userName}! Let's make sure you have all the important formulas at your fingertips for your exam.`;
      }
    }
    
    return `Welcome, ${userName}! I'm here to assist you with your studies.`;
  };

  // Handle route changes
  useEffect(() => {
    const pathname = location.pathname;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Stop any current speech when route changes
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Check if we should speak for this route
    if (currentRoute.current !== pathname && !hasSpokenForRoute.has(pathname)) {
      currentRoute.current = pathname;
      
      // Delay to ensure page is loaded
      timeoutRef.current = setTimeout(() => {
        if (voiceSettings.enabled && !voiceSettings.muted) {
          const message = getRouteMessage(pathname, isFirstTimeUser);
          speakMessage(message);
          setHasSpokenForRoute(prev => new Set([...prev, pathname]));
        }
      }, 2000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname, speakMessage, voiceSettings.enabled, voiceSettings.muted, isFirstTimeUser, userName, hasSpokenForRoute]);

  // Clear spoken routes when user navigates away from dashboard
  useEffect(() => {
    if (!location.pathname.includes('/dashboard/student')) {
      setHasSpokenForRoute(new Set());
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything visible
};

export default UnifiedVoiceAssistant;
