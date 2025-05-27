
import React from 'react';
import RedesignedTodaysPlan from './RedesignedTodaysPlan';

interface TodaysPlanContentProps {
  userName?: string;
}

const TodaysPlanContent: React.FC<TodaysPlanContentProps> = ({ userName }) => {
  return <RedesignedTodaysPlan userName={userName} />;
};

export default TodaysPlanContent;
