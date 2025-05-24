
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User, BookOpen, Target, Trophy, Clock } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import MoodLogButton from './MoodLogButton';

interface EnhancedDashboardHeaderProps {
  userProfile: any;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  studyStreak?: number;
  todayStudyTime?: number;
  weeklyGoal?: number;
  unreadNotifications?: number;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  currentMood,
  onMoodChange,
  studyStreak = 5,
  todayStudyTime = 2.5,
  weeklyGoal = 20,
  unreadNotifications = 3
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = () => {
    if (currentMood) {
      const moodMessages: Partial<Record<MoodType, string>> = {
        [MoodType.Happy]: "You're glowing today! Perfect energy for learning.",
        [MoodType.Motivated]: "That motivation is contagious! Let's achieve great things.",
        [MoodType.Focused]: "Your focus is your superpower. Use it wisely!",
        [MoodType.Tired]: "Rest is productive too. Take care of yourself.",
        [MoodType.Stressed]: "One step at a time. You've got this!",
        [MoodType.Anxious]: "Deep breaths. You're stronger than you think.",
      };
      return moodMessages[currentMood] || "Every moment is a chance to learn something new.";
    }
    return "Ready to make today amazing?";
  };

  const progressPercentage = Math.min((todayStudyTime / (weeklyGoal / 7)) * 100, 100);

  return (
    <div className="space-y-4">
      {/* Main Header Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {getGreeting()}, {userProfile?.name?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-md">
                {getMotivationalMessage()}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <Badge variant="secondary" className="text-xs">
                  🔥 {studyStreak} day streak
                </Badge>
                <Badge variant="outline" className="text-xs">
                  📚 {userProfile?.subscription?.type || 'Free'} Plan
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MoodLogButton 
                currentMood={currentMood}
                onMoodChange={onMoodChange}
                showLabel={false}
              />
              
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-red-500">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Study</p>
                <p className="text-xl font-bold text-blue-600">{todayStudyTime}h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500 opacity-60" />
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(progressPercentage)}% of daily goal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Concepts Mastered</p>
                <p className="text-xl font-bold text-green-600">68%</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500 opacity-60" />
            </div>
            <p className="text-xs text-green-600 mt-2">+5% this week</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Practice Tests</p>
                <p className="text-xl font-bold text-purple-600">12</p>
              </div>
              <Target className="h-8 w-8 text-purple-500 opacity-60" />
            </div>
            <p className="text-xs text-purple-600 mt-2">3 this week</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Achievements</p>
                <p className="text-xl font-bold text-yellow-600">15</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500 opacity-60" />
            </div>
            <p className="text-xs text-yellow-600 mt-2">2 new badges</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
