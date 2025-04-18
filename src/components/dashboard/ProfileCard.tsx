import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileType, MoodType } from "@/types/user/base";
import { getMoodTheme } from "./student/mood-tracking/moodThemes";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileCardProps {
  profile: UserProfileType;
  currentMood?: MoodType;
  peerRanking?: number;
}

const ProfileCard = ({ profile, currentMood, peerRanking = 0 }: ProfileCardProps) => {
  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;
  const gender = profile.gender || "male";

  // Extract additional profile information
  const userType = profile.role || "Student";
  const examGoal = profile.goals && profile.goals.length > 0 ? profile.goals[0].title : "Not set";
  const personalityType = profile.personalityType || "Analytical";
  const progressPercentage = profile.goals && profile.goals.length > 0 ? 
    `${Math.round(profile.goals[0].progress)}%` : 
    "0%";

  // Calculate ranking display
  const getRankingDisplay = (rank: number) => {
    if (rank <= 10) return { icon: Trophy, color: "text-yellow-500", text: "Top 10" };
    if (rank <= 50) return { icon: Award, color: "text-blue-500", text: "Top 50" };
    return { icon: Star, color: "text-purple-500", text: `Rank ${rank}` };
  };

  const rankingInfo = getRankingDisplay(peerRanking);
  const RankIcon = rankingInfo.icon;

  const avatarVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: moodTheme?.animation?.includes("bounce") ? [1, 1.1, 1] : 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`p-4 overflow-hidden relative ${moodTheme?.colors.background || "bg-white"}`}
      >
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-secondary pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center space-x-4">
            <motion.div
              variants={avatarVariants}
              initial="initial"
              animate="animate"
            >
              <Avatar className={`h-16 w-16 ring-2 ring-offset-2 transition-all duration-300 ${moodTheme?.colors.text}`}>
                {currentMood && moodTheme ? (
                  <AvatarImage 
                    src={gender === "female" ? moodTheme.avatarUrl.female : moodTheme.avatarUrl.male} 
                    alt={`${currentMood} mood avatar`} 
                  />
                ) : (
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                )}
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">{profile.name}</h3>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className={`flex items-center gap-1 ${rankingInfo.color}`}>
                    <RankIcon className="h-3 w-3" />
                    {rankingInfo.text}
                  </Badge>
                </motion.div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {profile.phoneNumber || "Phone not set"}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className={`text-xs ${moodTheme?.colors.text}`}>
                  {userType}
                </Badge>
                <Badge variant="outline" className={`text-xs ${moodTheme?.colors.text}`}>
                  {examGoal}
                </Badge>
                <Badge variant="outline" className={`text-xs ${moodTheme?.colors.text}`}>
                  Progress: {progressPercentage}
                </Badge>
              </div>
          
              {moodTheme && (
                <motion.div 
                  className={`text-sm ${moodTheme.colors.text} mt-3`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-medium">{moodTheme.message}</p>
                  <p className="text-xs mt-1 opacity-80">{moodTheme.suggestion}</p>
                </motion.div>
              )}
              
              <motion.div 
                className="mt-3 text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="inline-block">
                  Personality: <span className={`font-medium ${moodTheme?.colors.text}`}>
                    {personalityType}
                  </span>
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
