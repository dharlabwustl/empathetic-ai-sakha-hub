
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, Brain } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { adjustDailyPlanForMood, getMoodLabel } from './moodUtils';

interface MoodBasedPlanAdjusterProps {
  currentMood?: MoodType;
}

const MoodBasedPlanAdjuster: React.FC<MoodBasedPlanAdjusterProps> = ({ currentMood }) => {
  const [adjustment, setAdjustment] = useState<any>(null);

  useEffect(() => {
    if (currentMood) {
      const newAdjustment = adjustDailyPlanForMood(currentMood);
      setAdjustment(newAdjustment);
    }
  }, [currentMood]);

  if (!currentMood || !adjustment) return null;

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'intensive': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'light': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Today's Mood-Adapted Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Mood:</span>
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            {getMoodLabel(currentMood)}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Study Intensity:</span>
            <Badge className={`${getIntensityColor(adjustment.studyIntensity)} text-white`}>
              {adjustment.studyIntensity}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Time Allocation
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Study</span>
                <span>{adjustment.timeAllocation.study}%</span>
              </div>
              <Progress value={adjustment.timeAllocation.study} className="h-2" />
              
              <div className="flex justify-between text-xs">
                <span>Breaks</span>
                <span>{adjustment.timeAllocation.break}%</span>
              </div>
              <Progress value={adjustment.timeAllocation.break} className="h-2" />
              
              <div className="flex justify-between text-xs">
                <span>Review</span>
                <span>{adjustment.timeAllocation.review}%</span>
              </div>
              <Progress value={adjustment.timeAllocation.review} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Target className="h-4 w-4" />
              Recommended Activities
            </h4>
            <div className="flex flex-wrap gap-1">
              {adjustment.recommendedActivities.map((activity: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodBasedPlanAdjuster;
