
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { getMoodSuggestion } from './moodUtils';

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
  onSelectMood,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
          <DialogDescription>
            Select your current mood to help personalize your study experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <MoodSelector currentMood={selectedMood} onMoodSelect={onSelectMood} />
          
          {selectedMood && (
            <div className="mt-6 p-4 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
              <h4 className="font-medium mb-2">Study Suggestion</h4>
              <p>{getMoodSuggestion(selectedMood)}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">Close</Button>
          </DialogClose>
          <Button 
            disabled={!selectedMood} 
            onClick={() => {
              if (selectedMood) {
                onSelectMood(selectedMood);
              }
              onClose();
            }}
          >
            Save Mood
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
