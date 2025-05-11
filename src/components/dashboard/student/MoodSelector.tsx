
import React from 'react';
import { MoodType } from '@/types/user/base';
import { Button } from '@/components/ui/button';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
  className?: string;
}

const MoodSelector = ({ onMoodSelect, currentMood, className = '' }: MoodSelectorProps) => {
  const moodOptions = [
    { type: MoodType.HAPPY, emoji: '😊', label: 'Happy' },
    { type: MoodType.FOCUSED, emoji: '🧐', label: 'Focused' },
    { type: MoodType.MOTIVATED, emoji: '💪', label: 'Motivated' },
    { type: MoodType.TIRED, emoji: '😴', label: 'Tired' },
    { type: MoodType.STRESSED, emoji: '😓', label: 'Stressed' },
    { type: MoodType.CONFUSED, emoji: '🤔', label: 'Confused' },
    { type: MoodType.ANXIOUS, emoji: '😰', label: 'Anxious' },
    { type: MoodType.NEUTRAL, emoji: '😐', label: 'Neutral' },
    { type: MoodType.OKAY, emoji: '👍', label: 'Okay' },
    { type: MoodType.OVERWHELMED, emoji: '😩', label: 'Overwhelmed' },
    { type: MoodType.CURIOUS, emoji: '🤓', label: 'Curious' },
    { type: MoodType.SAD, emoji: '😔', label: 'Sad' },
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {moodOptions.map((mood) => (
        <Button
          key={mood.type}
          variant={currentMood === mood.type ? "default" : "outline"}
          onClick={() => onMoodSelect(mood.type)}
          className="flex flex-col items-center p-2 h-auto"
        >
          <span className="text-xl mb-1">{mood.emoji}</span>
          <span className="text-xs">{mood.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
export { MoodSelector };
