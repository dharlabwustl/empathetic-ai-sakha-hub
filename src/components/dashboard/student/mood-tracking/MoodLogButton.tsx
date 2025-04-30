
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodTheme } from './moodThemes';
import { MoodSelectionDialog } from './MoodSelectionDialog';
import { useToast } from '@/hooks/use-toast';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
}

const MoodLogButton = ({
  currentMood,
  onMoodChange,
  size = 'sm',
  showLabel = true,
  variant = 'outline'
}: MoodLogButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [localMood, setLocalMood] = useState<MoodType | undefined>(currentMood);
  const { toast } = useToast();

  useEffect(() => {
    if (currentMood !== undefined && currentMood !== localMood) {
      setLocalMood(currentMood);
    }
  }, [currentMood]);

  const handleMoodSelect = (mood: MoodType) => {
    setLocalMood(mood);
    if (onMoodChange) {
      onMoodChange(mood);
    }

    // Update global state by saving to localStorage
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
        
        // Update other mood components through a custom event
        const moodChangeEvent = new CustomEvent('moodChanged', { detail: { mood } });
        window.dispatchEvent(moodChangeEvent);
        
        toast({
          title: "Mood updated",
          description: `Your mood is now set to ${getMoodTheme(mood).label}`,
        });
      }
    } catch (error) {
      console.error("Error saving mood to localStorage:", error);
      toast({
        title: "Error updating mood",
        description: "Please try again",
        variant: "destructive"
      });
    }

    // Close the dialog after selection
    setDialogOpen(false);
  };

  const theme = getMoodTheme(localMood);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setDialogOpen(true)}
        className={`${
          localMood ? `${theme.colors.background} ${theme.colors.text}` : ''
        } flex items-center gap-1.5 transition-all duration-200`}
      >
        <span className="text-lg">{theme.emoji}</span>
        {showLabel && (
          <span className={localMood ? '' : 'text-foreground'}>
            {localMood ? theme.label : "Set Mood"}
          </span>
        )}
      </Button>

      <MoodSelectionDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedMood={localMood}
        onSelectMood={handleMoodSelect}
        setGlobalMood={onMoodChange}
      />
    </>
  );
};

export default MoodLogButton;
