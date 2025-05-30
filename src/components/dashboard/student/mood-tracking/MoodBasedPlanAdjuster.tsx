
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodType } from '@/types/user/base';
import { Clock, BookOpen, Brain } from 'lucide-react';
import { updateStudyTimeAllocationsByMood, getStudyRecommendationForMood } from './moodUtils';

interface MoodBasedPlanAdjusterProps {
  currentMood: MoodType;
  onPlanUpdated?: () => void;
}

const MoodBasedPlanAdjuster: React.FC<MoodBasedPlanAdjusterProps> = ({
  currentMood,
  onPlanUpdated
}) => {
  const adjustedAllocations = updateStudyTimeAllocationsByMood(currentMood);
  const recommendation = getStudyRecommendationForMood(currentMood);

  React.useEffect(() => {
    onPlanUpdated?.();
  }, [currentMood, onPlanUpdated]);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Mood-Adapted Study Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          {recommendation}
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Adjusted Time Allocations
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(adjustedAllocations).map(([subject, minutes]) => (
              <div key={subject} className="bg-white/70 dark:bg-gray-800/70 p-2 rounded text-xs">
                <div className="font-medium">{subject}</div>
                <div className="text-gray-600 dark:text-gray-300">{minutes} min</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <BookOpen className="h-3 w-3" />
            <span>Plan automatically adjusted based on your current mood</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodBasedPlanAdjuster;
