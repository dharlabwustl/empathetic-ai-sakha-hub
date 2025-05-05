
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import StudyPlanCard from './components/StudyPlanCard';

interface StudyPlanSectionProps {
  title: string;
  plans: StudyPlan[];
  emptyMessage: string;
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
  showCreateButton?: boolean;
  isActivePlans?: boolean;
}

const StudyPlanSection: React.FC<StudyPlanSectionProps> = ({
  title,
  plans,
  emptyMessage,
  onCreatePlan,
  onViewPlanDetails,
  showCreateButton = true,
  isActivePlans = false
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium">{title}</h2>
        {showCreateButton && (
          <Button 
            onClick={onCreatePlan}
            className="flex gap-1 items-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Create New Plan
          </Button>
        )}
      </div>
      
      {plans.length === 0 ? (
        <div className="border rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-800/40">
          <p className="text-muted-foreground mb-4">{emptyMessage}</p>
          {showCreateButton && (
            <Button onClick={onCreatePlan} className="flex mx-auto gap-1 items-center">
              <PlusCircle className="h-4 w-4 mr-1" />
              Create Study Plan
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map(plan => (
            <StudyPlanCard
              key={plan.id}
              plan={plan}
              onClick={onViewPlanDetails}
              isActive={isActivePlans}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyPlanSection;
