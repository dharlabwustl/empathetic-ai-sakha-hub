
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji } from './mood-tracking/moodUtils';
import { MoodSelectionDialog } from './mood-tracking/MoodSelectionDialog';
import { useToast } from '@/hooks/use-toast';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({
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
      
      // Show toast confirmation
      toast({
        title: "Mood Updated",
        description: `Your mood has been set to ${mood.toLowerCase()}`,
      });
      
      // Trigger custom event for other components to react to
      const moodChangeEvent = new CustomEvent('mood-changed', { 
        detail: { mood, timestamp: new Date().toISOString() } 
      });
      document.dispatchEvent(moodChangeEvent);
      
      // Also store the mood in localStorage for persistence
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const userObj = JSON.parse(userData);
          userObj.mood = mood;
          localStorage.setItem('userData', JSON.stringify(userObj));
        }
      } catch (e) {
        console.error("Failed to update mood in localStorage", e);
      }
    }
    handleCloseDialog();
  };
  
  const sizeClasses = {
    default: "text-base h-10 px-4",
    sm: "text-sm h-9 px-3",
    lg: "text-lg h-11 px-5",
    icon: "h-10 w-10 p-0"
  };
  
  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 ${sizeClasses[size]} ${className}`}
      >
        <span className="text-lg">{getMoodEmoji(currentMood)}</span>
        {showLabel && (
          <span className="hidden sm:inline">
            {currentMood ? `Feeling ${currentMood.toLowerCase()}` : "Log Mood"}
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

export default MoodLogButton;
