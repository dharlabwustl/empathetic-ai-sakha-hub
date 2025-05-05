
import React from 'react';
import { StudyPlan } from '@/types/user/studyPlan';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onClick: (planId: string) => void;
  isActive?: boolean;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onClick, isActive = false }) => {
  const totalSubjects = plan.subjects.length;
  const completedSubjects = plan.subjects.filter(subject => subject.completed).length;
  
  // Calculate total topics and completed topics
  const totalTopicsCount = plan.subjects.reduce((count, subject) => {
    return count + (subject.topics?.length || 0);
  }, 0);
  
  const completedTopicsCount = plan.subjects.reduce((count, subject) => {
    return count + (subject.topics?.filter(topic => topic.completed)?.length || 0);
  }, 0);
  
  // Format dates
  const examDate = new Date(plan.examDate);
  const formattedExamDate = format(examDate, 'MMM d, yyyy');
  
  // Calculate days left
  const today = new Date();
  const daysLeft = plan.progressPercent === 100 ? 0 : differenceInDays(examDate, today);
  
  const progress = plan.progressPercent || 0;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {plan.title || plan.examGoal}
          </CardTitle>
          <Badge variant={plan.status === 'active' ? 'default' : 'outline'}>
            {plan.status === 'active' ? 'Active' : 'Completed'}
          </Badge>
        </div>
        <CardDescription>
          Exam Goal: {plan.examGoal}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span>Overall Progress:</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-slate-500" />
            <span className="text-muted-foreground">{formattedExamDate}</span>
          </div>
          
          {isActive && daysLeft >= 0 && (
            <div className="flex items-center justify-end">
              <Clock className="h-4 w-4 mr-2 text-slate-500" />
              <span className={`${daysLeft < 7 ? 'text-amber-600 font-medium' : 'text-muted-foreground'}`}>
                {daysLeft} days left
              </span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-slate-500" />
            <span className="text-muted-foreground">
              {completedSubjects}/{totalSubjects} Subjects
            </span>
          </div>
          
          <div className="flex items-center justify-end">
            <span className="text-muted-foreground">
              {completedTopicsCount}/{totalTopicsCount} Topics
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => onClick(plan.id)} 
                className="w-full"
                variant={plan.status === 'active' ? 'default' : 'outline'}
              >
                View Plan Details
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Explore detailed insights and progress for this study plan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default StudyPlanCard;
