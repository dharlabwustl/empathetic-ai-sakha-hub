
import React, { useEffect, useRef } from 'react';
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface UnifiedVoiceManagerProps {
  userName?: string;
  currentPage?: string;
  isFirstTimeUser?: boolean;
  loginCount?: number;
}

const UnifiedVoiceManager: React.FC<UnifiedVoiceManagerProps> = ({
  userName,
  currentPage,
  isFirstTimeUser = false,
  loginCount = 1
}) => {
  const { speakMessage, stopSpeaking } = useVoiceAnnouncer({ userName });
  const currentMessageRef = useRef<string>('');

  useEffect(() => {
    // Stop any current speech when page changes
    stopSpeaking();
    
    // Clear any existing timeouts
    const timeoutId = setTimeout(() => {
      let message = '';
      
      switch (currentPage) {
        case 'dashboard':
          if (isFirstTimeUser || loginCount === 1) {
            message = `Welcome to your PREPZR dashboard, ${userName}! This is your command center for exam preparation. 
            Here you can track your progress, access study materials, and plan your daily activities. 
            I'll be your consistent voice assistant throughout your learning journey.`;
          } else {
            message = `Welcome back to your dashboard, ${userName}! Ready to tackle today's study goals? 
            Check your progress metrics and daily tasks. I'm here to guide you every step of the way.`;
          }
          break;
          
        case 'academic':
          message = `You're now in the Academic Advisor section, ${userName}. This is where you can get personalized 
          study guidance, create new study plans, and switch between different exam preparations. 
          I can help you navigate these options and find the best study strategy for your goals.`;
          break;
          
        case 'concepts':
          message = `Welcome to Concept Cards, ${userName}! This is where deep learning happens. 
          Each concept card contains detailed explanations, examples, and practice questions. 
          I can help explain difficult concepts and guide you through the interactive content.`;
          break;
          
        case 'today':
          message = `Here's your Today's Plan, ${userName}! This personalized schedule is designed to keep you 
          on track with your exam preparation. I can help you understand each task and provide study tips 
          as you work through your daily goals.`;
          break;
          
        case 'flashcards':
          message = `Time for Flashcard practice, ${userName}! This spaced repetition system will help you 
          memorize important facts and formulas. I can guide you through the session and provide 
          encouragement as you practice.`;
          break;
          
        case 'practice-exam':
          message = `Welcome to Practice Exams, ${userName}! This is where you test your knowledge under 
          exam-like conditions. I can provide tips for exam strategy and help you analyze your 
          performance after each test.`;
          break;
          
        case 'formula':
          message = `You're in the Formula Lab, ${userName}! This interactive space helps you understand 
          and practice with mathematical formulas. I can explain the derivations and help you 
          work through calculations step by step.`;
          break;
          
        default:
          message = `I'm here to help you, ${userName}! No matter which section you're in, 
          I can provide guidance and support for your studies.`;
      }
      
      currentMessageRef.current = message;
      speakMessage(message);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentPage, userName, isFirstTimeUser, loginCount, speakMessage, stopSpeaking]);

  // Stop speaking when component unmounts or page changes
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  return null; // This component doesn't render anything visible
};

export default UnifiedVoiceManager;
