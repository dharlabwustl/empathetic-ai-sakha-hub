
import React, { useEffect, useState } from 'react';
import { useUnifiedVoice } from './UnifiedVoiceManager';

interface EnhancedVoiceGreetingProps {
  userName?: string;
  isFirstTimeUser?: boolean;
  loginCount?: number;
  onComplete?: () => void;
}

const EnhancedVoiceGreeting: React.FC<EnhancedVoiceGreetingProps> = ({
  userName = "Student",
  isFirstTimeUser = false,
  loginCount = 1,
  onComplete
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const { speakMessage } = useUnifiedVoice();

  useEffect(() => {
    if (hasGreeted) return;
    
    const timer = setTimeout(() => {
      let greeting = "";
      
      if (isFirstTimeUser || loginCount <= 1) {
        // First time user greeting - comprehensive introduction
        greeting = `🎉 Congratulations ${userName}! Welcome to PREPZR, your AI-powered exam preparation platform! 
        
        I'm Sakha AI, your personal study assistant. I'm here to help you understand all the amazing features we have for you.
        
        Let me introduce you to your dashboard: 
        
        First, we have your personalized Dashboard where you can track your progress and see your exam readiness score.
        
        Your Daily Plan section creates a personalized study schedule that adapts to your mood and performance.
        
        The Academic Advisor provides strategic guidance for your exam preparation and helps you create effective study plans.
        
        Our Concept Cards help you master key topics with interactive learning experiences.
        
        Smart Flashcards provide quick reviews and spaced repetition for better retention.
        
        Practice Exams test your knowledge and simulate real exam conditions.
        
        The Formula Lab offers hands-on learning with interactive formulas and calculations.
        
        I'll be with you every step of the way, providing voice guidance and tips throughout your journey. 
        
        Are you ready to begin your path to exam success? Let's start by exploring your dashboard!`;
      } else {
        // Returning user greeting - focused on tasks and progress
        greeting = `Welcome back, ${userName}! Great to see you again! 
        
        I'm Sakha AI, ready to help you continue your exam preparation journey.
        
        Let me update you on today's priorities: You have some pending tasks in your study plan that need attention.
        Your daily target is to complete 3 concept reviews and 1 practice test.
        
        Based on your recent performance, I recommend focusing on Physics mechanics today, 
        and don't forget to review those chemistry flashcards that are due.
        
        You have 2 pending tasks from yesterday that we should catch up on, 
        and your exam readiness score has improved by 5 points since last week!
        
        I'm here to guide you through your studies and help optimize your preparation strategy. 
        Shall we check your today's plan and tackle those pending tasks?`;
      }
      
      speakMessage(greeting, 'high');
      setHasGreeted(true);
      
      if (onComplete) {
        // Call onComplete after the message is likely to finish
        setTimeout(onComplete, greeting.length * 60); // Adjusted timing for proper completion
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [userName, isFirstTimeUser, loginCount, speakMessage, hasGreeted, onComplete]);

  return null; // This component doesn't render anything visible
};

export default EnhancedVoiceGreeting;
