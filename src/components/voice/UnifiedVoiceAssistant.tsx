
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface UnifiedVoiceAssistantProps {
  userName: string;
  isFirstTimeUser?: boolean;
  hasCompletedOnboarding?: boolean;
  pendingTasks?: string[];
  language?: string;
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({
  userName,
  isFirstTimeUser = false,
  hasCompletedOnboarding = true,
  pendingTasks = [],
  language = 'en-US'
}) => {
  const location = useLocation();
  const hasSpokenRef = useRef<string>('');
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Stop any ongoing speech when route changes
  useEffect(() => {
    if (currentUtterance && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setCurrentUtterance(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Prevent multiple announcements for the same page
    if (hasSpokenRef.current === location.pathname) return;
    hasSpokenRef.current = location.pathname;

    const speakMessage = (message: string) => {
      if (!('speechSynthesis' in window)) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance();
      utterance.text = message.replace(/PREPZR/gi, 'PREP-zer');
      utterance.lang = language;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      // Select US English voice
      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(voice => 
        voice.lang.includes('en-US') && 
        (voice.name.includes('Google') || voice.name.includes('Microsoft'))
      );
      
      if (usVoice) {
        utterance.voice = usVoice;
      }

      utterance.onend = () => setCurrentUtterance(null);
      utterance.onerror = () => setCurrentUtterance(null);

      setCurrentUtterance(utterance);
      window.speechSynthesis.speak(utterance);
    };

    const getContextualMessage = () => {
      const path = location.pathname;

      // First time user messages
      if (isFirstTimeUser && hasCompletedOnboarding) {
        if (path.includes('/dashboard/student')) {
          return `Congratulations ${userName}! Welcome to your PREPZR dashboard. I'm Sakha AI, your learning companion. Let me help you understand the key features: You have your Study Plan for structured learning, Academic Advisor for personalized guidance, Daily Plan for today's tasks, Concept Cards for deep learning, Flashcards for quick revision, Practice Exams for assessment, and Formula sections for reference. Would you like me to guide you through any specific feature?`;
        }
      }

      // Returning user messages
      if (path.includes('/dashboard/student') && !path.includes('/today-plan') && !path.includes('/concepts') && !path.includes('/academic')) {
        let message = `Welcome back ${userName}! `;
        
        if (pendingTasks.length > 0) {
          message += `You have ${pendingTasks.length} pending tasks waiting for you. `;
        }
        
        message += `I'm here to help you with your daily study plan, track your progress, and provide guidance for your exam preparation. Let's make today productive!`;
        return message;
      }

      // Page-specific messages
      if (path.includes('/today-plan')) {
        return `Here's your personalized study plan for today, ${userName}. I can help you understand your tasks, track progress, and suggest the best study approach. What would you like to focus on first?`;
      }

      if (path.includes('/concepts')) {
        return `Welcome to your concept library, ${userName}. I can explain any concept, provide examples, suggest study methods, and help you master difficult topics. Which concept would you like to explore?`;
      }

      if (path.includes('/academic')) {
        return `This is your Academic Advisor section, ${userName}. I can help you create study plans, analyze your progress, suggest improvements, and provide personalized academic guidance. How can I assist your learning journey today?`;
      }

      if (path.includes('/flashcards')) {
        return `Welcome to interactive flashcards, ${userName}. I can help you create effective flashcards, suggest review schedules, and provide memory techniques. Ready to boost your retention?`;
      }

      if (path.includes('/formulas')) {
        return `Here are your formula references, ${userName}. I can explain derivations, provide application examples, and help you memorize important formulas. Which subject's formulas would you like to explore?`;
      }

      return null;
    };

    const message = getContextualMessage();
    if (message) {
      // Small delay to ensure page is loaded
      setTimeout(() => speakMessage(message), 2000);
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [location.pathname, userName, isFirstTimeUser, hasCompletedOnboarding, pendingTasks, language]);

  return null; // This component doesn't render anything
};

export default UnifiedVoiceAssistant;
