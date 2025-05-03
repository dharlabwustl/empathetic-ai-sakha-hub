
import React from 'react';
import { StudyPlan } from '@/types/user/studyPlan';
import StudyPlanCard from './StudyPlanCard';
import { Card } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

interface StudyPlanSectionsProps {
  activePlans: StudyPlan[];
  completedPlans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlanSections = ({
  activePlans,
  completedPlans,
  onCreatePlan,
  onViewPlanDetails
}: StudyPlanSectionsProps) => {
  return (
    <div className="space-y-6">
      {/* Active Plans */}
      <div>
        <h3 className="text-lg font-medium mb-3">Active Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activePlans.length > 0 ? (
            activePlans.map(plan => (
              <StudyPlanCard
                key={plan.id}
                plan={plan}
                onViewDetails={() => onViewPlanDetails(plan.id)}
              />
            ))
          ) : (
            <Card 
              className="flex flex-col items-center justify-center p-6 border-dashed border-2 h-48 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={onCreatePlan}
            >
              <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500 font-medium">Create a Study Plan</p>
              <p className="text-gray-400 text-sm text-center mt-1">
                Start preparing for your exams with a structured plan
              </p>
            </Card>
          )}
        </div>
      </div>
      
      {/* Completed/Archive Plans */}
      {completedPlans.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Previous Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedPlans.map(plan => (
              <StudyPlanCard
                key={plan.id}
                plan={plan}
                onViewDetails={() => onViewPlanDetails(plan.id)}
                isCompleted={plan.status === 'completed'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanSections;
