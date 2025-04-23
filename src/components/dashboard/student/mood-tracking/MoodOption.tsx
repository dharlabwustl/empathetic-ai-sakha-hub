
import React from 'react';
import { motion } from 'framer-motion';
import { MoodType } from '@/types/user/base';
import { getMoodColor } from './moodUtils';

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
  const moodColor = getMoodColor(type);
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className={`flex flex-col items-center justify-center p-3 rounded-lg w-full ${
        isSelected 
          ? `${moodColor} ring-2 ring-offset-2 ring-offset-background` 
          : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
      } transition-all`}
    >
      <div className={`p-2 rounded-full ${isSelected ? 'bg-white bg-opacity-30' : 'bg-white dark:bg-gray-700'}`}>
        {icon}
      </div>
      <span className={`mt-2 text-xs font-medium ${isSelected ? '' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </motion.button>
  );
};

export default MoodOption;
