
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoodType, UserProfileType } from "@/types/user/base";
import { Bell, Calendar, Volume2 } from "lucide-react";
import MoodLogButton from "@/components/dashboard/student/mood-tracking/MoodLogButton";
import { Link } from 'react-router-dom';
import ProfileVoiceTooltip from '@/components/dashboard/student/profile/ProfileVoiceTooltip';

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

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Greeting and time */}
      <div className="flex-1 min-w-[200px]">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {greetingText}, {userName}!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formattedDate} • {formattedTime}
        </p>
      </div>

      {/* Action buttons and mood */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mood button */}
        {onMoodChange && (
          <MoodLogButton
            currentMood={currentMood}
            onMoodChange={handleMoodChange}
          />
        )}
        
        {/* View study plan button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onViewStudyPlan}
          className="gap-1"
        >
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Study Plan</span>
        </Button>
        
        {/* Voice assistant shortcut button */}
        <ProfileVoiceTooltip>
          <Button
            variant="outline"
            size="sm"
            className="gap-1 relative bg-primary/5 hover:bg-primary/10 border-primary/20"
            asChild
          >
            <Link to="/dashboard/student/profile?tab=voice">
              <Volume2 className="h-4 w-4 text-primary animate-[pulse_3s_ease-in-out_infinite]" />
              <span className="hidden sm:inline">Voice</span>
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-ping"></span>
            </Link>
          </Button>
        </ProfileVoiceTooltip>
        
        {/* Notifications button */}
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
      </div>
    </div>
  );
};

export default DashboardHeader;
