
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfileType, MoodType, SubscriptionType } from "@/types/user/base";
import { getMoodTheme } from "./student/mood-tracking/moodThemes";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Book, Award, TrendingUp, Users } from "lucide-react";
import { bounceAnimation, pulseAnimation, fadeInUpStaggered } from "../home/hero/feature-highlights/animationVariants";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileCardProps {
  profile: UserProfileType;
  currentMood?: MoodType;
  peerComparison?: {
    position: number;
    totalPeers: number;
    percentile: number;
  };
}

const ProfileCard = ({ profile, currentMood, peerComparison }: ProfileCardProps) => {
  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;
  const isMobile = useIsMobile();
  
  // Get the main goal (usually the first one)
  const mainGoal = profile.goals && profile.goals.length > 0 ? profile.goals[0] : null;
  
  // Extract subjects from areasOfInterest
  const subjects = profile.areasOfInterest || [];

  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className={`overflow-hidden ${moodTheme?.colors.background || "bg-white"} border-2 ${moodTheme ? `${moodTheme.colors.text} border-opacity-30` : "border-primary border-opacity-20"}`}>
        <div className="p-6">
          {/* Profile Header */}
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
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </Badge>
                {profile.subscription && (
                  <Badge variant="outline" className="text-xs">
                    {profile.subscription}
                  </Badge>
                )}
              </div>
              
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

          {/* Info Section */}
          <div className="mt-5 space-y-4 pt-4 border-t">
            {/* Join Date & Activity */}
            <div className="flex items-center text-sm space-x-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Joined:</span>
              <span>{formatDate(profile.joinDate)}</span>
              <span className="text-muted-foreground mx-2">•</span>
              <span className="text-muted-foreground">Last active:</span>
              <span>{formatDate(profile.lastActive) || "Today"}</span>
            </div>

            {/* Main Goal */}
            {mainGoal && (
              <motion.div 
                className="space-y-2"
                {...fadeInUpStaggered(0.2)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-indigo-500" />
                    <span className="font-medium">{mainGoal.title}</span>
                  </div>
                  <span className="text-sm font-medium">{mainGoal.progress}%</span>
                </div>
                <Progress value={mainGoal.progress} className={`h-2 ${moodTheme?.colors.text || "bg-indigo-100"}`} />
                {mainGoal.targetDate && (
                  <p className="text-xs text-muted-foreground">
                    Target date: {formatDate(mainGoal.targetDate.toString())}
                  </p>
                )}
              </motion.div>
            )}

            {/* Subjects */}
            {subjects.length > 0 && (
              <motion.div 
                className="space-y-2"
                {...fadeInUpStaggered(0.3)}
              >
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium">Areas of Interest</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <Badge key={subject.id} variant="outline" className="text-xs">
                      {subject.name} - {subject.level}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              <div>
                <p className="text-muted-foreground">Study Streak</p>
                <p className="font-medium">{(profile as any).studyStreak || 0} days</p>
              </div>
              <div>
                <p className="text-muted-foreground">Points</p>
                <p className="font-medium">{(profile as any).points || 0}</p>
              </div>
            </div>

            {/* Peer Comparison */}
            {peerComparison && (
              <motion.div
                className={`mt-4 p-3 rounded-lg ${moodTheme?.colors.secondary || "bg-indigo-50 dark:bg-indigo-900/20"}`}
                {...bounceAnimation}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span className="font-medium text-sm">Peer Comparison</span>
                </div>
                <div className="mt-2 text-sm">
                  <p className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span>
                      Rank {peerComparison.position} of {peerComparison.totalPeers} peers
                      {' '}({peerComparison.percentile}th percentile)
                    </span>
                  </p>
                </div>
              </motion.div>
            )}
            
            {/* Mood Suggestion */}
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
