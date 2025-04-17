
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile, Sun, Cloud, Wind, Battery, Target, Heart, Clock, AlertCircle, ThumbsUp } from "lucide-react";
import { MoodType } from "@/types/user/base";
import MoodSelectionDialog from "./MoodSelectionDialog";
import { motion } from "framer-motion";
import { getMoodDisplayName, getMoodColor, getMoodIcon } from "./moodUtils";

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({ currentMood, onMoodChange }) => {
  const [showMoodDialog, setShowMoodDialog] = useState(false);

  const handleClose = () => {
    setShowMoodDialog(false);
  };

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMoodDialog(true)}
          className={`transition-all ${getMoodColor(currentMood)} shadow-sm border rounded-full px-4 py-2`}
        >
          {getMoodIcon(currentMood)}
          <span>{getMoodDisplayName(currentMood)}</span>
        </Button>
      </motion.div>
      
      <MoodSelectionDialog 
        isOpen={showMoodDialog}
        onClose={handleClose}
        selectedMood={currentMood}
        onSelectMood={(mood) => {
          onMoodChange(mood);
          setShowMoodDialog(false);
        }}
      />
    </>
  );
};

export default MoodLogButton;
