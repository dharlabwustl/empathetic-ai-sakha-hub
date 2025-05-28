
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Settings, Menu, Home, Calendar, MessageCircle, HelpCircle } from 'lucide-react';
import { formatTime, formatDate } from "@/pages/dashboard/student/utils/DateTimeFormatter";
import MoodLogButton from './MoodLogButton';
import { MoodType } from '@/types/user/base';

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour?: () => void;
  userName?: string;
  mood?: MoodType;
  isFirstTimeUser?: boolean;
  onViewStudyPlan?: () => void;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime,
  onOpenTour,
  userName = 'Student',
  mood,
  isFirstTimeUser = false,
  onViewStudyPlan
}) => {
  return (
    <div className="flex justify-between items-center mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50">
      {/* Left side - Menu and date/time */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden sm:block">
          <div className="text-sm text-gray-600">{formattedDate}</div>
          <div className="text-lg font-semibold">{formattedTime}</div>
        </div>
      </div>

      {/* Center - Quick actions */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="hidden md:flex">
          <Home className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onViewStudyPlan}>
          <Calendar className="h-4 w-4 mr-2" />
          Study Plan
        </Button>
      </div>

      {/* Right side - Controls and mood */}
      <div className="flex items-center space-x-2">
        {/* Mood tracking */}
        <MoodLogButton currentMood={mood} />
        
        {/* Help/Tour button */}
        {onOpenTour && (
          <Button variant="ghost" size="sm" onClick={onOpenTour}>
            <HelpCircle className="h-4 w-4" />
          </Button>
        )}
        
        {/* Notifications */}
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
        
        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
