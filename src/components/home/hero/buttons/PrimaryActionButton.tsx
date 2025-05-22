
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PrimaryActionButtonProps {
  onAnalyzeClick?: () => void;
}

const PrimaryActionButton: React.FC<PrimaryActionButtonProps> = ({ onAnalyzeClick }) => {
  return (
    <div className="relative">
      {/* Animated ring effect */}
      <motion.div 
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600/60 to-blue-600/60 blur-md opacity-70 -z-10"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Button itself with enhanced hover effects */}
      <motion.button
        onClick={onAnalyzeClick}
        className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-5 sm:px-8 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center text-sm sm:text-base overflow-hidden"
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
        {/* Sparkles animation top left */}
        <motion.div 
          className="absolute top-1 left-2"
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <Sparkles className="h-3 w-3 text-yellow-300" />
        </motion.div>
        
        {/* Button text and icon */}
        <span className="mr-2 relative z-10">Analyze Your Exam Readiness</span>
        <motion.div
          animate={{ x: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="relative z-10"
        >
          <ArrowRight className="h-5 w-5" />
        </motion.div>
        
        {/* Sparkles animation bottom right */}
        <motion.div 
          className="absolute bottom-1 right-2"
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1.5,
            delay: 1
          }}
        >
          <Sparkles className="h-3 w-3 text-yellow-300" />
        </motion.div>
        
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent rounded-full" />
      </motion.button>
    </div>
  );
};

export default PrimaryActionButton;
