import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfileType, MoodType } from '@/types/user/base';
import { Crown, Calendar, Target, BookOpen, TrendingUp } from 'lucide-react';

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  currentStreak?: number;
  onMoodChange?: (mood: MoodType) => void;
  formattedTime?: string;
  formattedDate?: string;
  onViewStudyPlan?: () => void;
  upcomingEvents?: Array<{
    title: string;
    time: string;
    type: "exam" | "task" | "revision";
  }>;
  isFirstTimeUser?: boolean;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  currentStreak = 0,
  onMoodChange,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  upcomingEvents = [],
  isFirstTimeUser = false
}) => {
  const getMoodEmoji = (mood?: MoodType) => {
    if (!mood) return '😐';
    
    const moodEmojis: Record<MoodType, string> = {
      [MoodType.Happy]: '😊',
      [MoodType.Motivated]: '💪',
      [MoodType.Focused]: '🎯',
      [MoodType.Calm]: '😌',
      [MoodType.Tired]: '😴',
      [MoodType.Anxious]: '😰',
      [MoodType.Stressed]: '😫',
      [MoodType.Overwhelmed]: '🤯',
      [MoodType.Neutral]: '😐',
      [MoodType.Okay]: '👍',
      [MoodType.Sad]: '😢'
    };
    return moodEmojis[mood] || '😐';
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 border-purple-100 dark:border-purple-800/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {isFirstTimeUser ? "Welcome to Lovable!" : "Dashboard Overview"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate} • {formattedTime}
            </p>
          </div>
          
          {onViewStudyPlan && (
            <Button variant="outline" size="sm" onClick={onViewStudyPlan}>
              <Calendar className="mr-2 h-4 w-4" />
              View Study Plan
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <Crown className="mr-2 h-4 w-4 text-yellow-500" />
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Current Streak</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{currentStreak} Days</p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <Target className="mr-2 h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Exam Goal</h3>
            </div>
            <p className="text-base text-gray-900 dark:text-gray-100">{userProfile.examPreparation || "Not Set"}</p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <BookOpen className="mr-2 h-4 w-4 text-green-500" />
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Learning Style</h3>
            </div>
            <p className="text-base text-gray-900 dark:text-gray-100">{userProfile.personalityType || "Not Set"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedDashboardHeader;
