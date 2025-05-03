
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onViewDetails: (planId: string) => void;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onViewDetails }) => {
  const getStatusColor = () => {
    switch (plan.status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{plan.title}</CardTitle>
          <Badge variant="outline" className={getStatusColor()}>
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Target: {formatDate(plan.examDate)}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium mb-1">Subjects: {plan.subjects.length}</div>
            <div className="text-xs text-gray-500">
              {plan.subjects.slice(0, 3).map(subject => subject.name).join(', ')}
              {plan.subjects.length > 3 ? ' and more...' : ''}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Completion</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                style={{ width: `${plan.progress || 0}%` }}
              ></div>
            </div>
            <div className="text-xs text-right mt-1 text-gray-500">
              {plan.progress || 0}% Complete
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-between" 
          onClick={() => onViewDetails(plan.id)}
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyPlanCard;
