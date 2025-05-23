
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
      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Transform your exam journey with AI precision.</span> Our intelligent platform masters <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and every major Indian competitive exam. Experience personalized learning that adapts to your unique mindset and accelerates your path to success.
    </motion.p>
  );
};

export default HeroIntroText;
