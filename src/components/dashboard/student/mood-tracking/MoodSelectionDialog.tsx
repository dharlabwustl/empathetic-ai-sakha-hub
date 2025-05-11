
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MoodType } from '@/types/user/base';
import MoodSelector from '../MoodSelector';

interface MoodSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

export const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedMood,
  onSelectMood
}) => {
  const handleMoodSelect = (mood: MoodType) => {
    onSelectMood(mood);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <MoodSelector
            currentMood={selectedMood}
            onMoodSelect={handleMoodSelect}
            className="justify-center"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
