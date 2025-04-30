import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit, Target, Clock } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { UserProfileType } from '@/types/user/base';
import { SkillRatings } from '@/types/student/dashboard';
import { MoodSelector } from '@/components/dashboard/student/MoodSelector';

interface EnhancedProfileCardProps {
  userProfile: UserProfileType;
  streak?: number;
  studyHours?: number;
  conceptsMastered?: number;
  skillRatingsData?: SkillRatings[];
  onEditProfile?: () => void;
  showQuickStats?: boolean;
  showProgress?: boolean;
  showMoodSelector?: boolean;
  currentMood?: string;
  onMoodChange?: (mood: string) => void;
  className?: string;
}

interface Goal {
  title: string;
  targetDate: string;
  description?: string;
}

interface UserProfileWithTypedGoals extends UserProfileType {
  goals: Goal[];
}

export const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({
  userProfile,
  streak,
  studyHours,
  conceptsMastered,
  skillRatingsData,
  onEditProfile,
  showQuickStats = true,
  showProgress = true,
  showMoodSelector = true,
  currentMood,
  onMoodChange,
  className = ""
}) => {
  // Type cast userProfile to include properly typed goals
  const typedUserProfile = userProfile as UserProfileWithTypedGoals;

  const [isEditing, setIsEditing] = useState(false);
  const primaryColor = 'indigo';

  const handleEditClick = () => {
    setIsEditing(true);
    onEditProfile?.();
  };

  const handleMoodSelect = (mood: string) => {
    onMoodChange?.(mood);
  };

  const quickStats = [
    { label: 'Streak', value: streak || 0, unit: 'days' },
    { label: 'Study Hours', value: studyHours || 0, unit: 'hrs' },
    { label: 'Concepts', value: conceptsMastered || 0, unit: 'mastered' },
  ];

  const skillRatings = skillRatingsData || [
    { skill: 'Problem Solving', rating: 85 },
    { skill: 'Critical Thinking', rating: 92 },
    { skill: 'Time Management', rating: 78 },
  ];

  return (
    <Card className={`w-full border-${primaryColor}-200 dark:border-${primaryColor}-800 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Profile Overview</CardTitle>
        <Button variant="ghost" size="sm" onClick={handleEditClick}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </CardHeader>

      <CardContent className="px-6 pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={userProfile.avatarUrl || `/avatars/avatar-${(Math.floor(Math.random() * 10) + 1)}.png`} />
            <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{userProfile.name}</h3>
            <p className="text-sm text-muted-foreground">{userProfile.email}</p>
          </div>
        </div>

        {showQuickStats && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label} {stat.unit}</p>
              </div>
            ))}
          </div>
        )}

        {/* Goals section */}
        {typedUserProfile.goals && typedUserProfile.goals.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-1.5">
              <Target className="h-4 w-4 text-indigo-600" /> Current Goals
            </h4>
            <div className="space-y-2">
              {typedUserProfile.goals.map((goal, index) => (
                <div key={index} className="border rounded-md p-3 bg-muted/20">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium">{goal.title}</h5>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(new Date(goal.targetDate), { addSuffix: true })}
                    </Badge>
                  </div>
                  {goal.description && (
                    <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {showProgress && (
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">Skill Ratings</h4>
            <div className="space-y-3">
              {skillRatings.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{skill.skill}</p>
                    <span className="text-sm text-muted-foreground">{skill.rating}%</span>
                  </div>
                  <Progress value={skill.rating} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {showMoodSelector && (
          <div className="mt-6">
            <h4 className="font-medium text-sm mb-2">How are you feeling today?</h4>
            <MoodSelector onMoodSelect={handleMoodSelect} currentMood={currentMood} className="justify-center" />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center p-6">
        <p className="text-sm text-muted-foreground">
          Joined {formatDistanceToNow(new Date(userProfile.lastActive || Date.now()), {
            addSuffix: true,
          })}
        </p>
        <Button size="sm" onClick={handleEditClick}>
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
