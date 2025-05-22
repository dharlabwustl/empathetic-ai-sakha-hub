
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
      initial={{ boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.4), 0 2px 4px -1px rgba(124, 58, 237, 0.06)" }}
      animate={{ 
        boxShadow: [
          "0 4px 6px -1px rgba(99, 102, 241, 0.4), 0 2px 4px -1px rgba(124, 58, 237, 0.06)",
          "0 10px 15px -3px rgba(99, 102, 241, 0.5), 0 4px 6px -2px rgba(124, 58, 237, 0.1)",
          "0 4px 6px -1px rgba(99, 102, 241, 0.4), 0 2px 4px -1px rgba(124, 58, 237, 0.06)"
        ] 
      }}
      transition={{ 
        boxShadow: { 
          repeat: Infinity, 
          duration: 3 
        } 
      }}
    >
      <span className="mr-2">Analyze Your Exam Readiness</span>
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ArrowRight className="h-5 w-5" />
      </motion.div>
      
      {/* Subtle glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-sm -z-10"></div>
    </motion.button>
  );
};

export default PrimaryActionButton;
