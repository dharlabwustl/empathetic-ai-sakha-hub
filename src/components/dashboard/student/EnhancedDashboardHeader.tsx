
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoodType, UserProfileType } from "@/types/user/base";
import { Bell, Calendar, CheckCircle, AlertCircle, BookOpen } from "lucide-react";
import MoodLogButton from "@/components/dashboard/student/mood-tracking/MoodLogButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents?: {
    title: string;
    time: string;
    type: "exam" | "task" | "revision";
  }[];
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange,
  upcomingEvents = []
}) => {
  // Get the greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const greetingText = getGreeting();
  const userName = userProfile?.name || "Student";
  const avatar = userProfile?.avatar || userProfile?.photoURL;
  
  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  // Get initials from name
  const getInitials = (name: string): string => {
    if (!name) return '';
    
    const names = name.trim().split(' ');
    
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* User profile section with avatar */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-4 border-white dark:border-gray-800 shadow-md">
            {avatar ? (
              <AvatarImage src={avatar} alt={userName} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl">
                {getInitials(userName)}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {greetingText}, {userName}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate} • {formattedTime}
            </p>
            
            {userProfile.subscription && (
              <Badge className="mt-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                {typeof userProfile.subscription === 'string' 
                  ? userProfile.subscription.toUpperCase() 
                  : userProfile.subscription.planType?.toUpperCase() || 'FREE'} Plan
              </Badge>
            )}
          </div>
        </div>

        {/* Action buttons and mood */}
        <div className="flex flex-wrap items-center gap-3">
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
      
      {/* Today's upcoming events */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {upcomingEvents.map((event, i) => (
            <Card key={i} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  event.type === 'exam' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                  event.type === 'revision' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                }`}>
                  {event.type === 'exam' ? <AlertCircle className="h-4 w-4" /> : 
                   event.type === 'revision' ? <BookOpen className="h-4 w-4" /> : 
                   <CheckCircle className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedDashboardHeader;
