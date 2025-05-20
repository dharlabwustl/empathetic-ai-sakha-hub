
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const FeatureCheckpoints: React.FC = () => {
  const features = [
    "Personalized learning paths",
    "AI-powered doubt solver",
    "Mood-adaptive study plans",
    "Real-time progress tracking"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
        >
          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
            <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureCheckpoints;
