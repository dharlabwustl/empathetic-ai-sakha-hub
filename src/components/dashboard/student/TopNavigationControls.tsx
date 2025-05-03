
import React from 'react';
import { Button } from "@/components/ui/button";
import { MenuIcon, Bell, Settings, Search, HelpCircle, Calendar as CalendarIcon, Volume2, VolumeX } from 'lucide-react';
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TimeAndDateDisplay from "./TimeAndDateDisplay";
import VoiceQueryControl from "./voice/VoiceQueryControl";
import { useVoiceAnnouncerContext } from './voice/VoiceAnnouncer';

const TopNavigationControls = ({ 
  hideSidebar, 
  onToggleSidebar, 
  formattedDate, 
  formattedTime, 
  onOpenTour 
}) => {
  const { settings, updateSettings, stopSpeaking } = useVoiceAnnouncerContext();
  
  const handleToggleMute = () => {
    // Stop any ongoing speech
    stopSpeaking();
    
    // Toggle the voice enabled state
    updateSettings({ 
      enabled: !settings.enabled
    });
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onToggleSidebar}
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle Sidebar Menu</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="relative max-w-md w-full hidden md:flex">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-background/50 border-gray-200 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <TimeAndDateDisplay formattedTime={formattedTime} formattedDate={formattedDate} />

      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                asChild
              >
                <Link to="/dashboard/student/calendar">
                  <CalendarIcon className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View Calendar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Voice Mute Toggle Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={settings.enabled ? "ghost" : "outline"}
                size="icon"
                onClick={handleToggleMute}
                className={`relative ${!settings.enabled ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' : ''}`}
              >
                {settings.enabled ? (
                  <Volume2 className="h-5 w-5 text-primary" />
                ) : (
                  <VolumeX className="h-5 w-5 text-red-500" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{settings.enabled ? "Mute Voice Assistant" : "Unmute Voice Assistant"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Highlighted Voice Query Control */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse -z-10"></div>
          <VoiceQueryControl className="relative z-10" />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">3</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-2 font-medium border-b">Notifications</div>
                  <div className="py-2 px-3 text-sm text-muted-foreground">New messages and updates will appear here</div>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenTour}
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View Tour Guide</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <Link to="/dashboard/student/profile?tab=voice">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings and Voice Controls</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TopNavigationControls;
