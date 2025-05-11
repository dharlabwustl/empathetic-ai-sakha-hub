
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckCircle, ChevronRight, Clock, Edit, HeartPulse } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { MoodType } from '@/types/user/base';

interface UserStatus {
  online: boolean;
  lastActive?: string;
}

interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
  stats?: {
    streak: number;
    totalHours: number;
    completedTasks: number;
  };
  status?: UserStatus;
  mood?: MoodType;
  examGoal?: string;
  studyPace?: string;
}

interface EnhancedProfileCardProps {
  userProfile: UserProfile;
  className?: string;
}

const getMoodEmoji = (mood: MoodType | undefined): string => {
  if (!mood) return '😊';
  
  switch (mood) {
    case MoodType.HAPPY:
      return '😊';
    case MoodType.MOTIVATED:
      return '💪';
    case MoodType.FOCUSED:
      return '🧠';
    case MoodType.CALM:
      return '😌';
    case MoodType.TIRED:
      return '😴';
    case MoodType.CONFUSED:
      return '😕';
    case MoodType.ANXIOUS:
      return '😰';
    case MoodType.STRESSED:
      return '😓';
    case MoodType.OVERWHELMED:
      return '🥵';
    case MoodType.NEUTRAL:
      return '😐';
    case MoodType.OKAY:
      return '🙂';
    case MoodType.SAD:
      return '😢';
    default:
      return '😊';
  }
};

const getMoodLabel = (mood: MoodType | undefined): string => {
  if (!mood) return 'Happy';
  
  switch (mood) {
    case MoodType.HAPPY:
      return 'Happy';
    case MoodType.MOTIVATED:
      return 'Motivated';
    case MoodType.FOCUSED:
      return 'Focused';
    case MoodType.CALM:
      return 'Calm';
    case MoodType.TIRED:
      return 'Tired';
    case MoodType.CONFUSED:
      return 'Confused';
    case MoodType.ANXIOUS:
      return 'Anxious';
    case MoodType.STRESSED:
      return 'Stressed';
    case MoodType.OVERWHELMED:
      return 'Overwhelmed';
    case MoodType.NEUTRAL:
      return 'Neutral';
    case MoodType.OKAY:
      return 'Okay';
    case MoodType.SAD:
      return 'Sad';
    default:
      return 'Happy';
  }
};

const EnhancedProfileCard = ({ userProfile, className = '' }: EnhancedProfileCardProps) => {
  const [isEditingMood, setIsEditingMood] = useState(false);
  
  const handleMoodClick = () => {
    setIsEditingMood(!isEditingMood);
  };
  
  const handleSelectMood = (mood: MoodType) => {
    // Here you would update the user's mood
    console.log(`Selected mood: ${mood}`);
    setIsEditingMood(false);
  };
  
  const moods = [
    { type: MoodType.HAPPY, label: 'Happy' },
    { type: MoodType.MOTIVATED, label: 'Motivated' },
    { type: MoodType.FOCUSED, label: 'Focused' },
    { type: MoodType.CALM, label: 'Calm' },
    { type: MoodType.TIRED, label: 'Tired' },
    { type: MoodType.CONFUSED, label: 'Confused' },
    { type: MoodType.ANXIOUS, label: 'Anxious' },
    { type: MoodType.STRESSED, label: 'Stressed' },
    { type: MoodType.OVERWHELMED, label: 'Overwhelmed' },
    { type: MoodType.NEUTRAL, label: 'Neutral' },
    { type: MoodType.OKAY, label: 'Okay' },
    { type: MoodType.SAD, label: 'Sad' }
  ];

  return (
    <Card className={`w-full shadow-md overflow-hidden ${className}`}>
      <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback>{userProfile.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{userProfile.name}</CardTitle>
              <CardDescription>{userProfile.role}</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">
              {userProfile?.status?.online ? (
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  Online
                </span>
              ) : (
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Last seen {userProfile?.status?.lastActive || '1h ago'}
                </span>
              )}
            </div>
            <Popover open={isEditingMood} onOpenChange={setIsEditingMood}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" onClick={handleMoodClick} className="mt-1 h-auto py-1">
                  <span className="text-base mr-1">{getMoodEmoji(userProfile.mood)}</span>
                  <span className="text-xs">{getMoodLabel(userProfile.mood)}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">How are you feeling today?</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {moods.map((mood) => (
                      <Button
                        key={mood.type}
                        variant="ghost"
                        size="sm"
                        className="flex flex-col items-center h-auto py-2"
                        onClick={() => handleSelectMood(mood.type)}
                      >
                        <span className="text-xl mb-1">{getMoodEmoji(mood.type)}</span>
                        <span className="text-xs">{mood.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-3">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Exam Goal</p>
              <p className="text-sm font-medium">{userProfile.examGoal || 'Not set'}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-xs text-muted-foreground">Study Pace</p>
              <p className="text-sm font-medium">{userProfile.studyPace || 'Balanced'}</p>
            </div>
          </div>
          
          {userProfile.stats && (
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t">
              <div className="flex flex-col items-center">
                <div className="text-lg font-semibold">{userProfile.stats.streak}</div>
                <div className="text-xs text-muted-foreground">Day streak</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-lg font-semibold">{userProfile.stats.totalHours}</div>
                <div className="text-xs text-muted-foreground">Study hours</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-lg font-semibold">{userProfile.stats.completedTasks}</div>
                <div className="text-xs text-muted-foreground">Tasks done</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 px-6 pb-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <HeartPulse className="h-3 w-3" />
            <span className="text-xs">Beginner</span>
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
          Full Profile
          <ChevronRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnhancedProfileCard;
