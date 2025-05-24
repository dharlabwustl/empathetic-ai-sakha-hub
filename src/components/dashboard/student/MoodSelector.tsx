
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
    { type: MoodType.Happy, label: 'Happy' },
    { type: MoodType.Focused, label: 'Focused' },
    { type: MoodType.Motivated, label: 'Motivated' },
    { type: MoodType.Tired, label: 'Tired' },
    { type: MoodType.Stressed, label: 'Stressed' },
    { type: MoodType.Confused, label: 'Confused' },
    { type: MoodType.Anxious, label: 'Anxious' },
    { type: MoodType.Neutral, label: 'Neutral' },
    { type: MoodType.Okay, label: 'Okay' },
    { type: MoodType.Overwhelmed, label: 'Overwhelmed' },
    { type: MoodType.Curious, label: 'Curious' },
    { type: MoodType.Sad, label: 'Sad' },
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
