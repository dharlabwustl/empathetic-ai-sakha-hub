
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

const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedMood,
  onSelectMood,
}) => {
  const moods: { label: string; emoji: string; value: MoodType; bgColor: string }[] = [
    { 
      label: getMoodLabel(MoodType.HAPPY), 
      emoji: getMoodEmoji(MoodType.HAPPY), 
      value: MoodType.HAPPY,
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 dark:from-yellow-900/20 dark:to-yellow-900/30"
    },
    { 
      label: getMoodLabel(MoodType.MOTIVATED), 
      emoji: getMoodEmoji(MoodType.MOTIVATED), 
      value: MoodType.MOTIVATED,
      bgColor: "bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 dark:from-green-900/20 dark:to-green-900/30"
    },
    { 
      label: getMoodLabel(MoodType.FOCUSED), 
      emoji: getMoodEmoji(MoodType.FOCUSED), 
      value: MoodType.FOCUSED,
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 dark:from-blue-900/20 dark:to-blue-900/30"
    },
    { 
      label: getMoodLabel(MoodType.NEUTRAL), 
      emoji: getMoodEmoji(MoodType.NEUTRAL), 
      value: MoodType.NEUTRAL,
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 dark:from-gray-800/30 dark:to-gray-800/40"
    },
    { 
      label: getMoodLabel(MoodType.TIRED), 
      emoji: getMoodEmoji(MoodType.TIRED), 
      value: MoodType.TIRED,
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 dark:from-orange-900/20 dark:to-orange-900/30"
    },
    { 
      label: getMoodLabel(MoodType.ANXIOUS), 
      emoji: getMoodEmoji(MoodType.ANXIOUS), 
      value: MoodType.ANXIOUS,
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 dark:from-purple-900/20 dark:to-purple-900/30"
    },
    { 
      label: getMoodLabel(MoodType.STRESSED), 
      emoji: getMoodEmoji(MoodType.STRESSED), 
      value: MoodType.STRESSED,
      bgColor: "bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 dark:from-red-900/20 dark:to-red-900/30"
    },
    { 
      label: getMoodLabel(MoodType.SAD), 
      emoji: getMoodEmoji(MoodType.SAD), 
      value: MoodType.SAD,
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 dark:from-indigo-900/20 dark:to-indigo-900/30"
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-md premium-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 pb-1">
            How are you feeling today?
          </DialogTitle>
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
                className={`flex flex-col items-center px-2 py-3 h-auto shadow-sm premium-button ${mood.bgColor} ${
                  selectedMood === mood.value ? "border-primary ring-2 ring-primary dark:ring-primary/70" : "border-transparent"
                } hover:scale-105 transform transition-all duration-200`}
                onClick={() => onSelectMood(mood.value)}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs font-medium">{mood.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50 premium-card">
              <p className="text-xs text-blue-600 dark:text-blue-300 font-medium mb-2">
                Benefits of mood tracking:
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>Personalized study plans that adapt to your mental state</span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>Optimal study recommendations based on your energy levels</span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>Insights into your learning patterns and productivity cycles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
