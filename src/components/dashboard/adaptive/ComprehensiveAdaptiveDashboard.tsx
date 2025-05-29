
import React, { useState, useEffect } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Target, 
  Brain, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Calendar,
  Users,
  Zap,
  Star,
  Clock,
  ChevronRight,
  Activity,
  BarChart3,
  Trophy,
  Flame,
  CheckCircle2
} from 'lucide-react';

// Import components
import ExamReadinessMeter from '@/components/dashboard/student/metrics/ExamReadinessMeter';
import NEETStrategyCard from '@/components/dashboard/student/NEETStrategyCard';
import TodaysPlanSection from '@/components/dashboard/student/dashboard-sections/TodaysPlanSection';
import SmartSuggestionsCenter from '@/components/dashboard/student/dashboard-sections/SmartSuggestionsCenter';
import { KpiData } from '@/hooks/useKpiTracking';

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
  const [timeOfDay, setTimeOfDay] = useState<string>('');

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour < 12) setTimeOfDay('morning');
      else if (hour < 17) setTimeOfDay('afternoon');
      else if (hour < 21) setTimeOfDay('evening');
      else setTimeOfDay('night');
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mock performance data
  const mockPerformance = {
    accuracy: 78,
    quizScores: 85,
    conceptProgress: 65,
    streak: 7
  };

  // Mock exam readiness data
  const examReadinessData = {
    score: 72,
    previousScore: 68,
    weeklyTrends: [
      { week: 'W1', score: 45 },
      { week: 'W2', score: 52 },
      { week: 'W3', score: 58 },
      { week: 'W4', score: 65 },
      { week: 'W5', score: 68 },
      { week: 'W6', score: 72 }
    ]
  };

  const handleStartStudy = () => {
    console.log('Starting study session...');
  };

  const handleViewProgress = () => {
    console.log('Viewing detailed progress...');
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Today's Goal</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">6 hrs</p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-2">
                <Progress value={65} className="h-2" />
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">4 hrs completed</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Study Streak</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100 flex items-center gap-1">
                    <Flame className="h-5 w-5 text-orange-500" />
                    {mockPerformance.streak}
                  </p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full">
                  <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">Keep it going!</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Concepts Mastered</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">342</p>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-full">
                  <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <p className="text-xs text-green-600 dark:text-green-400">+12 this week</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Quiz Average</p>
                  <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{mockPerformance.quizScores}%</p>
                </div>
                <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-full">
                  <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-3 w-3 text-yellow-500" />
                <p className="text-xs text-amber-600 dark:text-amber-400">Excellent!</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Exam Readiness Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <ExamReadinessMeter 
          score={examReadinessData.score}
          weeklyTrend={examReadinessData.weeklyTrends}
        />
      </motion.div>

      {/* Today's Top Priority Section - Positioned below Exam Readiness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <NEETStrategyCard />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Today's Plan */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <TodaysPlanSection currentMood={currentMood} />
        </motion.div>

        {/* Right Column - Smart Suggestions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <SmartSuggestionsCenter performance={mockPerformance} />
        </motion.div>
      </div>

      {/* Additional Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Study Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleStartStudy}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Start Study Session
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleViewProgress}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Progress Report
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Join Study Group
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Physics Chapter 12</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Completed 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <Clock className="h-4 w-4 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Chemistry Quiz</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Score: 89% • Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                <Star className="h-4 w-4 text-purple-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Biology Flashcards</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Reviewed 25 cards • 3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                <p className="font-medium text-red-800 dark:text-red-200">Mock Test</p>
                <p className="text-sm text-red-600 dark:text-red-400">Tomorrow at 2:00 PM</p>
              </div>
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                <p className="font-medium text-blue-800 dark:text-blue-200">Chemistry Revision</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Thursday at 10:00 AM</p>
              </div>
              <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                <p className="font-medium text-green-800 dark:text-green-200">Study Group</p>
                <p className="text-sm text-green-600 dark:text-green-400">Friday at 4:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
