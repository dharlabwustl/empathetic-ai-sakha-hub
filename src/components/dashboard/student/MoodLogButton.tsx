
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji } from './mood-tracking/moodUtils';
import { MoodSelectionDialog } from './mood-tracking/MoodSelectionDialog';
import { useToast } from '@/hooks/use-toast';
import { SmilePlus } from 'lucide-react';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
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
        description: `Your mood has been set to ${mood.toLowerCase()}.`,
      });
      
      // Store mood in localStorage for persistence
      localStorage.setItem('current_mood', mood);
      
      // Record mood in history for tracking
      const now = new Date().toISOString();
      const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
      moodHistory.push({ mood, timestamp: now });
      localStorage.setItem('mood_history', JSON.stringify(moodHistory.slice(-50))); // Keep last 50 entries
      
      // Trigger custom event for other components to react to
      const moodChangeEvent = new CustomEvent('mood-changed', { 
        detail: { mood, timestamp: now } 
      });
      document.dispatchEvent(moodChangeEvent);
      
      // Update user data
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          parsedData.mood = mood;
          localStorage.setItem('userData', JSON.stringify(parsedData));
        }
      } catch (e) {
        console.error('Error updating mood in user data:', e);
      }
    }
    handleCloseDialog();
  };
  
  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 ${className}`}
      >
        <SmilePlus className="h-4 w-4" />
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
