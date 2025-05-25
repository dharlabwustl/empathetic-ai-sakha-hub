
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Clock, 
  Calendar, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  HelpCircle,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useNavigate } from 'react-router-dom';
import VoiceControlsPanel from './voice/VoiceControlsPanel';
import { MoodType } from '@/types/user/base';

interface TopNavigationControlsProps {
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
  onToggleSidebar,
  formattedDate,
  formattedTime,
  onOpenTour,
  userName,
  mood,
  isFirstTimeUser,
  onViewStudyPlan
}) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showVoicePanel, setShowVoicePanel] = useState(false);

  const handleSwitchExam = () => {
    navigate('/dashboard/student/exams');
  };

  const handleNewPlan = () => {
    navigate('/dashboard/student/study-plan/create');
  };

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Left side - Menu and Date/Time */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {isFirstTimeUser && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
            Welcome!
          </Badge>
        )}
      </div>

      {/* Center - Switch Exam and New Plan buttons */}
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSwitchExam}
          className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">Switch Exam</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleNewPlan}
          className="flex items-center gap-2 border-green-200 text-green-600 hover:bg-green-50"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Plan</span>
        </Button>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-2">
        {/* Voice Controls */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className="relative"
        >
          {voiceEnabled ? (
            <Volume2 className="h-5 w-5 text-green-600" />
          ) : (
            <VolumeX className="h-5 w-5 text-gray-400" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowVoicePanel(!showVoicePanel)}
          className="relative"
        >
          <HelpCircle className="h-5 w-5" />
          {showVoicePanel && (
            <div className="absolute top-full right-0 mt-2 z-50">
              <VoiceControlsPanel 
                userName={userName}
                mood={mood}
                onClose={() => setShowVoicePanel(false)}
              />
            </div>
          )}
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Tour Button */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onOpenTour}
          className="text-blue-600 hover:bg-blue-50"
        >
          <HelpCircle className="h-4 w-4 mr-1" />
          <span className="hidden md:inline">Help</span>
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
