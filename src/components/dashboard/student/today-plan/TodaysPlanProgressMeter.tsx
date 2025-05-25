
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, TrendingUp, Calendar } from 'lucide-react';

interface TodaysPlanProgressMeterProps {
  planData: any;
  isMobile: boolean;
}

const TodaysPlanProgressMeter: React.FC<TodaysPlanProgressMeterProps> = ({ planData, isMobile }) => {
  const progressPercentage = planData?.overallProgress || 35;
  const completedTasks = planData?.completedTasks || 3;
  const totalTasks = planData?.totalTasks || 8;
  const timeSpent = planData?.timeSpent || 45;
  const targetTime = planData?.targetTime || 180;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-100 dark:border-blue-900/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                Today's Progress
              </h3>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
              {progressPercentage}% Complete
            </Badge>
          </div>

          {/* Main Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-300">Overall Progress</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-white/50 dark:bg-gray-800/50" />
          </div>

          {/* Statistics Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Target className="h-4 w-4 text-green-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {completedTasks}/{totalTasks}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Tasks</div>
            </div>

            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-4 w-4 text-purple-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {timeSpent}m
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Time Spent</div>
            </div>

            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-orange-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {Math.round((timeSpent / targetTime) * 100)}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Time Goal</div>
            </div>

            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Target className="h-4 w-4 text-blue-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {targetTime - timeSpent}m
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysPlanProgressMeter;
