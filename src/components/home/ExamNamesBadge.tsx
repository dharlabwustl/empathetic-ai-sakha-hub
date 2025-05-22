
import React from 'react';
import { motion } from 'framer-motion';

const ExamNamesBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex flex-wrap gap-2 mb-6"
    >
      <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800/30 px-3 py-1.5 rounded-full text-xs font-semibold text-orange-800 dark:text-orange-300">
        NEET
      </div>
      <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/30 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-800 dark:text-blue-300">
        JEE
      </div>
      <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800/30 px-3 py-1.5 rounded-full text-xs font-semibold text-green-800 dark:text-green-300">
        UPSC
      </div>
      <div className="bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/30 px-3 py-1.5 rounded-full text-xs font-semibold text-purple-800 dark:text-purple-300">
        CAT
      </div>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1"
      >
        <span className="animate-pulse">●</span> NEET is live now!
      </motion.div>
    </motion.div>
  );
};

export default ExamNamesBadge;
