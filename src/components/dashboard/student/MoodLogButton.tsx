
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoodType } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";
import { getMoodToastContent, saveMoodToLocalStorage, applyMoodTheme, getMoodDisplayName } from "./mood-tracking/moodUtils";
import { Crown, Heart, SmilePlus } from "lucide-react";

interface MoodOption {
  value: MoodType;
  icon: string;
  label: string;
}

interface MoodLogButtonProps {
  onMoodSelect?: (mood: MoodType) => void;
}

const moodOptions: MoodOption[] = [
  { value: 'happy', icon: '😊', label: 'Happy' },
  { value: 'sad', icon: '😔', label: 'Sad' },
  { value: 'neutral', icon: '😐', label: 'Neutral' },
  { value: 'motivated', icon: '💪', label: 'Motivated' },
  { value: 'tired', icon: '😴', label: 'Tired' },
  { value: 'stressed', icon: '😰', label: 'Stressed' },
  { value: 'focused', icon: '🧠', label: 'Focused' },
  { value: 'curious', icon: '🤔', label: 'Curious' },
  { value: 'overwhelmed', icon: '🥴', label: 'Overwhelmed' },
  { value: 'okay', icon: '👍', label: 'Okay' }
];

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ onMoodSelect }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSelectMood = (mood: MoodType) => {
    // Save the mood to localStorage
    saveMoodToLocalStorage(mood);
    
    // Apply mood theme to the body
    applyMoodTheme(mood);
    
    // Show toast notification
    toast({
      title: `Feeling ${getMoodDisplayName(mood)}`,
      description: getMoodToastContent(mood),
      variant: "default",
    });
    
    // Close the popover
    setOpen(false);
    
    // Call the callback if provided
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100 hover:border-purple-200 hover:from-purple-100 hover:to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20"
        >
          <SmilePlus className="mr-1 h-4 w-4 text-purple-500" />
          <span>Log Mood</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end">
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">How are you feeling today?</h4>
            <p className="text-xs text-muted-foreground">
              Your content will adapt to match your mood
            </p>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => handleSelectMood(option.value)}
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-xs mt-1">{option.label}</span>
              </button>
            ))}
          </div>
          
          <div className="pt-2 border-t text-xs flex items-center justify-between text-muted-foreground">
            <div className="flex items-center">
              <Heart className="h-3 w-3 mr-1 text-pink-500" />
              <span>Mood Tracking</span>
            </div>
            <div className="flex items-center">
              <Crown className="h-3 w-3 mr-1 text-amber-500" />
              <span>Premium Feature</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoodLogButton;
