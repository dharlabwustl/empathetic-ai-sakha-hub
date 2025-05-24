
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodType } from '@/types/user/base';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

const moodOptions = [
  { mood: MoodType.Happy, emoji: '😊', label: 'Happy' },
  { mood: MoodType.Focused, emoji: '🎯', label: 'Focused' },
  { mood: MoodType.Motivated, emoji: '💪', label: 'Motivated' },
  { mood: MoodType.Tired, emoji: '😴', label: 'Tired' },
  { mood: MoodType.Stressed, emoji: '😫', label: 'Stressed' },
  { mood: MoodType.Confused, emoji: '🤔', label: 'Confused' },
  { mood: MoodType.Anxious, emoji: '😰', label: 'Anxious' },
  { mood: MoodType.Neutral, emoji: '😐', label: 'Neutral' },
  { mood: MoodType.Okay, emoji: '👍', label: 'Okay' },
  { mood: MoodType.Overwhelmed, emoji: '🤯', label: 'Overwhelmed' },
  { mood: MoodType.Curious, emoji: '🤓', label: 'Curious' },
  { mood: MoodType.Sad, emoji: '😢', label: 'Sad' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onMoodSelect }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {moodOptions.map(({ mood, emoji, label }) => (
            <Button
              key={mood}
              variant={currentMood === mood ? "default" : "outline"}
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => onMoodSelect(mood)}
            >
              <span className="text-2xl mb-1">{emoji}</span>
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSelector;
