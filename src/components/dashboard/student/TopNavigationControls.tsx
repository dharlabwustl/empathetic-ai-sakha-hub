
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Menu, HelpCircle, Calendar, Bell } from 'lucide-react';
import SpeechRecognitionButton from '@/components/voice/SpeechRecognitionButton';
import { MoodType } from '@/types/user/base';

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
  const handleVoiceCommand = (command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('study plan') || cmd.includes('plan')) {
      onViewStudyPlan();
    } else if (cmd.includes('help') || cmd.includes('tour')) {
      onOpenTour();
    } else if (cmd.includes('concepts') || cmd.includes('concept')) {
      window.location.href = '/dashboard/student/concepts';
    } else if (cmd.includes('flashcard') || cmd.includes('flash card')) {
      window.location.href = '/dashboard/student/flashcards';
    } else if (cmd.includes('exam') || cmd.includes('practice')) {
      window.location.href = '/dashboard/student/practice-exam';
    } else if (cmd.includes('today') || cmd.includes('plan')) {
      window.location.href = '/dashboard/student/today-plan';
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-3 sm:p-4">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="hidden sm:block">
          <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {formattedTime}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </div>
        </div>
      </div>

      {/* Center Section - Voice Recognition */}
      <div className="flex items-center gap-2 sm:gap-3">
        <SpeechRecognitionButton 
          onCommand={handleVoiceCommand}
          variant="outline"
          size="sm"
          showText={false}
          className="rounded-full"
        />
        
        {mood && (
          <Badge variant="outline" className="text-xs">
            {mood}
          </Badge>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onOpenTour}
          className="text-xs sm:text-sm"
        >
          <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="hidden sm:inline">Help</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onViewStudyPlan}
          className="text-xs sm:text-sm"
        >
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="hidden sm:inline">Plan</span>
        </Button>

        <Button variant="ghost" size="sm">
          <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
