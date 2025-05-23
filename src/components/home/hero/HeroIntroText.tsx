
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
      <span className="font-semibold">From struggling student to exam champion</span> - our AI-driven platform is specially designed for Indian competitive exams like <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and more. Your personalized pathway to success starts here.
    </motion.p>
  );
};

export default HeroIntroText;
