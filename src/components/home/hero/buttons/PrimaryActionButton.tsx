
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PrimaryActionButtonProps {
  onAnalyzeClick?: () => void;
}

const PrimaryActionButton: React.FC<PrimaryActionButtonProps> = ({ onAnalyzeClick }) => {
  return (
    <motion.button
      onClick={onAnalyzeClick}
      className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="mr-2">Analyze Your Exam Readiness</span>
      <ArrowRight className="h-5 w-5" />
    </motion.button>
  );
};

export default PrimaryActionButton;
