
import { useState } from "react";
import { Calendar, Check, Clock, Lightbulb } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudyTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  timeRequired: number;
  completed: boolean;
  progress?: number;
}

interface StudyPlan {
  id: string;
  title: string;
  subject: string;
  goal: string;
  tasks: StudyTask[];
  startDate: string;
  endDate: string;
  progress: number;
}

export default function AcademicAdvisorCard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("current");
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([
    {
      id: "plan-1",
      title: "Physics Mechanics Mastery",
      subject: "Physics",
      goal: "Understand Newton's Laws and Applications",
      tasks: [
        {
          id: "task-1-1",
          title: "Newton's First Law Basics",
          subject: "Physics",
          dueDate: "2025-05-15",
          timeRequired: 60,
          completed: true,
        },
        {
          id: "task-1-2",
          title: "Newton's Second Law Problems",
          subject: "Physics",
          dueDate: "2025-05-16",
          timeRequired: 90,
          completed: false,
        },
        {
          id: "task-1-3",
          title: "Newton's Third Law Applications",
          subject: "Physics",
          dueDate: "2025-05-17",
          timeRequired: 120,
          completed: false,
        },
      ],
      startDate: "2025-05-15",
      endDate: "2025-05-20",
      progress: 33,
    },
    {
      id: "plan-2",
      title: "Algebra Foundations",
      subject: "Mathematics",
      goal: "Master Algebraic Equations and Functions",
      tasks: [
        {
          id: "task-2-1",
          title: "Linear Equations",
          subject: "Mathematics",
          dueDate: "2025-05-14",
          timeRequired: 60,
          completed: true,
        },
        {
          id: "task-2-2",
          title: "Quadratic Equations",
          subject: "Mathematics",
          dueDate: "2025-05-15",
          timeRequired: 90,
          completed: true,
        },
        {
          id: "task-2-3",
          title: "Functions and Graphs",
          subject: "Mathematics",
          dueDate: "2025-05-17",
          timeRequired: 120,
          completed: false,
        },
      ],
      startDate: "2025-05-14",
      endDate: "2025-05-19",
      progress: 66,
    },
  ]);

  const handleToggleTask = (planId: string, taskId: string) => {
    setStudyPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.id === planId) {
          const updatedTasks = plan.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          
          // Calculate new progress
          const completedCount = updatedTasks.filter(t => t.completed).length;
          const totalTasks = updatedTasks.length;
          const newProgress = Math.round((completedCount / totalTasks) * 100);
          
          return {
            ...plan,
            tasks: updatedTasks,
            progress: newProgress,
          };
        }
        return plan;
      })
    );

    toast({
      title: "Task status updated",
      description: "Your study plan has been updated",
    });
  };

  const createNewStudyPlan = () => {
    toast({
      title: "Creating new study plan",
      description: "Let's set up a new personalized study plan",
    });
    // In a real app, this would open a wizard or form
  };

  const getRecommendation = () => {
    toast({
      title: "AI Recommendation",
      description: "Based on your progress, we recommend focusing on Physics concepts today",
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Academic Advisor</span>
          <Button size="sm" onClick={createNewStudyPlan}>+ New Study Plan</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <Tabs defaultValue="current" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Plans</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-4">
            {studyPlans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{plan.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Goal: {plan.goal}
                    </p>
                  </div>
                  <div className="text-sm bg-muted px-2 py-1 rounded">
                    {plan.subject}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} />
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> {plan.startDate} - {plan.endDate}
                  </div>
                  <div>
                    {plan.tasks.filter(t => t.completed).length}/{plan.tasks.length} tasks completed
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <h4 className="text-sm font-medium">Tasks</h4>
                  {plan.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2 bg-muted/50 p-2 rounded">
                      <Button
                        size="icon"
                        variant={task.completed ? "default" : "outline"}
                        className="h-6 w-6"
                        onClick={() => handleToggleTask(plan.id, task.id)}
                      >
                        <Check size={14} />
                      </Button>
                      <div className="flex-grow">
                        <p className={`text-sm ${task.completed ? "line-through opacity-70" : ""}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due: {task.dueDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} /> {task.timeRequired} min
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="bg-muted/30 border rounded-lg p-4 flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded">
                <Lightbulb size={24} className="text-primary" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">AI Recommendation</h3>
                <p className="text-sm text-muted-foreground">Need suggestions on what to focus on next?</p>
              </div>
              <Button variant="outline" onClick={getRecommendation}>Get Recommendation</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="text-center py-8">
              <Calendar className="mx-auto mb-3 text-muted-foreground" />
              <h3 className="font-medium">No completed plans yet</h3>
              <p className="text-sm text-muted-foreground">
                Your completed study plans will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
