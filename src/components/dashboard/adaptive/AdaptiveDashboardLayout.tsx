
import React from 'react';
import { UserProfileBase, MoodType, UserGoal, LearningStyle } from '@/types/user/base';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, BookOpen, Brain, TrendingUp, Calendar, Zap, Users, AlertCircle, CheckCircle, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdaptiveDashboardLayoutProps {
  userProfile: UserProfileBase;
  preferences?: any;
  children?: React.ReactNode;
}

const AdaptiveDashboardLayout: React.FC<AdaptiveDashboardLayoutProps> = ({
  userProfile,
  preferences,
  children
}) => {
  // Get exam proximity in days
  const getExamProximity = () => {
    if (!userProfile.examDate) return null;
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysToExam = getExamProximity();

  // Enhanced adaptive theme based on mood, exam proximity, and performance
  const getAdaptiveTheme = () => {
    const mood = userProfile.currentMood || userProfile.mood;
    const isExamNear = daysToExam && daysToExam < 30;
    const performanceLevel = userProfile.performanceLevel || 'intermediate';
    
    if (isExamNear && daysToExam < 7) {
      return {
        background: 'bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-red-200',
        accent: 'text-red-600',
        cardBg: 'bg-red-50/50',
        urgency: 'high'
      };
    }
    
    if (isExamNear) {
      return {
        background: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-orange-200',
        accent: 'text-orange-600',
        cardBg: 'bg-orange-50/50',
        urgency: 'medium'
      };
    }
    
    switch (mood) {
      case MoodType.STRESSED:
      case MoodType.ANXIOUS:
        return {
          background: 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 border-blue-200',
          accent: 'text-blue-600',
          cardBg: 'bg-blue-50/50',
          urgency: 'low'
        };
      case MoodType.MOTIVATED:
      case MoodType.EXCITED:
        return {
          background: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-200',
          accent: 'text-green-600',
          cardBg: 'bg-green-50/50',
          urgency: 'low'
        };
      case MoodType.TIRED:
      case MoodType.OVERWHELMED:
        return {
          background: 'bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 border-purple-200',
          accent: 'text-purple-600',
          cardBg: 'bg-purple-50/50',
          urgency: 'low'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border-sky-200',
          accent: 'text-sky-600',
          cardBg: 'bg-sky-50/50',
          urgency: 'low'
        };
    }
  };

  // Enhanced personalized widgets based on comprehensive user profile
  const getPersonalizedWidgets = () => {
    const examGoal = userProfile.examGoal || preferences?.examGoal;
    const learningStyle = userProfile.learningStyle || preferences?.learningStyle;
    const weakSubjects = userProfile.weakSubjects || preferences?.weakSubjects || [];
    const strongSubjects = userProfile.strongSubjects || preferences?.strongSubjects || [];
    const performanceLevel = userProfile.performanceLevel || 'intermediate';
    const studyStreak = userProfile.studyStreak || 0;
    
    const widgets = [];

    // Exam-specific focused widgets
    if (examGoal === UserGoal.NEET) {
      widgets.push({
        title: 'NEET Strategy Hub',
        icon: <Target className="h-5 w-5" />,
        priority: 'high',
        content: (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-green-100 rounded text-center">
                <div className="font-semibold text-green-700">Biology</div>
                <div className="text-xs">360 marks</div>
              </div>
              <div className="p-2 bg-blue-100 rounded text-center">
                <div className="font-semibold text-blue-700">Chemistry</div>
                <div className="text-xs">180 marks</div>
              </div>
              <div className="p-2 bg-purple-100 rounded text-center">
                <div className="font-semibold text-purple-700">Physics</div>
                <div className="text-xs">180 marks</div>
              </div>
              <div className="p-2 bg-orange-100 rounded text-center">
                <div className="font-semibold text-orange-700">Total</div>
                <div className="text-xs">720 marks</div>
              </div>
            </div>
            <Button className="w-full" size="sm">
              Start NEET Practice
            </Button>
          </div>
        )
      });
    } else if (examGoal === UserGoal.JEE) {
      widgets.push({
        title: 'JEE Advanced Focus',
        icon: <Zap className="h-5 w-5" />,
        priority: 'high',
        content: (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="p-2 bg-red-100 rounded text-center">
                <div className="font-semibold text-red-700">Maths</div>
                <div className="text-xs">Priority High</div>
              </div>
              <div className="p-2 bg-blue-100 rounded text-center">
                <div className="font-semibold text-blue-700">Physics</div>
                <div className="text-xs">Moderate</div>
              </div>
              <div className="p-2 bg-green-100 rounded text-center">
                <div className="font-semibold text-green-700">Chemistry</div>
                <div className="text-xs">Steady</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" size="sm" variant="outline">
                Mock Test
              </Button>
              <Button className="flex-1" size="sm">
                Problem Sets
              </Button>
            </div>
          </div>
        )
      });
    }

    // Learning style adaptive widgets
    if (learningStyle === LearningStyle.VISUAL) {
      widgets.push({
        title: 'Visual Learning Suite',
        icon: <Brain className="h-5 w-5" />,
        priority: 'medium',
        content: (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs p-2">
                📊 Mind Maps
              </Button>
              <Button variant="outline" size="sm" className="text-xs p-2">
                🎥 Video Lessons
              </Button>
              <Button variant="outline" size="sm" className="text-xs p-2">
                📈 Progress Charts
              </Button>
              <Button variant="outline" size="sm" className="text-xs p-2">
                🗺️ Concept Maps
              </Button>
            </div>
          </div>
        )
      });
    } else if (learningStyle === LearningStyle.AUDITORY) {
      widgets.push({
        title: 'Audio Learning Center',
        icon: <Users className="h-5 w-5" />,
        priority: 'medium',
        content: (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs p-2">
                🎧 Podcasts
              </Button>
              <Button variant="outline" size="sm" className="text-xs p-2">
                💬 Study Groups
              </Button>
              <Button variant="outline" size="sm" className="text-xs p-2">
                🔊 Voice Notes
              </Button>
              <Button variant="outline" size="sm" className="text-xs p-2">
                📻 Audio Books
              </Button>
            </div>
          </div>
        )
      });
    }

    // Performance-based priority widgets
    if (weakSubjects.length > 0) {
      widgets.push({
        title: 'Improvement Radar',
        icon: <TrendingUp className="h-5 w-5" />,
        priority: 'high',
        content: (
          <div className="space-y-3">
            {weakSubjects.slice(0, 3).map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">{subject}</span>
                </div>
                <Badge variant="destructive" className="text-xs">
                  Focus
                </Badge>
              </div>
            ))}
            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
              Intensive Practice
            </Button>
          </div>
        )
      });
    }

    // Strong subjects showcase
    if (strongSubjects.length > 0) {
      widgets.push({
        title: 'Strength Zones',
        icon: <Award className="h-5 w-5" />,
        priority: 'low',
        content: (
          <div className="space-y-2">
            {strongSubjects.slice(0, 2).map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{subject}</span>
                </div>
                <Badge variant="secondary" className="text-xs bg-green-100">
                  Mastered
                </Badge>
              </div>
            ))}
            <Button size="sm" variant="outline" className="w-full">
              Advanced Practice
            </Button>
          </div>
        )
      });
    }

    // Time-based urgency widget
    if (daysToExam) {
      const urgencyLevel = daysToExam < 7 ? 'critical' : daysToExam < 30 ? 'high' : 'moderate';
      widgets.push({
        title: 'Exam Countdown',
        icon: <Calendar className="h-5 w-5" />,
        priority: urgencyLevel === 'critical' ? 'high' : 'medium',
        content: (
          <div className="text-center space-y-3">
            <div className={`text-3xl font-bold ${urgencyLevel === 'critical' ? 'text-red-600' : urgencyLevel === 'high' ? 'text-orange-600' : 'text-blue-600'}`}>
              {daysToExam}
            </div>
            <div className="text-sm text-gray-600">days to {examGoal}</div>
            <Progress 
              value={Math.max(0, 100 - (daysToExam / 365) * 100)} 
              className={`w-full ${urgencyLevel === 'critical' ? 'bg-red-100' : urgencyLevel === 'high' ? 'bg-orange-100' : 'bg-blue-100'}`}
            />
            <div className={`text-xs px-3 py-1 rounded-full ${urgencyLevel === 'critical' ? 'bg-red-100 text-red-700' : urgencyLevel === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
              {urgencyLevel === 'critical' ? 'Final Sprint Mode' : urgencyLevel === 'high' ? 'Intensive Mode' : 'Steady Progress'}
            </div>
          </div>
        )
      });
    }

    // Study streak motivation
    if (studyStreak > 0) {
      widgets.push({
        title: 'Study Momentum',
        icon: <Star className="h-5 w-5" />,
        priority: 'medium',
        content: (
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-yellow-600">
              🔥 {studyStreak}
            </div>
            <div className="text-sm text-gray-600">day streak</div>
            <div className="text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
              Keep the momentum going!
            </div>
          </div>
        )
      });
    }

    // Sort widgets by priority
    return widgets.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const widgets = getPersonalizedWidgets();
  const theme = getAdaptiveTheme();

  return (
    <motion.div 
      className={`min-h-screen p-6 ${theme.background}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Adaptive Header with Enhanced Context */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className={`text-3xl font-bold ${theme.accent}`}>
              {userProfile.examGoal ? `${userProfile.examGoal} Preparation Hub` : 'Your Study Command Center'}
            </h1>
            <p className="text-gray-600 text-lg">
              Optimized for {userProfile.learningStyle || 'your'} learning • {userProfile.performanceLevel || 'intermediate'} level
            </p>
          </div>
          <div className="flex items-center gap-3">
            {userProfile.currentMood && (
              <Badge variant="outline" className="capitalize text-sm px-3 py-1">
                {userProfile.currentMood}
              </Badge>
            )}
            {userProfile.examGoal && (
              <Badge className={`${theme.accent} bg-opacity-10 text-sm px-3 py-1`}>
                {userProfile.examGoal} Track
              </Badge>
            )}
            {theme.urgency === 'high' && (
              <Badge variant="destructive" className="animate-pulse">
                Exam Mode
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Adaptive Widget Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {widgets.map((widget, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <Card className={`border-2 hover:shadow-xl transition-all duration-300 ${theme.cardBg} ${widget.priority === 'high' ? 'ring-2 ring-opacity-50 ring-red-300' : ''}`}>
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center gap-2 text-lg ${theme.accent}`}>
                  {widget.icon}
                  {widget.title}
                  {widget.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs ml-auto">
                      Priority
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {widget.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Performance-based Priority Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className={`mb-6 border-2 ${theme.cardBg}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme.accent}`}>
              <BookOpen className="h-5 w-5" />
              Today's Adaptive Study Plan
              {theme.urgency === 'high' && (
                <Badge variant="destructive" className="ml-auto">
                  High Priority
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                className={`text-center p-4 ${theme.cardBg} rounded-lg border-2 border-blue-200`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">Morning Power Hour</h3>
                <p className="text-sm text-gray-600">Peak concentration subjects</p>
                <Badge variant="outline" className="mt-2">
                  {userProfile.weakSubjects?.[0] || 'Math'}
                </Badge>
              </motion.div>
              <motion.div 
                className={`text-center p-4 ${theme.cardBg} rounded-lg border-2 border-green-200`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold">Afternoon Practice</h3>
                <p className="text-sm text-gray-600">Problem solving & application</p>
                <Badge variant="outline" className="mt-2">
                  Practice Tests
                </Badge>
              </motion.div>
              <motion.div 
                className={`text-center p-4 ${theme.cardBg} rounded-lg border-2 border-purple-200`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold">Evening Review</h3>
                <p className="text-sm text-gray-600">Consolidation & weak areas</p>
                <Badge variant="outline" className="mt-2">
                  {userProfile.learningStyle || 'Mixed'} Style
                </Badge>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Original Dashboard Content */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AdaptiveDashboardLayout;
