
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Info } from 'lucide-react';
import { type StudyPlan } from '@/types/user/studyPlan';
import ActivePlansList from '../ActivePlansList';
import CompletedPlansList from '../CompletedPlansList';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  onViewPlanDetails
}) => {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Study Plans</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Create and manage personalized study plans based on your exam goals,
                  learning pace, and subject proficiency.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onCreatePlan} className="flex gap-1 items-center">
                <PlusCircle className="h-4 w-4 mr-1" />
                Create New Plan
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new personalized study plan</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Active Plans */}
          <ActivePlansList
            plans={activePlans}
            onViewPlanDetails={onViewPlanDetails}
            onCreatePlan={onCreatePlan}
          />

          {/* Completed Plans */}
          {completedPlans.length > 0 && (
            <CompletedPlansList
              plans={completedPlans}
              onViewPlanDetails={onViewPlanDetails}
            />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StudyPlanSections;
