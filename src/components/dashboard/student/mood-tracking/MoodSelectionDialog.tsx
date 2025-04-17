
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MoodType } from "@/types/user/base";
import { motion } from "framer-motion";
import MoodOption from "./MoodOption";
import { Smile, Sparkles, Clock, Battery, Wind, Target, Heart, ThumbsUp, AlertCircle, Cloud } from "lucide-react";

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
  const moods: Array<{ type: MoodType; icon: React.ReactNode; label: string }> = [
    { type: "motivated", icon: <Sparkles className="h-6 w-6" />, label: "Motivated" },
    { type: "curious", icon: <Smile className="h-6 w-6" />, label: "Curious" },
    { type: "neutral", icon: <ThumbsUp className="h-6 w-6" />, label: "Neutral" },
    { type: "tired", icon: <Battery className="h-6 w-6" />, label: "Tired" },
    { type: "stressed", icon: <Wind className="h-6 w-6" />, label: "Stressed" },
    { type: "focused", icon: <Target className="h-6 w-6" />, label: "Focused" },
    { type: "happy", icon: <Heart className="h-6 w-6" />, label: "Happy" },
    { type: "okay", icon: <Clock className="h-6 w-6" />, label: "Okay" },
    { type: "overwhelmed", icon: <AlertCircle className="h-6 w-6" />, label: "Overwhelmed" },
    { type: "sad", icon: <Cloud className="h-6 w-6" />, label: "Sad" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="dialog-content sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">How are you feeling today?</DialogTitle>
        </DialogHeader>
        
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {moods.map((mood) => (
            <motion.div key={mood.type} variants={childVariants}>
              <MoodOption
                type={mood.type}
                icon={mood.icon}
                label={mood.label}
                isSelected={selectedMood === mood.type}
                onSelect={() => onSelectMood(mood.type)}
              />
            </motion.div>
          ))}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
