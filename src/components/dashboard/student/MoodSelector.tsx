import React from 'react';
import { MoodType } from '@/types/user/base';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface MoodSelectorProps {
  onMoodSelect: (mood: MoodType) => void;
  currentMood?: MoodType | null;
  compact?: boolean;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, currentMood, compact = false }) => {
  const isMobile = useIsMobile();
  
  const moods = [
    { type: MoodType.HAPPY, emoji: '😊', label: 'Happy' },
    { type: MoodType.MOTIVATED, emoji: '💪', label: 'Motivated' },
    { type: MoodType.FOCUSED, emoji: '🧠', label: 'Focused' },
    { type: MoodType.CALM, emoji: '😌', label: 'Calm' },
    { type: MoodType.TIRED, emoji: '😴', label: 'Tired' },
    { type: MoodType.ANXIOUS, emoji: '😰', label: 'Anxious' },
    { type: MoodType.OKAY, emoji: '😐', label: 'Okay' },
    { type: MoodType.STRESSED, emoji: '😓', label: 'Stressed' },
    { type: MoodType.OVERWHELMED, emoji: '🥴', label: 'Overwhelmed' },
    { type: MoodType.CURIOUS, emoji: '🤔', label: 'Curious' },
    { type: MoodType.CONFUSED, emoji: '😕', label: 'Confused' },
    { type: MoodType.SAD, emoji: '😢', label: 'Sad' }
  ];
  
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? 'flex-col' : ''}`}>
      {moods.map((mood) => (
        <Button
          key={mood.type}
          variant={currentMood === mood.type ? "default" : "outline"}
          onClick={() => onMoodSelect(mood.type)}
          className="flex flex-col items-center p-2 h-auto"
          size="sm"
        >
          <span className="text-xl mb-1">{mood.emoji}</span>
          <span className="text-xs">{mood.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
