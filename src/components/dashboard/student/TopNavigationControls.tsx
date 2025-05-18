
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, MenuIcon, User, BellPlus, Info } from 'lucide-react';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';
import UserProfileDropdown from '@/components/dashboard/UserProfileDropdown';
import { MoodType } from '@/types/user/base';
import NotificationDropdown from '@/components/dashboard/NotificationDropdown';

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
  userName = "Student",
  mood,
  isFirstTimeUser = false,
  onViewStudyPlan
}) => {
  return (
    <div className="flex justify-between mb-6">
      {/* Voice Greeting (conditionally rendered) */}
      {isFirstTimeUser && (
        <VoiceGreeting 
          isFirstTimeUser={isFirstTimeUser}
          userName={userName}
          language="en"
        />
      )}
      
      {/* Left Side Controls */}
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={onToggleSidebar}
          className="p-2 h-9 w-9 mr-2"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        
        <div className="hidden md:flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{formattedTime}</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">{formattedDate}</span>
        </div>
      </div>
      
      {/* Right Side Controls */}
      <div className="flex items-center space-x-2">
        {/* Help/Guide button */}
        {onOpenTour && (
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground"
            onClick={onOpenTour}
          >
            <Info className="h-5 w-5" />
            <span className="sr-only">Open guide</span>
          </Button>
        )}
        
        {/* Notifications */}
        <NotificationDropdown />
        
        {/* User Profile */}
        <UserProfileDropdown 
          userName={userName}
          onViewStudyPlan={onViewStudyPlan}
        />
      </div>
    </div>
  );
};

export default TopNavigationControls;
