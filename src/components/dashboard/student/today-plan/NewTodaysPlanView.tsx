
import React from 'react';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import TodaysPlanVoiceAssistant from '@/components/voice/TodaysPlanVoiceAssistant';
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
      {/* Enhanced task breakdown component */}
      <EnhancedTaskBreakdown 
        planData={planData}
        onConceptClick={onConceptClick}
        isMobile={isMobile}
      />
      
      {/* Voice assistant for today's plan */}
      <TodaysPlanVoiceAssistant 
        planData={planData}
        userName={planData?.userName}
        isEnabled={true}
      />
    </div>
  );
};

export default NewTodaysPlanView;
