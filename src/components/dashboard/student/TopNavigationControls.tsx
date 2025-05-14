
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Menu, Calendar, MapPin, Info } from "lucide-react";
import { MoodType } from "@/types/user/base";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour?: () => void;
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
  onViewStudyPlan,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div>
          <p className="text-muted-foreground text-sm">
            {formattedDate} • {formattedTime}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {isFirstTimeUser && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onOpenTour}
                  className="text-xs hidden sm:flex"
                >
                  <Info className="h-3 w-3 mr-1" />
                  Help Tour
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Take a guided tour of the dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {onViewStudyPlan && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onViewStudyPlan}
                  className="text-xs"
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  Study Plan
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View your personalized study plan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default TopNavigationControls;
