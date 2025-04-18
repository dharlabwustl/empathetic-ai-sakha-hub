
import React from 'react';
import { UserProfileType } from '@/types/user';

interface TodayPlanTabProps {
  userProfile: UserProfileType;
}

const TodayPlanTab: React.FC<TodayPlanTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Today's Study Plan</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Here's your personalized study plan for today.
      </p>
      
      {/* Implement today's plan content here */}
    </div>
  );
};

export default TodayPlanTab;
