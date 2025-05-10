
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { getMoodEmoji } from "./moodUtils";
import { MoodSelectionDialog } from "./MoodSelectionDialog";

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  buttonSize?: "sm" | "md" | "lg";
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({
  currentMood,
  onMoodChange,
  buttonSize = "md",
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    handleCloseDialog();
  };

  return (
    <>
      <Button
        variant="outline"
        size={buttonSize === "lg" ? "default" : buttonSize === "sm" ? "sm" : "sm"}
        onClick={handleOpenDialog}
        className="flex items-center gap-1.5"
      >
        <span className="text-lg">{getMoodEmoji(currentMood)}</span>
        <span className="hidden sm:inline">
          {currentMood ? `Feeling ${currentMood.toLowerCase()}` : "Log Mood"}
        </span>
      </Button>

      <MoodSelectionDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        selectedMood={currentMood}
        onSelectMood={handleMoodChange}
      />
    </>
  );
};

export default MoodLogButton;
