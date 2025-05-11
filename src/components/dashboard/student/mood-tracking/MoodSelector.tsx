
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoodType } from "@/types/user/base";
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from "./moodUtils";

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  currentMood: propMood, 
  onMoodChange 
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType>(
    propMood || getCurrentMoodFromLocalStorage() || MoodType.Happy
  );

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
    
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  const getMoodEmoji = (mood: MoodType): string => {
    switch (mood) {
      case MoodType.Happy:
        return "😊";
      case MoodType.Sad:
        return "😔";
      case MoodType.Stressed:
        return "😰";
      case MoodType.Tired:
        return "😴";
      case MoodType.Motivated:
        return "💪";
      case MoodType.Focused:
        return "🧠";
      case MoodType.Confused:
        return "😕";
      case MoodType.Overwhelmed:
        return "😫";
      default:
        return "😐";
    }
  };

  const getMoodLabel = (mood: MoodType): string => {
    return mood.toString();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 rounded-full px-3 h-9">
          <span className="text-lg">{getMoodEmoji(currentMood)}</span>
          <span className="text-sm font-medium">{getMoodLabel(currentMood)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(MoodType).map((mood) => (
          <DropdownMenuItem 
            key={mood}
            onClick={() => handleMoodChange(mood)}
            className="gap-2 cursor-pointer"
          >
            <span className="text-lg">{getMoodEmoji(mood as MoodType)}</span>
            <span>{getMoodLabel(mood as MoodType)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
