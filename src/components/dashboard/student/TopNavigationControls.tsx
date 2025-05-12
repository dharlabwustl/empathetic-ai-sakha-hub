
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Calendar, Lightbulb, UserIcon, InfoIcon } from 'lucide-react';
import MoodLogButton from '@/components/dashboard/student/MoodLogButton';
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
  userName = "Student",
  mood,
  isFirstTimeUser = false,
  onViewStudyPlan
}) => {
  const getUserGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  
  // Determine if we should show first-time user messages
  const shouldShowFirstTimeMessage = isFirstTimeUser || !localStorage.getItem("hasSeenWelcome");
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        {!hideSidebar && (
          <Button 
            variant="outline" 
            size="icon" 
            className="mr-1 md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        <div className="hidden md:block">
          <h1 className="text-lg md:text-2xl font-semibold">
            {getUserGreeting()}, {userName}
          </h1>
          {shouldShowFirstTimeMessage && (
            <p className="text-sm text-muted-foreground">
              Welcome to your personal dashboard!
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center mr-4">
          <div className="text-right mr-4">
            <div className="text-sm font-medium">{formattedDate}</div>
            <div className="text-xs text-muted-foreground">{formattedTime}</div>
          </div>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
        
        {/* Mood Button */}
        <MoodLogButton 
          currentMood={mood} 
          className="hidden sm:flex"
        />
        
        {/* Quick Actions on Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Lightbulb className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[380px]">
            <div className="px-1 py-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={onViewStudyPlan}
                >
                  <Calendar className="h-10 w-10 mb-2 text-primary" />
                  <span>View Study Plan</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={onOpenTour}
                >
                  <InfoIcon className="h-10 w-10 mb-2 text-primary" />
                  <span>Take Tour</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center"
                >
                  <UserIcon className="h-10 w-10 mb-2 text-primary" />
                  <span>My Profile</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center"
                >
                  <Lightbulb className="h-10 w-10 mb-2 text-primary" />
                  <span>Study Tips</span>
                </Button>
              </div>
              
              <div className="mt-4">
                <MoodLogButton showLabel={true} size="default" className="w-full" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Take Tour Button */}
        {onOpenTour && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onOpenTour}
            className="hidden md:flex"
          >
            <InfoIcon className="h-4 w-4 mr-2" />
            Take Tour
          </Button>
        )}
        
        {/* Study Plan Button */}
        {onViewStudyPlan && (
          <Button 
            variant="default" 
            size="sm"
            onClick={onViewStudyPlan}
            className="hidden md:flex"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Study Plan
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopNavigationControls;
