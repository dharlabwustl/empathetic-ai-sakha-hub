
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Timer } from 'lucide-react';

interface CompletionSummaryProps {
  completed: number;
  total: number;
  timeSpent: number;
  targetTime: number;
}

export function CompletionSummary({ completed, total, timeSpent, targetTime }: CompletionSummaryProps) {
  const completionPercentage = Math.round((completed / total) * 100);
  const timePercentage = Math.min(Math.round((timeSpent / targetTime) * 100), 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="text-amber-500" size={18} />
          Today's Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tasks Completed</span>
            <span className="font-medium">{completed}/{total}</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Study Time</span>
            <span className="font-medium">{timeSpent}/{targetTime} minutes</span>
          </div>
          <Progress value={timePercentage} className="h-2" />
        </div>
        
        {completionPercentage >= 100 && (
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-300 text-sm flex items-center gap-2">
            <Award size={16} />
            <span>All tasks completed! Great job!</span>
          </div>
        )}
        
        {timePercentage >= 100 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 text-sm flex items-center gap-2">
            <Timer size={16} />
            <span>You've reached your target study time!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
