
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodaysPlanData } from "@/types/student/todaysPlan";
import { Clock } from "lucide-react";

interface TimeAllocationWidgetProps {
  planData?: TodaysPlanData;
  isLoading: boolean;
}

const TimeAllocationWidget: React.FC<TimeAllocationWidgetProps> = ({ planData, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Time Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const timeAllocation = planData?.timeAllocation;
  
  if (!timeAllocation) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Time Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Concepts</p>
              <p className="text-sm font-medium">
                {Math.floor(timeAllocation.conceptCards / 60) > 0 ? 
                  `${Math.floor(timeAllocation.conceptCards / 60)}h ${timeAllocation.conceptCards % 60}m` : 
                  `${timeAllocation.conceptCards}m`}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Flashcards</p>
              <p className="text-sm font-medium">
                {Math.floor(timeAllocation.flashcards / 60) > 0 ? 
                  `${Math.floor(timeAllocation.flashcards / 60)}h ${timeAllocation.flashcards % 60}m` : 
                  `${timeAllocation.flashcards}m`}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Practice Tests</p>
              <p className="text-sm font-medium">
                {Math.floor(timeAllocation.practiceTests / 60) > 0 ? 
                  `${Math.floor(timeAllocation.practiceTests / 60)}h ${timeAllocation.practiceTests % 60}m` : 
                  `${timeAllocation.practiceTests}m`}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Time</p>
              <p className="text-sm font-medium">
                {Math.floor(timeAllocation.total / 60) > 0 ? 
                  `${Math.floor(timeAllocation.total / 60)}h ${timeAllocation.total % 60}m` : 
                  `${timeAllocation.total}m`}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeAllocationWidget;
