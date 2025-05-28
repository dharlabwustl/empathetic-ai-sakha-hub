
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  Star,
  Trophy,
  ArrowRight,
  Play,
  CheckCircle,
  AlertCircle,
  Eye,
  Volume2,
  Hand,
  BarChart3,
  Lightbulb,
  Focus,
  Coffee
} from 'lucide-react';

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
  const navigate = useNavigate();

  // Dynamic theming based on proximity and mood
  const adaptiveTheme = useMemo(() => {
    const proximityColors = {
      critical: { bg: 'from-red-50 to-red-100', accent: 'text-red-600', border: 'border-red-200' },
      urgent: { bg: 'from-orange-50 to-orange-100', accent: 'text-orange-600', border: 'border-orange-200' },
      moderate: { bg: 'from-blue-50 to-blue-100', accent: 'text-blue-600', border: 'border-blue-200' },
      relaxed: { bg: 'from-green-50 to-green-100', accent: 'text-green-600', border: 'border-green-200' }
    };

    const moodOverlay = currentMood === MoodType.STRESSED ? 'brightness-95' : 
                       currentMood === MoodType.EXCITED ? 'brightness-105 saturate-110' : 
                       'brightness-100';

    return {
      ...proximityColors[examProximity],
      overlay: moodOverlay
    };
  }, [examProximity, currentMood]);

  // Calculate days left and greeting
  const daysLeft = useMemo(() => {
    if (!userProfile.examDate) return null;
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    return Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }, [userProfile.examDate]);

  const dynamicGreeting = useMemo(() => {
    const streak = userProfile.studyStreak || 0;
    const mood = currentMood;
    
    if (streak >= 7) return `🔥 Amazing streak, ${userProfile.name}!`;
    if (mood === MoodType.EXCITED) return `⚡ Energy is high, ${userProfile.name}!`;
    if (mood === MoodType.STRESSED) return `🌟 Take it step by step, ${userProfile.name}`;
    if (examProximity === 'critical') return `🎯 Final push time, ${userProfile.name}!`;
    return `👋 Welcome back, ${userProfile.name}!`;
  }, [userProfile.name, userProfile.studyStreak, currentMood, examProximity]);

  // Adaptive widgets based on performance and urgency
  const priorityWidgets = useMemo(() => {
    const examGoal = userProfile.examGoal || 'NEET';
    
    // Mock weak areas - in real app, this would come from analytics
    const weakAreas = [
      { subject: 'Thermodynamics', accuracy: 42, action: 'concept-detail', params: { subject: 'physics', topic: 'thermodynamics' } },
      { subject: 'Organic Chemistry', accuracy: 38, action: 'flashcard', params: { subject: 'chemistry', topic: 'organic' } },
      { subject: 'Newton\'s Laws', accuracy: 45, action: 'practice-exam', params: { subject: 'physics', topic: 'mechanics' } }
    ];

    const countdownActions = {
      critical: [
        { title: 'Quick Revision Cards', icon: Brain, color: 'red', route: '/dashboard/student/flashcards' },
        { title: 'Final Mock Tests', icon: FileText, color: 'red', route: '/dashboard/student/practice-exam' }
      ],
      urgent: [
        { title: 'High Yield Concepts', icon: Target, color: 'orange', route: '/dashboard/student/concepts' },
        { title: 'Practice Tests', icon: FileText, color: 'orange', route: '/dashboard/student/practice-exam' }
      ],
      moderate: [
        { title: 'New Topic Learning', icon: BookOpen, color: 'blue', route: '/dashboard/student/concepts' },
        { title: 'Balanced Practice', icon: Brain, color: 'blue', route: '/dashboard/student/practice-exam' }
      ],
      relaxed: [
        { title: 'Explore New Concepts', icon: BookOpen, color: 'green', route: '/dashboard/student/concepts' },
        { title: 'Build Foundation', icon: Target, color: 'green', route: '/dashboard/student/concepts' }
      ]
    };

    return {
      weakAreas,
      countdownActions: countdownActions[examProximity]
    };
  }, [userProfile.examGoal, examProximity]);

  // Learning style adaptive content
  const styleAdaptedContent = useMemo(() => {
    const contentMap = {
      visual: [
        { title: 'Concept Maps', icon: Eye, route: '/dashboard/student/concepts', params: { view: '3d' } },
        { title: 'Mind Maps', icon: Brain, route: '/dashboard/student/concepts', params: { view: 'mindmap' } },
        { title: 'Charts & Diagrams', icon: BarChart3, route: '/dashboard/student/concepts', params: { view: 'charts' } }
      ],
      auditory: [
        { title: 'Audio Summaries', icon: Volume2, route: '/dashboard/student/concepts', params: { mode: 'audio' } },
        { title: 'Voice Notes', icon: Volume2, route: '/dashboard/student/concepts', params: { mode: 'voice' } },
        { title: 'Podcasts', icon: Volume2, route: '/dashboard/student/concepts', params: { mode: 'podcast' } }
      ],
      kinesthetic: [
        { title: 'Interactive Flashcards', icon: Hand, route: '/dashboard/student/flashcards' },
        { title: 'Practice Quizzes', icon: Brain, route: '/dashboard/student/practice-exam' },
        { title: 'Formula Practice', icon: Target, route: '/dashboard/student/concepts', params: { view: 'formula' } }
      ]
    };

    return contentMap[learningStyle] || contentMap.visual;
  }, [learningStyle]);

  // Navigation handlers
  const handleNavigation = (route: string, params?: any) => {
    navigate(route, { state: params });
  };

  const handleTopPriorityClick = (area: any) => {
    if (area.action === 'concept-detail') {
      navigate('/dashboard/student/concepts', { state: area.params });
    } else if (area.action === 'flashcard') {
      navigate('/dashboard/student/flashcards', { state: area.params });
    } else if (area.action === 'practice-exam') {
      navigate('/dashboard/student/practice-exam', { state: area.params });
    }
  };

  // Mood selector component
  const MoodSelector = () => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Mood:</span>
      <select 
        value={currentMood || MoodType.NEUTRAL}
        onChange={(e) => onMoodChange?.(e.target.value as MoodType)}
        className="text-sm border-0 bg-transparent focus:ring-0"
      >
        <option value={MoodType.EXCITED}>😃 Excited</option>
        <option value={MoodType.MOTIVATED}>💪 Motivated</option>
        <option value={MoodType.FOCUSED}>🎯 Focused</option>
        <option value={MoodType.STRESSED}>😰 Stressed</option>
        <option value={MoodType.CALM}>😌 Calm</option>
        <option value={MoodType.NEUTRAL}>😐 Neutral</option>
      </select>
    </div>
  );

  if (focusMode) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Top bar with essential items */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <Button onClick={() => setFocusMode(false)} variant="outline">
              Exit Focus Mode
            </Button>
            <Badge variant="outline">Subscription: Premium</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm">🔔 Notifications</Button>
            <Button size="sm">🎤 Voice Assistant</Button>
            <Button size="sm">⬆️ Upgrade</Button>
          </div>
        </div>
        
        {/* Focus content */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Focus Mode Active</h1>
          <p className="text-gray-600 mb-8">Distraction-free learning session</p>
          <Card className="max-w-2xl mx-auto p-8">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Thermodynamics Revision</h2>
              <p className="text-gray-600 mb-6">Your weakest area - Let's improve that 42% accuracy!</p>
              <div className="space-y-4">
                <Button className="w-full" size="lg" onClick={() => handleNavigation('/dashboard/student/concepts')}>
                  Start Concept Review
                </Button>
                <Button className="w-full" variant="outline" size="lg" onClick={() => handleNavigation('/dashboard/student/flashcards')}>
                  Practice Flashcards
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${adaptiveTheme.bg} ${adaptiveTheme.overlay} p-6`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* 1. User Overview Strip */}
        <Card className={`border-2 ${adaptiveTheme.border} bg-white/95 backdrop-blur-sm`}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-2">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{dynamicGreeting}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline">Goal: {userProfile.examGoal || 'NEET'}</Badge>
                  <Badge variant="outline">Style: {learningStyle}</Badge>
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl font-bold ${adaptiveTheme.accent}`}>{daysLeft || 90}</div>
                <div className="text-sm text-gray-600">days left</div>
                <Badge className={`mt-1 ${examProximity === 'critical' ? 'bg-red-100 text-red-700' : examProximity === 'urgent' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                  {examProximity.toUpperCase()}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">75%</div>
                <div className="text-sm text-gray-600">Exam Readiness</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <MoodSelector />
                <div className="flex items-center gap-2 text-sm">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span>{userProfile.studyStreak || 5} day streak</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Priority Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Top Priority */}
          <Card className="lg:col-span-1 bg-white/95 backdrop-blur-sm border-red-200 border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Today's Top Priority
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {priorityWidgets.weakAreas.slice(0, 1).map((area, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-red-50 rounded-lg cursor-pointer"
                  onClick={() => handleTopPriorityClick(area)}
                >
                  <h3 className="font-semibold text-red-800">{area.subject}</h3>
                  <p className="text-sm text-red-600 mb-2">Accuracy: {area.accuracy}%</p>
                  <div className="w-full bg-red-200 rounded-full h-2 mb-3">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${area.accuracy}%` }}></div>
                  </div>
                  <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start Improving
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Countdown Actions */}
          <Card className="lg:col-span-1 bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Countdown Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {priorityWidgets.countdownActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 bg-${action.color}-50 rounded-lg cursor-pointer`}
                  onClick={() => handleNavigation(action.route)}
                >
                  <div className="flex items-center gap-3">
                    <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                    <span className="font-medium">{action.title}</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Daily Study Plan */}
          <Card className="lg:col-span-1 bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Daily Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Physics</span>
                  <span>2h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Chemistry</span>
                  <span>1.5h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Biology</span>
                  <span>1h</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Coffee className="h-4 w-4" />
                  <span>Break time included</span>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleNavigation('/dashboard/student/today')}
              >
                View Today's Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 3. Smart Study Hub */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              Smart Study Hub - {learningStyle} Learner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {styleAdaptedContent.map((content, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gray-50 rounded-lg cursor-pointer transition-all"
                  onClick={() => handleNavigation(content.route, content.params)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <content.icon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{content.title}</span>
                  </div>
                  <p className="text-sm text-gray-600">Optimized for your learning style</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 4. Performance Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-2 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-700 mb-2">Weak Areas</h4>
                  <div className="space-y-1">
                    {priorityWidgets.weakAreas.slice(0, 2).map((area, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{area.subject}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 text-xs"
                          onClick={() => handleTopPriorityClick(area)}
                        >
                          Improve Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-700 mb-2">Strong Areas</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Algebra</span>
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        Advance Practice
                      </Button>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Biology</span>
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        Advance Practice
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{userProfile.studyStreak || 5} day streak</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>15 concepts mastered</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-blue-500" />
                <span>8 practice tests completed</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Focus className="h-5 w-5" />
                Focus Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full mb-3" 
                onClick={() => setFocusMode(true)}
              >
                Enter Focus Mode
              </Button>
              <p className="text-xs text-gray-600">
                Distraction-free learning with essential tools only
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 5. Tips + Micro-Coach Section */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Lightbulb className="h-5 w-5" />
              Daily Micro-Coach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/80 rounded-lg">
                <h4 className="font-medium mb-2">💡 Today's Tip</h4>
                <p className="text-sm text-gray-700">
                  Try the Pomodoro technique for Physics - your focus peaks at 25-minute intervals.
                </p>
              </div>
              
              <div className="p-4 bg-white/80 rounded-lg">
                <h4 className="font-medium mb-2">🧠 Smart Suggestion</h4>
                <p className="text-sm text-gray-700">
                  Audio learning for {learningStyle === 'auditory' ? 'you' : 'Chemistry'} shows 15% better retention this week.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
