
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileType, MoodType } from "@/types/user/base";
import { getMoodTheme } from "./student/mood-tracking/moodThemes";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  profile: UserProfileType;
  currentMood?: MoodType;
}

const ProfileCard = ({ profile, currentMood }: ProfileCardProps) => {
  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;
  
  // Extract additional profile information if available
  const userType = profile.role || "Student";
  const examGoal = profile.goals && profile.goals.length > 0 ? profile.goals[0].title : "Not set";
  const personalityType = profile.personalityType || "Analytical";
  const progressPercentage = profile.goals && profile.goals.length > 0 ? 
    `${Math.round(profile.goals[0].progress)}%` : 
    "0%";
  
  return (
    <Card className={`p-4 ${moodTheme?.colors.background || "bg-white"}`}>
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12 ring-2 ring-offset-2 transition-all duration-300"
                style={{
                  borderColor: currentMood && moodTheme?.colors.text 
                }}>
          {currentMood && moodTheme ? (
            <AvatarImage src={moodTheme.avatarUrl} alt="Mood Avatar" />
          ) : (
            <AvatarImage src={profile.avatar} alt={profile.name} />
          )}
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="space-y-1 flex-1">
          <h3 className="font-medium">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              {userType}
            </Badge>
            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
              {examGoal}
            </Badge>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              Progress: {progressPercentage}
            </Badge>
          </div>
          
          {moodTheme && (
            <div className={`text-sm ${moodTheme.colors.text} mt-2`}>
              <p className="font-medium">{moodTheme.message}</p>
              <p className="text-xs mt-1 opacity-80">{moodTheme.suggestion}</p>
            </div>
          )}
          
          <div className="mt-2 text-xs text-gray-500">
            <span className="inline-block">
              Personality: <span className="font-medium text-indigo-600">{personalityType}</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
