
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Moon, 
  Sun, 
  HelpCircle,
  MenuSquare, 
  Bell,
  UserCircle 
} from 'lucide-react';
import { ModeToggle } from '@/components/common/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  const getMoodEmoji = (currentMood?: MoodType): string => {
    if (!currentMood) return '😊';
    
    switch (currentMood) {
      case MoodType.Happy:
        return '😄';
      case MoodType.Stressed:
        return '😰';
      case MoodType.Tired:
        return '😴';
      case MoodType.Focused:
        return '🧠';
      case MoodType.Motivated:
        return '💪';
      default:
        return '😊';
    }
  };
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden sm:block">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {formattedDate}
          </p>
          <p className="text-2xl font-bold">
            {formattedTime}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {userName && (
          <div className="hidden md:flex items-center mr-4">
            <span className="text-sm mr-2">
              Hi, {userName} {mood && getMoodEmoji(mood)}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        
        {onOpenTour && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onOpenTour}
            title="Open welcome tour"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <ModeToggle />
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <UserCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
