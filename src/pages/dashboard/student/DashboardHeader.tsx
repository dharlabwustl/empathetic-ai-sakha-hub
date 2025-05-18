
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodType, UserProfileType } from "@/types/user/base";
import { Bell, Calendar, BookMarked } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MoodLogButton from "@/components/dashboard/student/mood-tracking/MoodLogButton";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  
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

  // Get initials for avatar fallback
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

  return (
    <div className="mb-6">
      <Card className="p-4 bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-blue-900/20 border-purple-100 dark:border-purple-800/30">
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
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formattedDate} • {formattedTime}
              </p>
            </div>
          </div>

          {/* Exam goal section */}
          <div className="flex-1 min-w-[200px] ml-20">
            <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current Exam Goal</p>
                  <p className="font-medium">{userProfile.examPreparation}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
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
        
        {/* Learning stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Learning Style</p>
            <p className="font-medium">{userProfile.personalityType || "Analytical"}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Study Pace</p>
            <p className="font-medium">{userProfile.studyPreferences?.pace || "Moderate"}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Daily Study Hours</p>
            <p className="font-medium">{userProfile.studyPreferences?.hoursPerDay || "4"} hours</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Study Streak</p>
            <p className="font-medium flex items-center gap-1">
              <span className="text-amber-500">🔥</span> 
              {userProfile.studyStreak || 12} days
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardHeader;
