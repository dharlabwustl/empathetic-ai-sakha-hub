
import React from 'react';
import { UserProfileType } from '@/types/user';
import AcademicAdvisorCard from '../AcademicAdvisorCard';

interface AcademicAdvisorTabProps {
  userProfile: UserProfileType;
}

const AcademicAdvisorTab: React.FC<AcademicAdvisorTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Academic Advisor</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Create and manage your personalized study plans.
      </p>
      
      <AcademicAdvisorCard />
    </div>
  );
};

export default AcademicAdvisorTab;
