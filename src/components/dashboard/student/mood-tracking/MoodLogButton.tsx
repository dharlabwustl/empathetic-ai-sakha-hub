
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MoodType } from '@/types/user/base';
import { getMoodTheme, storeMoodInLocalStorage } from './moodUtils';
import { Smile, Heart, Brain, Coffee, AlertCircle, Lightbulb } from 'lucide-react';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

const moodOptions = [
  { mood: MoodType.HAPPY, emoji: '😊', icon: Smile, label: 'Happy' },
  { mood: MoodType.MOTIVATED, emoji: '💪', icon: Heart, label: 'Motivated' },
  { mood: MoodType.FOCUSED, emoji: '🎯', icon: Brain, label: 'Focused' },
  { mood: MoodType.CALM, emoji: '😌', icon: Heart, label: 'Calm' },
  { mood: MoodType.TIRED, emoji: '😴', icon: Coffee, label: 'Tired' },
  { mood: MoodType.CONFUSED, emoji: '🤔', icon: AlertCircle, label: 'Confused' },
  { mood: MoodType.ANXIOUS, emoji: '😰', icon: AlertCircle, label: 'Anxious' },
  { mood: MoodType.STRESSED, emoji: '😰', icon: AlertCircle, label: 'Stressed' },
  { mood: MoodType.OVERWHELMED, emoji: '😵', icon: AlertCircle, label: 'Overwhelmed' },
  { mood: MoodType.NEUTRAL, emoji: '😐', icon: Brain, label: 'Neutral' },
  { mood: MoodType.OKAY, emoji: '👌', icon: Smile, label: 'Okay' },
  { mood: MoodType.SAD, emoji: '😢', icon: Heart, label: 'Sad' },
  { mood: MoodType.CURIOUS, emoji: '🤔', icon: Lightbulb, label: 'Curious' },
  { mood: MoodType.CONFIDENT, emoji: '😎', icon: Heart, label: 'Confident' },
  { mood: MoodType.EXCITED, emoji: '🤩', icon: Heart, label: 'Excited' }
];

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ currentMood, onMoodChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMoodSelect = (mood: MoodType) => {
    onMoodChange(mood);
    storeMoodInLocalStorage(mood);
    setIsOpen(false);
  };

  const currentMoodOption = moodOptions.find(option => option.mood === currentMood);
  const theme = currentMood ? getMoodTheme(currentMood) : null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {currentMoodOption ? (
            <>
              <span>{currentMoodOption.emoji}</span>
              <Badge className={theme ? `${theme.background} ${theme.textColor}` : ''}>
                {currentMoodOption.label}
              </Badge>
            </>
          ) : (
            <>
              <Smile className="h-4 w-4" />
              Log Mood
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-3">
          {moodOptions.map((option) => (
            <Button
              key={option.mood}
              variant={currentMood === option.mood ? "default" : "outline"}
              onClick={() => handleMoodSelect(option.mood)}
              className="flex flex-col items-center p-4 h-auto gap-2"
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-xs">{option.label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodLogButton;
