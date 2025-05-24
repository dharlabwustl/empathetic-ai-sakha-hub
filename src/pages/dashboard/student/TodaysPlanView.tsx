
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, FileText, Brain, AlertTriangle, CheckCircle, Calendar, Target, TrendingUp } from 'lucide-react';
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

  // Get mood theme for styling
  const moodTheme = currentMood ? getMoodTheme(currentMood.toLowerCase()) : getMoodTheme('okay');

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

  // Today's plan content with enhanced header
  const todaysPlanContent = (
    <div className="space-y-6">
      {/* Beautiful Gradient Header with Mood-based Theming */}
      <motion.div 
        className={`relative overflow-hidden rounded-xl p-6 ${moodTheme.background} border-2 ${moodTheme.border}`}
        style={{ 
          background: `linear-gradient(135deg, ${moodTheme.backgroundColor}dd, ${moodTheme.backgroundColor}99)`
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className={`text-3xl font-bold ${moodTheme.text} mb-2 flex items-center`}>
                <Calendar className="h-8 w-8 mr-3" />
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
          </div>

          {/* Progress Metrics Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <motion.div 
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`text-2xl font-bold ${moodTheme.text}`}>{percentageCompleted}%</div>
              <div className={`text-sm ${moodTheme.accent}`}>Completion</div>
              <Progress value={percentageCompleted} className="h-2 mt-2" />
            </motion.div>

            <motion.div 
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`text-2xl font-bold ${moodTheme.text}`}>{totalTimeEstimate}</div>
              <div className={`text-sm ${moodTheme.accent}`}>Minutes Left</div>
              <Clock className={`h-4 w-4 mx-auto mt-1 ${moodTheme.accent}`} />
            </motion.div>

            <motion.div 
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`text-2xl font-bold ${moodTheme.text}`}>7</div>
              <div className={`text-sm ${moodTheme.accent}`}>Day Streak</div>
              <TrendingUp className={`h-4 w-4 mx-auto mt-1 ${moodTheme.accent}`} />
            </motion.div>

            <motion.div 
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`text-2xl font-bold ${moodTheme.text}`}>72%</div>
              <div className={`text-sm ${moodTheme.accent}`}>Exam Ready</div>
              <Target className={`h-4 w-4 mx-auto mt-1 ${moodTheme.accent}`} />
            </motion.div>
          </div>

          {/* Mood Selector */}
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4">
            <h3 className={`text-lg font-medium mb-4 ${moodTheme.text}`}>How are you feeling today?</h3>
            <MoodSelector currentMood={currentMood} onMoodSelect={handleMoodChange} />
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 -translate-x-10"></div>
      </motion.div>
      
      {/* Enhanced Task Cards */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Task Breakdown
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Total Estimated Time: <span className="font-semibold">{totalTimeEstimate} min</span>
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
                className="capitalize min-w-fit"
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
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
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
                    
                    <h3 className="font-semibold mt-3 text-gray-900 dark:text-gray-100">{task.title}</h3>
                    
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
      
      {/* Smart Suggestions with Enhanced Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Smart Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentMood === MoodType.STRESSED ? (
                <motion.div 
                  className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-violet-800 dark:text-violet-300 mb-2">You seem stressed today</h3>
                  <p className="text-sm text-violet-700 dark:text-violet-400 mb-2">
                    Try shorter study sessions of 15-20 minutes with more frequent breaks.
                  </p>
                  <Button variant="outline" className="text-xs h-7 border-violet-300 text-violet-800">
                    Adjust My Schedule
                  </Button>
                </motion.div>
              ) : currentMood === MoodType.TIRED ? (
                <motion.div 
                  className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Energy management for tired days</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mb-2">
                    Focus on review tasks instead of new concepts. Take a short walk before studying.
                  </p>
                  <Button variant="outline" className="text-xs h-7 border-amber-300 text-amber-800">
                    Show Review Tasks
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-medium text-emerald-800 dark:text-emerald-300 mb-2">
                    {currentMood ? `Great to see you're feeling ${currentMood}!` : 'Optimize your study session'}
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                    Your calculus scores have improved! Try tackling the advanced practice exam.
                  </p>
                  <Button variant="outline" className="text-xs h-7 border-emerald-300 text-emerald-800">
                    Start Advanced Exam
                  </Button>
                </motion.div>
              )}

              <motion.div 
                className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Subject focus recommendation</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
                  Physics concepts need attention based on your recent quiz performance.
                </p>
                <Button variant="outline" className="text-xs h-7 border-blue-300 text-blue-800">
                  View Physics Resources
                </Button>
              </motion.div>
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
