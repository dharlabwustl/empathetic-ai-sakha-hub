
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Target, TrendingUp, Clock, 
  Zap, Brain, Award, Users, Lightbulb, Play,
  ChevronRight, Star, Timer, CheckCircle,
  ArrowRight, BarChart3, Flame, Trophy,
  Volume2, Eye, Activity, PenTool, Headphones
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserProfileBase, MoodType, LearningStyle } from '@/types/user/base';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import SurroundingInfluencesMeter from '@/components/dashboard/student/SurroundingInfluencesMeter';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  examProximity: 'critical' | 'urgent' | 'moderate' | 'relaxed';
  learningStyle: LearningStyle;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  kpis?: KpiData[];
  nudges?: NudgeData[];
  markNudgeAsRead?: (id: string) => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  upcomingEvents?: Array<{
    title: string;
    time: string;
    type: "exam" | "task" | "revision";
  }>;
  [key: string]: any;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  examProximity,
  learningStyle,
  currentMood = MoodType.MOTIVATED,
  onMoodChange,
  kpis = [],
  nudges = [],
  markNudgeAsRead,
  lastActivity,
  suggestedNextAction,
  upcomingEvents = [],
  ...otherProps
}) => {
  const navigate = useNavigate();
  const [focusMode, setFocusMode] = useState(false);
  const [showSurroundingInfluences, setShowSurroundingInfluences] = useState(true);

  // Calculate exam date and days left
  const examDate = userProfile.examDate ? new Date(userProfile.examDate) : new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Get urgency color based on exam proximity
  const getUrgencyColor = () => {
    switch (examProximity) {
      case 'critical': return 'bg-red-500';
      case 'urgent': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  // Get mood-based greeting
  const getMoodBasedGreeting = () => {
    const greetings = {
      [MoodType.EXCITED]: "You're on fire today! 🔥",
      [MoodType.MOTIVATED]: "Ready to conquer your goals! 💪",
      [MoodType.FOCUSED]: "In the zone and ready to learn! 🎯",
      [MoodType.STRESSED]: "Take it one step at a time 🌸",
      [MoodType.CONFIDENT]: "Confidence is your superpower! ⭐",
      [MoodType.TIRED]: "Every small step counts 🌱",
      default: "Let's make today productive! 📚"
    };
    return greetings[currentMood] || greetings.default;
  };

  // Get learning style icon
  const getLearningStyleIcon = () => {
    switch (learningStyle) {
      case LearningStyle.VISUAL: return <Eye className="h-4 w-4" />;
      case LearningStyle.AUDITORY: return <Headphones className="h-4 w-4" />;
      case LearningStyle.KINESTHETIC: return <Activity className="h-4 w-4" />;
      case LearningStyle.READING: return <PenTool className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  // Mock data for adaptive content
  const weakAreas = ['Thermodynamics', 'Organic Chemistry', 'Kinematics'];
  const strongAreas = ['Algebra', 'Plant Biology', 'Atomic Structure'];
  const todaysPriority = weakAreas[0];
  const examReadinessScore = 78;
  const studyStreak = userProfile.studyStreak || 5;

  // Adaptive widgets based on learning style
  const getAdaptiveWidgets = () => {
    const baseWidgets = [
      {
        title: "Concept Maps",
        description: "Visual learning paths",
        icon: <Brain className="h-5 w-5" />,
        action: () => navigate('/dashboard/student/concepts'),
        style: 'visual'
      },
      {
        title: "Audio Summaries", 
        description: "Listen and learn",
        icon: <Volume2 className="h-5 w-5" />,
        action: () => navigate('/dashboard/student/concepts'),
        style: 'auditory'
      },
      {
        title: "Interactive Flashcards",
        description: "Practice by doing", 
        icon: <Play className="h-5 w-5" />,
        action: () => navigate('/dashboard/student/flashcards'),
        style: 'kinesthetic'
      }
    ];

    return baseWidgets.filter(widget => 
      widget.style === learningStyle.toLowerCase() || 
      Math.random() > 0.5
    ).slice(0, 3);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentMood === MoodType.STRESSED ? 'from-blue-50 to-indigo-100' : 'from-violet-50 to-pink-50'} dark:from-gray-900 dark:to-gray-800`}>
      
      {/* 1. User Overview Strip (Top Section) */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-bold">Welcome back, {userProfile.name || userProfile.firstName}!</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{getMoodBasedGreeting()}</p>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {userProfile.examGoal || 'NEET'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${getUrgencyColor()}`} />
                <span className="text-sm font-medium">{daysLeft} days left</span>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                {getLearningStyleIcon()}
                {learningStyle}
              </Badge>
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-bold">{studyStreak}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">

        {/* Exam Readiness Score */}
        <Card className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Exam Readiness Score</h3>
                <div className="text-3xl font-bold">{examReadinessScore}%</div>
                <p className="text-violet-100 mt-1">+12% from last week</p>
              </div>
              <div className="text-right">
                <Trophy className="h-12 w-12 text-yellow-300 mb-2" />
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => navigate('/dashboard/student/analytics')}
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Priority Zone (Main Focus Area) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Today's Top Priority */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-500" />
                Today's Top Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  Revise {todaysPriority}
                </h4>
                <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                  Accuracy: 42% • Needs immediate attention
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => navigate('/dashboard/student/concepts/thermodynamics')}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Study Concept
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/dashboard/student/flashcards')}
                  >
                    Practice Flashcards
                  </Button>
                </div>
              </div>

              {/* Countdown Actions */}
              <div className="space-y-3">
                <h5 className="font-medium">Recommended Actions</h5>
                {examProximity === 'critical' ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                      <span className="text-sm">Last-minute revision</span>
                      <Button size="sm" variant="outline">Start</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                      <span className="text-sm">Mock test practice</span>
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>Take Test</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <span className="text-sm">Master new concepts</span>
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/concepts')}>Learn</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <span className="text-sm">Practice questions</span>
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>Practice</Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Daily Study Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Today's Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Physics</span>
                  <span className="text-xs text-gray-500">2h</span>
                </div>
                <Progress value={60} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Chemistry</span>
                  <span className="text-xs text-gray-500">1.5h</span>
                </div>
                <Progress value={30} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Biology</span>
                  <span className="text-xs text-gray-500">1h</span>
                </div>
                <Progress value={0} className="h-2" />
                
                <Button 
                  className="w-full mt-4" 
                  onClick={() => navigate('/dashboard/student/today')}
                >
                  View Full Plan
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. Smart Study Hub */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Smart Study Hub
              <Badge variant="secondary" className="ml-2">
                Optimized for {learningStyle} learners
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getAdaptiveWidgets().map((widget, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg cursor-pointer"
                  onClick={widget.action}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {widget.icon}
                    <h4 className="font-medium">{widget.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{widget.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 4. Performance Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Performance Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-red-600 mb-2">🟠 Weak Areas</h5>
                  <div className="space-y-2">
                    {weakAreas.map((area, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <span className="text-sm">{area}</span>
                        <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/concepts')}>
                          Improve Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-green-600 mb-2">🟢 Strong Areas</h5>
                  <div className="space-y-2">
                    {strongAreas.slice(0, 2).map((area, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <span className="text-sm">{area}</span>
                        <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
                          Advance Practice
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Streak & Motivation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-1">{studyStreak}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Day Study Streak</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">15</div>
                    <p className="text-xs text-gray-500">Badges</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">87%</div>
                    <p className="text-xs text-gray-500">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">42h</div>
                    <p className="text-xs text-gray-500">This Week</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 5. Tips + Micro-Coach Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                  💡 Daily Tip
                </h5>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Try the Pomodoro technique: 25 minutes focused study + 5 minute break for optimal retention.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-1">
                  🧠 Personalized Insight
                </h5>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Your {learningStyle.toLowerCase()} learning style shows 23% better retention with visual aids. Try concept maps!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Surrounding Influences Meter */}
        {showSurroundingInfluences && (
          <div className="mt-6">
            <SurroundingInfluencesMeter />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
