
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
  Volume2, Settings, Award, Users, Lightbulb, AlertTriangle
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
      }
    ];
    setTasks(mockTasks);
  }, []);

  // Mood-based theme colors
  const getMoodTheme = (mood: MoodType) => {
    const themes = {
      [MoodType.MOTIVATED]: {
        gradient: 'from-emerald-400 via-teal-500 to-blue-600',
        accent: 'emerald-500',
        bg: 'emerald-50',
        text: 'emerald-800'
      },
      [MoodType.FOCUSED]: {
        gradient: 'from-blue-500 via-indigo-600 to-purple-700',
        accent: 'blue-500',
        bg: 'blue-50',
        text: 'blue-800'
      },
      [MoodType.EXCITED]: {
        gradient: 'from-orange-400 via-pink-500 to-red-600',
        accent: 'orange-500',
        bg: 'orange-50',
        text: 'orange-800'
      },
      [MoodType.CALM]: {
        gradient: 'from-teal-400 via-cyan-500 to-blue-500',
        accent: 'teal-500',
        bg: 'teal-50',
        text: 'teal-800'
      },
      [MoodType.CONFIDENT]: {
        gradient: 'from-violet-500 via-purple-600 to-indigo-700',
        accent: 'violet-500',
        bg: 'violet-50',
        text: 'violet-800'
      },
      [MoodType.TIRED]: {
        gradient: 'from-slate-400 via-gray-500 to-zinc-600',
        accent: 'slate-500',
        bg: 'slate-50',
        text: 'slate-800'
      },
      [MoodType.ANXIOUS]: {
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        accent: 'amber-500',
        bg: 'amber-50',
        text: 'amber-800'
      },
      [MoodType.STRESSED]: {
        gradient: 'from-red-400 via-rose-500 to-pink-600',
        accent: 'red-500',
        bg: 'red-50',
        text: 'red-800'
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
        {/* Beautiful Gradient Header */}
        <motion.div 
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.gradient} p-8 text-white shadow-2xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Star className="h-8 w-8 text-white/60" />
            </motion.div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <motion.h1 
                  className="text-3xl font-bold mb-2"
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
                  transition={{ delay: 0.3 }}
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
                transition={{ delay: 0.4 }}
              >
                <div className="text-right">
                  <div className="text-3xl font-bold">{completionPercentage}%</div>
                  <div className="text-sm text-white/80">Complete</div>
                </div>
                <motion.div
                  animate={{ rotate: completionPercentage * 3.6 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative w-16 h-16"
                >
                  <div className="w-16 h-16 rounded-full border-4 border-white/30"></div>
                  <div 
                    className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-white border-r-transparent transform -rotate-90"
                    style={{ 
                      background: `conic-gradient(from 0deg, white ${completionPercentage * 3.6}deg, transparent ${completionPercentage * 3.6}deg)`
                    }}
                  ></div>
                </motion.div>
              </motion.div>
            </div>

            {/* Progress Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Target, value: `${completedTasks}/${totalTasks}`, label: 'Tasks Done', delay: 0.1 },
                { icon: Clock, value: `${totalTimeRemaining}m`, label: 'Remaining', delay: 0.2 },
                { icon: Zap, value: '7', label: 'Day Streak', delay: 0.3 },
                { icon: TrendingUp, value: '85%', label: 'Readiness', delay: 0.4 }
              ].map(({ icon: Icon, value, label, delay }, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + delay }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{value}</div>
                  <div className="text-sm text-white/80">{label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Progress value={completionPercentage} className="h-3 bg-white/20" />
            </motion.div>
          </div>
        </motion.div>

        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className={`border-2 border-${theme.accent}/20 bg-gradient-to-r from-${theme.bg}/30 to-white/50`}>
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
            </CardContent>
          </Card>
        </motion.div>

        {/* Task Filters */}
        <motion.div 
          className="flex gap-2 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {['all', 'pending', 'completed', 'concept', 'flashcard', 'quiz'].map((tab, index) => (
            <motion.div
              key={tab}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Button
                variant={currentTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTab(tab)}
                className={`capitalize transition-all ${
                  currentTab === tab 
                    ? `bg-gradient-to-r from-${theme.accent} to-${theme.accent}/80 text-white shadow-lg` 
                    : 'hover:shadow-md'
                }`}
              >
                {tab}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Tasks Grid */}
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
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <Card className={`overflow-hidden border-l-4 border-l-${
                  task.priority === 'high' ? 'red-500' : 
                  task.priority === 'medium' ? 'amber-500' : 'blue-500'
                } hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 group`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className={`p-2 rounded-lg bg-gradient-to-r from-${theme.accent}/10 to-${theme.accent}/20`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          {getTaskIcon(task.type)}
                        </motion.div>
                        <div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs bg-gradient-to-r from-${theme.bg} to-white`}
                          >
                            {task.subject}
                          </Badge>
                        </div>
                      </div>
                      {task.status === 'completed' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
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
                        className={`p-3 bg-gradient-to-r from-${theme.bg}/50 to-${theme.bg}/30 rounded-lg text-sm text-${theme.text} mb-3 border border-${theme.accent}/20`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span>{task.smartTip}</span>
                        </div>
                      </motion.div>
                    )}

                    {task.isBacklog && (
                      <div className="flex items-center gap-2 text-amber-600 mb-3">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-xs">Backlog Task</span>
                      </div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className={`w-full bg-gradient-to-r from-${theme.accent} to-${theme.accent}/80 hover:from-${theme.accent}/90 hover:to-${theme.accent}/70 shadow-lg hover:shadow-xl transition-all`}
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
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Audio Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-blue-600" />
                Audio Learning Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button
                  variant={isAudioPlaying ? "destructive" : "default"}
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                  className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
                >
                  {isAudioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isAudioPlaying ? 'Pause' : 'Play'} Study Guide
                </Button>
                <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md">
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
