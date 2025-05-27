
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import EnhancedTodaysPlanView from '@/components/dashboard/student/todays-plan/EnhancedTodaysPlanView';

const TodaysPlanView = () => {
  return (
    <SharedPageLayout
      title="Today's Plan"
      subtitle="Your personalized daily study schedule with gamification"
    >
      <EnhancedTodaysPlanView />
    </SharedPageLayout>
  );
};

export default TodaysPlanView;
