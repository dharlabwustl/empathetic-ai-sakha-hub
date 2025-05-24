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
  Volume2, Settings, Award, Users, MessageSquare, Lightbulb
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
}

const EnhancedTodaysPlan: React.FC = () => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState<MoodType>(MoodType.MOTIVATED);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTab, setCurrentTab] = useState('all');
  const [weeklyProgress, setWeeklyProgress] = useState(73);
  const [streakCount, setStreakCount] = useState(7);
  const [readinessScore, setReadinessScore] = useState(85);

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
        smartTip: "Focus on understanding the relationship between force, mass, and acceleration"
      },
      {
        id: 'flashcard-1',
        title: "Chemical Bonds Flashcards",
        subject: "Chemistry", 
        type: 'flashcard',
        status: 'in-progress',
        timeEstimate: 30,
        priority: 'medium',
        difficulty: 'medium'
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
        completedAt: new Date().toISOString()
      }
    ];
    setTasks(mockTasks);
  }, []);

  // Enhanced mood-based theme colors with more vibrant gradients
  const getMoodTheme = (mood: MoodType) => {
    const themes = {
      [MoodType.MOTIVATED]: {
        gradient: 'from-emerald-400 via-teal-500 to-blue-600',
        accent: 'emerald-500',
        bg: 'emerald-50',
        text: 'emerald-800',
        shadow: 'shadow-emerald-500/25',
        glow: 'shadow-2xl shadow-emerald-500/20'
      },
      [MoodType.FOCUSED]: {
        gradient: 'from-blue-500 via-indigo-600 to-purple-700',
        accent: 'blue-500',
        bg: 'blue-50',
        text: 'blue-800',
        shadow: 'shadow-blue-500/25',
        glow: 'shadow-2xl shadow-blue-500/20'
      },
      [MoodType.EXCITED]: {
        gradient: 'from-orange-400 via-pink-500 to-red-600',
        accent: 'orange-500',
        bg: 'orange-50',
        text: 'orange-800',
        shadow: 'shadow-orange-500/25',
        glow: 'shadow-2xl shadow-orange-500/20'
      },
      [MoodType.CALM]: {
        gradient: 'from-teal-400 via-cyan-500 to-blue-500',
        accent: 'teal-500',
        bg: 'teal-50',
        text: 'teal-800',
        shadow: 'shadow-teal-500/25',
        glow: 'shadow-2xl shadow-teal-500/20'
      },
      [MoodType.CONFIDENT]: {
        gradient: 'from-violet-500 via-purple-600 to-indigo-700',
        accent: 'violet-500',
        bg: 'violet-50',
        text: 'violet-800',
        shadow: 'shadow-violet-500/25',
        glow: 'shadow-2xl shadow-violet-500/20'
      },
      [MoodType.TIRED]: {
        gradient: 'from-slate-400 via-gray-500 to-zinc-600',
        accent: 'slate-500',
        bg: 'slate-50',
        text: 'slate-800',
        shadow: 'shadow-slate-500/25',
        glow: 'shadow-2xl shadow-slate-500/20'
      },
      [MoodType.ANXIOUS]: {
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        accent: 'amber-500',
        bg: 'amber-50',
        text: 'amber-800',
        shadow: 'shadow-amber-500/25',
        glow: 'shadow-2xl shadow-amber-500/20'
      },
      [MoodType.STRESSED]: {
        gradient: 'from-red-400 via-rose-500 to-pink-600',
        accent: 'red-500',
        bg: 'red-50',
        text: 'red-800',
        shadow: 'shadow-red-500/25',
        glow: 'shadow-2xl shadow-red-500/20'
      }
    };
    return themes[mood] || themes[MoodType.MOTIVATED];
  };

  const theme = getMoodTheme(currentMood);

  // Calculate progress metrics
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalTimeRemaining = tasks
    .filter(task => task.status !== 'completed')
    .reduce((total, task) => total + task.timeEstimate, 0);

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

  const filteredTasks = currentTab === 'all' 
    ? tasks 
    : tasks.filter(task => 
        currentTab === 'pending' ? task.status !== 'completed' :
        currentTab === 'completed' ? task.status === 'completed' :
        task.type === currentTab
      );

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle="Your personalized learning journey"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Enhanced Dynamic Gradient Header */}
        <motion.div 
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.gradient} p-8 text-white ${theme.glow}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <motion.div 
            className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text">
                  Today's Learning Adventure
                </h1>
                <p className="text-white/90 text-lg">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </motion.div>
              <motion.div 
                className="text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div 
                  className="text-3xl font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {completionPercentage}%
                </motion.div>
                <div className="text-sm text-white/80">Complete</div>
              </motion.div>
            </div>

            {/* Enhanced Progress Metrics */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                transition={{ duration: 0.2 }}
              >
                <Target className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div>
                <div className="text-sm text-white/80">Tasks Done</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{totalTimeRemaining}m</div>
                <div className="text-sm text-white/80">Remaining</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                transition={{ duration: 0.2 }}
              >
                <Zap className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{streakCount}</div>
                <div className="text-sm text-white/80">Day Streak</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                transition={{ duration: 0.2 }}
              >
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{readinessScore}%</div>
                <div className="text-sm text-white/80">Readiness</div>
              </motion.div>

              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                transition={{ duration: 0.2 }}
              >
                <Award className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{weeklyProgress}%</div>
                <div className="text-sm text-white/80">Weekly</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Progress value={completionPercentage} className="h-4 bg-white/20 rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Mood Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className={`border-2 ${theme.shadow} bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50`}>
            <CardHeader>
              <CardTitle className={`text-${theme.text} flex items-center gap-2`}>
                <Star className="h-5 w-5" />
                How are you feeling today?
                <Badge variant="outline" className="ml-auto">
                  Mood affects your study plan
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MoodSelector 
                currentMood={currentMood} 
                onMoodSelect={setCurrentMood}
                showLabels={true}
              />
              <motion.div 
                className={`mt-4 p-3 bg-${theme.bg} rounded-lg border border-${theme.accent}/20`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className={`text-sm text-${theme.text}`}>
                  Based on your {currentMood} mood, we've optimized your study plan for better engagement and retention.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Task Filters */}
        <motion.div 
          className="flex gap-2 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {['all', 'pending', 'completed', 'concept', 'flashcard', 'quiz'].map((tab) => (
            <motion.div key={tab} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={currentTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTab(tab)}
                className={`capitalize transition-all duration-200 ${
                  currentTab === tab ? `bg-${theme.accent} ${theme.shadow} text-white` : `hover:bg-${theme.bg}`
                }`}
              >
                {tab}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Tasks Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="cursor-pointer group"
                onClick={() => handleTaskClick(task)}
              >
                <Card className={`overflow-hidden border-l-4 ${
                  task.priority === 'high' ? 'border-l-red-500' : 
                  task.priority === 'medium' ? 'border-l-amber-500' : 'border-l-blue-500'
                } hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50/30 to-white group-hover:from-gray-50 group-hover:to-white`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className={`p-2 rounded-lg bg-${theme.accent}/10 group-hover:bg-${theme.accent}/20 transition-colors`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {getTaskIcon(task.type)}
                        </motion.div>
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {task.subject}
                          </Badge>
                        </div>
                      </div>
                      {task.status === 'completed' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {task.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Clock className="h-4 w-4" />
                      <span>{task.timeEstimate} min</span>
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

                    {task.smartTip && (
                      <motion.div 
                        className={`p-3 bg-${theme.bg}/50 rounded-lg text-sm text-${theme.text} mb-3 border border-${theme.accent}/10`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 mt-0.5 text-yellow-500" />
                          <span>{task.smartTip}</span>
                        </div>
                      </motion.div>
                    )}

                    <Button 
                      className={`w-full bg-gradient-to-r from-${theme.accent} to-${theme.accent}/80 hover:from-${theme.accent}/90 hover:to-${theme.accent}/70 transition-all duration-200 ${theme.shadow}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTaskClick(task);
                      }}
                    >
                      {task.status === 'completed' ? (
                        <motion.div 
                          className="flex items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Review
                        </motion.div>
                      ) : (
                        <motion.div 
                          className="flex items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Learning
                        </motion.div>
                      )}
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
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <Card className={`${theme.shadow} bg-gradient-to-r from-white to-gray-50/50`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                AI-Powered Audio Learning
                <Badge variant="outline" className="ml-auto">
                  Voice Assistant Ready
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 flex-wrap">
                <Button
                  variant={isAudioPlaying ? "destructive" : "default"}
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                  className="flex items-center gap-2"
                >
                  {isAudioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isAudioPlaying ? 'Pause' : 'Play'} Study Guide
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Ask AI Tutor
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Audio Settings
                </Button>

                <div className="ml-auto text-sm text-gray-600">
                  Enhanced with voice recognition and real-time feedback
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
