
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Plus, 
  Calendar,
  Target,
  Lightbulb,
  Menu,
  Settings,
  HelpCircle,
  User
} from "lucide-react";
import { MoodType } from "@/types/user/base";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  userName,
  mood,
  isFirstTimeUser,
  onViewStudyPlan
}) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleExamPlanClick = () => {
    navigate('/dashboard/student/academic-advisor');
  };

  const handleTodaysPlanClick = () => {
    navigate('/dashboard/student/enhanced-todays-plan');
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="hidden md:block">
          <div className="text-sm font-medium text-gray-900">{formattedDate}</div>
          <div className="text-xs text-gray-500">{formattedTime}</div>
        </div>
      </div>

      {/* Center Section - Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExamPlanClick}
          className="flex items-center space-x-2"
        >
          <Target className="h-4 w-4" />
          <span className="hidden sm:inline">New Plan</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleTodaysPlanClick}
          className="flex items-center space-x-2"
        >
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Today's Plan</span>
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNotificationsClick}
          className="relative"
        >
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
            3
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onOpenTour}>
              <HelpCircle className="h-4 w-4 mr-2" />
              Take Tour
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onViewStudyPlan}>
              <User className="h-4 w-4 mr-2" />
              Study Plan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigationControls;
