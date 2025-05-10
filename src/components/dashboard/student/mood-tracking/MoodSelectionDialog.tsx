
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { getMoodEmoji, getMoodLabel } from "./moodUtils";

interface MoodOption {
  mood: MoodType;
  emoji: string;
  label: string;
}

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
  const moodOptions: MoodOption[] = [
    { mood: MoodType.Happy, emoji: "😊", label: "Happy" },
    { mood: MoodType.Motivated, emoji: "💪", label: "Motivated" },
    { mood: MoodType.Focused, emoji: "🧠", label: "Focused" },
    { mood: MoodType.Calm, emoji: "😌", label: "Calm" },
    { mood: MoodType.Curious, emoji: "🤔", label: "Curious" },
    { mood: MoodType.Okay, emoji: "😐", label: "Okay" },
    { mood: MoodType.Tired, emoji: "😴", label: "Tired" },
    { mood: MoodType.Stressed, emoji: "😰", label: "Stressed" },
    { mood: MoodType.Anxious, emoji: "😨", label: "Anxious" },
    { mood: MoodType.Overwhelmed, emoji: "🥴", label: "Overwhelmed" },
    { mood: MoodType.Sad, emoji: "😢", label: "Sad" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
          <DialogDescription>
            Select your current mood to help us personalize your learning experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
          {moodOptions.map((option) => (
            <Button
              key={option.mood}
              variant={selectedMood === option.mood ? "default" : "outline"}
              className={`flex flex-col py-6 h-auto ${selectedMood === option.mood ? "border-2 border-primary" : ""}`}
              onClick={() => onSelectMood(option.mood)}
            >
              <span className="text-2xl mb-2">{option.emoji}</span>
              <span className="text-xs font-medium">{option.label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
