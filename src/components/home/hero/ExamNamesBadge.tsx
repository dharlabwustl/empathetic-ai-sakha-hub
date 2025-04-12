
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const examNames = [
  "NEET", "JEE Main", "JEE Advanced", "UPSC", "CAT", 
  "GATE", "CLAT", "UGC NET", "CTET", "Bank Exams", 
  "SSC", "Defence Exams", "State PSCs"
];

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
        className="flex flex-wrap justify-center gap-2 md:gap-3 px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-sm border border-violet-100 dark:border-violet-800/30"
      >
        {examNames.map((exam, index) => (
          <motion.span
            key={index}
            variants={item}
            className="px-3 py-1 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/40 dark:to-indigo-900/40 text-violet-800 dark:text-violet-300 text-sm md:text-base font-medium rounded-full shadow-sm border border-violet-200/50 dark:border-violet-700/30"
          >
            {exam}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default ExamNamesBadge;
