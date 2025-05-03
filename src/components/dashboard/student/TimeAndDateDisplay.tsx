
import React from 'react';

interface TimeAndDateDisplayProps {
  formattedTime: string;
  formattedDate: string;
}

const TimeAndDateDisplay: React.FC<TimeAndDateDisplayProps> = ({ 
  formattedTime, 
  formattedDate 
}) => {
  return (
    <div className="hidden md:flex flex-col items-center">
      <div className="text-lg font-semibold">{formattedTime}</div>
      <div className="text-xs text-muted-foreground">{formattedDate}</div>
    </div>
  );
};

export default TimeAndDateDisplay;
