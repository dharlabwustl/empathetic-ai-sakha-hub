
import React from 'react';
import StudyPlanSection from './StudyPlanSection';
import type { StudyPlan } from '@/types/user/studyPlan';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">My Study Plans</CardTitle>
        <CardDescription>Manage and track your exam preparation plans</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="active">Active Plans</TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View your current active study plans</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="completed">Completed & Past Plans</TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View your completed or archived study plans</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <StudyPlanSection
              title="Active Study Plans"
              description="Your current study plans and ongoing progress"
              plans={activePlans}
              emptyMessage="You don't have any active study plans. Create one to start tracking your progress!"
              onCreatePlan={onCreatePlan}
              onViewPlanDetails={onViewPlanDetails}
              isActivePlans={true}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <StudyPlanSection
              title="Completed & Past Plans"
              description="History of your completed and expired study plans"
              plans={completedPlans}
              emptyMessage="You don't have any completed study plans yet."
              onCreatePlan={onCreatePlan}
              onViewPlanDetails={onViewPlanDetails}
              showCreateButton={false}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudyPlansList;
