
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';

interface MoodSelectorProps {
  currentMood: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  currentMood,
  onMoodSelect
}) => {
  const moodOptions = [
    { type: MoodType.MOTIVATED, emoji: '🚀', label: 'Motivated', color: 'bg-green-100 hover:bg-green-200' },
    { type: MoodType.FOCUSED, emoji: '🎯', label: 'Focused', color: 'bg-blue-100 hover:bg-blue-200' },
    { type: MoodType.HAPPY, emoji: '😊', label: 'Happy', color: 'bg-yellow-100 hover:bg-yellow-200' },
    { type: MoodType.STRESSED, emoji: '😰', label: 'Stressed', color: 'bg-red-100 hover:bg-red-200' },
    { type: MoodType.TIRED, emoji: '😴', label: 'Tired', color: 'bg-gray-100 hover:bg-gray-200' },
    { type: MoodType.ANXIOUS, emoji: '😟', label: 'Anxious', color: 'bg-orange-100 hover:bg-orange-200' },
    { type: MoodType.CONFUSED, emoji: '😕', label: 'Confused', color: 'bg-purple-100 hover:bg-purple-200' },
    { type: MoodType.OVERWHELMED, emoji: '😵', label: 'Overwhelmed', color: 'bg-pink-100 hover:bg-pink-200' }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {moodOptions.map((mood) => (
        <Button
          key={mood.type}
          variant={currentMood === mood.type ? "default" : "outline"}
          onClick={() => onMoodSelect(mood.type)}
          className={`flex items-center gap-2 h-auto p-4 ${mood.color} ${
            currentMood === mood.type ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <span className="text-2xl">{mood.emoji}</span>
          <span className="text-sm font-medium">{mood.label}</span>
        </Button>
      ))}
    </div>
  );
};
