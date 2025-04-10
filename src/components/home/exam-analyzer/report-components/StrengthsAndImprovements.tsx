
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface StrengthsAndImprovementsProps {
  strengths: string[];
  improvements: string[];
}

const StrengthsAndImprovements: React.FC<StrengthsAndImprovementsProps> = ({ strengths, improvements }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border-2 border-green-100 dark:border-green-800/50 p-5 shadow-md"
      >
        <h4 className="flex items-center text-green-700 dark:text-green-400 font-medium mb-4">
          <div className="p-2 mr-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          Your Strengths
        </h4>
        
        <ul className="space-y-2">
          {strengths.map((strength, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm">{strength}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border-2 border-amber-100 dark:border-amber-800/50 p-5 shadow-md"
      >
        <h4 className="flex items-center text-amber-700 dark:text-amber-400 font-medium mb-4">
          <div className="p-2 mr-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          Areas for Improvement
        </h4>
        
        <ul className="space-y-2">
          {improvements.map((improvement, i) => (
            <li key={i} className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm">{improvement}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default StrengthsAndImprovements;
