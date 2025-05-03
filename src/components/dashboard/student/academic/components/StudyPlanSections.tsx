
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import StudyPlanCard from './StudyPlanCard';

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
    <>
      {/* Active Plans Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Active Study Plans</h2>
          <Button onClick={onCreatePlan} size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4 mr-1" />
            Create Plan
          </Button>
        </div>

        {activePlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePlans.map((plan) => (
              <StudyPlanCard
                key={plan.id}
                plan={plan}
                onViewDetails={onViewPlanDetails}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                You don't have any active study plans yet.
              </p>
              <Button onClick={onCreatePlan}>Create Your First Study Plan</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Completed Plans Section */}
      {completedPlans.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Completed Study Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedPlans.map((plan) => (
              <StudyPlanCard
                key={plan.id}
                plan={plan}
                onViewDetails={onViewPlanDetails}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default StudyPlanSections;
