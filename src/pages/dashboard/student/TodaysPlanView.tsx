
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, FileText, Brain, AlertTriangle, CheckCircle, Calendar, Target, Flame, TrendingUp, Star } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import TabAIAssistant from '@/components/dashboard/student/ai-assistant/TabAIAssistant';
import TabProgressMeter from '@/components/dashboard/student/progress/TabProgressMeter';
import { useTabProgress } from '@/hooks/useTabProgress';
import { motion } from 'framer-motion';

const TodaysPlanView = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const { planData, loading, activeView, setActiveView, markTaskCompleted } = useTodaysPlan("IIT-JEE", "Student");
  const [currentTab, setCurrentTab] = useState('all');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();
  const { getTabProgress, updateTabProgress } = useTabProgress();

  // Mocked enhanced tasks for demonstration
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
      smartTip: "You've been doing well with Physics concepts. Keep the momentum!",
      difficulty: 'medium'
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
      smartTip: "Try grouping reaction mechanisms to improve recall",
      difficulty: 'hard'
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
      completedAt: new Date(Date.now() - 3600000).toISOString(),
      difficulty: 'medium'
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
      smartTip: "Review Newton's Laws before attempting this test",
      difficulty: 'hard'
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
      difficulty: 'easy'
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
      completedAt: new Date(Date.now() - 7200000).toISOString(),
      difficulty: 'medium'
    }
  ];

  // Update progress when component mounts
  useEffect(() => {
    updateTabProgress('today', {
      totalTasks: tasks.length,
      tasksCompleted: tasks.filter(task => task.status === 'completed').length,
      completionPercentage: Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100),
      timeSpent: 120,
      streak: 5
    });
  }, []);

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
  
  // Enhanced daily metrics
  const dailyScore = Math.round(percentageCompleted * 0.8 + Math.random() * 20);
  const weeklyAverage = Math.round(dailyScore * 0.9 + Math.random() * 10);
  const currentStreak = 5;
  const bestStreak = 12;

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-amber-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">Easy</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">Medium</Badge>;
      case 'hard':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">Hard</Badge>;
      default:
        return null;
    }
  };

  const progressData = getTabProgress('today');

  // Premium gradient background based on mood
  const getMoodGradient = () => {
    if (!currentMood) return 'from-blue-50 via-white to-purple-50';
    
    switch (currentMood) {
      case MoodType.MOTIVATED:
        return 'from-emerald-50 via-white to-teal-50';
      case MoodType.FOCUSED:
        return 'from-blue-50 via-white to-indigo-50';
      case MoodType.TIRED:
        return 'from-orange-50 via-white to-amber-50';
      case MoodType.ANXIOUS:
        return 'from-red-50 via-white to-pink-50';
      case MoodType.STRESSED:
        return 'from-purple-50 via-white to-violet-50';
      default:
        return 'from-blue-50 via-white to-purple-50';
    }
  };

  // Today's plan content with enhanced premium layout
  const todaysPlanContent = (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8">
        {/* Premium Header with Dynamic Gradient */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${getMoodGradient()} p-8 shadow-lg border border-white/20`}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                  <Calendar className="h-8 w-8 mr-3 text-primary" />
                  Today's Study Plan
                </h1>
                <p className="text-lg text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-right"
              >
                <div className="text-4xl font-bold text-primary mb-1">{dailyScore}</div>
                <div className="text-sm text-gray-600">Today's Score</div>
              </motion.div>
            </div>

            {/* Enhanced Daily Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30"
              >
                <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{percentageCompleted}%</div>
                <div className="text-xs text-gray-600">Completed</div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30"
              >
                <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{Math.floor(totalTimeEstimate / 60)}h {totalTimeEstimate % 60}m</div>
                <div className="text-xs text-gray-600">Remaining</div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30"
              >
                <Flame className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{currentStreak}</div>
                <div className="text-xs text-gray-600">Day Streak</div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30"
              >
                <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{weeklyAverage}%</div>
                <div className="text-xs text-gray-600">Weekly Avg</div>
              </motion.div>
            </div>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-lg"></div>
        </motion.div>
        
        {/* Mood and Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                How are you feeling today?
              </h3>
              <MoodSelector currentMood={currentMood} onMoodSelect={setCurrentMood} />
              {currentMood && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-3 bg-blue-50 rounded-lg"
                >
                  <p className="text-sm text-blue-800">
                    Your plan has been optimized for your {currentMood.toLowerCase()} mood.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Progress</h3>
              <div className="flex justify-between items-center mb-3 text-sm text-muted-foreground">
                <span>Completed {completedTasks} of {totalTasks} tasks</span>
                <span>{percentageCompleted}%</span>
              </div>
              <Progress value={percentageCompleted} className="h-3 mb-4" />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Time Spent</p>
                  <p className="text-lg font-semibold">2h 15m</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Completed</p>
                  <p className="text-lg font-semibold">{completedTasks}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Streak</p>
                  <p className="text-lg font-semibold">{currentStreak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Enhanced Tasks Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Task Breakdown
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Total Estimated Time: <span className="font-semibold">{Math.floor(totalTimeEstimate / 60)}h {totalTimeEstimate % 60}m</span>
              </div>
            </div>
          </CardHeader>
          
          <div className="px-6">
            <div className="flex space-x-2 overflow-x-auto pb-4">
              {['all', 'pending', 'completed', 'concept', 'flashcard', 'exam'].map((tab) => (
                <Button
                  key={tab}
                  variant={currentTab === tab ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTab(tab)}
                  className="capitalize whitespace-nowrap"
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
                    className={`overflow-hidden transition-all border-l-4 cursor-pointer ${getPriorityColor(task.priority)} hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50/50`}
                    onClick={() => handleTaskCardClick(task)}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          {getTaskTypeIcon(task.type)}
                          <span className="font-medium text-sm">{task.subject}</span>
                        </div>
                        <div className="flex gap-2">
                          {task.difficulty && getDifficultyBadge(task.difficulty)}
                          {getTaskStatusBadge(task.status)}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-base mb-3 line-clamp-2">{task.title}</h3>
                      
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
                          <span>Completed {new Date(task.completedAt).toLocaleTimeString()}</span>
                        </div>
                      )}
                      
                      {task.smartTip && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-800 dark:text-blue-300">
                          <p className="flex items-start gap-2">
                            <Brain className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            {task.smartTip}
                          </p>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full"
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
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tasks found for this category</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Enhanced Sidebar with Progress and AI */}
      <div className="space-y-6">
        <TabProgressMeter 
          tabName="Today's Plan" 
          progressData={progressData}
        />
        <TabAIAssistant 
          tabName="Today's Plan"
          context="User is working on their daily study plan"
        />
      </div>
    </div>
  );

  return userProfile ? (
    <div className={`min-h-screen bg-gradient-to-br ${getMoodGradient()} dark:from-gray-900 dark:to-gray-800`}>
      <SharedPageLayout title="Today's Plan" subtitle="Your personalized daily study schedule" activeTab="today">
        {todaysPlanContent}
      </SharedPageLayout>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default TodaysPlanView;
