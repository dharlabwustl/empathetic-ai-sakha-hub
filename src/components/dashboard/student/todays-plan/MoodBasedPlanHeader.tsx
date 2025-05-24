
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { Progress } from '@/components/ui/progress';
import { MoodType } from '@/types/user/base';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';
import { getMoodTheme } from '@/components/dashboard/student/moodThemes';
import { Calendar, Clock, Target, TrendingUp, Heart } from 'lucide-react';

interface MoodBasedPlanHeaderProps {
  planData: TodaysPlanData | null;
  currentMood?: MoodType;
  onMoodChange: (mood: MoodType) => void;
  isMobile?: boolean;
}

const MoodBasedPlanHeader: React.FC<MoodBasedPlanHeaderProps> = ({ 
  planData, 
  currentMood, 
  onMoodChange,
  isMobile 
}) => {
  if (!planData) return null;
  
  const moodTheme = currentMood ? getMoodTheme(currentMood) : getMoodTheme('okay');
  const completionPercentage = Math.round((planData.completedTasks / planData.totalTasks) * 100);

  return (
    <div className="space-y-4">
      {/* Mood Selection Section */}
      <Card className={`${moodTheme.background} ${moodTheme.border} border-2`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Heart className={`h-5 w-5 ${moodTheme.accent}`} />
            <CardTitle className={`text-lg ${moodTheme.text}`}>
              How are you feeling today?
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <MoodSelector 
            currentMood={currentMood}
            onMoodSelect={onMoodChange}
            variant="compact"
          />
          {currentMood && (
            <div className="mt-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <p className={`text-sm ${moodTheme.text}`}>
                Your plan has been personalized based on your {currentMood.toLowerCase()} mood. 
                {currentMood === MoodType.MOTIVATED && " Extra challenging tasks added for you!"}
                {currentMood === MoodType.TIRED && " We've made it lighter and more manageable."}
                {currentMood === MoodType.FOCUSED && " Perfect! Ready for some deep learning."}
                {currentMood === MoodType.STRESSED && " Let's take it easy with shorter sessions."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Study Plan
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {planData.streak} day streak
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Progress</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{planData.completedTasks}</span>
                <span className="text-gray-500">/ {planData.totalTasks} tasks</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <p className="text-xs text-gray-500">{completionPercentage}% completed</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Time Allocation</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-lg font-semibold">{planData.timeAllocation.total}</span>
                <span className="text-gray-500">minutes</span>
              </div>
              <div className="flex flex-wrap gap-1 text-xs">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Concepts: {planData.timeAllocation.concepts}m
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  Practice: {planData.timeAllocation.practiceExams}m
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Performance</h3>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-lg font-semibold text-green-600">85%</span>
                <span className="text-gray-500">avg score</span>
              </div>
              <p className="text-xs text-green-600">↗ +5% from yesterday</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodBasedPlanHeader;
