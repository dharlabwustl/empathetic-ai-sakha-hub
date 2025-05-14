
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, MapPin, Phone, MessageSquare, Heart, Clock, Shield, Trophy } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';
import MoodSelector from './MoodSelector';
import { Progress } from "@/components/ui/progress";

interface ProfileDataProps {
  name: string;
  email: string;
  role?: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  verified?: boolean;
  level?: number;
  xp?: number;
  nextLevelXp?: number;
  achievements?: Array<{
    id: string;
    name: string;
    description?: string;
    icon?: React.ReactNode;
    date?: string;
  }>;
  stats?: {
    studyHours?: number;
    questionsAnswered?: number;
    conceptsMastered?: number;
    streak?: number;
  };
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const EnhancedProfileCard = ({
  name = 'Student Name',
  email = 'student@example.com',
  role = 'Student',
  phone = '+91 9876543210',
  location = 'New Delhi, India',
  bio = 'Preparing for NEET exams. Focused on Biology and Chemistry.',
  avatar,
  verified = true,
  level = 5,
  xp = 450,
  nextLevelXp = 1000,
  achievements = [
    { 
      id: '1', 
      name: 'Early Bird', 
      description: 'Completed 5 study sessions before 9 AM',
      icon: <Clock className="h-4 w-4" />,
      date: '2023-04-10'
    },
    { 
      id: '2', 
      name: 'Biology Master', 
      description: 'Scored 90% in 3 consecutive Biology tests',
      icon: <Shield className="h-4 w-4" />,
      date: '2023-05-15'
    },
    { 
      id: '3', 
      name: 'Persistent Learner', 
      description: 'Maintained a 7-day study streak',
      icon: <Trophy className="h-4 w-4" />,
      date: '2023-06-02'
    }
  ],
  stats = {
    studyHours: 120,
    questionsAnswered: 2500,
    conceptsMastered: 75,
    streak: 12
  },
  currentMood = MoodType.NEUTRAL,
  onMoodChange
}: ProfileDataProps) => {
  const { toast } = useToast();
  const [isEditingMood, setIsEditingMood] = useState(false);
  const [localMood, setLocalMood] = useState<MoodType>(currentMood);
  
  const progressPercentage = Math.min(Math.round((xp / nextLevelXp) * 100), 100);
  
  const handleMoodChange = (mood: MoodType) => {
    setLocalMood(mood);
    if (onMoodChange) {
      onMoodChange(mood);
    }
    setIsEditingMood(false);
    
    const moodLabels: Record<MoodType, string> = {
      [MoodType.HAPPY]: "Happy",
      [MoodType.MOTIVATED]: "Motivated",
      [MoodType.FOCUSED]: "Focused",
      [MoodType.CALM]: "Calm",
      [MoodType.TIRED]: "Tired",
      [MoodType.CONFUSED]: "Confused",
      [MoodType.ANXIOUS]: "Anxious",
      [MoodType.STRESSED]: "Stressed",
      [MoodType.OVERWHELMED]: "Overwhelmed",
      [MoodType.NEUTRAL]: "Neutral",
      [MoodType.OKAY]: "Okay",
      [MoodType.SAD]: "Sad",
    };
    
    toast({
      title: "Mood Updated",
      description: `Your mood has been set to ${moodLabels[mood] || mood}`,
    });
  };
  
  const getMoodEmoji = (mood: MoodType): string => {
    const moodEmojis: Record<MoodType, string> = {
      [MoodType.HAPPY]: "😃",
      [MoodType.MOTIVATED]: "💪",
      [MoodType.FOCUSED]: "🧠",
      [MoodType.CALM]: "😌",
      [MoodType.TIRED]: "😴",
      [MoodType.CONFUSED]: "😕",
      [MoodType.ANXIOUS]: "😰",
      [MoodType.STRESSED]: "😣",
      [MoodType.OVERWHELMED]: "😩",
      [MoodType.NEUTRAL]: "😐",
      [MoodType.OKAY]: "🙂",
      [MoodType.SAD]: "😢",
    };
    
    return moodEmojis[mood] || "😐";
  };
  
  const getMoodLabel = (mood: MoodType): string => {
    const moodLabels: Record<MoodType, string> = {
      [MoodType.HAPPY]: "Happy",
      [MoodType.MOTIVATED]: "Motivated",
      [MoodType.FOCUSED]: "Focused",
      [MoodType.CALM]: "Calm",
      [MoodType.TIRED]: "Tired",
      [MoodType.CONFUSED]: "Confused",
      [MoodType.ANXIOUS]: "Anxious",
      [MoodType.STRESSED]: "Stressed",
      [MoodType.OVERWHELMED]: "Overwhelmed",
      [MoodType.NEUTRAL]: "Neutral",
      [MoodType.OKAY]: "Okay",
      [MoodType.SAD]: "Sad",
    };
    
    return moodLabels[mood] || "Neutral";
  };

  return (
    <Card className="shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-primary">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                {name}
                {verified && (
                  <Badge variant="outline" className="ml-1 py-0 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    Verified
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="flex flex-col mt-1 space-y-1">
                <span className="text-sm font-medium text-muted-foreground">{role}</span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 mr-1 opacity-70" />
                  {email}
                </span>
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Edit className="h-3.5 w-3.5" /> Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 opacity-70" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 opacity-70" />
              <span>{location}</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-rose-500" />
                <span className="text-sm font-medium">Current Mood</span>
              </div>
              
              {!isEditingMood ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-xs"
                  onClick={() => setIsEditingMood(true)}
                >
                  Change
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => setIsEditingMood(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
            
            {isEditingMood ? (
              <MoodSelector onSelectMood={handleMoodChange} />
            ) : (
              <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-md">
                <span className="text-xl">{getMoodEmoji(localMood)}</span>
                <span className="text-sm font-medium">{getMoodLabel(localMood)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MessageSquare className="h-4 w-4 mt-0.5 opacity-70" />
            <p className="text-sm">{bio}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">Level {level}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {xp}/{nextLevelXp} XP
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="bg-muted/50 rounded-md p-2">
            <p className="text-lg font-semibold">{stats.studyHours}</p>
            <p className="text-xs text-muted-foreground">Study Hours</p>
          </div>
          <div className="bg-muted/50 rounded-md p-2">
            <p className="text-lg font-semibold">{stats.questionsAnswered}</p>
            <p className="text-xs text-muted-foreground">Questions</p>
          </div>
          <div className="bg-muted/50 rounded-md p-2">
            <p className="text-lg font-semibold">{stats.conceptsMastered}</p>
            <p className="text-xs text-muted-foreground">Concepts</p>
          </div>
          <div className="bg-muted/50 rounded-md p-2">
            <p className="text-lg font-semibold">{stats.streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <h4 className="text-sm font-semibold mb-2">Recent Achievements</h4>
        <div className="flex flex-wrap gap-2 w-full">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className="flex items-center space-x-1 bg-muted/50 rounded-full px-3 py-1 text-xs"
              title={achievement.description}
            >
              <span className="opacity-70">{achievement.icon}</span>
              <span>{achievement.name}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EnhancedProfileCard;
