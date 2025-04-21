
import React from 'react';
import { UserProfileType } from "@/types/user/base";
import ActionButtons from '@/components/dashboard/student/ActionButtons';

interface OverviewTabProps {
  userProfile: UserProfileType;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <p className="text-muted-foreground mb-6">
        Welcome to your personalized learning dashboard. Here's your overview for today.
      </p>
      
      <ActionButtons 
        currentExam={userProfile?.goals?.[0]?.title || "IIT-JEE"} 
        nextExamDate={userProfile?.goals?.[0]?.examDate || "April 30, 2025"} 
      />
    </div>
  );
};

export default OverviewTab;
