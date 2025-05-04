
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StudyPlan } from '@/types/user/studyPlan';
import StudyPlanSections from './components/StudyPlanSections';

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
  const hasNoPlans = activePlans.length === 0 && completedPlans.length === 0;

  // If there are no plans at all, show a friendly message
  if (hasNoPlans) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium">No Study Plans Yet</h3>
            <p className="text-muted-foreground">
              Create your first study plan to organize your exam preparation efficiently.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <StudyPlanSections 
      activePlans={activePlans}
      completedPlans={completedPlans}
      onCreatePlan={onCreatePlan}
      onViewPlanDetails={onViewPlanDetails}
    />
  );
};

export default StudyPlansList;
