
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeader } from '@/components/ui/section-header';
import { TimelineView, MoodType, TodaysPlanData } from '@/types/student/todaysPlan';
import { UserProfileBase } from '@/types/user/base';
import { 
  Calendar, 
  CalendarDays, 
  CalendarRange, 
  Book, 
  BookOpen, 
  FileText, 
  Clock, 
  AlertTriangle, 
  Check, 
  BookCheck,
  Flag,
  CheckCircle,
  Circle,
  ArrowRight,
  Star,
  Flame,
  BookMarked,
  BookmarkPlus,
  RefreshCw
} from 'lucide-react';

interface RedesignedTodaysPlanProps {
  userProfile: UserProfileBase;
  currentMood?: MoodType;
}

// Mock data for today's plan
const mockTodayPlan: TodaysPlanData = {
  userName: "Priya",
  examGoal: "IIT-JEE",
  date: new Date().toISOString(),
  streak: 4,
  completedTasks: 3,
  totalTasks: 7,
  subjectBreakdown: {
    "Physics": {
      concepts: [
        {
          id: "c1",
          title: "Newton's Laws",
          status: "pending",
          timeEstimate: "25"
        },
        {
          id: "c2",
          title: "Motion Kinematics",
          status: "pending",
          timeEstimate: "20"
        }
      ],
      flashcards: [
        {
          id: "f1",
          deckName: "Force & Motion",
          status: "pending",
          timeEstimate: "15",
          cardCount: 10
        }
      ],
      practiceExams: [
        {
          id: "p1",
          examName: "Mini Test",
          status: "pending",
          timeEstimate: "30"
        }
      ]
    },
    "Chemistry": {
      concepts: [
        {
          id: "c3",
          title: "Periodic Table",
          status: "pending",
          timeEstimate: "25"
        }
      ],
      flashcards: [
        {
          id: "f2",
          deckName: "Chemical Elements",
          status: "pending",
          timeEstimate: "10",
          cardCount: 5
        }
      ],
      practiceExams: [
        {
          id: "p2",
          examName: "Quick Quiz",
          status: "pending",
          timeEstimate: "15"
        }
      ]
    }
  },
  timeAllocation: {
    concepts: 70,
    flashcards: 25,
    practiceExams: 45,
    revision: 20,
    total: 160
  },
  tomorrowPreview: {
    totalTasks: 5,
    focusArea: "Mathematics",
    difficulty: "moderate",
    concepts: 2,
    flashcards: 2,
    practiceExams: 1
  },
  smartExtras: {
    bookmarks: [
      {
        id: "b1",
        title: "Wave Optics",
        type: "concept",
        addedOn: new Date().toISOString()
      }
    ],
    notes: [
      {
        id: "n1",
        content: "Remember to review the formulas for kinematics before the mini-test",
        createdAt: new Date().toISOString()
      }
    ]
  },
  tasks: {
    concepts: [],
    flashcards: [],
    practiceExams: [],
    revision: []
  },
  backlogTasks: [
    {
      id: "bl1",
      subject: "History",
      title: "Revolt of 1857 Flashcards",
      type: "flashcard",
      timeEstimate: 15,
      status: "overdue",
      daysOverdue: 1
    },
    {
      id: "bl2",
      subject: "Math",
      title: "Quadratic Equations Concept",
      type: "concept",
      timeEstimate: 30,
      status: "overdue",
      daysOverdue: 2
    }
  ]
};

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ userProfile, currentMood }) => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<TimelineView>('daily');
  const [planData, setPlanData] = useState<TodaysPlanData>(mockTodayPlan);
  const [loading, setLoading] = useState(false);
  const [newNote, setNewNote] = useState("");
  
  // In a real app, this would fetch data from API
  useEffect(() => {
    if (userProfile.name) {
      setPlanData(prev => ({
        ...prev,
        userName: userProfile.name || "Student"
      }));
    }
  }, [userProfile.name]);

  const handleMarkTaskCompleted = (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => {
    // This would call an API in a real app
    toast({
      title: "Task completed!",
      description: `You've marked this ${type} as completed. Great job!`
    });
    
    // Update UI optimistically
    setPlanData(prev => {
      const updated = {...prev};
      let found = false;
      
      // Update in subject breakdown
      Object.keys(updated.subjectBreakdown).forEach(subject => {
        if (type === 'concept') {
          updated.subjectBreakdown[subject].concepts = updated.subjectBreakdown[subject].concepts.map(c => {
            if (c.id === id) {
              found = true;
              return {...c, status: '✅ completed'};
            }
            return c;
          });
        } else if (type === 'flashcard') {
          updated.subjectBreakdown[subject].flashcards = updated.subjectBreakdown[subject].flashcards.map(f => {
            if (f.id === id) {
              found = true;
              return {...f, status: '✅ completed'};
            }
            return f;
          });
        } else if (type === 'practice-exam') {
          updated.subjectBreakdown[subject].practiceExams = updated.subjectBreakdown[subject].practiceExams.map(p => {
            if (p.id === id) {
              found = true;
              return {...p, status: '✅ completed'};
            }
            return p;
          });
        }
      });
      
      // Update in backlogs if not found in main tasks
      if (!found) {
        updated.backlogTasks = updated.backlogTasks.map(task => {
          if (task.id === id) {
            return {...task, status: '✅ completed'};
          }
          return task;
        });
      }
      
      return updated;
    });
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setPlanData(prev => ({
        ...prev,
        smartExtras: {
          ...prev.smartExtras,
          notes: [
            ...prev.smartExtras.notes,
            {
              id: `n${prev.smartExtras.notes.length + 1}`,
              content: newNote,
              createdAt: new Date().toISOString()
            }
          ]
        }
      }));
      setNewNote("");
      toast({
        title: "Note added",
        description: "Your study note has been saved successfully."
      });
    }
  };

  const handlePostponeTask = (id: string, type: string) => {
    toast({
      title: "Task postponed",
      description: "This task has been moved to tomorrow's plan."
    });
    
    // In a real app, this would call an API to update the plan
  };

  const handleMarkDayComplete = () => {
    toast({
      title: "Day completed!",
      description: "Great job completing your study goals for today!",
      variant: "success"
    });
    
    // In a real app, this would call an API to log the completion
  };
  
  const handleRefreshPlan = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Plan refreshed",
        description: "Your study plan has been updated based on your latest progress."
      });
      setLoading(false);
    }, 1000);
  };

  // Get mood-specific message and styling
  const getMoodBasedContent = () => {
    if (!currentMood) return null;
    
    const moodMessages = {
      happy: "You're in a great mood! Perfect time to tackle challenging concepts.",
      focused: "You're in beast mode! 🚀 Let's tackle the toughest concepts first.",
      tired: "Focus on lighter topics and flashcards today. Slow and steady wins!",
      stressed: "Take it one step at a time. Start with your favorite subject.",
      confused: "Let's break things down. Focus on one concept at a time.",
      motivated: "Excellent energy! Use it to clear backlog tasks.",
      anxious: "Start with simple wins - 5 flashcards first to build momentum. 🧘‍♂️",
      overwhelmed: "Let's simplify today. Focus on just the essential tasks.",
      sad: "Small steps today. Choose topics you enjoy to regain momentum.",
      curious: "Perfect day to explore new concepts! Your curiosity will fuel learning.",
      neutral: "Balanced approach today - mix concepts with practice tests.",
      okay: "You're doing fine - focus on steady progress throughout the day."
    };
    
    const moodColors = {
      happy: "bg-amber-50 text-amber-800 border-amber-200",
      focused: "bg-blue-50 text-blue-800 border-blue-200",
      tired: "bg-indigo-50 text-indigo-800 border-indigo-200",
      stressed: "bg-red-50 text-red-800 border-red-200",
      confused: "bg-purple-50 text-purple-800 border-purple-200",
      motivated: "bg-green-50 text-green-800 border-green-200",
      anxious: "bg-violet-50 text-violet-800 border-violet-200",
      overwhelmed: "bg-rose-50 text-rose-800 border-rose-200",
      sad: "bg-sky-50 text-sky-800 border-sky-200",
      curious: "bg-teal-50 text-teal-800 border-teal-200",
      neutral: "bg-gray-50 text-gray-800 border-gray-200",
      okay: "bg-emerald-50 text-emerald-800 border-emerald-200"
    };
    
    return {
      message: moodMessages[currentMood] || "Your plan has been adjusted based on your current mood.",
      className: moodColors[currentMood] || "bg-blue-50 text-blue-800 border-blue-200"
    };
  };

  const moodContent = getMoodBasedContent();
  const completionPercentage = Math.round((planData.completedTasks / planData.totalTasks) * 100);
  
  // Get time of day for greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Today's Study Plan"
        subtitle="Your Smart Study Roadmap for Today"
      />
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Progress value={completionPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{planData.completedTasks}/{planData.totalTasks} tasks completed</span>
            <span>Goal: Complete all by 8 PM</span>
          </div>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            <Flame className="h-3 w-3 mr-1" /> Streak: {planData.streak} days
          </Badge>
          <Button variant="outline" size="sm" onClick={handleRefreshPlan} disabled={loading}>
            <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Timeline Navigation */}
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as TimelineView)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>🔹 Today</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>🔸 This Week</span>
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-2">
            <CalendarRange className="h-4 w-4" />
            <span>🔸 Monthly</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Daily View Content */}
        <TabsContent value="daily" className="space-y-6 mt-6">
          {/* Personal Greeting Section */}
          <Card className="shadow-sm">
            <CardHeader className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/30 dark:to-indigo-900/30 pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-medium flex items-center gap-2">
                    <span>Good {getTimeOfDay()}, {planData.userName}! 🌟</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Let's conquer the day with a personalized study plan tailored for you!
                  </p>
                </div>
                
                <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30">
                    <BookOpen className="h-3.5 w-3.5 mr-1" /> 2 Subjects
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30">
                    <BookCheck className="h-3.5 w-3.5 mr-1" /> 1 Practice Test
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30">
                    <Book className="h-3.5 w-3.5 mr-1" /> 15 Flashcards
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          {/* Mood-based Smart Suggestion */}
          {currentMood && moodContent && (
            <div className={`p-4 rounded-lg border ${moodContent.className} dark:bg-opacity-20 dark:border-opacity-30`}>
              <p className="flex items-center">
                {currentMood === 'happy' && <Star className="h-5 w-5 mr-2" />}
                {currentMood === 'focused' && <BookCheck className="h-5 w-5 mr-2" />}
                {currentMood === 'tired' && <Clock className="h-5 w-5 mr-2" />}
                {moodContent.message}
              </p>
            </div>
          )}
          
          {/* Subject-Wise Breakdown */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Subject-wise Detailed Breakdown</h3>
            
            {Object.entries(planData.subjectBreakdown).map(([subject, data]) => (
              <SubjectCard 
                key={subject}
                subjectName={subject}
                subjectData={data}
                onTaskComplete={handleMarkTaskCompleted}
              />
            ))}
          </div>
          
          {/* Pending Backlogs Section */}
          {planData.backlogTasks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flag className="h-5 w-5 text-red-500" />
                  <span>⚡ Backlogs – Let's Clear Yesterday's Challenges!</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">📌 Subject</th>
                        <th className="text-left py-2">Concept/Task</th>
                        <th className="text-left py-2">Time Required</th>
                        <th className="text-right py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planData.backlogTasks.map(task => (
                        <tr key={task.id} className="border-b last:border-none">
                          <td className="py-2">{task.subject}</td>
                          <td className="py-2">{task.title}</td>
                          <td className="py-2">{task.timeEstimate} min</td>
                          <td className="py-2 text-right">
                            <Link to={`/dashboard/student/${task.type}s/${task.id}`}>
                              <Button size="sm" variant="link" className="h-7 p-0 text-blue-600 dark:text-blue-400">
                                📎 Complete Now
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {planData.backlogTasks.length > 3 && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
                    💡 Smart Tip: Split backlog over 3 days to avoid burnout.
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Time Allocation Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Time Allocation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Concepts</p>
                    <p className="text-lg font-medium">
                      {Math.floor(planData.timeAllocation.concepts / 60) > 0 ? 
                        `${Math.floor(planData.timeAllocation.concepts / 60)}h ${planData.timeAllocation.concepts % 60}m` : 
                        `${planData.timeAllocation.concepts}m`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Flashcards</p>
                    <p className="text-lg font-medium">
                      {Math.floor(planData.timeAllocation.flashcards / 60) > 0 ? 
                        `${Math.floor(planData.timeAllocation.flashcards / 60)}h ${planData.timeAllocation.flashcards % 60}m` : 
                        `${planData.timeAllocation.flashcards}m`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Practice Tests</p>
                    <p className="text-lg font-medium">
                      {Math.floor(planData.timeAllocation.practiceExams / 60) > 0 ? 
                        `${Math.floor(planData.timeAllocation.practiceExams / 60)}h ${planData.timeAllocation.practiceExams % 60}m` : 
                        `${planData.timeAllocation.practiceExams}m`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Time</p>
                    <p className="text-lg font-medium">
                      {Math.floor(planData.timeAllocation.total / 60) > 0 ? 
                        `${Math.floor(planData.timeAllocation.total / 60)}h ${planData.timeAllocation.total % 60}m` : 
                        `${planData.timeAllocation.total}m`}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-4 bg-blue-50 p-3 rounded-md border border-blue-100 text-blue-700">
                  ✅ Breaks recommended after every 60-90 minutes
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tomorrow's Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-green-600" />
                Tomorrow's Plan Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Book className="h-4 w-4 text-blue-500" />
                          <span>Concepts</span>
                        </div>
                        <Badge variant="outline">{planData.tomorrowPreview.concepts}</Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-amber-500" />
                          <span>Flashcards</span>
                        </div>
                        <Badge variant="outline">{planData.tomorrowPreview.flashcards}</Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                          <span>Practice Tests</span>
                        </div>
                        <Badge variant="outline">{planData.tomorrowPreview.practiceExams}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-medium">Focus Area: {planData.tomorrowPreview.focusArea}</p>
                      <p className="text-xs text-muted-foreground">
                        Difficulty: 
                        <span className={
                          planData.tomorrowPreview.difficulty === 'easy' ? 'text-green-600' :
                          planData.tomorrowPreview.difficulty === 'moderate' ? 'text-amber-600' : 
                          'text-red-600'
                        }>
                          {' '}{planData.tomorrowPreview.difficulty}
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <p className="text-sm font-medium">Total: {planData.tomorrowPreview.totalTasks} tasks</p>
                    </div>
                  </div>
                </div>
                
                {completionPercentage < 100 && (
                  <div className="text-sm text-muted-foreground mt-4 bg-amber-50 p-3 rounded-md border border-amber-100 text-amber-700">
                    Complete today's plan to unlock full details of tomorrow's schedule
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Smart Extras Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-violet-600" />
                Smart Extras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Recommended Flashcards */}
                <div>
                  <h4 className="font-medium mb-2">🗂️ Recommended for Today</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 border border-gray-200 rounded-md flex items-center justify-between bg-blue-50/50">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        <span>Newton's Laws Flashcards</span>
                      </div>
                      <Link to="/dashboard/student/flashcards/physics/newton">
                        <Button size="sm" variant="outline" className="h-7">Review</Button>
                      </Link>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-md flex items-center justify-between bg-purple-50/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <span>Rapid Chemistry Quiz</span>
                      </div>
                      <Link to="/dashboard/student/practice-exam/chemistry/rapid">
                        <Button size="sm" variant="outline" className="h-7">Take Quiz</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Journal Notes */}
                <div>
                  <h4 className="font-medium mb-2">📝 Daily Reflection</h4>
                  <div className="space-y-2">
                    <Textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="How was your energy today? Add notes, reflections, or questions about today's learning..."
                      className="w-full rounded-md min-h-[80px]"
                    />
                    <Button variant="outline" onClick={handleAddNote} disabled={!newNote.trim()}>
                      <BookmarkPlus className="h-4 w-4 mr-2" /> Add Note
                    </Button>
                  </div>
                  
                  {planData.smartExtras.notes.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {planData.smartExtras.notes.map(note => (
                        <div key={note.id} className="bg-gray-50 p-3 rounded-md text-sm">
                          <div className="text-xs text-gray-500 mb-1">
                            {new Date(note.createdAt).toLocaleString()}
                          </div>
                          {note.content}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Weekly View Content */}
        <TabsContent value="weekly" className="space-y-4 mt-6">
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Weekly View</h3>
            <p className="text-muted-foreground">
              Your weekly study plan will appear here, showing scheduled tasks across the entire week. 
              This helps you plan ahead and maintain a balanced study approach.
            </p>
          </Card>
        </TabsContent>
        
        {/* Monthly View Content */}
        <TabsContent value="monthly" className="space-y-4 mt-6">
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Monthly View</h3>
            <p className="text-muted-foreground">
              Your monthly overview will display here, with major milestones, exam dates,
              and long-term planning to help you stay on track with your exam goals.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Sticky Footer */}
      <Card className="sticky bottom-0 mt-8 border-t shadow-lg">
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <div className="text-sm">
              <span className="font-medium">{completionPercentage}% Completed</span>
              <span className="text-muted-foreground ml-2">Today's Plan</span>
            </div>
            <Badge className="bg-amber-100 text-amber-700 border-amber-200">
              <Flame className="h-3 w-3 mr-1" /> Streak: {planData.streak} days
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handlePostponeTask("", "")}>
              Postpone Tasks
            </Button>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleMarkDayComplete}
            >
              <Check className="h-4 w-4 mr-1" /> Mark Day Complete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// Subject Card Component
interface SubjectCardProps {
  subjectName: string;
  subjectData: {
    concepts: any[];
    flashcards: any[];
    practiceExams: any[];
  };
  onTaskComplete: (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subjectName, subjectData, onTaskComplete }) => {
  // Color themes for different subjects
  const subjectThemes: Record<string, { 
    gradientFrom: string, 
    gradientTo: string, 
    borderColor: string,
    darkGradientFrom: string,
    darkGradientTo: string,
    darkBorderColor: string
  }> = {
    "Physics": {
      gradientFrom: "from-blue-50/70", 
      gradientTo: "to-cyan-50/70",
      borderColor: "border-blue-100",
      darkGradientFrom: "dark:from-blue-900/20",
      darkGradientTo: "dark:to-cyan-900/20",
      darkBorderColor: "dark:border-blue-800/30"
    },
    "Chemistry": {
      gradientFrom: "from-green-50/70", 
      gradientTo: "to-teal-50/70",
      borderColor: "border-green-100",
      darkGradientFrom: "dark:from-green-900/20",
      darkGradientTo: "dark:to-teal-900/20",
      darkBorderColor: "dark:border-green-800/30"
    },
    "Mathematics": {
      gradientFrom: "from-violet-50/70", 
      gradientTo: "to-purple-50/70",
      borderColor: "border-violet-100",
      darkGradientFrom: "dark:from-violet-900/20",
      darkGradientTo: "dark:to-purple-900/20",
      darkBorderColor: "dark:border-violet-800/30"
    },
    "Biology": {
      gradientFrom: "from-amber-50/70", 
      gradientTo: "to-yellow-50/70",
      borderColor: "border-amber-100",
      darkGradientFrom: "dark:from-amber-900/20",
      darkGradientTo: "dark:to-yellow-900/20",
      darkBorderColor: "dark:border-amber-800/30"
    }
  };
  
  // Default theme if subject not found
  const defaultTheme = {
    gradientFrom: "from-gray-50/70", 
    gradientTo: "to-slate-50/70",
    borderColor: "border-gray-100",
    darkGradientFrom: "dark:from-gray-900/20",
    darkGradientTo: "dark:to-slate-900/20",
    darkBorderColor: "dark:border-gray-800/30"
  };
  
  const theme = subjectThemes[subjectName] || defaultTheme;
  
  // Calculate total time for this subject
  const calculateTotalTime = () => {
    const conceptsTime = subjectData.concepts.reduce((acc, c) => acc + parseInt(c.timeEstimate), 0);
    const flashcardsTime = subjectData.flashcards.reduce((acc, f) => acc + parseInt(f.timeEstimate), 0);
    const examsTime = subjectData.practiceExams.reduce((acc, p) => acc + parseInt(p.timeEstimate), 0);
    return conceptsTime + flashcardsTime + examsTime;
  };
  
  const totalTime = calculateTotalTime();
  
  return (
    <Card>
      <CardHeader className={`bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} ${theme.darkGradientFrom} ${theme.darkGradientTo} ${theme.borderColor} ${theme.darkBorderColor}`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{subjectName}</CardTitle>
          <Badge>🕒 {Math.floor(totalTime / 60) > 0 ? 
            `${Math.floor(totalTime / 60)}h ${totalTime % 60}m` : 
            `${totalTime}m`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Concepts Column */}
          <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <BookOpen className="h-3.5 w-3.5 mr-1 text-blue-500" /> Concepts
            </h5>
            <div className="space-y-2">
              {subjectData.concepts.map(concept => (
                <div key={concept.id} className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex justify-between text-xs">
                    <span>{concept.title}</span>
                    <span>{concept.timeEstimate} min</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <Link to={`/dashboard/student/concepts/${subjectName.toLowerCase()}/${concept.id}`}>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Start Learning
                      </Button>
                    </Link>
                    {concept.status === '✅ completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Circle 
                        className="h-4 w-4 text-gray-300 cursor-pointer hover:text-gray-400" 
                        onClick={() => onTaskComplete(concept.id, 'concept')}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Flashcards Column */}
          <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <Book className="h-3.5 w-3.5 mr-1 text-amber-500" /> Flashcards
            </h5>
            {subjectData.flashcards.map(flashcard => (
              <div key={flashcard.id} className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex justify-between text-xs">
                  <span>{flashcard.cardCount || 0} Cards</span>
                  <span>{flashcard.timeEstimate} min</span>
                </div>
                <Progress value={30} className="h-1.5 mt-1.5 mb-1" />
                <div className="flex items-center justify-between">
                  <Link to={`/dashboard/student/flashcards/${subjectName.toLowerCase()}/${flashcard.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Study Cards
                    </Button>
                  </Link>
                  {flashcard.status === '✅ completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle 
                      className="h-4 w-4 text-gray-300 cursor-pointer hover:text-gray-400" 
                      onClick={() => onTaskComplete(flashcard.id, 'flashcard')}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Practice Test Column */}
          <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
            <h5 className="text-sm font-medium mb-2 flex items-center">
              <AlertTriangle className="h-3.5 w-3.5 mr-1 text-purple-500" /> Practice Test
            </h5>
            {subjectData.practiceExams.map(exam => (
              <div key={exam.id} className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex justify-between text-xs">
                  <span>{exam.examName}</span>
                  <span>{exam.timeEstimate} min</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <Link to={`/dashboard/student/practice-exam/${exam.id}/start`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Start Test
                    </Button>
                  </Link>
                  {exam.status === '✅ completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle 
                      className="h-4 w-4 text-gray-300 cursor-pointer hover:text-gray-400" 
                      onClick={() => onTaskComplete(exam.id, 'practice-exam')}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Smart Tips */}
        <div className="mt-3 text-xs text-muted-foreground p-2 bg-blue-50 dark:bg-blue-900/10 rounded-md">
          💡 Need more time? <span className="text-blue-600 cursor-pointer hover:underline">Flag for tomorrow</span> or 
          <span className="text-blue-600 cursor-pointer hover:underline ml-1">Add more time</span>.
        </div>
      </CardContent>
    </Card>
  );
};

export default RedesignedTodaysPlan;
