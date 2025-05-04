
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  User, 
  Sun, 
  Moon, 
  Bell, 
  Book, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  CircleHelp,
  Info
} from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useTheme } from '@/hooks/useTheme';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour: () => void;
  userName: string;
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
  const { theme, setTheme } = useTheme();
  
  return (
    <TooltipProvider>
      <div className="flex items-center justify-between mb-8">
        {/* Left side controls */}
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleSidebar}
                className="md:flex hidden h-8 w-8 p-0"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle sidebar menu</p>
            </TooltipContent>
          </Tooltip>
          
          <span className="text-sm text-muted-foreground hidden md:inline-block">
            {formattedDate} | {formattedTime}
          </span>
        </div>
        
        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Tour Guide Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenTour}
                className="h-8 w-8 p-0 relative"
              >
                <CircleHelp className="h-4 w-4" />
                {isFirstTimeUser && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open tour guide</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Study Plan Quick Access */}
          {onViewStudyPlan && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onViewStudyPlan}
                  className="h-8 w-8 p-0"
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View today's study plan</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-8 w-8 p-0"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {theme === 'dark' ? 'light' : 'dark'} mode</p>
            </TooltipContent>
          </Tooltip>
          
          {/* User Menu */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <User className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>User profile & settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TopNavigationControls;
