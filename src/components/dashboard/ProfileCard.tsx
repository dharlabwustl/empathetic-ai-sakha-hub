
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfileType, MoodType } from "@/types/user/base";
import { getMoodTheme } from "./student/mood-tracking/moodThemes";
import { motion } from "framer-motion";

interface ProfileCardProps {
  profile: UserProfileType;
  currentMood?: MoodType;
}

const ProfileCard = ({ profile, currentMood }: ProfileCardProps) => {
  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`overflow-hidden ${moodTheme?.colors.background || "bg-white"}`}>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className={`h-16 w-16 ring-2 ring-offset-2 ${moodTheme?.colors.text || "ring-primary"}`}>
                {currentMood && moodTheme ? (
                  <AvatarImage src={moodTheme.avatarUrl} alt="Mood Avatar" />
                ) : (
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                )}
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {currentMood && (
                <motion.div
                  className={`absolute -bottom-1 -right-1 rounded-full p-1.5 ${moodTheme?.colors.primary || "bg-primary"}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" as const }}
                />
              )}
            </div>
            
            <div className="flex-1 space-y-1">
              <h3 className="font-medium text-lg">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              
              {moodTheme && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2"
                >
                  <Badge variant="secondary" className={`${moodTheme.colors.text} ${moodTheme.colors.primary}`}>
                    {currentMood?.charAt(0).toUpperCase() + currentMood?.slice(1)}
                  </Badge>
                  <p className={`text-sm mt-2 ${moodTheme.colors.text}`}>
                    {moodTheme.message}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Study Streak</p>
                <p className="font-medium">{(profile as any).studyStreak || 0} days</p>
              </div>
              <div>
                <p className="text-muted-foreground">Points</p>
                <p className="font-medium">{(profile as any).points || 0}</p>
              </div>
            </div>
            
            {moodTheme && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`mt-4 p-3 rounded-lg ${moodTheme.colors.secondary}`}
              >
                <p className="text-sm">{moodTheme.suggestion}</p>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
