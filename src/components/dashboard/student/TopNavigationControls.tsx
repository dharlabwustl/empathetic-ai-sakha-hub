
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Bell, Menu, HelpCircle, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MoodType } from "@/types/user/base";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  userName?: string;
  mood?: MoodType | null;
  onOpenTour?: () => void;
  isFirstTimeUser?: boolean;
  onViewStudyPlan?: () => void;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime,
  userName = "",
  mood = null,
  onOpenTour,
  isFirstTimeUser,
  onViewStudyPlan
}) => {
  const isMobile = useIsMobile();
  const [notificationCount, setNotificationCount] = useState(3);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from system preference or localStorage
  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Check if user has a saved preference
    const savedPreference = localStorage.getItem("darkMode");
    
    const shouldUseDarkMode = savedPreference 
      ? savedPreference === "true"
      : prefersDark;
    
    setDarkMode(shouldUseDarkMode);
    
    if (shouldUseDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
    
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-1 md:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:mr-2"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        
        <div className="flex flex-col">
          <span className="text-xs md:text-sm text-muted-foreground">
            {formattedDate}
          </span>
          <span className="text-xs md:text-sm font-semibold">
            {formattedTime}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        {/* Dark mode toggle */}
        <div className="hidden md:flex items-center mr-2">
          <Switch 
            checked={darkMode} 
            onCheckedChange={toggleDarkMode}
            size="sm" 
          />
          <span className="ml-2 text-sm">
            {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </span>
        </div>

        {/* Search button */}
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Search className="h-[18px] w-[18px]" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Notifications dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-[18px] w-[18px]" />
              {notificationCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-4 min-w-[16px] p-0 flex items-center justify-center bg-primary text-[10px]"
                >
                  {notificationCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium text-sm">New concept card available</span>
                <span className="text-xs text-muted-foreground">
                  Check out the latest concept card on Physics
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium text-sm">Study reminder</span>
                <span className="text-xs text-muted-foreground">
                  Time to review your flashcards
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium text-sm">New practice quiz</span>
                <span className="text-xs text-muted-foreground">
                  Chemistry practice quiz is now available
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-[18px] w-[18px]" />
              <span className="sr-only">Help</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Help & Support</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {onOpenTour && (
              <DropdownMenuItem onClick={onOpenTour}>
                <span className="mr-2">🚀</span> Take Platform Tour
                {isFirstTimeUser && <Badge className="ml-2 bg-primary text-[10px]">New</Badge>}
              </DropdownMenuItem>
            )}
            {onViewStudyPlan && (
              <DropdownMenuItem onClick={onViewStudyPlan}>
                <span className="mr-2">📚</span> View Study Plan
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => window.open('/faq', '_blank')}>
              <span className="mr-2">❓</span> Frequently Asked Questions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open('/contact', '_blank')}>
              <span className="mr-2">📧</span> Contact Support
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigationControls;
