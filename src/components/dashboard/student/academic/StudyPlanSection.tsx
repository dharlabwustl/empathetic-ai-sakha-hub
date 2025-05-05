
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, CalendarDays, Clock } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';

interface StudyPlanSectionProps {
  title: string;
  description: string;
  plans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
  showCreateButton?: boolean;
  isActivePlans?: boolean;
}

const StudyPlanSection: React.FC<StudyPlanSectionProps> = ({
  title,
  description,
  plans,
  onCreatePlan,
  onViewPlanDetails,
  showCreateButton = true,
  isActivePlans = false
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {showCreateButton && (
          <Button 
            onClick={onCreatePlan}
            className="flex gap-1 items-center"
            variant="default"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Create New Plan
          </Button>
        )}
      </div>
      
      {plans.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              {isActivePlans 
                ? "You don't have any active study plans yet. Create a plan to get started with your exam preparation."
                : "No completed study plans yet."}
            </p>
            {showCreateButton && isActivePlans && (
              <Button onClick={onCreatePlan} className="flex mx-auto gap-1 items-center">
                <PlusCircle className="h-4 w-4 mr-1" />
                Create Study Plan
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map(plan => (
            <Card 
              key={plan.id} 
              className={`hover:shadow-md transition-shadow ${isActivePlans ? 'border-indigo-100' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.examGoal}</h3>
                    <p className="text-sm text-muted-foreground">
                      {isActivePlans 
                        ? `Created on ${new Date(plan.createdAt).toLocaleDateString()}`
                        : `Completed on ${new Date(plan.updatedAt).toLocaleDateString()}`}
                    </p>
                  </div>
                  <Badge className={isActivePlans 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  }>
                    {isActivePlans ? "Active" : plan.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{plan.progressPercentage || plan.progressPercent || 0}%</span>
                  </div>
                  <Progress value={plan.progressPercentage || plan.progressPercent || 0} className="h-2" />
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center text-sm">
                    <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{plan.daysLeft || 0} days left</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{plan.studyHoursPerDay} hours/day</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {plan.subjects.slice(0, 5).map((subject) => (
                    <Badge key={subject.id} variant="outline" className="bg-slate-50 dark:bg-slate-800">
                      {subject.name}
                    </Badge>
                  ))}
                  {plan.subjects.length > 5 && (
                    <Badge variant="outline">
                      +{plan.subjects.length - 5} more
                    </Badge>
                  )}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="ghost" 
                    onClick={() => onViewPlanDetails(plan.id)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyPlanSection;
