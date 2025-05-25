
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useUnifiedVoice } from '@/components/dashboard/student/voice/UnifiedVoiceManager';

interface ContextAwareVoiceAssistantProps {
  userName?: string;
  pageType?: 'academic' | 'concepts' | 'today' | 'flashcards' | 'formula' | 'dashboard';
}

const ContextAwareVoiceAssistant: React.FC<ContextAwareVoiceAssistantProps> = ({ 
  userName = "Student",
  pageType
}) => {
  const location = useLocation();
  const { speakMessage, isEnabled, voiceSettings } = useUnifiedVoice();
  const lastAnnouncementRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isEnabled || voiceSettings.muted) return;

    const path = location.pathname;
    const currentPage = pageType || detectPageType(path);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only announce if it's a different page
    const pageKey = `${currentPage}-${path}`;
    if (lastAnnouncementRef.current === pageKey) return;
    
    lastAnnouncementRef.current = pageKey;

    // Delay to allow page to load
    timeoutRef.current = setTimeout(() => {
      const message = getContextualMessage(currentPage, userName, path);
      if (message) {
        speakMessage(message, 'medium');
      }
    }, 1500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname, pageType, userName, speakMessage, isEnabled, voiceSettings.muted]);

  return null;
};

const detectPageType = (path: string): string => {
  if (path.includes('/academic')) return 'academic';
  if (path.includes('/concepts/') && path !== '/concepts') return 'concept-detail';
  if (path.includes('/concepts')) return 'concepts';
  if (path.includes('/today')) return 'today';
  if (path.includes('/flashcards/') && path.includes('/interactive')) return 'interactive-flashcard';
  if (path.includes('/flashcards')) return 'flashcards';
  if (path.includes('/formula')) return 'formula';
  if (path === '/dashboard/student' || path === '/') return 'dashboard';
  return 'unknown';
};

const getContextualMessage = (pageType: string, userName: string, path: string): string => {
  const messages = {
    'academic': `Welcome to your Academic Advisor, ${userName}. Here you can get personalized strategic guidance for your exam preparation. I can help you create study plans, analyze your performance patterns, set realistic goals, and provide subject prioritization advice. You can ask me about optimal study schedules, exam strategies, or areas where you need to focus more. What would you like to work on today?`,
    
    'concept-detail': `You're now viewing a concept detail page, ${userName}. This is where you can dive deep into specific topics with interactive learning. I'm here to help you understand the concept thoroughly, work through practice problems, and connect it to related topics. You can ask me to explain difficult parts, provide examples, or suggest related concepts to study. Feel free to ask me any questions about this concept!`,
    
    'concepts': `Welcome to your Concept Cards, ${userName}. This is your interactive learning hub where you can master key topics through engaging content. I can help you navigate through different subjects, understand complex concepts, and track your learning progress. You can ask me to explain any topic, suggest study sequences, or help you focus on areas that need improvement.`,
    
    'today': `Welcome to your Today's Plan, ${userName}. This is your personalized daily study dashboard with smart task management. I can help you prioritize tasks based on your energy levels, track your progress, manage your backlog, and adapt your plan throughout the day. You can ask me about task completion strategies, time management, or how to handle pending work. Let's make today productive and efficient!`,
    
    'interactive-flashcard': `You're in the interactive flashcard session, ${userName}. I'm here to make your review session highly effective. I can provide hints when you're stuck, explain difficult concepts, track your performance patterns, and suggest optimal review timing. Remember, spaced repetition is key to long-term retention! Ask me for help with any card you find challenging.`,
    
    'flashcards': `Welcome to your Flashcards section, ${userName}. This is where you can review and memorize key concepts using spaced repetition. I can help you organize your study cards, suggest review schedules, and track your memory retention. You can ask me about effective memorization techniques or help with difficult flashcards.`,
    
    'formula': `Welcome to the Formula Lab, ${userName}. This is your interactive workspace for mastering formulas and calculations. I can help you understand the relationships between variables, solve step-by-step problems, explore real-world applications, and practice different problem types. You can ask me to explain any formula, help with calculations, or suggest practice problems. Let's make formulas your strength!`,
    
    'dashboard': `Welcome back to your dashboard, ${userName}. I'm here to help you navigate your learning journey. You can ask me about your progress, upcoming tasks, or any feature you'd like to explore. I can guide you through the Academic Advisor, Today's Plan, Concept Cards, Flashcards, and more. What would you like to focus on today?`
  };
  
  return messages[pageType as keyof typeof messages] || '';
};

export default ContextAwareVoiceAssistant;
