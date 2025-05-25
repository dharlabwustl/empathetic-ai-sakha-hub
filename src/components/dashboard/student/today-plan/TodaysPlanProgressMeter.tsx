
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Target } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanProgressMeterProps {
  planData: TodaysPlanData | null;
  isMobile?: boolean;
}

const TodaysPlanProgressMeter: React.FC<TodaysPlanProgressMeterProps> = ({
  planData,
  isMobile = false
}) => {
  // Calculate progress metrics
  const getProgressMetrics = () => {
    if (!planData) return { completed: 0, total: 0, percentage: 0 };
    
    const totalTasks = planData.conceptCards.length + planData.flashcards.length + planData.practiceTests.length;
    const completedTasks = 0; // This would be calculated based on actual completion status
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return { completed: completedTasks, total: totalTasks, percentage };
  };

  const metrics = getProgressMetrics();
  
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Today's Progress
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Completion</span>
            <span className="font-medium">{metrics.percentage}%</span>
          </div>
          <Progress value={metrics.percentage} className="h-2" />
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
          <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-6 w-6 mx-auto text-green-600 mb-1" />
            <div className="text-lg font-bold text-green-600">{metrics.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
            <Clock className="h-6 w-6 mx-auto text-orange-600 mb-1" />
            <div className="text-lg font-bold text-orange-600">{metrics.total - metrics.completed}</div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <Target className="h-6 w-6 mx-auto text-blue-600 mb-1" />
            <div className="text-lg font-bold text-blue-600">{metrics.total}</div>
            <div className="text-xs text-muted-foreground">Total Tasks</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanProgressMeter;
