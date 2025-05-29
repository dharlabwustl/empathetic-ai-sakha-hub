
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodType, UserProfileBase } from "@/types/user/base";
import { Bell, Calendar, BookMarked, Crown, Clock, Flame } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MoodLogButton from "@/components/dashboard/student/mood-tracking/MoodLogButton";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MergedDashboardHeaderProps {
  userProfile: UserProfileBase;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  onViewStudyPlan: () => void;
  streak?: number;
}

const MergedDashboardHeader: React.FC<MergedDashboardHeaderProps> = ({
  userProfile,
  currentMood,
  onMoodChange,
  onViewStudyPlan,
  streak = 12
}) => {
  const navigate = useNavigate();
  const currentTime = new Date();
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDay = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long'
    });
  };
  
  const greetingText = getGreeting();
  const userName = userProfile?.name || userProfile?.firstName || "Student";
  
  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleProfileClick = () => {
    navigate('/dashboard/student/profile');
  };

  const handleUpgradeClick = () => {
    navigate('/dashboard/student/subscription');
  };

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 border-purple-100 dark:border-purple-800/30">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left side - User avatar, greeting, and time info */}
        <div className="flex items-center gap-6">
          <Avatar className="h-16 w-16 cursor-pointer border-2 border-white dark:border-gray-700 shadow-sm" onClick={handleProfileClick}>
            <AvatarImage src={userProfile.avatar} alt={userName} />
            <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {greetingText}, <span className="text-purple-700 dark:text-purple-400">{userName}</span>!
              <Button
                size="sm"
                onClick={handleUpgradeClick}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg"
              >
                <Crown className="h-4 w-4 mr-1" />
                Upgrade
              </Button>
            </h1>
            
            {/* Time and date info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                    {formatTime(currentTime)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Current Time</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    {formatDay(currentTime)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Today</p>
                </div>
              </div>

              <motion.div 
                className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-2 rounded-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <div>
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                    {streak}
                  </p>
                  <p className="text-xs text-orange-700 dark:text-orange-300">Day Streak</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right side - Action buttons and mood */}
        <div className="flex items-center gap-3">
          {/* Mood button */}
          {onMoodChange && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <MoodLogButton
                      currentMood={currentMood}
                      onMoodChange={handleMoodChange}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Log how you're feeling today</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {/* View study plan button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewStudyPlan}
                  className="gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Study Plan</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>View your personalized study plan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Notifications button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  asChild
                >
                  <a href="/dashboard/student/notifications">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>View your notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Exam goal section */}
      <div className="mt-4">
        <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Current Exam Goal</p>
              <p className="font-medium text-gray-900 dark:text-white">{userProfile.examPreparation || "NEET"}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300">
              Switch Plan
            </Button>
            <Button size="sm" className="text-white">
              New Plan
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MergedDashboardHeader;
