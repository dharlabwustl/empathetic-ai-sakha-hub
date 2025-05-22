
import React from 'react';

const ExamReadinessPreview: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Exam Readiness Score</h3>
      
      <div className="flex justify-center mb-6">
        <div className="relative">
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
            <circle 
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
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">65%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">+7% this week</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Physics</span>
            <span className="text-orange-600 dark:text-orange-400">72%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: "72%" }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Chemistry</span>
            <span className="text-orange-600 dark:text-orange-400">58%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: "58%" }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Biology</span>
            <span className="text-orange-600 dark:text-orange-400">65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: "65%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamReadinessPreview;
