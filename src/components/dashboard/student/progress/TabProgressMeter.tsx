
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Target, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { TabProgressData } from '@/hooks/useTabProgress';

interface TabProgressMeterProps {
  tabName: string;
  progressData: TabProgressData;
  showDetailed?: boolean;
}

const TabProgressMeter: React.FC<TabProgressMeterProps> = ({
  tabName,
  progressData,
  showDetailed = true
}) => {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-blue-500 to-cyan-600';
    if (percentage >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  if (!showDetailed) {
    return (
      <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex-1">
          <div className="text-xs font-medium mb-1">{tabName} Progress</div>
          <Progress value={progressData.completionPercentage} className="h-2" />
        </div>
        <Badge variant="outline" className="text-xs">
          {Math.round(progressData.completionPercentage)}%
        </Badge>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            {tabName} Progress
          </span>
          <Badge 
            variant="outline" 
            className={`bg-gradient-to-r ${getProgressColor(progressData.completionPercentage)} text-white border-none`}
          >
            {Math.round(progressData.completionPercentage)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Completion</span>
            <span>{progressData.tasksCompleted}/{progressData.totalTasks} tasks</span>
          </div>
          <Progress 
            value={progressData.completionPercentage} 
            className="h-3"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          >
            <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-600">
              {formatTime(progressData.timeSpent)}
            </div>
            <div className="text-xs text-muted-foreground">Time Spent</div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
          >
            <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-600">
              {progressData.tasksCompleted}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
          >
            <Flame className="h-5 w-5 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-600">
              {progressData.streak}
            </div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </motion.div>
        </div>

        {/* Last Activity */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Last active: {new Date(progressData.lastActive).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default TabProgressMeter;
