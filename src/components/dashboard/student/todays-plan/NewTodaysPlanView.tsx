
import React from 'react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import TodaysPlanProgressMeter from './TodaysPlanProgressMeter';
import TasksList from './TasksList';
import BacklogSection from './BacklogSection';
import SubjectTasksBreakdown from './SubjectTasksBreakdown';

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
      
      {/* Tasks list with premium styling */}
      <TasksList planData={planData} onConceptClick={onConceptClick} />
      
      {/* Backlog section */}
      <BacklogSection planData={planData} />
      
      {/* Subject breakdown */}
      <SubjectTasksBreakdown />
    </div>
  );
};

export default NewTodaysPlanView;
