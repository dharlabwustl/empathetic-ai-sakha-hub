
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Clock, Flame, Trophy } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanHeaderProps {
  planData: TodaysPlanData | null;
  isMobile?: boolean;
}

const TodaysPlanHeader: React.FC<TodaysPlanHeaderProps> = ({ planData, isMobile = false }) => {
  if (!planData) return null;

  const progressPercentage = planData.totalTasks > 0 ? (planData.completedTasks / planData.totalTasks) * 100 : 0;
  const totalTimeCompleted = Math.round((progressPercentage / 100) * planData.timeAllocation.total);

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Today's Study Plan
          </CardTitle>
          <Badge variant="outline" className="bg-white dark:bg-gray-800">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Progress</p>
              <p className="text-lg font-bold">{planData.completedTasks}/{planData.totalTasks}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time Spent</p>
              <p className="text-lg font-bold">{totalTimeCompleted}m/{planData.timeAllocation.total}m</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
              <Flame className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Study Streak</p>
              <p className="text-lg font-bold">{planData.streak} days</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Trophy className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion</p>
              <p className="text-lg font-bold">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
        </div>

        {/* Main Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Overall Progress</span>
            <span className="text-gray-600 dark:text-gray-400">{Math.round(progressPercentage)}% complete</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-gray-200 dark:bg-gray-700"
          />
        </div>

        {/* Quick Stats */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Goal: {planData.examGoal || 'NEET'}</span>
          <span>Backlog: {planData.backlogTasks?.length || 0} tasks</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanHeader;
