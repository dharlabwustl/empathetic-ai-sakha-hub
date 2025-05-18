
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Zap, Calendar, BarChart3, ArrowRight } from 'lucide-react';

// Define StudyPlanTopic interface to fix build errors
interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'pending' | 'in-progress' | 'completed';
  priority: number; // Add required priority field
}

const AcademicAdvisor = () => {
  const [activeTab, setActiveTab] = React.useState("current-plan");

  // Sample data
  const upcomingExams = [
    {
      id: "exam-1",
      title: "Physics Unit Test",
      date: "2023-11-20",
      timeRemaining: "3 days",
      topics: 5,
      readiness: 80,
    },
    {
      id: "exam-2",
      title: "Chemistry Mock Test",
      date: "2023-11-25",
      timeRemaining: "8 days",
      topics: 7,
      readiness: 65,
    }
  ];

  const weeklyGoals = [
    {
      id: "goal-1",
      title: "Complete Physics Motion chapter",
      progress: 70,
      due: "2 days left",
    },
    {
      id: "goal-2",
      title: "Practice 50 Organic Chemistry problems",
      progress: 30,
      due: "5 days left",
    },
    {
      id: "goal-3",
      title: "Review Calculus concepts",
      progress: 100,
      due: "Completed",
    }
  ];

  const studyPlanTopics: StudyPlanTopic[] = [
    {
      id: "topic-1",
      name: "Newton's Laws of Motion",
      difficulty: "medium",
      completed: true,
      status: "completed",
      priority: 1
    },
    {
      id: "topic-2",
      name: "Atomic Structure",
      difficulty: "medium",
      completed: true,
      status: "completed",
      priority: 2
    },
    {
      id: "topic-3",
      name: "Differentiation",
      difficulty: "hard",
      completed: true,
      status: "completed",
      priority: 3
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Academic Advisor</h2>
          <p className="text-muted-foreground">
            Your personalized study plan and academic guidance
          </p>
        </div>
        <Button size="sm">Generate New Plan</Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current-plan">Current Plan</TabsTrigger>
          <TabsTrigger value="upcoming-exams">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current-plan" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Study Plan</CardTitle>
                <CardDescription>Topics and goals for this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyGoals.map(goal => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <CheckCircle2 className={`h-5 w-5 mr-2 ${
                          goal.progress === 100 ? "text-green-500" : "text-gray-400"
                        }`} />
                        <span>{goal.title}</span>
                      </div>
                      <Badge variant={goal.progress === 100 ? "default" : "outline"}>
                        {goal.due}
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{width: `${goal.progress}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">View All Topics</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Study Stats</CardTitle>
                <CardDescription>Your weekly progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Study Hours</div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" />
                    <span className="text-2xl font-bold">12.5</span>
                    <span className="text-sm text-muted-foreground ml-1">/ 15h goal</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Topics Covered</div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-2xl font-bold">8</span>
                    <span className="text-sm text-muted-foreground ml-1">/ 10 planned</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Productivity Score</div>
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                    <span className="text-2xl font-bold">82</span>
                    <span className="text-sm text-muted-foreground ml-1">/ 100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Focus Topics</CardTitle>
              <CardDescription>Based on your performance and exam schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyPlanTopics.map(topic => (
                  <div key={topic.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge variant={
                        topic.difficulty === 'easy' ? 'outline' : 
                        topic.difficulty === 'medium' ? 'secondary' : 
                        'destructive'
                      } className="mr-2">
                        {topic.difficulty}
                      </Badge>
                      <span className={topic.completed ? "line-through text-muted-foreground" : ""}>
                        {topic.name}
                      </span>
                    </div>
                    
                    {topic.completed ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                        Completed
                      </Badge>
                    ) : (
                      <Button size="sm" variant="ghost">
                        Study Now <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming-exams" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingExams.map(exam => (
              <Card key={exam.id}>
                <CardHeader>
                  <CardTitle>{exam.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(exam.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Time Remaining:</span>
                      <Badge variant="outline">{exam.timeRemaining}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Topics:</span>
                      <span>{exam.topics}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Readiness:</span>
                        <span>{exam.readiness}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div 
                          className={`h-2 rounded-full ${
                            exam.readiness >= 80 ? 'bg-green-500' :
                            exam.readiness >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{width: `${exam.readiness}%`}}
                        ></div>
                      </div>
                    </div>
                    <Button className="w-full mt-2">Prepare for Exam</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button variant="outline" className="w-full">View All Exams</Button>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Performance charts will appear here</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Complete more quizzes and exams to see your performance data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicAdvisor;
