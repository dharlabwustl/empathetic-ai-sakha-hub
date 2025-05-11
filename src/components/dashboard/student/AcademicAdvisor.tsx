
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronRight, Clock, ListChecks, Target, Trophy } from "lucide-react";
import { UserProfile } from "@/types/user/base";

interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  status: "not-started" | "in-progress" | "completed" | "delayed";
  priority: number;
}

interface AcademicAdvisorProps {
  userProfile?: UserProfile;
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState("study-plan");

  // Mock data for study plan
  const currentTopics: StudyPlanTopic[] = [
    {
      id: "topic1",
      name: "Organic Chemistry: Alcohols and Ethers",
      difficulty: "hard",
      completed: false,
      status: "in-progress",
      priority: 1
    },
    {
      id: "topic2",
      name: "Physics: Kinematics in 2D",
      difficulty: "medium",
      completed: false,
      status: "not-started",
      priority: 2
    },
    {
      id: "topic3",
      name: "Biology: Cell Structure",
      difficulty: "easy",
      completed: false,
      status: "not-started",
      priority: 3
    }
  ];

  const completedTopics: StudyPlanTopic[] = [
    {
      id: "topic4",
      name: "Inorganic Chemistry: Periodic Table",
      difficulty: "medium",
      completed: true,
      status: "completed",
      priority: 0
    },
    {
      id: "topic5",
      name: "Mathematics: Integration",
      difficulty: "medium",
      completed: true,
      status: "completed",
      priority: 0
    },
    {
      id: "topic6",
      name: "Physics: Mechanics",
      difficulty: "hard",
      completed: true,
      status: "completed",
      priority: 0
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Academic Advisor</h1>
        <p className="text-muted-foreground">
          Your personalized study plan and academic guidance
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Study Streak Card */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Trophy className="mr-2 h-4 w-4 text-green-500" />
              Study Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12 Days</div>
            <p className="text-xs text-muted-foreground mt-1">
              Keep going! You're building great habits.
            </p>
          </CardContent>
        </Card>

        {/* Next Milestone Card */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Target className="mr-2 h-4 w-4 text-blue-500" />
              Next Milestone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Complete Organic Chemistry</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 more topics to master this subject
            </p>
          </CardContent>
        </Card>

        {/* Time Card */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Clock className="mr-2 h-4 w-4 text-purple-500" />
              Study Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">127 Hours</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total focused study time tracked
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="study-plan" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="study-plan" className="flex items-center">
            <ListChecks className="mr-2 h-4 w-4" />
            Study Plan
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="study-plan" className="space-y-4 mt-6">
          <h2 className="text-lg font-medium mb-3">Current Focus Areas</h2>
          <div className="space-y-3">
            {currentTopics.map((topic) => (
              <Card key={topic.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{topic.name}</h3>
                        <Badge 
                          variant={topic.difficulty === "hard" ? "destructive" : topic.difficulty === "medium" ? "default" : "outline"}
                        >
                          {topic.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {topic.status === "in-progress" ? "Currently studying" : "Up next in your plan"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-lg font-medium mb-3 mt-6">Recently Completed</h2>
          <div className="space-y-3">
            {completedTopics.map((topic) => (
              <Card key={topic.id} className="bg-muted/40">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{topic.name}</h3>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Well done! You've mastered this topic.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <CardFooter className="flex justify-center pt-6">
            <Button>
              View Complete Study Plan
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">Calendar View Coming Soon</h3>
            <p className="text-muted-foreground mt-2">
              We're working on a powerful calendar feature to help you organize your study schedule.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AcademicAdvisor;
