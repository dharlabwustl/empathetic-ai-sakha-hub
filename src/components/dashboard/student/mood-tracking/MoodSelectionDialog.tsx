
import React from 'react';
import { MoodType } from "@/types/user/base";
import MoodOption from './MoodOption';
import { motion } from 'framer-motion';
import { 
  Smile, 
  SmilePlus, 
  Meh, 
  Frown, 
  AlertTriangle,
  BookOpen,
  Coffee,
  Lightbulb,
  BatteryCharging,
  Heart
} from "lucide-react";

export interface MoodSelectionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedMood,
  onSelectMood
}) => {
  if (!isOpen) return null;

  const moods: {type: MoodType, icon: React.ReactNode, label: string}[] = [
    { type: 'motivated', icon: <BatteryCharging size={24} />, label: 'Motivated' },
    { type: 'curious', icon: <Lightbulb size={24} />, label: 'Curious' },
    { type: 'neutral', icon: <Meh size={24} />, label: 'Neutral' },
    { type: 'tired', icon: <Coffee size={24} />, label: 'Tired' },
    { type: 'stressed', icon: <AlertTriangle size={24} />, label: 'Stressed' },
    { type: 'focused', icon: <BookOpen size={24} />, label: 'Focused' },
    { type: 'happy', icon: <Smile size={24} />, label: 'Happy' },
    { type: 'okay', icon: <SmilePlus size={24} />, label: 'Okay' },
    { type: 'overwhelmed', icon: <Frown size={24} />, label: 'Overwhelmed' },
    { type: 'sad', icon: <Heart size={24} />, label: 'Sad' }
  ];

  return (
    <div className="w-full">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-5 gap-4"
      >
        {moods.map((mood) => (
          <MoodOption
            key={mood.type}
            type={mood.type}
            icon={mood.icon}
            label={mood.label}
            isSelected={selectedMood === mood.type}
            onSelect={() => onSelectMood(mood.type)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MoodSelectionDialog;
