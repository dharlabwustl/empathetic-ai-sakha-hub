
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, ArrowRight, CheckCircle, Circle, Calendar as CalendarIcon } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import { Link } from "react-router-dom";

// Mock data for today's plan
const mockTodayPlan = {
  date: new Date(),
  totalItems: 8,
  completedItems: 3,
  categories: [
    {
      id: "cat1",
      name: "Concept Cards",
      totalItems: 4,
      completedItems: 2,
      items: [
        {
          id: "cc1",
          title: "Newton's Third Law of Motion",
          subject: "Physics",
          difficulty: "medium",
          estimatedTime: 15,
          completed: true,
          completedAt: new Date(new Date().setHours(new Date().getHours() - 3)),
          url: "/study/concept-card/cc1"
        },
        {
          id: "cc2",
          title: "Acid-Base Reactions",
          subject: "Chemistry",
          difficulty: "easy",
          estimatedTime: 10,
          completed: true,
          completedAt: new Date(new Date().setHours(new Date().getHours() - 1)),
          url: "/study/concept-card/cc2"
        },
        {
          id: "cc3",
          title: "Integration by Parts",
          subject: "Mathematics",
          difficulty: "hard",
          estimatedTime: 20,
          completed: false,
          url: "/study/concept-card/cc3"
        },
        {
          id: "cc4",
          title: "DNA Replication",
          subject: "Biology",
          difficulty: "medium",
          estimatedTime: 15,
          completed: false,
          url: "/study/concept-card/cc4"
        }
      ]
    },
    {
      id: "cat2",
      name: "Flashcards",
      totalItems: 2,
      completedItems: 1,
      items: [
        {
          id: "fc1",
          title: "Periodic Table Elements",
          subject: "Chemistry",
          difficulty: "medium",
          estimatedTime: 10,
          completed: true,
          completedAt: new Date(new Date().setHours(new Date().getHours() - 2)),
          url: "/study/flashcards/fc1"
        },
        {
          id: "fc2",
          title: "Important Formulas",
          subject: "Physics",
          difficulty: "medium",
          estimatedTime: 8,
          completed: false,
          url: "/study/flashcards/fc2"
        }
      ]
    },
    {
      id: "cat3",
      name: "Practice Exams",
      totalItems: 2,
      completedItems: 0,
      items: [
        {
          id: "pe1",
          title: "Mock Test - Physics",
          subject: "Physics",
          difficulty: "hard",
          estimatedTime: 30,
          completed: false,
          url: "/study/practice-exam/pe1"
        },
        {
          id: "pe2",
          title: "Quiz - Mathematics",
          subject: "Mathematics",
          difficulty: "medium",
          estimatedTime: 15,
          completed: false,
          url: "/study/practice-exam/pe2"
        }
      ]
    }
  ],
  pastDays: [
    {
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      completionPercentage: 80
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      completionPercentage: 100
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      completionPercentage: 60
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 4)),
      completionPercentage: 90
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
      completionPercentage: 75
    }
  ]
};

interface TodaysPlanProps {
  className?: string;
}

const TodaysPlan: React.FC<TodaysPlanProps> = ({ className = "" }) => {
  const [todayPlan, setTodayPlan] = useState(mockTodayPlan);
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Calculate overall progress percentage
  const progressPercentage = Math.round((todayPlan.completedItems / todayPlan.totalItems) * 100);
  
  const handleMarkComplete = (itemId: string) => {
    setTodayPlan(prev => {
      const updatedCategories = prev.categories.map(category => {
        const updatedItems = category.items.map(item => 
          item.id === itemId 
            ? { ...item, completed: true, completedAt: new Date() } 
            : item
        );
        
        const completedItems = updatedItems.filter(item => item.completed).length;
        
        return {
          ...category,
          items: updatedItems,
          completedItems
        };
      });
      
      // Calculate total completed items
      const totalCompleted = updatedCategories.reduce(
        (sum, category) => sum + category.completedItems, 
        0
      );
      
      return {
        ...prev,
        categories: updatedCategories,
        completedItems: totalCompleted
      };
    });
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Chemistry':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Mathematics':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'Biology':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="text-emerald-500" size={20} />
              Today's Study Plan
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {formatDate(todayPlan.date)}
            </p>
          </div>
          
          <div className="mt-2 md:mt-0">
            <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
              {progressPercentage}% Complete
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 space-y-1">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{todayPlan.completedItems} completed</span>
            <span>{todayPlan.totalItems - todayPlan.completedItems} remaining</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <Tabs defaultValue="today" value={activeTab} onValueChange={(value) => setActiveTab(value as "today" | "history")}>
          <TabsList className="mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-6">
            {todayPlan.categories.map(category => (
              <div key={category.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <Badge variant="outline">
                    {category.completedItems}/{category.totalItems}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {category.items.map(item => (
                    <div key={item.id} className={`flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm ${
                      item.completed ? 'bg-gray-50/50 dark:bg-gray-800/50' : ''
                    }`}>
                      <div className="mt-1 text-lg">
                        {item.completed ? (
                          <CheckCircle className="text-green-500" />
                        ) : (
                          <Circle className="text-gray-300" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="secondary" className={getSubjectColor(item.subject)}>
                                {item.subject}
                              </Badge>
                              <Badge variant="secondary" className={getDifficultyColor(item.difficulty)}>
                                {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                              </Badge>
                              <Badge variant="outline">
                                <Clock className="mr-1 h-3 w-3" />
                                {item.estimatedTime} min
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mt-3 sm:mt-0 flex gap-2">
                            {item.completed ? (
                              <Badge variant="outline" className="bg-gray-50 dark:bg-gray-700">
                                Completed {item.completedAt && `at ${item.completedAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                              </Badge>
                            ) : (
                              <>
                                <Button size="sm" variant="outline" onClick={() => handleMarkComplete(item.id)}>
                                  Mark Complete
                                </Button>
                                <Button
                                  size="sm"
                                  variant="default"
                                  className="bg-emerald-600 hover:bg-emerald-700"
                                  asChild
                                >
                                  <Link to={item.url}>
                                    Start <ArrowRight className="ml-1 h-4 w-4" />
                                  </Link>
                                </Button>
                              </>
                            )}
                          </div>
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
                {todayPlan.pastDays.map((day, index) => (
                  <Button
                    key={index}
                    variant={selectedDate && selectedDate.toDateString() === day.date.toDateString() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDate(day.date)}
                    className="whitespace-nowrap"
                  >
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {formatDate(day.date).split(',')[0]}
                    <Badge variant="secondary" className="ml-2">
                      {day.completionPercentage}%
                    </Badge>
                  </Button>
                ))}
              </div>
              
              {selectedDate ? (
                <div className="text-center py-6">
                  <h3 className="font-semibold mb-2">
                    Study Plan for {formatDate(selectedDate)}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedDate.toDateString() === new Date().toDateString() ? "Today's" : "This day's"} tasks were {
                      todayPlan.pastDays.find(d => d.date.toDateString() === selectedDate.toDateString())?.completionPercentage
                    }% completed
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    (In a real implementation, this would show the actual tasks from that day)
                  </p>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>Select a day to view historical data</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TodaysPlan;
