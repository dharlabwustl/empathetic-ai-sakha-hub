
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const FeatureCheckpoints = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
      className="mt-6"
    >
      <div className="flex justify-center space-x-4 md:space-x-8 text-sm md:text-base">
        <div className="flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-gray-600 dark:text-gray-400">AI-Powered</span>
        </div>
        <div className="flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-gray-600 dark:text-gray-400">24/7 Support</span>
        </div>
        <div className="flex items-center">
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-gray-600 dark:text-gray-400">Stress-Free</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCheckpoints;
