
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, HelpCircle } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import StudentJourneyTourGuide from './StudentJourneyTourGuide';
import { useState } from 'react';

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour: () => void;
  userName: string;
  mood?: MoodType;
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
  const [showTourGuide, setShowTourGuide] = useState(false);
  
  const handleOpenTourGuide = () => {
    setShowTourGuide(true);
  };
  
  const handleCloseTourGuide = () => {
    setShowTourGuide(false);
  };
  
  const handleCompleteTourGuide = () => {
    setShowTourGuide(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden sm:block">
            <div className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</div>
            <div className="text-sm font-semibold">{formattedTime}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={handleOpenTourGuide}
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Tour Guide</span>
          </Button>
        </div>
      </div>
      
      {/* Student Journey Tour Guide */}
      <StudentJourneyTourGuide
        isVisible={showTourGuide}
        onClose={handleCloseTourGuide}
        onComplete={handleCompleteTourGuide}
      />
    </>
  );
};

export default TopNavigationControls;
