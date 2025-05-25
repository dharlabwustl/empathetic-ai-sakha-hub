
import React from 'react';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import SmartSuggestionsSection from './SmartSuggestionsSection';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  onSuggestionAction: (action: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ 
  planData, 
  onConceptClick,
  onSuggestionAction,
  isMobile = false 
}) => {
  return (
    <div className="space-y-6">
      {/* Smart suggestions section */}
      <SmartSuggestionsSection 
        planData={planData}
        onActionClick={onSuggestionAction}
        isMobile={isMobile}
      />
      
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
