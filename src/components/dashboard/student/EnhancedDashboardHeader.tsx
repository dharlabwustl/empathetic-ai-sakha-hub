
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, CalendarDays, CheckCircle2, BrainCircuit, Plus, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfileType, MoodType } from "@/types/user/base";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import CreateStudyPlanWizard from './academic/CreateStudyPlanWizard';
import MoodLogButton from './mood-tracking/MoodLogButton';

type EventType = 'exam' | 'task' | 'class';

interface UpcomingEvent {
  title: string;
  time: string;
  type: EventType;
  daysLeft?: number;
}

interface Goal {
  id: string;
  title: string;
  description?: string;
  targetDate?: Date;
  progress?: number;
}

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents?: UpcomingEvent[];
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange,
  upcomingEvents = []
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  
  // Extract goals from user profile
  const goals = userProfile.goals || [
    {
      id: '1',
      title: 'NEET Exam',
      targetDate: new Date(new Date().getFullYear(), 4, 15), // May 15
      progress: 45
    }
  ];

  // Calculate days until exam
  const calculateDaysUntil = (date?: Date) => {
    if (!date) return null;
    
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  const createStudyPlan = (newPlan: any) => {
    console.log("Creating new study plan:", newPlan);
    setDialogOpen(false);
    // In a real app, this would save the plan to the backend
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Top row - Greeting and time */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Hello, {userProfile.name || 'Student'}!</h1>
          <p className="text-muted-foreground flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{formattedTime}</span>
            <span className="mx-2">•</span>
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>{formattedDate}</span>
          </p>
        </div>

        {/* Mood Log Button */}
        {onMoodChange && (
          <MoodLogButton
            currentMood={currentMood}
            onMoodChange={onMoodChange}
            buttonSize="md"
          />
        )}
      </div>
      
      {/* Middle row - Exam goal and study plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Exam Goal Card */}
        <Card className="lg:col-span-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-medium">Your Exam Preparation</h3>
                </div>
                
                {goals.map((goal) => (
                  <div key={goal.id} className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-indigo-600">{goal.title}</Badge>
                      {goal.targetDate && (
                        <Badge variant="outline">
                          {calculateDaysUntil(goal.targetDate)} days left
                        </Badge>
                      )}
                    </div>
                    
                    {goal.progress !== undefined && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600 rounded-full" 
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Change exam or study plan button */}
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setDialogOpen(true)}
                    className="text-xs"
                  >
                    Change exam or update study plan
                  </Button>
                </div>
              </div>
              
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex gap-1 items-center">
                    <Plus className="h-4 w-4" />
                    Create New Study Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <CreateStudyPlanWizard 
                    isOpen={true}
                    onCreatePlan={createStudyPlan} 
                    onClose={handleDialogClose} 
                    examGoal={goals[0]?.title}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Events Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Upcoming Events</h3>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={
                        event.type === 'exam' 
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : event.type === 'task'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-green-50 text-green-700 border-green-200'
                      }>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                      <span>{event.title}</span>
                    </div>
                    <span className="text-muted-foreground">{event.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming events scheduled</p>
            )}
            
            <Button variant="outline" className="w-full mt-3 text-sm">
              View Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards Row - Updated KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-muted-foreground">Dynamic Study Plans</span>
            <span className="text-2xl font-bold mt-1">124</span>
            <div className="flex items-center mt-2 text-xs text-emerald-600">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span>+18% this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-muted-foreground">Stress Reduced</span>
            <span className="text-2xl font-bold mt-1">43%</span>
            <div className="flex items-center mt-2 text-xs text-emerald-600">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span>+7% improvement</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-muted-foreground">Total Students</span>
            <span className="text-2xl font-bold mt-1">1,248</span>
            <div className="flex items-center mt-2 text-xs text-emerald-600">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span>+24% this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-muted-foreground">Success Rate</span>
            <span className="text-2xl font-bold mt-1">92%</span>
            <div className="flex items-center mt-2 text-xs text-emerald-600">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span>+3% improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
