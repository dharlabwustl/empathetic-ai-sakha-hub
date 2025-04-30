
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Smile, Frown, ThumbsUp, MessagesSquare } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoodType } from '@/types/user/base';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const moods = [
  {
    value: 'happy' as MoodType,
    label: 'Happy',
    emoji: '😊',
    description: "I'm feeling good"
  },
  {
    value: 'motivated' as MoodType,
    label: 'Motivated',
    emoji: '💪',
    description: "Ready to learn!"
  },
  {
    value: 'neutral' as MoodType,
    label: 'Neutral',
    emoji: '😐',
    description: "I'm okay"
  },
  {
    value: 'curious' as MoodType,
    label: 'Curious',
    emoji: '🧐',
    description: "Exploring new ideas"
  },
  {
    value: 'overwhelmed' as MoodType,
    label: 'Overwhelmed',
    emoji: '😰',
    description: "It's a lot to handle"
  },
  {
    value: 'anxious' as MoodType,
    label: 'Anxious',
    emoji: '😟',
    description: "Feeling nervous"
  },
  {
    value: 'sad' as MoodType,
    label: 'Sad',
    emoji: '😢',
    description: "Not feeling great"
  },
  {
    value: 'okay' as MoodType,
    label: 'Just Okay',
    emoji: '🙂',
    description: "Getting by"
  },
];

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ currentMood, onMoodChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleMoodSelect = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    setIsOpen(false);
    
    // Here you could also save to localStorage or call an API
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    } else {
      localStorage.setItem('userData', JSON.stringify({ mood }));
    }
  };
  
  const getCurrentMoodLabel = () => {
    if (!currentMood) return "Log Mood";
    const mood = moods.find(m => m.value === currentMood);
    return mood ? `${mood.emoji} ${mood.label}` : "Log Mood";
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
        >
          {currentMood ? (
            <>
              {moods.find(m => m.value === currentMood)?.emoji || <Smile className="h-4 w-4" />}
              <span>{moods.find(m => m.value === currentMood)?.label || "How are you?"}</span>
            </>
          ) : (
            <>
              <Smile className="h-4 w-4" />
              <span>How are you?</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="font-medium">How are you feeling today?</h4>
            <p className="text-sm text-muted-foreground">Logging your mood helps personalize your learning experience</p>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors ${
                  currentMood === mood.value ? 'bg-primary/10 border border-primary/20' : ''
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs mt-1">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoodLogButton;
