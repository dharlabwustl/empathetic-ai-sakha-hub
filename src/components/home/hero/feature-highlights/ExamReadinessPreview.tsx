
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ExamReadinessPreview: React.FC = () => {
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    // Animate score count up
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setScore(prev => {
          if (prev >= 65) {
            clearInterval(interval);
            return 65;
          }
          return prev + 1;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Dashboard features to highlight
  const features = [
    {
      title: "Exam Syllabus Mapping",
      description: "AI tracks your progress against the complete syllabus",
      value: "82%"
    },
    {
      title: "Multi-technique Learning",
      description: "Visual, auditory, kinesthetic approaches",
      value: "5 methods"
    },
    {
      title: "Formula Practice",
      description: "Interactive formula drills with context",
      value: "210 formulas"
    },
    {
      title: "Spaced Repetition",
      description: "Scientifically proven recall improvement",
      value: "+43%"
    }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4">Your Exam Readiness Score</h3>
      
      <div className="flex justify-center mb-6">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Circular progress indicator */}
          <svg className="w-32 h-32">
            <circle 
              cx="64" 
              cy="64" 
              r="58" 
              stroke="#FFA50033" 
              strokeWidth="12" 
              fill="transparent" 
              className="dark:opacity-30"
            />
            <motion.circle 
              cx="64" 
              cy="64" 
              r="58"
              stroke="#FFA500" 
              strokeWidth="12" 
              strokeDasharray="365" 
              strokeDashoffset="127" 
              fill="transparent" 
              strokeLinecap="round" 
              transform="rotate(-90 64 64)" 
              initial={{ strokeDashoffset: 365 }}
              animate={{ strokeDashoffset: 127 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">{score}%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">+7% this week</span>
          </div>
        </motion.div>
      </div>
      
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Physics</span>
            <span className="text-orange-600 dark:text-orange-400">72%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <motion.div 
              className="bg-orange-500 h-2 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 1, delay: 0.7 }}
            ></motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Chemistry</span>
            <span className="text-orange-600 dark:text-orange-400">58%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <motion.div 
              className="bg-orange-500 h-2 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: "58%" }}
              transition={{ duration: 1, delay: 0.9 }}
            ></motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Biology</span>
            <span className="text-orange-600 dark:text-orange-400">65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <motion.div 
              className="bg-orange-500 h-2 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1, delay: 1.1 }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* New advanced feature highlights */}
      <div className="mt-6 border-t pt-4">
        <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-3">Learning Optimization</h4>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + (index * 0.2) }}
              className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800/30"
            >
              <h5 className="text-xs font-semibold text-orange-700 dark:text-orange-300">{feature.title}</h5>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
              <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mt-2">{feature.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamReadinessPreview;
