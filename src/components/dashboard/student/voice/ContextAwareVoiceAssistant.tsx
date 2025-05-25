
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUnifiedVoice } from './UnifiedVoiceManager';

interface ContextAwareVoiceAssistantProps {
  userName?: string;
}

const ContextAwareVoiceAssistant: React.FC<ContextAwareVoiceAssistantProps> = ({ userName = "Student" }) => {
  const location = useLocation();
  const { speakMessage } = useUnifiedVoice();

  useEffect(() => {
    const path = location.pathname;
    
    // Delay to allow page to load
    const timer = setTimeout(() => {
      let contextMessage = "";

      if (path.includes('/academic')) {
        contextMessage = `Welcome to your Academic Advisor, ${userName}. Here you can get personalized guidance for your exam preparation. I can help you plan your study schedule, analyze your performance, and provide strategic advice for your target exam. What would you like to explore today?`;
      } else if (path.includes('/concepts/') && path !== '/concepts') {
        contextMessage = `You're now viewing a concept detail page, ${userName}. This is where you can dive deep into specific topics. I'm here to help you understand the concept, practice problems, and connect it to related topics. Feel free to ask me any questions about this concept!`;
      } else if (path.includes('/today')) {
        contextMessage = `Welcome to your Today's Plan, ${userName}. This is your personalized daily study schedule. I can help you prioritize tasks, track your progress, and adapt your plan based on your current mood and energy levels. Let's make today productive!`;
      } else if (path.includes('/flashcards/') && path.includes('/interactive')) {
        contextMessage = `You're in the interactive flashcard session, ${userName}. I'm here to help you learn effectively. I can provide hints, explanations, and help you understand difficult concepts. Remember, spaced repetition is key to long-term retention!`;
      } else if (path.includes('/formula')) {
        contextMessage = `Welcome to the Formula Lab, ${userName}. This is an interactive space where you can explore and experiment with formulas. I can help you understand the relationships between variables, solve problems step by step, and connect formulas to real-world applications.`;
      }

      if (contextMessage) {
        speakMessage(contextMessage, 'medium');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname, userName, speakMessage]);

  return null; // This component doesn't render anything visible
};

export default ContextAwareVoiceAssistant;
