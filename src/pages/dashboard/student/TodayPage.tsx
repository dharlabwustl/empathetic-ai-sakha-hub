
import React from 'react';
import { Helmet } from 'react-helmet';
import EnhancedTodaysPlan from '@/components/dashboard/student/today-plan/EnhancedTodaysPlan';

const TodayPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Today's Plan - PREPZR</title>
        <meta name="description" content="Your personalized daily study plan" />
      </Helmet>
      
      <EnhancedTodaysPlan />
    </>
  );
};

export default TodayPage;
