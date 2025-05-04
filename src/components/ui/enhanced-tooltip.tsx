
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface EnhancedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  delay?: number;
}

export const EnhancedTooltip: React.FC<EnhancedTooltipProps> = ({
  content,
  children,
  side = "bottom",
  className,
  delay = 200
}) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side}
          className={cn(
            "z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border shadow-md text-sm p-2",
            className
          )}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
