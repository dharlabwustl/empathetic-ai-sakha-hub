
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarClock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { StudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';
import { Progress } from '@/components/ui/progress';

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
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  // Calculate subject progress if not available directly
  const getSubjectProgress = (subject: StudyPlanSubject): number => {
    if (!subject.topics || subject.topics.length === 0) return 0;
    
    const completedTopics = subject.topics.filter(topic => topic.completed).length;
    return Math.round((completedTopics / subject.topics.length) * 100);
  };

  const renderSubjects = () => {
    // Show only up to 3 subjects
    return plan.subjects.slice(0, 3).map(subject => (
      <div key={subject.id} className="flex flex-col space-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: subject.color }}
            ></div>
            <span className="text-sm font-medium">{subject.name}</span>
          </div>
          <span className="text-xs text-gray-500">
            {getSubjectProgress(subject)}%
          </span>
        </div>
        <Progress
          value={getSubjectProgress(subject)}
          className="h-1.5"
          style={{ backgroundColor: 'rgba(200, 200, 200, 0.3)' }}
        />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{subject.proficiency !== 'weak' ? 'Strong' : 'Needs Work'}</span>
          <span>{subject.hoursPerWeek} hrs/week</span>
        </div>
      </div>
    ));
  };

  return (
    <Card className={`hover:shadow-md transition-all ${isActive ? 'border-2 border-primary' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{plan.examGoal} Preparation</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarClock className="mr-1 h-3.5 w-3.5" />
              <span>
                {formatDate(plan.examDate.toString())} 
                {plan.daysLeft && plan.daysLeft > 0 ? ` • ${plan.daysLeft} days left` : ''}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-semibold">
              {plan.progressPercentage || plan.progressPercent || 0}% Complete
            </div>
            <div 
              className={`text-xs ${
                plan.status === 'active' ? 'text-green-600' : 
                plan.status === 'completed' ? 'text-blue-600' : 'text-amber-600'
              }`}
            >
              {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            {renderSubjects()}
          </div>
          
          {plan.subjects.length > 3 && (
            <div className="text-xs text-center text-muted-foreground">
              + {plan.subjects.length - 3} more subjects
            </div>
          )}
          
          <Button 
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => onClick(plan.id)}
          >
            <span>View Plan Details</span>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlanCard;
