
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, Clock, CheckCircle } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';
import { format, differenceInDays } from 'date-fns';

interface StudyPlanDetailProps {
  plan: StudyPlan;
  isOpen: boolean;
  onClose: () => void;
}

const StudyPlanDetail: React.FC<StudyPlanDetailProps> = ({
  plan,
  isOpen,
  onClose
}) => {
  const examDate = new Date(plan.examDate);
  const formattedExamDate = format(examDate, 'MMMM d, yyyy');
  const today = new Date();
  const daysLeft = differenceInDays(examDate, today) > 0 ? differenceInDays(examDate, today) : 0;
  
  const totalTopics = plan.subjects.reduce((total, subject) => {
    return total + (subject.topics?.length || 0);
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{plan.title || plan.examGoal}</span>
            <Badge variant={plan.status === 'active' ? 'default' : 'outline'}>
              {plan.status === 'active' ? 'Active' : 'Completed'}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto pr-2 max-h-[calc(80vh-120px)]">
          {/* Study Plan Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Exam Goal</h3>
                <p className="font-medium text-lg">{plan.examGoal}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Exam Date: {formattedExamDate}</span>
              </div>
              
              {daysLeft > 0 && plan.status === 'active' && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className={daysLeft < 7 ? 'text-amber-600 font-medium' : ''}>
                    {daysLeft} days remaining
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{plan.progressPercent}%</span>
                </div>
                <Progress value={plan.progressPercent} className="h-2 mt-2" />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Study Hours Per Day:</span>
                </div>
                <span className="font-medium">{plan.studyHoursPerDay || 0} hours</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Weekly Hours:</span>
                </div>
                <span className="font-medium">{plan.weeklyHours || 0} hours</span>
              </div>
            </div>
          </div>
          
          {/* Tabs for subjects and schedule */}
          <Tabs defaultValue="subjects" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="preferences">Study Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subjects" className="space-y-4">
              <h3 className="font-semibold text-lg">Subject Breakdown</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your plan includes {plan.subjects.length} subjects with a total of {totalTopics} topics.
              </p>
              
              {plan.subjects.map((subject) => (
                <Card key={subject.id} className="mb-4" style={{ borderLeft: `4px solid ${subject.color}` }}>
                  <CardContent className="py-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{subject.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {subject.proficiency}
                        </Badge>
                      </div>
                      <span className="text-sm">{subject.hoursPerWeek} hours/week</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Proficiency</span>
                        <span className="font-medium">{subject.proficiency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Priority</span>
                        <span className="font-medium">{subject.priority}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-4">
              <h3 className="font-semibold text-lg">Study Preferences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="font-medium mb-2">Learning Pace</h4>
                    <div className="text-sm">
                      {plan.learningPace === 'slow' && 'Relaxed pace with thorough understanding'}
                      {plan.learningPace === 'moderate' && 'Balanced pace with good comprehension'}
                      {plan.learningPace === 'fast' && 'Aggressive pace to cover maximum material'}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-4">
                    <h4 className="font-medium mb-2">Preferred Study Time</h4>
                    <div className="text-sm">
                      {plan.preferredStudyTime === 'morning' && 'Morning (5AM - 12PM)'}
                      {plan.preferredStudyTime === 'afternoon' && 'Afternoon (12PM - 5PM)'}
                      {plan.preferredStudyTime === 'evening' && 'Evening (5PM - 10PM)'}
                      {plan.preferredStudyTime === 'night' && 'Night (10PM - 5AM)'}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-4">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Plan Created</h4>
                  <div className="text-sm">
                    {plan.createdAt && format(new Date(plan.createdAt), 'MMMM d, yyyy')}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="mt-4 gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          {plan.status === 'active' && (
            <Button className="gap-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark as Complete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDetail;
