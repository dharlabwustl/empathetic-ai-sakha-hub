
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  Target, 
  Play,
  CheckCircle,
  Star,
  Calendar,
  Lightbulb,
  Award,
  TrendingUp,
  Timer,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TaskItem {
  id: string;
  title: string;
  subject: string;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'concept' | 'flashcard' | 'exam';
  status: 'pending' | 'completed';
  points?: number;
}

const EnhancedTodaysPlan: React.FC = () => {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('daily');

  // Mock data
  const allTasks: TaskItem[] = [
    {
      id: 'c1',
      title: "Newton's Laws of Motion",
      subject: 'Physics',
      duration: 30,
      difficulty: 'Medium',
      type: 'concept',
      status: 'pending',
      points: 25
    },
    {
      id: 'f1',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      duration: 20,
      difficulty: 'Hard',
      type: 'flashcard',
      status: 'pending',
      points: 30
    },
    {
      id: 'e1',
      title: 'Physics Mock Test',
      subject: 'Physics',
      duration: 45,
      difficulty: 'Medium',
      type: 'exam',
      status: 'pending',
      points: 50
    },
    {
      id: 'c2',
      title: 'Thermodynamics',
      subject: 'Physics',
      duration: 25,
      difficulty: 'Hard',
      type: 'concept',
      status: 'completed',
      points: 25
    }
  ];

  const dailyTasks = allTasks.filter(task => task.status === 'pending');
  const pendingTasks = allTasks.filter(task => task.status === 'pending');
  const completedTasksList = allTasks.filter(task => task.status === 'completed' || completedTasks.has(task.id));

  const totalTasks = allTasks.length;
  const completedCount = completedTasksList.length + completedTasks.size;
  const progressPercentage = Math.round((completedCount / totalTasks) * 100);
  const totalPoints = completedTasksList.reduce((sum, task) => sum + (task.points || 0), 0);
  const streak = 7; // Mock streak

  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'flashcard': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'exam': return <FileText className="h-5 w-5 text-green-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const handleTaskClick = (task: TaskItem) => {
    if (task.type === 'concept') {
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else if (task.type === 'flashcard') {
      navigate(`/dashboard/student/flashcards/${task.id}/interactive`);
    } else if (task.type === 'exam') {
      navigate(`/dashboard/student/practice-exam/${task.id}`);
    }
  };

  const renderTaskCard = (task: TaskItem) => {
    const isCompleted = task.status === 'completed' || completedTasks.has(task.id);
    
    return (
      <motion.div
        key={task.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card 
          className={`border-l-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
            isCompleted 
              ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500 opacity-90' 
              : 'hover:shadow-xl border-l-blue-500 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900'
          }`}
          onClick={() => handleTaskClick(task)}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                ) : (
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    {getTaskIcon(task.type)}
                  </div>
                )}
                <div>
                  <h3 className={`font-semibold text-lg ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{task.subject}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                  {task.difficulty}
                </Badge>
                {task.points && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                    +{task.points} pts
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {task.duration} min
                </span>
                <Badge variant="outline" className="capitalize">
                  {task.type}
                </Badge>
              </div>
              
              {!isCompleted && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTaskCompletion(task.id);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Done
                  </Button>
                  <Button 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskClick(task);
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Today's Study Mission 🎯</h1>
                <p className="text-blue-100 text-lg">Complete your daily tasks and level up your knowledge!</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-6 w-6 text-yellow-300" />
                  <span className="text-2xl font-bold">{streak} Day Streak</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                  {totalPoints} Points Today
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-6 w-6 text-yellow-300" />
                  <span className="text-lg font-semibold">Progress</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Tasks</span>
                    <span>{completedCount}/{totalTasks} completed</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 bg-white/20" />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-6 w-6 text-green-300" />
                  <span className="text-lg font-semibold">Performance</span>
                </div>
                <div className="text-2xl font-bold">{progressPercentage}%</div>
                <div className="text-sm text-blue-100">Completion Rate</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-purple-300" />
                  <span className="text-lg font-semibold">Achievements</span>
                </div>
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-sm text-blue-100">Days Streak</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smart Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Lightbulb className="h-6 w-6" />
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-bold">
                  🧠 PREPZR AI Smart Recommendations
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-amber-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full text-white">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Focus on Physics Today</h4>
                      <p className="text-sm text-gray-600">You have {pendingTasks.filter(t => t.subject === 'Physics').length} Physics tasks pending. Complete them to boost your score!</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-amber-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full text-white">
                      <Timer className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Quick Win Available</h4>
                      <p className="text-sm text-gray-600">Start with flashcards - they're quick and will give you momentum for harder tasks!</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm border">
              <TabsTrigger value="daily" className="text-base">
                📅 Today's Tasks ({dailyTasks.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-base">
                ⏳ Pending ({pendingTasks.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-base">
                ✅ Completed ({completedTasksList.length + completedTasks.size})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4">
              <div className="grid gap-4">
                <AnimatePresence>
                  {dailyTasks.map(renderTaskCard)}
                </AnimatePresence>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <div className="grid gap-4">
                <AnimatePresence>
                  {pendingTasks.map(renderTaskCard)}
                </AnimatePresence>
              </div>
              {pendingTasks.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">All caught up! 🎉</h3>
                  <p className="text-gray-500">No pending tasks remaining. Great job!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4">
                <AnimatePresence>
                  {completedTasksList.map(renderTaskCard)}
                  {Array.from(completedTasks).map(taskId => {
                    const task = allTasks.find(t => t.id === taskId);
                    return task ? renderTaskCard({...task, status: 'completed'}) : null;
                  })}
                </AnimatePresence>
              </div>
              {completedTasksList.length === 0 && completedTasks.size === 0 && (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No completed tasks yet</h3>
                  <p className="text-gray-500">Complete some tasks to see them here!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedTodaysPlan;
