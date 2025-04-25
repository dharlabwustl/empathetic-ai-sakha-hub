
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Clock, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, addDays, subDays, isSameDay } from 'date-fns';

// Define types for our plan items
interface PlanItem {
  id: string;
  type: 'concept' | 'flashcard' | 'exam';
  title: string;
  subject: string;
  completed: boolean;
  timeEstimate: number; // in minutes
  url: string;
}

// Sample data for today's plan
const generatePlanData = (date: Date): PlanItem[] => {
  // In a real app, this would come from an API based on user's study plan
  const dateOffset = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const conceptCards = [
    {
      id: 'cc1',
      type: 'concept' as const,
      title: "Newton's Laws of Motion",
      subject: "Physics",
      completed: dateOffset > 2,
      timeEstimate: 20,
      url: "/study/concept-card/cc1"
    },
    {
      id: 'cc2',
      type: 'concept' as const,
      title: "Chemical Bonding",
      subject: "Chemistry",
      completed: dateOffset > 3,
      timeEstimate: 30,
      url: "/study/concept-card/cc2"
    },
    {
      id: 'cc3',
      type: 'concept' as const,
      title: "Organic Chemistry Basics",
      subject: "Chemistry",
      completed: dateOffset > 4,
      timeEstimate: 25,
      url: "/study/concept-card/cc3"
    }
  ];
  
  const flashcards = [
    {
      id: 'fc1',
      type: 'flashcard' as const,
      title: "Physics Formulas",
      subject: "Physics",
      completed: dateOffset > 2,
      timeEstimate: 15,
      url: "/study/flashcards/fc1"
    },
    {
      id: 'fc2',
      type: 'flashcard' as const,
      title: "Chemistry Equations",
      subject: "Chemistry",
      completed: dateOffset > 4,
      timeEstimate: 10,
      url: "/study/flashcards/fc2"
    }
  ];
  
  const exams = [
    {
      id: 'ex1',
      type: 'exam' as const,
      title: "Physics Weekly Quiz",
      subject: "Physics",
      completed: dateOffset > 5,
      timeEstimate: 45,
      url: "/study/exam/ex1"
    }
  ];
  
  // Vary items based on the day
  const dayOfWeek = date.getDay();
  let todayItems: PlanItem[] = [];
  
  switch (dayOfWeek) {
    case 0: // Sunday
      todayItems = [...conceptCards.slice(0, 1), ...flashcards.slice(0, 1)];
      break;
    case 1: // Monday
      todayItems = [...conceptCards.slice(0, 2), ...flashcards.slice(0, 1)];
      break;
    case 2: // Tuesday
      todayItems = [...conceptCards.slice(1, 3), ...flashcards.slice(1, 2)];
      break;
    case 3: // Wednesday
      todayItems = [...conceptCards.slice(0, 1), ...exams.slice(0, 1)];
      break;
    case 4: // Thursday
      todayItems = [...conceptCards.slice(1, 3)];
      break;
    case 5: // Friday
      todayItems = [...flashcards, ...exams.slice(0, 1)];
      break;
    case 6: // Saturday
      todayItems = [...conceptCards, ...flashcards.slice(0, 1)];
      break;
  }
  
  return todayItems;
};

const TodaysPlanView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const items = generatePlanData(selectedDate);
      setPlanItems(items);
      setLoading(false);
    }, 500);
  }, [selectedDate]);
  
  const handleCompleteItem = (id: string) => {
    setPlanItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const handleNavigateToItem = (url: string) => {
    navigate(url);
  };
  
  const goToPreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };
  
  const goToNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };
  
  const goToToday = () => {
    setSelectedDate(new Date());
  };
  
  const getCompletionPercentage = () => {
    if (planItems.length === 0) return 0;
    const completedCount = planItems.filter(item => item.completed).length;
    return Math.round((completedCount / planItems.length) * 100);
  };
  
  const getTotalTimeEstimate = () => {
    return planItems.reduce((acc, item) => acc + item.timeEstimate, 0);
  };
  
  const getRemainingTimeEstimate = () => {
    return planItems
      .filter(item => !item.completed)
      .reduce((acc, item) => acc + item.timeEstimate, 0);
  };
  
  const subjects = ["all", ...Array.from(new Set(planItems.map(item => item.subject)))];
  
  const filteredItems = selectedSubject === "all" 
    ? planItems 
    : planItems.filter(item => item.subject === selectedSubject);
  
  const isToday = isSameDay(selectedDate, new Date());
  const isPast = selectedDate < new Date() && !isToday;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-indigo-500" />
            {isToday ? "Today's Plan" : isPast ? "Past Plan" : "Future Plan"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Your personalized study schedule for {format(selectedDate, 'MMMM d, yyyy')}
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Study Schedule</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={goToPreviousDay}
                className="h-8 w-8 p-0"
              >
                &larr;
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className={`h-8 ${isToday ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}`}
              >
                Today
              </Button>
              <Button
                variant="outline" 
                size="sm"
                onClick={goToNextDay}
                className="h-8 w-8 p-0"
              >
                &rarr;
              </Button>
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">{format(selectedDate, 'EEEE, MMMM d')}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Total time: {getTotalTimeEstimate()} min</span>
              {getRemainingTimeEstimate() < getTotalTimeEstimate() && (
                <span className="text-gray-500"> ({getRemainingTimeEstimate()} min remaining)</span>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Completion Progress</span>
              <span>{getCompletionPercentage()}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4">
            <TabsList className="w-full">
              {subjects.map(subject => (
                <TabsTrigger
                  key={subject}
                  value={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={selectedSubject === subject ? 'bg-primary text-primary-foreground' : ''}
                >
                  {subject === "all" ? "All Subjects" : subject}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex items-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-2">No study items planned for this day</p>
              <Button
                variant="outline"
                onClick={goToToday}
                className="mt-2"
              >
                Return to Today
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Card className={`
                    ${item.completed ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'bg-white dark:bg-gray-950'}
                    transition-colors hover:shadow-md
                  `}>
                    <CardContent className="p-4 flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Badge 
                            variant="outline" 
                            className={`
                              ${item.type === 'concept' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50' : ''}
                              ${item.type === 'flashcard' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50' : ''}
                              ${item.type === 'exam' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/50' : ''}
                              mr-2
                            `}
                          >
                            {item.type === 'concept' && 'Concept Card'}
                            {item.type === 'flashcard' && 'Flashcard Deck'}
                            {item.type === 'exam' && 'Practice Exam'}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700">
                            {item.subject}
                          </Badge>
                        </div>
                        
                        <h3 className={`text-lg font-medium mt-2 ${item.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{item.timeEstimate} minutes</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className={`rounded-full ${item.completed ? 'bg-green-100 border-green-200 text-green-700' : ''}`}
                          onClick={() => handleCompleteItem(item.id)}
                        >
                          <CheckCircle className={`h-4 w-4 ${item.completed ? 'text-green-600' : ''}`} />
                        </Button>
                        
                        <Button className="gap-1" onClick={() => handleNavigateToItem(item.url)}>
                          Open
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodaysPlanView;
