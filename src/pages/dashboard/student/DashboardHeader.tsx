
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserProfileType, MoodType } from '@/types/user/base';
import { Calendar, BookText } from 'lucide-react';
import MoodLogButton from '@/components/dashboard/student/mood-tracking/MoodLogButton';

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardHeader = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange
}: DashboardHeaderProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {userProfile.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground text-sm">
          Welcome back to your personalized learning dashboard
        </p>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mood log button */}
        <MoodLogButton 
          currentMood={currentMood} 
          onMoodChange={onMoodChange || (() => {})} 
        />
        
        {/* Study Plan Button */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={onViewStudyPlan}
          className="flex items-center gap-1.5"
        >
          <BookText className="h-4 w-4" />
          <span className="hidden sm:inline">Study Plan</span>
        </Button>
        
        {/* Date and Time Display */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium">{formattedTime}</span>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
