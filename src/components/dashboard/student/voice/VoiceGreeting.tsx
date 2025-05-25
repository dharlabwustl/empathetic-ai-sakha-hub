
import React, { useEffect, useState } from 'react';
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({
  isFirstTimeUser,
  userName,
  language = "en"
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  
  const { speakMessage, voiceSettings } = useVoiceAnnouncer({
    userName,
    initialSettings: {
      enabled: true,
      muted: false,
      language: language === "en" ? 'en-IN' : language,
      pitch: 1.1,
      rate: 0.95
    }
  });

  useEffect(() => {
    if (!hasGreeted && voiceSettings.enabled) {
      const timer = setTimeout(() => {
        const greeting = getContextualGreeting(isFirstTimeUser, userName);
        speakMessage(greeting);
        setHasGreeted(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, voiceSettings.enabled, speakMessage, isFirstTimeUser, userName]);

  const getContextualGreeting = (isFirstTime: boolean, name: string) => {
    if (isFirstTime) {
      return `Congratulations ${name}! Welcome to PREPZR - your AI-powered exam preparation companion. 

I'm Sakha AI, and I'm here to guide you through your journey to exam success. Let me introduce you to our powerful features:

Your Dashboard Overview shows your progress and exam readiness score. The Academic Advisor helps create personalized study plans and provides strategic guidance. Today's Plan gives you daily tasks optimized for your learning pace.

Our Concept Cards offer detailed explanations with examples. Smart Flashcards use spaced repetition for better retention. Practice Exams simulate real test conditions with detailed analytics.

The Formula Section helps you master mathematical concepts with memory techniques. I'm available 24/7 to assist with your studies and answer questions.

Would you like me to show you around the dashboard features or help you create your first study plan?`;
    } else {
      return `Welcome back, ${name}! I'm Sakha AI, ready to help you excel in your studies today.

Let me quickly remind you about your pending tasks and study progress. You have several items on your today's plan that need attention. Your exam readiness score has been updated based on your recent performance.

Don't forget to check your daily tasks - they're optimized based on your learning patterns. If you have any questions about concepts, need help with practice problems, or want guidance on your study strategy, just ask me.

I'm here to support your preparation journey and help you achieve your exam goals. What would you like to work on today?`;
    }
  };

  return null; // This component doesn't render anything visual
};

export default VoiceGreeting;
