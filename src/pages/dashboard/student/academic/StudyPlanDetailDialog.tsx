
import React, { useState } from 'react';
import { StudyPlan } from '@/types/user/studyPlan';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, BookOpen, Clock } from 'lucide-react';

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
                {new Date(plan.examDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              {plan.daysLeft && plan.daysLeft > 0 && (
                <span className="ml-2 text-amber-600">
                  {plan.daysLeft} days left
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
            <div className="grid grid-cols-2 gap-4">
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
                        {new Date(plan.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Updated</span>
                      <span className="text-sm">
                        {new Date(plan.updatedAt).toLocaleDateString()}
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
                  
                  {subject.topics && subject.topics.length > 0 ? (
                    <div>
                      <h4 className="text-sm mb-2">Topics</h4>
                      <div className="space-y-2">
                        {subject.topics.map(topic => (
                          <div key={topic.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                            <span>{topic.name}</span>
                            <Badge variant={topic.completed ? "default" : "outline"}>
                              {topic.completed ? "Completed" : "Pending"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      No topics defined for this subject
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <div className="text-center py-12 text-muted-foreground">
              <h3 className="text-lg font-medium">Weekly Schedule</h3>
              <p className="mt-2">
                Detailed scheduling features coming soon. Currently, plan for {plan.studyHoursPerDay} hours of study per day.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDetailDialog;
