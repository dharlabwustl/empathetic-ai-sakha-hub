
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  AlertCircle,
  Star,
  Play,
  ChevronRight,
  Zap,
  Trophy,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TodayTask {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'practice' | 'revision';
  duration: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  progress: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const RedesignedTodaysPlan: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Mock data for today's plan
  const todaysTasks: TodayTask[] = [
    {
      id: '1',
      title: "Newton's Laws of Motion",
      subject: 'Physics',
      type: 'concept',
      duration: 25,
      priority: 'high',
      completed: false,
      progress: 0,
      difficulty: 'medium'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      type: 'flashcard',
      duration: 20,
      priority: 'high',
      completed: true,
      progress: 100,
      difficulty: 'hard'
    },
    {
      id: '3',
      title: 'Cell Biology Practice Quiz',
      subject: 'Biology',
      type: 'practice',
      duration: 30,
      priority: 'medium',
      completed: false,
      progress: 45,
      difficulty: 'medium'
    },
    {
      id: '4',
      title: 'Integration Techniques',
      subject: 'Mathematics',
      type: 'concept',
      duration: 35,
      priority: 'medium',
      completed: false,
      progress: 20,
      difficulty: 'hard'
    },
    {
      id: '5',
      title: 'Periodic Table Elements',
      subject: 'Chemistry',
      type: 'revision',
      duration: 15,
      priority: 'low',
      completed: false,
      progress: 0,
      difficulty: 'easy'
    }
  ];

  const totalTasks = todaysTasks.length;
  const completedTasksCount = todaysTasks.filter(task => task.completed).length;
  const totalDuration = todaysTasks.reduce((sum, task) => sum + task.duration, 0);
  const completedDuration = todaysTasks.filter(task => task.completed).reduce((sum, task) => sum + task.duration, 0);
  const overallProgress = Math.round((completedTasksCount / totalTasks) * 100);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'revision': return <Star className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-amber-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleTaskAction = (taskId: string, action: 'start' | 'continue' | 'review') => {
    console.log(`${action} task:`, taskId);
    // Navigate to appropriate task
  };

  return (
    <div className="space-y-6">
      {/* Header with Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white">Today's Study Plan</CardTitle>
                    <p className="text-blue-100 mt-2">Your personalized NEET preparation schedule</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{overallProgress}%</div>
                    <p className="text-blue-100 text-sm">Complete</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={overallProgress} className="h-3 bg-blue-400" />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">{completedTasksCount}/{totalTasks}</div>
                      <p className="text-blue-100 text-sm">Tasks Done</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{completedDuration}min</div>
                      <p className="text-blue-100 text-sm">Time Spent</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{totalDuration - completedDuration}min</div>
                      <p className="text-blue-100 text-sm">Remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">3</p>
                  <p className="text-xs text-green-600">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">85%</p>
                  <p className="text-xs text-blue-600">Efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Today's Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            Today's Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  task.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-white hover:border-blue-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      task.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        getTypeIcon(task.type)
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline" className="text-xs">
                          {task.subject}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.duration} min
                        </span>
                        <span className={`font-medium ${getDifficultyColor(task.difficulty)}`}>
                          {task.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {!task.completed && task.progress > 0 && (
                      <div className="text-right">
                        <div className="text-sm font-medium">{task.progress}%</div>
                        <Progress value={task.progress} className="w-16 h-2" />
                      </div>
                    )}
                    
                    {task.completed ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTaskAction(task.id, 'review')}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    ) : task.progress > 0 ? (
                      <Button
                        onClick={() => handleTaskAction(task.id, 'continue')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Continue
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleTaskAction(task.id, 'start')}
                        variant="outline"
                        className="border-blue-200 hover:bg-blue-50"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-100">
              <AlertCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Focus on Physics today</p>
                <p className="text-xs text-gray-600">You've missed 2 Physics sessions this week. Newton's Laws needs attention.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-100">
              <Star className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Great progress in Biology!</p>
                <p className="text-xs text-gray-600">You're 15% ahead of schedule. Consider tackling advanced topics.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedesignedTodaysPlan;
