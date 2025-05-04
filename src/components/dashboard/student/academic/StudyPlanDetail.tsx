
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';
import { format, differenceInDays } from 'date-fns';
import { Calendar, Clock, BookOpen, GraduationCap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface StudyPlanDetailProps {
  plan: StudyPlan;
  isOpen: boolean;
  onClose: () => void;
}

const StudyPlanDetail: React.FC<StudyPlanDetailProps> = ({
  plan,
  isOpen,
  onClose,
}) => {
  const examDate = plan.examDate ? new Date(plan.examDate) : new Date();
  const daysLeft = differenceInDays(examDate, new Date());
  const progress = plan.progressPercentage || plan.progress || 0;

  // Get badge color based on proficiency
  const getProficiencyBadge = (proficiency: string) => {
    switch(proficiency) {
      case 'weak':
        return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400';
      case 'strong':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            {plan.examGoal || plan.goal || 'Study Plan'} Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-muted/40 p-4 rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Exam Date</h4>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium">{format(examDate, 'dd MMM yyyy')}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {daysLeft > 0 ? `${daysLeft} days remaining` : 'Exam day passed'}
              </div>
            </div>
            
            <div className="bg-muted/40 p-4 rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Study Hours</h4>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium">{plan.weeklyHours || 0} hrs/week</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {plan.studyHoursPerDay || 0} hours per day
              </div>
            </div>
            
            <div className="bg-muted/40 p-4 rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Learning Pace</h4>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium capitalize">{plan.learningPace || 'moderate'}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {plan.preferredStudyTime ? `Preferred time: ${plan.preferredStudyTime}` : 'No preferred time set'}
              </div>
            </div>
          </div>
          
          {/* Progress section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Overall Progress</h3>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Subjects section */}
          <div className="space-y-4">
            <h3 className="font-medium">Subjects</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {plan.subjects?.map((subject: StudyPlanSubject) => (
                <div 
                  key={subject.id} 
                  className="border rounded-md p-3"
                  style={{ borderLeftWidth: '4px', borderLeftColor: subject.color || '#ccc' }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{subject.name}</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {subject.hoursPerWeek} hrs/week
                        </Badge>
                        <Badge className={getProficiencyBadge(subject.proficiency)}>
                          {subject.proficiency}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {subject.priority} priority
                    </Badge>
                  </div>
                  
                  {/* Topics */}
                  {subject.topics && subject.topics.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-xs text-muted-foreground mb-2">Topics</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {subject.topics.slice(0, 4).map((topic) => (
                          <div key={topic.id} className="flex items-center text-sm">
                            <div className={`w-2 h-2 rounded-full mr-2 ${topic.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span>{topic.name}</span>
                          </div>
                        ))}
                        {subject.topics.length > 4 && (
                          <div className="text-xs text-muted-foreground">+ {subject.topics.length - 4} more topics</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {(!plan.subjects || plan.subjects.length === 0) && (
                <div className="text-center py-4 text-muted-foreground">
                  No subjects defined for this study plan.
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button disabled={plan.status === 'completed'}>
            {plan.status === 'active' ? 'Update Plan' : 'View Schedule'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDetail;
