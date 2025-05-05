import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ListChecks, PieChart, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  TimelineView,
  TodaysPlanData,
} from '@/types/student/todaysPlan';
import { MoodType } from '@/types/user/base';

interface TodaysPlanSectionProps {
  todaysPlan: TodaysPlanData;
  timelineView: TimelineView;
  onViewDetails: () => void;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ todaysPlan, timelineView, onViewDetails }) => {
  const totalTasks = todaysPlan?.totalTasks || 0;
  const completedTasks = todaysPlan?.completedTasks || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getMoodBasedTheme = (mood: MoodType) => {
    switch (mood) {
      case MoodType.Tired:
        return 'minimal';
      case MoodType.Stressed:
        return 'minimal';
      case MoodType.Happy:
        return 'standard';
      case MoodType.Focused:
        return 'standard';
      case MoodType.Motivated:
        return 'challenge';
      case MoodType.Confused:
        return 'minimal';
      case MoodType.Calm:
        return 'standard';
      case MoodType.Overwhelmed:
        return 'minimal';
      case MoodType.Okay:
        return 'standard';
      default:
        return 'standard';
    }
  };

  const theme = getMoodBasedTheme(MoodType.Focused);

  return (
    <Card className={cn({
      'border-amber-400': theme === 'challenge',
      'border-green-400': theme === 'standard',
      'border-gray-400': theme === 'minimal',
    })}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-500" />
          <CardTitle className="text-lg font-medium">Today's Plan</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onViewDetails}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Stay on track with your daily goals
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ListChecks className="mr-2 h-4 w-4 text-gray-500" />
              <span>Tasks Completed</span>
            </div>
            <span>{completedTasks}/{totalTasks}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <PieChart className="mr-2 h-4 w-4 text-gray-500" />
              <span>Time Allocation</span>
            </div>
            <span>{todaysPlan?.totalDuration} minutes</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Flame className="mr-2 h-4 w-4 text-gray-500" />
              <span>Current Streak</span>
            </div>
            <span>5 days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
