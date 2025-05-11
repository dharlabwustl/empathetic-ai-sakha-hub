
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, Bell, HelpCircle, MenuIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { MoodType } from "@/types/user/base";
import { getMoodEmoji } from "./mood-tracking/moodUtils";
import { useNavigate } from "react-router-dom";
import MoodLogButton from "./MoodLogButton";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour: () => void;
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
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  const handleLogout = () => {
    logout();
    // Clear all auth data
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('user_profile_image');
    localStorage.removeItem('prepzr_remembered_email');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('sawWelcomeTour');
    localStorage.removeItem('hasSeenTour');
    localStorage.removeItem('hasSeenSplash');
    localStorage.removeItem('voiceSettings');
    localStorage.removeItem('new_user_signup');
    localStorage.removeItem('study_time_allocations');
    
    // Clear any session storage items
    sessionStorage.clear();
    
    // Redirect to home/login after logout
    navigate('/login');
  };
  
  const handleViewHelp = () => {
    navigate('/help');
  };
  
  const handleViewProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
          {hideSidebar ? <MenuIcon className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
        <div>
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
          <div className="text-xl font-semibold">{formattedTime}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Mood Button */}
        <MoodLogButton currentMood={mood as MoodType} />
        
        {/* Help Button */}
        <Button variant="ghost" size="icon" onClick={handleViewHelp}>
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={handleToggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* User Menu */}
        <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="/img/avatar.png" />
                <AvatarFallback>
                  {userName?.charAt(0) || "S"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>Manage your account settings and preferences.</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={handleViewProfile}>
                <Avatar>
                  <AvatarImage src="/img/avatar.png" />
                  <AvatarFallback>{userName?.charAt(0) || "S"}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{userName}</div>
                  <div className="text-sm text-muted-foreground">View profile</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={onOpenTour}>
                <HelpCircle className="h-5 w-5" />
                <span>View Welcome Tour</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={onViewStudyPlan}>
                <Bell className="h-5 w-5" />
                <span>View Study Plan</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={handleLogout}>
                <X className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TopNavigationControls;
