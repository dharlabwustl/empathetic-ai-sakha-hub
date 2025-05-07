
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, MenuIcon, CalendarIcon, BookIcon, ChevronLeft } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { MoodType } from '@/types/user/base';

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
  onViewStudyPlan
}) => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getMoodEmoji = () => {
    if (!mood) return '😊';
    
    switch (mood) {
      case MoodType.Happy:
        return '😊';
      case MoodType.Sad:
        return '😢';
      case MoodType.Tired:
        return '😴';
      case MoodType.Stressed:
        return '😰';
      case MoodType.Anxious:
        return '😨';
      case MoodType.Calm:
        return '😌';
      case MoodType.Confused:
        return '😕';
      case MoodType.Bored:
        return '😒';
      case MoodType.Focused:
        return '🧐';
      case MoodType.Motivated:
        return '💪';
      case MoodType.Overwhelmed:
        return '🥴';
      default:
        return '😊';
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 sticky top-0 z-30">
      {/* Left side navigation controls */}
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          className="p-0 h-9 w-9" 
          onClick={onToggleSidebar}
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        
        <div className="hidden sm:block">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm flex items-center gap-1"
            onClick={onViewStudyPlan}
          >
            <BookIcon className="h-4 w-4" />
            <span>Study Plan</span>
          </Button>
        </div>
        
        {/* Back button that shows up on mobile or specific pages */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
      </div>

      {/* Right side navigation controls */}
      <div className="flex items-center space-x-3">
        {/* Welcome Tour Button (when applicable) */}
        {onOpenTour && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenTour}
            className="text-sm hidden sm:flex items-center"
          >
            <span>Tour</span>
          </Button>
        )}
        
        {/* Date and time display */}
        <div className="hidden md:flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>
        
        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
