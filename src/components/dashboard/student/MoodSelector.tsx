
import React from 'react';
import { MoodType } from '@/types/user/base';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { getMoodColor, getMoodEmoji, getMoodLabel } from './mood-tracking/moodUtils';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onMoodChange }) => {
  const moods = [
    MoodType.HAPPY, 
    MoodType.MOTIVATED, 
    MoodType.FOCUSED, 
    MoodType.TIRED,
    MoodType.STRESSED, 
    MoodType.ANXIOUS, 
    MoodType.NEUTRAL,
    MoodType.OKAY,
    MoodType.OVERWHELMED, 
    MoodType.CURIOUS, 
    MoodType.CALM,
    MoodType.SAD
  ];
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-dashed focus:ring-0"
        >
          <span className="text-lg">{getMoodEmoji(currentMood)}</span>
          <span>I'm feeling {getMoodLabel(currentMood)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">How are you feeling today?</h4>
          <div className="grid grid-cols-4 gap-2">
            {moods.map((mood) => (
              <Button
                key={mood}
                variant="outline"
                onClick={() => onMoodChange?.(mood)}
                className={`flex flex-col h-16 items-center justify-center gap-1 ${
                  currentMood === mood ? 'ring-2 ring-primary' : ''
                } ${getMoodColor(mood)}`}
              >
                <span className="text-xl">{getMoodEmoji(mood)}</span>
                <span className="text-xs">{getMoodLabel(mood)}</span>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoodSelector;
