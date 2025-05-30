
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { getStudyPlanAdjustments, getStudyRecommendationForMood } from './moodUtils';

interface MoodBasedPlanAdjusterProps {
  currentMood?: MoodType;
  className?: string;
}

const MoodBasedPlanAdjuster: React.FC<MoodBasedPlanAdjusterProps> = ({ 
  currentMood, 
  className = '' 
}) => {
  const [adjustments, setAdjustments] = useState<any>(null);

  useEffect(() => {
    if (currentMood) {
      const moodAdjustments = getStudyPlanAdjustments(currentMood);
      setAdjustments(moodAdjustments);
    }
  }, [currentMood]);

  if (!currentMood || !adjustments) {
    return null;
  }

  const recommendation = getStudyRecommendationForMood(currentMood);
  const subjects = Object.entries(adjustments.timeAllocation);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className={`bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-blue-200/50 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Mood-Based Study Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recommendation */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-300">{recommendation}</p>
          </div>
        </div>

        {/* Study Parameters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Difficulty Level</span>
            </div>
            <Badge variant="outline" className={getDifficultyColor(adjustments.difficulty)}>
              {adjustments.difficulty.charAt(0).toUpperCase() + adjustments.difficulty.slice(1)}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Break Frequency</span>
            </div>
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
              Every {adjustments.breakFrequency} min
            </Badge>
          </div>
        </div>

        {/* Subject Time Allocations */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Recommended Study Time</h4>
          {subjects.map(([subject, minutes]) => (
            <div key={subject} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{subject}</span>
                <span className="text-gray-600">{minutes} min</span>
              </div>
              <Progress 
                value={(minutes as number) / 120 * 100} 
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-500"
              />
            </div>
          ))}
        </div>

        {/* Focus Type */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-200">
          <div className="text-sm">
            <span className="font-medium text-purple-700">Focus Type: </span>
            <span className="text-purple-600 capitalize">
              {adjustments.focusType.replace('-', ' ')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodBasedPlanAdjuster;
