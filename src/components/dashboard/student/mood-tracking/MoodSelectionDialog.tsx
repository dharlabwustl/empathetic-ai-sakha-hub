
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';

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
  const moods = [
    { name: 'Happy', emoji: '😊', value: MoodType.HAPPY },
    { name: 'Motivated', emoji: '💪', value: MoodType.MOTIVATED },
    { name: 'Focused', emoji: '🧠', value: MoodType.FOCUSED },
    { name: 'Neutral', emoji: '😐', value: MoodType.NEUTRAL },
    { name: 'Tired', emoji: '😴', value: MoodType.TIRED },
    { name: 'Anxious', emoji: '😰', value: MoodType.ANXIOUS },
    { name: 'Stressed', emoji: '😓', value: MoodType.STRESSED },
    { name: 'Sad', emoji: '😢', value: MoodType.SAD },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-3 py-4">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              onClick={() => onSelectMood(mood.value)}
              variant={selectedMood === mood.value ? "default" : "outline"}
              className="flex flex-col py-3 h-auto gap-1"
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs">{mood.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
