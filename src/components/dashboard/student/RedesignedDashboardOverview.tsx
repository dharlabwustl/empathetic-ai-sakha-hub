
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfileType } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Calendar, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Brain,
  Clock,
  Star,
  Zap,
  ChevronRight,
  BarChart3,
  Focus,
  Flame,
  Award
} from 'lucide-react';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import { Link } from 'react-router-dom';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [motivationalQuote, setMotivationalQuote] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('Good Morning');
      setMotivationalQuote('Every expert was once a beginner. Start strong today! 🌅');
    } else if (hour < 17) {
      setTimeOfDay('Good Afternoon');
      setMotivationalQuote('Success is the sum of small efforts repeated daily. Keep going! ⚡');
    } else {
      setTimeOfDay('Good Evening');
      setMotivationalQuote('Night study sessions build champions. You\'ve got this! 🌟');
    }
  }, []);

  const examProgress = 75;
  const studyStreak = 12;
  const weeklyGoal = 85;

  const quickActions = [
    { title: 'Take Practice Test', icon: Trophy, color: 'bg-gradient-to-r from-purple-500 to-indigo-600', path: '/dashboard/student/practice-exam' },
    { title: 'Review Concepts', icon: Brain, color: 'bg-gradient-to-r from-blue-500 to-cyan-600', path: '/dashboard/student/concepts' },
    { title: 'Study Flashcards', icon: BookOpen, color: 'bg-gradient-to-r from-green-500 to-emerald-600', path: '/dashboard/student/flashcards' },
    { title: 'Academic Advisor', icon: Target, color: 'bg-gradient-to-r from-orange-500 to-red-600', path: '/dashboard/student/academic' }
  ];

  const studyStats = [
    { label: 'Study Streak', value: studyStreak, unit: 'days', icon: Flame, color: 'text-orange-600' },
    { label: 'Weekly Progress', value: weeklyGoal, unit: '%', icon: BarChart3, color: 'text-blue-600' },
    { label: 'Focus Score', value: 92, unit: '%', icon: Focus, color: 'text-purple-600' },
    { label: 'Exam Readiness', value: examProgress, unit: '%', icon: Award, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/10 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Enhanced Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 p-8 text-white shadow-2xl"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm" />
            <motion.div
              className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {timeOfDay}, {userProfile.name || 'Champion'}! 👋
                </h1>
                <p className="text-blue-100 text-lg mb-4 max-w-2xl">
                  {motivationalQuote}
                </p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Target className="h-4 w-4 mr-1" />
                    NEET 2026 Preparation
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Calendar className="h-4 w-4 mr-1" />
                    145 Days Left
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{examProgress}%</div>
                <div className="text-blue-100">Exam Ready</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Study Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {studyStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                        <span className="text-sm text-gray-500">{stat.unit}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={stat.value} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Exam Goal Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <ExamGoalCard />
          </motion.div>

          {/* Right Column - Quick Actions & Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link to={action.path}>
                        <Card className={`${action.color} text-white border-0 cursor-pointer hover:shadow-lg transition-all duration-300`}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <action.icon className="h-6 w-6" />
                              <span className="font-medium">{action.title}</span>
                              <ChevronRight className="h-4 w-4 ml-auto" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Focus */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Focus className="h-5 w-5 text-purple-600" />
                  Today's Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Physics - Newton's Laws</h4>
                    <p className="text-sm text-gray-600">Complete practice problems and review concepts</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                    High Priority
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Chemistry - Organic Reactions</h4>
                    <p className="text-sm text-gray-600">Review flashcards and mechanism practice</p>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Medium Priority
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Biology - Cell Structure</h4>
                    <p className="text-sm text-gray-600">Read chapter and create summary notes</p>
                  </div>
                  <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                    Low Priority
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity & Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { action: 'Completed Physics Practice Test', time: '2 hours ago', score: '85%' },
                { action: 'Reviewed Chemistry Flashcards', time: '4 hours ago', score: '92%' },
                { action: 'Studied Biology Concepts', time: 'Yesterday', score: '78%' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {activity.score}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: '12-Day Study Streak', description: 'Consistency Champion!', icon: '🔥' },
                { title: 'Physics Master', description: 'Completed all Newton\'s Laws', icon: '🏆' },
                { title: 'Speed Demon', description: 'Completed test in record time', icon: '⚡' }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
