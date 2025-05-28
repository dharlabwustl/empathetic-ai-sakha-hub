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
  Lightbulb,
  Bell,
  Settings,
  Volume2,
  User
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
  const [focusMode, setFocusMode] = useState(false);

  // Proximity theme configuration
  const proximityTheme = useMemo(() => {
    switch (examProximity) {
      case 'critical':
        return {
          primary: 'bg-red-600',
          secondary: 'bg-red-50',
          accent: 'text-red-700',
          border: 'border-red-200',
          urgency: 'CRITICAL',
          bgGradient: 'from-red-50 via-orange-50 to-yellow-50'
        };
      case 'urgent':
        return {
          primary: 'bg-orange-600',
          secondary: 'bg-orange-50',
          accent: 'text-orange-700',
          border: 'border-orange-200',
          urgency: 'URGENT',
          bgGradient: 'from-orange-50 via-yellow-50 to-amber-50'
        };
      case 'moderate':
        return {
          primary: 'bg-blue-600',
          secondary: 'bg-blue-50',
          accent: 'text-blue-700',
          border: 'border-blue-200',
          urgency: 'MODERATE',
          bgGradient: 'from-blue-50 via-indigo-50 to-purple-50'
        };
      case 'relaxed':
        return {
          primary: 'bg-green-600',
          secondary: 'bg-green-50',
          accent: 'text-green-700',
          border: 'border-green-200',
          urgency: 'PLANNED',
          bgGradient: 'from-green-50 via-emerald-50 to-teal-50'
        };
    }
  }, [examProximity]);

  // Days left calculation
  const daysLeft = useMemo(() => {
    if (!userProfile.examDate) return null;
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    return Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }, [userProfile.examDate]);

  // Mood-based greeting
  const getGreeting = () => {
    const name = userProfile.name || userProfile.firstName || 'Student';
    const streak = userProfile.studyStreak || 0;
    
    if (currentMood === MoodType.EXCITED) return `🔥 Ready to conquer, ${name}!`;
    if (currentMood === MoodType.STRESSED && streak > 0) return `💪 Keep going, ${name}! ${streak} day streak!`;
    if (streak > 7) return `🏆 Amazing ${streak}-day streak, ${name}!`;
    if (streak > 0) return `👋 Welcome back, ${name}! Day ${streak} strong!`;
    return `✨ Hello ${name}, let's make today count!`;
  };

  // Adaptive content based on learning style
  const getStudyHubContent = () => {
    switch (learningStyle) {
      case 'visual':
        return [
          { title: 'Mind Maps', icon: Brain, desc: 'Visual concept connections' },
          { title: 'Concept Charts', icon: Target, desc: 'Visual learning aids' },
          { title: 'Diagrams', icon: FileText, desc: 'Interactive visuals' }
        ];
      case 'auditory':
        return [
          { title: 'Audio Notes', icon: Volume2, desc: 'Listen and learn' },
          { title: 'Voice Summaries', icon: Volume2, desc: 'Spoken concepts' },
          { title: 'Discussion', icon: Volume2, desc: 'Talk through topics' }
        ];
      case 'kinesthetic':
        return [
          { title: 'Interactive Quiz', icon: Zap, desc: 'Hands-on practice' },
          { title: 'Flashcards', icon: Brain, desc: 'Active recall' },
          { title: 'Simulations', icon: Target, desc: 'Virtual experiments' }
        ];
      default:
        return [
          { title: 'Reading Materials', icon: BookOpen, desc: 'Text-based learning' },
          { title: 'Notes Review', icon: FileText, desc: 'Written summaries' },
          { title: 'Text Analysis', icon: Brain, desc: 'Deep reading' }
        ];
    }
  };

  // Priority actions based on exam proximity
  const getPriorityActions = () => {
    if (daysLeft === null) return [];
    
    if (daysLeft <= 7) {
      return [
        { title: 'Last-minute Revision', urgency: 'critical', time: '2h' },
        { title: 'Mock Test Practice', urgency: 'critical', time: '3h' },
        { title: 'Quick Formula Review', urgency: 'high', time: '30min' }
      ];
    } else if (daysLeft <= 30) {
      return [
        { title: 'High Yield Concepts', urgency: 'high', time: '2h' },
        { title: 'Practice Tests', urgency: 'high', time: '3h' },
        { title: 'Weak Area Focus', urgency: 'medium', time: '1.5h' }
      ];
    } else {
      return [
        { title: 'New Topic Learning', urgency: 'medium', time: '2h' },
        { title: 'Regular Practice', urgency: 'medium', time: '1h' },
        { title: 'Concept Building', urgency: 'low', time: '1.5h' }
      ];
    }
  };

  const studyHubContent = getStudyHubContent();
  const priorityActions = getPriorityActions();

  if (focusMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        {/* Keep subscription, upgrade, voice assistant, notifications on top */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button onClick={() => setFocusMode(false)} variant="outline">
              Exit Focus Mode
            </Button>
            <Badge variant="outline">Focus Session Active</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <Volume2 className="h-5 w-5" />
            <Button size="sm">Upgrade</Button>
            <Settings className="h-5 w-5" />
          </div>
        </div>
        
        {/* Focus content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Focus Mode: Thermodynamics</h1>
          <div className="bg-gray-800 p-8 rounded-xl">
            <p className="text-center text-gray-300">Distraction-free learning environment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${proximityTheme.bgGradient} p-4 sm:p-6`}>
      {/* 1. User Overview Strip (Top Section) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="border-2 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Welcome & User Info */}
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${proximityTheme.secondary}`}>
                  <User className={`h-6 w-6 ${proximityTheme.accent}`} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{getGreeting()}</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline">🎯 {userProfile.examGoal || 'NEET'}</Badge>
                    <Badge variant="outline">📊 {learningStyle}</Badge>
                    {currentMood && (
                      <Badge variant="outline">😊 {currentMood}</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Exam Countdown */}
              <div className="text-right">
                <Badge className={`text-lg px-4 py-2 ${proximityTheme.accent} font-bold`} variant="outline">
                  {proximityTheme.urgency}
                </Badge>
                {daysLeft && (
                  <p className={`text-2xl font-bold mt-2 ${proximityTheme.accent}`}>
                    {daysLeft} days left
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 2. Priority Zone (Main Focus Area) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold mb-4">🎯 Priority Zone</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Today's Top Priority */}
          <Card className="border-l-4 border-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Today's Top Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-red-700 mb-2">Revise Thermodynamics</p>
              <p className="text-sm text-gray-600 mb-4">Accuracy: 42% - Needs improvement</p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Start Now
              </Button>
            </CardContent>
          </Card>

          {/* Countdown Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Timer className="h-5 w-5 text-orange-600" />
                Countdown Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {priorityActions.slice(0, 2).map((action, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-gray-600">{action.time}</p>
                  </div>
                  <Badge 
                    variant={action.urgency === 'critical' ? 'destructive' : 'outline'}
                    className="text-xs"
                  >
                    {action.urgency.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Daily Study Plan */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                Daily Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Today's Progress</span>
                    <span>6h / 8h</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <Button 
                  onClick={() => setFocusMode(true)} 
                  className="w-full"
                >
                  Enter Focus Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* 3. Smart Study Hub */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold mb-4">🧠 Smart Study Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studyHubContent.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <item.icon className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* 4. Performance Zone */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold mb-4">📊 Performance Zone</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Weak Areas */}
          <Card className="border-l-4 border-red-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-semibold">Weak Areas</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Thermodynamics, Optics</p>
              <Button size="sm" className="w-full bg-red-600">
                Improve Now
              </Button>
            </CardContent>
          </Card>

          {/* Strong Areas */}
          <Card className="border-l-4 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Strong Areas</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Mechanics, Algebra</p>
              <Button size="sm" className="w-full bg-green-600">
                Advance Practice
              </Button>
            </CardContent>
          </Card>

          {/* Streak & Motivation */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-orange-600" />
                <span className="font-semibold">Study Streak</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">{userProfile.studyStreak || 0}</p>
              <p className="text-sm text-gray-600">days</p>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold">Achievements</span>
              </div>
              <div className="flex gap-1">
                <Badge variant="outline">🏆</Badge>
                <Badge variant="outline">🎯</Badge>
                <Badge variant="outline">⚡</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* 5. Tips + Micro-Coach Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-600" />
              Daily Tips & Micro-Coach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${proximityTheme.secondary} border ${proximityTheme.border}`}>
                <h3 className="font-semibold mb-2">💡 Focus Tip</h3>
                <p className="text-sm">Your focus drops after 25 mins - try the Pomodoro technique for better retention!</p>
              </div>
              <div className={`p-4 rounded-lg ${proximityTheme.secondary} border ${proximityTheme.border}`}>
                <h3 className="font-semibold mb-2">🎯 Smart Suggestion</h3>
                <p className="text-sm">Try audio learning for Physics - you showed 23% higher retention last week!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
