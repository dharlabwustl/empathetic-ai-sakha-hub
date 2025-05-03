
import React from 'react';
import { StudyPlanSubject } from '@/types/user/studyPlan';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart2, Star, AlertTriangle, Clock } from 'lucide-react';

interface SubjectsListProps {
  subjects: StudyPlanSubject[];
}

const SubjectsList: React.FC<SubjectsListProps> = ({ subjects }) => {
  const getSubjectIcon = (subject: StudyPlanSubject) => {
    switch (subject.priority) {
      case 'high':
        return <Star className="h-4 w-4 text-amber-500" />;
      case 'medium':
        return <BarChart2 className="h-4 w-4 text-blue-500" />;
      case 'low':
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <BarChart2 className="h-4 w-4 text-blue-500" />;
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'strong':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
      case 'moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400';
      case 'weak':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const calculateProgressValue = (subject: StudyPlanSubject): number => {
    // If progress is available, use it, otherwise return 0
    return (subject as any).progress || 0;
  };

  if (subjects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
          <AlertTriangle className="h-10 w-10 text-amber-400" />
          <p className="text-center text-muted-foreground">
            No subjects have been added to this study plan yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {subjects.map((subject) => (
        <Card key={subject.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getSubjectIcon(subject)}
                <h3 className="font-medium">{subject.name}</h3>
              </div>
              <Badge 
                variant="outline" 
                className={getProficiencyColor(subject.proficiency)}
              >
                {subject.proficiency.charAt(0).toUpperCase() + subject.proficiency.slice(1)}
              </Badge>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span>{calculateProgressValue(subject)}%</span>
              </div>
              <Progress 
                value={calculateProgressValue(subject)} 
                className="h-2"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '--tw-progress-bar-color': subject.color || '#3b82f6'
                } as React.CSSProperties}
              />
            </div>
            
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <span>Priority: {subject.priority.charAt(0).toUpperCase() + subject.priority.slice(1)}</span>
              <span>{subject.hoursPerWeek} hours/week</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubjectsList;
