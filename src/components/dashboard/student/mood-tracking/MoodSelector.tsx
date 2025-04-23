
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const moodEmojis: Record<MoodType, { emoji: string, label: string }> = {
  'happy': { emoji: '😊', label: 'Happy' },
  'sad': { emoji: '😔', label: 'Sad' },
  'neutral': { emoji: '😐', label: 'Neutral' },
  'motivated': { emoji: '💪', label: 'Motivated' },
  'tired': { emoji: '😴', label: 'Tired' },
  'stressed': { emoji: '😰', label: 'Stressed' },
  'focused': { emoji: '🧠', label: 'Focused' },
  'curious': { emoji: '🤔', label: 'Curious' },
  'overwhelmed': { emoji: '😩', label: 'Overwhelmed' },
  'okay': { emoji: '👍', label: 'Okay' }
};

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  currentMood, 
  onMoodSelect,
  size = 'md' 
}) => {
  // Filter to show only the most relevant moods to avoid cluttering the UI
  const displayMoods: MoodType[] = [
    'motivated', 'focused', 'happy', 'curious', 'neutral', 'tired', 'stressed', 'overwhelmed'
  ];
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8 text-sm';
      case 'lg':
        return 'h-12 w-12 text-xl';
      default:
        return 'h-10 w-10 text-base';
    }
  };

  const handleMoodSelect = (mood: MoodType) => {
    // Save mood to localStorage for persistence
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } else {
        localStorage.setItem("userData", JSON.stringify({ mood }));
      }
    } catch (error) {
      console.error("Error saving mood to localStorage:", error);
    }
    
    // Call the provided callback
    onMoodSelect(mood);
  };

  return (
    <div className="flex flex-wrap justify-center gap-1">
      {displayMoods.map((mood) => (
        <Button
          key={mood}
          type="button"
          variant={currentMood === mood ? "default" : "outline"}
          size="icon"
          className={cn(
            getSizeClasses(),
            "rounded-full transition-all",
            currentMood === mood && "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
          )}
          onClick={() => handleMoodSelect(mood)}
          title={moodEmojis[mood].label}
        >
          {moodEmojis[mood].emoji}
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
