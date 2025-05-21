
import React from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, HelpCircle } from "lucide-react";
import SearchBar from "@/components/common/SearchBar";
import NotificationsDropdown from "@/components/dashboard/student/notifications/NotificationsDropdown";
import { UserRole } from "@/types/user/base";
import { useIsMobile } from "@/hooks/use-mobile";
import VoiceMuteToggle from "@/components/dashboard/student/voice/VoiceMuteToggle";
import ThemeModeToggle from "@/components/theme/ThemeModeToggle";
import { cn } from "@/lib/utils";

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
  userName = "Student",
  mood,
  isFirstTimeUser = false,
  onViewStudyPlan
}) => {
  const isMobile = useIsMobile();
  const { userProfile } = useUserProfile(UserRole.Student);

  // Calculate greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Format greeting with name and optionally mood
  const formattedGreeting = () => {
    let greeting = `${getGreeting()}, ${userName || "Student"}`;
    if (mood) {
      greeting += `. Feeling ${mood.toLowerCase()} today?`;
    }
    return greeting;
  };

  return (
    <div className={cn(
      "flex items-center justify-between mb-4 md:mb-6", 
      hideSidebar ? "pl-0" : "pl-0 md:pl-2",
    )}>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="mr-2 rounded-full hover:bg-accent"
        >
          {hideSidebar ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </Button>
        
        {!isMobile && (
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">{formattedGreeting()}</h1>
            <p className="text-sm text-muted-foreground">
              {formattedDate} • {formattedTime}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isMobile && (
          <SearchBar 
            placeholder="Search concepts, questions, formulas..." 
            className="w-72 mr-2"
          />
        )}
        
        {onOpenTour && (
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full"
            onClick={onOpenTour}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        )}
        
        <ThemeModeToggle />
        
        <VoiceMuteToggle />
        
        <NotificationsDropdown />
        
        {onViewStudyPlan && (
          <Button
            variant="outline"
            size="sm"
            onClick={onViewStudyPlan}
            className={cn(
              "flex items-center gap-1 ml-2", 
              isFirstTimeUser ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300" : ""
            )}
          >
            {isFirstTimeUser ? "Create Study Plan" : "View Study Plan"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopNavigationControls;
