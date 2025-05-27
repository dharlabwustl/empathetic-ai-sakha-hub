
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import BackButton from '@/components/dashboard/student/BackButton';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Clock, CheckCircle, Sparkles, ArrowRight, 
  Calendar, BookMarked, FileText, CheckSquare, ListTodo,
  Trophy, Target, Zap, Brain, TrendingUp, Star
} from 'lucide-react';

const TodaysPlanView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('daily');
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  
  // Enhanced mock data for today's study plan
  const todaysPlan = {
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }),
    streak: 5,
    dailyScore: 85,
    totalPoints: 1250,
    progress: 65,
    totalHours: 5.5,
    completedHours: 3.5,
    dailyTasks: {
      concepts: [
        { id: 'c1', title: 'Newton\'s Laws of Motion', subject: 'Physics', duration: 30, difficulty: 'medium', points: 25, status: 'pending' },
        { id: 'c2', title: 'Organic Chemistry Basics', subject: 'Chemistry', duration: 45, difficulty: 'hard', points: 35, status: 'completed' },
        { id: 'c3', title: 'Cell Division Process', subject: 'Biology', duration: 25, difficulty: 'easy', points: 20, status: 'pending' }
      ],
      flashcards: [
        { id: 'f1', title: 'Physics Formulas', subject: 'Physics', duration: 15, cardCount: 20, points: 15, status: 'pending' },
        { id: 'f2', title: 'Chemical Elements', subject: 'Chemistry', duration: 20, cardCount: 25, points: 20, status: 'completed' }
      ],
      exams: [
        { id: 'e1', title: 'Physics Practice Test', subject: 'Physics', duration: 45, questionCount: 30, points: 40, status: 'pending' },
        { id: 'e2', title: 'Biology Quick Quiz', subject: 'Biology', duration: 20, questionCount: 15, points: 25, status: 'pending' }
      ]
    },
    pendingTasks: {
      concepts: [
        { id: 'pc1', title: 'Thermodynamics Laws', subject: 'Physics', duration: 40, difficulty: 'hard', daysOverdue: 2 },
        { id: 'pc2', title: 'Periodic Table Trends', subject: 'Chemistry', duration: 30, difficulty: 'medium', daysOverdue: 1 }
      ],
      flashcards: [
        { id: 'pf1', title: 'Biology Definitions', subject: 'Biology', duration: 25, cardCount: 30, daysOverdue: 3 }
      ],
      exams: [
        { id: 'pe1', title: 'Chemistry Mock Test', subject: 'Chemistry', duration: 60, questionCount: 50, daysOverdue: 1 }
      ]
    },
    smartSuggestions: [
      { 
        id: 's1', 
        title: 'Focus on pending Chemistry tasks', 
        description: 'Complete overdue Chemistry concepts to stay on track',
        priority: 'high',
        action: 'Complete 2 pending Chemistry tasks',
        points: 50
      },
      { 
        id: 's2', 
        title: 'Quick review session', 
        description: 'Review completed concepts for better retention',
        priority: 'medium',
        action: 'Review 3 completed concepts',
        points: 30
      }
    ]
  };

  const handleTaskComplete = (taskId: string, type: 'concept' | 'flashcard' | 'exam') => {
    setCompletedTasks(prev => new Set([...prev, taskId]));
    
    // Navigate to appropriate page
    if (type === 'concept') {
      navigate(`/dashboard/student/concepts/${taskId}`);
    } else if (type === 'flashcard') {
      navigate(`/dashboard/student/flashcards/${taskId}/interactive`);
    } else if (type === 'exam') {
      navigate(`/dashboard/student/practice-exam/${taskId}`);
    }
  };

  const calculateCompletedTasks = () => {
    const dailyCompleted = Object.values(todaysPlan.dailyTasks)
      .flat()
      .filter((task: any) => task.status === 'completed' || completedTasks.has(task.id)).length;
    
    const totalDaily = Object.values(todaysPlan.dailyTasks)
      .flat().length;
    
    return { completed: dailyCompleted, total: totalDaily };
  };

  const { completed, total } = calculateCompletedTasks();
  const completionRate = (completed / total) * 100;

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
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const TaskCard = ({ task, type, isCompleted = false }: any) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
        isCompleted 
          ? 'bg-green-50 border-green-200 shadow-green-100' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg'
      }`}
      onClick={() => handleTaskComplete(task.id, type)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${
            type === 'concept' ? 'bg-blue-100 text-blue-600' :
            type === 'flashcard' ? 'bg-purple-100 text-purple-600' :
            'bg-green-100 text-green-600'
          }`}>
            {type === 'concept' ? <BookOpen className="h-5 w-5" /> :
             type === 'flashcard' ? <Brain className="h-5 w-5" /> :
             <FileText className="h-5 w-5" />}
          </div>
          
          <div className="flex-1">
            <h4 className={`font-semibold text-lg mb-1 ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h4>
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {task.duration}min
              </span>
              <Badge variant="outline" className="text-xs">
                {task.subject}
              </Badge>
              {task.difficulty && (
                <Badge variant="outline" className={`text-xs ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </Badge>
              )}
            </div>
            
            {task.cardCount && (
              <p className="text-sm text-gray-500">
                {task.cardCount} cards
              </p>
            )}
            {task.questionCount && (
              <p className="text-sm text-gray-500">
                {task.questionCount} questions
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {task.points && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
              +{task.points} pts
            </Badge>
          )}
          <div className={`p-2 rounded-full ${
            isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50">
      <SharedPageLayout 
        title="Today's Study Plan" 
        subtitle={todaysPlan.date}
      >
        <div className="space-y-8">
          {/* Back button */}
          <BackButton to="/dashboard/student" label="Back to Dashboard" />

          {/* Enhanced Header Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{todaysPlan.streak}</div>
                <div className="text-sm opacity-90">Day Streak</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{todaysPlan.dailyScore}</div>
                <div className="text-sm opacity-90">Daily Score</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{todaysPlan.totalPoints}</div>
                <div className="text-sm opacity-90">Total Points</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
                <div className="text-sm opacity-90">Completion</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-blue-100 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-2xl font-bold">Daily Progress</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-lg px-4 py-2">
                    {completed} of {total} tasks completed
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-lg mb-3">
                      <span className="font-medium">Overall Progress</span>
                      <span className="font-bold text-blue-600">{Math.round(completionRate)}%</span>
                    </div>
                    <Progress value={completionRate} className="h-4 bg-gray-100" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <div className="font-bold text-blue-700 text-lg">{todaysPlan.completedHours}h</div>
                      <div className="text-blue-600 text-sm">of {todaysPlan.totalHours}h studied</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <div className="font-bold text-green-700 text-lg">{completed}</div>
                      <div className="text-green-600 text-sm">tasks completed</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <Zap className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                      <div className="font-bold text-purple-700 text-lg">{total - completed}</div>
                      <div className="text-purple-600 text-sm">tasks remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Smart Suggestions */}
          {todaysPlan.smartSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-purple-700">
                    <Sparkles className="h-6 w-6" />
                    Smart Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysPlan.smartSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="bg-white/80 rounded-xl p-4 border border-purple-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{suggestion.title}</h4>
                            <p className="text-gray-600 mb-2">{suggestion.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(suggestion.priority)}>
                                {suggestion.priority} priority
                              </Badge>
                              <Badge className="bg-yellow-100 text-yellow-700">
                                +{suggestion.points} points
                              </Badge>
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                            {suggestion.action}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Enhanced Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full grid grid-cols-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-lg h-14">
              <TabsTrigger value="daily" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-lg">
                📅 Daily Tasks
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-lg">
                ⏰ Pending Tasks
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-lg">
                ✅ Completed
              </TabsTrigger>
            </TabsList>
            
            {/* Daily Tasks Tab */}
            <TabsContent value="daily">
              <div className="space-y-8">
                {/* Concepts */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <CardTitle className="flex items-center gap-3 text-blue-700">
                      <BookOpen className="h-6 w-6" />
                      Concepts ({todaysPlan.dailyTasks.concepts.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <AnimatePresence>
                        {todaysPlan.dailyTasks.concepts.map((task) => (
                          <TaskCard 
                            key={task.id} 
                            task={task} 
                            type="concept"
                            isCompleted={task.status === 'completed' || completedTasks.has(task.id)}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>

                {/* Flashcards */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                    <CardTitle className="flex items-center gap-3 text-purple-700">
                      <Brain className="h-6 w-6" />
                      Flashcards ({todaysPlan.dailyTasks.flashcards.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <AnimatePresence>
                        {todaysPlan.dailyTasks.flashcards.map((task) => (
                          <TaskCard 
                            key={task.id} 
                            task={task} 
                            type="flashcard"
                            isCompleted={task.status === 'completed' || completedTasks.has(task.id)}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>

                {/* Practice Exams */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                    <CardTitle className="flex items-center gap-3 text-green-700">
                      <FileText className="h-6 w-6" />
                      Practice Exams ({todaysPlan.dailyTasks.exams.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <AnimatePresence>
                        {todaysPlan.dailyTasks.exams.map((task) => (
                          <TaskCard 
                            key={task.id} 
                            task={task} 
                            type="exam"
                            isCompleted={completedTasks.has(task.id)}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Pending Tasks Tab */}
            <TabsContent value="pending">
              <div className="space-y-6">
                {Object.entries(todaysPlan.pendingTasks).map(([type, tasks]) => (
                  <Card key={type} className="bg-orange-50/50 border-orange-200 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-orange-700 capitalize">
                        {type === 'concepts' ? <BookOpen className="h-6 w-6" /> :
                         type === 'flashcards' ? <Brain className="h-6 w-6" /> :
                         <FileText className="h-6 w-6" />}
                        Pending {type} ({(tasks as any[]).length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(tasks as any[]).map((task) => (
                          <div key={task.id} className="bg-white rounded-xl p-4 border border-orange-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-lg">{task.title}</h4>
                                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                  <span>{task.duration}min</span>
                                  <Badge variant="outline">{task.subject}</Badge>
                                  {task.daysOverdue && (
                                    <Badge variant="destructive">
                                      {task.daysOverdue} days overdue
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button 
                                onClick={() => handleTaskComplete(task.id, type.slice(0, -1) as any)}
                                className="bg-orange-600 hover:bg-orange-700"
                              >
                                Complete Now
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Completed Tasks Tab */}
            <TabsContent value="completed">
              <Card className="bg-green-50/50 border-green-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-green-700">
                    <CheckCircle className="h-6 w-6" />
                    Completed Tasks Today ({completed})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.values(todaysPlan.dailyTasks).flat()
                      .filter((task: any) => task.status === 'completed' || completedTasks.has(task.id))
                      .map((task: any) => (
                        <div key={task.id} className="bg-white rounded-xl p-4 border border-green-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <div>
                                <h4 className="font-semibold">{task.title}</h4>
                                <p className="text-sm text-gray-600">{task.subject} • {task.duration}min</p>
                              </div>
                            </div>
                            {task.points && (
                              <Badge className="bg-green-600 text-white">
                                +{task.points} pts earned
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    
                    {completed === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No tasks completed yet today. Keep going!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SharedPageLayout>
    </div>
  );
};

export default TodaysPlanView;
