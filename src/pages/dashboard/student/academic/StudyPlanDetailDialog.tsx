
import React, { useState } from 'react';
import { StudyPlan } from '@/types/user/studyPlan';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, BookOpen, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface StudyPlanDetailDialogProps {
  plan: StudyPlan;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StudyPlanDetailDialog: React.FC<StudyPlanDetailDialogProps> = ({
  plan,
  open,
  onOpenChange,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Format dates and calculate days left
  const examDate = new Date(plan.examDate);
  const formattedExamDate = format(new Date(plan.examDate), 'MMMM d, yyyy');
  const today = new Date();
  const daysLeft = differenceInDays(examDate, today) > 0 ? differenceInDays(examDate, today) : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            {plan.title || plan.examGoal}
            <Badge className="ml-2" variant={plan.status === 'active' ? 'default' : 'outline'}>
              {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center mt-1">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>
                {formattedExamDate}
              </span>
              {daysLeft > 0 && plan.status === 'active' && (
                <span className="ml-2 text-amber-600">
                  {daysLeft} days left
                </span>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Progress</h3>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Overall Completion</span>
                    <span className="font-medium">{plan.progressPercent || 0}%</span>
                  </div>
                  <Progress value={plan.progressPercent || 0} className="h-2" />
                  
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm text-muted-foreground">Subjects Breakdown</h4>
                    {plan.subjects.map(subject => (
                      <div key={subject.id} className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center">
                            <div 
                              className="w-2 h-2 rounded-full mr-1.5" 
                              style={{ backgroundColor: subject.color }}
                            ></div>
                            <span>{subject.name}</span>
                          </div>
                          <span className="text-xs">{subject.completed ? 'Complete' : 'In progress'}</span>
                        </div>
                        <Progress value={subject.completed ? 100 : 30} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="font-medium mb-2">Study Configuration</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Daily Study</span>
                      <span className="text-sm">{plan.studyHoursPerDay} hours/day</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Weekly Hours</span>
                      <span className="text-sm">{plan.weeklyHours || plan.studyHoursPerDay! * 7} hours/week</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Preferred Time</span>
                      <span className="text-sm capitalize">{plan.preferredStudyTime}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Learning Pace</span>
                      <span className="text-sm capitalize">{plan.learningPace}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <h4 className="text-sm text-muted-foreground mb-2">Plan Details</h4>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Created</span>
                      <span className="text-sm">
                        {plan.createdAt ? format(new Date(plan.createdAt), 'MMM d, yyyy') : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Updated</span>
                      <span className="text-sm">
                        {plan.updatedAt ? format(new Date(plan.updatedAt), 'MMM d, yyyy') : 'N/A'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-4">
            {plan.subjects.map(subject => (
              <Card key={subject.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: subject.color }}
                      ></div>
                      <h3 className="font-medium">{subject.name}</h3>
                    </div>
                    <div>
                      <Badge 
                        variant="outline"
                        className={
                          subject.proficiency === 'weak' ? 'border-red-500 text-red-500' :
                          subject.proficiency === 'medium' ? 'border-amber-500 text-amber-500' :
                          'border-green-500 text-green-500'
                        }
                      >
                        {subject.proficiency}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{subject.hoursPerWeek} hrs/week</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Priority: {subject.priority}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <Card key={day} className="overflow-hidden">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">{day}</h3>
                    
                    <div className="space-y-2 text-sm">
                      {plan.subjects.length > 0 ? (
                        <div>
                          {/* Show a subject for each day - this is a placeholder */}
                          <div className="flex items-center p-2 bg-muted rounded">
                            <div 
                              className="w-2 h-2 rounded-full mr-1.5" 
                              style={{ backgroundColor: plan.subjects[0].color }}
                            ></div>
                            <span>{plan.subjects[0].name}</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {plan.preferredStudyTime === 'morning' ? '8:00 AM' : 
                               plan.preferredStudyTime === 'afternoon' ? '2:00 PM' :
                               plan.preferredStudyTime === 'evening' ? '7:00 PM' : '10:00 PM'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground">No sessions scheduled</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-4">
              <Button className="mx-auto">
                <CalendarIcon className="w-4 h-4 mr-2" />
                View Full Schedule
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          {plan.status === 'active' && (
            <Button className="ml-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Update Progress
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDetailDialog;
