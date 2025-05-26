
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  Brain, 
  Zap, 
  BookOpen,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Star,
  Award,
  Sparkles,
  Timer,
  BarChart3,
  Eye,
  Heart,
  Coffee,
  Sun,
  Moon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

interface StudyTask {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'practice' | 'revision' | 'exam';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'current' | 'completed' | 'skipped';
  startTime: string;
  progress: number;
  smartSuggestion?: string;
  aiInsight?: string;
}

const EnhancedTodaysPlan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [studyTimer, setStudyTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Mock data with smart suggestions and AI insights
  const todaysTasks: StudyTask[] = [
    {
      id: '1',
      title: "Newton's Laws of Motion - Advanced Concepts",
      subject: 'Physics',
      type: 'concept',
      duration: 45,
      difficulty: 'medium',
      priority: 'high',
      status: 'completed',
      startTime: '09:00',
      progress: 100,
      smartSuggestion: "Perfect timing for complex physics concepts when your brain is fresh!",
      aiInsight: "Your performance in mechanics improved by 23% this week"
    },
    {
      id: '2',
      title: "Organic Chemistry - Reaction Mechanisms",
      subject: 'Chemistry',
      type: 'concept',
      duration: 50,
      difficulty: 'hard',
      priority: 'high',
      status: 'current',
      startTime: '10:00',
      progress: 65,
      smartSuggestion: "Focus on electron movement patterns - your weak area from last assessment",
      aiInsight: "Similar reaction types were challenging in your recent practice test"
    },
    {
      id: '3',
      title: "Calculus Integration Practice",
      subject: 'Mathematics',
      type: 'practice',
      duration: 35,
      difficulty: 'medium',
      priority: 'medium',
      status: 'pending',
      startTime: '11:15',
      progress: 0,
      smartSuggestion: "Perfect follow-up after chemistry - mathematical mindset transition",
      aiInsight: "Your integration speed increased by 40% with recent practice"
    },
    {
      id: '4',
      title: "Biology Flashcards - Cell Structure",
      subject: 'Biology',
      type: 'revision',
      duration: 25,
      difficulty: 'easy',
      priority: 'medium',
      status: 'pending',
      startTime: '12:30',
      progress: 0,
      smartSuggestion: "Light revision before lunch break - maintains momentum",
      aiInsight: "Spaced repetition optimal timing for long-term retention"
    },
    {
      id: '5',
      title: "Mock Test - Mixed Topics",
      subject: 'All Subjects',
      type: 'exam',
      duration: 90,
      difficulty: 'hard',
      priority: 'high',
      status: 'pending',
      startTime: '14:00',
      progress: 0,
      smartSuggestion: "Post-lunch energy peak - ideal for comprehensive testing",
      aiInsight: "Your afternoon performance is 15% better than morning tests"
    }
  ];

  const dailyStats = {
    totalTasks: todaysTasks.length,
    completedTasks: todaysTasks.filter(task => task.status === 'completed').length,
    totalDuration: todaysTasks.reduce((sum, task) => sum + task.duration, 0),
    completedDuration: todaysTasks.filter(task => task.status === 'completed').reduce((sum, task) => sum + task.duration, 0),
    currentStreak: 7,
    weeklyGoal: 300,
    weeklyProgress: 245
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'revision': return <RotateCcw className="h-4 w-4" />;
      case 'exam': return <Award className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'skipped': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleTaskStart = (taskId: string) => {
    setCurrentTask(taskId);
    setStudyTimer(0);
    setIsTimerActive(true);
  };

  const handleTaskComplete = (taskId: string) => {
    // Update task status logic here
    setCurrentTask(null);
    setIsTimerActive(false);
  };

  const smartRecommendations = [
    {
      type: 'energy',
      icon: <Zap className="h-4 w-4 text-yellow-500" />,
      title: "Peak Energy Window",
      description: "Your energy is highest now - tackle difficult physics concepts",
      action: "Start Newton's Laws"
    },
    {
      type: 'break',
      icon: <Coffee className="h-4 w-4 text-brown-500" />,
      title: "Smart Break Reminder",
      description: "Take a 10-minute break after 50 minutes of focused study",
      action: "Set Break Timer"
    },
    {
      type: 'technique',
      icon: <Eye className="h-4 w-4 text-purple-500" />,
      title: "Learning Technique Suggestion",
      description: "Try visual mind mapping for organic chemistry reactions",
      action: "Open Visual Tools"
    }
  ];

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle="Your personalized learning journey for maximum impact"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Hero Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{dailyStats.completedTasks}/{dailyStats.totalTasks}</div>
              <div className="text-sm text-blue-700">Tasks Completed</div>
              <Progress value={(dailyStats.completedTasks / dailyStats.totalTasks) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{dailyStats.currentStreak}</div>
              <div className="text-sm text-green-700">Day Streak</div>
              <div className="flex items-center justify-center mt-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round((dailyStats.completedDuration / dailyStats.totalDuration) * 100)}%</div>
              <div className="text-sm text-purple-700">Daily Progress</div>
              <Progress value={(dailyStats.completedDuration / dailyStats.totalDuration) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{dailyStats.weeklyProgress}</div>
              <div className="text-sm text-orange-700">Weekly Minutes</div>
              <Progress value={(dailyStats.weeklyProgress / dailyStats.weeklyGoal) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Smart Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                Smart Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {smartRecommendations.map((rec, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="p-3 bg-white/80 rounded-lg border border-white/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {rec.icon}
                      <span className="font-medium text-sm">{rec.title}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                    <Button size="sm" variant="outline" className="text-xs">
                      {rec.action}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tasks List */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Learning Schedule
                </h3>
                
                <AnimatePresence>
                  {todaysTasks.map((task, idx) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className={`transition-all duration-300 hover:shadow-lg ${
                        task.status === 'current' ? 'ring-2 ring-blue-500 shadow-lg' : ''
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                task.status === 'completed' ? 'bg-green-100' :
                                task.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                {getTaskIcon(task.type)}
                              </div>
                              <div>
                                <h4 className="font-medium">{task.title}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span>{task.subject}</span>
                                  <span>•</span>
                                  <Clock className="h-3 w-3" />
                                  <span>{task.duration} min</span>
                                  <span>•</span>
                                  <span>{task.startTime}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getStatusColor(task.status)}>
                                {task.status}
                              </Badge>
                              <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                                {task.difficulty}
                              </Badge>
                            </div>
                          </div>

                          {task.progress > 0 && (
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-2" />
                            </div>
                          )}

                          {task.smartSuggestion && (
                            <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                              <div className="flex items-center gap-1 font-medium text-yellow-800 mb-1">
                                <Zap className="h-3 w-3" />
                                Smart Suggestion
                              </div>
                              <p className="text-yellow-700">{task.smartSuggestion}</p>
                            </div>
                          )}

                          {task.aiInsight && (
                            <div className="mb-3 p-2 bg-purple-50 border border-purple-200 rounded text-sm">
                              <div className="flex items-center gap-1 font-medium text-purple-800 mb-1">
                                <Brain className="h-3 w-3" />
                                AI Insight
                              </div>
                              <p className="text-purple-700">{task.aiInsight}</p>
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {task.status === 'pending' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleTaskStart(task.id)}
                                  className="flex items-center gap-1"
                                >
                                  <Play className="h-3 w-3" />
                                  Start
                                </Button>
                              )}
                              {task.status === 'current' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleTaskComplete(task.id)}
                                  className="flex items-center gap-1"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                  Complete
                                </Button>
                              )}
                              {task.status === 'completed' && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Completed
                                </Badge>
                              )}
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                if (task.type === 'concept') navigate(`/dashboard/student/concepts/${task.id}`);
                                else if (task.type === 'practice') navigate('/dashboard/student/practice-exam');
                                else if (task.type === 'revision') navigate('/dashboard/student/flashcards');
                              }}
                            >
                              Open →
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Sidebar with Timer and Quick Stats */}
              <div className="space-y-4">
                {/* Study Timer */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Timer className="h-5 w-5" />
                      Study Timer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {Math.floor(studyTimer / 60)}:{(studyTimer % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="flex justify-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => setIsTimerActive(!isTimerActive)}
                          variant={isTimerActive ? "destructive" : "default"}
                        >
                          {isTimerActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setStudyTimer(0);
                            setIsTimerActive(false);
                          }}
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Performance Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">This Week</span>
                      <span className="font-medium">245/300 min</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Avg. Focus Time</span>
                      <span className="font-medium">42 min</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Best Subject</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Physics</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Timeline View</h3>
                  <p className="text-gray-600">Visual timeline of your daily study schedule coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Performance Analytics</h3>
                  <p className="text-gray-600">Detailed analytics and insights coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Voice Assistant */}
      <FloatingVoiceButton 
        userName="Student"
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
      />
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
