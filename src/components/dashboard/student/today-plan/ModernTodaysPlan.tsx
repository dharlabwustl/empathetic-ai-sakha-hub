
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle2,
  AlertCircle,
  Calendar,
  Zap,
  PlayCircle,
  PauseCircle,
  Star,
  Award,
  Timer,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TaskItem {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'practice-exam';
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  progress?: number;
}

interface ModernTodaysPlanProps {
  userName?: string;
  isMobile?: boolean;
}

const ModernTodaysPlan: React.FC<ModernTodaysPlanProps> = ({ userName = "Student", isMobile = false }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Mock data for today's plan
  const todayStats = {
    totalTasks: 12,
    completedTasks: 5,
    totalTime: 240, // minutes
    completedTime: 120,
    efficiency: 85,
    streak: 7
  };

  const concepts: TaskItem[] = [
    {
      id: 'c1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      type: 'concept',
      duration: 30,
      difficulty: 'Medium',
      status: 'completed',
      priority: 'high'
    },
    {
      id: 'c2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      type: 'concept',
      duration: 45,
      difficulty: 'Hard',
      status: 'in-progress',
      priority: 'high',
      progress: 60
    },
    {
      id: 'c3',
      title: 'Cell Division Process',
      subject: 'Biology',
      type: 'concept',
      duration: 25,
      difficulty: 'Easy',
      status: 'pending',
      priority: 'medium'
    }
  ];

  const flashcards: TaskItem[] = [
    {
      id: 'f1',
      title: 'Physics Formulas Deck',
      subject: 'Physics',
      type: 'flashcard',
      duration: 15,
      difficulty: 'Medium',
      status: 'completed',
      priority: 'medium'
    },
    {
      id: 'f2',
      title: 'Chemical Elements',
      subject: 'Chemistry',
      type: 'flashcard',
      duration: 20,
      difficulty: 'Easy',
      status: 'pending',
      priority: 'low'
    }
  ];

  const practiceExams: TaskItem[] = [
    {
      id: 'p1',
      title: 'Physics Mock Test 1',
      subject: 'Physics',
      type: 'practice-exam',
      duration: 60,
      difficulty: 'Hard',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 'p2',
      title: 'Biology Quick Quiz',
      subject: 'Biology',
      type: 'practice-exam',
      duration: 30,
      difficulty: 'Medium',
      status: 'completed',
      priority: 'medium'
    }
  ];

  const allTasks = [...concepts, ...flashcards, ...practiceExams];
  
  const completionPercentage = Math.round((todayStats.completedTasks / todayStats.totalTasks) * 100);
  const timeProgress = Math.round((todayStats.completedTime / todayStats.totalTime) * 100);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice-exam': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <PlayCircle className="h-4 w-4 text-blue-500" />;
      default: return <PauseCircle className="h-4 w-4 text-gray-400" />;
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

  const TaskCard = ({ task }: { task: TaskItem }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md border-l-4",
          task.status === 'completed' ? 'border-l-green-500 bg-green-50/50' :
          task.status === 'in-progress' ? 'border-l-blue-500 bg-blue-50/50' :
          'border-l-gray-300 hover:border-l-blue-400',
          selectedTask === task.id && 'ring-2 ring-blue-500'
        )}
        onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {getTaskIcon(task.type)}
              <div>
                <h4 className="font-medium text-sm">{task.title}</h4>
                <p className="text-xs text-gray-500">{task.subject}</p>
              </div>
            </div>
            {getStatusIcon(task.status)}
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                {task.difficulty}
              </Badge>
              <span className="flex items-center gap-1 text-gray-500">
                <Clock className="h-3 w-3" />
                {task.duration}m
              </span>
            </div>
            <div className="flex items-center gap-1">
              {task.priority === 'high' && <AlertCircle className="h-3 w-3 text-red-500" />}
              {task.status === 'completed' && <Star className="h-3 w-3 text-yellow-500" />}
            </div>
          </div>
          
          {task.status === 'in-progress' && task.progress && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-1" />
            </div>
          )}
          
          <div className="mt-3 flex gap-2">
            {task.status === 'pending' && (
              <Button size="sm" variant="outline" className="h-7 text-xs">
                Start
              </Button>
            )}
            {task.status === 'in-progress' && (
              <Button size="sm" variant="default" className="h-7 text-xs">
                Continue
              </Button>
            )}
            {task.status === 'completed' && (
              <Button size="sm" variant="ghost" className="h-7 text-xs">
                Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Good Morning, {userName}! ✨
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Tasks</p>
                  <p className="text-2xl font-bold">{todayStats.completedTasks}/{todayStats.totalTasks}</p>
                </div>
                <Target className="h-8 w-8 text-blue-200" />
              </div>
              <div className="mt-2">
                <Progress value={completionPercentage} className="h-1 bg-blue-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Study Time</p>
                  <p className="text-2xl font-bold">{Math.floor(todayStats.completedTime / 60)}h {todayStats.completedTime % 60}m</p>
                </div>
                <Timer className="h-8 w-8 text-green-200" />
              </div>
              <div className="mt-2">
                <Progress value={timeProgress} className="h-1 bg-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Efficiency</p>
                  <p className="text-2xl font-bold">{todayStats.efficiency}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
              <div className="mt-2">
                <div className="text-xs text-purple-100">Above target!</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Streak</p>
                  <p className="text-2xl font-bold">{todayStats.streak} days</p>
                </div>
                <Award className="h-8 w-8 text-orange-200" />
              </div>
              <div className="mt-2">
                <div className="text-xs text-orange-100">Keep it up!</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="concepts" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Concepts
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Time Allocation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Concepts</span>
                    <span className="text-sm font-medium">100 min</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Flashcards</span>
                    <span className="text-sm font-medium">35 min</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Practice Tests</span>
                    <span className="text-sm font-medium">90 min</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Tomorrow's Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Tomorrow's Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Tasks</span>
                    <Badge variant="outline">8 tasks</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Focus Subject</span>
                    <Badge variant="outline">Mathematics</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Estimated Time</span>
                    <Badge variant="outline">3.5 hours</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Difficulty Level</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Moderate</Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4">
                  View Tomorrow's Plan
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allTasks.filter(task => task.status === 'completed').slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{task.title}</span>
                    <Badge variant="outline" className="text-xs">{task.subject}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {concepts.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcards.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceExams.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Brain className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Focus on Chemistry today</p>
                <p className="text-xs text-gray-500">You've been consistently improving. Keep the momentum!</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Target className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Take a 10-minute break</p>
                <p className="text-xs text-gray-500">You've been studying for 90 minutes straight.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Award className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">You're on track for your daily goal</p>
                <p className="text-xs text-gray-500">Complete 2 more tasks to exceed today's target!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernTodaysPlan;
