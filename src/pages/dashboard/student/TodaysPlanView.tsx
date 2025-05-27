
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  RotateCcw,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';

const TodaysPlanView = () => {
  const [selectedTab, setSelectedTab] = useState('today');
  const [completedTasks, setCompletedTasks] = useState(new Set<string>(['4', '8']));

  // Mock data for today's plan
  const todaysStats = {
    totalTasks: 12,
    completedTasks: 4,
    studyTime: 180, // minutes
    targetTime: 240, // minutes
    accuracy: 78
  };

  const allTasks = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      description: 'Understanding the three fundamental laws that govern motion',
      subject: 'Physics',
      type: 'concept',
      difficulty: 'medium',
      duration: 30,
      status: 'pending',
      dueTime: '10:00 AM',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      description: 'Key reaction mechanisms and synthesis pathways',
      subject: 'Chemistry',
      type: 'flashcard',
      difficulty: 'hard',
      duration: 25,
      status: 'pending',
      dueTime: '11:00 AM',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Biology Mock Test',
      description: 'Practice test for cell biology concepts',
      subject: 'Biology',
      type: 'exam',
      difficulty: 'medium',
      duration: 45,
      status: 'pending',
      dueTime: '2:00 PM',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Atomic Structure',
      description: 'Basic atomic theory and electron configuration',
      subject: 'Chemistry',
      type: 'concept',
      difficulty: 'medium',
      duration: 30,
      status: 'completed',
      completedAt: '9:30 AM',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Thermodynamics',
      description: 'Laws of thermodynamics and heat transfer',
      subject: 'Physics',
      type: 'concept',
      difficulty: 'hard',
      duration: 35,
      status: 'pending',
      dueTime: '4:00 PM',
      priority: 'medium'
    },
    {
      id: '6',
      title: 'Calculus Derivatives',
      description: 'Review derivative rules and applications',
      subject: 'Mathematics',
      type: 'flashcard',
      difficulty: 'medium',
      duration: 20,
      status: 'overdue',
      dueDate: 'Yesterday',
      priority: 'low'
    },
    {
      id: '7',
      title: 'Cell Biology',
      description: 'Cellular structures and functions',
      subject: 'Biology',
      type: 'concept',
      difficulty: 'easy',
      duration: 40,
      status: 'overdue',
      dueDate: '2 days ago',
      priority: 'medium'
    },
    {
      id: '8',
      title: 'English Vocabulary',
      description: 'Advanced vocabulary for competitive exams',
      subject: 'English',
      type: 'flashcard',
      difficulty: 'easy',
      duration: 15,
      status: 'completed',
      completedAt: 'Yesterday',
      priority: 'low'
    }
  ];

  const getFilteredTasks = (filter: string) => {
    switch (filter) {
      case 'today':
        return allTasks.filter(task => task.status === 'pending' && task.dueTime);
      case 'pending':
        return allTasks.filter(task => task.status === 'overdue');
      case 'completed':
        return allTasks.filter(task => task.status === 'completed');
      default:
        return allTasks;
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'flashcard':
        return <Brain className="h-5 w-5 text-purple-600" />;
      case 'exam':
        return <Zap className="h-5 w-5 text-green-600" />;
      default:
        return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const renderTaskCard = (task: any) => {
    const isCompleted = task.status === 'completed';
    const isOverdue = task.status === 'overdue';
    
    return (
      <Card 
        key={task.id} 
        className={`transition-all duration-300 cursor-pointer border-l-4 ${
          isCompleted
            ? 'bg-green-50 border-l-green-500 opacity-75' 
            : isOverdue
            ? 'bg-red-50 border-l-red-500 hover:shadow-md'
            : `hover:shadow-md ${getPriorityColor(task.priority)} border-l-blue-500`
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
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
                  <h4 className={`font-semibold text-lg ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {task.subject}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {task.duration} min
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      task.difficulty === 'hard' ? 'border-red-300 text-red-700' :
                      task.difficulty === 'medium' ? 'border-yellow-300 text-yellow-700' :
                      'border-green-300 text-green-700'
                    }`}
                  >
                    {task.difficulty}
                  </Badge>
                  {task.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs">
                      High Priority
                    </Badge>
                  )}
                  {(task.dueTime || task.completedAt || task.dueDate) && (
                    <span className="text-xs text-gray-500">
                      {task.dueTime || task.completedAt || task.dueDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {!isCompleted && (
              <Button 
                size="sm" 
                className="ml-4"
                variant={isOverdue ? "destructive" : "default"}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Starting ${task.type}: ${task.title}`);
                }}
              >
                <Play className="h-4 w-4 mr-1" />
                {isOverdue ? 'Catch Up' : 'Start'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const completionPercentage = (todaysStats.completedTasks / todaysStats.totalTasks) * 100;
  const timePercentage = (todaysStats.studyTime / todaysStats.targetTime) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10">
      <Helmet>
        <title>Today's Plan - PREPZR</title>
        <meta name="description" content="Your personalized daily study schedule" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Today's Study Plan
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Daily Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Daily Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{todaysStats.completedTasks}/{todaysStats.totalTasks}</div>
                  <div className="text-sm text-gray-600">Tasks Done</div>
                  <Progress value={completionPercentage} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{todaysStats.studyTime}m</div>
                  <div className="text-sm text-gray-600">Study Time</div>
                  <Progress value={timePercentage} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{todaysStats.accuracy}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{todaysStats.targetTime - todaysStats.studyTime}m</div>
                  <div className="text-sm text-gray-600">Time Left</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks Management Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="h-6 w-6 text-blue-600" />
                Task Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    All ({allTasks.length})
                  </TabsTrigger>
                  <TabsTrigger value="today" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Today ({getFilteredTasks('today').length})
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Pending ({getFilteredTasks('pending').length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Completed ({getFilteredTasks('completed').length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">All Tasks</h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {allTasks.length} total tasks
                    </Badge>
                  </div>
                  {allTasks.map((task) => renderTaskCard(task))}
                </TabsContent>

                <TabsContent value="today" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Today's Schedule</h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {getFilteredTasks('today').length} tasks scheduled
                    </Badge>
                  </div>
                  {getFilteredTasks('today').map((task) => renderTaskCard(task))}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-orange-700">Overdue Tasks</h3>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {getFilteredTasks('pending').length} tasks overdue
                    </Badge>
                  </div>
                  {getFilteredTasks('pending').length > 0 ? (
                    getFilteredTasks('pending').map((task) => renderTaskCard(task))
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
                      <p className="text-gray-600">No pending tasks. Great job staying on track!</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-green-700">Completed Tasks</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Star className="h-4 w-4 mr-1" />
                      {getFilteredTasks('completed').length} completed
                    </Badge>
                  </div>
                  {getFilteredTasks('completed').map((task) => renderTaskCard(task))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TodaysPlanView;
