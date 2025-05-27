
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
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Mock data
  const mockTasks: TaskItem[] = [
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
    }
  ];

  const todayTasks = mockTasks.filter(task => task.status === 'pending' || task.status === 'in-progress');
  const pendingTasks = mockTasks.filter(task => task.status === 'pending');
  const completedTasksList = mockTasks.filter(task => task.status === 'completed');

  const totalPoints = completedTasksList.reduce((sum, task) => sum + task.points, 0);
  const todayProgress = (completedTasksList.length / mockTasks.length) * 100;

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => new Set([...prev, taskId]));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
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
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
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
    >
      <Card className={`border-l-4 ${getPriorityColor(task.priority)} hover:shadow-lg transition-all duration-200`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                {getTypeIcon(task.type)}
              </div>
              <div>
                <h3 className="font-medium text-sm">{task.title}</h3>
                <p className="text-xs text-gray-500">{task.subject}</p>
              </div>
            </div>
            {getStatusBadge(task.status)}
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{task.duration} min</span>
              </div>
              <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                {task.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-orange-600">
              <Star className="h-3 w-3" />
              <span>{task.points} pts</span>
            </div>
          </div>

          {task.status === 'pending' && (
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => handleTaskComplete(task.id)}
            >
              Start Task
            </Button>
          )}
          
          {task.status === 'completed' && (
            <div className="flex items-center justify-center text-green-600 text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </div>
          )}
          
          {task.status === 'in-progress' && (
            <Button size="sm" variant="outline" className="w-full">
              Continue
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Today's Progress</p>
                <p className="text-2xl font-bold">{Math.round(todayProgress)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Points Earned</p>
                <p className="text-2xl font-bold">{totalPoints}</p>
              </div>
              <Award className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Tasks Today</p>
                <p className="text-2xl font-bold">{todayTasks.length}</p>
              </div>
              <Target className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Study Streak</p>
                <p className="text-2xl font-bold">7 days</p>
              </div>
              <Zap className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Daily Progress</span>
            <span>{Math.round(todayProgress)}% Complete</span>
          </div>
          <Progress value={todayProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Today ({todayTasks.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({pendingTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed ({completedTasksList.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today's Plan</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {todayTasks.length} tasks scheduled
            </Badge>
          </div>
          
          {todayTasks.length > 0 ? (
            <div className="grid gap-4">
              {todayTasks.map(renderTaskCard)}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-medium mb-2">All tasks completed!</h3>
                <p className="text-gray-600">Great job! You've finished all your tasks for today.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pending Tasks</h2>
            <Badge variant="outline" className="bg-orange-50 text-orange-700">
              {pendingTasks.length} pending
            </Badge>
          </div>
          
          <div className="grid gap-4">
            {pendingTasks.map(renderTaskCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Completed Tasks</h2>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {completedTasksList.length} completed
            </Badge>
          </div>
          
          <div className="grid gap-4">
            {completedTasksList.map(renderTaskCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedTodaysPlan;
