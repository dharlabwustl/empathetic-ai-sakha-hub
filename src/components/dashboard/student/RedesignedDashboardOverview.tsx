
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Calendar, 
  BookOpen, 
  Trophy, 
  RotateCcw, 
  Zap, 
  Clock,
  TrendingUp,
  Brain,
  Users,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserProfileType, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ExamGoalCard from './dashboard-sections/ExamGoalCard';
import { getCurrentMoodFromLocalStorage } from './mood-tracking/moodUtils';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  // Premium card styling utility
  const premiumCardClasses = "bg-gradient-to-br from-white/90 via-white to-gray-50/80 dark:from-gray-900/90 dark:via-gray-900 dark:to-gray-800/80 border-2 border-gray-200/60 dark:border-gray-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm relative overflow-hidden";

  const premiumOverlay = (
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent pointer-events-none" />
  );

  return (
    <div className="space-y-6 relative">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${premiumCardClasses}`}
      >
        {premiumOverlay}
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {userProfile.name}! ✨
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Ready to continue your exam preparation journey?</p>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">Premium Experience</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Goal Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ExamGoalCard currentMood={currentMood} onMoodChange={handleMoodChange} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`${premiumCardClasses}`}
        >
          {premiumOverlay}
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              <Zap className="h-5 w-5 text-green-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Jump into your studies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 relative z-10">
            <Link to="/dashboard/student/today">
              <Button className="w-full justify-between bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Today's Plan
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/dashboard/student/concepts">
              <Button variant="outline" className="w-full justify-between bg-white/80 hover:bg-white border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Study Concepts
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/dashboard/student/practice-exam">
              <Button variant="outline" className="w-full justify-between bg-white/80 hover:bg-white border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Practice Tests
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </motion.div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${premiumCardClasses}`}
        >
          {premiumOverlay}
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Streak</p>
                <p className="text-2xl font-bold text-orange-600">5 days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${premiumCardClasses}`}
        >
          {premiumOverlay}
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tests Completed</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`${premiumCardClasses}`}
        >
          {premiumOverlay}
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accuracy Rate</p>
                <p className="text-2xl font-bold text-blue-600">87%</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`${premiumCardClasses}`}
      >
        {premiumOverlay}
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <Clock className="h-5 w-5 text-purple-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 relative z-10">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Completed Physics - Motion chapter</span>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50/80 to-blue-50/80 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg border border-green-200/50 dark:border-green-700/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Scored 85% in Chemistry quiz</span>
            </div>
            <span className="text-xs text-gray-500">Yesterday</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200/50 dark:border-purple-700/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Practiced 20 Biology flashcards</span>
            </div>
            <span className="text-xs text-gray-500">2 days ago</span>
          </div>
        </CardContent>
      </motion.div>
    </div>
  );
};

export default RedesignedDashboardOverview;
