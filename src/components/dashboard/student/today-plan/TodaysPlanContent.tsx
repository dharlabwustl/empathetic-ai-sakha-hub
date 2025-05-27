
import React from 'react';
import CompleteTodaysPlan from './CompleteTodaysPlan';

interface TodaysPlanContentProps {
  userName?: string;
}

const TodaysPlanContent: React.FC<TodaysPlanContentProps> = ({ userName }) => {
  return <CompleteTodaysPlan userName={userName} />;
};

export default TodaysPlanContent;
