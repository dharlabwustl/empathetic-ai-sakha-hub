
import React, { useState } from "react";
import { Menu, ChevronDown, Lightbulb, LogOut, User, Bell, ExternalLink, AlignLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { getMoodEmoji } from "./mood-tracking/moodUtils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour?: () => void;
  userName?: string;
  mood?: MoodType | null;
  isFirstTimeUser?: boolean;
  onViewStudyPlan?: () => void;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime,
  onOpenTour,
  userName,
  mood,
  isFirstTimeUser = false,
  onViewStudyPlan,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "We hope to see you soon!",
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          onClick={onToggleSidebar}
        >
          <AlignLeft size={20} />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
          {formattedDate} | {formattedTime}
        </span>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Study Plan Button */}
        {onViewStudyPlan && (
          <Button
            variant="outline"
            size="sm"
            className="text-sm hidden sm:flex items-center gap-1"
            onClick={onViewStudyPlan}
          >
            <BookOpen size={16} />
            <span>Study Plan</span>
          </Button>
        )}

        {/* Tour Button - Only show during first login */}
        {isFirstTimeUser && onOpenTour && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenTour}
            className="text-sm flex items-center gap-1"
          >
            <Lightbulb size={16} />
            <span className="hidden sm:inline">Tour</span>
          </Button>
        )}
        
        {/* Mood Button */}
        {mood && (
          <Button variant="ghost" size="sm" asChild className="text-lg p-2">
            <span>{getMoodEmoji(mood)}</span>
          </Button>
        )}

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-white border border-gray-200 shadow-lg rounded-lg">
            <h3 className="font-semibold p-3 border-b">Notifications</h3>
            <div className="max-h-72 overflow-auto">
              <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                <p className="text-sm font-medium">Time to revise Biology</p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <p className="text-sm font-medium">New NEET practice test available</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <Button variant="ghost" size="sm" className="w-full justify-center text-blue-600">
              View all notifications
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Dropdown */}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild onClick={() => setIsOpen(!isOpen)}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-sm font-normal"
            >
              <span className="hidden md:inline">{userName || "User"}</span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg">
            <DropdownMenuItem onClick={() => navigate('/dashboard/student/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigationControls;
