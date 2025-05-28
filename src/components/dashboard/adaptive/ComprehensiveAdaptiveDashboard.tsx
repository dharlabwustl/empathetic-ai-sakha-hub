
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { 
  Clock, 
  AlertTriangle, 
  Target, 
  BookOpen, 
  Brain, 
  FileText, 
  Calendar,
  Zap,
  TrendingUp,
  Timer,
  Flame,
  Trophy,
  CheckCircle,
  XCircle,
  Play,
  Lightbulb,
  Volume2,
  Eye,
  Move,
  BarChart3,
  Star,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  examProximity: 'critical' | 'urgent' | 'moderate' | 'relaxed';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  [key: string]: any;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  examProximity,
  learningStyle,
  currentMood,
  onMoodChange,
  ...otherProps
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>(currentMood || MoodType.MOTIVATED);

  // Exam proximity configuration
  const proximityConfig = useMemo(() => {
    const configs = {
      critical: {
        theme: 'from-red-50 to-orange-50',
        primary: 'bg-red-600',
        secondary: 'bg-red-100',
        accent: 'text-red-700',
        border: 'border-red-300',
        urgency: 'CRITICAL',
        urgencyColor: 'text-red-800 bg-red-100',
        actions: ['Last-minute revisions', 'Mock tests', 'Formula sheets'],
        message: 'Focus on high-yield topics only!'
      },
      urgent: {
        theme: 'from-orange-50 to-yellow-50',
        primary: 'bg-orange-600',
        secondary: 'bg-orange-100',
        accent: 'text-orange-700',
        border: 'border-orange-300',
        urgency: 'HIGH',
        urgencyColor: 'text-orange-800 bg-orange-100',
        actions: ['High-yield concepts', 'Practice tests', 'Quick revisions'],
        message: 'Prioritize weak areas!'
      },
      moderate: {
        theme: 'from-blue-50 to-indigo-50',
        primary: 'bg-blue-600',
        secondary: 'bg-blue-100',
        accent: 'text-blue-700',
        border: 'border-blue-300',
        urgency: 'MODERATE',
        urgencyColor: 'text-blue-800 bg-blue-100',
        actions: ['Balanced study', 'New topics', 'Regular practice'],
        message: 'Maintain steady progress!'
      },
      relaxed: {
        theme: 'from-green-50 to-emerald-50',
        primary: 'bg-green-600',
        secondary: 'bg-green-100',
        accent: 'text-green-700',
        border: 'border-green-300',
        urgency: 'PLANNED',
        urgencyColor: 'text-green-800 bg-green-100',
        actions: ['Explore concepts', 'Build foundation', 'Practice variety'],
        message: 'Build strong fundamentals!'
      }
    };
    return configs[examProximity];
  }, [examProximity]);

  // Learning style adaptation
  const learningStyleConfig = useMemo(() => {
    const configs = {
      visual: {
        icon: Eye,
        widgets: ['Concept Maps', 'Mind Maps', 'Charts & Graphs', 'Infographics'],
        color: 'blue',
        suggestion: 'Visual learner detected - try concept mapping!'
      },
      auditory: {
        icon: Volume2,
        widgets: ['Voice Notes', 'Audio Summaries', 'Podcasts', 'Discussion'],
        color: 'purple',
        suggestion: 'Audio learning works best for you!'
      },
      kinesthetic: {
        icon: Move,
        widgets: ['Interactive Quizzes', 'Flashcards', 'Simulations', 'Practice'],
        color: 'green',
        suggestion: 'Hands-on practice will boost your learning!'
      },
      reading: {
        icon: BookOpen,
        widgets: ['Text Notes', 'Reading Lists', 'Articles', 'Study Guides'],
        color: 'orange',
        suggestion: 'Reading and writing will enhance your understanding!'
      }
    };
    return configs[learningStyle];
  }, [learningStyle]);

  // Exam goal configuration
  const examGoalConfig = useMemo(() => {
    const goal = userProfile.examGoal || 'NEET';
    const configs = {
      NEET: {
        subjects: [
          { name: 'Physics', priority: 'high', accuracy: 42, color: 'blue', weak: true },
          { name: 'Chemistry', priority: 'medium', accuracy: 68, color: 'green', weak: false },
          { name: 'Biology', priority: 'high', accuracy: 56, color: 'purple', weak: true }
        ],
        totalMarks: 720,
        pattern: '180 questions, 720 marks'
      },
      JEE: {
        subjects: [
          { name: 'Mathematics', priority: 'critical', accuracy: 38, color: 'red', weak: true },
          { name: 'Physics', priority: 'high', accuracy: 52, color: 'blue', weak: true },
          { name: 'Chemistry', priority: 'medium', accuracy: 71, color: 'green', weak: false }
        ],
        totalMarks: 300,
        pattern: '75 questions, 300 marks'
      }
    };
    return configs[goal as keyof typeof configs] || configs.NEET;
  }, [userProfile.examGoal]);

  // Calculate days left
  const daysLeft = useMemo(() => {
    if (!userProfile.examDate) return null;
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    return Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }, [userProfile.examDate]);

  // Mood options
  const moodOptions = [
    { mood: MoodType.MOTIVATED, emoji: '🚀', label: 'Motivated' },
    { mood: MoodType.FOCUSED, emoji: '🎯', label: 'Focused' },
    { mood: MoodType.TIRED, emoji: '😴', label: 'Tired' },
    { mood: MoodType.ANXIOUS, emoji: '😰', label: 'Anxious' },
    { mood: MoodType.HAPPY, emoji: '😊', label: 'Happy' },
    { mood: MoodType.STRESSED, emoji: '😤', label: 'Stressed' }
  ];

  const handleMoodChange = (mood: MoodType) => {
    setSelectedMood(mood);
    onMoodChange?.(mood);
  };

  // Smart greeting based on streak and mood
  const getSmartGreeting = () => {
    const streak = userProfile.studyStreak || 0;
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    if (streak >= 7) return `${timeGreeting}, Champion! 🏆`;
    if (streak >= 3) return `${timeGreeting}, Star Learner! ⭐`;
    if (selectedMood === MoodType.MOTIVATED) return `${timeGreeting}, Ready to conquer! 💪`;
    return `${timeGreeting}, ${userProfile.name || 'Student'}! 👋`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${proximityConfig.theme} p-6`}>
      {/* 1. User Overview Strip */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-gray-900">
              {getSmartGreeting()}
            </div>
            <Badge className={`${proximityConfig.urgencyColor} font-semibold px-3 py-1`}>
              {proximityConfig.urgency}
            </Badge>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600">Goal</div>
              <div className="font-bold text-gray-900">{userProfile.examGoal || 'NEET'}</div>
            </div>
            
            {daysLeft && (
              <div className="text-center">
                <div className="text-sm text-gray-600">Days Left</div>
                <div className={`font-bold text-2xl ${proximityConfig.accent}`}>
                  {daysLeft}
                </div>
              </div>
            )}

            <div className="text-center">
              <div className="text-sm text-gray-600">Learning Style</div>
              <div className="flex items-center gap-1">
                <learningStyleConfig.icon className="h-4 w-4" />
                <span className="font-medium capitalize">{learningStyle}</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Mood</div>
              <div className="flex gap-1">
                {moodOptions.slice(0, 3).map(({ mood, emoji }) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodChange(mood)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      selectedMood === mood ? 'bg-blue-100 scale-110' : 'hover:bg-gray-100'
                    }`}
                    title={mood}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Priority Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Top Priority */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Today's Top Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-lg font-semibold">
                  Revise {examGoalConfig.subjects.find(s => s.weak)?.name || 'Physics'}
                </div>
                <div className="text-sm text-red-700">
                  Accuracy: {examGoalConfig.subjects.find(s => s.weak)?.accuracy || 42}% - Needs improvement
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Countdown Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={`border-2 ${proximityConfig.border}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Countdown Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-600">
                  {proximityConfig.message}
                </div>
                {proximityConfig.actions.map((action, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Study Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Calendar className="h-5 w-5" />
                Daily Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm font-medium">Today's Schedule</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Physics</span>
                    <span className="text-sm font-medium">2.5h</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Full Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 3. Smart Study Hub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <learningStyleConfig.icon className="h-6 w-6" />
              Smart Study Hub - {learningStyle.charAt(0).toUpperCase() + learningStyle.slice(1)} Learning
            </CardTitle>
            <p className="text-sm text-gray-600">{learningStyleConfig.suggestion}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {learningStyleConfig.widgets.map((widget, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col gap-2 hover:shadow-md transition-all"
                >
                  <Brain className="h-5 w-5" />
                  <span className="text-xs text-center">{widget}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 4. Performance Zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Exam Readiness */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
              <div className="text-sm text-gray-600 mb-3">Exam Readiness</div>
              <Progress value={78} className="h-3" />
              <div className="text-xs text-green-600 mt-2">↑ +5% this week</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Study Streak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <div className="text-3xl font-bold text-orange-600">
                  {userProfile.studyStreak || 5}
                </div>
              </div>
              <div className="text-sm text-gray-600">Day Streak</div>
              <div className="text-xs text-orange-600 mt-2">Keep it up! 🔥</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weak Areas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="text-center border-red-200">
            <CardContent className="pt-6">
              <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-sm font-medium text-red-700 mb-3">
                {examGoalConfig.subjects.filter(s => s.weak).length} Weak Areas
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                Improve Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Strong Areas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="text-center border-green-200">
            <CardContent className="pt-6">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-sm font-medium text-green-700 mb-3">
                {examGoalConfig.subjects.filter(s => !s.weak).length} Strong Areas
              </div>
              <Button size="sm" variant="outline" className="border-green-600 text-green-600">
                Advance Practice
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 5. Tips + Micro-Coach Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Lightbulb className="h-6 w-6" />
              Smart Tips & Micro-Coach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-700">Daily Tip</h4>
                <p className="text-sm text-gray-700">
                  Your focus drops after 25 minutes. Try the Pomodoro technique for better retention!
                </p>
                <Button size="sm" variant="outline">
                  <Timer className="h-4 w-4 mr-2" />
                  Start 25min Focus
                </Button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-700">Smart Suggestion</h4>
                <p className="text-sm text-gray-700">
                  {learningStyleConfig.suggestion} Your {learningStyle} learning style shows 23% better retention.
                </p>
                <Button size="sm" variant="outline">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Try {learningStyleConfig.widgets[0]}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
