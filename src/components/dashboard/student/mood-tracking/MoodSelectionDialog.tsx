
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { getMoodEmoji } from "./moodUtils";

interface MoodSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMood: (mood: MoodType) => void;
  currentMood?: MoodType | null;
}

const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onClose,
  onSelectMood,
  currentMood
}) => {
  const moods = [
    { type: MoodType.Happy, label: "Happy", description: "Feeling good and positive" },
    { type: MoodType.Motivated, label: "Motivated", description: "Ready to accomplish goals" },
    { type: MoodType.Focused, label: "Focused", description: "Concentrated and attentive" },
    { type: MoodType.Neutral, label: "Neutral", description: "Neither particularly good nor bad" },
    { type: MoodType.Tired, label: "Tired", description: "Low energy and fatigued" },
    { type: MoodType.Confused, label: "Confused", description: "Uncertain or unclear about concepts" },
    { type: MoodType.Anxious, label: "Anxious", description: "Worried or nervous" },
    { type: MoodType.Stressed, label: "Stressed", description: "Under pressure or overwhelmed" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">How are you feeling today?</DialogTitle>
          <DialogDescription className="text-center">
            Select your current mood to get personalized study recommendations
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
          {moods.map(mood => (
            <Button
              key={mood.type}
              variant="outline"
              className={`flex flex-col items-center h-auto py-3 px-2 gap-2 transition-all ${
                currentMood === mood.type ? 
                'bg-primary/10 border-primary' : 
                'hover:bg-primary/5'
              }`}
              onClick={() => onSelectMood(mood.type)}
            >
              <span className="text-2xl">{getMoodEmoji(mood.type)}</span>
              <div className="text-center">
                <div className="font-medium">{mood.label}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{mood.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
