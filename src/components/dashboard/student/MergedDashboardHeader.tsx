
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodType, UserProfileType } from "@/types/user/base";
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
  userProfile: UserProfileType;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MergedDashboardHeader: React.FC<MergedDashboardHeaderProps> = ({
  userProfile,
  onViewStudyPlan,
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
  
  // Get the greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const greetingText = getGreeting();
  const userName = userProfile?.name || "Student";
  
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
    window.open('https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription', '_blank');
  };

  return (
    <div className="mb-6">
      <Card className="p-4 bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 border-purple-100 dark:border-purple-800/30">
        {/* Top section - Time, Date, and Streak */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center gap-6">
            {/* Time */}
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="text-lg font-bold text-indigo-900 dark:text-indigo-100">
                  {formatTime(currentTime)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Current Time</p>
              </div>
            </div>

            {/* Day */}
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
                  {formatDay(currentTime)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Today</p>
              </div>
            </div>

            {/* Date */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formatDate(currentTime)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Date</p>
            </div>
          </div>

          {/* Study Streak */}
          <motion.div 
            className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-2 rounded-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <div className="text-center">
              <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                {userProfile.studyStreak || 12}
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-300">Day Streak</p>
            </div>
          </motion.div>
        </div>

        {/* Main header section */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* User avatar and greeting */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 cursor-pointer border-2 border-white dark:border-gray-700 shadow-sm" onClick={handleProfileClick}>
              <AvatarImage src={userProfile.avatar} alt={userName} />
              <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex flex-wrap items-center gap-2">
                {greetingText}, <span className="text-purple-700 dark:text-purple-400">{userName}</span>!
                {/* Upgrade button */}
                <Button
                  size="sm"
                  onClick={handleUpgradeClick}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg ml-2"
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Upgrade
                </Button>
              </h1>
            </div>
          </div>

          {/* Exam goal section */}
          <div className="flex-1 min-w-[200px] ml-20">
            <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current Exam Goal</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{userProfile.examPreparation}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300">
                  Switch Plan
                </Button>
                <Button size="sm">
                  New Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Action buttons and mood */}
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
                    className="gap-1 text-gray-700 dark:text-gray-300"
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
                    className="relative text-gray-700 dark:text-gray-300"
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
        
        {/* Learning stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Learning Style</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{userProfile.personalityType || "Analytical"}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Study Pace</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{userProfile.studyPreferences?.pace || "Moderate"}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Daily Study Hours</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{userProfile.studyPreferences?.hoursPerDay || "4"} hours</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Study Streak</p>
            <p className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
              <span className="text-amber-500">🔥</span> 
              {userProfile.studyStreak || 12} days
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MergedDashboardHeader;
