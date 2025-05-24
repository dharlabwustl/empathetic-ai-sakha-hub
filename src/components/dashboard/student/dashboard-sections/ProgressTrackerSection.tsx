
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Target } from 'lucide-react';

export interface ProgressTrackerSectionProps {
  progressTracker: {
    completedTasks: number;
    totalTasks: number;
    streak: number;
    weeklyGoal: number;
    weeklyProgress: number;
  };
}

const ProgressTrackerSection: React.FC<ProgressTrackerSectionProps> = ({ progressTracker }) => {
  const completionPercentage = (progressTracker.completedTasks / progressTracker.totalTasks) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Daily Tasks</span>
            <span className="text-sm text-muted-foreground">
              {progressTracker.completedTasks}/{progressTracker.totalTasks}
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{progressTracker.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{progressTracker.weeklyProgress}%</div>
              <div className="text-xs text-muted-foreground">Weekly Goal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{progressTracker.completedTasks}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTrackerSection;
