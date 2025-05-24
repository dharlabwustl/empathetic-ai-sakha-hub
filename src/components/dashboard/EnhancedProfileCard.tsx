
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Trophy, 
  Calendar, 
  Target,
  BookOpen,
  Heart,
  Zap,
  TrendingUp,
  Award,
  Clock,
  Star
} from 'lucide-react';
import { UserProfileType, MoodType } from '@/types/user/base';

interface EnhancedProfileCardProps {
  user: UserProfileType;
  onEditProfile?: () => void;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({ 
  user, 
  onEditProfile 
}) => {
  const getMoodEmoji = (mood: MoodType) => {
    switch (mood) {
      case MoodType.Happy: return '😊';
      case MoodType.Motivated: return '💪';
      case MoodType.Focused: return '🎯';
      case MoodType.Calm: return '😌';
      case MoodType.Tired: return '😴';
      case MoodType.Confused: return '🤔';
      case MoodType.Anxious: return '😰';
      case MoodType.Stressed: return '😫';
      case MoodType.Overwhelmed: return '🤯';
      case MoodType.Neutral: return '😐';
      case MoodType.Okay: return '👍';
      case MoodType.Sad: return '😢';
      default: return '😐';
    }
  };

  const getMoodColor = (mood: MoodType) => {
    switch (mood) {
      case MoodType.Happy:
      case MoodType.Motivated:
      case MoodType.Focused:
      case MoodType.Calm:
        return 'text-green-600 bg-green-100';
      case MoodType.Tired:
      case MoodType.Confused:
        return 'text-yellow-600 bg-yellow-100';
      case MoodType.Anxious:
      case MoodType.Stressed:
      case MoodType.Overwhelmed:
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src={user.avatar || user.photoURL} alt={user.name} />
              <AvatarFallback className="bg-white text-blue-600 text-lg font-bold">
                {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{user.name || 'Student'}</CardTitle>
              <p className="text-blue-100">{user.email}</p>
              {user.examPreparation && (
                <Badge variant="secondary" className="mt-1 bg-white/20 text-white">
                  {user.examPreparation}
                </Badge>
              )}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={onEditProfile}
          >
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Current Mood */}
        {user.mood && (
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{getMoodEmoji(user.mood)}</div>
              <div>
                <h3 className="font-semibold">Current Mood</h3>
                <Badge className={getMoodColor(user.mood)}>
                  {user.mood}
                </Badge>
              </div>
            </div>
            <Heart className="h-5 w-5 text-red-500" />
          </div>
        )}

        {/* Study Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Trophy className="h-6 w-6 mx-auto text-blue-600 mb-1" />
            <div className="text-lg font-bold text-blue-600">{user.studyStreak || 0}</div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Target className="h-6 w-6 mx-auto text-green-600 mb-1" />
            <div className="text-lg font-bold text-green-600">{user.goals?.length || 0}</div>
            <div className="text-xs text-gray-600">Goals Set</div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <BookOpen className="h-6 w-6 mx-auto text-purple-600 mb-1" />
            <div className="text-lg font-bold text-purple-600">{user.subjects?.length || 0}</div>
            <div className="text-xs text-gray-600">Subjects</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Clock className="h-6 w-6 mx-auto text-orange-600 mb-1" />
            <div className="text-lg font-bold text-orange-600">4.5h</div>
            <div className="text-xs text-gray-600">Today</div>
          </div>
        </div>

        {/* Goals Progress */}
        {user.goals && user.goals.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Active Goals
            </h3>
            {user.goals.slice(0, 3).map((goal) => (
              <div key={goal.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{goal.title}</span>
                  <span className="text-xs text-gray-500">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>Target: {goal.targetDate}</span>
                  <span>{goal.targetYear}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subscription Status */}
        {user.subscription && (
          <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-600" />
                <span className="font-semibold">
                  {user.subscription.planType} Plan
                </span>
                <Badge variant={user.subscription.isActive ? "default" : "secondary"}>
                  {user.subscription.status || (user.subscription.isActive ? "Active" : "Inactive")}
                </Badge>
              </div>
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
            {user.subscription.endDate && (
              <p className="text-sm text-gray-600 mt-1">
                Expires: {new Date(user.subscription.endDate).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        {/* Recent Activity */}
        {user.recentActivity && (
          <div className="text-sm text-gray-600">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">Recent Activity</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Last Login: {user.recentActivity.lastLogin?.toLocaleDateString()}</div>
              <div>Completed Tasks: {user.recentActivity.completedTasks}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedProfileCard;
