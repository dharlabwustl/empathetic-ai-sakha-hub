
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji } from './mood-tracking/moodUtils';
import { MoodSelectionDialog } from './mood-tracking/MoodSelectionDialog';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({
  currentMood,
  onMoodChange,
  className = '',
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    handleCloseDialog();
  };
  
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenDialog}
        className={`flex items-center gap-1.5 ${className}`}
      >
        <span className="text-lg">{getMoodEmoji(currentMood)}</span>
        <span className="hidden sm:inline">
          {currentMood ? `Feeling ${currentMood.toLowerCase()}` : "Log Mood"}
        </span>
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
