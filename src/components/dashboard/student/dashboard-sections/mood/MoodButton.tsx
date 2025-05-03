
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';
import { createMoodConfig } from './MoodConfig';

interface MoodButtonProps {
  mood: MoodType;
  currentMood?: MoodType;
  onSelect: (mood: MoodType) => void;
}

const MoodButton: React.FC<MoodButtonProps> = ({ mood, currentMood, onSelect }) => {
  const moodConfig = createMoodConfig();
  const config = moodConfig[mood as keyof typeof moodConfig];
  
  if (!config) return null;
  
  return (
    <Button
      key={mood}
      variant={currentMood === mood ? "default" : "outline"}
      size="sm"
      className={`flex items-center gap-1.5 ${currentMood === mood ? 'bg-primary' : ''}`}
      onClick={() => onSelect(mood)}
    >
      {config.icon}
      <span className="capitalize">{mood}</span>
    </Button>
  );
};

export default MoodButton;
