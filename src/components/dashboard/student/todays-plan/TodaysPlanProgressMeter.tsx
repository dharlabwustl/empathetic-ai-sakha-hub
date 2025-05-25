
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Brain, 
  Trophy,
  Zap,
  TrendingUp
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanProgressMeterProps {
  planData: TodaysPlanData | null;
  isMobile?: boolean;
}

const TodaysPlanProgressMeter: React.FC<TodaysPlanProgressMeterProps> = ({ 
  planData, 
  isMobile = false 
}) => {
  if (!planData) return null;

  const totalTasks = planData.totalTasks;
  const completedTasks = planData.completedTasks;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalTime = planData.timeAllocation.total;
  const completedTime = Math.round(totalTime * (progressPercentage / 100));

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent progress! 🎉';
    if (percentage >= 70) return 'Great job! Keep going! 💪';
    if (percentage >= 50) return 'Good momentum! 🚀';
    if (percentage >= 25) return 'Getting started! 📚';
    return 'Ready to begin! ⭐';
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{getProgressMessage(progressPercentage)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white dark:bg-gray-800 text-lg px-3 py-1">
              {planData.streak} day streak 🔥
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Overall Progress</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{progressPercentage}%</span>
          </div>
          <div className="relative">
            <Progress 
              value={progressPercentage} 
              className="h-4 bg-gray-200 dark:bg-gray-700"
            />
            <div 
              className={`absolute inset-0 h-4 rounded-full ${getProgressColor(progressPercentage)} transition-all duration-500`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedTasks}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalTasks - completedTasks}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalTime}m</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedTime}m</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Time Done</div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Breakdown */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Subject Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Concepts</span>
              </div>
              <Badge variant="outline">{planData.timeAllocation.concepts}m</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Flashcards</span>
              </div>
              <Badge variant="outline">{planData.timeAllocation.flashcards}m</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-600" />
                <span className="font-medium">Practice</span>
              </div>
              <Badge variant="outline">{planData.timeAllocation.practiceExams}m</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanProgressMeter;
