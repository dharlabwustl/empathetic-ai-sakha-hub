
import React from 'react';
import StudyPlanSection from './StudyPlanSection';
import type { StudyPlan } from '@/types/user/studyPlan';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

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
    <div className="space-y-12">
      {/* Active Plans Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Active Study Plans</h2>
            <p className="text-muted-foreground">Your current study plans and ongoing progress</p>
          </div>
          <Button 
            onClick={onCreatePlan} 
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Create New Plan
          </Button>
        </div>
        
        {activePlans.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">You don't have any active study plans yet.</p>
              <Button onClick={onCreatePlan} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Create Your First Plan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <StudyPlanSection
            title="Active Study Plans"
            plans={activePlans}
            onViewPlanDetails={onViewPlanDetails}
            isActive={true}
          />
        )}
      </div>

      {/* Completed Plans Section */}
      {completedPlans.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Completed & Past Plans</h2>
            <p className="text-muted-foreground">History of your completed and expired study plans</p>
          </div>
          <StudyPlanSection
            title="Completed Plans"
            plans={completedPlans}
            onViewPlanDetails={onViewPlanDetails}
            isActive={false}
          />
        </div>
      )}
    </div>
  );
};

export default StudyPlansList;
