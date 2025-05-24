
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
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

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

const TopNavigationControls: React.FC<TopNavigationControlsProps> = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <div className="flex items-center space-x-4">
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
  );
};

export default TopNavigationControls;
