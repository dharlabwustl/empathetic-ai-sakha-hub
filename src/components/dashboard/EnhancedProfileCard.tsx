import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserProfileType, MoodType } from '@/types/user/base';
import { 
  Crown, 
  Calendar, 
  Target, 
  BookOpen, 
  TrendingUp,
  Clock,
  Brain,
  Star,
  Users,
  Zap
} from 'lucide-react';

interface EnhancedProfileCardProps {
  userProfile: UserProfileType;
  onEditProfile?: () => void;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({
  userProfile,
  onEditProfile
}) => {
  const getMoodEmoji = (mood: MoodType) => {
    const moodEmojis: Record<MoodType, string> = {
      [MoodType.Happy]: '😊',
      [MoodType.Motivated]: '💪',
      [MoodType.Focused]: '🎯',
      [MoodType.Calm]: '😌',
      [MoodType.Tired]: '😴',
      [MoodType.Confused]: '🤔',
      [MoodType.Anxious]: '😰',
      [MoodType.Stressed]: '😫',
      [MoodType.Overwhelmed]: '🤯',
      [MoodType.Neutral]: '😐',
      [MoodType.Okay]: '👍',
      [MoodType.Sad]: '😢'
    };
    return moodEmojis[mood] || '😐';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const calculateProgress = () => {
    // Replace with actual logic to calculate progress
    return Math.floor(Math.random() * 100);
  };

  const progressValue = calculateProgress();

  return (
    <Card className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          Your Profile
        </CardTitle>
        <Button variant="outline" size="sm" onClick={onEditProfile}>
          Edit Profile
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback className="bg-purple-600 text-white">
              {getInitials(userProfile.name || 'User')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-medium">{userProfile.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userProfile.email}
            </p>
            <div className="mt-1">
              <Badge variant="secondary">
                {userProfile.role}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Exam Goal</p>
            <Target className="h-4 w-4 text-gray-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {userProfile.examPreparation || 'Not set'}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Learning Style</p>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {userProfile.personalityType || 'Not set'}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Study Pace</p>
            <Clock className="h-4 w-4 text-gray-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {userProfile.studyPreferences?.pace || 'Not set'}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Current Mood</p>
            <Zap className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{userProfile.mood ? getMoodEmoji(userProfile.mood) : '😐'}</span>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {userProfile.mood || 'Not set'}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Overall Progress</p>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </div>
          <Progress value={progressValue} />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {progressValue}% Completed
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedProfileCard;
