
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { MoodType } from '@/types/user/base';

const moodMessages: Record<MoodType, string> = {
  [MoodType.Happy]: "You're radiating positive energy today! Perfect time for challenging topics.",
  [MoodType.Motivated]: "Your motivation is inspiring! Let's tackle some difficult concepts.",
  [MoodType.Focused]: "You're in the zone! This is ideal for deep learning sessions.",
  [MoodType.Tired]: "Take it easy today. Light revision might be more suitable.",
  [MoodType.Stressed]: "Remember to breathe. Let's start with something manageable.",
  [MoodType.Anxious]: "Take your time. We'll work through this step by step.",
  [MoodType.Okay]: "Steady progress is good progress. Let's continue learning.",
  [MoodType.Overwhelmed]: "Break things down into smaller pieces. You've got this!",
  [MoodType.Curious]: "Your curiosity is a superpower! Let's explore new topics.",
  [MoodType.Confused]: "It's okay to feel confused. Let's clarify the fundamentals.",
  [MoodType.Sad]: "Learning can lift your spirits. Let's find something interesting.",
  [MoodType.Neutral]: "A neutral state is perfect for steady learning.",
  [MoodType.Calm]: "Your calmness will help with retention. Great learning conditions!"
};

interface FloatingVoiceAnnouncerProps {
  currentMood?: MoodType;
  announcement?: string;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({ 
  currentMood, 
  announcement 
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  
  const message = announcement || (currentMood ? moodMessages[currentMood] : "Welcome to your learning dashboard!");
  
  const handleToggle = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    } else if (isEnabled) {
      speechSynthesis.cancel();
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant={isEnabled ? "default" : "outline"}
        size="sm"
        onClick={handleToggle}
        className="rounded-full shadow-lg"
      >
        {isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
