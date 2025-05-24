
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { Volume2, VolumeX } from 'lucide-react';

const moodMessages: Record<MoodType, string> = {
  [MoodType.HAPPY]: "Great to see you're feeling happy! Let's channel that positive energy into learning.",
  [MoodType.MOTIVATED]: "You're feeling motivated - perfect! Let's make the most of this energy.",
  [MoodType.FOCUSED]: "Your focus is your superpower! Ready to dive deep into learning?",
  [MoodType.TIRED]: "Feeling tired? That's okay. Let's take it easy with some light review.",
  [MoodType.STRESSED]: "I notice you're feeling stressed. Let's try some quick relaxation exercises first.",
  [MoodType.ANXIOUS]: "It's normal to feel anxious sometimes. Take a deep breath, you've got this!",
  [MoodType.OKAY]: "Feeling okay is a good starting point. Let's see what we can achieve today!",
  [MoodType.OVERWHELMED]: "Feeling overwhelmed? Let's break things down into smaller, manageable steps.",
  [MoodType.CURIOUS]: "Your curiosity is wonderful! Let's explore some interesting topics together.",
  [MoodType.CONFUSED]: "Confusion is just the first step to understanding. Let's clear things up!",
  [MoodType.SAD]: "I'm here for you. Sometimes learning can help lift our spirits.",
  [MoodType.NEUTRAL]: "Ready to start your learning session? Let's see what interests you today.",
  [MoodType.CALM]: "Your calm energy is perfect for focused learning. Let's make good use of it!",
  [MoodType.CONFIDENT]: "Confidence looks great on you! Let's tackle some challenging topics.",
  [MoodType.EXCITED]: "Your excitement is contagious! Let's channel it into productive learning."
};

interface FloatingVoiceAnnouncerProps {
  userMood: MoodType;
  userName: string;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({ userMood, userName }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayMessage = () => {
    if ('speechSynthesis' in window) {
      const message = new SpeechSynthesisUtterance(
        `Hello ${userName}! ${moodMessages[userMood]}`
      );
      message.rate = 0.8;
      message.pitch = 1;
      
      setIsPlaying(true);
      
      message.onend = () => {
        setIsPlaying(false);
      };
      
      window.speechSynthesis.speak(message);
    }
  };

  const handleStopMessage = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {moodMessages[userMood]}
        </p>
        <Button
          size="sm"
          variant={isPlaying ? "destructive" : "default"}
          onClick={isPlaying ? handleStopMessage : handlePlayMessage}
          className="w-full"
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-4 h-4 mr-2" />
              Stop
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 mr-2" />
              Listen
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
