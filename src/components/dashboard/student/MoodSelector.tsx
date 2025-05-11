
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';

interface MoodSelectorProps {
  onMoodSelect: (mood: MoodType) => void;
  selectedMood?: MoodType;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, selectedMood }) => {
  // Define available moods using the enum properly
  const availableMoods = [
    { mood: MoodType.HAPPY, label: 'Happy', emoji: '😊' },
    { mood: MoodType.FOCUSED, label: 'Focused', emoji: '🧠' },
    { mood: MoodType.MOTIVATED, label: 'Motivated', emoji: '💪' },
    { mood: MoodType.TIRED, label: 'Tired', emoji: '😴' },
    { mood: MoodType.STRESSED, label: 'Stressed', emoji: '😰' },
    { mood: MoodType.CONFUSED, label: 'Confused', emoji: '😕' },
    { mood: MoodType.ANXIOUS, label: 'Anxious', emoji: '😟' },
    { mood: MoodType.NEUTRAL, label: 'Neutral', emoji: '😐' },
    { mood: MoodType.OKAY, label: 'Okay', emoji: '👌' },
    { mood: MoodType.OVERWHELMED, label: 'Overwhelmed', emoji: '🥴' },
    { mood: MoodType.CURIOUS, label: 'Curious', emoji: '🤔' },
    { mood: MoodType.SAD, label: 'Sad', emoji: '😢' }
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {availableMoods.map(({ mood, label, emoji }) => (
        <Button
          key={mood}
          onClick={() => onMoodSelect(mood)}
          variant={selectedMood === mood ? "default" : "outline"}
          className="flex flex-col items-center justify-center py-3 h-auto"
        >
          <span className="text-xl mb-1">{emoji}</span>
          <span className="text-xs">{label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
