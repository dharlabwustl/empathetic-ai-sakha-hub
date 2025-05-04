
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, CheckCircle2, ChevronRight, ClipboardList } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CompletedPlansListProps {
  plans: StudyPlan[];
  onViewPlanDetails: (planId: string) => void;
}

const CompletedPlansList: React.FC<CompletedPlansListProps> = ({ plans, onViewPlanDetails }) => {
  if (plans.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <p className="text-gray-500">You don't have any completed study plans yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <Card key={plan.id} className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="bg-green-50/50 dark:bg-green-900/20">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{plan.examGoal}</CardTitle>
                <CardDescription className="mt-1">{plan.goal}</CardDescription>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Progress</span>
                <span>{plan.progressPercent}%</span>
              </div>
              <Progress value={plan.progressPercent} className="h-2 bg-green-100" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{new Date(plan.examDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Completed On:</span>
                <span className="font-medium">{new Date(plan.updatedAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm col-span-2">
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Subjects:</span>
                <span className="font-medium">{plan.subjects.length} completed</span>
              </div>
            </div>
            
            {plan.subjects.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Subjects Covered:</h4>
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

export default CompletedPlansList;
