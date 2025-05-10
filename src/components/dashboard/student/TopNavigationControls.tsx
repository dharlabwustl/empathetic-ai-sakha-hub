
import React from "react";
import { MenuIcon, Calendar, BellIcon, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { MoodType } from "@/types/user/base";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour: () => void;
  userName?: string;
  mood?: MoodType | null;
  isFirstTimeUser?: boolean;
  onViewStudyPlan: () => void;
}

const TopNavigationControls = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime,
  onOpenTour,
  userName,
  mood,
  isFirstTimeUser,
  onViewStudyPlan,
}: TopNavigationControlsProps) => {
  const navigate = useNavigate();

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  
  const getMoodText = () => {
    switch (mood) {
      case MoodType.Motivated:
        return "You're feeling motivated today!";
      case MoodType.Focused:
        return "You're in a focused state of mind!";
      case MoodType.Confident:
        return "You're feeling confident today!";
      case MoodType.Happy:
        return "You're feeling happy today!";
      case MoodType.Calm:
        return "You're feeling calm today.";
      case MoodType.Tired:
        return "You seem tired today, take some breaks.";
      case MoodType.Stressed:
        return "You're feeling stressed, remember to relax!";
      case MoodType.Anxious:
        return "You're feeling anxious, deep breaths help.";
      case MoodType.Confused:
        return "You seem confused today, ask for help!";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:flex"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        <div className="hidden lg:flex lg:flex-col">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {formattedDate}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formattedTime}
          </p>
        </div>
      </div>

      <div className="flex-1 mx-4">
        <div className="hidden md:block text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {getTimeOfDayGreeting()}, {userName || "Student"}!
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getMoodText()}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard/student/notifications")}
          className="relative"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="User menu">
              <UserCircle2 className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => navigate("/dashboard/student/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onViewStudyPlan}>
              View Study Plan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenTour}>
              Welcome Tour
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/login")}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigationControls;
