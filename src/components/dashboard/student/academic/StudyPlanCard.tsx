
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen, FileText } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import { differenceInDays, format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onClick: () => void;
  isActive: boolean;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onClick, isActive }) => {
  // Get total topics and completed topics across all subjects
  const getTotalAndCompletedTopics = () => {
    let totalTopics = 0;
    let completedTopics = 0;
    
    plan.subjects.forEach(subject => {
      if (subject.topics) {
        totalTopics += subject.topics.length;
        completedTopics += subject.topics.filter(topic => topic.completed).length;
      }
    });
    
    return { totalTopics, completedTopics };
  };
  
  const { totalTopics, completedTopics } = getTotalAndCompletedTopics();
  
  // Get days left for active plans
  const getDaysLeft = () => {
    if (!isActive) return null;
    
    try {
      const examDate = new Date(plan.examDate);
      const today = new Date();
      return Math.max(0, differenceInDays(examDate, today));
    } catch (e) {
      return plan.daysLeft || 0;
    }
  };
  
  const daysLeft = getDaysLeft();
  
  // Format date
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <TooltipProvider>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg line-clamp-2">
              {plan.title || plan.examGoal}
            </CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant={isActive ? "default" : "outline"} className="ml-2 shrink-0">
                  {isActive ? "Active" : plan.status === "completed" ? "Completed" : "Archived"}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Plan status</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow pb-0">
          <div className="space-y-4">
            {/* Subjects list */}
            <div className="space-y-3">
              {plan.subjects.slice(0, 3).map(subject => (
                <div key={subject.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{subject.name}</span>
                    <span className="text-muted-foreground">
                      {subject.topics ? 
                        `${subject.topics.filter(t => t.completed).length}/${subject.topics.length} topics` : 
                        `${subject.hoursPerWeek}h/week`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full`}
                      style={{ 
                        width: `${subject.topics ? 
                          Math.round((subject.topics.filter(t => t.completed).length / Math.max(1, subject.topics.length)) * 100) : 
                          0}%`,
                        backgroundColor: subject.color || '#3b82f6'
                      }}
                    />
                  </div>
                </div>
              ))}
              
              {plan.subjects.length > 3 && (
                <div className="text-sm text-muted-foreground text-center">
                  +{plan.subjects.length - 3} more subjects
                </div>
              )}
            </div>
            
            {/* Date and time info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Exam: {formatDate(plan.examDate)}</span>
            </div>
            
            {daysLeft !== null && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={daysLeft <= 7 ? "text-amber-600 dark:text-amber-400 font-medium" : ""}>
                  {daysLeft} {daysLeft === 1 ? "day" : "days"} remaining
                </span>
              </div>
            )}
            
            {/* Overall progress */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span>{plan.progressPercent || plan.progressPercentage || 0}%</span>
              </div>
              <Progress 
                value={plan.progressPercent || plan.progressPercentage || 0} 
                className="h-2" 
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-4 mt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={onClick} 
                className="w-full"
                variant={isActive ? "default" : "outline"}
              >
                {isActive ? (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Plan
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View full details of this study plan</p>
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default StudyPlanCard;
