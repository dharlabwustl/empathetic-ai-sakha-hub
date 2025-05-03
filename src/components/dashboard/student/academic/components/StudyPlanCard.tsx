
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Calendar, Clock, BookOpen } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export interface StudyPlanCardProps {
  plan: StudyPlan;
  onViewDetails: () => void;
  isCompleted?: boolean;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ 
  plan, 
  onViewDetails,
  isCompleted = false
}) => {
  // Format the exam date
  const formattedDate = (() => {
    try {
      return format(new Date(plan.examDate), 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  })();
  
  // Calculate remaining days
  const getRemainingDays = () => {
    try {
      const today = new Date();
      const examDate = new Date(plan.examDate);
      const diffTime = Math.abs(examDate.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch (e) {
      return 0;
    }
  };
  
  // Get badge color based on status
  const getBadgeVariant = () => {
    switch (plan.status) {
      case 'active':
        return 'default';
      case 'completed':
        return 'success';
      case 'archived':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card className={`border ${isCompleted ? 'border-gray-200 dark:border-gray-800 opacity-80' : 'border-primary/20'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant={getBadgeVariant()} className="mb-2">
              {plan.status === 'active' ? 'Active' : 
               plan.status === 'completed' ? 'Completed' : 
               plan.status === 'archived' ? 'Archived' : 'Pending'}
            </Badge>
            <CardTitle className="text-lg">{plan.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            Exam Date: {formattedDate} 
            <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
              ({getRemainingDays()} days left)
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2 text-violet-500" />
            {plan.studyHoursPerDay} hrs/day • {plan.learningPace} pace
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <BookOpen className="h-4 w-4 mr-2 text-green-500" />
            {plan.subjects.length} subjects
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <div>Overall Progress</div>
              <div className="font-medium">{plan.progress}%</div>
            </div>
            <Progress value={plan.progress} className="h-2" />
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onViewDetails}>
          <Eye className="h-4 w-4 mr-2" />
          View Plan Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyPlanCard;
