
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoodType } from '@/types/user/base';
import { Smile, Frown, Zap, Loader2 } from 'lucide-react';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  loading?: boolean;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  currentMood,
  onMoodChange,
  loading = false,
  className = '',
  size = 'default'
}) => {
  // Function to get icon based on mood
  const getMoodIcon = () => {
    switch(currentMood) {
      case MoodType.HAPPY:
        return <Smile className="h-5 w-5 text-green-500" />;
      case MoodType.TIRED:
      case MoodType.STRESSED:
        return <Frown className="h-5 w-5 text-red-500" />;
      case MoodType.MOTIVATED:
      case MoodType.FOCUSED:
        return <Zap className="h-5 w-5 text-amber-500" />;
      default:
        return <Smile className="h-5 w-5" />;
    }
  };
  
  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={size}
          className={`flex items-center gap-2 ${className}`}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            getMoodIcon()
          )}
          <span className="hidden sm:inline">
            {currentMood ? `I'm feeling ${currentMood.toLowerCase()}` : "How are you feeling?"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleMoodChange(MoodType.HAPPY)}>
          <Smile className="mr-2 h-4 w-4 text-green-500" />
          Happy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodChange(MoodType.MOTIVATED)}>
          <Zap className="mr-2 h-4 w-4 text-amber-500" />
          Motivated
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodChange(MoodType.FOCUSED)}>
          <Zap className="mr-2 h-4 w-4 text-blue-500" />
          Focused
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodChange(MoodType.TIRED)}>
          <Frown className="mr-2 h-4 w-4 text-orange-500" />
          Tired
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleMoodChange(MoodType.STRESSED)}>
          <Frown className="mr-2 h-4 w-4 text-red-500" />
          Stressed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoodSelector;
