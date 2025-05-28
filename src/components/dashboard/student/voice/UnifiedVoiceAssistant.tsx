
import React, { useEffect, useState } from 'react';
import { useIntelligentVoiceAssistant } from '@/hooks/useIntelligentVoiceAssistant';
import { UserProfileBase, MoodType } from '@/types/user/base';

interface UnifiedVoiceAssistantProps {
  userProfile: UserProfileBase;
  currentMood: MoodType;
  isFirstTimeUser: boolean;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({
  userProfile,
  currentMood,
  isFirstTimeUser,
  onSpeakingChange
}) => {
  const { isSpeaking, playInitialGreeting } = useIntelligentVoiceAssistant({
    userName: userProfile.name || userProfile.firstName || 'Student',
    language: 'en-US',
    onSpeakingChange,
    inactivityTimeout: 15000
  });

  useEffect(() => {
    // Only play greeting once per session
    const hasPlayedGreeting = sessionStorage.getItem('voice_greeting_played');
    if (!hasPlayedGreeting) {
      const greeting = generateContextualGreeting();
      setTimeout(() => {
        playInitialGreeting(greeting);
        sessionStorage.setItem('voice_greeting_played', 'true');
      }, 2000);
    }
  }, [userProfile, isFirstTimeUser, playInitialGreeting]);

  const generateContextualGreeting = (): string => {
    const userName = userProfile.name || userProfile.firstName || 'Student';
    
    if (isFirstTimeUser) {
      return `Welcome to your PREPZR dashboard, ${userName}! I'm your AI study companion. Your personalized learning experience is ready. Let's begin your journey to exam success!`;
    }

    // Mood-based greetings for returning users
    switch (currentMood) {
      case MoodType.MOTIVATED:
        return `Great to see you back, ${userName}! I can sense your motivation today. Let's channel that energy into productive studying!`;
      case MoodType.STRESSED:
        return `Hello ${userName}. I notice you might be feeling stressed. Let's start with some calming exercises before diving into your studies.`;
      case MoodType.FOCUSED:
        return `Perfect timing, ${userName}! You're in your focus zone. I've prepared some challenging problems that match your current state.`;
      default:
        return `Welcome back, ${userName}! Ready to continue your learning journey? I've personalized your dashboard based on your progress.`;
    }
  };

  return null; // This component only handles voice logic
};

export default UnifiedVoiceAssistant;
