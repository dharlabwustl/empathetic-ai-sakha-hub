
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// We'll remove this static array since we'll use the comprehensive list below
// const examNames = [
//   "JEE Main", "JEE Advanced", "CLAT", "UGC NET", "CTET", "Defence Exams", "State PSCs"
// ];

const ExamNamesBadge = () => {
  const isMobile = useIsMobile();
  
  // Animation variants for the exam badges
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg md:text-xl text-center font-medium text-gray-700 dark:text-gray-300 mb-4">
        Trusted by students preparing for:
      </h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap justify-center gap-2 md:gap-3 px-4 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-pink-100 dark:border-pink-800/30"
      >
        {/* No component here as we've removed the duplicative display */}
      </motion.div>
    </div>
  );
};

export default ExamNamesBadge;
