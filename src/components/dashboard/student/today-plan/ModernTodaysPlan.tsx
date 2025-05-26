
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain, 
  FileText, 
  CheckCircle,
  Circle,
  Play,
  Pause,
  RotateCcw,
  Award,
  Zap,
  Timer,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'practice' | 'revision';
  duration: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  progress?: number;
}

interface StudySession {
  subject: string;
  totalTime: number;
  completedTime: number;
  tasks: number;
  completedTasks: number;
  efficiency: number;
}

const ModernTodaysPlan: React.FC = () => {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data for today's plan
  const todayStats = {
    totalTasks: 12,
    completedTasks: 7,
    totalTime: 480, // 8 hours in minutes
    studiedTime: 285, // 4h 45m
    efficiency: 87,
    streak: 12
  };

  const studySessions: StudySession[] = [
    { subject: 'Physics', totalTime: 180, completedTime: 120, tasks: 4, completedTasks: 3, efficiency: 85 },
    { subject: 'Chemistry', totalTime: 150, completedTime: 90, tasks: 3, completedTasks: 2, efficiency: 78 },
    { subject: 'Biology', totalTime: 120, completedTime: 75, tasks: 3, completedTasks: 2, efficiency: 92 },
    { subject: 'Mathematics', totalTime: 90, completedTime: 0, tasks: 2, completedTasks: 0, efficiency: 0 }
  ];

  const conceptTasks: Task[] = [
    { id: '1', title: 'Thermodynamics Laws', subject: 'Physics', type: 'concept', duration: 45, completed: true, difficulty: 'medium', progress: 100 },
    { id: '2', title: 'Organic Reactions', subject: 'Chemistry', type: 'concept', duration: 60, completed: false, difficulty: 'hard', progress: 30 },
    { id: '3', title: 'Cell Division', subject: 'Biology', type: 'concept', duration: 40, completed: true, difficulty: 'easy', progress: 100 }
  ];

  const flashcardTasks: Task[] = [
    { id: '4', title: 'Physics Formulas', subject: 'Physics', type: 'flashcard', duration: 20, completed: true, difficulty: 'easy' },
    { id: '5', title: 'Chemical Bonds', subject: 'Chemistry', type: 'flashcard', duration: 25, completed: false, difficulty: 'medium' },
    { id: '6', title: 'Human Anatomy', subject: 'Biology', type: 'flashcard', duration: 30, completed: true, difficulty: 'medium' }
  ];

  const practiceTasks: Task[] = [
    { id: '7', title: 'Mechanics Problems', subject: 'Physics', type: 'practice', duration: 60, completed: false, difficulty: 'hard' },
    { id: '8', title: 'Algebra Practice', subject: 'Mathematics', type: 'practice', duration: 45, completed: false, difficulty: 'medium' }
  ];

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'practice': return <FileText className="h-4 w-4" />;
      case 'revision': return <RotateCcw className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header with Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-700">{todayStats.completedTasks}/{todayStats.totalTasks}</p>
                  <p className="text-sm text-blue-600">Tasks Complete</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
              <Progress value={(todayStats.completedTasks / todayStats.totalTasks) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-700">{formatTime(todayStats.studiedTime)}</p>
                  <p className="text-sm text-green-600">Study Time</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
              <Progress value={(todayStats.studiedTime / todayStats.totalTime) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-700">{todayStats.efficiency}%</p>
                  <p className="text-sm text-purple-600">Efficiency</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
              <Progress value={todayStats.efficiency} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-700">{todayStats.streak}</p>
                  <p className="text-sm text-orange-600">Day Streak</p>
                </div>
                <Award className="h-8 w-8 text-orange-500" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-4 rounded ${i < 5 ? 'bg-orange-400' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content with Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Today's Learning Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="concepts" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="concepts">Concepts</TabsTrigger>
                  <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>
                
                <TabsContent value="concepts" className="space-y-3 mt-4">
                  {conceptTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        task.completed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            task.completed ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {task.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              getTaskIcon(task.type)
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500">{task.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(task.difficulty)}>
                            {task.difficulty}
                          </Badge>
                          <span className="text-sm text-gray-500">{task.duration}m</span>
                        </div>
                      </div>
                      
                      {task.progress !== undefined && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-1.5" />
                        </div>
                      )}
                      
                      {!task.completed && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Play className="h-3 w-3 mr-1" />
                            Start
                          </Button>
                          <Button size="sm" variant="outline">
                            <Timer className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="flashcards" className="space-y-3 mt-4">
                  {flashcardTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        task.completed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            task.completed ? 'bg-green-100' : 'bg-purple-100'
                          }`}>
                            {task.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              getTaskIcon(task.type)
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500">{task.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(task.difficulty)}>
                            {task.difficulty}
                          </Badge>
                          <span className="text-sm text-gray-500">{task.duration}m</span>
                        </div>
                      </div>
                      
                      {!task.completed && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Brain className="h-3 w-3 mr-1" />
                            Study
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="practice" className="space-y-3 mt-4">
                  {practiceTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border-2 bg-white border-gray-200 hover:border-green-300 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-green-100">
                            {getTaskIcon(task.type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500">{task.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(task.difficulty)}>
                            {task.difficulty}
                          </Badge>
                          <span className="text-sm text-gray-500">{task.duration}m</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          <FileText className="h-3 w-3 mr-1" />
                          Practice
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Progress & Tomorrow's Preview */}
        <div className="space-y-6">
          {/* Subject Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studySessions.map((session, index) => (
                <motion.div
                  key={session.subject}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{session.subject}</span>
                    <Badge variant="secondary">{session.efficiency}%</Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{session.completedTasks}/{session.tasks} tasks</span>
                    <span>{formatTime(session.completedTime)}/{formatTime(session.totalTime)}</span>
                  </div>
                  <Progress 
                    value={(session.completedTime / session.totalTime) * 100} 
                    className="h-2"
                  />
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Tomorrow's Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Tomorrow's Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Wave Optics</span>
                </div>
                <p className="text-sm text-blue-600">Physics - 60 minutes</p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800">Coordination Compounds</span>
                </div>
                <p className="text-sm text-purple-600">Chemistry - 45 minutes</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Mock Test 15</span>
                </div>
                <p className="text-sm text-green-600">Full Syllabus - 180 minutes</p>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                <ArrowRight className="h-4 w-4 mr-2" />
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModernTodaysPlan;
