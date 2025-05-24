
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

  // Handle task card click (entire card clickable)
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
    localStorage.setItem('userMood', mood);
    
    // Sync with dashboard mood
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

  // Get mood theme for personalization
  const moodTheme = currentMood ? getMoodTheme(currentMood) : getMoodTheme('okay');

  // Today's plan content
  const todaysPlanContent = (
    <div className="space-y-8">
      {/* Enhanced Header with Mood-Based Personalization */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Calendar className="h-8 w-8 text-primary" />
                Today's Study Plan
                <Star className="h-6 w-6 text-yellow-500" />
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center min-w-[80px] shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{completedTasks}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center min-w-[80px] shadow-sm">
                <div className="text-2xl font-bold text-amber-600">{totalTimeEstimate}</div>
                <div className="text-xs text-gray-500">Minutes Left</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center min-w-[80px] shadow-sm">
                <div className="text-2xl font-bold text-green-600">{percentageCompleted}%</div>
                <div className="text-xs text-gray-500">Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Mood and Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Selection with Enhanced Design */}
        <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">😊</span>
              How are you feeling today?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <MoodSelector currentMood={currentMood} onMoodSelect={handleMoodChange} />
            {currentMood && (
              <div className={`mt-4 p-4 rounded-lg ${moodTheme.background} ${moodTheme.border} border`}>
                <p className={`text-sm font-medium ${moodTheme.text}`}>
                  {currentMood === MoodType.FOCUSED ? "Great! You're in the zone for deep learning." :
                   currentMood === MoodType.MOTIVATED ? "Excellent energy! Perfect time for challenging topics." :
                   currentMood === MoodType.TIRED ? "Take it easy today. Consider review tasks and shorter sessions." :
                   currentMood === MoodType.STRESSED ? "Let's start with easier topics and build confidence." :
                   "Your mood helps us personalize your study experience!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Progress Card */}
        <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Completed {completedTasks} of {totalTasks} tasks
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{percentageCompleted}%</span>
                </div>
                <Progress value={percentageCompleted} className="h-3 bg-gray-200 dark:bg-gray-700" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-2">
                    <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{totalTimeEstimate}m</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Done</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{completedTasks}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg mx-auto mb-2">
                    <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{totalTasks - completedTasks}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Enhanced Tasks Section */}
      <Card className="overflow-hidden border-2">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Task Breakdown
            </CardTitle>
            <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
              Total: <span className="font-semibold">{totalTimeEstimate} min</span>
            </div>
          </div>
        </CardHeader>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'completed', 'concept', 'flashcard', 'exam'].map((tab) => (
              <Button
                key={tab}
                variant={currentTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTab(tab)}
                className="capitalize transition-all hover:scale-105"
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map(task => (
              <Card 
                key={task.id} 
                className={`group overflow-hidden transition-all border-l-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                  task.priority === 'high' ? "border-l-red-500 hover:border-l-red-600" : 
                  task.priority === 'medium' ? "border-l-amber-500 hover:border-l-amber-600" : 
                  "border-l-blue-500 hover:border-l-blue-600"
                }`}
                onClick={() => handleTaskCardClick(task)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {getTaskTypeIcon(task.type)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">{task.subject}</span>
                        {task.priority === 'high' && (
                          <div className="flex items-center gap-1 mt-1">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-red-500 font-medium">High Priority</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {getTaskStatusBadge(task.status)}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                    {task.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{task.timeEstimate} min</span>
                    </div>
                    
                    {task.isBacklog && (
                      <div className="flex items-center gap-1 text-amber-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-xs font-medium">Backlog</span>
                      </div>
                    )}
                  </div>
                  
                  {task.status === 'completed' && task.completedAt && (
                    <div className="flex items-center gap-2 text-xs text-green-600 mb-3">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed {new Date(task.completedAt).toLocaleTimeString()}</span>
                    </div>
                  )}
                  
                  {task.smartTip && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                      <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">
                        💡 {task.smartTip}
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    className={`w-full transition-all ${
                      task.status === 'completed' 
                        ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200" 
                        : "bg-primary hover:bg-primary/90"
                    }`}
                    variant={task.status === 'completed' ? "outline" : "default"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskAction(task);
                    }}
                  >
                    {task.status === 'completed' ? '📝 Review' : '🚀 Start Now'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found for this category</p>
            </div>
          )}
        </div>
      </Card>
      
      {/* Enhanced Smart Suggestions */}
      <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentMood === MoodType.STRESSED ? (
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-200 dark:border-violet-700">
                <h3 className="font-semibold text-violet-800 dark:text-violet-300 mb-2 flex items-center gap-2">
                  🧘‍♀️ You seem stressed today
                </h3>
                <p className="text-sm text-violet-700 dark:text-violet-400 mb-3">
                  Try shorter study sessions of 15-20 minutes with more frequent breaks. Consider starting with easier topics.
                </p>
                <Button variant="outline" size="sm" className="border-violet-300 text-violet-800 hover:bg-violet-100">
                  🔄 Adjust My Schedule
                </Button>
              </div>
            ) : currentMood === MoodType.TIRED ? (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-700">
                <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                  ⚡ Energy management for tired days
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                  Focus on review tasks instead of new concepts. Take a short walk or do some light exercises before studying.
                </p>
                <Button variant="outline" size="sm" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                  📝 Show Review Tasks
                </Button>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
                  🌟 {currentMood ? `Great to see you're feeling ${currentMood}!` : 'Optimize your study session'}
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-3">
                  Your performance has been improving! Try tackling more challenging topics or take a practice exam.
                </p>
                <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-800 hover:bg-emerald-100">
                  🎯 Start Advanced Practice
                </Button>
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                📊 Subject focus recommendation
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                Physics concepts need attention based on your recent performance. Consider spending extra time on mechanics.
              </p>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-800 hover:bg-blue-100">
                🔬 View Physics Resources
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
