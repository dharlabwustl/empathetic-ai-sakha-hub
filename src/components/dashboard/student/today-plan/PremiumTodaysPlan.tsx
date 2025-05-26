
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, Brain, Target, Zap, TrendingUp, 
  BookOpen, Users, Award, Sparkles, Play, CheckCircle2,
  AlertCircle, BarChart3, Timer, Flame
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

interface SmartSuggestion {
  id: string;
  type: 'boost' | 'break' | 'challenge' | 'review';
  title: string;
  description: string;
  timeEstimate: number;
  priority: 'high' | 'medium' | 'low';
  action: string;
  icon: React.ReactNode;
}

interface StudyTask {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'practice' | 'revision' | 'test';
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: number;
  completed: boolean;
  progress: number;
  dueTime: string;
}

const PremiumTodaysPlan: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [studyStreak, setStudyStreak] = useState(12);
  const [dailyProgress, setDailyProgress] = useState(67);
  const [focusScore, setFocusScore] = useState(85);

  // Smart suggestions based on time and progress
  const smartSuggestions: SmartSuggestion[] = [
    {
      id: '1',
      type: 'boost',
      title: 'Chemistry Quick Boost',
      description: 'Focus on weak organic chemistry concepts for 15 minutes',
      timeEstimate: 15,
      priority: 'high',
      action: 'start-boost',
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: '2',
      type: 'break',
      title: 'Mindfulness Break',
      description: 'Take a 5-minute breathing exercise to maintain focus',
      timeEstimate: 5,
      priority: 'medium',
      action: 'take-break',
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: '3',
      type: 'challenge',
      title: 'Physics Challenge',
      description: 'Solve 3 advanced mechanics problems',
      timeEstimate: 20,
      priority: 'high',
      action: 'start-challenge',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: '4',
      type: 'review',
      title: 'Flashcard Review',
      description: 'Review 20 due flashcards before they become overdue',
      timeEstimate: 10,
      priority: 'medium',
      action: 'review-flashcards',
      icon: <BookOpen className="h-4 w-4" />
    }
  ];

  const todaysTasks: StudyTask[] = [
    {
      id: '1',
      title: 'Thermodynamics - Laws and Applications',
      subject: 'Physics',
      type: 'concept',
      difficulty: 'medium',
      timeEstimate: 45,
      completed: false,
      progress: 30,
      dueTime: '2:00 PM'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      type: 'practice',
      difficulty: 'hard',
      timeEstimate: 60,
      completed: false,
      progress: 0,
      dueTime: '4:00 PM'
    },
    {
      id: '3',
      title: 'Calculus Integration Techniques',
      subject: 'Mathematics',
      type: 'revision',
      difficulty: 'medium',
      timeEstimate: 30,
      completed: true,
      progress: 100,
      dueTime: '12:00 PM'
    },
    {
      id: '4',
      title: 'Mock Test - Full Syllabus',
      subject: 'All Subjects',
      type: 'test',
      difficulty: 'hard',
      timeEstimate: 180,
      completed: false,
      progress: 0,
      dueTime: '6:00 PM'
    }
  ];

  // Determine time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  const getTimeBasedGreeting = () => {
    const greetings = {
      morning: "Good morning! Ready to conquer today's challenges? 🌅",
      afternoon: "Good afternoon! Let's maintain the momentum! ⚡",
      evening: "Good evening! Time for focused revision! 🌙"
    };
    return greetings[timeOfDay];
  };

  const handleSuggestionAction = (action: string) => {
    switch (action) {
      case 'start-boost':
        navigate('/dashboard/student/concepts');
        break;
      case 'take-break':
        navigate('/dashboard/student/feel-good-corner');
        break;
      case 'start-challenge':
        navigate('/dashboard/student/practice-exam');
        break;
      case 'review-flashcards':
        navigate('/dashboard/student/flashcards');
        break;
    }
  };

  const handleTaskClick = (task: StudyTask) => {
    if (task.type === 'concept') {
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else if (task.type === 'practice') {
      navigate('/dashboard/student/practice-exam');
    } else if (task.type === 'test') {
      navigate('/dashboard/student/practice-exam');
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      case 'revision': return <Brain className="h-4 w-4" />;
      case 'test': return <Award className="h-4 w-4" />;
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
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/student')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
              <Flame className="h-3 w-3 mr-1" />
              {studyStreak} day streak
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
              <TrendingUp className="h-3 w-3 mr-1" />
              Focus Score: {focusScore}%
            </Badge>
          </div>
        </div>

        <div className="text-center mb-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
          >
            {getTimeBasedGreeting()}
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your personalized study plan for {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Daily Progress Overview */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Today's Progress</h3>
                <p className="text-blue-100">Keep up the excellent work!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{dailyProgress}%</div>
                <div className="text-blue-100 text-sm">Daily Goal</div>
              </div>
            </div>
            <Progress value={dailyProgress} className="bg-white/20" />
            <div className="flex justify-between text-sm text-blue-100 mt-2">
              <span>4 hours target</span>
              <span>2.7 hours completed</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 rounded-xl p-1">
          <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
          <TabsTrigger value="suggestions" className="rounded-lg">Smart Suggestions</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Today's Tasks */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Study Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleTaskClick(task)}
                        className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                              task.completed 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-blue-100 text-blue-600'
                            }`}>
                              {task.completed ? <CheckCircle2 className="h-4 w-4" /> : getTaskIcon(task.type)}
                            </div>
                            <div>
                              <h4 className="font-medium group-hover:text-blue-600 transition-colors">
                                {task.title}
                              </h4>
                              <p className="text-sm text-gray-500">{task.subject}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getDifficultyColor(task.difficulty)}>
                              {task.difficulty}
                            </Badge>
                            <div className="text-right">
                              <div className="text-sm font-medium">{task.dueTime}</div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <Timer className="h-3 w-3 mr-1" />
                                {task.timeEstimate}m
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {!task.completed && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-2" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tasks Completed</span>
                    <span className="font-semibold">1/4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Time Spent</span>
                    <span className="font-semibold">2h 42m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Focus Sessions</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Break Time</span>
                    <span className="font-semibold">18m</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Motivation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                    <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-800">
                      "Every expert was once a beginner. Keep pushing forward!"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Smart Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Smart Suggestions
              </CardTitle>
              <p className="text-gray-600">Personalized recommendations based on your progress and performance</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {smartSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 border-l-4 rounded-lg ${getPriorityColor(suggestion.priority)} hover:shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white rounded-full">
                          {suggestion.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{suggestion.title}</h4>
                          <Badge variant="outline" className="text-xs capitalize">
                            {suggestion.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <div>{suggestion.timeEstimate}m</div>
                        <div className="capitalize">{suggestion.priority}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                    
                    <Button
                      size="sm"
                      onClick={() => handleSuggestionAction(suggestion.action)}
                      className="w-full"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Start Now
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{dailyProgress}%</div>
                <div className="text-sm text-gray-600">Daily Progress</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{focusScore}%</div>
                <div className="text-sm text-gray-600">Focus Score</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Flame className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{studyStreak}</div>
                <div className="text-sm text-gray-600">Study Streak</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">Top 15%</div>
                <div className="text-sm text-gray-600">Class Rank</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Voice Assistant */}
      <FloatingVoiceButton 
        userName="Student"
        language="en-US"
      />
    </div>
  );
};

export default PremiumTodaysPlan;
