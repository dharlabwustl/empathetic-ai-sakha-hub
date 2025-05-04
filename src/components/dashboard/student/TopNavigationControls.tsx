
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Clock,
  UserCircle2, 
  Bell, 
  MoonStar, 
  Sun, 
  Laptop,
  Search,
  HelpCircle, 
  LogOut,
  Info,
  SlidersHorizontal 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { UserProfileDropdown } from './UserProfileDropdown';
import { MoodType } from '@/types/user/base';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';

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

const TopNavigationControls = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime,
  onOpenTour,
  userName,
  mood,
  isFirstTimeUser,
  onViewStudyPlan
}: TopNavigationControlsProps) => {
  const { theme, setTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  
  const handleSwitchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const themeIcon = () => {
    if (theme === 'dark') return <Sun className="h-5 w-5" />
    if (theme === 'light') return <MoonStar className="h-5 w-5" />
    return <Laptop className="h-5 w-5" />
  };
  
  return (
    <div className="sticky top-0 z-10 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg py-3 mb-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:flex"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        {!showSearch ? (
          <div className="hidden md:flex flex-col">
            <p className="text-sm font-medium">{formattedDate}</p>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" /> 
              <span className="text-xs">{formattedTime}</span>
            </div>
          </div>
        ) : (
          <div className="relative hidden md:flex items-center">
            <Search className="h-4 w-4 absolute left-2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 py-1 pr-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setShowSearch(!showSearch)}
          className="md:hidden"
        >
          <Search className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleSwitchTheme}
        >
          {themeIcon()}
        </Button>
        
        {onViewStudyPlan && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs hidden sm:flex items-center"
            onClick={onViewStudyPlan}
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            <span>Study Plan</span>
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onOpenTour}>
              <Info className="h-4 w-4 mr-2" />
              <span>Welcome Tour</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <UserProfileDropdown 
          userImage="/profile.jpg" 
          userName={userName} 
          mood={mood as string}
        />
      </div>
    </div>
  );
};

export default TopNavigationControls;
