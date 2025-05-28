
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  Brain, 
  BookOpen, 
  Users, 
  Award,
  Zap,
  ChevronRight,
  AlertCircle,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import SubscriptionBanner from '../student/SubscriptionBanner';
import ExamReadinessSection from '../student/ExamReadinessSection';
import TodaysPlanSection from '../student/dashboard-sections/TodaysPlanSection';
import NEETStrategyCard from '../student/NEETStrategyCard';
import SubjectBreakdownSection from '../student/SubjectBreakdownSection';

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
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [showFirstTimeGuide, setShowFirstTimeGuide] = useState(false);

  // Check if user is first-time
  useEffect(() => {
    const loginCount = userProfile.loginCount || 0;
    const hasSeenGuide = localStorage.getItem('hasSeenDashboardGuide') === 'true';
    
    if (loginCount <= 2 && !hasSeenGuide) {
      setIsFirstTimeUser(true);
      setShowFirstTimeGuide(true);
    }
  }, [userProfile.loginCount]);

  const handleGuideComplete = () => {
    setShowFirstTimeGuide(false);
    localStorage.setItem('hasSeenDashboardGuide', 'true');
  };

  // Mock data for dashboard
  const weeklyTrends = [
    { week: "1", score: 45 },
    { week: "2", score: 52 },
    { week: "3", score: 61 },
    { week: "4", score: 68 },
    { week: "5", score: 78 }
  ];

  const weakAreas = ["Thermodynamics", "Organic Chemistry", "Genetics"];
  const strongAreas = ["Mechanics", "Inorganic Chemistry", "Plant Biology"];

  return (
    <div className="space-y-6 relative">
      {/* First Time User Guide Overlay */}
      <AnimatePresence>
        {showFirstTimeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard!</h3>
                <p className="text-gray-600 mb-6">
                  Let's get you started. Pay attention to the highlighted sections - they're your priority actions to boost your exam preparation.
                </p>
                <Button onClick={handleGuideComplete} className="w-full">
                  Start My Journey
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscription Banner */}
      <SubscriptionBanner 
        subscription={userProfile.subscription}
        className="mb-6"
      />

      {/* Welcome Section with Enhanced Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {userProfile.name || userProfile.firstName}! 🚀
            </h1>
            <p className="text-white/80">
              Ready to crush your NEET 2026 goals? Let's make today count!
            </p>
          </div>
          <div className="hidden md:block">
            <Avatar className="h-16 w-16 border-2 border-white/20">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback className="bg-white/20 text-white text-lg">
                {userProfile.name?.[0] || userProfile.firstName?.[0] || 'S'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Today's Top Priority - Enhanced with Animation */}
          <motion.div
            className={`relative ${isFirstTimeUser ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''}`}
            animate={isFirstTimeUser ? {
              boxShadow: [
                '0 0 0 0 rgba(250, 204, 21, 0.7)',
                '0 0 0 10px rgba(250, 204, 21, 0)',
                '0 0 0 0 rgba(250, 204, 21, 0)'
              ]
            } : {}}
            transition={{ duration: 2, repeat: isFirstTimeUser ? Infinity : 0 }}
          >
            {isFirstTimeUser && (
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-3 -right-3 z-10"
              >
                <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  START HERE!
                </div>
              </motion.div>
            )}
            
            <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Target className="h-5 w-5 text-orange-600" />
                    </motion.div>
                    Today's Top Priority
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2"
                    >
                      <Zap className="h-4 w-4 text-yellow-500" />
                    </motion.div>
                  </CardTitle>
                  <Badge className="bg-red-100 text-red-800 border-red-300 animate-pulse">
                    URGENT
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                    <h3 className="font-semibold text-orange-900 mb-2">🎯 Master Newton's Laws</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Complete 15 practice problems and achieve 85% accuracy
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Progress: 3/15 problems
                      </div>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          Start Now →
                        </motion.div>
                      </Button>
                    </div>
                    <Progress value={20} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's NEET Study Plan - Enhanced with Animation */}
          <motion.div
            className={`relative ${isFirstTimeUser ? 'ring-4 ring-blue-400 ring-opacity-75' : ''}`}
            animate={isFirstTimeUser ? {
              boxShadow: [
                '0 0 0 0 rgba(59, 130, 246, 0.7)',
                '0 0 0 10px rgba(59, 130, 246, 0)',
                '0 0 0 0 rgba(59, 130, 246, 0)'
              ]
            } : {}}
            transition={{ duration: 2, repeat: isFirstTimeUser ? Infinity : 0, delay: 0.5 }}
          >
            {isFirstTimeUser && (
              <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-3 -left-3 z-10"
              >
                <div className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  NEXT STEP!
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </motion.div>
            )}
            
            <TodaysPlanSection currentMood={currentMood} />
          </motion.div>

          {/* Exam Readiness Section */}
          <ExamReadinessSection
            score={78}
            previousScore={68}
            weeklyTrends={weeklyTrends}
            weakAreas={weakAreas}
            strongAreas={strongAreas}
          />
        </div>

        {/* Right Column - Secondary Content */}
        <div className="lg:col-span-4 space-y-6">
          {/* NEET Strategy Card */}
          <motion.div
            className={`relative ${isFirstTimeUser ? 'ring-4 ring-green-400 ring-opacity-75' : ''}`}
            animate={isFirstTimeUser ? {
              boxShadow: [
                '0 0 0 0 rgba(34, 197, 94, 0.7)',
                '0 0 0 10px rgba(34, 197, 94, 0)',
                '0 0 0 0 rgba(34, 197, 94, 0)'
              ]
            } : {}}
            transition={{ duration: 2, repeat: isFirstTimeUser ? Infinity : 0, delay: 1 }}
          >
            {isFirstTimeUser && (
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-3 -right-3 z-10"
              >
                <div className="bg-green-400 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  STRATEGY
                </div>
              </motion.div>
            )}
            <NEETStrategyCard />
          </motion.div>

          {/* AI Coach Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  AI Coach Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Focus on weak areas</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Spend extra time on Thermodynamics today
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Take practice test</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Ready for Physics mock exam
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  Get Personalized Tips
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Study Streak</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-orange-600">12 days</span>
                    <Award className="h-4 w-4 text-orange-600" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-bold">28.5 hrs</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Score</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-green-600">84%</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Subject Breakdown Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8"
      >
        <SubjectBreakdownSection />
      </motion.div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
