
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Sun, Moon, Moon as MoonIcon, Info } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import useTheme from '@/hooks/useTheme';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MoodType } from '@/types/user/base';

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
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onToggleSidebar} 
                className="mr-2 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle sidebar</p>
            </TooltipContent>
          </Tooltip>
          
          <PrepzrLogo className="h-8" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:block text-right mr-4">
            <div className="text-muted-foreground text-sm">{formattedDate}</div>
            <div className="font-medium">{formattedTime}</div>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onOpenTour} 
                className="hidden md:flex items-center"
              >
                <Info className="h-4 w-4 mr-2" />
                Tour
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Take a guided tour of the platform</p>
            </TooltipContent>
          </Tooltip>
          
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {theme === 'dark' ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change theme</p>
              </TooltipContent>
            </Tooltip>
            
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <MoonIcon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <div className="flex h-4 w-4 items-center justify-center mr-2">
                  <Sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TopNavigationControls;
