
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MoodTrackingProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  userName?: string;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({
  currentMood,
  onMoodChange,
  userName
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  // Define mood options with emojis and names
  const moodOptions = [
    { emoji: '😀', name: MoodType.HAPPY, label: 'Happy' },
    { emoji: '🔥', name: MoodType.MOTIVATED, label: 'Motivated' },
    { emoji: '🧠', name: MoodType.FOCUSED, label: 'Focused' },
    { emoji: '😐', name: MoodType.NEUTRAL, label: 'Neutral' },
    { emoji: '😴', name: MoodType.TIRED, label: 'Tired' },
    { emoji: '😰', name: MoodType.ANXIOUS, label: 'Anxious' },
    { emoji: '😓', name: MoodType.STRESSED, label: 'Stressed' },
    { emoji: '😔', name: MoodType.SAD, label: 'Sad' },
  ];
  
  const handleMoodSelect = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
      
      // Show toast message
      toast({
        title: "Mood updated",
        description: `Your mood has been set to ${getMoodLabel(mood).toLowerCase()}.`,
      });
      
      // Close the popover
      setIsOpen(false);
    }
  };
  
  const getMoodLabel = (mood?: MoodType): string => {
    if (!mood) return 'How are you feeling?';
    
    const option = moodOptions.find(option => option.name === mood);
    return option ? option.label : 'How are you feeling?';
  };
  
  const getMoodEmoji = (mood?: MoodType): string => {
    if (!mood) return '😊';
    
    const option = moodOptions.find(option => option.name === mood);
    return option ? option.emoji : '😊';
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white/50 border-gray-200 hover:bg-gray-100"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg" role="img" aria-label="mood">
              {getMoodEmoji(currentMood)}
            </span>
            <span className="text-sm hidden sm:block">
              {getMoodLabel(currentMood)}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-64 p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <h3 className="font-medium text-sm">How are you feeling, {userName || "there"}?</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleMoodSelect(option.name)}
                className={`flex flex-col items-center p-2 rounded-md transition-colors ${
                  currentMood === option.name
                    ? 'bg-blue-100 ring-2 ring-blue-400'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-xl" role="img" aria-label={option.label}>
                  {option.emoji}
                </span>
                <span className="text-xs mt-1">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoodTracking;
