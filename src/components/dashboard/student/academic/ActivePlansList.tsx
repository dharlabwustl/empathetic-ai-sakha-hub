
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, ChevronRight, ClipboardList, Laptop, Timer, Users } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ActivePlansListProps {
  plans: StudyPlan[];
  onViewPlanDetails: (planId: string) => void;
}

const ActivePlansList: React.FC<ActivePlansListProps> = ({ plans, onViewPlanDetails }) => {
  if (plans.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <p className="text-gray-500">You don't have any active study plans.</p>
        <p className="text-gray-500">Create a new plan to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <Card key={plan.id} className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="bg-blue-50/50 dark:bg-blue-900/20">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{plan.examGoal}</CardTitle>
                <CardDescription className="mt-1">{plan.goal}</CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Progress</span>
                <span>{plan.progressPercent}%</span>
              </div>
              <Progress value={plan.progressPercent} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Days Left:</span>
                <span className="font-medium">{plan.daysLeft}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Weekly Hours:</span>
                <span className="font-medium">{plan.weeklyHours}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Laptop className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Learning Pace:</span>
                <span className="font-medium capitalize">{plan.learningPace}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Subjects:</span>
                <span className="font-medium">{plan.subjects.length}</span>
              </div>
            </div>
            
            {plan.subjects.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Subject Focus:</h4>
                <div className="flex flex-wrap gap-2">
                  {plan.subjects.map((subject) => (
                    <Badge key={subject.id} variant="secondary" style={{ backgroundColor: `${subject.color}20` }}>
                      {subject.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-muted/50">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-center" 
              onClick={() => onViewPlanDetails(plan.id)}
            >
              View Plan Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ActivePlansList;
