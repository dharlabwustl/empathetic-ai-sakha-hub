
import React from 'react';
import { StudyPlan } from '@/types/user/studyPlan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ActivePlansList from '../ActivePlansList';
import CompletedPlansList from '../CompletedPlansList';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export interface StudyPlanSectionProps {
  activePlans: StudyPlan[];
  completedPlans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlanSections: React.FC<StudyPlanSectionProps> = ({
  activePlans,
  completedPlans,
  onCreatePlan,
  onViewPlanDetails
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Study Plans</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onCreatePlan} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Plan
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a personalized study plan based on your goals and preferences</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Plans ({activePlans.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed Plans ({completedPlans.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <ActivePlansList plans={activePlans} onViewPlanDetails={onViewPlanDetails} />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <CompletedPlansList plans={completedPlans} onViewPlanDetails={onViewPlanDetails} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyPlanSections;
