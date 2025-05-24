
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp } from 'lucide-react';

interface ProgressTrackerSectionProps {
  progressTracker: {
    examReadiness: number;
    conceptsMastered: number;
    totalConcepts: number;
    weeklyGoal: number;
    weeklyProgress: number;
  };
}

const ProgressTrackerSection: React.FC<ProgressTrackerSectionProps> = ({ progressTracker }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Exam Readiness</span>
            <span className="text-sm text-muted-foreground">{progressTracker.examReadiness}%</span>
          </div>
          <Progress value={progressTracker.examReadiness} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Concepts Mastered</span>
            <span className="text-sm text-muted-foreground">
              {progressTracker.conceptsMastered}/{progressTracker.totalConcepts}
            </span>
          </div>
          <Progress 
            value={(progressTracker.conceptsMastered / progressTracker.totalConcepts) * 100} 
            className="h-2" 
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Weekly Goal</span>
            <span className="text-sm text-muted-foreground">
              {progressTracker.weeklyProgress}/{progressTracker.weeklyGoal} hours
            </span>
          </div>
          <Progress 
            value={(progressTracker.weeklyProgress / progressTracker.weeklyGoal) * 100} 
            className="h-2" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTrackerSection;
