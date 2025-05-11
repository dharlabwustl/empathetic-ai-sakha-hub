
import React from 'react';
import { Button } from "@/components/ui/button";
import { SidebarToggleButton } from "@/components/dashboard/SidebarToggleButton";
import MoodLogButton from "./MoodLogButton";
import { Calendar, Bell, HelpCircle } from "lucide-react";
import VoiceAnnouncer from './voice/VoiceAnnouncer';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoodType } from '@/types/user/base';

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate?: string;
  formattedTime?: string;
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
  onViewStudyPlan
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sidebar toggle button */}
        <SidebarToggleButton active={!hideSidebar} onClick={onToggleSidebar} />
        
        {/* Date and time */}
        {formattedDate && formattedTime && (
          <div className="text-sm text-muted-foreground hidden sm:block">
            {formattedDate} • {formattedTime}
          </div>
        )}
        
        {/* Voice announcer */}
        <div className="ml-auto sm:ml-6">
          <VoiceAnnouncer 
            userName={userName}
            mood={mood}
            isFirstTimeUser={isFirstTimeUser}
          />
        </div>
      </div>
      
      {/* Right side controls */}
      <div className="flex items-center gap-2">
        {/* Tour help button */}
        {onOpenTour && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenTour}
                  className="hidden sm:flex"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Take a tour of the dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default TopNavigationControls;
