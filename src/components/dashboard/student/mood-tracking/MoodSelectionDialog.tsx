
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel } from './moodUtils';

interface MoodSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedMood,
  onSelectMood
}) => {
  const moodOptions = [
    { type: MoodType.Happy, label: 'Happy', color: 'bg-yellow-100 text-yellow-800' },
    { type: MoodType.Motivated, label: 'Motivated', color: 'bg-blue-100 text-blue-800' },
    { type: MoodType.Focused, label: 'Focused', color: 'bg-purple-100 text-purple-800' },
    { type: MoodType.Calm, label: 'Calm', color: 'bg-green-100 text-green-800' },
    { type: MoodType.Neutral, label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
    { type: MoodType.Okay, label: 'Okay', color: 'bg-blue-100 text-blue-800' },
    { type: MoodType.Curious, label: 'Curious', color: 'bg-orange-100 text-orange-800' },
    { type: MoodType.Tired, label: 'Tired', color: 'bg-yellow-100 text-yellow-800' },
    { type: MoodType.Confused, label: 'Confused', color: 'bg-gray-100 text-gray-800' },
    { type: MoodType.Stressed, label: 'Stressed', color: 'bg-red-100 text-red-800' },
    { type: MoodType.Anxious, label: 'Anxious', color: 'bg-red-100 text-red-800' },
    { type: MoodType.Overwhelmed, label: 'Overwhelmed', color: 'bg-red-100 text-red-800' },
    { type: MoodType.Sad, label: 'Sad', color: 'bg-blue-100 text-blue-800' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling?</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-3 py-4">
          {moodOptions.map((mood) => (
            <Button
              key={mood.type}
              variant={selectedMood === mood.type ? "default" : "outline"}
              onClick={() => onSelectMood(mood.type)}
              className="flex flex-col items-center p-4 h-auto gap-2"
            >
              <span className="text-2xl">{getMoodEmoji(mood.type)}</span>
              <span className="text-sm">{mood.label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
