
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import { Progress } from '@/components/ui/progress';
import { formatDistance } from 'date-fns';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onViewDetails: (planId: string) => void;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onViewDetails }) => {
  const getDaysRemainingText = () => {
    try {
      let examDate: Date;
      if (plan.examDate instanceof Date) {
        examDate = plan.examDate;
      } else {
        examDate = new Date(plan.examDate);
      }
      
      const now = new Date();
      if (examDate > now) {
        return formatDistance(examDate, now, { addSuffix: true });
      } else {
        return "Exam date passed";
      }
    } catch (error) {
      return "Date unknown";
    }
  };

  return (
    <Card className={`h-full ${
      plan.status === 'active' 
        ? 'border-blue-300 dark:border-blue-800 shadow-sm' 
        : 'border-gray-200 dark:border-gray-800'
    }`}>
      <CardContent className="p-5 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{plan.examGoal}</h3>
            <p className="text-sm text-muted-foreground">{plan.status === 'active' ? 'Active Plan' : plan.status}</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            plan.status === 'active' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
              : plan.status === 'completed'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}>
            {plan.status}
          </div>
        </div>
        
        <div className="mt-3">
          <Progress 
            value={plan.progress || 0} 
            className="h-2" 
            indicatorClassName={plan.status === 'active' ? 'bg-blue-500' : 'bg-gray-400'} 
          />
          <p className="text-xs text-right mt-1 text-muted-foreground">
            {plan.progress || 0}% complete
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {plan.studyHoursPerDay} hrs/day
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            {getDaysRemainingText()}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            {plan.subjects.length} subjects
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pb-4 pt-6">
        <Button 
          variant="ghost" 
          className="w-full justify-between hover:bg-blue-50 dark:hover:bg-blue-950"
          onClick={() => onViewDetails(plan.id)}
        >
          View Details <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyPlanCard;
