
import React from "react";
import { motion } from "framer-motion";
import { MoodType } from "@/types/user/base";

interface MoodOptionProps {
  type: MoodType;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

const MoodOption: React.FC<MoodOptionProps> = ({
  type,
  icon,
  label,
  isSelected,
  onSelect,
}) => {
  // Get the background color based on the mood type
  const getBgColor = () => {
    switch (type) {
      case "happy":
        return "bg-yellow-100 border-yellow-300";
      case "motivated":
        return "bg-purple-100 border-purple-300";
      case "focused":
        return "bg-blue-100 border-blue-300";
      case "curious":
        return "bg-teal-100 border-teal-300";
      case "neutral":
        return "bg-gray-100 border-gray-300";
      case "tired":
        return "bg-orange-100 border-orange-300";
      case "stressed":
        return "bg-red-100 border-red-300";
      case "sad":
        return "bg-indigo-100 border-indigo-300";
      case "overwhelmed":
        return "bg-pink-100 border-pink-300";
      case "okay":
        return "bg-sky-100 border-sky-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };
  
  // Get text color based on mood type
  const getTextColor = () => {
    switch (type) {
      case "happy":
        return "text-yellow-600";
      case "motivated":
        return "text-purple-600";
      case "focused":
        return "text-blue-600";
      case "curious":
        return "text-teal-600";
      case "neutral":
        return "text-gray-600";
      case "tired":
        return "text-orange-600";
      case "stressed":
        return "text-red-600";
      case "sad":
        return "text-indigo-600";
      case "overwhelmed":
        return "text-pink-600";
      case "okay":
        return "text-sky-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border-2 p-4 flex flex-col items-center ${getBgColor()} ${isSelected ? 'ring-2 ring-primary' : ''}`}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={isSelected ? { 
          scale: [1, 1.2, 1],
          transition: { 
            repeat: Infinity,
            repeatDelay: 2,
            duration: 0.6
          }
        } : { scale: 1 }}
        className={`mb-2 ${getTextColor()}`}
      >
        {icon}
      </motion.div>
      <p className={`text-sm font-medium ${getTextColor()}`}>{label}</p>
    </motion.div>
  );
};

export default MoodOption;
