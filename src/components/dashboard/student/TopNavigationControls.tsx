
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  currentMood?: MoodType;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime,
  currentMood
}) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const notificationCount = 3;

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="flex md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="hidden sm:flex items-center text-sm text-muted-foreground">
          {formattedDate} • {formattedTime}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {currentMood && (
          <Badge variant="outline" className="hidden sm:flex items-center gap-1 px-3 py-1">
            <span>{getMoodEmoji(currentMood)}</span>
            <span className="ml-1 capitalize">{currentMood}</span>
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleTheme}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard/student/notifications')}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to map mood types to emojis
const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.Happy:
      return "😄";
    case MoodType.Motivated:
      return "🔥";
    case MoodType.Focused:
      return "🎯";
    case MoodType.Neutral:
      return "😐";
    case MoodType.Tired:
      return "😴";
    case MoodType.Stressed:
      return "😰";
    default:
      return "😐";
  }
};

export default TopNavigationControls;
