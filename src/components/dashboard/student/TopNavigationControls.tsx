
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Moon, 
  Sun,
  RefreshCw,
  Plus,
  BookOpen,
  Target
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface TopNavigationControlsProps {
  userProfile: any;
  notificationCount?: number;
  hideOnMobile?: boolean;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  userProfile,
  notificationCount = 0,
  hideOnMobile = false
}) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchExam = () => {
    // Logic to switch exam type
    navigate('/dashboard/student/exams/switch');
  };

  const handleNewPlan = () => {
    // Logic to create new study plan
    navigate('/dashboard/student/plans/create');
  };

  return (
    <div className={`flex items-center gap-2 ${hideOnMobile ? 'hidden md:flex' : 'flex'}`}>
      {/* Switch Exam Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleSwitchExam}
        className="gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        <span className="hidden sm:inline">Switch Exam</span>
      </Button>

      {/* New Plan Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleNewPlan}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">New Plan</span>
      </Button>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => navigate('/dashboard/student/notifications')}
      >
        <Bell className="h-4 w-4" />
        {notificationCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
          >
            {notificationCount > 9 ? '9+' : notificationCount}
          </Badge>
        )}
      </Button>

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src={userProfile?.avatar || userProfile?.photoURL} 
                alt={userProfile?.name || "User"} 
              />
              <AvatarFallback>
                {userProfile?.name?.charAt(0)?.toUpperCase() || 
                 userProfile?.firstName?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userProfile?.name || userProfile?.firstName || 'Student'}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userProfile?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/dashboard/student/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/dashboard/student/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopNavigationControls;
