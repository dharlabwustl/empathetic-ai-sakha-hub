
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const FeatureCheckpoints: React.FC = () => {
  const features = [
    "AI-powered personalized study plans",
    "Exam-specific practice questions",
    "Performance analytics & insights",
    "Mood-based learning optimizations"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
          className="flex items-center gap-2"
        >
          <div className="flex-shrink-0">
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="rounded-full bg-green-100 dark:bg-green-900/30 p-1 text-green-600 dark:text-green-400"
            >
              <CheckCircle size={16} className="fill-green-100 dark:fill-green-900/20" />
            </motion.div>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureCheckpoints;
