
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StudyPlan } from '@/types/user/studyPlan';
import { CheckCircle, Calendar, Target } from 'lucide-react';

interface CompletedPlansListProps {
  plans: StudyPlan[];
  onViewPlan?: (plan: StudyPlan) => void;
}

const CompletedPlansList: React.FC<CompletedPlansListProps> = ({ plans, onViewPlan }) => {
  const completedPlans = plans.filter(plan => plan.progress >= 100 || !plan.isActive);

  if (completedPlans.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No completed study plans found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {completedPlans.map((plan) => {
        const progressPercent = plan.progress || 0;
        const completionDate = new Date(plan.updatedAt);

        return (
          <Card 
            key={plan.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onViewPlan?.(plan)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {plan.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.examGoal || plan.examType} • Completed: {completionDate.toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Final Progress</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progressPercent)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{plan.subjects.length}</div>
                    <div className="text-xs text-muted-foreground">Subjects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{plan.completedHours}h</div>
                    <div className="text-xs text-muted-foreground">Total Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">
                      {Math.ceil((completionDate.getTime() - plan.createdAt.getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-xs text-muted-foreground">Days Taken</div>
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

export default CompletedPlansList;
