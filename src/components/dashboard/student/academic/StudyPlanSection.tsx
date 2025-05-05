
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import StudyPlanCard from './components/StudyPlanCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';

interface StudyPlanSectionProps {
  title: string;
  description?: string;
  plans: StudyPlan[];
  emptyMessage?: string;
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
  showCreateButton?: boolean;
  isActivePlans?: boolean;
}

const StudyPlanSection: React.FC<StudyPlanSectionProps> = ({
  title,
  description,
  plans,
  emptyMessage = "No study plans available. Create a new one to start tracking your progress.",
  onCreatePlan,
  onViewPlanDetails,
  showCreateButton = true,
  isActivePlans = false
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
        
        {showCreateButton && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onCreatePlan}
                  className="flex gap-1 items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Create Study Plan
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a personalized study plan based on your goals</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {plans.length === 0 ? (
        <Card className="border rounded-lg py-8 px-6 text-center bg-gray-50 dark:bg-gray-800/40">
          <CardContent className="pt-2">
            <p className="text-muted-foreground mb-6">{emptyMessage}</p>
            {showCreateButton && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={onCreatePlan} 
                      className="flex mx-auto gap-1 items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Create Study Plan
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start planning your exam preparation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
