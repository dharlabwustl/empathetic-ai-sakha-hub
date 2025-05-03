
import React, { useState } from 'react';
import { UserProfileBase } from '@/types/user/base';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, ChevronDown, Smile } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from '@/components/ui/separator';
import { MoodType } from '@/types/user/base';

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileBase;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents?: Array<{
    title: string;
    time: string;
    type: string;
  }>;
}

// Helper function to get emoji based on mood
const getMoodEmoji = (mood?: MoodType) => {
  if (!mood) return '😐';
  
  switch (mood) {
    case MoodType.Motivated:
      return '😀';
    case MoodType.Focused:
      return '🧠';
    case MoodType.Tired:
      return '😴';
    case MoodType.Anxious:
      return '😰';
    default:
      return '😐';
  }
};

// Helper function to get mood label
const getMoodLabel = (mood?: MoodType) => {
  if (!mood) return 'Neutral';
  return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
};

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange,
  upcomingEvents = []
}) => {
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  
  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    setShowMoodSelector(false);
  };

  // Initial for user's avatar fallback
  const userInitials = userProfile.name 
    ? userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="text-lg bg-primary/10 text-primary">{userInitials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold">Hello, {userProfile.name || 'Student'} 
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2 text-lg">
                  {getMoodEmoji(currentMood)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 p-2">
                <div className="text-xs text-muted-foreground mb-2 px-2">How are you feeling today?</div>
                <div className="grid grid-cols-2 gap-1">
                  <DropdownMenuItem onClick={() => handleMoodChange(MoodType.Motivated)}>
                    <span className="mr-2">😀</span> Motivated
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMoodChange(MoodType.Focused)}>
                    <span className="mr-2">🧠</span> Focused
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMoodChange(MoodType.Tired)}>
                    <span className="mr-2">😴</span> Tired
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMoodChange(MoodType.Anxious)}>
                    <span className="mr-2">😰</span> Anxious
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </h1>
          <p className="text-sm text-muted-foreground">{formattedDate} • {formattedTime}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium">Next up</span>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="text-sm">
              <p className="font-medium">{upcomingEvents[0].title}</p>
              <p className="text-xs text-muted-foreground">{upcomingEvents[0].time}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No upcoming events</p>
          )}
        </div>
        
        <div>
          <Button className="w-full" onClick={onViewStudyPlan}>
            View Study Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
