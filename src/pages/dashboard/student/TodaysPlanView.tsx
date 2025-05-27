
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  Brain, 
  Zap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Star,
  Trophy,
  Flame,
  Award,
  Lightbulb,
  Play,
  RotateCcw,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

const TodaysPlanView = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [completedTasks, setCompletedTasks] = useState(new Set(['2', '5']));

  // Mock data for today's plan
  const todaysStats = {
    totalTasks: 12,
    completedTasks: 2,
    studyTime: 180, // minutes
    targetTime: 240, // minutes
    accuracy: 78,
    streak: 7
  };

  const allTasks = [
    {
      id: '1',
      title: "Newton's Laws of Motion",
      subject: 'Physics',
      type: 'concept',
      difficulty: 'medium',
      timeEstimate: 30,
      priority: 'high',
      status: 'pending',
      dueTime: '10:00 AM'
    },
    {
      id: '2',
      title: "Chemical Bonds Flashcards",
      subject: 'Chemistry', 
      type: 'flashcard',
      difficulty: 'easy',
      timeEstimate: 20,
      priority: 'medium',
      status: 'completed',
      completedAt: '9:30 AM'
    },
    {
      id: '3',
      title: "Algebra Practice Problems",
      subject: 'Mathematics',
      type: 'quiz',
      difficulty: 'hard',
      timeEstimate: 45,
      priority: 'high',
      status: 'pending',
      dueTime: '2:00 PM'
    },
    {
      id: '4',
      title: "Biology Cell Structure",
      subject: 'Biology',
      type: 'concept',
      difficulty: 'medium',
      timeEstimate: 25,
      priority: 'medium',
      status: 'overdue',
      dueDate: 'Yesterday'
    },
    {
      id: '5',
      title: "English Vocabulary",
      subject: 'English',
      type: 'flashcard',
      difficulty: 'easy',
      timeEstimate: 15,
      priority: 'low',
      status: 'completed',
      completedAt: 'Yesterday'
    },
    {
      id: '6',
      title: "Physics Mock Test",
      subject: 'Physics',
      type: 'exam',
      difficulty: 'hard',
      timeEstimate: 60,
      priority: 'high',
      status: 'pending',
      dueTime: '4:00 PM'
    }
  ];

  const dailySuggestions = [
    {
      id: 'sg1',
      title: 'Focus on High Priority Tasks',
      description: 'You have 3 high-priority tasks pending. Start with Newton\'s Laws to build momentum.',
      type: 'priority',
      icon: <Target className="h-4 w-4" />,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'sg2', 
      title: 'Quick Review Session',
      description: 'Review completed flashcards from yesterday to reinforce memory.',
      type: 'review',
      icon: <Brain className="h-4 w-4" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'sg3',
      title: 'Catch Up on Overdue',
      description: 'Complete Biology Cell Structure to stay on track with your study plan.',
      type: 'urgent',
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  // Filter tasks by status
  const todayTasks = allTasks.filter(task => task.status === 'pending');
  const pendingTasks = allTasks.filter(task => task.status === 'overdue');
  const completedTasksList = allTasks.filter(task => task.status === 'completed');

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'flashcard': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'quiz': return <FileText className="h-5 w-5 text-green-600" />;
      case 'exam': return <Trophy className="h-5 w-5 text-orange-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 dark:bg-red-900/10';
      case 'medium': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10';
      case 'low': return 'border-green-200 bg-green-50 dark:bg-green-900/10';
      default: return 'border-gray-200 bg-gray-50 dark:bg-gray-900/10';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-700 border-green-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      hard: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[difficulty] || colors.medium;
  };

  const completionPercentage = (todaysStats.completedTasks / todaysStats.totalTasks) * 100;
  const timePercentage = (todaysStats.studyTime / todaysStats.targetTime) * 100;

  const renderTaskCard = (task: any, index: number) => {
    const isCompleted = task.status === 'completed';
    const isOverdue = task.status === 'overdue';
    
    return (
      <motion.div
        key={task.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className={`group hover:shadow-lg transition-all duration-300 border-2 ${
          isCompleted ? 'bg-green-50 border-green-200 opacity-75' :
          isOverdue ? 'bg-red-50 border-red-200' :
          getPriorityColor(task.priority)
        }`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1">
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : isOverdue ? (
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  ) : (
                    getTaskIcon(task.type)
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className={`font-semibold text-lg ${
                      isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.title}
                    </h4>
                    <Badge variant="outline" className="text-xs font-medium">
                      {task.subject}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span>{task.timeEstimate} min</span>
                    </div>
                    
                    <Badge className={getDifficultyBadge(task.difficulty)}>
                      {task.difficulty}
                    </Badge>
                    
                    {task.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">
                        High Priority
                      </Badge>
                    )}
                    
                    {(task.dueTime || task.completedAt || task.dueDate) && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {task.dueTime || task.completedAt || task.dueDate}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize text-xs">
                      {task.type}
                    </Badge>
                    {task.status === 'overdue' && (
                      <Badge variant="destructive" className="text-xs animate-pulse">
                        Overdue
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {!isCompleted && (
                <Button 
                  size="sm" 
                  className="ml-4 group-hover:scale-105 transition-transform duration-200"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10">
      <Helmet>
        <title>Today's Plan - PREPZR</title>
        <meta name="description" content="Your personalized daily study schedule" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Premium Header with Gamification */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Calendar className="h-10 w-10" />
                  Today's Study Plan
                </h1>
                <p className="text-blue-100 text-xl">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="h-8 w-8 text-orange-300" />
                  <span className="text-3xl font-bold">{todaysStats.streak}</span>
                  <span className="text-lg">Day Streak</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-base px-4 py-2">
                  <Trophy className="h-5 w-5 mr-2" />
                  {Math.floor(todaysStats.targetTime / 60)}h {todaysStats.targetTime % 60}m planned
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{todaysStats.completedTasks}/{todaysStats.totalTasks}</div>
                <div className="text-blue-100">Tasks Done</div>
                <Progress value={completionPercentage} className="mt-2 h-3 bg-white/20" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{todaysStats.studyTime}m</div>
                <div className="text-blue-100">Study Time</div>
                <Progress value={timePercentage} className="mt-2 h-3 bg-white/20" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{todaysStats.accuracy}%</div>
                <div className="text-blue-100">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{todaysStats.targetTime - todaysStats.studyTime}m</div>
                <div className="text-blue-100">Time Left</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Smart Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-xl border-2 border-yellow-200">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
                  AI Smart Suggestions
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dailySuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-gradient-to-r ${suggestion.color} rounded-full text-white`}>
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{suggestion.description}</p>
                        <Button variant="outline" size="sm" className="mt-3 w-full">
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks Management with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Star className="h-6 w-6 text-yellow-500" />
                Task Management Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                  <TabsTrigger value="all" className="flex items-center gap-2 rounded-lg">
                    <Target className="h-4 w-4" />
                    All ({allTasks.length})
                  </TabsTrigger>
                  <TabsTrigger value="today" className="flex items-center gap-2 rounded-lg">
                    <Calendar className="h-4 w-4" />
                    Today ({todayTasks.length})
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="flex items-center gap-2 rounded-lg">
                    <RotateCcw className="h-4 w-4" />
                    Pending ({pendingTasks.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center gap-2 rounded-lg">
                    <CheckCircle className="h-4 w-4" />
                    Completed ({completedTasksList.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {allTasks.map((task, index) => renderTaskCard(task, index))}
                </TabsContent>

                <TabsContent value="today" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Today's Schedule</h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {todayTasks.length} tasks scheduled
                    </Badge>
                  </div>
                  {todayTasks.map((task, index) => renderTaskCard(task, index))}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-orange-700">Overdue Tasks</h3>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      {pendingTasks.length} tasks overdue
                    </Badge>
                  </div>
                  {pendingTasks.length > 0 ? (
                    pendingTasks.map((task, index) => renderTaskCard(task, index))
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">All Caught Up!</h3>
                      <p className="text-gray-600 dark:text-gray-400">No overdue tasks. Great job staying on track!</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-green-700">Completed Tasks</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Award className="h-4 w-4 mr-1" />
                      {completedTasksList.length} completed
                    </Badge>
                  </div>
                  {completedTasksList.map((task, index) => renderTaskCard(task, index))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl border-0">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold">Daily Progress</div>
                <div className="text-sm text-green-100">{completionPercentage.toFixed(0)}% Complete</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TodaysPlanView;
