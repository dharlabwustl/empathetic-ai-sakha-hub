
import React from 'react';
import { CalendarClock } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface TimeAndDateDisplayProps {
  formattedTime: string;
  formattedDate: string;
}

const TimeAndDateDisplay: React.FC<TimeAndDateDisplayProps> = ({
  formattedTime,
  formattedDate
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="hidden md:flex flex-col items-center">
            <p className="text-xl font-semibold">{formattedTime}</p>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span>Current date and time</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TimeAndDateDisplay;
