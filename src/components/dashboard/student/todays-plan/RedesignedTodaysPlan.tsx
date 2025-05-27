
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Clock, 
  Trophy, 
  Flame, 
  Star, 
  CheckCircle2, 
  BookOpen,
  Brain,
  FileText,
  Calendar,
  Award,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'practice' | 'review';
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  points: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  status: 'today' | 'pending' | 'completed';
}

const RedesignedTodaysPlan = () => {
  const [statusFilter, setStatusFilter] = useState<'today' | 'pending' | 'completed'>('today');
  const [streak, setStreak] = useState(5);
  const [totalPoints, setTotalPoints] = useState(1250);
  const [level, setLevel] = useState(3);
  const [completedToday, setCompletedToday] = useState(3);

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      type: 'concept',
      subject: 'Physics',
      difficulty: 'Medium',
      estimatedTime: 30,
      points: 150,
      completed: true,
      priority: 'high',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Chemical Bonding Flashcards',
      type: 'flashcard',
      subject: 'Chemistry',
      difficulty: 'Easy',
      estimatedTime: 20,
      points: 100,
      completed: false,
      priority: 'medium',
      status: 'today'
    },
    {
      id: '3',
      title: 'Algebra Practice Problems',
      type: 'practice',
      subject: 'Mathematics',
      difficulty: 'Hard',
      estimatedTime: 45,
      points: 200,
      completed: false,
      priority: 'high',
      status: 'today'
    },
    {
      id: '4',
      title: 'Biology Quiz - Cell Division',
      type: 'practice',
      subject: 'Biology',
      difficulty: 'Medium',
      estimatedTime: 25,
      points: 125,
      completed: false,
      priority: 'medium',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Thermodynamics Review',
      type: 'review',
      subject: 'Physics',
      difficulty: 'Easy',
      estimatedTime: 15,
      points: 75,
      completed: true,
      priority: 'low',
      status: 'completed'
    }
  ];

  const filteredTasks = tasks.filter(task => {
    if (statusFilter === 'completed') return task.completed;
    return task.status === statusFilter;
  });

  const taskCounts = {
    today: tasks.filter(task => task.status === 'today').length,
    pending: tasks.filter(task => task.status === 'pending').length,
    completed: tasks.filter(task => task.completed).length
  };

  const totalTodayTasks = tasks.filter(task => task.status === 'today').length;
  const completionPercentage = (completedToday / totalTodayTasks) * 100;
  const experienceToNextLevel = 75;
  
  const handleCompleteTask = (taskId: string) => {
    // In a real app, this would update the task status in your backend
    console.log(`Task ${taskId} completed`);
    setCompletedToday(prev => prev + 1);
    setTotalPoints(prev => prev + 150);
    setStreak(prev => prev + 1);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return BookOpen;
      case 'flashcard': return Brain;
      case 'practice': case 'review': return FileText;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'concept': return 'text-blue-600 bg-blue-100';
      case 'flashcard': return 'text-purple-600 bg-purple-100';
      case 'practice': return 'text-orange-600 bg-orange-100';
      case 'review': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'; 
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Today's Study Plan
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your personalized daily study tasks designed for optimal learning
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Streaks Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Study Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-orange-500">{streak} days</div>
                  <div className="grid grid-cols-5 gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-2 w-6 rounded-full ${i < (streak % 5) ? 'bg-orange-500' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Keep your streak going! Study daily for better retention.
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl font-bold text-purple-500">{completedToday}/{totalTodayTasks}</div>
                  <div className="text-lg text-gray-600">{Math.round(completionPercentage)}%</div>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                <div className="mt-3 text-sm text-gray-600">
                  Tasks completed today. Keep up the good work!
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Points & Level Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-green-500" />
                  Points & Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-green-500">{totalPoints}</div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">Level {level}</span>
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Next level</span>
                    <span>{experienceToNextLevel}% remaining</span>
                  </div>
                  <Progress value={100 - experienceToNextLevel} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Task Status Tabs with Count Indicators */}
        <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)} className="mb-6">
          <TabsList>
            <TabsTrigger value="today" className="flex items-center gap-2">
              Today
              <Badge variant="secondary" className="ml-1 text-xs">
                {taskCounts.today}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              Pending
              <Badge variant="secondary" className="ml-1 text-xs">
                {taskCounts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              Completed
              <Badge variant="secondary" className="ml-1 text-xs">
                {taskCounts.completed}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tasks List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => {
                const TypeIcon = getTypeIcon(task.type);
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`hover:shadow-md transition-all border-l-4 ${
                      task.completed ? 'border-l-green-500 bg-green-50/30' : 'border-l-blue-500'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-full ${getTypeColor(task.type)}`}>
                                <TypeIcon className="h-5 w-5" />
                              </div>
                              <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500' : ''}`}>
                                {task.title}
                              </h3>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline" className={getTypeColor(task.type).replace('bg-', 'bg-opacity-50 border-')}>
                                {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                              </Badge>
                              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                                {task.subject}
                              </Badge>
                              <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                                {task.difficulty}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{task.estimatedTime} min</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>{task.points} points</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Due today</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-4">
                            {task.completed ? (
                              <div className="flex items-center">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                                <span className="text-green-500 font-medium">Completed</span>
                              </div>
                            ) : (
                              <Button 
                                onClick={() => handleCompleteTask(task.id)} 
                                className="gap-2"
                              >
                                <Zap className="h-4 w-4" />
                                Complete Task
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No {statusFilter} tasks found
                </h3>
                <p className="text-gray-500 mb-4">
                  {statusFilter === 'completed' 
                    ? 'You haven\'t completed any tasks yet. Get started with your daily plan!' 
                    : statusFilter === 'pending'
                    ? 'No pending tasks. You\'re all caught up!'
                    : 'No tasks for today. Take a well-deserved break!'}
                </p>
                {statusFilter !== 'today' && (
                  <Button onClick={() => setStatusFilter('today')}>
                    View Today's Tasks
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RedesignedTodaysPlan;
