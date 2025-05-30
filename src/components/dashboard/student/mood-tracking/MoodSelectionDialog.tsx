
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel, getMoodColor } from './moodUtils';

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
  onSelectMood,
}) => {
  const moodOptions = [
    MoodType.HAPPY,
    MoodType.MOTIVATED,
    MoodType.FOCUSED,
    MoodType.CALM,
    MoodType.NEUTRAL,
    MoodType.OKAY,
    MoodType.CURIOUS,
    MoodType.TIRED,
    MoodType.CONFUSED,
    MoodType.STRESSED,
    MoodType.ANXIOUS,
    MoodType.OVERWHELMED,
    MoodType.SAD,
  ];

  const handleMoodSelect = (mood: MoodType) => {
    onSelectMood(mood);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30">
        <DialogHeader>
          <DialogTitle className="text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How are you feeling right now?
          </DialogTitle>
          <DialogDescription className="text-center">
            Your mood helps us personalize your study experience and adjust your daily plan.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-3 py-4">
          {moodOptions.map((mood) => {
            const isSelected = selectedMood === mood;
            const colorClass = getMoodColor(mood);
            
            return (
              <Button
                key={mood}
                variant={isSelected ? "default" : "outline"}
                onClick={() => handleMoodSelect(mood)}
                className={`flex flex-col items-center gap-2 h-auto py-4 transition-all duration-200 transform hover:scale-105 ${
                  isSelected 
                    ? `bg-${colorClass}-500 hover:bg-${colorClass}-600 text-white shadow-lg` 
                    : `hover:bg-${colorClass}-50 dark:hover:bg-${colorClass}-900/30 border-2 border-${colorClass}-200 dark:border-${colorClass}-700 shadow-md hover:shadow-lg`
                }`}
              >
                <span className="text-2xl">{getMoodEmoji(mood)}</span>
                <span className="text-xs font-medium text-center leading-tight">
                  {getMoodLabel(mood)}
                </span>
              </Button>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button variant="ghost" onClick={onClose} className="text-sm">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
