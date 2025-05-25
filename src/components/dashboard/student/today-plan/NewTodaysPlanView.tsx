
import React from 'react';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import TodaysPlanProgressMeter from '../todays-plan/TodaysPlanProgressMeter';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ 
  planData, 
  onConceptClick, 
  isMobile = false 
}) => {
  return (
    <div className="space-y-6">
      {/* Progress meter at the top */}
      <TodaysPlanProgressMeter planData={planData} isMobile={isMobile} />
      
      {/* Enhanced task breakdown component */}
      <EnhancedTaskBreakdown 
        planData={planData}
        onConceptClick={onConceptClick}
        isMobile={isMobile}
      />
    </div>
  );
};

export default NewTodaysPlanView;
