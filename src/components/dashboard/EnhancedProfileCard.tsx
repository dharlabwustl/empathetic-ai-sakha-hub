
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UserProfileBase, MoodType } from '@/types/user/base';
import { User, Calendar, Target, Zap, Heart, TrendingUp } from 'lucide-react';

interface EnhancedProfileCardProps {
  userProfile: UserProfileBase;
}

const moodColors: Record<MoodType, string> = {
  [MoodType.HAPPY]: 'bg-yellow-100 text-yellow-800',
  [MoodType.MOTIVATED]: 'bg-green-100 text-green-800',
  [MoodType.FOCUSED]: 'bg-blue-100 text-blue-800',
  [MoodType.TIRED]: 'bg-gray-100 text-gray-800',
  [MoodType.ANXIOUS]: 'bg-red-100 text-red-800',
  [MoodType.STRESSED]: 'bg-orange-100 text-orange-800',
  [MoodType.CONFIDENT]: 'bg-purple-100 text-purple-800',
  [MoodType.EXCITED]: 'bg-pink-100 text-pink-800',
  [MoodType.CALM]: 'bg-teal-100 text-teal-800',
  [MoodType.CONFUSED]: 'bg-amber-100 text-amber-800',
  [MoodType.OVERWHELMED]: 'bg-red-200 text-red-900',
  [MoodType.NEUTRAL]: 'bg-slate-100 text-slate-800',
  [MoodType.SAD]: 'bg-indigo-100 text-indigo-800',
  [MoodType.CURIOUS]: 'bg-emerald-100 text-emerald-800',
  [MoodType.OKAY]: 'bg-cyan-100 text-cyan-800'
};

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({ userProfile }) => {
  const getMoodDisplay = (mood?: MoodType) => {
    if (!mood) return 'Not set';
    return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
  };

  // Mock data for demonstration
  const mockStudyStreak = 12;
  const mockGoalProgress = 75;
  const mockWeeklyGoal = 40;
  const mockCompletedHours = 30;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            {userProfile.photoURL || userProfile.avatar ? (
              <img 
                src={userProfile.photoURL || userProfile.avatar} 
                alt={userProfile.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">{userProfile.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            {userProfile.examPreparation && (
              <Badge variant="outline" className="mt-1">
                {userProfile.examPreparation}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Goals */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Weekly Study Goal
            </span>
            <span className="text-sm text-muted-foreground">
              {mockCompletedHours}/{mockWeeklyGoal}h
            </span>
          </div>
          <Progress value={mockGoalProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">{mockGoalProgress}% completed</p>
        </div>

        {/* Study Streak */}
        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
          <div className="flex items-center">
            <Zap className="w-5 h-5 text-amber-600 mr-2" />
            <div>
              <p className="text-sm font-medium">Study Streak</p>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-amber-600">{mockStudyStreak}</p>
            <p className="text-xs text-muted-foreground">days</p>
          </div>
        </div>

        {/* Current Mood */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            Current Mood
          </span>
          <Badge className={moodColors[userProfile.currentMood || userProfile.mood || MoodType.NEUTRAL]}>
            {getMoodDisplay(userProfile.currentMood || userProfile.mood)}
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{userProfile.loginCount || 0}</div>
            <div className="text-xs text-muted-foreground">Logins</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{userProfile.goals?.length || 0}</div>
            <div className="text-xs text-muted-foreground">Goals</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {userProfile.lastLogin ? Math.floor((Date.now() - new Date(userProfile.lastLogin).getTime()) / (1000 * 60 * 60 * 24)) : 'N/A'}
            </div>
            <div className="text-xs text-muted-foreground">Days ago</div>
          </div>
        </div>

        {/* Last Activity */}
        {userProfile.lastLogin && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            Last active: {new Date(userProfile.lastLogin).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedProfileCard;
