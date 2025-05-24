
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StudyPlan } from '@/types/user/studyPlan';
import { Calendar, Clock, Target } from 'lucide-react';

interface ActivePlansListProps {
  plans: StudyPlan[];
  onViewPlan?: (plan: StudyPlan) => void;
}

const ActivePlansList: React.FC<ActivePlansListProps> = ({ plans, onViewPlan }) => {
  const activePlans = plans.filter(plan => plan.isActive);

  if (activePlans.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No active study plans found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activePlans.map((plan) => {
        // Calculate progress percentage
        const progressPercent = plan.progress || 0;
        
        // Calculate days left
        const today = new Date();
        const targetDate = new Date(plan.targetDate);
        const daysLeft = Math.max(0, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        
        // Calculate study hours per day needed
        const remainingHours = plan.totalHours - plan.completedHours;
        const studyHoursPerDay = daysLeft > 0 ? Math.ceil(remainingHours / daysLeft) : 0;

        return (
          <Card 
            key={plan.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onViewPlan?.(plan)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{plan.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.examGoal || plan.examType} • Target: {plan.targetDate.toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progressPercent)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{daysLeft}</div>
                    <div className="text-xs text-muted-foreground">Days Left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{studyHoursPerDay}h</div>
                    <div className="text-xs text-muted-foreground">Per Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">{plan.subjects.length}</div>
                    <div className="text-xs text-muted-foreground">Subjects</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ActivePlansList;
