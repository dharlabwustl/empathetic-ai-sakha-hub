
import React, { useEffect } from 'react';
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface EnhancedVoiceGreetingProps {
  userName?: string;
  isFirstTimeUser?: boolean;
  loginCount?: number;
}

const EnhancedVoiceGreeting: React.FC<EnhancedVoiceGreetingProps> = ({
  userName,
  isFirstTimeUser = false,
  loginCount = 1
}) => {
  const { speakMessage } = useVoiceAnnouncer({ userName });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFirstTimeUser || loginCount === 1) {
        // First time user greeting
        const firstTimeMessage = `
          Congratulations ${userName || 'there'}! Welcome to PREPZR! 
          I'm your AI study companion, and I'm thrilled to help you on your exam preparation journey.
          
          Let me guide you through your new dashboard. You have access to several powerful features:
          
          The Academic Advisor section provides personalized study guidance and exam strategies.
          Your Daily Plan creates a customized study schedule tailored to your goals.
          Concept Cards help you master key topics with interactive learning materials.
          Flashcards offer spaced repetition for better memory retention.
          Practice Exams test your knowledge with realistic exam simulations.
          And the Formula Lab provides interactive formulas and calculations.
          
          I'm here to assist you every step of the way. Just ask me anything, and I'll help you navigate 
          your studies more effectively. Let's make your exam preparation journey successful together!
        `;
        speakMessage(firstTimeMessage);
      } else {
        // Returning user greeting
        const returningMessage = `
          Welcome back ${userName || 'there'}! It's great to see you continuing your studies.
          
          Let me remind you about your daily tasks. You have some pending activities that need attention.
          Check your Today's Plan for specific assignments and practice sessions.
          
          Don't forget to review your concept cards and complete any pending flashcard sessions.
          Your consistent effort is key to exam success.
          
          I'm here to help you stay focused and motivated. Whether you need study tips, 
          progress tracking, or just someone to keep you accountable, I've got you covered.
          
          Let's make today productive and move closer to your exam goals!
        `;
        speakMessage(returningMessage);
      }
    }, 2000); // Wait 2 seconds before starting the greeting

    return () => clearTimeout(timer);
  }, [userName, isFirstTimeUser, loginCount, speakMessage]);

  return null; // This component doesn't render anything visible
};

export default EnhancedVoiceGreeting;
