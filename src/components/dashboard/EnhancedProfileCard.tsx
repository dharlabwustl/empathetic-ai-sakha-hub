
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';
import { getMoodEmoji, getMoodLabel } from './student/mood-tracking/moodUtils';

interface EnhancedProfileCardProps {
  userProfile: any;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({
  userProfile,
  currentMood,
  onMoodChange
}) => {
  const quickMoods = [
    { type: MoodType.Happy, label: 'Happy' },
    { type: MoodType.Motivated, label: 'Motivated' },
    { type: MoodType.Focused, label: 'Focused' },
    { type: MoodType.Calm, label: 'Calm' },
    { type: MoodType.Tired, label: 'Tired' },
    { type: MoodType.Confused, label: 'Confused' },
    { type: MoodType.Anxious, label: 'Anxious' },
    { type: MoodType.Stressed, label: 'Stressed' },
    { type: MoodType.Overwhelmed, label: 'Overwhelmed' },
    { type: MoodType.Neutral, label: 'Neutral' },
    { type: MoodType.Okay, label: 'Okay' },
    { type: MoodType.Sad, label: 'Sad' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {userProfile?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{userProfile?.name || 'User'}</h3>
            <p className="text-gray-600">{userProfile?.email}</p>
            <Badge variant="outline">{userProfile?.subscription?.type || 'Free'}</Badge>
          </div>
        </div>

        {/* Current Mood Display */}
        <div className="space-y-2">
          <h4 className="font-medium">Current Mood</h4>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getMoodEmoji(currentMood)}</span>
            <span className="text-sm text-gray-600">
              {currentMood ? getMoodLabel(currentMood) : 'Not set'}
            </span>
          </div>
        </div>

        {/* Quick Mood Selection */}
        <div className="space-y-2">
          <h4 className="font-medium">Quick Mood Update</h4>
          <div className="flex flex-wrap gap-1">
            {quickMoods.slice(0, 6).map((mood) => (
              <Button
                key={mood.type}
                variant={currentMood === mood.type ? "default" : "outline"}
                size="sm"
                onClick={() => onMoodChange?.(mood.type)}
                className="text-xs"
              >
                {getMoodEmoji(mood.type)}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedProfileCard;
