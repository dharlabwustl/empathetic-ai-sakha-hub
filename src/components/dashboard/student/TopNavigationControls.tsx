
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Tour } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface TopNavigationControlsProps {
  hideSidebar: boolean;
  onToggleSidebar: () => void;
  formattedDate: string;
  formattedTime: string;
  onOpenTour?: () => void;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({ 
  hideSidebar, 
  onToggleSidebar, 
  formattedDate,
  formattedTime,
  onOpenTour
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:block">
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {onOpenTour && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline" 
                  size="icon"
                  onClick={onOpenTour}
                  className="border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                >
                  <Tour className="h-4 w-4 text-blue-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Take a tour
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <Avatar 
          className="h-8 w-8 cursor-pointer border border-gray-200" 
          onClick={() => navigate("/dashboard/student/settings")}
        >
          <AvatarImage src="/lovable-uploads/ffb2594e-ee5e-424c-92ff-417777e347c9.png" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopNavigationControls;
