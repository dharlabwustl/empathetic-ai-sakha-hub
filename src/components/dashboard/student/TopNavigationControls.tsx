
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
import { Calendar, Mic, MicOff, Volume2, VolumeX, Clock, Globe, Settings } from 'lucide-react';
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
import FloatingVoiceAssistant from './FloatingVoiceAssistant';

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
  const [isMicActive, setIsMicActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleVoiceAssistant = () => {
    setIsVoiceAssistantOpen(true);
  };

  const handleMicToggle = () => {
    setIsMicActive(!isMicActive);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };
  
  return (
    <div className="flex items-center justify-between w-full mb-4">
      {/* Left side - Welcome message */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Welcome back, {userName || user?.name || 'Student'}!
        </h1>
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

        {/* Microphone Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleMicToggle}
                className={`relative ${isMicActive ? 'bg-green-50 border-green-300' : ''}`}
              >
                {isMicActive ? (
                  <Mic className="h-4 w-4 text-green-600" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
                {isMicActive && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isMicActive ? 'Microphone Active' : 'Activate Microphone'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Mute Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleMuteToggle}
                className={isMuted ? 'bg-red-50 border-red-300' : ''}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-red-600" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isMuted ? 'Unmute Voice' : 'Mute Voice'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Voice Assistant Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceAssistant}
                className="relative"
              >
                <Volume2 className="h-4 w-4" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Voice Assistant</p>
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
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/student/subscription')}>
              Subscription Plan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/dashboard/student/batch-management')}>
              Batch Management
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

      {/* Voice Assistant Modal */}
      <FloatingVoiceAssistant 
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        userName={userName || user?.name}
        language={selectedLanguage}
      />
    </div>
  );
};

export default TopNavigationControls;
