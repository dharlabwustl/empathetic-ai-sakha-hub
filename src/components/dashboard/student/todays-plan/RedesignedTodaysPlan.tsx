
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Flag,
  Check,
  ChevronRight,
  AlertTriangle,
  Flame,
  Calendar,
  CheckCircle,
  Brain
} from 'lucide-react';
import { MoodType, TodaysPlanData } from '@/types/student/todaysPlan';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { UserProfileBase } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { SectionHeader } from '@/components/ui/section-header';

interface RedesignedTodaysPlanProps {
  userProfile: UserProfileBase | undefined;
}

// Mock data for today's plan
const mockTodaysPlanData: TodaysPlanData = {
  userName: "Student",
  examGoal: "IIT-JEE",
  date: new Date().toISOString(),
  subjectBreakdown: {
    "Physics": {
      concepts: [
        { id: "p1", title: "Newton's Laws", status: "pending", timeEstimate: "25 min" },
        { id: "p2", title: "Motion Kinematics", status: "pending", timeEstimate: "20 min" }
      ],
      flashcards: [
        { id: "pf1", deckName: "Mechanics Flashcards", status: "in-progress", timeEstimate: "15 min", cardCount: 10 }
      ],
      practiceExams: [
        { id: "pe1", examName: "Physics Mini Test", status: "pending", timeEstimate: "30 min" }
      ]
    },
    "Chemistry": {
      concepts: [
        { id: "c1", title: "Periodic Table", status: "pending", timeEstimate: "25 min" }
      ],
      flashcards: [
        { id: "cf1", deckName: "Chemical Elements", status: "pending", timeEstimate: "10 min", cardCount: 5 }
      ],
      practiceExams: [
        { id: "ce1", examName: "Chemistry Quick Quiz", status: "pending", timeEstimate: "15 min" }
      ]
    }
  },
  timeAllocation: {
    concepts: 70,
    flashcards: 25,
    practiceExams: 45,
    revision: 30,
    total: 170
  },
  tomorrowPreview: {
    totalTasks: 8,
    focusArea: "Mathematics",
    difficulty: "moderate",
    concepts: 3,
    flashcards: 2,
    practiceExams: 1
  },
  smartExtras: {
    bookmarks: [
      { id: "bm1", title: "Kirchhoff's Law", type: "concept", addedOn: "2025-04-20" }
    ],
    notes: [
      { id: "n1", content: "Remember the formulas for projectile motion", createdAt: "2025-04-24" }
    ]
  },
  tasks: {
    concepts: [],
    flashcards: [],
    practiceExams: [],
    revision: []
  },
  streak: 7,
  completedTasks: 3,
  totalTasks: 8,
  backlogTasks: [
    { 
      id: "b1", 
      subject: "History", 
      title: "Revolt of 1857 Flashcards", 
      type: "flashcard", 
      timeEstimate: 15, 
      status: "overdue", 
      daysOverdue: 1 
    },
    { 
      id: "b2", 
      subject: "Math", 
      title: "Quadratic Equations Concept", 
      type: "concept", 
      timeEstimate: 30, 
      status: "overdue", 
      daysOverdue: 2 
    }
  ]
};

export default function RedesignedTodaysPlan({ userProfile }: RedesignedTodaysPlanProps) {
  const [planData, setPlanData] = useState<TodaysPlanData>(mockTodaysPlanData);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  
  // Load user mood from localStorage if available
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        if (parsedData.mood) {
          setCurrentMood(parsedData.mood as MoodType);
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    
    // In a real app, this would fetch the plan data from an API
    if (userProfile) {
      setPlanData(prev => ({ ...prev, userName: userProfile.name || "Student" }));
    }
  }, [userProfile]);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getMoodBasedSuggestion = (mood?: MoodType) => {
    switch(mood) {
      case 'motivated':
        return "You're in beast mode! 🚀 Let's tackle the toughest concepts first.";
      case 'focused':
        return "Your focus is strong today! Let's make significant progress on key topics.";
      case 'tired':
        return "Focus on lighter topics and flashcards today. Slow and steady wins!";
      case 'stressed':
        return "Take it easy today with shorter study sessions and more breaks.";
      case 'anxious':
        return "Start with simple wins - 5 flashcards first to build momentum. 🧘‍♂️";
      case 'confused':
        return "Let's tackle one concept at a time today with extra review.";
      case 'overwhelmed':
        return "Break down your tasks into smaller chunks - we've simplified your plan.";
      case 'happy':
        return "Great mood for learning! We've added a bonus challenge to your plan.";
      default:
        return "Let's make today count! What would you like to focus on first?";
    }
  };
  
  const handleMarkTaskComplete = (taskId: string, taskType: string, subject: string) => {
    // In a real app, this would send the completion status to an API
    setCompletedTaskIds(prev => new Set(prev).add(taskId));
    
    toast({
      title: "Task Completed!",
      description: `You've completed ${taskType} for ${subject}. Great work!`,
    });
    
    // Update completion stats
    setPlanData(prev => ({
      ...prev,
      completedTasks: prev.completedTasks + 1
    }));
  };
  
  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      "Physics": "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-100 dark:border-blue-800/30",
      "Chemistry": "from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-100 dark:border-green-800/30",
      "Math": "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-100 dark:border-violet-800/30",
      "Biology": "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-100 dark:border-amber-800/30",
      "History": "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-100 dark:border-red-800/30"
    };
    return colors[subject] || "from-gray-50 to-gray-50 dark:from-gray-900/20 dark:to-gray-900/20 border-gray-100 dark:border-gray-800/30";
  };
  
  const completionPercentage = Math.round((planData.completedTasks / planData.totalTasks) * 100);
  
  return (
    <SharedPageLayout title="Today's Study Plan" subtitle="Your personalized daily learning path">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-950 dark:to-blue-950 rounded-lg p-6">
          <h2 className="text-2xl font-bold">
            {getGreeting()}, {planData.userName}! 🌟
          </h2>
          <p className="mt-2 text-muted-foreground">
            {getMoodBasedSuggestion(currentMood)}
          </p>
          <div className="mt-4 p-4 bg-white/50 dark:bg-black/10 rounded-lg">
            <h3 className="font-medium">Today's Focus Goal</h3>
            <p className="text-sm mt-1">
              Complete {Object.keys(planData.subjectBreakdown).length} Subjects + 
              Clear {Object.values(planData.subjectBreakdown).reduce((acc, subject) => acc + subject.practiceExams.length, 0)} Practice {Object.values(planData.subjectBreakdown).reduce((acc, subject) => acc + subject.practiceExams.length, 0) > 1 ? 'Tests' : 'Test'} + 
              Revise {Object.values(planData.subjectBreakdown).reduce((acc, subject) => acc + subject.flashcards.reduce((sum, deck) => sum + (deck.cardCount || 0), 0), 0)} Flashcards
            </p>
          </div>
        </div>

        {/* Subject Cards */}
        <div>
          <SectionHeader title="Subject-wise Breakdown" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {Object.entries(planData.subjectBreakdown).map(([subject, data], idx) => (
              <Card key={idx} className={`overflow-hidden border`}>
                <div className={`bg-gradient-to-r ${getSubjectColor(subject)} p-4`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{subject}</h3>
                    <Badge>
                      <Clock className="h-3.5 w-3.5 mr-1" /> 
                      {Math.round(
                        (data.concepts.reduce((acc, c) => acc + parseInt(c.timeEstimate), 0) +
                        data.flashcards.reduce((acc, f) => acc + parseInt(f.timeEstimate), 0) +
                        data.practiceExams.reduce((acc, p) => acc + parseInt(p.timeEstimate), 0)) / 60
                      )}h {
                        (data.concepts.reduce((acc, c) => acc + parseInt(c.timeEstimate), 0) +
                        data.flashcards.reduce((acc, f) => acc + parseInt(f.timeEstimate), 0) +
                        data.practiceExams.reduce((acc, p) => acc + parseInt(p.timeEstimate), 0)) % 60
                      }m
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.concepts.length > 0 && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30">
                        <BookOpen className="h-3.5 w-3.5 mr-1" /> {data.concepts.length} Concepts
                      </Badge>
                    )}
                    {data.flashcards.length > 0 && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30">
                        <Star className="h-3.5 w-3.5 mr-1" /> {data.flashcards.reduce((sum, deck) => sum + (deck.cardCount || 0), 0)} Flashcards
                      </Badge>
                    )}
                    {data.practiceExams.length > 0 && (
                      <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800/30">
                        <Flag className="h-3.5 w-3.5 mr-1" /> {data.practiceExams.length} Practice {data.practiceExams.length > 1 ? 'Tests' : 'Test'}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Concepts Column */}
                    {data.concepts.length > 0 && (
                      <div className="bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 p-2">
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <BookOpen className="h-3.5 w-3.5 mr-1 text-blue-500" /> Concepts
                        </h4>
                        <div className="space-y-2">
                          {data.concepts.map((concept, idx) => {
                            const isCompleted = completedTaskIds.has(concept.id);
                            return (
                              <div 
                                key={idx} 
                                className={cn(
                                  "p-1.5 rounded border bg-white dark:bg-gray-800",
                                  isCompleted 
                                    ? "border-green-200 dark:border-green-800/50" 
                                    : "border-gray-100 dark:border-gray-700"
                                )}
                              >
                                <div className="flex justify-between text-xs">
                                  <span className={isCompleted ? "line-through text-muted-foreground" : ""}>
                                    {concept.title}
                                  </span>
                                  <span>{concept.timeEstimate}</span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  {isCompleted ? (
                                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                                    </span>
                                  ) : (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 text-xs"
                                      onClick={() => handleMarkTaskComplete(concept.id, "concept", subject)}
                                    >
                                      Mark Complete
                                    </Button>
                                  )}
                                  <Link to={`/dashboard/student/concepts/${subject.toLowerCase()}/${concept.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                                      Study <ChevronRight className="h-3 w-3 ml-1" />
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Flashcards Column */}
                    {data.flashcards.length > 0 && (
                      <div className="bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 p-2">
                        <h5 className="text-sm font-medium mb-2 flex items-center">
                          <Star className="h-3.5 w-3.5 mr-1 text-amber-500" /> Flashcards
                        </h5>
                        <div className="space-y-2">
                          {data.flashcards.map((deck, idx) => {
                            const isCompleted = completedTaskIds.has(deck.id);
                            return (
                              <div 
                                key={idx}
                                className={cn(
                                  "p-1.5 rounded border bg-white dark:bg-gray-800",
                                  isCompleted 
                                    ? "border-green-200 dark:border-green-800/50" 
                                    : "border-gray-100 dark:border-gray-700"
                                )}
                              >
                                <div className="flex justify-between text-xs">
                                  <span className={isCompleted ? "line-through text-muted-foreground" : ""}>
                                    {deck.cardCount} Cards
                                  </span>
                                  <span>{deck.timeEstimate}</span>
                                </div>
                                <Progress value={isCompleted ? 100 : deck.status === 'in-progress' ? 30 : 0} className="h-1.5 mt-1.5 mb-1" />
                                <div className="flex items-center justify-between mt-1">
                                  {isCompleted ? (
                                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                                    </span>
                                  ) : (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 text-xs"
                                      onClick={() => handleMarkTaskComplete(deck.id, "flashcard deck", subject)}
                                    >
                                      Mark Complete
                                    </Button>
                                  )}
                                  <Link to={`/dashboard/student/flashcards/${subject.toLowerCase()}/interactive`}>
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                                      Study Cards <ChevronRight className="h-3 w-3 ml-1" />
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Practice Test Column */}
                    {data.practiceExams.length > 0 && (
                      <div className="bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 p-2">
                        <h5 className="text-sm font-medium mb-2 flex items-center">
                          <Flag className="h-3.5 w-3.5 mr-1 text-violet-500" /> Practice Test
                        </h5>
                        <div className="space-y-2">
                          {data.practiceExams.map((exam, idx) => {
                            const isCompleted = completedTaskIds.has(exam.id);
                            const examId = subject.toLowerCase() === "physics" ? "physics-101" : "chemistry-fundamentals";
                            return (
                              <div 
                                key={idx}
                                className={cn(
                                  "p-1.5 rounded border bg-white dark:bg-gray-800",
                                  isCompleted 
                                    ? "border-green-200 dark:border-green-800/50" 
                                    : "border-gray-100 dark:border-gray-700"
                                )}
                              >
                                <div className="flex justify-between text-xs">
                                  <span className={isCompleted ? "line-through text-muted-foreground" : ""}>
                                    {exam.examName}
                                  </span>
                                  <span>{exam.timeEstimate}</span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  {isCompleted ? (
                                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                                    </span>
                                  ) : (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 text-xs"
                                      onClick={() => handleMarkTaskComplete(exam.id, "practice test", subject)}
                                    >
                                      Mark Complete
                                    </Button>
                                  )}
                                  <Link to={`/dashboard/student/practice-exam/${examId}/start`}>
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                                      Start Test <ChevronRight className="h-3 w-3 ml-1" />
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Smart Tips */}
                  <div className="mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Brain className="h-3.5 w-3.5 mr-1 text-violet-500" />
                      <span>Smart Tip: Focus on {subject} concepts first, then test your knowledge with flashcards.</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Backlogs Section */}
        {planData.backlogTasks.length > 0 && (
          <Card>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 border-b border-amber-100 dark:border-amber-800/50">
              <h3 className="font-medium text-base flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1.5 text-amber-500" />
                ⚡ Backlogs – Let's Clear Yesterday's Challenges!
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Complete these overdue tasks to maintain your learning momentum.
              </p>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs">
                    <tr>
                      <th className="px-3 py-2 text-left">📌 Subject</th>
                      <th className="px-3 py-2 text-left">Concept/Task</th>
                      <th className="px-3 py-2 text-left">Time</th>
                      <th className="px-3 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {planData.backlogTasks.map((task, idx) => {
                      const isCompleted = completedTaskIds.has(task.id);
                      return (
                        <tr key={idx} className={isCompleted ? "bg-green-50/50 dark:bg-green-950/10" : ""}>
                          <td className="px-3 py-2">{task.subject}</td>
                          <td className="px-3 py-2">
                            <span className={isCompleted ? "line-through text-muted-foreground" : ""}>
                              {task.title}
                            </span>
                          </td>
                          <td className="px-3 py-2">{task.timeEstimate} min</td>
                          <td className="px-3 py-2">
                            {isCompleted ? (
                              <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                                <CheckCircle className="h-3.5 w-3.5 mr-1" /> Completed
                              </span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="sm" 
                                  variant="link" 
                                  className="h-7 p-0 text-blue-600 dark:text-blue-400"
                                  onClick={() => handleMarkTaskComplete(task.id, task.type, task.subject)}
                                >
                                  📎 Mark Complete
                                </Button>
                                <Link to={`/dashboard/student/${
                                  task.type === 'concept' ? 'concepts' : 
                                  task.type === 'flashcard' ? 'flashcards' : 'practice-exam'
                                }/${task.subject.toLowerCase()}${
                                  task.type === 'concept' ? `/${task.title.toLowerCase().replace(/\s+/g, '-')}` :
                                  task.type === 'flashcard' ? '/interactive' : 
                                  '/start'
                                }`}>
                                  <Button size="sm" variant="link" className="h-7 p-0 text-blue-600 dark:text-blue-400">
                                    🚀 Complete Now
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {planData.backlogTasks.length > 2 && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <p className="text-xs flex items-start">
                    <AlertTriangle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-blue-600" />
                    <span>Smart Suggestion: Consider splitting backlog tasks over 3 days to avoid burnout and maintain consistent progress.</span>
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Mood-Based Smart Scheduler */}
        <Card>
          <div className="bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 p-4 border-b border-violet-100 dark:border-violet-800/30">
            <h3 className="font-medium text-base flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-violet-500" />
              Dynamic Smart Scheduler
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your schedule adjusts based on your mood, energy levels, and available time.
            </p>
          </div>
          <div className="p-4">
            {currentMood && (
              <div className={cn(
                "p-3 rounded-lg border mb-4",
                currentMood === 'motivated' || currentMood === 'happy' 
                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30" 
                  : currentMood === 'tired' || currentMood === 'stressed' || currentMood === 'anxious'
                    ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30"
                    : "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30"
              )}>
                <h4 className="text-sm font-medium">Mood-Based Adjustments</h4>
                <p className="text-xs mt-1">{getMoodBasedSuggestion(currentMood)}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-gray-800">
                <div className="p-3 border-b">
                  <h4 className="text-sm font-medium">Morning Session</h4>
                  <p className="text-xs text-muted-foreground">9:00 AM - 11:00 AM</p>
                </div>
                <div className="p-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Physics - Newton's Laws</span>
                      <Badge>25m</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Physics Flashcards</span>
                      <Badge>15m</Badge>
                    </li>
                  </ul>
                </div>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800">
                <div className="p-3 border-b">
                  <h4 className="text-sm font-medium">Afternoon Session</h4>
                  <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM</p>
                </div>
                <div className="p-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Chemistry - Periodic Table</span>
                      <Badge>25m</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Chemistry Quiz</span>
                      <Badge>15m</Badge>
                    </li>
                  </ul>
                </div>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800">
                <div className="p-3 border-b">
                  <h4 className="text-sm font-medium">Evening Session</h4>
                  <p className="text-xs text-muted-foreground">6:00 PM - 7:30 PM</p>
                </div>
                <div className="p-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Physics - Motion Kinematics</span>
                      <Badge>20m</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Physics Practice Test</span>
                      <Badge>30m</Badge>
                    </li>
                    <li className="flex items-center justify-between text-muted-foreground">
                      <span>Meditation Break</span>
                      <Badge variant="outline">10m</Badge>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button variant="outline" className="flex-1">
                <Clock className="h-4 w-4 mr-1.5" /> I have less time today
              </Button>
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-1.5" /> Reschedule backlog
              </Button>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 flex-1">
                <Check className="h-4 w-4 mr-1.5" /> Apply Schedule
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer Progress */}
        <motion.div 
          className="sticky bottom-4 bg-white dark:bg-gray-900 p-4 rounded-lg border shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Today's Progress</span>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Streak: {planData.streak} days</span>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {completionPercentage < 100 
              ? `${100 - completionPercentage}% more to complete today's goals!`
              : "🎉 Amazing! You've completed all tasks for today!"}
          </div>
        </motion.div>
      </div>
    </SharedPageLayout>
  );
}
