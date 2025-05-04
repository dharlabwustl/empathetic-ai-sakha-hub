
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivePlansList from '../ActivePlansList';
import CompletedPlansList from '../CompletedPlansList';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Study Plans</h2>
        <Button onClick={onCreatePlan} className="flex gap-1 items-center">
          <PlusCircle className="h-4 w-4 mr-1" />
          Create New Plan
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Plans</TabsTrigger>
          <TabsTrigger value="completed">Completed Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activePlans.length > 0 ? (
            <ActivePlansList plans={activePlans} onViewPlanDetails={onViewPlanDetails} />
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No active study plans. Create a new plan to get started.
                </p>
                <Button onClick={onCreatePlan} className="mt-4">
                  Create Your First Plan
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedPlans.length > 0 ? (
            <CompletedPlansList plans={completedPlans} onViewPlanDetails={onViewPlanDetails} />
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You don't have any completed plans yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyPlanSections;
