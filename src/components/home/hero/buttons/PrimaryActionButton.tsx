
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
      className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-5 sm:px-7 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center text-sm sm:text-base"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)" }}
      animate={{
        boxShadow: ["0 4px 14px rgba(99, 102, 241, 0.4)", "0 6px 20px rgba(99, 102, 241, 0.6)", "0 4px 14px rgba(99, 102, 241, 0.4)"],
      }}
      transition={{ 
        boxShadow: { duration: 2, repeat: Infinity },
      }}
    >
      <span className="mr-2">Analyze Your Exam Readiness</span>
      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowRight className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
};

export default PrimaryActionButton;
