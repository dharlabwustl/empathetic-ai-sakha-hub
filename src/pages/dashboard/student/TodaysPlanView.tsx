
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, FileText, Brain, AlertTriangle, CheckCircle, Calendar, Target, Flame, Trophy } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { getMoodTheme } from '@/components/dashboard/student/moodThemes';
import { motion } from 'framer-motion';

const TodaysPlanView = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const { planData, loading, activeView, setActiveView, markTaskCompleted } = useTodaysPlan("IIT-JEE", "Student");
  const [currentTab, setCurrentTab] = useState('all');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();

  // Enhanced tasks with more variety
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
  
  // Calculate metrics
  const totalTimeEstimate = tasks.reduce((total, task) => {
    if (task.status !== 'completed') {
      return total + task.timeEstimate;
    }
    return total;
  }, 0);
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const percentageCompleted = Math.round((completedTasks / totalTasks) * 100);
  const currentStreak = 5;
  const readinessScore = 72;

  // Get mood-based theme
  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;

  // Handle task actions
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

  const handleTaskCardClick = (task: any) => {
    console.log("TodaysPlanView - Task card clicked:", task.id, task.type);
    
    if (task.type === 'concept') {
      console.log("TodaysPlanView - Navigating to concept detail page:", task.id);
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else {
      handleTaskAction(task);
    }
  };

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    console.log('User mood updated:', mood);
    
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

  return userProfile ? (
    <div className="min-h-screen">
      {/* Enhanced Gradient Header with Mood-based Theming */}
      <motion.div 
        className={`relative overflow-hidden ${
          moodTheme ? moodTheme.background : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        } dark:from-gray-900 dark:via-gray-800 dark:to-gray-700`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/student')}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Header Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className={`text-4xl font-bold mb-2 ${moodTheme ? moodTheme.text : 'text-gray-900'} dark:text-white`}>
                  Today's Study Plan
                </h1>
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className={`text-lg ${moodTheme ? moodTheme.accent : 'text-gray-600'} dark:text-gray-300`}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </motion.div>

              {/* Progress Metrics */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{percentageCompleted}%</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="h-5 w-5 text-amber-500 mr-1" />
                      <span className="text-2xl font-bold text-amber-600">{totalTimeEstimate}m</span>
                    </div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Flame className="h-5 w-5 text-orange-500 mr-1" />
                      <span className="text-2xl font-bold text-orange-600">{currentStreak}</span>
                    </div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="h-5 w-5 text-green-500 mr-1" />
                      <span className="text-2xl font-bold text-green-600">{readinessScore}%</span>
                    </div>
                    <div className="text-sm text-gray-600">Readiness</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Mood Selector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4 text-center">How are you feeling today?</h3>
                  <MoodSelector currentMood={currentMood} onMoodSelect={handleMoodChange} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Task Breakdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today's Tasks
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Total Time: <span className="font-semibold">{totalTimeEstimate} min</span>
                </div>
              </div>
            </CardHeader>
            
            <div className="px-6">
              <div className="flex space-x-2 overflow-x-auto pb-2">
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
            
            <div className="p-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredTasks.map(task => (
                  <motion.div
                    key={task.id}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card 
                      className={`overflow-hidden transition-all border-l-4 cursor-pointer ${
                        task.priority === 'high' ? "border-l-red-500" : 
                        task.priority === 'medium' ? "border-l-amber-500" : "border-l-blue-500"
                      } hover:shadow-lg`}
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
                        
                        <h3 className="font-semibold mt-3">{task.title}</h3>
                        
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
                          className="w-full mt-3"
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
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl">Smart Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentMood === MoodType.STRESSED ? (
                  <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-700">
                    <h3 className="font-medium text-violet-800 dark:text-violet-300 mb-2">You seem stressed today</h3>
                    <p className="text-sm text-violet-700 dark:text-violet-400 mb-2">
                      Try shorter study sessions of 15-20 minutes with more frequent breaks.
                    </p>
                    <Button variant="outline" className="text-xs h-7 border-violet-300 text-violet-800">
                      Adjust My Schedule
                    </Button>
                  </div>
                ) : currentMood === MoodType.TIRED ? (
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                    <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Energy management for tired days</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mb-2">
                      Focus on review tasks instead of new concepts. Take a short walk before studying.
                    </p>
                    <Button variant="outline" className="text-xs h-7 border-amber-300 text-amber-800">
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
                    <Button variant="outline" className="text-xs h-7 border-emerald-300 text-emerald-800">
                      Start Advanced Exam
                    </Button>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Subject focus recommendation</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
                    Physics concepts need attention based on your recent quiz performance.
                  </p>
                  <Button variant="outline" className="text-xs h-7 border-blue-300 text-blue-800">
                    View Physics Resources
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default TodaysPlanView;
