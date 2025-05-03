
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Volume2, HelpCircle } from "lucide-react";

interface ProfileVoiceTooltipProps {
  children: React.ReactNode;
}

const ProfileVoiceTooltip: React.FC<ProfileVoiceTooltipProps> = ({ children }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className="relative">
            {children}
            {/* Add a subtle highlight around the icon when not hovering */}
            <span className="absolute inset-0 bg-primary/5 rounded-md -z-10"></span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-white/95 backdrop-blur-sm border shadow-md">
          <div className="flex items-start gap-2 p-1">
            <Volume2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
            <div>
              <p className="font-medium text-sm">Indian Female Voice Assistant</p>
              <p className="text-xs text-muted-foreground mt-1">
                Customize your voice assistant with a pleasant, energetic Indian female voice.
                Adjust volume, speaking speed, and which events trigger announcements.
              </p>
              <p className="text-xs mt-2 font-medium text-primary">Click to interact with your assistant</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProfileVoiceTooltip;
