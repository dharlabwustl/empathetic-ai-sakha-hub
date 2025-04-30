
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TimeAllocationChart } from '@/components/dashboard/student/todays-plan/TimeAllocationChart';
import TaskCard from '@/components/dashboard/student/todays-plan/TaskCard';
import { CompletionSummary } from '@/components/dashboard/student/todays-plan/CompletionSummary';
import { MoodAdjustedPlan } from '@/components/dashboard/student/todays-plan/MoodAdjustedPlan';
import { 
  Book, BookOpen, Calendar, Check, Clock, FileText, 
  Brain, Award, Flame, CalendarDays, CheckCircle 
} from 'lucide-react';
import { MoodType } from '@/types/user/base';

// Define the types for our tasks
export type TaskItem = {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: number;
  content: string;
  resourceType: "Video" | "Text" | "PDF" | "Flashcards" | "Exam";
  resourceUrl: string;
  completed: boolean;
  type: "concept" | "flashcard" | "exam";
};

// Mock data for today's plan
const todayPlanData = {
  date: new Date(),
  totalTasks: 5,
  completedTasks: 2,
  timeSpent: 45, // minutes
  targetTime: 120, // minutes
  streak: 7, // days
  tasks: [
    {
      id: "c1",
      title: "Newton's Third Law of Motion",
      subject: "Physics",
      chapter: "Laws of Motion",
      difficulty: "Medium" as const,
      estimatedTime: 15,
      content: "Newton's third law states that for every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body exerts a force equal in magnitude and opposite in direction on the first body.",
      resourceType: "Video" as const,
      resourceUrl: "#",
      completed: true,
      type: "concept" as const
    },
    {
      id: "c2",
      title: "Acid-Base Reactions",
      subject: "Chemistry",
      chapter: "Chemical Reactions",
      difficulty: "Easy" as const,
      estimatedTime: 20,
      content: "Acid-base reactions involve the transfer of H+ ions (protons) from one substance to another. In these reactions, acids act as proton donors while bases act as proton acceptors.",
      resourceType: "Text" as const,
      resourceUrl: "#",
      completed: true,
      type: "concept" as const
    },
    {
      id: "c3",
      title: "Integration by Parts",
      subject: "Mathematics",
      chapter: "Integral Calculus",
      difficulty: "Hard" as const,
      estimatedTime: 25,
      content: "Integration by parts is a technique used to evaluate integrals where the integrand is a product of two functions. The formula is: ∫u(x)v'(x)dx = u(x)v(x) - ∫u'(x)v(x)dx",
      resourceType: "PDF" as const,
      resourceUrl: "#",
      completed: false,
      type: "concept" as const
    },
    {
      id: "f1",
      title: "Periodic Table Elements",
      subject: "Chemistry",
      chapter: "Periodic Table",
      difficulty: "Medium" as const,
      estimatedTime: 15,
      content: "Practice recognizing elements, their symbols, and their positions in the periodic table.",
      resourceType: "Flashcards" as const,
      resourceUrl: "#",
      completed: false,
      type: "flashcard" as const
    },
    {
      id: "e1",
      title: "Physics Mid-Term Practice",
      subject: "Physics",
      chapter: "Multiple Chapters",
      difficulty: "Hard" as const,
      estimatedTime: 60,
      content: "Comprehensive practice test covering mechanics, thermodynamics, and waves.",
      resourceType: "Exam" as const,
      resourceUrl: "#",
      completed: false,
      type: "exam" as const
    }
  ]
};

const TodaysPlanView = () => {
  const [currentMood, setCurrentMood] = React.useState<MoodType>('motivated');
  const [activeTab, setActiveTab] = React.useState('all');
  const [todayPlan, setTodayPlan] = React.useState(todayPlanData);
  const navigate = useNavigate();

  const handleCompleteConcept = (id: string) => {
    setTodayPlan(prev => {
      const updatedTasks = prev.tasks.map(task => 
        task.id === id ? {...task, completed: true} : task
      );
      
      return {
        ...prev,
        tasks: updatedTasks,
        completedTasks: updatedTasks.filter(t => t.completed).length
      };
    });
  };

  // Calculate progress percentage
  const progressPercentage = Math.round((todayPlan.completedTasks / todayPlan.totalTasks) * 100);
  
  // Filter tasks based on active tab
  const filteredItems = todayPlan.tasks.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return !item.completed;
    if (activeTab === "completed") return item.completed;
    return item.type === activeTab;
  });
  
  // Time allocation data for the chart
  const timeAllocationData = {
    concepts: todayPlan.tasks.filter(c => c.type === 'concept').reduce((sum, c) => sum + c.estimatedTime, 0),
    flashcards: todayPlan.tasks.filter(c => c.type === 'flashcard').reduce((sum, c) => sum + c.estimatedTime, 0),
    exams: todayPlan.tasks.filter(c => c.type === 'exam').reduce((sum, c) => sum + c.estimatedTime, 0),
    get total() { return this.concepts + this.flashcards + this.exams; }
  };

  return (
    <SharedPageLayout 
      title="Today's Study Plan" 
      subtitle="Your personalized daily learning path"
      showQuickAccess={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2 border-t-4 border-t-blue-500">
          <CardHeader className="bg-gradient-to-r from-sky-50 to-indigo-50 pb-3 dark:from-sky-900/30 dark:to-indigo-900/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="text-blue-500" size={20} />
                  Today's Study Plan
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {todayPlan.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              
              <div className="mt-2 md:mt-0 flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-indigo-500" />
                  <span>Time spent: <span className="font-medium">{todayPlan.timeSpent} min</span></span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={16} className="text-amber-500" />
                  <span>Streak: <span className="font-medium">{todayPlan.streak} days</span></span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {progressPercentage}%</span>
                <span>{todayPlan.completedTasks}/{todayPlan.totalTasks} Tasks</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardHeader>
          
          <CardContent className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid grid-cols-6 w-full mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="concept" className="flex items-center gap-1">
                  <BookOpen size={14} /> Concepts
                </TabsTrigger>
                <TabsTrigger value="flashcard" className="flex items-center gap-1">
                  <Brain size={14} /> Flashcards
                </TabsTrigger>
                <TabsTrigger value="exam" className="flex items-center gap-1">
                  <FileText size={14} /> Exams
                </TabsTrigger>
              </TabsList>
            
              <div className="space-y-4">
                {filteredItems.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onComplete={() => handleCompleteConcept(task.id)} 
                  />
                ))}
                
                {filteredItems.length === 0 && (
                  <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-muted-foreground">No items found for the selected filter</p>
                  </div>
                )}
                
                {activeTab === "all" && progressPercentage === 100 && (
                  <div className="mt-6 text-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="inline-block p-2 bg-green-100 dark:bg-green-800/50 rounded-full mb-2">
                      <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium text-green-800 dark:text-green-300">Amazing job! You've completed today's study plan.</h3>
                    <p className="text-sm text-green-600 dark:text-green-400">Check back tomorrow for your next set of concepts.</p>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 bg-gray-50 dark:bg-gray-800/50 border-t">
            <Button variant="default" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600">
              <CheckCircle className="h-4 w-4 mr-1" /> Start Study Session
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate(-1)}>
              <CalendarDays className="h-4 w-4 mr-1" /> Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <MoodAdjustedPlan currentMood={currentMood} onMoodChange={setCurrentMood} />
          <TimeAllocationChart data={timeAllocationData} />
          <CompletionSummary 
            completed={todayPlan.completedTasks}
            total={todayPlan.totalTasks}
            timeSpent={todayPlan.timeSpent}
            targetTime={todayPlan.targetTime}
          />
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default TodaysPlanView;
