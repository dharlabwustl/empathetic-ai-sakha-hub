
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  MenuIcon, 
  Bell, 
  Settings, 
  Search, 
  HelpCircle, 
  Calendar as CalendarIcon 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TimeAndDateDisplay from "./TimeAndDateDisplay";
import VoiceQueryControl from "./voice/VoiceQueryControl";

interface NavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour: () => void;
}

const TopNavigationControls: React.FC<NavigationControlsProps> = ({
  hideSidebar,
  onToggleSidebar,
  formattedDate,
  formattedTime,
  onOpenTour
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
        
        <div className="relative max-w-md w-full hidden md:flex">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search..." 
            className="pl-9 bg-background/50 border-gray-200 focus-visible:ring-primary/20" 
          />
        </div>
      </div>
      
      <TimeAndDateDisplay 
        formattedTime={formattedTime} 
        formattedDate={formattedDate} 
      />
      
      <div className="flex items-center gap-1">
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
        
        <VoiceQueryControl />
        
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
            <div className="py-2 px-3 text-sm text-muted-foreground">
              New messages and updates will appear here
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" onClick={onOpenTour}>
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/student/profile?tab=voice">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TopNavigationControls;
