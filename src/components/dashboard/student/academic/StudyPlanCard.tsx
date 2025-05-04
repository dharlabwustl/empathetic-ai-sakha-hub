
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import { differenceInDays, format } from 'date-fns';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onClick: (planId: string) => void;
  isActive: boolean;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onClick, isActive }) => {
  const examDate = plan.examDate ? new Date(plan.examDate) : new Date();
  const daysLeft = differenceInDays(examDate, new Date());
  
  // Calculate progress
  const progress = plan.progressPercentage || plan.progress || 0;
  
  // Get the status badge color
  const getStatusColor = () => {
    if (plan.status === 'active') return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
    if (plan.status === 'completed') return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400';
    return 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400';
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{plan.examGoal || plan.goal || 'Study Plan'}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>Exam: {format(examDate, 'dd MMM yyyy')}</span>
            </div>
          </div>
          <Badge className={getStatusColor()}>
            {plan.status === 'active' ? 'Active' : plan.status === 'completed' ? 'Completed' : 'Pending'}
          </Badge>
        </div>
        
        <div className="space-y-3 mt-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">
                {daysLeft > 0 ? `${daysLeft} days left` : 'Exam day passed'}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-2">
                {plan.subjects?.length || 0} subjects
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-auto" 
                onClick={() => onClick(plan.id)}
              >
                <span className="text-xs mr-1">Details</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlanCard;
