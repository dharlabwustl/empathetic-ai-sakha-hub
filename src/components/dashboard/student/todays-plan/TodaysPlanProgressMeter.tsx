
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, Target, Calendar } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { motion } from 'framer-motion';

interface TodaysPlanProgressMeterProps {
  planData: TodaysPlanData | null;
  isMobile?: boolean;
}

const TodaysPlanProgressMeter: React.FC<TodaysPlanProgressMeterProps> = ({ 
  planData, 
  isMobile = false 
}) => {
  if (!planData) return null;

  const completionPercentage = planData.totalTasks > 0 
    ? Math.round((planData.completedTasks / planData.totalTasks) * 100)
    : 0;

  const timeSpent = planData.timeAllocation ? 
    Object.values(planData.timeAllocation).reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0) - (planData.timeAllocation.total || 0)
    : 0;

  const totalTime = planData.timeAllocation?.total || 160;
  const timePercentage = timeSpent > 0 ? Math.round((timeSpent / totalTime) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            Today's Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Task Completion Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Task Completion</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {planData.completedTasks}/{planData.totalTasks} Tasks
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {completionPercentage}% of today's tasks completed
            </p>
          </div>

          {/* Time Allocation Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="font-medium">Time Allocation</span>
              </div>
              <span className="text-sm font-semibold text-orange-600">
                {totalTime} minutes planned
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {planData.timeAllocation && (
                <>
                  <div className="text-center">
                    <p className="font-medium text-purple-600">{planData.timeAllocation.concepts}m</p>
                    <p className="text-gray-500">Concepts</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-green-600">{planData.timeAllocation.flashcards}m</p>
                    <p className="text-gray-500">Flashcards</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-blue-600">{planData.timeAllocation.practiceExams}m</p>
                    <p className="text-gray-500">Practice</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-yellow-600">{planData.timeAllocation.revision}m</p>
                    <p className="text-gray-500">Revision</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Streak Information */}
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-500" />
              <span className="font-medium">Study Streak</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-500">{planData.streak} days</p>
              <p className="text-xs text-gray-500">Keep it going!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysPlanProgressMeter;
