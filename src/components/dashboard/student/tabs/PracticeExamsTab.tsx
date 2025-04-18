
import React from 'react';
import { UserProfileType } from '@/types/user';

interface PracticeExamsTabProps {
  userProfile: UserProfileType;
}

const PracticeExamsTab: React.FC<PracticeExamsTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Practice Exams</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Test your knowledge with practice exams.
      </p>
      
      {/* Implement practice exams content here */}
    </div>
  );
};

export default PracticeExamsTab;
