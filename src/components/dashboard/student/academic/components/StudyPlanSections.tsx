
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import StudyPlanCard from '../StudyPlanCard';

interface StudyPlanSectionsProps {
  activePlans: StudyPlan[];
  completedPlans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlanSections: React.FC<StudyPlanSectionsProps> = ({
  activePlans,
  completedPlans,
  onCreatePlan,
  onViewPlanDetails,
}) => {
  return (
    <div className="space-y-8">
      {/* Active Plans Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium">Active Study Plans</h2>
          <Button 
            onClick={onCreatePlan}
            className="flex gap-1 items-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Create New Plan
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {activePlans.length === 0 ? (
            <div className="border rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-800/40">
              <p className="text-muted-foreground mb-4">
                You don't have any active study plans yet. Create a plan to get started with your exam preparation.
              </p>
              <Button onClick={onCreatePlan} className="flex mx-auto gap-1 items-center">
                <PlusCircle className="h-4 w-4 mr-1" />
                Create Study Plan
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activePlans.map((plan) => (
                <StudyPlanCard 
                  key={plan.id}
                  plan={plan}
                  onClick={() => onViewPlanDetails(plan.id)}
                  isActive={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Completed/Archived Plans Section */}
      {completedPlans.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Past Study Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {completedPlans.map((plan) => (
              <StudyPlanCard 
                key={plan.id}
                plan={plan}
                onClick={() => onViewPlanDetails(plan.id)}
                isActive={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanSections;
