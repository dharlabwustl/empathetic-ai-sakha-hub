
import React from 'react';
import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  progress: number;
  currentTest: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, currentTest }) => {
  // Don't show progress for intro or report screens
  if (currentTest === 'intro' || currentTest === 'report') {
    return null;
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full mt-2">
      <motion.div 
        className="h-full bg-gradient-to-r from-sky-500 to-violet-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ProgressIndicator;
