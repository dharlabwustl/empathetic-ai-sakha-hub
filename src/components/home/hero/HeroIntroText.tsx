
import React from 'react';
import { motion } from 'framer-motion';

const HeroIntroText: React.FC = () => {
  return (
    <motion.p 
      className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <span className="font-semibold">From aspiration to achievement</span> - our precision-engineered AI platform transforms your exam preparation for <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and beyond. Your accelerated path to excellence begins now.
    </motion.p>
  );
};

export default HeroIntroText;
