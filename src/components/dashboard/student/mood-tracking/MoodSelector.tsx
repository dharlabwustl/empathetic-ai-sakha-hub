
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';

interface MoodSelectorProps {
  onSelectMood: (mood: MoodType) => void;
  selectedMood?: MoodType;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  onSelectMood,
  selectedMood = MoodType.NEUTRAL
}) => {
  const moodOptions = [
    { type: MoodType.HAPPY, emoji: '😃', label: 'Happy' },
    { type: MoodType.MOTIVATED, emoji: '💪', label: 'Motivated' },
    { type: MoodType.FOCUSED, emoji: '🧠', label: 'Focused' },
    { type: MoodType.CALM, emoji: '😌', label: 'Calm' },
    { type: MoodType.NEUTRAL, emoji: '😐', label: 'Neutral' },
    { type: MoodType.TIRED, emoji: '😴', label: 'Tired' },
    { type: MoodType.ANXIOUS, emoji: '😰', label: 'Anxious' },
    { type: MoodType.STRESSED, emoji: '😣', label: 'Stressed' },
    { type: MoodType.SAD, emoji: '😢', label: 'Sad' },
  ];
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {moodOptions.map((mood) => (
        <Button
          key={mood.type}
          type="button"
          variant={selectedMood === mood.type ? "default" : "outline"}
          onClick={() => onSelectMood(mood.type)}
          className="flex flex-col items-center py-2 h-auto gap-1"
        >
          <span className="text-lg">{mood.emoji}</span>
          <span className="text-xs">{mood.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
