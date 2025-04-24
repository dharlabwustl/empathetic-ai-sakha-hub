
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, CheckCircle, Circle, ArrowRight } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";

// Type definitions
type TopicType = "concept" | "flashcard" | "quiz" | "exam";
type DifficultyType = "easy" | "medium" | "hard";

interface Topic {
  id: string;
  name: string;
  type: TopicType;
  difficulty: DifficultyType;
  completed: boolean;
  completedDate?: Date;
}

interface Subject {
  id: string;
  name: string;
  topics: Topic[];
}

// Mock data for weekly plan
const mockWeeklyPlan = {
  weekStartDate: new Date(),
  weekEndDate: new Date(new Date().setDate(new Date().getDate() + 6)),
  totalItems: 15,
  completedItems: 7,
  subjects: [
    {
      id: "s1",
      name: "Physics",
      topics: [
        {
          id: "t1",
          name: "Newton's Laws of Motion",
          type: "concept" as TopicType,
          difficulty: "medium" as DifficultyType,
          completed: true,
          completedDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
        {
          id: "t2",
          name: "Thermodynamics",
          type: "concept" as TopicType,
          difficulty: "hard" as DifficultyType,
          completed: false,
        },
        {
          id: "t3",
          name: "Optics Quiz",
          type: "quiz" as TopicType,
          difficulty: "medium" as DifficultyType,
          completed: false,
        }
      ]
    },
    {
      id: "s2",
      name: "Chemistry",
      topics: [
        {
          id: "t4",
          name: "Periodic Table",
          type: "flashcard" as TopicType,
          difficulty: "easy" as DifficultyType,
          completed: true,
          completedDate: new Date(new Date().setDate(new Date().getDate() - 2)),
        },
        {
          id: "t5",
          name: "Chemical Bonding",
          type: "concept" as TopicType,
          difficulty: "medium" as DifficultyType,
          completed: true,
          completedDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        }
      ]
    },
    {
      id: "s3",
      name: "Mathematics",
      topics: [
        {
          id: "t6",
          name: "Calculus Fundamentals",
          type: "concept" as TopicType,
          difficulty: "hard" as DifficultyType,
          completed: false,
        },
        {
          id: "t7",
          name: "Algebra Practice",
          type: "quiz" as TopicType,
          difficulty: "medium" as DifficultyType,
          completed: true,
          completedDate: new Date(),
        }
      ]
    }
  ]
};

interface WeeklyPlanProps {
  className?: string;
}

const WeeklyPlan: React.FC<WeeklyPlanProps> = ({ className = "" }) => {
  const [weeklyPlan, setWeeklyPlan] = useState(mockWeeklyPlan);
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");
  const [selectedWeek, setSelectedWeek] = useState<number>(0); // 0 is current week, -1 is last week, etc.
  
  const handleMarkComplete = (topicId: string) => {
    setWeeklyPlan(prev => {
      const updatedSubjects = prev.subjects.map(subject => {
        const updatedTopics = subject.topics.map(topic => 
          topic.id === topicId ? { ...topic, completed: true, completedDate: new Date() } : topic
        );
        return { ...subject, topics: updatedTopics };
      });
      
      // Count completed items
      const completedCount = updatedSubjects.reduce(
        (count, subject) => count + subject.topics.filter(topic => topic.completed).length, 
        0
      );
      
      return {
        ...prev,
        subjects: updatedSubjects,
        completedItems: completedCount
      };
    });
  };
  
  const getBadgeColorForType = (type: TopicType) => {
    switch (type) {
      case "concept": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "flashcard": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "quiz": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "exam": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };
  
  const getBadgeColorForDifficulty = (difficulty: DifficultyType) => {
    switch (difficulty) {
      case "easy": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
      case "medium": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "hard": return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300";
    }
  };
  
  const getHistoryWeeks = () => {
    // Generate past weeks for history tab
    return [-4, -3, -2, -1, 0].map(offset => ({
      offset,
      startDate: new Date(new Date().setDate(new Date().getDate() + (offset * 7))),
      endDate: new Date(new Date().setDate(new Date().getDate() + (offset * 7) + 6))
    }));
  };

  // Calculate progress percentage
  const progressPercentage = Math.round((weeklyPlan.completedItems / weeklyPlan.totalItems) * 100);
  
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarDays className="text-indigo-500" size={20} />
              Weekly Study Plan
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {formatDate(weeklyPlan.weekStartDate)} - {formatDate(weeklyPlan.weekEndDate)}
            </p>
          </div>
          
          <div className="mt-2 md:mt-0">
            <Badge variant="outline" className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300">
              {progressPercentage}% Complete
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 space-y-1">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{weeklyPlan.completedItems} completed</span>
            <span>{weeklyPlan.totalItems - weeklyPlan.completedItems} remaining</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <Tabs defaultValue="current" value={activeTab} onValueChange={(value) => setActiveTab(value as "current" | "history")}>
          <TabsList className="mb-4">
            <TabsTrigger value="current">Current Week</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            {weeklyPlan.subjects.map((subject) => (
              <div key={subject.id} className="space-y-3">
                <h3 className="font-semibold text-lg">{subject.name}</h3>
                <div className="space-y-2">
                  {subject.topics.map((topic) => (
                    <div key={topic.id} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="mt-1 text-lg">
                        {topic.completed ? (
                          <CheckCircle className="text-green-500" />
                        ) : (
                          <Circle className="text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{topic.name}</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="secondary" className={getBadgeColorForType(topic.type)}>
                                {topic.type.charAt(0).toUpperCase() + topic.type.slice(1)}
                              </Badge>
                              <Badge variant="secondary" className={getBadgeColorForDifficulty(topic.difficulty)}>
                                {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                              </Badge>
                              {topic.completed && topic.completedDate && (
                                <Badge variant="outline" className="bg-gray-50 dark:bg-gray-700">
                                  Completed on {formatDate(topic.completedDate)}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {!topic.completed && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleMarkComplete(topic.id)}>
                                Mark Complete
                              </Button>
                              <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700">
                                Start <ArrowRight className="ml-1 h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-6">
              <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
                {getHistoryWeeks().map((week) => (
                  <Button 
                    key={week.offset} 
                    variant={selectedWeek === week.offset ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedWeek(week.offset)}
                    className="whitespace-nowrap"
                  >
                    {week.offset === 0 ? "Current Week" : `Week ${-week.offset}`}
                    <span className="text-xs ml-1 opacity-70">
                      {formatDate(week.startDate).split(',')[0]}
                    </span>
                  </Button>
                ))}
              </div>
              
              <div className="text-center py-6 text-muted-foreground">
                <p>Select a week to view historical data</p>
                <p className="text-sm mt-1">Detailed history view would load based on the selected week</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeeklyPlan;
