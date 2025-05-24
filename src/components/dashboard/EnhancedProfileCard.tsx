
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfileBase, MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel, getMoodColor } from './student/mood-tracking/moodUtils';
import { Edit, Settings, Calendar, Trophy } from 'lucide-react';

interface EnhancedProfileCardProps {
  userProfile: UserProfileBase;
  onEditProfile?: () => void;
}

const moodDisplayNames: Record<MoodType, string> = {
  [MoodType.Happy]: 'Happy',
  [MoodType.Motivated]: 'Motivated',
  [MoodType.Focused]: 'Focused',
  [MoodType.Calm]: 'Calm',
  [MoodType.Tired]: 'Tired',
  [MoodType.Confused]: 'Confused',
  [MoodType.Anxious]: 'Anxious',
  [MoodType.Stressed]: 'Stressed',
  [MoodType.Overwhelmed]: 'Overwhelmed',
  [MoodType.Neutral]: 'Neutral',
  [MoodType.Okay]: 'Okay',
  [MoodType.Sad]: 'Sad',
  [MoodType.Curious]: 'Curious'
};

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({ 
  userProfile, 
  onEditProfile 
}) => {
  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
              <AvatarImage src={userProfile.avatar || userProfile.photoURL} />
              <AvatarFallback className="bg-blue-500 text-white">
                {userProfile.name?.charAt(0) || userProfile.email.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{userProfile.name || 'Student'}</CardTitle>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onEditProfile}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Exam Goal</span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {userProfile.examGoal || 'Not set'}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">Study Streak</span>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              {userProfile.studyStreak || 0} days
            </Badge>
          </div>
        </div>
        
        {userProfile.mood && (
          <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getMoodEmoji(userProfile.mood)}</span>
              <span className="text-sm font-medium">Current Mood</span>
            </div>
            <Badge className={`mt-1 ${getMoodColor(userProfile.mood)}`}>
              {moodDisplayNames[userProfile.mood]}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedProfileCard;
