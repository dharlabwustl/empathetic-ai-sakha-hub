
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Play,
  CheckCircle,
  Star,
  Award,
  Users,
  Bell,
  Settings,
  CreditCard,
  Headphones
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
  const navigate = useNavigate();
  const [focusMode, setFocusMode] = useState(false);

  // Calculate days left
  const daysLeft = useMemo(() => {
    if (!userProfile.examDate) return null;
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    return Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }, [userProfile.examDate]);

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
          urgencyColor: 'text-red-800',
          bgGradient: 'from-red-50 to-orange-50'
        };
      case 'urgent':
        return {
          primary: 'bg-orange-600',
          secondary: 'bg-orange-50',
          accent: 'text-orange-700',
          border: 'border-orange-200',
          urgency: 'URGENT',
          urgencyColor: 'text-orange-800',
          bgGradient: 'from-orange-50 to-yellow-50'
        };
      case 'moderate':
        return {
          primary: 'bg-blue-600',
          secondary: 'bg-blue-50',
          accent: 'text-blue-700',
          border: 'border-blue-200',
          urgency: 'MODERATE',
          urgencyColor: 'text-blue-800',
          bgGradient: 'from-blue-50 to-indigo-50'
        };
      default:
        return {
          primary: 'bg-green-600',
          secondary: 'bg-green-50',
          accent: 'text-green-700',
          border: 'border-green-200',
          urgency: 'PLANNED',
          urgencyColor: 'text-green-800',
          bgGradient: 'from-green-50 to-emerald-50'
        };
    }
  }, [examProximity]);

  // Custom greeting based on mood and streak
  const getCustomGreeting = () => {
    const streak = userProfile.studyStreak || 0;
    const name = userProfile.name || userProfile.firstName || 'Student';
    
    if (streak >= 7) return `🔥 On Fire, ${name}! ${streak} day streak!`;
    if (currentMood === MoodType.MOTIVATED) return `💪 Ready to conquer, ${name}?`;
    if (currentMood === MoodType.FOCUSED) return `🎯 In the zone, ${name}!`;
    if (currentMood === MoodType.TIRED) return `🌟 Take it easy today, ${name}`;
    return `👋 Welcome back, ${name}!`;
  };

  // Mood selector component
  const MoodSelector = () => {
    const moods = [
      { mood: MoodType.MOTIVATED, emoji: '💪', color: 'bg-orange-100' },
      { mood: MoodType.FOCUSED, emoji: '🎯', color: 'bg-blue-100' },
      { mood: MoodType.HAPPY, emoji: '😊', color: 'bg-yellow-100' },
      { mood: MoodType.TIRED, emoji: '😴', color: 'bg-gray-100' },
      { mood: MoodType.STRESSED, emoji: '😰', color: 'bg-red-100' }
    ];

    return (
      <div className="flex gap-2">
        {moods.map(({ mood, emoji, color }) => (
          <button
            key={mood}
            onClick={() => onMoodChange?.(mood)}
            className={`p-2 rounded-lg transition-all hover:scale-110 ${
              currentMood === mood ? color + ' ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{emoji}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${proximityTheme.bgGradient} p-4 md:p-6`}>
      {/* Top Navigation Bar - Always Visible */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">PREPZR</h1>
            <Badge variant="outline" className={proximityTheme.urgencyColor}>
              {proximityTheme.urgency}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/notifications')}>
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <CreditCard className="h-4 w-4" />
              Upgrade
            </Button>
            <Button variant="outline" size="sm">
              <Headphones className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 max-w-7xl mx-auto">
        {/* 1. User Overview Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{getCustomGreeting()}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      Goal: {userProfile.examGoal || 'NEET'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Brain className="h-4 w-4" />
                      {learningStyle} learner
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-3xl font-bold ${proximityTheme.accent}`}>
                    {daysLeft || 180}
                  </div>
                  <div className="text-sm text-gray-600">days left</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">78%</div>
                  <div className="text-sm text-gray-600">exam readiness</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Current mood</div>
                  <MoodSelector />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 2. Priority Zone */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Today's Top Priority */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Today's Top Priority
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800">Thermodynamics</h3>
                <p className="text-sm text-red-600">Accuracy: 42% - Needs urgent revision</p>
                <Progress value={42} className="mt-2" />
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate('/dashboard/student/concepts/thermodynamics')}
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  Study Concept
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate('/dashboard/student/flashcards/thermodynamics/interactive')}
                >
                  <Brain className="h-4 w-4 mr-1" />
                  Practice
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Countdown Actions */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Timer className="h-5 w-5 text-orange-600" />
                Countdown Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {examProximity === 'critical' ? (
                <>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800">Critical Tasks Only</h4>
                    <p className="text-sm text-red-600">Last-minute revisions & mocks</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => navigate('/dashboard/student/practice-exam/final-mock/start')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Take Final Mock
                  </Button>
                </>
              ) : (
                <>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Balanced Strategy</h4>
                    <p className="text-sm text-blue-600">New topics + practice</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate('/dashboard/student/practice-exam')}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Start Practice
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Daily Study Plan */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-green-600" />
                Today's Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Physics</span>
                  <span>2h 30m</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Chemistry</span>
                  <span>1h 45m</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => navigate('/dashboard/student/today')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                View Full Plan
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3. Smart Study Hub */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Smart Study Hub</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {learningStyle === 'visual' && (
              <Button 
                className="h-24 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/dashboard/student/concepts?tab=3d')}
              >
                <Zap className="h-6 w-6" />
                <span>3D Models</span>
              </Button>
            )}
            
            {learningStyle === 'auditory' && (
              <Button 
                className="h-24 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate('/dashboard/student/concepts?tab=audio')}
              >
                <Headphones className="h-6 w-6" />
                <span>Audio Notes</span>
              </Button>
            )}
            
            <Button 
              className="h-24 flex flex-col gap-2 bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/dashboard/student/flashcards')}
            >
              <Brain className="h-6 w-6" />
              <span>Flashcards</span>
            </Button>
            
            <Button 
              className="h-24 flex flex-col gap-2 bg-orange-600 hover:bg-orange-700"
              onClick={() => navigate('/dashboard/student/practice-exam')}
            >
              <FileText className="h-6 w-6" />
              <span>Mock Tests</span>
            </Button>
          </div>
        </motion.div>

        {/* 4. Performance Zone */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-red-800">Weak Areas</h3>
              <p className="text-sm text-red-600 mb-3">3 topics need attention</p>
              <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                Improve Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Strong Areas</h3>
              <p className="text-sm text-green-600 mb-3">8 topics mastered</p>
              <Button size="sm" variant="outline" className="border-green-300 text-green-700">
                Advance Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">Progress</h3>
              <p className="text-2xl font-bold text-blue-700">+12%</p>
              <p className="text-sm text-blue-600">this week</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6 text-center">
              <Flame className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">Study Streak</h3>
              <p className="text-2xl font-bold text-orange-700">{userProfile.studyStreak || 5}</p>
              <p className="text-sm text-orange-600">days in a row</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 5. Tips + Micro-Coach Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-800 mb-2">Today's Coaching Tip</h3>
                  <p className="text-purple-700 mb-3">
                    Try audio learning for Physics – you showed 23% higher retention with audio content last week!
                  </p>
                  <p className="text-sm text-purple-600">
                    💡 Your focus drops after 25 minutes – consider taking a 5-minute break soon.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
