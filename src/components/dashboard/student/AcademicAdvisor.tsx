
import React from 'react';
import { StudyPlanTopic } from '@/types/student/studyPlan';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Book, ArrowRight } from 'lucide-react';

const AcademicAdvisor = () => {
  // Helper function to generate random topics for demonstration
  const generateTopics = (): StudyPlanTopic[] => {
    const allTopics: StudyPlanTopic[] = [
      {
        id: "topic1",
        name: "Numerical Methods in Physics",
        difficulty: "hard",
        completed: false,
        status: "suggested",
        priority: "high"
      },
      {
        id: "topic2",
        name: "Organic Chemistry Reactions",
        difficulty: "medium",
        completed: false,
        status: "suggested",
        priority: "medium"
      },
      {
        id: "topic3", 
        name: "Cell Biology Fundamentals",
        difficulty: "easy",
        completed: false,
        status: "scheduled",
        priority: "low"
      },
      {
        id: "topic4",
        name: "Electromagnetic Induction",
        difficulty: "hard",
        completed: false,
        status: "scheduled",
        priority: "high"
      },
      {
        id: "topic5",
        name: "Chemical Equilibrium",
        difficulty: "medium",
        completed: true,
        status: "completed",
        priority: "medium"
      },
      {
        id: "topic6",
        name: "Genetics and Evolution",
        difficulty: "medium",
        completed: true,
        status: "completed",
        priority: "medium"
      },
      {
        id: "topic7",
        name: "Circular Motion",
        difficulty: "hard",
        completed: true,
        status: "completed",
        priority: "high"
      }
    ];
    
    return allTopics;
  };
  
  const topics = generateTopics();
  
  // Organize topics by status
  const suggestedTopics = topics.filter(topic => topic.status === "suggested");
  const scheduledTopics = topics.filter(topic => topic.status === "scheduled");
  const completedTopics = topics.filter(topic => topic.status === "completed");
  
  // Get the weekly performance stats
  const weeklyStats = {
    hoursStudied: 12.5,
    topicsCompleted: 3,
    quizzesTaken: 5,
    flashcardsReviewed: 120
  };
  
  // Get recommendations
  const recommendations = [
    {
      id: "rec1",
      name: "Mechanics - Force and Motion",
      type: "weak area",
      reason: "Based on your recent practice tests, you're scoring 45% in this topic."
    },
    {
      id: "rec2",
      name: "Chemical Bonding",
      type: "priority",
      reason: "This topic appears frequently in your target exam."
    },
    {
      id: "rec3",
      name: "Ecosystems and Environment",
      type: "gap",
      reason: "You haven't reviewed this topic in over 30 days."
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Academic Advisor</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-8">
        {/* Performance Metrics */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Your study activity for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{weeklyStats.hoursStudied}</div>
                <div className="text-sm text-muted-foreground">Hours Studied</div>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{weeklyStats.topicsCompleted}</div>
                <div className="text-sm text-muted-foreground">Topics Completed</div>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{weeklyStats.quizzesTaken}</div>
                <div className="text-sm text-muted-foreground">Quizzes Taken</div>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{weeklyStats.flashcardsReviewed}</div>
                <div className="text-sm text-muted-foreground">Flashcards Reviewed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recommended Focus Areas */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recommended Focus Areas</CardTitle>
            <CardDescription>Based on your performance and upcoming exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map(rec => (
                <div key={rec.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="bg-muted p-3 rounded-full">
                    <Book className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{rec.name}</h3>
                      <Badge variant={
                        rec.type === "weak area" ? "destructive" : 
                        rec.type === "priority" ? "default" : 
                        "outline"
                      }>
                        {rec.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Study Plan Topics */}
      <Tabs defaultValue="suggested" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="suggested">Suggested Topics</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Topics</TabsTrigger>
          <TabsTrigger value="completed">Completed Topics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggested">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedTopics.map(topic => (
              <Card key={topic.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      topic.difficulty === "easy" ? "outline" :
                      topic.difficulty === "medium" ? "secondary" :
                      "destructive"
                    }>
                      {topic.difficulty}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 border-primary/30">
                      {topic.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button className="w-full">Add to Study Plan</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledTopics.map(topic => (
              <Card key={topic.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      topic.difficulty === "easy" ? "outline" :
                      topic.difficulty === "medium" ? "secondary" :
                      "destructive"
                    }>
                      {topic.difficulty}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 border-primary/30">
                      {topic.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between">
                  <Button variant="outline" className="flex-1 mr-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                  <Button className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Done
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTopics.map(topic => (
              <Card key={topic.id} className="border-green-200 bg-green-50/30 dark:bg-green-900/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    {topic.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      topic.difficulty === "easy" ? "outline" :
                      topic.difficulty === "medium" ? "secondary" :
                      "destructive"
                    }>
                      {topic.difficulty}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 border-primary/30">
                      {topic.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full">Review Again</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicAdvisor;
