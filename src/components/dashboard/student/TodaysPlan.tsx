
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, ArrowRight, BookOpen, FileText, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateUtils";

// We'll create mock data to display
const mockTodaysPlan = {
  date: new Date(),
  totalItems: 8,
  completedItems: 3,
  subjects: [
    {
      id: "s1",
      name: "Physics",
      items: [
        {
          id: "i1",
          title: "Newton's Laws of Motion",
          type: "concept",
          completed: true,
          completedAt: new Date(new Date().setHours(new Date().getHours() - 2)),
          duration: 20,
          path: "/study/concept-card/t1"
        },
        {
          id: "i2",
          title: "Force and Acceleration",
          type: "flashcard",
          completed: false,
          duration: 15,
          path: "/study/flashcard/f1"
        }
      ]
    },
    {
      id: "s2",
      name: "Chemistry",
      items: [
        {
          id: "i3",
          title: "Periodic Table",
          type: "concept",
          completed: true,
          completedAt: new Date(new Date().setHours(new Date().getHours() - 3)),
          duration: 25,
          path: "/study/concept-card/t4"
        },
        {
          id: "i4",
          title: "Chemical Bonding Quiz",
          type: "quiz",
          completed: false,
          duration: 30,
          path: "/study/quiz/q1"
        }
      ]
    },
    {
      id: "s3",
      name: "Mathematics",
      items: [
        {
          id: "i5",
          title: "Integration Basics",
          type: "concept",
          completed: false,
          duration: 30,
          path: "/study/concept-card/t6"
        },
        {
          id: "i6",
          title: "Algebra Practice",
          type: "flashcard",
          completed: true,
          completedAt: new Date(new Date().setHours(new Date().getHours() - 1)),
          duration: 20,
          path: "/study/flashcard/f2"
        }
      ]
    }
  ]
};

interface TodaysPlanProps {
  className?: string;
}

const TodaysPlan: React.FC<TodaysPlanProps> = ({ className = "" }) => {
  const [todaysPlan, setTodaysPlan] = useState(mockTodaysPlan);
  const [activeTab, setActiveTab] = useState<"all" | "concepts" | "flashcards" | "quizzes">("all");
  
  // Calculate progress
  const progressPercentage = Math.round((todaysPlan.completedItems / todaysPlan.totalItems) * 100);
  
  const handleMarkComplete = (itemId: string) => {
    // Update the completed status in our mock data
    const updatedSubjects = todaysPlan.subjects.map(subject => {
      const updatedItems = subject.items.map(item => 
        item.id === itemId ? 
        { ...item, completed: true, completedAt: new Date() } : 
        item
      );
      return { ...subject, items: updatedItems };
    });
    
    // Count completed items
    let completedCount = 0;
    updatedSubjects.forEach(subject => {
      subject.items.forEach(item => {
        if (item.completed) completedCount++;
      });
    });
    
    setTodaysPlan({
      ...todaysPlan,
      subjects: updatedSubjects,
      completedItems: completedCount
    });
  };
  
  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case "concept":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "flashcard":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "quiz":
        return <GraduationCap className="h-4 w-4 text-purple-500" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case "concept":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "flashcard":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "quiz":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };
  
  const filterItems = (type: "all" | "concepts" | "flashcards" | "quizzes") => {
    if (type === "all") return todaysPlan.subjects;
    
    const filteredSubjects = todaysPlan.subjects
      .map(subject => ({
        ...subject,
        items: subject.items.filter(item => {
          switch (type) {
            case "concepts":
              return item.type === "concept";
            case "flashcards":
              return item.type === "flashcard";
            case "quizzes":
              return item.type === "quiz";
            default:
              return true;
          }
        })
      }))
      .filter(subject => subject.items.length > 0);
    
    return filteredSubjects;
  };

  return (
    <Card className={`${className} shadow-md`}>
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Today's Study Plan</CardTitle>
            <p className="text-sm text-muted-foreground">
              {formatDate(todaysPlan.date)}
            </p>
          </div>
          <Badge variant="outline" className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300">
            {progressPercentage}% Complete
          </Badge>
        </div>
        
        <div className="mt-4 space-y-1">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{todaysPlan.completedItems} completed</span>
            <span>{todaysPlan.totalItems - todaysPlan.completedItems} remaining</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-4 grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="concepts">Concepts</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {filterItems("all").map(subject => (
              <div key={subject.id} className="space-y-3">
                <h3 className="font-semibold text-lg">{subject.name}</h3>
                <div className="space-y-2">
                  {subject.items.map(item => (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                      <div className="mt-1 text-lg">
                        {item.completed ? (
                          <CheckCircle className="text-green-500" />
                        ) : (
                          <Circle className="text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="secondary" className={getTypeColor(item.type)}>
                                <span className="flex items-center gap-1">
                                  {getItemTypeIcon(item.type)}
                                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                </span>
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50 dark:bg-gray-700">
                                {item.duration} min
                              </Badge>
                              {item.completed && item.completedAt && (
                                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                                  Completed {formatDate(item.completedAt)}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {!item.completed && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleMarkComplete(item.id)}>
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
          
          {["concepts", "flashcards", "quizzes"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-6">
              {filterItems(tabValue as any).map(subject => (
                <div key={subject.id} className="space-y-3">
                  <h3 className="font-semibold text-lg">{subject.name}</h3>
                  <div className="space-y-2">
                    {subject.items.map(item => (
                      <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="mt-1 text-lg">
                          {item.completed ? (
                            <CheckCircle className="text-green-500" />
                          ) : (
                            <Circle className="text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <Badge variant="secondary" className={getTypeColor(item.type)}>
                                  <span className="flex items-center gap-1">
                                    {getItemTypeIcon(item.type)}
                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                  </span>
                                </Badge>
                                <Badge variant="outline" className="bg-gray-50 dark:bg-gray-700">
                                  {item.duration} min
                                </Badge>
                                {item.completed && item.completedAt && (
                                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                                    Completed {formatDate(item.completedAt)}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {!item.completed && (
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleMarkComplete(item.id)}>
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
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TodaysPlan;
