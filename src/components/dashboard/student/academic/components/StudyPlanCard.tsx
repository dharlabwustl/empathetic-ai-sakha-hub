
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarClock, ChevronRight, BookOpen } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { StudyPlan } from '@/types/user/studyPlan';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onClick: (planId: string) => void;
  isActive?: boolean;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({
  plan,
  onClick,
  isActive = false
}) => {
  // Format the date in a user-friendly way
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  // Calculate subject progress
  const getSubjectProgress = (subject: any): number => {
    if (!subject.topics || subject.topics.length === 0) return 0;
    
    const completedTopics = subject.topics.filter((topic: any) => topic.completed).length;
    return Math.round((completedTopics / subject.topics.length) * 100);
  };
  
  // Calculate days left until exam
  const getDaysLeft = () => {
    const examDate = new Date(plan.examDate);
    const today = new Date();
    return differenceInDays(examDate, today);
  };

  // Get badge color based on status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalHoursRequired = plan.subjects.reduce((total, subject) => total + subject.hoursPerWeek, 0);

  return (
    <TooltipProvider>
      <Card className={`transition-all hover:shadow-md ${isActive ? 'border-2 border-purple-200 dark:border-purple-800' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <h3 className="font-semibold text-lg">{plan.examGoal} Preparation</h3>
                <Badge className={`ml-2 ${getStatusColor(plan.status)}`}>
                  {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <CalendarClock className="mr-1 h-3.5 w-3.5" />
                <Tooltip>
                  <TooltipTrigger className="text-left">
                    <span>{formatDate(plan.examDate)} 
                      {plan.daysLeft !== undefined ? ` • ${plan.daysLeft} days left` : 
                      getDaysLeft() > 0 ? ` • ${getDaysLeft()} days left` : ' • Exam day'}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your exam date and days remaining</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span>{plan.progressPercentage || plan.progressPercent || 0}%</span>
              </div>
              <Progress 
                value={plan.progressPercentage || plan.progressPercent || 0} 
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              {/* Show subjects - limit to 3 with the most important ones */}
              {plan.subjects.slice(0, 3).map(subject => (
                <div key={subject.id} className="flex flex-col space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: subject.color }}
                      ></div>
                      <span className="text-sm font-medium">{subject.name}</span>
                    </div>
                    <Badge variant="outline" className={
                      subject.proficiency === 'weak' 
                        ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300' 
                        : subject.proficiency === 'strong'
                          ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300'
                          : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300'
                    }>
                      {subject.proficiency}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{subject.hoursPerWeek} hrs/week</span>
                  </div>
                </div>
              ))}
              
              {plan.subjects.length > 3 && (
                <div className="text-xs text-center text-muted-foreground mt-1">
                  + {plan.subjects.length - 3} more subjects
                </div>
              )}
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <div className="flex items-center">
                <BookOpen className="h-3.5 w-3.5 mr-1" />
                <span>{plan.studyHoursPerDay} hrs/day</span>
              </div>
              <span>{totalHoursRequired} total hours</span>
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={isActive ? "default" : "outline"}
                  className="w-full flex items-center justify-between mt-2"
                  onClick={() => onClick(plan.id)}
                >
                  <span>View Plan Details</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View detailed information about this study plan</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default StudyPlanCard;
