
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel, getMoodTheme } from './moodUtils';
import MoodSelectionDialog from './MoodSelectionDialog';
import { useToast } from '@/hooks/use-toast';

interface EnhancedMoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
  showLabel?: boolean;
}

const EnhancedMoodLogButton: React.FC<EnhancedMoodLogButtonProps> = ({
  currentMood,
  onMoodChange,
  className = '',
  size = "sm",
  showLabel = true,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
      
      toast({
        title: `Mood Updated: ${getMoodLabel(mood)}`,
        description: "Your study plan has been adjusted based on your mood",
        duration: 4000,
      });
    }
    handleCloseDialog();
  };
  
  const moodEmoji = getMoodEmoji(currentMood);
  const moodLabelText = currentMood 
    ? `Feeling ${getMoodLabel(currentMood)}` 
    : "Log Mood";
  
  const theme = getMoodTheme(currentMood);

  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 transition-all duration-300 hover:scale-105 ${theme.background} ${theme.border} ${className}`}
      >
        <span className="text-lg animate-pulse">{moodEmoji}</span>
        {showLabel && (
          <span className={`text-sm font-medium ${theme.accent}`}>
            {moodLabelText}
          </span>
        )}
      </Button>

      <MoodSelectionDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        selectedMood={currentMood}
        onSelectMood={handleMoodChange}
      />
    </>
  );
};

export default EnhancedMoodLogButton;
