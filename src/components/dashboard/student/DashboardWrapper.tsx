
import React from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';

interface DashboardWrapperProps {
  userProfile: UserProfileBase;
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ userProfile, children }) => {
  // Mock data for demonstration
  const mockUserProfile = {
    ...userProfile,
    currentMood: userProfile.currentMood || MoodType.MOTIVATED,
    studyStreak: userProfile.studyStreak || 7,
    studyHoursToday: userProfile.studyHoursToday || 3.5,
    completionRate: userProfile.completionRate || 75
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
