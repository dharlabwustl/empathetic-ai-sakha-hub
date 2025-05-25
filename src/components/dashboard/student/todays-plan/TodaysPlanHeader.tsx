
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Target, Trophy, Flame, CheckCircle } from 'lucide-react';
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

        {/* Unified Progress Section */}
        <div className="space-y-6">
          {/* Main Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Daily Progress</span>
              <span className="text-xl font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-4" />
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>{planData.completedTasks}/{planData.totalTasks} tasks completed</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{timeSpent} minutes studied</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Concepts */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Concepts</span>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {planData.concepts?.filter(c => c.status === 'completed').length || 0}/{planData.concepts?.length || 0}
              </div>
              <p className="text-xs text-gray-500">{planData.timeAllocation.concepts}m allocated</p>
            </div>

            {/* Flashcards */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Flashcards</span>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {planData.flashcards?.filter(f => f.status === 'completed').length || 0}/{planData.flashcards?.length || 0}
              </div>
              <p className="text-xs text-gray-500">{planData.timeAllocation.flashcards}m allocated</p>
            </div>

            {/* Practice Tests */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Practice</span>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {planData.practiceExams?.filter(p => p.status === 'completed').length || 0}/{planData.practiceExams?.length || 0}
              </div>
              <p className="text-xs text-gray-500">{planData.timeAllocation.practiceExams}m allocated</p>
            </div>

            {/* Achievement Status */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className={`h-4 w-4 ${progressPercentage >= 100 ? 'text-yellow-500' : 'text-gray-400'}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
              </div>
              <div className="text-sm">
                {progressPercentage >= 100 ? (
                  <span className="text-green-600 font-semibold">🎉 Complete!</span>
                ) : progressPercentage >= 75 ? (
                  <span className="text-blue-600 font-semibold">🚀 Almost there!</span>
                ) : progressPercentage >= 50 ? (
                  <span className="text-amber-600 font-semibold">💪 Great progress!</span>
                ) : (
                  <span className="text-purple-600 font-semibold">⭐ Let's start!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanHeader;
