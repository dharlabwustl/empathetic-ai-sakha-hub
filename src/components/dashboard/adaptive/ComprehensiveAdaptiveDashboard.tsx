
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { BookOpen, Target, Calendar, Clock, TrendingUp, Users, Award, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [activeKpiIndex, setActiveKpiIndex] = useState(0);

  const examGoalData = useMemo(() => ({
    examName: userProfile.examPreparation || "NEET",
    targetDate: "May 2024",
    daysRemaining: 120,
    overallProgress: 68,
    weeklyGoal: "Complete 3 chapters",
    currentWeek: "Week 8 of 12"
  }), [userProfile]);

  const studyStats = [
    { label: "Learning Style", value: userProfile.personalityType || "Analytical", icon: <BookOpen className="h-4 w-4" /> },
    { label: "Study Pace", value: userProfile.studyPreferences?.pace || "Moderate", icon: <TrendingUp className="h-4 w-4" /> },
    { label: "Daily Study Hours", value: `${userProfile.studyPreferences?.hoursPerDay || "4"} hours`, icon: <Clock className="h-4 w-4" /> },
    { label: "Study Streak", value: `${userProfile.studyStreak || 12} days`, icon: <Target className="h-4 w-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Exam Goal Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Current Exam Goal</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-semibold">
              {examGoalData.examName}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Target Date</p>
              <p className="font-semibold text-gray-900 dark:text-white">{examGoalData.targetDate}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Days Remaining</p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">{examGoalData.daysRemaining}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Weekly Goal</p>
              <p className="font-semibold text-gray-900 dark:text-white">{examGoalData.weeklyGoal}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
              <p className="font-semibold text-green-600 dark:text-green-400">{examGoalData.currentWeek}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">Overall Progress</span>
              <span className="font-medium text-gray-900 dark:text-white">{examGoalData.overallProgress}%</span>
            </div>
            <Progress value={examGoalData.overallProgress} className="h-3" />
          </div>
          
          <div className="flex gap-3">
            <Button size="sm" variant="outline" className="flex-1">
              Switch Plan
            </Button>
            <Button size="sm" className="flex-1">
              New Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {studyStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-blue-600 dark:text-blue-400">
                    {stat.icon}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
