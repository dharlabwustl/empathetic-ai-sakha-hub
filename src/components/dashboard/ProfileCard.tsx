
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileType, MoodType } from "@/types/user/base";
import { getMoodTheme } from "./student/mood-tracking/moodThemes";

interface ProfileCardProps {
  profile: UserProfileType;
  currentMood?: MoodType;
}

const ProfileCard = ({ profile, currentMood }: ProfileCardProps) => {
  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;
  
  return (
    <Card className={`p-4 ${moodTheme?.colors.background || "bg-white"}`}>
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12 ring-2 ring-offset-2 transition-all duration-300"
                style={{
                  ringColor: currentMood && moodTheme?.colors.text
                }}>
          {currentMood && moodTheme ? (
            <AvatarImage src={moodTheme.avatarUrl} alt="Mood Avatar" />
          ) : (
            <AvatarImage src={profile.avatar} alt={profile.name} />
          )}
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="space-y-1">
          <h3 className="font-medium">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          
          {moodTheme && (
            <div className={`text-sm ${moodTheme.colors.text} mt-2`}>
              <p className="font-medium">{moodTheme.message}</p>
              <p className="text-xs mt-1 opacity-80">{moodTheme.suggestion}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
