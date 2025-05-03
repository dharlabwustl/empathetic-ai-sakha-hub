
import React from 'react';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { StudyPlan } from '@/types/user/studyPlan';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onViewDetails: (planId: string) => void;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'archived':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  // Format the exam date
  const formatExamDate = () => {
    if (!plan.examDate) return 'Not specified';
    
    try {
      if (typeof plan.examDate === 'string') {
        return format(new Date(plan.examDate), 'PP');
      } else {
        return format(plan.examDate, 'PP');
      }
    } catch (error) {
      return String(plan.examDate);
    }
  };

  // Calculate days left
  const getDaysLeft = () => {
    if (!plan.examDate) return '—';
    if (plan.daysLeft !== undefined) return plan.daysLeft;
    
    try {
      const examDate = typeof plan.examDate === 'string' ? new Date(plan.examDate) : plan.examDate;
      const today = new Date();
      const diffTime = examDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    } catch (error) {
      return '—';
    }
  };

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{plan.examGoal}</h3>
            <p className="text-sm text-muted-foreground">{plan.subjects.length} subjects</p>
          </div>
          <Badge className={`${getStatusColor(plan.status)} text-white`}>
            {plan.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-2">
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatExamDate()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{getDaysLeft()} days left</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">{plan.progressPercentage || 0}%</span>
        </div>
        
        <Progress value={plan.progressPercentage || 0} className="h-2" />
        
        <div className="flex flex-wrap gap-1 pt-2">
          {plan.subjects.slice(0, 3).map(subject => (
            <Badge key={subject.id} variant="outline" className="text-xs">
              {subject.name}
            </Badge>
          ))}
          {plan.subjects.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{plan.subjects.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="ghost" 
          className="w-full text-sm flex items-center gap-1"
          onClick={() => onViewDetails(plan.id)}
        >
          <BookOpen className="h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyPlanCard;
