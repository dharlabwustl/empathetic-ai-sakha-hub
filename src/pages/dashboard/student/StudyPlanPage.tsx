
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { Clock, Calendar as CalendarIcon, Target, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { formatDistance } from 'date-fns';

const StudyPlanPage = () => {
  const { planData, loading } = useUserStudyPlan();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'goals'>('overview');
  
  // Mock data for demonstration
  const examGoal = "IIT-JEE";
  const examDate = new Date("2025-04-15");
  const daysLeft = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  // Highlighted dates for the calendar (mock data)
  const highlightedDates = [
    { date: new Date("2023-11-10"), type: 'deadline' },
    { date: new Date("2023-11-15"), type: 'test' },
    { date: new Date("2023-11-20"), type: 'completed' },
    { date: new Date("2023-11-25"), type: 'important' },
  ];
  
  // Mock data for subject progress
  const subjectProgress = [
    { name: 'Physics', progress: 75, proficiency: 'strong', topics: 24, completed: 18 },
    { name: 'Chemistry', progress: 60, proficiency: 'moderate', topics: 20, completed: 12 },
    { name: 'Mathematics', progress: 45, proficiency: 'weak', topics: 30, completed: 14 },
    { name: 'Biology', progress: 90, proficiency: 'strong', topics: 15, completed: 13 },
  ];
  
  const getProficiencyColor = (proficiency: string) => {
    switch(proficiency) {
      case 'weak': return 'text-red-500';
      case 'moderate': return 'text-amber-500';
      case 'strong': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <SharedPageLayout
      title="Complete Study Plan"
      subtitle={`Your personalized study plan for ${examGoal}`}
    >
      <div className="space-y-6">
        {/* Exam Overview Card */}
        <Card className="border-t-4 border-t-blue-500">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Target className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="text-lg font-semibold">Goal</h3>
                <p className="text-xl font-bold">{examGoal}</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                <CalendarIcon className="h-8 w-8 text-amber-500 mb-2" />
                <h3 className="text-lg font-semibold">Exam Date</h3>
                <p className="text-xl font-bold">{examDate.toLocaleDateString()}</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <Clock className="h-8 w-8 text-purple-500 mb-2" />
                <h3 className="text-lg font-semibold">Days Left</h3>
                <p className="text-xl font-bold">{daysLeft} days</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="text-lg font-semibold">Overall Progress</h3>
                <div className="w-full mt-2">
                  <Progress value={65} className="h-2" />
                </div>
                <p className="text-lg font-semibold mt-2">65%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Study Plan Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="goals">Goals & Milestones</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <h3 className="text-xl font-semibold mt-4">Subject Progress</h3>
            
            {subjectProgress.map((subject, index) => (
              <Card key={index}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <Badge className={`capitalize ${getProficiencyColor(subject.proficiency)}`}>
                      {subject.proficiency}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2 mb-4" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Topics: {subject.completed}/{subject.topics}</span>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      View Details
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2">
                <Card>
                  <CardHeader>
                    <CardTitle>Study Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      // Custom styling for highlighted dates would go here
                    />
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                        <span className="text-xs">Important</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                        <span className="text-xs">Deadline</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                        <span className="text-xs">Completed</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-amber-500 mr-1"></div>
                        <span className="text-xs">Test</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:w-1/2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      {selectedDate ? `Schedule for ${selectedDate.toLocaleDateString()}` : 'Select a date'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-medium">Physics: Waves and Oscillations</h4>
                            <Badge>9:00 AM</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Study chapter 7 and solve exercise problems</p>
                        </div>
                        
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-medium">Chemistry: Organic Compounds</h4>
                            <Badge>11:30 AM</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Complete practice test on functional groups</p>
                        </div>
                        
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-medium">Mathematics: Calculus</h4>
                            <Badge>2:00 PM</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Revision of integration techniques</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        Select a date to view the scheduled tasks
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Goals & Milestones Tab */}
          <TabsContent value="goals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Short-Term Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Complete Physics Module 3</h4>
                      <p className="text-sm text-muted-foreground">Due in 5 days</p>
                    </div>
                    <Progress value={75} className="w-[100px] h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Practice Mock Test #4</h4>
                      <p className="text-sm text-muted-foreground">Due in 3 days</p>
                    </div>
                    <Progress value={0} className="w-[100px] h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Review Weak Areas in Chemistry</h4>
                      <p className="text-sm text-muted-foreground">Due in 8 days</p>
                    </div>
                    <Progress value={30} className="w-[100px] h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Complete Fundamentals</h4>
                      <p className="text-sm text-muted-foreground">Completed 2 weeks ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Advanced Topics Mastery</h4>
                      <p className="text-sm text-muted-foreground">In progress (65% complete)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                      <Target className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Final Revision Phase</h4>
                      <p className="text-sm text-muted-foreground">Starting in 3 months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Long-Term Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Achieve 90% accuracy in mock tests</h4>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Master all high-priority concepts</h4>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Complete all practice exams</h4>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
