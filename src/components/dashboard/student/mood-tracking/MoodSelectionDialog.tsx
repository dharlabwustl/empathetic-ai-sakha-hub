
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { getMoodEmoji } from "./moodUtils";

interface MoodSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

// Export the component directly without using default export
export const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedMood,
  onSelectMood,
}) => {
  const moods: { label: string; emoji: string; value: MoodType }[] = [
    { label: "Happy", emoji: getMoodEmoji(MoodType.Happy), value: MoodType.Happy },
    { label: "Motivated", emoji: getMoodEmoji(MoodType.Motivated), value: MoodType.Motivated },
    { label: "Focused", emoji: getMoodEmoji(MoodType.Focused), value: MoodType.Focused },
    { label: "Neutral", emoji: getMoodEmoji(MoodType.Neutral), value: MoodType.Neutral },
    { label: "Tired", emoji: getMoodEmoji(MoodType.Tired), value: MoodType.Tired },
    { label: "Anxious", emoji: getMoodEmoji(MoodType.Anxious), value: MoodType.Anxious },
    { label: "Stressed", emoji: getMoodEmoji(MoodType.Stressed), value: MoodType.Stressed },
    { label: "Sad", emoji: getMoodEmoji(MoodType.Sad), value: MoodType.Sad },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Logging your mood helps us personalize your study plan.
          </p>
          <div className="grid grid-cols-4 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood.value}
                variant="outline"
                className={`flex flex-col items-center px-2 py-3 h-auto ${
                  selectedMood === mood.value ? "border-primary ring-1 ring-primary" : ""
                }`}
                onClick={() => onSelectMood(mood.value)}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Also export as default for backward compatibility
export default MoodSelectionDialog;
