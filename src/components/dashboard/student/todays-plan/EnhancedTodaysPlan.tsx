
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  CheckCircle, 
  Star, 
  Target, 
  Calendar,
  TrendingUp,
  Award,
  Zap,
  Play,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskItem {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'practice';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'pending' | 'completed' | 'in-progress';
  priority: 'high' | 'medium' | 'low';
  points: number;
}

const EnhancedTodaysPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set(['2', '5']));

  // Mock data with realistic tasks
  const allTasks: TaskItem[] = [
    {
      id: '1',
      title: 'Laws of Motion - Newton\'s Laws',
      subject: 'Physics',
      type: 'concept',
      duration: 45,
      difficulty: 'medium',
      status: 'pending',
      priority: 'high',
      points: 25
    },
    {
      id: '2',
      title: 'Chemical Bonding Flashcards',
      subject: 'Chemistry',
      type: 'flashcard',
      duration: 20,
      difficulty: 'easy',
      status: 'completed',
      priority: 'medium',
      points: 15
    },
    {
      id: '3',
      title: 'NEET Biology Mock Test',
      subject: 'Biology',
      type: 'practice',
      duration: 60,
      difficulty: 'hard',
      status: 'in-progress',
      priority: 'high',
      points: 40
    },
    {
      id: '4',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      type: 'concept',
      duration: 35,
      difficulty: 'hard',
      status: 'pending',
      priority: 'medium',
      points: 30
    },
    {
      id: '5',
      title: 'Cell Division Review',
      subject: 'Biology',
      type: 'flashcard',
      duration: 25,
      difficulty: 'medium',
      status: 'completed',
      priority: 'low',
      points: 20
    },
    {
      id: '6',
      title: 'Thermodynamics Concepts',
      subject: 'Physics',
      type: 'concept',
      duration: 40,
      difficulty: 'medium',
      status: 'pending',
      priority: 'medium',
      points: 28
    }
  ];

  // Filter tasks based on status
  const todayTasks = allTasks.filter(task => task.status === 'pending' || task.status === 'in-progress');
  const pendingTasks = allTasks.filter(task => task.status === 'pending');
  const completedTasksList = allTasks.filter(task => task.status === 'completed');

  const totalPoints = completedTasksList.reduce((sum, task) => sum + task.points, 0);
  const todayProgress = (completedTasksList.length / allTasks.length) * 100;
  const studyStreak = 7;

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => new Set([...prev, taskId]));
    // Update task status
    const taskIndex = allTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      allTasks[taskIndex].status = 'completed';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'flashcard': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'practice': return <FileText className="h-5 w-5 text-green-600" />;
      default: return <BookOpen className="h-5 w-5 text-gray-600" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const renderTaskCard = (task: TaskItem) => (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <Card className={`border-l-4 ${getPriorityColor(task.priority)} hover:shadow-lg transition-all duration-300 group`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                {getTypeIcon(task.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{task.title}</h3>
                <p className="text-gray-600 text-sm">{task.subject}</p>
                <div className="flex items-center gap-1 mt-1">
                  {task.type === 'concept' && <span className="text-xs text-blue-600">Concept Learning</span>}
                  {task.type === 'flashcard' && <span className="text-xs text-purple-600">Memory Practice</span>}
                  {task.type === 'practice' && <span className="text-xs text-green-600">Exam Practice</span>}
                </div>
              </div>
            </div>
            {getStatusBadge(task.status)}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{task.duration} min</span>
              </div>
              <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                {task.difficulty}
              </Badge>
              {task.priority === 'high' && (
                <Badge variant="destructive" className="text-xs">
                  High Priority
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-orange-600">
              <Star className="h-4 w-4" />
              <span>{task.points} pts</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            {task.status === 'pending' && (
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
                onClick={() => handleTaskComplete(task.id)}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Task
              </Button>
            )}
            
            {task.status === 'completed' && (
              <div className="flex items-center justify-center text-green-600 font-medium px-4 py-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </div>
            )}
            
            {task.status === 'in-progress' && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Continue
                </Button>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleTaskComplete(task.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const getTabCounts = () => ({
    today: todayTasks.length,
    pending: pendingTasks.length,
    completed: completedTasksList.length
  });

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Today's Progress</p>
                  <p className="text-3xl font-bold">{Math.round(todayProgress)}%</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <TrendingUp className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${todayProgress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Points Earned</p>
                  <p className="text-3xl font-bold">{totalPoints}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Award className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Tasks Today</p>
                  <p className="text-3xl font-bold">{todayTasks.length}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Target className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Study Streak</p>
                  <p className="text-3xl font-bold">{studyStreak}</p>
                  <p className="text-xs opacity-75">days</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Zap className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Progress Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center text-sm mb-3">
              <span className="font-medium text-gray-700">Daily Progress</span>
              <span className="font-semibold text-blue-700">{Math.round(todayProgress)}% Complete</span>
            </div>
            <Progress value={todayProgress} className="h-4 mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{completedTasksList.length} completed</span>
              <span>{allTasks.length} total tasks</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger 
              value="today" 
              className="flex items-center gap-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              <Calendar className="h-4 w-4" />
              <span>Today</span>
              <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">
                {tabCounts.today}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="flex items-center gap-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              <Clock className="h-4 w-4" />
              <span>Pending</span>
              <Badge variant="secondary" className="ml-1 bg-yellow-100 text-yellow-700">
                {tabCounts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="flex items-center gap-3 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
              <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">
                {tabCounts.completed}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Today's Study Plan</h2>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 px-3 py-1">
                {todayTasks.length} tasks scheduled
              </Badge>
            </div>
            
            <AnimatePresence>
              {todayTasks.length > 0 ? (
                <div className="space-y-4">
                  {todayTasks.map(renderTaskCard)}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <CardContent className="p-12 text-center">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                      <h3 className="text-xl font-semibold mb-2 text-green-800">All tasks completed!</h3>
                      <p className="text-green-600">Great job! You've finished all your tasks for today.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="pending" className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Pending Tasks</h2>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 px-3 py-1">
                {pendingTasks.length} pending
              </Badge>
            </div>
            
            <div className="space-y-4">
              {pendingTasks.map(renderTaskCard)}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Completed Tasks</h2>
              <Badge variant="outline" className="bg-green-50 text-green-700 px-3 py-1">
                {completedTasksList.length} completed
              </Badge>
            </div>
            
            <div className="space-y-4">
              {completedTasksList.map(renderTaskCard)}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default EnhancedTodaysPlan;
