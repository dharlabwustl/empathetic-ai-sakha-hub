
import React, { useEffect, useState } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

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
  
  const { speakMessage, voiceSettings } = useVoiceAnnouncer({
    userName,
    initialSettings: {
      enabled: true,
      muted: false,
      language: 'en-IN',
      pitch: 1.1,
      rate: 0.9
    }
  });

  useEffect(() => {
    if (hasGreeted) return;
    
    const timer = setTimeout(() => {
      let greeting = "";
      
      if (isFirstTimeUser || loginCount <= 1) {
        // First time user greeting
        greeting = `🎉 Congratulations ${userName}! Welcome to PREPZR, your AI-powered exam preparation platform! 
        
        I'm Sakha AI, your personal study assistant. I'm here to help you understand all the amazing features we have for you.
        
        Let me show you around! We have your personalized Dashboard where you can track your progress, 
        your Daily Study Plan that adapts to your mood and performance,
        our Academic Advisor for personalized guidance,
        interactive Concept Cards to master key topics,
        Smart Flashcards for quick reviews,
        comprehensive Practice Exams to test your knowledge,
        and our unique Formula Lab for hands-on learning.
        
        I'll be with you every step of the way, providing voice guidance and tips. 
        Are you ready to begin your journey to exam success? Let's start by exploring your dashboard!`;
      } else {
        // Returning user greeting
        greeting = `Welcome back, ${userName}! Great to see you again! 
        
        I'm Sakha AI, ready to help you continue your exam preparation journey.
        
        Let me remind you about today's priorities: You have some pending tasks in your study plan that need attention.
        Your daily target is to complete 3 concept reviews and 1 practice test.
        
        Based on your recent performance, I recommend focusing on Physics mechanics today, 
        and don't forget to review those chemistry flashcards.
        
        I'm here to guide you through your studies and help optimize your preparation strategy. 
        Shall we check your today's plan and get started?`;
      }
      
      speakMessage(greeting);
      setHasGreeted(true);
      
      if (onComplete) {
        // Call onComplete after a longer delay to ensure the message finishes
        setTimeout(onComplete, greeting.length * 50); // Rough estimate based on speech speed
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [userName, isFirstTimeUser, loginCount, speakMessage, hasGreeted, onComplete]);

  return null; // This component doesn't render anything visible
};

export default EnhancedVoiceGreeting;
