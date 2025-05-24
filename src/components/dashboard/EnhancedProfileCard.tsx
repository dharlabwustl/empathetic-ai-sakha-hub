
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { 
  User, 
  Settings, 
  Calendar, 
  Target,
  Smile,
  Frown,
  Meh,
  Heart,
  Zap,
  Coffee,
  Brain,
  Star
} from 'lucide-react';

interface EnhancedProfileCardProps {
  userProfile: UserProfileBase;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  onProfileImageUpdate?: (imageUrl: string) => void;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({
  userProfile,
  currentMood,
  onMoodChange,
  onProfileImageUpdate
}) => {
  const [isEditingMood, setIsEditingMood] = useState(false);

  const getMoodIcon = (mood?: MoodType) => {
    switch (mood) {
      case MoodType.Happy:
        return <Smile className="h-4 w-4" />;
      case MoodType.Sad:
        return <Frown className="h-4 w-4" />;
      case MoodType.Motivated:
        return <Zap className="h-4 w-4" />;
      case MoodType.Tired:
        return <Coffee className="h-4 w-4" />;
      case MoodType.Focused:
        return <Brain className="h-4 w-4" />;
      case MoodType.Excited:
        return <Star className="h-4 w-4" />;
      case MoodType.Stressed:
        return <Target className="h-4 w-4" />;
      case MoodType.Neutral:
      case MoodType.Okay:
        return <Meh className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  const getMoodColor = (mood?: MoodType) => {
    switch (mood) {
      case MoodType.Happy:
        return 'text-yellow-500 bg-yellow-50';
      case MoodType.Sad:
        return 'text-blue-500 bg-blue-50';
      case MoodType.Motivated:
        return 'text-orange-500 bg-orange-50';
      case MoodType.Tired:
        return 'text-gray-500 bg-gray-50';
      case MoodType.Focused:
        return 'text-purple-500 bg-purple-50';
      case MoodType.Excited:
        return 'text-pink-500 bg-pink-50';
      case MoodType.Stressed:
        return 'text-red-500 bg-red-50';
      default:
        return 'text-green-500 bg-green-50';
    }
  };

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    setIsEditingMood(false);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  const formatMoodText = (mood?: MoodType) => {
    if (!mood) return 'Not set';
    return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage 
              src={userProfile.avatar || userProfile.photoURL} 
              alt={userProfile.name} 
            />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials(userProfile.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{userProfile.name || 'Student'}</h3>
            <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            {userProfile.examPreparation && (
              <Badge variant="secondary" className="mt-1">
                {userProfile.examPreparation}
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Mood</span>
            {!isEditingMood ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingMood(true)}
                className={`h-8 px-3 ${getMoodColor(currentMood)}`}
              >
                {getMoodIcon(currentMood)}
                <span className="ml-2 text-xs">
                  {formatMoodText(currentMood)}
                </span>
              </Button>
            ) : (
              <Select onValueChange={(value) => handleMoodChange(value as MoodType)}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue placeholder="Select mood" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MoodType).map((mood) => (
                    <SelectItem key={mood} value={mood}>
                      <div className="flex items-center gap-2">
                        {getMoodIcon(mood)}
                        <span>{formatMoodText(mood)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {userProfile.studyStreak && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Study Streak</span>
              <Badge className="bg-orange-100 text-orange-800">
                🔥 {userProfile.studyStreak} days
              </Badge>
            </div>
          )}

          {userProfile.goals && userProfile.goals.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Goals</span>
              {userProfile.goals.slice(0, 2).map((goal) => (
                <div key={goal.id} className="flex items-center gap-2">
                  <Target className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">{goal.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {goal.progress}%
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {userProfile.studyPreferences && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Study Pace</span>
              <Badge variant="outline">
                {userProfile.studyPreferences.pace}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedProfileCard;
