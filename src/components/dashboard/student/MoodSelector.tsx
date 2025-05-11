
import React from 'react';
import { MoodType } from '@/types/user/base';
import { Button } from '@/components/ui/button';
import { getMoodEmoji } from './mood-tracking/moodUtils';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
  className?: string;
}

export const MoodSelector = ({ onMoodSelect, currentMood, className = '' }: MoodSelectorProps) => {
  const moodOptions = [
    { type: MoodType.HAPPY, label: 'Happy' },
    { type: MoodType.FOCUSED, label: 'Focused' },
    { type: MoodType.MOTIVATED, label: 'Motivated' },
    { type: MoodType.TIRED, label: 'Tired' },
    { type: MoodType.STRESSED, label: 'Stressed' },
    { type: MoodType.CONFUSED, label: 'Confused' },
    { type: MoodType.ANXIOUS, label: 'Anxious' },
    { type: MoodType.NEUTRAL, label: 'Neutral' },
    { type: MoodType.OKAY, label: 'Okay' },
    { type: MoodType.OVERWHELMED, label: 'Overwhelmed' },
    { type: MoodType.CURIOUS, label: 'Curious' },
    { type: MoodType.SAD, label: 'Sad' },
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {moodOptions.map((mood) => (
        <Button
          key={mood.type}
          variant={currentMood === mood.type ? "default" : "outline"}
          onClick={() => onMoodSelect(mood.type)}
          className="flex flex-col items-center p-2 h-auto"
          size="sm"
        >
          <span className="text-xl mb-1">{getMoodEmoji(mood.type)}</span>
          <span className="text-xs">{mood.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
