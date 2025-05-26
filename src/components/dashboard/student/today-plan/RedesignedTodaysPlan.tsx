
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  Brain, 
  FileText, 
  CheckCircle,
  PlayCircle,
  Pause,
  MoreVertical,
  Zap,
  Award,
  TrendingUp,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'practice-exam';
  duration: number;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface RedesignedTodaysPlanProps {
  userName?: string;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ userName = "Student" }) => {
  const navigate = useNavigate();
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Electromagnetic Induction',
      subject: 'Physics',
      type: 'concept',
      duration: 45,
      status: 'completed',
      priority: 'high',
      difficulty: 'medium'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      type: 'flashcard',
      duration: 30,
      status: 'in-progress',
      priority: 'high',
      difficulty: 'hard'
    },
    {
      id: '3',
      title: 'Cell Biology Mock Test',
      subject: 'Biology',
      type: 'practice-exam',
      duration: 60,
      status: 'pending',
      priority: 'medium',
      difficulty: 'medium'
    },
    {
      id: '4',
      title: 'Calculus Practice Problems',
      subject: 'Mathematics',
      type: 'concept',
      duration: 40,
      status: 'pending',
      priority: 'medium',
      difficulty: 'easy'
    }
  ];

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice-exam': return <FileText className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <PlayCircle className="h-5 w-5 text-blue-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-gray-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleTaskClick = (task: Task) => {
    switch (task.type) {
      case 'concept':
        navigate(`/dashboard/student/concepts/${task.id}`);
        break;
      case 'flashcard':
        navigate('/dashboard/student/flashcards');
        break;
      case 'practice-exam':
        navigate('/dashboard/student/practice-exam');
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Today's Study Plan ✨
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{progressPercentage}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Daily Progress</div>
                <Progress value={progressPercentage} className="mt-2 h-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{completedTasks}/{totalTasks}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">4.5h</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Study Time Goal</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <Target className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-bold">8</div>
              <div className="text-xs text-gray-500">Study Streak</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-lg font-bold">92%</div>
              <div className="text-xs text-gray-500">Efficiency</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <Award className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-bold">45</div>
              <div className="text-xs text-gray-500">Days to NEET</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <TrendingUp className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-lg font-bold">A+</div>
              <div className="text-xs text-gray-500">Today's Grade</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tasks Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Today's Tasks
            </span>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                task.status === 'completed' 
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                  : task.status === 'in-progress'
                  ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                  : 'bg-white border-gray-200 dark:bg-gray-800/50 dark:border-gray-700 hover:border-blue-300'
              }`}
              onClick={() => handleTaskClick(task)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(task.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </h3>
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        {getTaskIcon(task.type)}
                        <span className="capitalize">{task.type.replace('-', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{task.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{task.subject}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {task.difficulty === 'hard' && <Star className="h-4 w-4 text-red-500" />}
                  {task.difficulty === 'medium' && <Star className="h-4 w-4 text-yellow-500" />}
                  {task.difficulty === 'easy' && <Star className="h-4 w-4 text-green-500" />}
                  {task.status !== 'completed' && (
                    <Button 
                      size="sm" 
                      variant={task.status === 'in-progress' ? 'default' : 'outline'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTask(task.id);
                      }}
                    >
                      {task.status === 'in-progress' ? (
                        <>
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </>
                      ) : (
                        <>
                          <PlayCircle className="h-3 w-3 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          onClick={() => navigate('/dashboard/student/today')}
        >
          <Calendar className="h-4 w-4 mr-2" />
          View Detailed Plan
        </Button>
        <Button variant="outline" className="flex-1">
          <Target className="h-4 w-4 mr-2" />
          Customize Plan
        </Button>
      </div>
    </div>
  );
};

export default RedesignedTodaysPlan;
