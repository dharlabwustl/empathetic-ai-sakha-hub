
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
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="flex items-start gap-2">
            <Volume2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Indian Female Voice Assistant</p>
              <p className="text-xs text-muted-foreground mt-1">
                Customize your voice assistant with a pleasant, energetic Indian female voice.
                Adjust volume, speaking speed, and which events trigger announcements.
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProfileVoiceTooltip;
