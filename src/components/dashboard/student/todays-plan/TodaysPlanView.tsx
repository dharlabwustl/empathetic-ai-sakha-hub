
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import RedesignedTodaysPlan from '@/components/dashboard/student/todays-plan/RedesignedTodaysPlan';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import { useStudentProfile } from '@/hooks/useStudentProfile';

const TodaysPlanView: React.FC = () => {
  const { userProfile, loading } = useStudentProfile();

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle="Your personalized daily learning schedule to keep you on track"
    >
      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded-md w-48"></div>
          <div className="h-32 bg-gray-200 rounded-md"></div>
          <div className="h-32 bg-gray-200 rounded-md"></div>
        </div>
      ) : userProfile ? (
        <div className="space-y-8">
          <TodayStudyPlan />
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Please log in to view your personalized study plan.
          </p>
        </div>
      )}
    </SharedPageLayout>
  );
};

export default TodaysPlanView;
