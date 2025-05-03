
import React from 'react';
import { motion } from 'framer-motion';
import { TestType } from './types';

interface ProgressIndicatorProps {
  progress: number;
  currentTest: TestType;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, currentTest }) => {
  const renderStep = (step: TestType, label: string, percentage: number) => {
    const isActive = currentTest === step || progress >= percentage;
    const isPast = progress > percentage;
    const isCurrent = currentTest === step;
    
    return (
      <div className="flex flex-col items-center">
        <motion.div 
          className={`rounded-full flex items-center justify-center mb-1 ${
            isActive 
              ? 'bg-violet-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}
          style={{ width: 24, height: 24 }}
          initial={{ scale: 1 }}
          animate={{ scale: isCurrent ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 1.5 }}
        >
          {isPast ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            percentage / 25
          )}
        </motion.div>
        <span className={`text-xs ${isActive ? 'text-violet-600 dark:text-violet-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        {renderStep('intro', 'Select Exam', 0)}
        {renderStep('readiness', 'Readiness', 25)}
        {renderStep('stress', 'Stress Test', 50)}
        {renderStep('concept', 'Concept Mastery', 75)}
        {renderStep('report', 'Report', 100)}
      </div>
      
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
