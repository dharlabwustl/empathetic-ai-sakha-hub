
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { 
  Calendar, Clock, BookOpen, Brain, FileText, Target, 
  Play, Pause, CheckCircle, Star, TrendingUp, Zap,
  Volume2, Settings, Award, Users, Lightbulb, Bot,
  BarChart3, Trophy, Flame, ChevronRight
} from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface Task {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'quiz' | 'revision';
  status: 'pending' | 'in-progress' | 'completed';
  timeEstimate: number;
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  isBacklog?: boolean;
  smartTip?: string;
  completedAt?: string;
  progress?: number;
}

interface TabProgress {
  tabName: string;
  completed: number;
  total: number;
  percentage: number;
}

const EnhancedTodaysPlan: React.FC = () => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState<MoodType>(MoodType.MOTIVATED);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTab, setCurrentTab] = useState('all');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [tabProgress, setTabProgress] = useState<TabProgress[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: 'concept-1',
        title: "Newton's Laws of Motion",
        subject: "Physics",
        type: 'concept',
        status: 'pending',
        timeEstimate: 45,
        priority: 'high',
        difficulty: 'medium',
        smartTip: "Focus on understanding the relationship between force, mass, and acceleration",
        progress: 0
      },
      {
        id: 'flashcard-1',
        title: "Chemical Bonds Flashcards",
        subject: "Chemistry", 
        type: 'flashcard',
        status: 'in-progress',
        timeEstimate: 30,
        priority: 'medium',
        difficulty: 'medium',
        progress: 60
      },
      {
        id: 'quiz-1',
        title: "Calculus Integration Quiz",
        subject: "Mathematics",
        type: 'quiz',
        status: 'completed',
        timeEstimate: 25,
        priority: 'medium',
        difficulty: 'hard',
        completedAt: new Date().toISOString(),
        progress: 100
      }
    ];
    setTasks(mockTasks);

    // Initialize tab progress
    const initialProgress: TabProgress[] = [
      { tabName: 'concepts', completed: 1, total: 3, percentage: 33 },
      { tabName: 'flashcards', completed: 2, total: 4, percentage: 50 },
      { tabName: 'practice', completed: 3, total: 5, percentage: 60 },
      { tabName: 'revision', completed: 1, total: 2, percentage: 50 }
    ];
    setTabProgress(initialProgress);
  }, []);

  // Mood-based theme colors with enhanced gradients
  const getMoodTheme = (mood: MoodType) => {
    const themes = {
      [MoodType.MOTIVATED]: {
        gradient: 'from-emerald-400 via-teal-500 to-blue-600',
        accent: 'emerald-500',
        bg: 'emerald-50',
        text: 'emerald-800',
        cardBg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        glowColor: 'emerald-400'
      },
      [MoodType.FOCUSED]: {
        gradient: 'from-blue-500 via-indigo-600 to-purple-700',
        accent: 'blue-500',
        bg: 'blue-50',
        text: 'blue-800',
        cardBg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
        glowColor: 'blue-400'
      },
      [MoodType.EXCITED]: {
        gradient: 'from-orange-400 via-pink-500 to-red-600',
        accent: 'orange-500',
        bg: 'orange-50',
        text: 'orange-800',
        cardBg: 'bg-gradient-to-br from-orange-50 to-pink-50',
        glowColor: 'orange-400'
      },
      [MoodType.CALM]: {
        gradient: 'from-teal-400 via-cyan-500 to-blue-500',
        accent: 'teal-500',
        bg: 'teal-50',
        text: 'teal-800',
        cardBg: 'bg-gradient-to-br from-teal-50 to-cyan-50',
        glowColor: 'teal-400'
      },
      [MoodType.CONFIDENT]: {
        gradient: 'from-violet-500 via-purple-600 to-indigo-700',
        accent: 'violet-500',
        bg: 'violet-50',
        text: 'violet-800',
        cardBg: 'bg-gradient-to-br from-violet-50 to-purple-50',
        glowColor: 'violet-400'
      },
      [MoodType.TIRED]: {
        gradient: 'from-slate-400 via-gray-500 to-zinc-600',
        accent: 'slate-500',
        bg: 'slate-50',
        text: 'slate-800',
        cardBg: 'bg-gradient-to-br from-slate-50 to-gray-50',
        glowColor: 'slate-400'
      },
      [MoodType.ANXIOUS]: {
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        accent: 'amber-500',
        bg: 'amber-50',
        text: 'amber-800',
        cardBg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
        glowColor: 'amber-400'
      },
      [MoodType.STRESSED]: {
        gradient: 'from-red-400 via-rose-500 to-pink-600',
        accent: 'red-500',
        bg: 'red-50',
        text: 'red-800',
        cardBg: 'bg-gradient-to-br from-red-50 to-rose-50',
        glowColor: 'red-400'
      }
    };
    return themes[mood] || themes[MoodType.MOTIVATED];
  };

  const theme = getMoodTheme(currentMood);

  // Calculate enhanced progress metrics
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalTimeRemaining = tasks
    .filter(task => task.status !== 'completed')
    .reduce((total, task) => total + task.timeEstimate, 0);
  
  // Enhanced metrics
  const streakDays = 7;
  const readinessScore = 85;
  const weeklyProgress = 78;

  const handleTaskClick = (task: Task) => {
    if (task.type === 'concept') {
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else if (task.type === 'flashcard') {
      navigate('/dashboard/student/flashcards');
    } else if (task.type === 'quiz') {
      navigate('/dashboard/student/practice-exam');
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5" />;
      case 'flashcard': return <Brain className="h-5 w-5" />;
      case 'quiz': return <FileText className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-amber-500 bg-amber-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const filteredTasks = currentTab === 'all' 
    ? tasks 
    : tasks.filter(task => 
        currentTab === 'pending' ? task.status !== 'completed' :
        currentTab === 'completed' ? task.status === 'completed' :
        task.type === currentTab
      );

  const handleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
    if ('speechSynthesis' in window && !showAIAssistant) {
      const utterance = new SpeechSynthesisUtterance(
        "Hello! I'm your AI study assistant. I can help you understand concepts, explain difficult topics, and guide you through your study plan. How can I assist you today?"
      );
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle="Your personalized learning journey"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Enhanced Gradient Header with Dynamic Theming */}
        <motion.div 
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.gradient} p-8 text-white shadow-2xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            boxShadow: `0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)`
          }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/10"></div>
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <motion.h1 
                  className="text-4xl font-bold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Today's Learning Adventure ✨
                </motion.h1>
                <motion.p 
                  className="text-white/90 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </motion.p>
              </div>
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-right">
                  <div className="text-3xl font-bold">{completionPercentage}%</div>
                  <div className="text-sm text-white/80">Complete</div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAIAssistant}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  AI Assistant
                </Button>
              </motion.div>
            </div>

            {/* Enhanced Progress Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                {
                  icon: Target,
                  value: `${completedTasks}/${totalTasks}`,
                  label: "Tasks Done",
                  color: "bg-white/20"
                },
                {
                  icon: Clock,
                  value: `${totalTimeRemaining}m`,
                  label: "Remaining",
                  color: "bg-white/20"
                },
                {
                  icon: Flame,
                  value: `${streakDays}`,
                  label: "Day Streak",
                  color: "bg-white/20"
                },
                {
                  icon: TrendingUp,
                  value: `${readinessScore}%`,
                  label: "Readiness",
                  color: "bg-white/20"
                },
                {
                  icon: BarChart3,
                  value: `${weeklyProgress}%`,
                  label: "Weekly Progress",
                  color: "bg-white/20"
                }
              ].map((metric, index) => (
                <motion.div 
                  key={index}
                  className={`${metric.color} backdrop-blur-sm rounded-xl p-4 text-center`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <metric.icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-white/80">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <Progress value={completionPercentage} className="h-4 bg-white/20" />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Mood Selection with Complete Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className={`border-2 ${theme.cardBg} border-${theme.accent}/20 shadow-lg`}>
            <CardHeader>
              <CardTitle className={`text-${theme.text} flex items-center gap-2`}>
                <Star className="h-5 w-5" />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MoodSelector 
                currentMood={currentMood} 
                onMoodSelect={setCurrentMood}
                showLabels={true}
              />
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <p className="text-sm text-gray-700">
                  Your mood affects your study recommendations. Choose how you're feeling to get personalized suggestions!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Tracking Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tabProgress.map((progress, index) => (
                  <motion.div
                    key={progress.tabName}
                    className="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border"
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <h4 className="font-medium capitalize mb-2">{progress.tabName}</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {progress.completed}/{progress.total}
                    </div>
                    <Progress value={progress.percentage} className="h-2 mb-2" />
                    <div className="text-sm text-gray-500">{progress.percentage}% complete</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Assistant Panel */}
        <AnimatePresence>
          {showAIAssistant && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Bot className="h-5 w-5" />
                    AI Study Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-blue-700">
                      Hello! I'm here to help you with your studies. I can explain concepts, provide study tips, 
                      and help you understand difficult topics. What would you like to learn about today?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                        Explain Newton's Laws
                      </Button>
                      <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                        Study Tips
                      </Button>
                      <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                        Quiz Me
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task Filters */}
        <motion.div 
          className="flex gap-2 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {['all', 'pending', 'completed', 'concept', 'flashcard', 'quiz'].map((tab) => (
            <Button
              key={tab}
              variant={currentTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentTab(tab)}
              className={`capitalize transition-all duration-200 ${
                currentTab === tab 
                  ? `bg-${theme.accent} text-white shadow-lg` 
                  : 'hover:scale-105'
              }`}
            >
              {tab}
            </Button>
          ))}
        </motion.div>

        {/* Enhanced Interactive Task Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <Card className={`overflow-hidden border-l-4 ${getPriorityColor(task.priority)} hover:shadow-2xl transition-all duration-300 ${theme.cardBg}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`p-3 rounded-xl bg-${theme.accent}/10`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {getTaskIcon(task.type)}
                        </motion.div>
                        <div>
                          <Badge variant="outline" className="text-xs mb-1">
                            {task.subject}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              task.priority === 'high' ? 'border-red-200 text-red-700 bg-red-50' :
                              task.priority === 'medium' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                              'border-blue-200 text-blue-700 bg-blue-50'
                            }`}
                          >
                            {task.priority} priority
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {task.status === 'completed' && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {task.progress !== undefined && (
                          <div className="text-xs text-gray-500">
                            {task.progress}%
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-3 line-clamp-2">
                      {task.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.timeEstimate} min</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          task.difficulty === 'hard' ? 'border-red-200 text-red-700' :
                          task.difficulty === 'medium' ? 'border-amber-200 text-amber-700' :
                          'border-green-200 text-green-700'
                        }`}
                      >
                        {task.difficulty}
                      </Badge>
                    </div>

                    {task.progress !== undefined && task.status !== 'completed' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                    )}

                    {task.smartTip && (
                      <motion.div 
                        className={`p-3 ${theme.cardBg} rounded-lg text-sm text-${theme.text} mb-3 border border-${theme.accent}/20`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{task.smartTip}</span>
                        </div>
                      </motion.div>
                    )}

                    <Button 
                      className={`w-full bg-gradient-to-r from-${theme.accent} to-${theme.accent}/80 hover:from-${theme.accent}/90 hover:to-${theme.accent}/70 group`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTaskClick(task);
                      }}
                    >
                      {task.status === 'completed' ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Review
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start Learning
                        </>
                      )}
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Audio Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Audio Learning Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button
                  variant={isAudioPlaying ? "destructive" : "default"}
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                  className="flex items-center gap-2"
                >
                  {isAudioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isAudioPlaying ? 'Pause' : 'Play'} Study Guide
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Audio Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
