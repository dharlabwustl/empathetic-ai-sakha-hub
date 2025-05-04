
import React from 'react';
import StudyPlanSection from './StudyPlanSection';
import type { StudyPlan } from '@/types/user/studyPlan';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StudyPlansListProps {
  activePlans: StudyPlan[];
  completedPlans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlansList: React.FC<StudyPlansListProps> = ({
  activePlans,
  completedPlans,
  onCreatePlan,
  onViewPlanDetails
}) => {
  return (
    <div className="space-y-12">
      {/* Active Plans Section */}
      <StudyPlanSection
        title="Active Study Plans"
        plans={activePlans}
        emptyMessage="You don't have any active study plans. Create a plan to get started with your exam preparation."
        onCreatePlan={onCreatePlan}
        onViewPlanDetails={onViewPlanDetails}
        showCreateButton={true}
        isActivePlans={true}
      />

      {/* Completed Plans Section */}
      <StudyPlanSection
        title="Completed & Past Plans"
        plans={completedPlans}
        emptyMessage="You don't have any completed or past study plans yet."
        onCreatePlan={onCreatePlan}
        onViewPlanDetails={onViewPlanDetails}
        showCreateButton={false}
        isActivePlans={false}
      />
    </div>
  );
};

export default StudyPlansList;
