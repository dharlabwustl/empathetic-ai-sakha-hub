
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/student/todaysPlan';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
  className?: string;
}

const moods: { type: MoodType, emoji: string, label: string }[] = [
  { type: 'happy', emoji: '😊', label: 'Happy' },
  { type: 'motivated', emoji: '💪', label: 'Motivated' },
  { type: 'focused', emoji: '🧠', label: 'Focused' },
  { type: 'neutral', emoji: '😐', label: 'Neutral' },
  { type: 'tired', emoji: '😴', label: 'Tired' },
  { type: 'anxious', emoji: '😰', label: 'Anxious' },
  { type: 'stressed', emoji: '😓', label: 'Stressed' },
  { type: 'sad', emoji: '😢', label: 'Sad' },
];

export function MoodSelector({ currentMood, onMoodSelect, className }: MoodSelectorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-4 gap-3">
        {moods.map((mood) => (
          <Button
            key={mood.type}
            variant={currentMood === mood.type ? "default" : "outline"}
            className={cn(
              "h-auto flex flex-col py-3 px-2 gap-1 transition-all",
              currentMood === mood.type ? "ring-2 ring-primary" : "hover:bg-muted"
            )}
            onClick={() => onMoodSelect(mood.type)}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs">{mood.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
