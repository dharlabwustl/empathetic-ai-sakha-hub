
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Calendar, 
  PieChart 
} from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { StudyPlan } from '@/types/user/studyPlan';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

import CreateStudyPlanDialog from './academic/CreateStudyPlanDialog';
import StudyPlanDetailDialog from './academic/StudyPlanDetailDialog';

const AcademicAdvisor: React.FC = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  
  // Demo study plans data
  const [plans] = useState<StudyPlan[]>([
    {
      id: "plan-1",
      title: "NEET Preparation",
      examGoal: "NEET",
      examDate: new Date(2025, 4, 15).toISOString(),
      status: "active",
      progressPercent: 35,
      subjects: [
        {
          id: "subj-1",
          name: "Physics",
          color: "#3b82f6",
          hoursPerWeek: 6,
          priority: "high",
          proficiency: "medium",
          completed: false
        },
        {
          id: "subj-2",
          name: "Chemistry",
          color: "#10b981",
          hoursPerWeek: 4,
          priority: "medium",
          proficiency: "weak",
          completed: false
        },
        {
          id: "subj-3",
          name: "Biology",
          color: "#ef4444",
          hoursPerWeek: 8,
          priority: "high",
          proficiency: "strong",
          completed: false
        }
      ],
      studyHoursPerDay: 4,
      preferredStudyTime: "evening",
      learningPace: "moderate",
      createdAt: new Date(2023, 9, 10).toISOString(),
      updatedAt: new Date(2023, 9, 10).toISOString(),
      daysLeft: 180
    },
    {
      id: "plan-2",
      title: "JEE Advanced Preparation",
      examGoal: "JEE Advanced",
      examDate: new Date(2024, 11, 10).toISOString(),
      status: "completed",
      progressPercent: 100,
      subjects: [
        {
          id: "subj-4",
          name: "Physics",
          color: "#8b5cf6",
          hoursPerWeek: 8,
          priority: "high",
          proficiency: "medium",
          completed: true
        },
        {
          id: "subj-5",
          name: "Chemistry",
          color: "#f59e0b",
          hoursPerWeek: 6,
          priority: "medium",
          proficiency: "medium",
          completed: true
        },
        {
          id: "subj-6",
          name: "Mathematics",
          color: "#ec4899",
          hoursPerWeek: 10,
          priority: "high",
          proficiency: "weak",
          completed: true
        }
      ],
      studyHoursPerDay: 6,
      preferredStudyTime: "morning",
      learningPace: "fast",
      createdAt: new Date(2023, 8, 15).toISOString(),
      updatedAt: new Date(2023, 8, 15).toISOString(),
      daysLeft: 0
    }
  ]);

  const activePlans = plans.filter(plan => plan.status === "active");
  const completedPlans = plans.filter(plan => plan.status === "completed" || plan.status === "archived");
  
  // Get the first active plan for visualization
  const currentPlan = activePlans.length > 0 ? activePlans[0] : null;

  const handleViewPlanDetails = (plan: StudyPlan) => {
    setSelectedPlan(plan);
  };

  const handleCloseDetails = () => {
    setSelectedPlan(null);
  };

  const handleCreateNewPlan = () => {
    setShowCreateDialog(true);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header section */}
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link to="/dashboard/student">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Return to main dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Academic Advisor</h1>
              <p className="text-muted-foreground mt-1">
                Your personalized study plans and academic progress tracking
              </p>
            </div>
          </div>
        </div>
        
        <Button onClick={handleCreateNewPlan}>
          Create New Study Plan
        </Button>
      </div>

      {/* Plan Visualizer - only shown when there's an active plan */}
      {currentPlan && (
        <Card className="border-2 border-purple-100 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col space-y-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Exam Goal</span>
                <span className="text-xl font-semibold">{currentPlan.examGoal}</span>
                <div className="flex items-center mt-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">
                    {new Date(currentPlan.examDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span className={`text-sm ${currentPlan.daysLeft && currentPlan.daysLeft < 30 ? 'text-amber-500 font-medium' : ''}`}>
                    {currentPlan.daysLeft} days left
                  </span>
                </div>
              </div>

              <div className="flex flex-col space-y-2 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Study Plan Progress</span>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${currentPlan.progressPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-medium">{currentPlan.progressPercent}%</span>
                </div>
                <span className="text-sm text-muted-foreground mt-2">Focus Areas</span>
                <div className="space-y-1">
                  {currentPlan.subjects
                    .filter(subj => subj.proficiency === 'weak')
                    .slice(0, 2)
                    .map(subject => (
                      <span 
                        key={subject.id} 
                        className="inline-block mr-2 text-sm px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
                      >
                        {subject.name}
                      </span>
                    ))
                  }
                </div>
              </div>

              <div className="flex flex-col space-y-2 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Daily Study</span>
                <span className="text-xl font-semibold">{currentPlan.studyHoursPerDay} hrs/day</span>
                <span className="text-sm text-muted-foreground mt-2">Time Preference</span>
                <span className="text-sm capitalize">{currentPlan.preferredStudyTime}</span>
                <span className="text-sm text-muted-foreground mt-2">Learning Pace</span>
                <span className="text-sm capitalize">{currentPlan.learningPace}</span>
              </div>

              <div className="flex flex-col space-y-2 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <span className="text-sm text-muted-foreground">Subject Distribution</span>
                <div className="flex-1 flex items-center justify-center">
                  <PieChart className="h-12 w-12 text-amber-500" />
                </div>
                <div className="grid grid-cols-1 gap-1 mt-auto">
                  {currentPlan.subjects.map(subject => (
                    <div key={subject.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: subject.color }}></div>
                        <span>{subject.name}</span>
                      </div>
                      <span>{subject.hoursPerWeek} hrs/week</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Listing */}
      <Card>
        <CardHeader>
          <CardTitle>My Study Plans</CardTitle>
          <CardDescription>Manage and track your exam preparation plans</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="active">Active Plans</TabsTrigger>
              <TabsTrigger value="completed">Completed Plans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-0">
              {activePlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activePlans.map(plan => (
                    <StudyPlanCard 
                      key={plan.id} 
                      plan={plan} 
                      onView={() => handleViewPlanDetails(plan)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">No active study plans</h3>
                  <p className="text-muted-foreground">Create a new study plan to start tracking your progress</p>
                  <Button onClick={handleCreateNewPlan}>Create Study Plan</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              {completedPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {completedPlans.map(plan => (
                    <StudyPlanCard 
                      key={plan.id} 
                      plan={plan} 
                      onView={() => handleViewPlanDetails(plan)} 
                      isCompleted
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No completed study plans yet</h3>
                  <p className="text-muted-foreground">Your completed plans will appear here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateStudyPlanDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

      {selectedPlan && (
        <StudyPlanDetailDialog
          plan={selectedPlan}
          open={!!selectedPlan}
          onOpenChange={handleCloseDetails}
        />
      )}
    </div>
  );
};

// Study Plan Card Component
interface StudyPlanCardProps {
  plan: StudyPlan;
  onView: () => void;
  isCompleted?: boolean;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onView, isCompleted }) => {
  return (
    <Card className={`hover:shadow-md transition-all ${!isCompleted ? 'border-l-4' : ''}`}
      style={!isCompleted ? { borderLeftColor: '#8b5cf6' } : {}}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{plan.title || plan.examGoal}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3.5 w-3.5" />
              <span>
                {new Date(plan.examDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          <Badge variant={plan.status === 'active' ? 'default' : 'outline'}>
            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span>Progress:</span>
            <span className="font-medium">{plan.progressPercent}%</span>
          </div>
          <Progress value={plan.progressPercent} className="h-2" />
          
          <div className="space-y-1">
            <div className="text-sm font-medium">Subjects:</div>
            {plan.subjects.slice(0, 3).map(subject => (
              <div key={subject.id} className="flex items-center text-xs space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.color }}></div>
                <span>{subject.name}</span>
                <span className="text-muted-foreground ml-auto">{subject.hoursPerWeek} hrs/week</span>
              </div>
            ))}
            
            {plan.subjects.length > 3 && (
              <div className="text-xs text-center text-muted-foreground">
                + {plan.subjects.length - 3} more subjects
              </div>
            )}
          </div>
          
          <Button 
            variant="outline"
            className="w-full mt-2"
            onClick={onView}
          >
            View Plan Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicAdvisor;
