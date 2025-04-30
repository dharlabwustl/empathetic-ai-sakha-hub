
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock } from 'lucide-react';

interface CompletionSummaryProps {
  completed: number;
  total: number;
  timeSpent: number;
  targetTime: number;
}

export function CompletionSummary({ 
  completed, 
  total, 
  timeSpent, 
  targetTime 
}: CompletionSummaryProps) {
  // Calculate percentages
  const taskPercentage = Math.round((completed / total) * 100) || 0;
  const timePercentage = Math.round((timeSpent / targetTime) * 100) || 0;
  
  return (
    <Card className="border-t-4 border-t-green-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="text-green-500" size={18} />
          Completion Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center text-sm mb-1">
            <span>Task Completion</span>
            <span className="font-medium">{completed}/{total} ({taskPercentage}%)</span>
          </div>
          <Progress value={taskPercentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Study Time
            </span>
            <span className="font-medium">{timeSpent}/{targetTime} min ({timePercentage}%)</span>
          </div>
          <Progress value={timePercentage} className="h-2" />
        </div>
        
        <div className="text-sm">
          {taskPercentage < 30 ? (
            <p className="text-amber-600 dark:text-amber-400">
              Just getting started! Keep going to build momentum.
            </p>
          ) : taskPercentage < 70 ? (
            <p className="text-blue-600 dark:text-blue-400">
              Good progress! You're moving steadily through today's plan.
            </p>
          ) : (
            <p className="text-green-600 dark:text-green-400">
              Excellent work! You're almost done with today's tasks.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
