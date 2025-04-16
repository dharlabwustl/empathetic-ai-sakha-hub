
import React from "react";
import { motion } from "framer-motion";
import { MoodType } from "@/types/user/base";

interface MoodOptionProps {
  mood: MoodType;
  label: string;
  icon: React.ReactNode;
  color: string;
  selected: boolean;
  onSelect: () => void;
}

const MoodOption: React.FC<MoodOptionProps> = ({ 
  mood, label, icon, color, selected, onSelect 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border-2 ${color} ${
        selected ? 'ring-2 ring-offset-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      {icon}
      <span className="text-xs mt-2 font-medium">{label}</span>
    </motion.div>
  );
};

export default MoodOption;
