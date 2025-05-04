
import React from 'react';
import { StudyPlan } from '@/types/user/studyPlan';
import StudyPlanCard from './StudyPlanCard';
import { Grid } from '@/components/ui/grid';
import { Card, CardContent } from '@/components/ui/card';

interface StudyPlanSectionProps {
  title: string;
  plans: StudyPlan[];
  onViewPlanDetails: (planId: string) => void;
  isActive: boolean;
}

const StudyPlanSection: React.FC<StudyPlanSectionProps> = ({
  title,
  plans,
  onViewPlanDetails,
  isActive
}) => {
  if (!plans || plans.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <StudyPlanCard
          key={plan.id}
          plan={plan}
          onClick={() => onViewPlanDetails(plan.id)}
          isActive={isActive}
        />
      ))}
    </div>
  );
};

export default StudyPlanSection;
