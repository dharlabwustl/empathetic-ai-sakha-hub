import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/theme/ModeToggle";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour: () => void;
  userName: string;
  mood?: string;
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
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('user_profile_image');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between">
      {/* Left: Sidebar Toggle (Mobile Only) */}
      {!hideSidebar && isMobile && (
        <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Center: Date and Time */}
      <div className="text-center">
        <div className="text-sm font-medium">{formattedTime}</div>
        <div className="text-xs text-muted-foreground">{formattedDate}</div>
      </div>

      {/* Right: User Avatar and Theme Toggle */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ModeToggle />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={localStorage.getItem('user_profile_image') || user?.image} alt={userName} />
                <AvatarFallback>{userName?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onViewStudyPlan}>
              View Study Plan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenTour}>
              Take Welcome Tour
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigationControls;
