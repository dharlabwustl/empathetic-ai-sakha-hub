
import React from 'react';
import { cn } from '@/lib/utils';

interface TimeAllocationWidgetProps {
  title: string;
  value: number;
  total: number;
  color: string;
  subject: string;
}

const TimeAllocationWidget: React.FC<TimeAllocationWidgetProps> = ({ title, value, total, color, subject }) => {
  const percentage = Math.round((value / total) * 100);
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{title}</span>
        <span className="text-muted-foreground">{value} min ({percentage}%)</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default TimeAllocationWidget;
