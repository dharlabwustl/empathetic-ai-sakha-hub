
import React, { useState } from 'react';
import { Bell, Search, Menu, X, User, LogOut, Settings, HelpCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import MoodLogButton from './mood-tracking/MoodLogButton';
import { UserProfileType } from '@/types/user';

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userProfile?: UserProfileType;
  handleProfileClick?: () => void;
  handleSettingsClick?: () => void;
  handleSignOut?: () => void;
  currentTime?: string;
  currentMood?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  userProfile,
  handleProfileClick,
  handleSettingsClick,
  handleSignOut,
  currentTime,
  currentMood
}) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 flex h-16 items-center gap-4 px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      {currentTime && (
        <div className="hidden md:flex items-center mr-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1.5" />
          <span>{currentTime}</span>
        </div>
      )}
      
      {/* Mobile Search Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setShowSearchBar(!showSearchBar)}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Desktop Search */}
      <div className="hidden md:flex md:flex-1">
        <form className="w-full max-w-lg">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search all resources, topics, and concepts..."
              className="pl-8 bg-background"
            />
          </div>
        </form>
      </div>

      {/* Mobile Search Bar (Conditional) */}
      {showSearchBar && (
        <div className="absolute inset-x-0 top-16 bg-background p-4 md:hidden border-b z-40">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                type="search"
                placeholder="Search..."
                className="pl-8 bg-background w-full"
              />
            </div>
          </form>
        </div>
      )}

      <div className="flex items-center gap-2">
        <MoodLogButton currentMood={currentMood} />
        
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile?.avatar} alt={userProfile?.name || 'User'} />
                <AvatarFallback>{userProfile?.name ? userProfile.name.charAt(0) : 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
