import React from 'react';
import { MoodType } from '@/types/user/base';
import { Button } from '@/components/ui/button';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

const moods = [
  { type: MoodType.Happy, emoji: '😊', label: 'Happy' },
  { type: MoodType.Focused, emoji: '🎯', label: 'Focused' },
  { type: MoodType.Motivated, emoji: '🔥', label: 'Motivated' },
  { type: MoodType.Tired, emoji: '😴', label: 'Tired' },
  { type: MoodType.Stressed, emoji: '😫', label: 'Stressed' },
  { type: MoodType.Confused, emoji: '😕', label: 'Confused' },
  { type: MoodType.Anxious, emoji: '😰', label: 'Anxious' },
  { type: MoodType.Neutral, emoji: '😐', label: 'Neutral' },
  { type: MoodType.Okay, emoji: '👍', label: 'Okay' },
  { type: MoodType.Overwhelmed, emoji: '😵', label: 'Overwhelmed' },
  { type: MoodType.Curious, emoji: '🔍', label: 'Curious' },
  { type: MoodType.Sad, emoji: '😢', label: 'Sad' }
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onMoodChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => (
        <Button
          key={mood.type}
          variant={currentMood === mood.type ? "default" : "outline"}
          onClick={() => onMoodChange(mood.type)}
          className="flex items-center gap-1"
        >
          {mood.emoji} {mood.label}
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
