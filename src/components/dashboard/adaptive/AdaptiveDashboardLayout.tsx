
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileType, MoodType, LearningStyle, StudyStyle } from "@/types/user/base";
import { Calendar, Clock, Target, TrendingUp, BookOpen, Brain, Zap, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdaptiveDashboardLayoutProps {
  userProfile: UserProfileType;
  preferences?: any;
  children?: React.ReactNode;
}

const AdaptiveDashboardLayout: React.FC<AdaptiveDashboardLayoutProps> = ({
  userProfile,
  preferences,
  children
}) => {
  // Calculate exam proximity and urgency
  const examProximity = useMemo(() => {
    if (!userProfile.examDate) return 'distant';
    
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExam <= 30) return 'critical';
    if (daysUntilExam <= 90) return 'urgent';
    if (daysUntilExam <= 180) return 'moderate';
    return 'distant';
  }, [userProfile.examDate]);

  // Get mood-based theme
  const getMoodTheme = (mood?: MoodType) => {
    switch (mood) {
      case MoodType.MOTIVATED:
        return {
          primary: 'bg-gradient-to-r from-green-500 to-emerald-600',
          secondary: 'bg-green-50 border-green-200',
          accent: 'text-green-700',
          icon: '🚀'
        };
      case MoodType.STRESSED:
        return {
          primary: 'bg-gradient-to-r from-red-400 to-pink-500',
          secondary: 'bg-red-50 border-red-200',
          accent: 'text-red-700',
          icon: '😰'
        };
      case MoodType.CONFIDENT:
        return {
          primary: 'bg-gradient-to-r from-blue-500 to-indigo-600',
          secondary: 'bg-blue-50 border-blue-200',
          accent: 'text-blue-700',
          icon: '💪'
        };
      case MoodType.FOCUSED:
        return {
          primary: 'bg-gradient-to-r from-purple-500 to-violet-600',
          secondary: 'bg-purple-50 border-purple-200',
          accent: 'text-purple-700',
          icon: '🎯'
        };
      default:
        return {
          primary: 'bg-gradient-to-r from-gray-500 to-slate-600',
          secondary: 'bg-gray-50 border-gray-200',
          accent: 'text-gray-700',
          icon: '😊'
        };
    }
  };

  const moodTheme = getMoodTheme(userProfile.currentMood);

  // Get exam-specific content
  const getExamContent = (examGoal?: string) => {
    switch (examGoal) {
      case 'NEET':
        return {
          subjects: ['Physics', 'Chemistry', 'Biology'],
          focusAreas: ['Human Physiology', 'Organic Chemistry', 'Mechanics'],
          examFormat: 'Multiple Choice Questions (MCQs)',
          totalQuestions: 180,
          duration: '3 hours',
          tips: ['Focus on NCERT textbooks', 'Practice previous year papers', 'Strengthen Biology concepts']
        };
      case 'JEE':
        return {
          subjects: ['Physics', 'Chemistry', 'Mathematics'],
          focusAreas: ['Calculus', 'Organic Chemistry', 'Mechanics'],
          examFormat: 'Multiple Choice + Numerical',
          totalQuestions: 75,
          duration: '3 hours',
          tips: ['Master problem-solving techniques', 'Focus on application-based questions', 'Practice time management']
        };
      default:
        return {
          subjects: ['Physics', 'Chemistry', 'Mathematics'],
          focusAreas: ['Core Concepts', 'Problem Solving', 'Time Management'],
          examFormat: 'Mixed Format',
          totalQuestions: 100,
          duration: '3 hours',
          tips: ['Practice regularly', 'Focus on weak areas', 'Maintain consistency']
        };
    }
  };

  const examContent = getExamContent(userProfile.examGoal);

  // Get learning style resources
  const getLearningResources = (style?: LearningStyle) => {
    switch (style) {
      case LearningStyle.VISUAL:
        return {
          resources: ['Mind Maps', 'Flowcharts', 'Video Lectures', 'Infographics'],
          icon: '👁️',
          color: 'blue'
        };
      case LearningStyle.AUDITORY:
        return {
          resources: ['Audio Lectures', 'Discussion Groups', 'Voice Notes', 'Podcasts'],
          icon: '🎧',
          color: 'green'
        };
      case LearningStyle.KINESTHETIC:
        return {
          resources: ['Hands-on Practice', 'Lab Experiments', 'Interactive Simulations', 'Physical Models'],
          icon: '✋',
          color: 'orange'
        };
      default:
        return {
          resources: ['Mixed Content', 'Varied Formats', 'Multiple Methods', 'Adaptive Learning'],
          icon: '📚',
          color: 'purple'
        };
    }
  };

  const learningResources = getLearningResources(userProfile.learningStyle);

  // Calculate performance metrics
  const performanceData = useMemo(() => {
    const weakSubjects = userProfile.weakSubjects || ['Physics', 'Organic Chemistry'];
    const strongSubjects = userProfile.strongSubjects || ['Biology'];
    const overallProgress = 68; // Mock calculation
    
    return {
      overallProgress,
      weakSubjects,
      strongSubjects,
      improvementAreas: weakSubjects.slice(0, 2),
      strengthAreas: strongSubjects.slice(0, 2)
    };
  }, [userProfile.weakSubjects, userProfile.strongSubjects]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${moodTheme.secondary}`}>
      {/* Adaptive Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${moodTheme.primary} text-white p-6 rounded-lg mb-6`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {moodTheme.icon} {userProfile.examGoal || 'Exam'} Preparation Dashboard
            </h1>
            <p className="opacity-90">
              Mood: {userProfile.currentMood || 'neutral'} • 
              Learning Style: {userProfile.learningStyle || 'adaptive'} • 
              Performance: {userProfile.performanceLevel || 'intermediate'}
            </p>
          </div>
          <div className="text-right">
            {userProfile.examDate && (
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-sm opacity-90">Exam Date</div>
                <div className="font-bold">{new Date(userProfile.examDate).toLocaleDateString()}</div>
                <Badge variant={examProximity === 'critical' ? 'destructive' : 'secondary'}>
                  {examProximity}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Adaptive Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Exam-Specific Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {examContent.examFormat} Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {examContent.subjects.map((subject, index) => (
                  <Button 
                    key={subject}
                    variant={performanceData.weakSubjects.includes(subject) ? "destructive" : "outline"}
                    className="h-16 flex flex-col"
                  >
                    <span className="font-semibold">{subject}</span>
                    {performanceData.weakSubjects.includes(subject) && (
                      <span className="text-xs">Needs Focus</span>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance-Based Priority Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Priority Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weak" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="weak">Improvement Areas</TabsTrigger>
                  <TabsTrigger value="strong">Strength Areas</TabsTrigger>
                </TabsList>
                <TabsContent value="weak" className="space-y-4">
                  {performanceData.improvementAreas.map((area, index) => (
                    <div key={area} className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-red-800">{area}</h4>
                          <p className="text-sm text-red-600">Requires immediate attention</p>
                        </div>
                        <Button size="sm" variant="destructive">
                          Practice Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="strong" className="space-y-4">
                  {performanceData.strengthAreas.map((area, index) => (
                    <div key={area} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-green-800">{area}</h4>
                          <p className="text-sm text-green-600">Maintain and advance</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Advanced Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Learning Style Optimized Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{learningResources.icon}</span>
                Optimized for {userProfile.learningStyle || 'Your'} Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {learningResources.resources.map((resource, index) => (
                  <div key={resource} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="font-medium">{resource}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Original Dashboard Content */}
          {children}
        </div>

        {/* Adaptive Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Exam Countdown */}
          {userProfile.examDate && (
            <Card className={examProximity === 'critical' ? 'border-red-500' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Exam Countdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {Math.ceil((new Date(userProfile.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-sm text-muted-foreground">days remaining</div>
                  <Progress value={75} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Study Style Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Study Plan Adjustments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {examContent.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Mood-Based Motivation */}
          <Card className={moodTheme.secondary}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${moodTheme.accent}`}>
                <Heart className="h-5 w-5" />
                Mood Booster
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl mb-2">{moodTheme.icon}</div>
                <p className="text-sm">
                  {userProfile.currentMood === MoodType.MOTIVATED && "You're on fire! Keep up the great momentum!"}
                  {userProfile.currentMood === MoodType.STRESSED && "Take a deep breath. Small steps lead to big victories."}
                  {userProfile.currentMood === MoodType.CONFIDENT && "Your confidence is your strength. Channel it into practice!"}
                  {userProfile.currentMood === MoodType.FOCUSED && "Perfect focus! This is your time to excel."}
                  {!userProfile.currentMood && "Every expert was once a beginner. You've got this!"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Readiness</span>
                    <span>{performanceData.overallProgress}%</span>
                  </div>
                  <Progress value={performanceData.overallProgress} />
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on your {userProfile.examGoal} preparation and recent performance
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveDashboardLayout;
