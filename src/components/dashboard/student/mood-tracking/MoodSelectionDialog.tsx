
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { getMoodEmoji, getMoodLabel } from "./moodUtils";

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
  const moods: { label: string; emoji: string; value: MoodType }[] = [
    { label: getMoodLabel(MoodType.HAPPY), emoji: getMoodEmoji(MoodType.HAPPY), value: MoodType.HAPPY },
    { label: getMoodLabel(MoodType.MOTIVATED), emoji: getMoodEmoji(MoodType.MOTIVATED), value: MoodType.MOTIVATED },
    { label: getMoodLabel(MoodType.FOCUSED), emoji: getMoodEmoji(MoodType.FOCUSED), value: MoodType.FOCUSED },
    { label: getMoodLabel(MoodType.NEUTRAL), emoji: getMoodEmoji(MoodType.NEUTRAL), value: MoodType.NEUTRAL },
    { label: getMoodLabel(MoodType.TIRED), emoji: getMoodEmoji(MoodType.TIRED), value: MoodType.TIRED },
    { label: getMoodLabel(MoodType.ANXIOUS), emoji: getMoodEmoji(MoodType.ANXIOUS), value: MoodType.ANXIOUS },
    { label: getMoodLabel(MoodType.STRESSED), emoji: getMoodEmoji(MoodType.STRESSED), value: MoodType.STRESSED },
    { label: getMoodLabel(MoodType.SAD), emoji: getMoodEmoji(MoodType.SAD), value: MoodType.SAD },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Logging your mood helps us personalize your study plan and recommendations.
          </p>
          <div className="grid grid-cols-4 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood.value}
                variant="outline"
                className={`flex flex-col items-center px-2 py-3 h-auto ${
                  selectedMood === mood.value ? "border-primary ring-1 ring-primary" : ""
                } hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200`}
                onClick={() => onSelectMood(mood.value)}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-muted-foreground mb-2">
              Your mood affects study recommendations and helps us optimize your learning experience.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
