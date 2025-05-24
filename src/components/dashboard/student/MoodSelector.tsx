
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodType } from '@/types/user/base';

const moodOptions = [
  { mood: MoodType.HAPPY, emoji: '😊', label: 'Happy' },
  { mood: MoodType.FOCUSED, emoji: '🎯', label: 'Focused' },
  { mood: MoodType.MOTIVATED, emoji: '💪', label: 'Motivated' },
  { mood: MoodType.TIRED, emoji: '😴', label: 'Tired' },
  { mood: MoodType.STRESSED, emoji: '😰', label: 'Stressed' },
  { mood: MoodType.CONFUSED, emoji: '🤔', label: 'Confused' },
  { mood: MoodType.ANXIOUS, emoji: '😰', label: 'Anxious' },
  { mood: MoodType.NEUTRAL, emoji: '😐', label: 'Neutral' },
  { mood: MoodType.OKAY, emoji: '👌', label: 'Okay' },
  { mood: MoodType.OVERWHELMED, emoji: '😵', label: 'Overwhelmed' },
  { mood: MoodType.CURIOUS, emoji: '🤔', label: 'Curious' },
  { mood: MoodType.SAD, emoji: '😢', label: 'Sad' }
];

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onMoodSelect }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {moodOptions.map((option) => (
            <Button
              key={option.mood}
              variant={currentMood === option.mood ? "default" : "outline"}
              size="sm"
              onClick={() => onMoodSelect(option.mood)}
              className="flex flex-col items-center p-2 h-auto"
            >
              <span className="text-lg mb-1">{option.emoji}</span>
              <span className="text-xs">{option.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSelector;
