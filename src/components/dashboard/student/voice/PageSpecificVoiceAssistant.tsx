
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUnifiedVoice } from './UnifiedVoiceManager';

interface PageSpecificVoiceAssistantProps {
  userName?: string;
}

const PageSpecificVoiceAssistant: React.FC<PageSpecificVoiceAssistantProps> = ({ userName = "Student" }) => {
  const location = useLocation();
  const { speakMessage } = useUnifiedVoice();

  useEffect(() => {
    const path = location.pathname;
    
    // Delay to allow page to load and avoid conflicts
    const timer = setTimeout(() => {
      let contextMessage = "";

      if (path.includes('/academic')) {
        contextMessage = `Welcome to your Academic Advisor, ${userName}. Here you can get personalized strategic guidance for your exam preparation. I can help you create study plans, analyze your performance patterns, set realistic goals, and provide subject prioritization advice. You can ask me about optimal study schedules, exam strategies, or areas where you need to focus more. What would you like to work on today?`;
      } else if (path.includes('/concepts/') && path !== '/concepts') {
        contextMessage = `You're now viewing a concept detail page, ${userName}. This is where you can dive deep into specific topics with interactive learning. I'm here to help you understand the concept thoroughly, work through practice problems, and connect it to related topics. You can ask me to explain difficult parts, provide examples, or suggest related concepts to study. Feel free to ask me any questions about this concept!`;
      } else if (path.includes('/today')) {
        contextMessage = `Welcome to your Today's Plan, ${userName}. This is your personalized daily study dashboard with smart task management. I can help you prioritize tasks based on your energy levels, track your progress, manage your backlog, and adapt your plan throughout the day. You can ask me about task completion strategies, time management, or how to handle pending work. Let's make today productive and efficient!`;
      } else if (path.includes('/flashcards/') && path.includes('/interactive')) {
        contextMessage = `You're in the interactive flashcard session, ${userName}. I'm here to make your review session highly effective. I can provide hints when you're stuck, explain difficult concepts, track your performance patterns, and suggest optimal review timing. Remember, spaced repetition is key to long-term retention! Ask me for help with any card you find challenging.`;
      } else if (path.includes('/formula')) {
        contextMessage = `Welcome to the Formula Lab, ${userName}. This is your interactive workspace for mastering formulas and calculations. I can help you understand the relationships between variables, solve step-by-step problems, explore real-world applications, and practice different problem types. You can ask me to explain any formula, help with calculations, or suggest practice problems. Let's make formulas your strength!`;
      }

      if (contextMessage) {
        speakMessage(contextMessage, 'medium');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname, userName, speakMessage]);

  return null;
};

export default PageSpecificVoiceAssistant;
