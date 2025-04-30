
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeAllocation } from '@/types/student/todaysPlan';

interface TimeAllocationWidgetProps {
  allocations: TimeAllocation[];
}

const TimeAllocationWidget: React.FC<TimeAllocationWidgetProps> = ({ allocations }) => {
  // Sort allocations by percentage (descending)
  const sortedAllocations = [...allocations].sort((a, b) => b.percentage - a.percentage);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Time Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-6 w-full flex rounded-full overflow-hidden">
            {sortedAllocations.map((allocation, index) => (
              <div
                key={`${allocation.subject}-${index}`}
                className="h-full"
                style={{
                  width: `${allocation.percentage}%`,
                  backgroundColor: allocation.color
                }}
                title={`${allocation.subject}: ${allocation.percentage}%`}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {sortedAllocations.map((allocation, index) => (
              <div key={`${allocation.subject}-legend-${index}`} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: allocation.color }}
                />
                <div className="text-sm flex-1 flex justify-between">
                  <span>{allocation.subject}</span>
                  <span className="text-muted-foreground">{allocation.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeAllocationWidget;
