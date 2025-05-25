
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
      rate: 0.9
    }
  });

  useEffect(() => {
    if (!hasGreeted && voiceSettings.enabled) {
      const timer = setTimeout(() => {
        const greeting = getContextualGreeting(isFirstTimeUser, userName);
        speakMessage(greeting);
        setHasGreeted(true);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, voiceSettings.enabled, speakMessage, isFirstTimeUser, userName]);

  const getContextualGreeting = (isFirstTime: boolean, name: string) => {
    if (isFirstTime) {
      return `Congratulations ${name}! Welcome to PREPZR - your AI-powered exam preparation companion. 

I'm Sakha AI, and I'm here to guide you through your journey to exam success. Let me introduce you to our comprehensive features that will revolutionize your study experience.

Your Dashboard Overview displays your complete progress tracking and exam readiness score with detailed analytics. The Academic Advisor creates personalized study plans, provides strategic guidance, and helps you optimize your preparation timeline.

Today's Plan section gives you daily tasks intelligently optimized for your learning pace and preferences. Our Concept Cards offer detailed explanations with practical examples and memory techniques.

Smart Flashcards use spaced repetition algorithms for better retention and long-term memory formation. Practice Exams simulate real test conditions with comprehensive analytics and performance insights.

The Formula Section helps you master mathematical concepts with proven memory techniques and step-by-step breakdowns. I'm available 24/7 to assist with your studies, answer questions, and provide personalized guidance.

Would you like me to show you around the dashboard features or help you create your first personalized study plan? I'm here to ensure your exam preparation success!`;
    } else {
      return `Welcome back, ${name}! I'm Sakha AI, ready to help you excel in your studies today.

Let me quickly update you on your study progress and pending tasks. You have several items on your today's plan that require attention based on your learning schedule. Your exam readiness score has been updated reflecting your recent performance and progress.

Don't forget to check your daily tasks - they're intelligently optimized based on your learning patterns and study history. Your backlog items need attention to keep you on track with your preparation timeline.

If you have any questions about concepts, need help with practice problems, want guidance on your study strategy, or require assistance with any academic topics, just ask me.

I'm here to support your preparation journey, track your progress, and help you achieve your exam goals efficiently. What would you like to work on today? Let's make it a productive study session!`;
    }
  };

  return null; // This component doesn't render anything visual
};

export default VoiceGreeting;
