
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, FileText, Brain, AlertTriangle, CheckCircle, Calendar, Target, TrendingUp, Star, Zap } from 'lucide-react';
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

  // Load mood from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
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
  
  const totalTimeEstimate = tasks.reduce((total, task) => {
    if (task.status !== 'completed') {
      return total + task.timeEstimate;
    }
    return total;
  }, 0);
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const percentageCompleted = Math.round((completedTasks / totalTasks) * 100);

  const handleTaskAction = (task: any) => {
    console.log("TodaysPlanView - Task action clicked:", task.id, task.type);
    
    if (task.status === 'completed') {
      switch (task.type) {
        case 'concept':
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

  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;

  const todaysPlanContent = (
    <div className="min-h-screen">
      {/* Beautiful Gradient Header with Mood-based Theming */}
      <motion.div 
        className={`relative overflow-hidden rounded-3xl mb-8 ${
          moodTheme ? moodTheme.background : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}
        style={moodTheme ? { backgroundColor: moodTheme.backgroundColor } : {}}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div className="mb-4 lg:mb-0">
              <motion.div 
                className="flex items-center mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Calendar className="h-8 w-8 mr-3 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Today's Study Plan</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </motion.div>
              
              {currentMood && (
                <motion.div 
                  className="flex items-center mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Current mood:</span>
                  <Badge className={`${moodTheme?.text || 'text-blue-700'} ${moodTheme?.background || 'bg-blue-50'} capitalize`}>
                    {currentMood.toLowerCase()}
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Progress Metrics */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">{percentageCompleted}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">{totalTimeEstimate}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Min Left</div>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">5</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 text-center">
                <Star className="h-6 w-6 mx-auto mb-2 text-amber-600" />
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">72%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Readiness</div>
              </div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Today's Progress</span>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-50">{completedTasks}/{totalTasks} tasks</span>
            </div>
            <Progress value={percentageCompleted} className="h-3 bg-white/50" />
          </motion.div>
        </div>
      </motion.div>

      {/* Mood and Enhancement Section */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-purple-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">How are you feeling today?</h3>
            </div>
            <MoodSelector currentMood={currentMood} onMoodSelect={handleMoodChange} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Performance Overview</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Study Efficiency</span>
                <span className="text-lg font-bold text-green-600">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Focus Score</span>
                <span className="text-lg font-bold text-blue-600">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Retention Rate</span>
                <span className="text-lg font-bold text-purple-600">78%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Enhanced Tasks Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="overflow-hidden border-0 shadow-xl bg-white dark:bg-gray-800">
          <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Calendar className="h-6 w-6" />
                Task Breakdown
              </CardTitle>
              <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                Total: <span className="font-bold">{totalTimeEstimate} min</span>
              </div>
            </div>
          </CardHeader>
          
          <div className="p-6">
            <div className="flex space-x-2 overflow-x-auto pb-4 mb-6">
              {['all', 'pending', 'completed', 'concept', 'flashcard', 'exam'].map((tab) => (
                <Button
                  key={tab}
                  variant={currentTab === tab ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTab(tab)}
                  className={`capitalize whitespace-nowrap ${
                    currentTab === tab 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Card 
                    className={`overflow-hidden transition-all duration-300 border-l-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${
                      task.priority === 'high' ? "border-l-red-500 hover:border-l-red-600" : 
                      task.priority === 'medium' ? "border-l-amber-500 hover:border-l-amber-600" : 
                      "border-l-blue-500 hover:border-l-blue-600"
                    }`}
                    onClick={() => handleTaskCardClick(task)}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          {getTaskTypeIcon(task.type)}
                          <span className="font-medium text-gray-700 dark:text-gray-300">{task.subject}</span>
                        </div>
                        {getTaskStatusBadge(task.status)}
                      </div>
                      
                      <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-50">{task.title}</h3>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
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
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <p className="text-xs text-blue-800 dark:text-blue-300">{task.smartTip}</p>
                        </div>
                      )}
                      
                      <Button 
                        className={`w-full ${
                          task.status === 'completed' 
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                        }`}
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
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-2">
                  <BookOpen className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">No tasks found for this category</p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
      
      {/* Smart Suggestions with Enhanced Design */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="overflow-hidden border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {currentMood === MoodType.STRESSED ? (
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-200 dark:border-violet-800/50">
                  <h3 className="font-bold text-violet-800 dark:text-violet-300 mb-2">You seem stressed today</h3>
                  <p className="text-sm text-violet-700 dark:text-violet-400 mb-3">
                    Try shorter study sessions of 15-20 minutes with more frequent breaks.
                  </p>
                  <Button variant="outline" className="border-violet-300 text-violet-800 hover:bg-violet-50">
                    Adjust My Schedule
                  </Button>
                </div>
              ) : currentMood === MoodType.TIRED ? (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800/50">
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Energy management for tired days</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                    Focus on review tasks instead of new concepts. Take a short walk before studying.
                  </p>
                  <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-50">
                    Show Review Tasks
                  </Button>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                    {currentMood ? `Great to see you're feeling ${currentMood}!` : 'Optimize your study session'}
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-3">
                    Your calculus scores have improved! Try tackling the advanced practice exam.
                  </p>
                  <Button variant="outline" className="border-emerald-300 text-emerald-800 hover:bg-emerald-50">
                    Start Advanced Exam
                  </Button>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800/50">
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Subject focus recommendation</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                  Physics concepts need attention based on your recent quiz performance.
                </p>
                <Button variant="outline" className="border-blue-300 text-blue-800 hover:bg-blue-50">
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
