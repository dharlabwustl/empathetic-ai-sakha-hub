import React from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, Bell, Search, User, Settings, HelpCircle, MenuIcon, X, Smile, Zap, Target, Coffee, Battery, HelpCircle as HelpCircleIcon, Wind, Frown, CloudRain, ThumbsUp } from 'lucide-react';
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import { getMoodText } from './mood-tracking/moodUtils';

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour: () => void;
  userName: string | undefined;
  mood?: MoodType;
  isFirstTimeUser?: boolean;
  onViewStudyPlan: () => void;
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
  const { setTheme, theme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const renderGreeting = () => {
    const moodText = mood ? getMoodText(mood as MoodType) : '';
    
    return (
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">
          {getTimeBasedGreeting()}, {userName || 'Student'}!
        </h2>
        {moodText && (
          <p className="text-sm text-muted-foreground">You're feeling {moodText.toLowerCase()} today</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={onToggleSidebar}
      >
        {hideSidebar ? <MenuIcon className="h-5 w-5" /> : <X className="h-5 w-5" />}
        <span className="sr-only">Toggle Navigation</span>
      </Button>
      
      {/* Greeting and Date/Time */}
      <div className="flex items-center">
        <div className="mr-4">
          {renderGreeting()}
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">{formattedTime}</div>
          <div className="text-xs text-muted-foreground">{formattedDate}</div>
        </div>
      </div>
      
      {/* Action Items */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Search className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onViewStudyPlan}>
          <Bell className="h-4 w-4" />
        </Button>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80">
            <SheetHeader className="text-left">
              <SheetTitle>User Profile</SheetTitle>
              <SheetDescription>
                Manage your account settings and set preferences.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <span>Theme</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="sr-only">Toggle Theme</span>
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Settings</span>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Help</span>
                <Button variant="outline" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TopNavigationControls;
