
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Target, Trophy, Flame } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanHeaderProps {
  planData: TodaysPlanData | null;
  isMobile?: boolean;
}

const TodaysPlanHeader: React.FC<TodaysPlanHeaderProps> = ({ planData, isMobile }) => {
  if (!planData) return null;

  const progressPercentage = (planData.completedTasks / planData.totalTasks) * 100;
  const timeSpent = planData.timeAllocation.concepts + planData.timeAllocation.flashcards + planData.timeAllocation.practiceExams;
  
  return (
    <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-0 shadow-lg">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Today's Study Plan</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
              <Flame className="h-3 w-3 mr-1" />
              {planData.streak} day streak
            </Badge>
          </div>
        </div>

        {/* Main Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
              <span className="text-sm font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>{planData.completedTasks}/{planData.totalTasks} tasks</span>
              </div>
            </div>
          </div>

          {/* Time Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Invested</span>
              <span className="text-sm font-bold text-green-600">{timeSpent} min</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Concepts</span>
                </div>
                <span>{planData.timeAllocation.concepts}m</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Flashcards</span>
                </div>
                <span>{planData.timeAllocation.flashcards}m</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Practice</span>
                </div>
                <span>{planData.timeAllocation.practiceExams}m</span>
              </div>
            </div>
          </div>

          {/* Achievement Status */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Today's Goal</span>
              <Trophy className={`h-4 w-4 ${progressPercentage >= 100 ? 'text-yellow-500' : 'text-gray-400'}`} />
            </div>
            <div className="space-y-2">
              {progressPercentage >= 100 ? (
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    🎉 Congratulations! You've completed today's plan!
                  </p>
                </div>
              ) : progressPercentage >= 75 ? (
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    🚀 Almost there! Just a few more tasks to go!
                  </p>
                </div>
              ) : progressPercentage >= 50 ? (
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    💪 Great progress! Keep up the momentum!
                  </p>
                </div>
              ) : (
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    ⭐ Let's start strong today!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanHeader;
