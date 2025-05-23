
import React from 'react';
import { motion } from 'framer-motion';

const ChallengesSection: React.FC = () => {
  const painPoints = [
    "Overwhelming syllabus",
    "Ineffective study techniques",
    "Lack of personalized guidance"
  ];
  
  return (
    <motion.div 
      className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Your Preparation Challenges</h3>
      <ul className="space-y-2">
        {painPoints.map((point, idx) => (
          <motion.li 
            key={idx}
            className="flex items-center text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
          >
            <span className="h-2 w-2 bg-red-500 rounded-full mr-2" />
            {point}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ChallengesSection;
