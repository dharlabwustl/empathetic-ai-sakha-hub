
import React from 'react';
import { Helmet } from 'react-helmet';
import PremiumTodaysPlan from './PremiumTodaysPlan';

const EnhancedTodaysPlan: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <PremiumTodaysPlan />
    </>
  );
};

export default EnhancedTodaysPlan;
