
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate?: string;
  formattedTime?: string;
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
  userName,
  mood,
  isFirstTimeUser,
  onViewStudyPlan
}) => {
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    navigate('/dashboard/student/profile');
  };
  
  const handleNotificationsClick = () => {
    navigate('/dashboard/student/notifications');
  };
  
  const handleHelpClick = () => {
    if (onOpenTour) {
      onOpenTour();
    } else {
      // Fallback if tour function not provided
      navigate('/dashboard/student/help');
    }
  };
  
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="icon"
          className="mr-2 md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2">
        {isFirstTimeUser && (
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex items-center gap-1 h-8"
            onClick={handleHelpClick}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="text-xs">Help</span>
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleNotificationsClick}
        >
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleProfileClick}
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
