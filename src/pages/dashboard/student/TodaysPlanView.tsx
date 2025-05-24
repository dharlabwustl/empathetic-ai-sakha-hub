import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, FileText, Brain, AlertTriangle, CheckCircle, Calendar, Target, TrendingUp, Star } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { motion } from 'framer-motion';
import { getMoodTheme } from '@/components/dashboard/student/moodThemes';

const TodaysPlanView = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const { planData, loading, activeView, setActiveView, markTaskCompleted } = useTodaysPlan("IIT-JEE", "Student");
  const [currentTab, setCurrentTab] = useState('all');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(userProfile?.mood);

  // Get mood theme for consistent styling
  const moodTheme = currentMood ? getMoodTheme(currentMood) : getMoodTheme('okay');

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

  // Handle task action (start or review)
  const handleTaskAction = (task: any) => {
    console.log("TodaysPlanView - Task action clicked:", task.id, task.type);
    
    if (task.status === 'completed') {
      // Navigate to review page based on task type
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
      // Navigate to start page based on task type
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
    
    // For concept cards, navigate to concept detail page
    if (task.type === 'concept') {
      console.log("TodaysPlanView - Navigating to concept detail page:", task.id);
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else {
      // For other types, use the same logic as handleTaskAction
      handleTaskAction(task);
    }
  };

  // Handle mood selection
  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    // In a real implementation, we would update the user's mood in the backend
    console.log('User mood updated:', mood);
    
    // Save mood to local storage for persistence
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

  // Today's plan content
  const todaysPlanContent = (
    <div className="space-y-6">
      {/* Beautiful Gradient Header */}
      <motion.div 
        className={`relative overflow-hidden rounded-2xl p-8 ${moodTheme.background} border-2 ${moodTheme.border}`}
        style={{ 
          background: `linear-gradient(135deg, ${moodTheme.backgroundColor} 0%, rgba(255,255,255,0.9) 100%)` 
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-transparent -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-gradient-to-tr from-white/15 to-transparent translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className={`text-3xl font-bold ${moodTheme.text} mb-2`}>
                Today's Study Plan
              </h1>
              <p className={`${moodTheme.accent} text-lg`}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={`text-sm ${moodTheme.accent}`}>Progress</p>
                <p className={`text-2xl font-bold ${moodTheme.text}`}>{percentageCompleted}%</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
                <Calendar className={`h-8 w-8 ${moodTheme.accent}`} />
              </div>
            </div>
          </div>

          {/* Progress Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div 
              className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{completedTasks}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{totalTimeEstimate}m</p>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">4</p>
                  <p className="text-sm text-gray-600">Streak Days</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${moodTheme.text}`}>Today's Progress</span>
              <span className={`text-sm ${moodTheme.accent}`}>{percentageCompleted}% Complete</span>
            </div>
            <Progress value={percentageCompleted} className="h-3 bg-white/50" />
          </div>
        </div>
      </motion.div>
      
      {/* Mood and Completion Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                How are you feeling today?
              </h3>
              <MoodSelector currentMood={currentMood} onMoodSelect={handleMoodChange} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Today's Progress
              </h3>
              <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
                <span>Completed {completedTasks} of {totalTasks} tasks</span>
                <span className="font-semibold">{percentageCompleted}%</span>
              </div>
              <Progress value={percentageCompleted} className="h-2 mb-4" />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Remaining Time</p>
                  <p className="text-lg font-semibold text-blue-600">{totalTimeEstimate} min</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Completed</p>
                  <p className="text-lg font-semibold text-green-600">{completedTasks}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Pending</p>
                  <p className="text-lg font-semibold text-amber-600">{totalTasks - completedTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Today's tasks with tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="overflow-hidden border-2 shadow-lg">
          <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Task Breakdown
              </CardTitle>
              <div className="text-sm text-muted-foreground bg-white px-3 py-1 rounded-full">
                Total Estimated Time: <span className="font-semibold">{totalTimeEstimate} min</span>
              </div>
            </div>
          </CardHeader>
          
          <div className="px-6 pt-4">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {['all', 'pending', 'completed', 'concept', 'flashcard', 'exam'].map((tab) => (
                <Button
                  key={tab}
                  variant={currentTab === tab ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTab(tab)}
                  className="capitalize hover:scale-105 transition-transform"
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="p-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`overflow-hidden transition-all border-l-4 cursor-pointer hover:shadow-lg hover:scale-105 ${
                      task.priority === 'high' ? "border-l-red-500 hover:border-l-red-600" : 
                      task.priority === 'medium' ? "border-l-amber-500 hover:border-l-amber-600" : "border-l-blue-500 hover:border-l-blue-600"
                    }`}
                    onClick={() => handleTaskCardClick(task)}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          {getTaskTypeIcon(task.type)}
                          <span className="font-medium">{task.subject}</span>
                        </div>
                        {getTaskStatusBadge(task.status)}
                      </div>
                      
                      <h3 className="font-semibold mt-3 text-gray-800">{task.title}</h3>
                      
                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{task.timeEstimate} min</span>
                        
                        {task.isBacklog && (
                          <div className="ml-auto flex items-center space-x-1 text-amber-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs">Backlog</span>
                          </div>
                        )}
                      </div>
                      
                      {task.status === 'completed' && task.completedAt && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          <span>Completed</span>
                        </div>
                      )}
                      
                      {task.smartTip && (
                        <div className="mt-3 py-2 px-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-xs text-blue-800 dark:text-blue-300">
                          <p>{task.smartTip}</p>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full mt-3 hover:scale-105 transition-transform"
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
                </motion.div>
              ))}
            </div>
            
            {filteredTasks.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                <p>No tasks found for this category</p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
      
      {/* Smart Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-violet-50 to-blue-50">
            <CardTitle className="text-xl flex items-center gap-2">
              <Brain className="h-5 w-5 text-violet-500" />
              Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {currentMood === MoodType.STRESSED ? (
                <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-700">
                  <h3 className="font-medium text-violet-800 dark:text-violet-300 mb-2">You seem stressed today</h3>
                  <p className="text-sm text-violet-700 dark:text-violet-400 mb-2">
                    Try shorter study sessions of 15-20 minutes with more frequent breaks.
                  </p>
                  <Button variant="outline" className="text-xs h-7 border-violet-300 text-violet-800 hover:scale-105 transition-transform">
                    Adjust My Schedule
                  </Button>
                </div>
              ) : currentMood === MoodType.TIRED ? (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Energy management for tired days</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mb-2">
                    Focus on review tasks instead of new concepts. Take a short walk before studying.
                  </p>
                  <Button variant="outline" className="text-xs h-7 border-amber-300 text-amber-800 hover:scale-105 transition-transform">
                    Show Review Tasks
                  </Button>
                </div>
              ) : (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <h3 className="font-medium text-emerald-800 dark:text-emerald-300 mb-2">
                    {currentMood ? `Great to see you're feeling ${currentMood}!` : 'Optimize your study session'}
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                    Your calculus scores have improved! Try tackling the advanced practice exam.
                  </p>
                  <Button variant="outline" className="text-xs h-7 border-emerald-300 text-emerald-800 hover:scale-105 transition-transform">
                    Start Advanced Exam
                  </Button>
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Subject focus recommendation</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
                  Physics concepts need attention based on your recent quiz performance.
                </p>
                <Button variant="outline" className="text-xs h-7 border-blue-300 text-blue-800 hover:scale-105 transition-transform">
                  View Physics Resources
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
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
