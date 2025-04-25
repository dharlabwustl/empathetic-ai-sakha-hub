
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Smile, 
  Frown, 
  Meh, 
  ThumbsUp, 
  Flame 
} from "lucide-react";

interface MoodLogButtonProps {
  currentMood?: string;
  onMoodChange?: (mood: 'sad' | 'neutral' | 'happy' | 'motivated') => void;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ 
  currentMood = 'neutral', 
  onMoodChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<'sad' | 'neutral' | 'happy' | 'motivated'>(
    currentMood as 'sad' | 'neutral' | 'happy' | 'motivated'
  );

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMoodSelect = (mood: 'sad' | 'neutral' | 'happy' | 'motivated') => {
    setSelectedMood(mood);
    setIsOpen(false);
    
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    // Here you would typically store this in state/localStorage/backend
    console.log(`Mood selected: ${mood}`);
  };

  const getMoodIcon = (mood: string) => {
    switch(mood) {
      case 'sad':
        return <Frown className="h-5 w-5 text-blue-500" />;
      case 'neutral':
        return <Meh className="h-5 w-5 text-gray-500" />;
      case 'happy':
        return <Smile className="h-5 w-5 text-yellow-500" />;
      case 'motivated':
        return <Flame className="h-5 w-5 text-orange-500" />;
      default:
        return <Meh className="h-5 w-5 text-gray-500" />;
    }
  };

  const getMoodText = (mood: string) => {
    switch(mood) {
      case 'sad':
        return 'I need help';
      case 'neutral':
        return 'Okay';
      case 'happy':
        return 'Good';
      case 'motivated':
        return 'Motivated';
      default:
        return 'How are you feeling?';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 border-slate-200"
        onClick={toggleOpen}
      >
        {getMoodIcon(selectedMood)}
        <span>{getMoodText(selectedMood)}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 p-2 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-10 min-w-[200px]">
          <div className="flex flex-col gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => handleMoodSelect('sad')}
            >
              <Frown className="h-4 w-4 mr-2 text-blue-500" />
              I need help
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => handleMoodSelect('neutral')}
            >
              <Meh className="h-4 w-4 mr-2 text-gray-500" />
              Okay
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => handleMoodSelect('happy')}
            >
              <Smile className="h-4 w-4 mr-2 text-yellow-500" />
              Good
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => handleMoodSelect('motivated')}
            >
              <Flame className="h-4 w-4 mr-2 text-orange-500" />
              Motivated
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodLogButton;
