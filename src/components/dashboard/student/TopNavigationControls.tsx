
import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Globe, Settings, Crown } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UnifiedVoiceAssistant from '@/components/voice/UnifiedVoiceAssistant';
import SpeechRecognitionButton from '@/components/voice/SpeechRecognitionButton';

interface TopNavigationControlsProps {
  hideSidebar?: boolean;
  onToggleSidebar?: () => void;
  formattedDate?: string;
  formattedTime?: string;
  onOpenTour?: () => void;
  userName?: string;
  mood?: string;
  isFirstTimeUser?: boolean;
  onViewStudyPlan?: () => void;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  onViewStudyPlan,
  userName,
  onOpenTour,
  formattedTime,
  formattedDate
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleVoiceAssistant = () => {
    setIsVoiceAssistantOpen(true);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSubscriptionClick = () => {
    navigate('/dashboard/student/subscription');
  };

  const getCurrentPlan = () => {
    return 'Free'; // Simplified for now
  };
  
  return (
    <div className="flex items-center justify-between w-full mb-4">
      {/* Left side - Welcome message with subscription plan */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Welcome back, {userName || user?.name || 'Student'}!
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSubscriptionClick}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary p-0 h-auto"
          >
            Current Plan: {getCurrentPlan()}
          </Button>
        </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center space-x-3">
        {/* Time Display */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{formattedTime}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{formattedDate}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Language Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[80px] h-8">
                  <Globe className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">EN</SelectItem>
                  <SelectItem value="hi-IN">HI</SelectItem>
                  <SelectItem value="es-ES">ES</SelectItem>
                  <SelectItem value="fr-FR">FR</SelectItem>
                </SelectContent>
              </Select>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Voice Language</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Speech Recognition Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <SpeechRecognitionButton 
                  context="dashboard"
                  className="h-8 w-8"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Voice Commands</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Study Plan Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onViewStudyPlan}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Study Plan</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>View your personalized study plan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://avatar.vercel.sh/${user?.name}.png`} alt={user?.name || "Avatar"} />
                <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || "UN"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard/student/profile')}>
              Profile & Batch Management
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/student/subscription')}>
              Subscription Plan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsVoiceAssistantOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Voice Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Unified Voice Assistant Modal */}
      <UnifiedVoiceAssistant 
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        userName={userName || user?.name}
        language={selectedLanguage}
        context="dashboard"
      />
    </div>
  );
};

export default TopNavigationControls;
