import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Settings,
  Sun,
  Moon,
  MessageSquare,
  Search,
  Menu,
  LogOut,
  User,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface TopNavigationControlsProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  showSidebar: boolean;
  toggleSidebar: () => void;
  userProfile: {
    name?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  onLogout: () => void;
}

const TopNavigationControls = ({
  darkMode,
  toggleDarkMode,
  showSidebar,
  toggleSidebar,
  userProfile,
  onLogout
}: TopNavigationControlsProps) => {
  const isMobile = useIsMobile();

  const userName = userProfile?.name || userProfile?.firstName || userProfile?.lastName || "Student";
  const userAvatar = userProfile?.avatar || "/images/avatars/avatar-1.png";

  return (
    <div className="flex items-center justify-between w-full py-2 md:py-3 px-3 md:px-6">
      {/* Left section */}
      <div className="flex items-center">
        {/* Menu button (only visible on mobile) */}
        {isMobile && (
          <Button
            variant="ghost"
            className="mr-2 px-2 rounded-full"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}

        {/* Search bar (hidden on mobile) */}
        <div className="hidden md:flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5">
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 w-40"
          />
        </div>
      </div>
      
      {/* Right section */}
      <div className="flex items-center space-x-1 md:space-x-3">
        {/* Notification button */}
        <Button variant="ghost" className="px-2 rounded-full">
          <Bell className="h-4 w-4" />
        </Button>

        {/* Help button */}
        <Button variant="ghost" className="px-2 rounded-full">
          <HelpCircle className="h-4 w-4" />
        </Button>
        
        {/* Theme toggle */}
        <div className="hidden md:flex items-center space-x-1.5">
          <Sun size={16} className="text-gray-500 dark:text-gray-400" />
          <Switch
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
          />
          <Moon size={16} className="text-gray-500 dark:text-gray-400" />
        </div>
        
        {/* User profile dropdown */}
        <div className="relative">
          <Button variant="ghost" className="px-2 rounded-full flex items-center">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="rounded-full h-7 w-7 mr-2"
            />
            <span className="text-sm font-medium hidden md:inline">{userName}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          {/* Dropdown content (hidden by default) */}
          {/* Add your dropdown menu items here */}
        </div>

        {/* Logout button */}
        <Button variant="ghost" className="px-2 rounded-full" onClick={onLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
