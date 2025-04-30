
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface ProgressTrackerSectionProps {
  // Add proper typing when available
}

const ProgressTrackerSection = ({}: ProgressTrackerSectionProps) => {
  // Mock data for visualization
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 5.2 },
    { day: 'Sun', hours: 2.0 },
  ];
  
  const maxHours = Math.max(...weeklyData.map(d => d.hours));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-end justify-between gap-2">
          {weeklyData.map((day) => {
            const heightPercent = (day.hours / maxHours) * 100;
            
            return (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div className="w-full flex-1 flex items-end">
                  <div 
                    className="w-full bg-blue-500 rounded-t-sm"
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium">{day.day}</div>
                <div className="text-xs text-muted-foreground">{day.hours}h</div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-between text-sm">
          <div>
            <div className="text-muted-foreground">Weekly Target</div>
            <div className="font-medium">25 hours</div>
          </div>
          <div>
            <div className="text-muted-foreground">Completed</div>
            <div className="font-medium">
              {weeklyData.reduce((sum, day) => sum + day.hours, 0).toFixed(1)} hours
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Daily Average</div>
            <div className="font-medium">
              {(weeklyData.reduce((sum, day) => sum + day.hours, 0) / 7).toFixed(1)} hours
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTrackerSection;
