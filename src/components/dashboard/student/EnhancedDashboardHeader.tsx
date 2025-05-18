
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoodType, UserProfileType } from "@/types/user/base";
import { BookMarked, Edit } from "lucide-react";
import MoodLogButton from "@/components/dashboard/student/mood-tracking/MoodLogButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

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
  
  // Extract exam goal information
  const examGoal = userProfile?.examPreparation || (userProfile?.goals && userProfile.goals[0]?.title);
  
  // Calculate days left until exam (mock data - in real app would come from user profile)
  const calculateDaysLeft = () => {
    // If we have a target date in the first goal, use it
    if (userProfile?.goals?.[0]?.targetDate) {
      const targetDate = new Date(userProfile.goals[0].targetDate);
      const today = new Date();
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    
    // Default mock value if no target date is available
    return 120;
  };
  
  const daysLeft = calculateDaysLeft();
  const totalDays = 365; // Assuming a year of preparation
  const progressPercentage = 100 - ((daysLeft / totalDays) * 100);
  
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
          <Link to="/dashboard/student/profile">
            <Avatar className="h-16 w-16 border-4 border-white dark:border-gray-800 shadow-md hover:ring-2 hover:ring-purple-500 transition-all">
              {avatar ? (
                <AvatarImage src={avatar} alt={userName} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl">
                  {getInitials(userName)}
                </AvatarFallback>
              )}
            </Avatar>
          </Link>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {greetingText}, {userName}!
              </h1>
              <Link to="/dashboard/student/profile">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate} • {formattedTime}
            </p>
            
            <div className="flex items-center gap-3 mt-1">
              {examGoal && (
                <div className="flex flex-col">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 flex items-center gap-1 mb-1">
                    <BookMarked className="h-3 w-3" />
                    <span>{examGoal}</span>
                    <span className="ml-2 text-xs bg-white/20 px-1 rounded">{daysLeft} days left</span>
                  </Badge>
                  <Progress value={progressPercentage} className="h-1.5 w-full bg-gray-200" />
                </div>
              )}
              
              {userProfile.subscription && (
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                  {typeof userProfile.subscription === 'string' 
                    ? userProfile.subscription.toUpperCase() 
                    : userProfile.subscription.planType?.toUpperCase() || 'FREE'} Plan
                </Badge>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-6 py-0 text-xs" asChild>
                  <Link to="/dashboard/student/academic">Switch Exam</Link>
                </Button>
                <Button variant="outline" size="sm" className="h-6 py-0 text-xs" asChild>
                  <Link to="/dashboard/student/academic">New Plan</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mood button only */}
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
                      size="default"
                      showLabel={true}
                      className="bg-white dark:bg-gray-800"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Log how you're feeling today</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {/* Profile link */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  asChild
                >
                  <Link to="/dashboard/student/profile">
                    <Avatar className="h-6 w-6">
                      {avatar ? (
                        <AvatarImage src={avatar} alt={userName} />
                      ) : (
                        <AvatarFallback className="text-xs">{getInitials(userName)}</AvatarFallback>
                      )}
                    </Avatar>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>View your profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Learning Profile & Daily Streak Section */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Learning Profile */}
        <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-sm col-span-2">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center gap-1">
                <span className="text-purple-500">💡</span> Learning Profile
              </h3>
              <Link to="/dashboard/student/profile">
                <Button variant="ghost" size="sm" className="h-7 gap-1">
                  <Edit className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Learning Style:</span>
                <span className="font-medium">{userProfile?.personalityType || "Analytical Learner"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Daily Study Hours:</span>
                <span className="font-medium">{userProfile?.preferences?.dailyStudyHours || userProfile?.studyPreferences?.hoursPerDay || 4} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Preferred Study Time:</span>
                <span className="font-medium">
                  {userProfile?.preferences?.preferredStudyTime || 
                   (userProfile?.studyPreferences?.preferredTimeStart 
                    ? `${userProfile?.studyPreferences?.preferredTimeStart} - ${userProfile?.studyPreferences?.preferredTimeEnd}` 
                    : "Evening")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Study Pace:</span>
                <span className="font-medium">{userProfile?.preferences?.studyPace || userProfile?.studyPreferences?.pace || "Moderate"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Study Hours:</span>
                <span className="font-medium">124 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Streak */}
        <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center gap-1">
                <span className="text-amber-500">🔥</span> Daily Streak
              </h3>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{userProfile?.streak?.current || userProfile?.studyStreak || 12}</div>
              <p className="text-sm text-gray-500">days</p>
              
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                <p className="mb-1">Benefits of maintaining streak:</p>
                <ul className="text-left list-disc pl-4 space-y-0.5">
                  <li>Better knowledge retention</li>
                  <li>Improved exam readiness</li>
                  <li>Unlock special rewards</li>
                </ul>
              </div>
              
              <div className="mt-2">
                <Link to="/dashboard/student/today">
                  <Button size="sm" className="bg-gradient-to-r from-orange-400 to-amber-500 border-0 w-full">
                    Complete Today's Task
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Today's upcoming events */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {upcomingEvents.map((event, i) => (
            <Link 
              key={i} 
              to={
                event.type === 'exam' ? '/dashboard/student/practice-exam' : 
                event.type === 'revision' ? '/dashboard/student/flashcards' :
                '/dashboard/student/today'
              }
            >
              <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    event.type === 'exam' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                    event.type === 'revision' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    <span className="text-lg">
                      {event.type === 'exam' ? '📝' : 
                      event.type === 'revision' ? '🔄' : 
                      '✅'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedDashboardHeader;
