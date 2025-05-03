
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Smile, Frown, Meh, ThumbsUp, Brain, Cloud } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { MoodType } from '@/types/user/base';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ 
  currentMood, 
  onMoodChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleMoodSelect = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
      
      // Store the mood in localStorage
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          parsedUserData.mood = mood;
          localStorage.setItem('userData', JSON.stringify(parsedUserData));
        } else {
          localStorage.setItem('userData', JSON.stringify({ mood }));
        }
        console.log('Mood saved:', mood);
      } catch (error) {
        console.error('Error saving mood to localStorage:', error);
      }
    }
    setIsOpen(false);
  };
  
  const getMoodIcon = () => {
    switch(currentMood) {
      case MoodType.HAPPY:
        return <Smile className="h-4 w-4 mr-1" />;
      case MoodType.SAD:
        return <Frown className="h-4 w-4 mr-1" />;
      case MoodType.NEUTRAL:
        return <Meh className="h-4 w-4 mr-1" />;
      case MoodType.MOTIVATED:
        return <ThumbsUp className="h-4 w-4 mr-1" />;
      case MoodType.FOCUSED:
        return <Brain className="h-4 w-4 mr-1" />;
      case MoodType.ANXIOUS:
        return <Cloud className="h-4 w-4 mr-1" />;
      default:
        return <Smile className="h-4 w-4 mr-1" />;
    }
  };
  
  const getMoodLabel = () => {
    if (!currentMood) return 'Log Mood';
    return `Feeling ${currentMood.toLowerCase()}`;
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`flex items-center ${className}`}
        >
          {getMoodIcon()}
          {getMoodLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <h4 className="font-medium mb-3">How are you feeling today?</h4>
        <div className="grid grid-cols-3 gap-2">
          <MoodButton mood={MoodType.HAPPY} icon={<Smile />} onClick={handleMoodSelect} />
          <MoodButton mood={MoodType.NEUTRAL} icon={<Meh />} onClick={handleMoodSelect} />
          <MoodButton mood={MoodType.SAD} icon={<Frown />} onClick={handleMoodSelect} />
          <MoodButton mood={MoodType.MOTIVATED} icon={<ThumbsUp />} onClick={handleMoodSelect} />
          <MoodButton mood={MoodType.FOCUSED} icon={<Brain />} onClick={handleMoodSelect} />
          <MoodButton mood={MoodType.ANXIOUS} icon={<Cloud />} onClick={handleMoodSelect} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface MoodButtonProps {
  mood: MoodType;
  icon: React.ReactNode;
  onClick: (mood: MoodType) => void;
}

const MoodButton: React.FC<MoodButtonProps> = ({ mood, icon, onClick }) => {
  return (
    <Button 
      variant="outline"
      className="flex flex-col items-center justify-center p-2 h-auto"
      onClick={() => onClick(mood)}
    >
      <span className="text-lg mb-1">{icon}</span>
      <span className="text-xs capitalize">{mood.toLowerCase()}</span>
    </Button>
  );
};

export default MoodLogButton;
