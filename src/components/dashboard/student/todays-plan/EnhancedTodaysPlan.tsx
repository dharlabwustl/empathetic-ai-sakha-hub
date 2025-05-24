
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
  Volume2, Settings, Award, Users, Flame, Trophy
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
      },
      {
        id: 'concept-2',
        title: "Organic Chemistry Mechanisms",
        subject: "Chemistry",
        type: 'concept',
        status: 'pending',
        timeEstimate: 40,
        priority: 'high',
        difficulty: 'hard'
      },
      {
        id: 'flashcard-2',
        title: "Trigonometry Formulas",
        subject: "Mathematics",
        type: 'flashcard',
        status: 'completed',
        timeEstimate: 20,
        priority: 'low',
        difficulty: 'easy',
        completedAt: new Date().toISOString()
      }
    ];
    setTasks(mockTasks);
  }, []);

  // Enhanced mood-based theme colors with deeper gradients
  const getMoodTheme = (mood: MoodType) => {
    const themes = {
      [MoodType.MOTIVATED]: {
        gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
        accent: 'emerald-500',
        bg: 'emerald-50',
        text: 'emerald-800',
        glow: 'shadow-emerald-500/25',
        secondary: 'from-emerald-100 to-teal-100'
      },
      [MoodType.FOCUSED]: {
        gradient: 'from-blue-500 via-indigo-600 to-purple-700',
        accent: 'blue-500',
        bg: 'blue-50',
        text: 'blue-800',
        glow: 'shadow-blue-500/25',
        secondary: 'from-blue-100 to-indigo-100'
      },
      [MoodType.EXCITED]: {
        gradient: 'from-orange-400 via-pink-500 to-red-600',
        accent: 'orange-500',
        bg: 'orange-50',
        text: 'orange-800',
        glow: 'shadow-orange-500/25',
        secondary: 'from-orange-100 to-pink-100'
      },
      [MoodType.CALM]: {
        gradient: 'from-teal-400 via-cyan-500 to-blue-500',
        accent: 'teal-500',
        bg: 'teal-50',
        text: 'teal-800',
        glow: 'shadow-teal-500/25',
        secondary: 'from-teal-100 to-cyan-100'
      },
      [MoodType.CONFIDENT]: {
        gradient: 'from-violet-500 via-purple-600 to-indigo-700',
        accent: 'violet-500',
        bg: 'violet-50',
        text: 'violet-800',
        glow: 'shadow-violet-500/25',
        secondary: 'from-violet-100 to-purple-100'
      },
      [MoodType.TIRED]: {
        gradient: 'from-slate-400 via-gray-500 to-zinc-600',
        accent: 'slate-500',
        bg: 'slate-50',
        text: 'slate-800',
        glow: 'shadow-slate-500/25',
        secondary: 'from-slate-100 to-gray-100'
      },
      [MoodType.ANXIOUS]: {
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        accent: 'amber-500',
        bg: 'amber-50',
        text: 'amber-800',
        glow: 'shadow-amber-500/25',
        secondary: 'from-amber-100 to-yellow-100'
      },
      [MoodType.STRESSED]: {
        gradient: 'from-red-400 via-rose-500 to-pink-600',
        accent: 'red-500',
        bg: 'red-50',
        text: 'red-800',
        glow: 'shadow-red-500/25',
        secondary: 'from-red-100 to-rose-100'
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
  
  const streakDays = 12; // Mock streak data
  const readinessScore = 87; // Mock readiness score
  const weeklyGoal = 25; // Mock weekly goal (hours)
  const weeklyProgress = 18.5; // Mock weekly progress

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
      <div className="space-y-8">
        {/* Enhanced Gradient Header with Dynamic Theming */}
        <motion.div 
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.gradient} p-8 text-white ${theme.glow} shadow-2xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full blur-md animate-pulse delay-500" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <motion.h1 
                  className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Today's Learning Adventure
                </motion.h1>
                <motion.p 
                  className="text-white/90 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
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
                className="text-right"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl font-bold">{completionPercentage}%</div>
                <div className="text-sm text-white/80">Complete</div>
                <motion.div 
                  className="mt-2 flex items-center gap-2 text-white/90"
                  whileHover={{ scale: 1.05 }}
                >
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">Level: Expert</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Progress Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Target className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div>
                <div className="text-sm text-white/80">Tasks Done</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Clock className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{totalTimeRemaining}m</div>
                <div className="text-sm text-white/80">Remaining</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Flame className="h-6 w-6 mx-auto mb-2 text-orange-300" />
                <div className="text-2xl font-bold">{streakDays}</div>
                <div className="text-sm text-white/80">Day Streak</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{readinessScore}%</div>
                <div className="text-sm text-white/80">Readiness</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Award className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">{weeklyProgress}</div>
                <div className="text-sm text-white/80">Weekly Hours</div>
              </motion.div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Daily Progress</span>
                <span>{completionPercentage}% Complete</span>
              </div>
              <div className="relative">
                <Progress value={completionPercentage} className="h-4 bg-white/20" />
                <motion.div 
                  className="absolute top-0 left-0 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              
              <div className="flex justify-between text-sm mt-2">
                <span>Weekly Goal Progress</span>
                <span>{Math.round((weeklyProgress / weeklyGoal) * 100)}%</span>
              </div>
              <Progress value={(weeklyProgress / weeklyGoal) * 100} className="h-2 bg-white/20" />
            </div>
          </div>
        </motion.div>

        {/* Enhanced Mood Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className={`border-2 border-${theme.accent}/20 bg-gradient-to-r ${theme.secondary} shadow-lg ${theme.glow}`}>
            <CardHeader>
              <CardTitle className={`text-${theme.text} flex items-center gap-2`}>
                <Star className={`h-5 w-5 text-${theme.accent}`} />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MoodSelector 
                currentMood={currentMood} 
                onMoodSelect={setCurrentMood}
                showLabels={true}
              />
              <motion.div 
                className={`mt-4 p-4 bg-white/50 rounded-lg border border-${theme.accent}/20`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className={`text-sm text-${theme.text}`}>
                  {currentMood === MoodType.MOTIVATED && "Great energy! Let's tackle those challenging concepts first."}
                  {currentMood === MoodType.FOCUSED && "Perfect mindset for deep learning. Time for complex problems!"}
                  {currentMood === MoodType.EXCITED && "Amazing enthusiasm! Channel that energy into interactive learning."}
                  {currentMood === MoodType.CALM && "Peaceful state is ideal for steady, consistent progress."}
                  {currentMood === MoodType.CONFIDENT && "Excellent confidence! Ready for advanced topics and tests."}
                  {currentMood === MoodType.TIRED && "Take it easy today. Focus on review and lighter topics."}
                  {currentMood === MoodType.ANXIOUS && "Let's start with familiar topics to build momentum."}
                  {currentMood === MoodType.STRESSED && "Shorter sessions with frequent breaks will help today."}
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
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {['all', 'pending', 'completed', 'concept', 'flashcard', 'quiz'].map((tab) => (
            <motion.div key={tab} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={currentTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTab(tab)}
                className={`capitalize ${
                  currentTab === tab 
                    ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg` 
                    : `border-${theme.accent}/30 hover:bg-${theme.bg}`
                }`}
              >
                {tab}
                {tab !== 'all' && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {tab === 'pending' 
                      ? tasks.filter(t => t.status !== 'completed').length
                      : tab === 'completed'
                      ? completedTasks
                      : tasks.filter(t => t.type === tab).length
                    }
                  </Badge>
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Tasks Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <Card className={`overflow-hidden border-l-4 ${
                  task.priority === 'high' ? 'border-l-red-500' : 
                  task.priority === 'medium' ? 'border-l-amber-500' : 'border-l-blue-500'
                } hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 ${theme.glow}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`p-2 rounded-lg bg-gradient-to-br from-${theme.accent}/10 to-${theme.accent}/20`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {getTaskIcon(task.type)}
                        </motion.div>
                        <div>
                          <Badge variant="outline" className="text-xs mb-1">
                            {task.subject}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={task.priority === 'high' ? 'destructive' : 'secondary'} 
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {task.status === 'completed' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-3 line-clamp-2">
                      {task.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.timeEstimate} min</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          task.difficulty === 'hard' ? 'border-red-200 text-red-700 bg-red-50' :
                          task.difficulty === 'medium' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                          'border-green-200 text-green-700 bg-green-50'
                        }`}
                      >
                        {task.difficulty}
                      </Badge>
                    </div>

                    {task.smartTip && (
                      <motion.div 
                        className={`p-3 bg-gradient-to-r ${theme.secondary} rounded-lg text-sm text-${theme.text} mb-4 border border-${theme.accent}/20`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="flex items-start gap-2">
                          <Zap className={`h-4 w-4 text-${theme.accent} mt-0.5 flex-shrink-0`} />
                          <span>{task.smartTip}</span>
                        </div>
                      </motion.div>
                    )}

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        className={`w-full bg-gradient-to-r ${theme.gradient} hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskClick(task);
                        }}
                      >
                        {task.status === 'completed' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Review Again
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Learning
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Audio Learning Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className={`bg-gradient-to-r ${theme.secondary} border-${theme.accent}/20 ${theme.glow}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className={`h-5 w-5 text-${theme.accent}`} />
                Audio Learning Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 flex-wrap">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={isAudioPlaying ? "destructive" : "default"}
                    onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    className={`flex items-center gap-2 ${
                      !isAudioPlaying ? `bg-gradient-to-r ${theme.gradient}` : ''
                    }`}
                  >
                    {isAudioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isAudioPlaying ? 'Pause' : 'Play'} Study Guide
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className={`border-${theme.accent}/30`}>
                    <Settings className="h-4 w-4 mr-2" />
                    Audio Settings
                  </Button>
                </motion.div>
                
                <div className={`flex items-center gap-2 text-sm text-${theme.text} bg-white/50 px-3 py-2 rounded-lg`}>
                  <Users className="h-4 w-4" />
                  <span>Study with 247 other students online</span>
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
