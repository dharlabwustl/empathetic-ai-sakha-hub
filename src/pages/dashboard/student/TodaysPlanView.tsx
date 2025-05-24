
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, FileText, Brain, AlertTriangle, CheckCircle, Calendar, TrendingUp, Target, Zap, Star } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { getMoodTheme } from '@/components/dashboard/student/moodThemes';

const TodaysPlanView = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const { planData, loading, activeView, setActiveView, markTaskCompleted } = useTodaysPlan("IIT-JEE", "Student");
  const [currentTab, setCurrentTab] = useState('all');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();

  // Load mood from localStorage on component mount
  useEffect(() => {
    const savedMood = localStorage.getItem('userMood');
    if (savedMood && Object.values(MoodType).includes(savedMood as MoodType)) {
      setCurrentMood(savedMood as MoodType);
    }
  }, []);

  // Mocked tasks for demonstration
  const tasks = [
    {
      id: '1',
      title: "Newton's Laws of Motion",
      subject: "Physics",
      type: 'concept',
      status: 'pending',
      timeEstimate: 45,
      isBacklog: false,
      priority: 'high',
      smartTip: "You've been doing well with Physics concepts. Keep the momentum!"
    },
    {
      id: '2',
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      type: 'flashcard',
      status: 'in-progress',
      timeEstimate: 30,
      isBacklog: true,
      priority: 'medium',
      smartTip: "Try grouping reaction mechanisms to improve recall"
    },
    {
      id: '3',
      title: "Calculus Integration Techniques",
      subject: "Mathematics",
      type: 'concept',
      status: 'completed',
      timeEstimate: 60,
      isBacklog: false,
      priority: 'medium',
      completedAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '4',
      title: "Physics Practice Test",
      subject: "Physics",
      type: 'exam',
      status: 'pending',
      timeEstimate: 90,
      isBacklog: false,
      priority: 'high',
      smartTip: "Review Newton's Laws before attempting this test"
    },
    {
      id: '5',
      title: "Chemical Bonding Flashcards",
      subject: "Chemistry",
      type: 'flashcard',
      status: 'pending',
      timeEstimate: 25,
      isBacklog: false,
      priority: 'low',
    },
    {
      id: '6',
      title: "Coordinate Geometry Quiz",
      subject: "Mathematics",
      type: 'exam',
      status: 'completed',
      timeEstimate: 45,
      isBacklog: false,
      priority: 'medium',
      completedAt: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  // Filter tasks based on current tab
  const getFilteredTasks = () => {
    switch (currentTab) {
      case 'all':
        return tasks;
      case 'pending':
        return tasks.filter(task => task.status === 'pending' || task.status === 'in-progress');
      case 'completed':
        return tasks.filter(task => task.status === 'completed');
      case 'concept':
        return tasks.filter(task => task.type === 'concept');
      case 'flashcard':
        return tasks.filter(task => task.type === 'flashcard');
      case 'exam':
        return tasks.filter(task => task.type === 'exam');
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  
  // Calculate total time
  const totalTimeEstimate = tasks.reduce((total, task) => {
    if (task.status !== 'completed') {
      return total + task.timeEstimate;
    }
    return total;
  }, 0);
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const percentageCompleted = Math.round((completedTasks / totalTasks) * 100);

  // Handle task action
  const handleTaskAction = (task: any) => {
    console.log("TodaysPlanView - Task action clicked:", task.id, task.type);
    
    if (task.status === 'completed') {
      switch (task.type) {
        case 'concept':
          console.log("TodaysPlanView - Navigating to concept detail (review):", task.id);
          navigate(`/dashboard/student/concepts/${task.id}`);
          break;
        case 'flashcard':
          navigate(`/dashboard/student/flashcards/${task.id}/interactive`);
          break;
        case 'exam':
          navigate(`/dashboard/student/practice-exam/${task.id}/review`);
          break;
      }
    } else {
      switch (task.type) {
        case 'concept':
          console.log("TodaysPlanView - Navigating to concept detail (start):", task.id);
          navigate(`/dashboard/student/concepts/${task.id}`);
          break;
        case 'flashcard':
          navigate(`/dashboard/student/flashcards/${task.id}/interactive`);
          break;
        case 'exam':
          navigate(`/dashboard/student/practice-exam/${task.id}/start`);
          break;
      }
    }
  };

  // Handle task card click
  const handleTaskCardClick = (task: any) => {
    console.log("TodaysPlanView - Task card clicked:", task.id, task.type);
    
    if (task.type === 'concept') {
      console.log("TodaysPlanView - Navigating to concept detail page:", task.id);
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else {
      handleTaskAction(task);
    }
  };

  // Handle mood selection
  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    console.log('User mood updated:', mood);
    
    // Save mood to local storage for persistence
    localStorage.setItem("userMood", mood);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'flashcard':
        return <Brain className="h-5 w-5 text-violet-500" />;
      case 'exam':
        return <FileText className="h-5 w-5 text-emerald-500" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;

  // Today's plan content
  const todaysPlanContent = (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Calendar className="h-8 w-8" />
                Today's Study Plan
              </h1>
              <p className="text-blue-100 mt-2">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{percentageCompleted}%</div>
              <div className="text-sm text-blue-100">Progress Today</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div>
                  <div className="text-sm text-blue-100">Tasks Completed</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalTimeEstimate}m</div>
                  <div className="text-sm text-blue-100">Time Remaining</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-blue-100">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>
      
      {/* Mood and Progress Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className={`overflow-hidden ${moodTheme ? moodTheme.background : ''}`}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              How are you feeling today?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MoodSelector currentMood={currentMood} onMoodSelect={handleMoodChange} />
            {currentMood && (
              <div className={`mt-4 p-3 rounded-lg ${moodTheme?.background} ${moodTheme?.border} border`}>
                <p className={`text-sm ${moodTheme?.text}`}>
                  Great! We've adjusted your study plan to match your {currentMood.toLowerCase()} mood.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{percentageCompleted}%</span>
                </div>
                <Progress value={percentageCompleted} className="h-3" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalTasks - completedTasks}</div>
                  <div className="text-xs text-muted-foreground">Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.round(totalTimeEstimate / 60)}h</div>
                  <div className="text-xs text-muted-foreground">Time Left</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tasks Section */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Your Study Tasks
            </CardTitle>
          </div>
        </CardHeader>
        
        <div className="p-6 pb-4">
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'pending', 'completed', 'concept', 'flashcard', 'exam'].map((tab) => (
              <Button
                key={tab}
                variant={currentTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTab(tab)}
                className="capitalize"
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map(task => (
              <Card 
                key={task.id} 
                className={`group overflow-hidden transition-all border-l-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${
                  task.priority === 'high' ? "border-l-red-500" : 
                  task.priority === 'medium' ? "border-l-amber-500" : "border-l-blue-500"
                }`}
                onClick={() => handleTaskCardClick(task)}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      {getTaskTypeIcon(task.type)}
                      <span className="font-medium text-sm">{task.subject}</span>
                    </div>
                    {getTaskStatusBadge(task.status)}
                  </div>
                  
                  <h3 className="font-semibold text-base mb-3 group-hover:text-primary transition-colors">
                    {task.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{task.timeEstimate} min</span>
                    </div>
                    
                    {task.isBacklog && (
                      <div className="flex items-center gap-1 text-amber-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-xs">Backlog</span>
                      </div>
                    )}
                  </div>
                  
                  {task.status === 'completed' && task.completedAt && (
                    <div className="flex items-center gap-1 text-xs text-green-600 mb-3">
                      <CheckCircle className="h-3 w-3" />
                      <span>Completed</span>
                    </div>
                  )}
                  
                  {task.smartTip && (
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      <p>{task.smartTip}</p>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full group-hover:scale-105 transition-transform"
                    variant={task.status === 'completed' ? "outline" : "default"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskAction(task);
                    }}
                  >
                    {task.status === 'completed' ? 'Review' : 'Start Now'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-muted-foreground">No tasks found for this category</p>
            </div>
          )}
        </div>
      </Card>
      
      {/* Smart Suggestions */}
      <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentMood === MoodType.STRESSED ? (
              <div className="bg-violet-100 dark:bg-violet-900/30 p-4 rounded-xl border border-violet-200 dark:border-violet-700">
                <h3 className="font-medium text-violet-800 dark:text-violet-300 mb-2">You seem stressed today</h3>
                <p className="text-sm text-violet-700 dark:text-violet-400 mb-3">
                  Try shorter study sessions of 15-20 minutes with more frequent breaks.
                </p>
                <Button variant="outline" size="sm" className="border-violet-300 text-violet-800 hover:bg-violet-50">
                  Adjust My Schedule
                </Button>
              </div>
            ) : currentMood === MoodType.TIRED ? (
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-xl border border-amber-200 dark:border-amber-700">
                <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Energy management for tired days</h3>
                <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                  Focus on review tasks instead of new concepts. Take a short walk before studying.
                </p>
                <Button variant="outline" size="sm" className="border-amber-300 text-amber-800 hover:bg-amber-50">
                  Show Review Tasks
                </Button>
              </div>
            ) : (
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-700">
                <h3 className="font-medium text-emerald-800 dark:text-emerald-300 mb-2">
                  {currentMood ? `Great to see you're feeling ${currentMood}!` : 'Optimize your study session'}
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-3">
                  Your calculus scores have improved! Try tackling the advanced practice exam.
                </p>
                <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-800 hover:bg-emerald-50">
                  Start Advanced Exam
                </Button>
              </div>
            )}

            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
              <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Subject focus recommendation</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                Physics concepts need attention based on your recent quiz performance.
              </p>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-800 hover:bg-blue-50">
                View Physics Resources
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return userProfile ? (
    <SharedPageLayout title="Today's Plan" subtitle="Your personalized daily study schedule" activeTab="today">
      {todaysPlanContent}
    </SharedPageLayout>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default TodaysPlanView;
