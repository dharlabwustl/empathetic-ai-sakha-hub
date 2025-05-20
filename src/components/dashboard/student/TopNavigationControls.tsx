
import React from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle, Bell, Calendar } from "lucide-react";
import VoiceAnnouncer from './voice/VoiceAnnouncer';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour?: () => void;
  userName?: string;
  mood?: string;
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
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onToggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Toggle navigation menu</p>
            </TooltipContent>
          </Tooltip>
          <div>
            <h2 className="text-lg font-semibold">{formattedTime}</h2>
            <p className="text-muted-foreground text-sm">{formattedDate}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Voice Announcer Integration */}
          <VoiceAnnouncer 
            userName={userName}
            mood={mood}
            isFirstTimeUser={isFirstTimeUser}
          />
          
          {/* Calendar Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onViewStudyPlan}
                className="hidden sm:flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Study Plan</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>View your study calendar based on your exam goals</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Notification Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative"
                asChild
              >
                <a href="/dashboard/student/notifications">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>View your notifications</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Tour Guide Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenTour}
                className="hidden sm:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 border-indigo-200"
              >
                <HelpCircle className="h-4 w-4" />
                Tour Guide
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Get a guided tour of the dashboard features</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TopNavigationControls;
