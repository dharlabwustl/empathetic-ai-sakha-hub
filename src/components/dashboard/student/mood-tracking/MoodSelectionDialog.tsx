
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji } from './moodUtils';

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
  // Define the moods to display in the dialog
  const moods = [
    { type: MoodType.HAPPY, label: 'Happy' },
    { type: MoodType.MOTIVATED, label: 'Motivated' },
    { type: MoodType.FOCUSED, label: 'Focused' },
    { type: MoodType.CALM, label: 'Calm' },
    { type: MoodType.NEUTRAL, label: 'Neutral' },
    { type: MoodType.OKAY, label: 'Okay' },
    { type: MoodType.CURIOUS, label: 'Curious' },
    { type: MoodType.TIRED, label: 'Tired' },
    { type: MoodType.CONFUSED, label: 'Confused' },
    { type: MoodType.SAD, label: 'Sad' },
    { type: MoodType.ANXIOUS, label: 'Anxious' },
    { type: MoodType.STRESSED, label: 'Stressed' },
    { type: MoodType.OVERWHELMED, label: 'Overwhelmed' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling?</DialogTitle>
          <DialogDescription>
            Select your current mood to help us personalize your study experience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-4">
          {moods.map(mood => (
            <Button
              key={mood.type}
              variant={selectedMood === mood.type ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-24 gap-2"
              onClick={() => onSelectMood(mood.type)}
            >
              <span className="text-2xl">{getMoodEmoji(mood.type)}</span>
              <span className="text-xs">{mood.label}</span>
            </Button>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
