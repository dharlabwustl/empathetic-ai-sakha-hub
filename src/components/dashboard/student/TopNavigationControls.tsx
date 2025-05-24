
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Calendar, Mic, MicOff, Volume2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopNavigationControlsProps {
  hideSidebar?: boolean;
  onToggleSidebar?: () => void;
  formattedDate?: string;
  formattedTime?: string;
  onOpenTour?: () => void;
  userName?: string;
  mood?: string;
  isFirstTimeUser?: boolean;
  onViewStudyPlan?: () => void;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  onViewStudyPlan,
  userName,
  onOpenTour
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleVoiceAssistant = () => {
    // Toggle voice assistant functionality
    console.log('Voice assistant activated');
  };
  
  return (
    <div className="flex items-center justify-between w-full mb-4">
      {/* Left side - Welcome message */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Welcome back, {userName || user?.name || 'Student'}!
        </h1>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center space-x-3">
        {/* Voice Assistant Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceAssistant}
                className="relative"
              >
                <Volume2 className="h-4 w-4" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Voice Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Study Plan Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onViewStudyPlan}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Study Plan</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>View your personalized study plan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://avatar.vercel.sh/${user?.name}.png`} alt={user?.name || "Avatar"} />
                <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "UN"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/student/subscription')}>
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/student/batch-management')}>
              Batch Management
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
