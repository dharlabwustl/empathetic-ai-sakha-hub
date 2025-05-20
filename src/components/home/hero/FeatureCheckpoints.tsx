
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const FeatureCheckpoints: React.FC = () => {
  const features = [
    "AI-Powered Personalized Learning", 
    "Concept Mastery Validation", 
    "Interactive Study Materials", 
    "Adaptive Performance Analytics"
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      {features.map((feature, index) => (
        <motion.div 
          key={index} 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{feature}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureCheckpoints;
