
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Info, BookOpen } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
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
  userName = '',
  mood = '',
  isFirstTimeUser = false,
  onViewStudyPlan
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 w-9 p-0"
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
              >
                {hideSidebar ? <Menu size={20} /> : <X size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{hideSidebar ? "Expand" : "Collapse"} Sidebar</p>
            </TooltipContent>
          </Tooltip>

          <div className="text-sm font-medium hidden sm:block">
            <span className="text-muted-foreground">{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{formattedTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Welcome Tour button for returning users */}
          {!isFirstTimeUser && onOpenTour && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center gap-1"
                  onClick={onOpenTour}
                >
                  <Info size={16} />
                  <span>Take Tour</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Take a tour of the dashboard</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Study Plan button */}
          {onViewStudyPlan && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center gap-1"
                  onClick={onViewStudyPlan}
                >
                  <BookOpen size={16} />
                  <span>View Study Plan</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View your current study plan</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Theme toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {theme === 'dark' ? 'light' : 'dark'} mode</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TopNavigationControls;
