
import React from 'react';
import EnhancedTodaysPlan from './EnhancedTodaysPlan';

const RedesignedTodaysPlan: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/50 via-white to-violet-50/50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Today's Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your personalized study plan for today. Stay focused and achieve your goals!
          </p>
        </div>
        
        <EnhancedTodaysPlan />
      </div>
    </div>
  );
};

export default RedesignedTodaysPlan;
