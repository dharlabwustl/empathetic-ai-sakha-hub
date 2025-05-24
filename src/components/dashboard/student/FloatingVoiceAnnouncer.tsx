import React, { useEffect } from 'react';
import { MoodType } from '@/types/user/base';

const moodEmojis: Record<MoodType, string> = {
  [MoodType.Happy]: '😊',
  [MoodType.Motivated]: '💪',
  [MoodType.Focused]: '🎯',
  [MoodType.Tired]: '😴',
  [MoodType.Stressed]: '😫',
  [MoodType.Anxious]: '😰',
  [MoodType.Okay]: '👍',
  [MoodType.Overwhelmed]: '🤯',
  [MoodType.Curious]: '🤔',
  [MoodType.Confused]: '🤔',
  [MoodType.Sad]: '😢'
};

const FloatingVoiceAnnouncer: React.FC<{ currentMood?: MoodType }> = ({ currentMood }) => {
  useEffect(() => {
    if (currentMood) {
      const moodMessage = `You are feeling ${moodEmojis[currentMood]} today.`;
      // Logic to announce the mood
      console.log(moodMessage); // Replace with actual voice announcement logic
    }
  }, [currentMood]);

  return null; // This component does not render anything
};

export default FloatingVoiceAnnouncer;
