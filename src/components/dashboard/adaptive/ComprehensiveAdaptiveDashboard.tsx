
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Target, 
  TrendingUp, 
  Brain, 
  Calendar,
  BookOpen,
  Zap,
  Star,
  CheckCircle,
  AlertTriangle,
  Play,
  ArrowRight,
  Trophy,
  Flame,
  Eye,
  Volume2,
  Hand,
  BarChart3,
  ChevronRight,
  Focus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import SurroundingInfluencesMeter from '../student/SurroundingInfluencesMeter';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const [focusMode, setFocusMode] = useState(false);
  const [examProximity, setExamProximity] = useState<'critical' | 'high' | 'moderate'>('moderate');
  const [learningStyle, setLearningStyle] = useState<'visual' | 'auditory' | 'kinesthetic'>('visual');

  // Mock data - replace with real data
  const examDate = new Date('2024-05-15');
  const daysLeft = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const examReadiness = 68;
  const weakestSubject = { name: 'Thermodynamics', accuracy: 42 };
  const streak = userProfile.streak?.current || 5;

  useEffect(() => {
    if (daysLeft <= 7) setExamProximity('critical');
    else if (daysLeft <= 30) setExamProximity('high');
    else setExamProximity('moderate');
  }, [daysLeft]);

  const getMoodBasedTheme = () => {
    switch (currentMood) {
      case MoodType.MOTIVATED: return 'from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20';
      case MoodType.FOCUSED: return 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20';
      case MoodType.STRESSED: return 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20';
      case MoodType.TIRED: return 'from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20';
      default: return 'from-sky-50 to-purple-50 dark:from-sky-900/20 dark:to-purple-900/20';
    }
  };

  const getUrgencyColor = () => {
    switch (examProximity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getLearningStyleIcon = () => {
    switch (learningStyle) {
      case 'visual': return <Eye className="h-4 w-4" />;
      case 'auditory': return <Volume2 className="h-4 w-4" />;
      case 'kinesthetic': return <Hand className="h-4 w-4" />;
    }
  };

  const getAdaptiveActions = () => {
    switch (examProximity) {
      case 'critical':
        return [
          { title: 'Final Mock Test', action: () => navigate('/dashboard/student/practice-exam'), urgent: true },
          { title: 'Last-minute Revision', action: () => navigate('/dashboard/student/concepts'), urgent: true },
        ];
      case 'high':
        return [
          { title: 'High Yield Practice', action: () => navigate('/dashboard/student/practice-exam'), urgent: false },
          { title: 'Concept Mastery', action: () => navigate('/dashboard/student/concepts'), urgent: false },
        ];
      default:
        return [
          { title: 'New Topic Learning', action: () => navigate('/dashboard/student/concepts'), urgent: false },
          { title: 'Balanced Practice', action: () => navigate('/dashboard/student/practice-exam'), urgent: false },
        ];
    }
  };

  const moods = [
    { type: MoodType.MOTIVATED, icon: '💪', label: 'Motivated' },
    { type: MoodType.FOCUSED, icon: '🎯', label: 'Focused' },
    { type: MoodType.TIRED, icon: '😴', label: 'Tired' },
    { type: MoodType.STRESSED, icon: '😰', label: 'Stressed' },
    { type: MoodType.HAPPY, icon: '😊', label: 'Happy' }
  ];

  if (focusMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        {/* Fixed top nav in focus mode */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFocusMode(false)}
                className="bg-gray-700 border-gray-600 text-white"
              >
                Exit Focus
              </Button>
              <Badge variant="secondary" className="bg-purple-600 text-white">Focus Mode Active</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Upgrade</Button>
              <Button variant="ghost" size="sm">🔊</Button>
              <Button variant="ghost" size="sm">🔔</Button>
            </div>
          </div>
        </div>

        <div className="pt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Focus Session: {weakestSubject.name}</h1>
            <p className="text-gray-400">Deep dive into your weakest area</p>
          </div>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button 
                  className="h-24 text-lg"
                  onClick={() => navigate('/dashboard/student/concepts')}
                >
                  <BookOpen className="h-6 w-6 mr-2" />
                  Study Concepts
                </Button>
                <Button 
                  className="h-24 text-lg"
                  onClick={() => navigate('/dashboard/student/flashcards')}
                >
                  <Brain className="h-6 w-6 mr-2" />
                  Practice Flashcards
                </Button>
                <Button 
                  className="h-24 text-lg"
                  onClick={() => navigate('/dashboard/student/practice-exam')}
                >
                  <Target className="h-6 w-6 mr-2" />
                  Take Practice Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getMoodBasedTheme()}`}>
      {/* 1. User Overview Strip */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {userProfile.name}! 🚀</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Goal: <Badge variant="secondary" className="ml-1">NEET 2024</Badge>
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className={`text-sm px-2 py-1 rounded-full border ${getUrgencyColor()}`}>
                {daysLeft} days left
              </span>
            </div>

            <div className="flex items-center gap-2">
              {getLearningStyleIcon()}
              <span className="text-sm capitalize">{learningStyle} Learner</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {moods.map((mood) => (
                <button
                  key={mood.type}
                  onClick={() => onMoodChange?.(mood.type)}
                  className={`p-2 rounded-lg transition-all ${
                    currentMood === mood.type 
                      ? 'bg-blue-100 scale-110' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={mood.label}
                >
                  {mood.icon}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">{streak} day streak</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* 2. Priority Zone */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Today's Top Priority */}
          <Card className="lg:col-span-2 border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Today's Top Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{weakestSubject.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current accuracy: {weakestSubject.accuracy}% • Needs improvement
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/dashboard/student/concepts')}
                  className="ml-4"
                >
                  Start Learning
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Exam Readiness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Exam Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{examReadiness}%</div>
                <Progress value={examReadiness} className="mt-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Good progress! Keep it up
                </p>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Recommended Actions ({examProximity} priority)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAdaptiveActions().map((action, index) => (
                  <Button
                    key={index}
                    variant={action.urgent ? "default" : "outline"}
                    className="h-16 justify-start"
                    onClick={action.action}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {action.title}
                    {action.urgent && <Badge variant="destructive" className="ml-2">Urgent</Badge>}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Study Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Study Plan
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/student/today')}
                >
                  View Full Plan
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Physics - Mechanics', 'Chemistry - Organic', 'Biology - Genetics'].map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{subject}</span>
                    </div>
                    <Badge variant="secondary">45 min</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3. Smart Study Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Smart Study Hub - {learningStyle} Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {learningStyle === 'visual' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => navigate('/dashboard/student/concepts')}
                    >
                      <Eye className="h-6 w-6 mb-2" />
                      Concept Maps
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => navigate('/dashboard/student/concepts')}
                    >
                      <BarChart3 className="h-6 w-6 mb-2" />
                      3D Visualizations
                    </Button>
                  </>
                )}
                {learningStyle === 'auditory' && (
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => navigate('/dashboard/student/concepts')}
                  >
                    <Volume2 className="h-6 w-6 mb-2" />
                    Audio Lessons
                  </Button>
                )}
                {learningStyle === 'kinesthetic' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => navigate('/dashboard/student/flashcards')}
                    >
                      <Hand className="h-6 w-6 mb-2" />
                      Interactive Cards
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => navigate('/dashboard/student/practice-exam')}
                    >
                      <Target className="h-6 w-6 mb-2" />
                      Practice Tests
                    </Button>
                  </>
                )}
                <Button 
                  variant="outline" 
                  className="h-20 flex-col"
                  onClick={() => navigate('/dashboard/student/concepts')}
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  Formula Lab
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 4. Performance Zone */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-700 dark:text-red-300">🔴 Weak Areas</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/dashboard/student/concepts')}
                  >
                    Improve Now
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-green-700 dark:text-green-300">🟢 Strong Areas</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/dashboard/student/practice-exam')}
                  >
                    Advanced Practice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Study Streak Master</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {streak} consecutive days of learning
                  </p>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Level {Math.floor(streak / 5) + 1}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 5. Surrounding Influences Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <SurroundingInfluencesMeter />
        </motion.div>

        {/* Tips + Micro-Coach Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Smart Tips & Coaching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Focus Tip</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your focus drops after 25 minutes. Take a 5-minute break for better retention.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-medium mb-2">🎯 Study Suggestion</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Try audio learning for Physics - 23% higher retention seen last week.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFocusMode(true)}
                  className="flex items-center gap-2"
                >
                  <Focus className="h-4 w-4" />
                  Enter Focus Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
