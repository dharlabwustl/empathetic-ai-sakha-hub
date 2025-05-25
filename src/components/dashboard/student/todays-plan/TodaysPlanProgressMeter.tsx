
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Clock, Flame, CheckCircle2 } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanProgressMeterProps {
  planData: TodaysPlanData | null;
  isMobile?: boolean;
}

const TodaysPlanProgressMeter: React.FC<TodaysPlanProgressMeterProps> = ({ planData, isMobile = false }) => {
  if (!planData) return null;

  const progressPercentage = planData.totalTasks > 0 ? (planData.completedTasks / planData.totalTasks) * 100 : 0;
  const totalTimeCompleted = Math.round((progressPercentage / 100) * planData.timeAllocation.total);

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Today's Study Plan</h2>
              <p className="text-blue-100">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {planData.examGoal || 'NEET'}
          </Badge>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="p-3 bg-white/10 rounded-lg mb-2">
              <Target className="h-6 w-6 mx-auto" />
            </div>
            <div className="text-2xl font-bold">{planData.completedTasks}/{planData.totalTasks}</div>
            <div className="text-sm text-blue-100">Tasks</div>
          </div>

          <div className="text-center">
            <div className="p-3 bg-white/10 rounded-lg mb-2">
              <Clock className="h-6 w-6 mx-auto" />
            </div>
            <div className="text-2xl font-bold">{totalTimeCompleted}m</div>
            <div className="text-sm text-blue-100">Completed</div>
          </div>

          <div className="text-center">
            <div className="p-3 bg-white/10 rounded-lg mb-2">
              <Flame className="h-6 w-6 mx-auto" />
            </div>
            <div className="text-2xl font-bold">{planData.streak}</div>
            <div className="text-sm text-blue-100">Day Streak</div>
          </div>

          <div className="text-center">
            <div className="p-3 bg-white/10 rounded-lg mb-2">
              <CheckCircle2 className="h-6 w-6 mx-auto" />
            </div>
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
            <div className="text-sm text-blue-100">Complete</div>
          </div>
        </div>

        {/* Main Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Daily Progress</span>
            <span className="text-blue-100">{Math.round(progressPercentage)}% of {planData.timeAllocation.total}min</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-4 bg-white/20"
          />
          <div className="flex justify-between text-xs text-blue-100">
            <span>Start: 9:00 AM</span>
            <span>Target: {planData.timeAllocation.total}min study time</span>
            <span>End: 6:00 PM</span>
          </div>
        </div>

        {/* Backlog Alert */}
        {planData.backlogTasks && planData.backlogTasks.length > 0 && (
          <div className="mt-4 p-3 bg-orange-500/20 border border-orange-400/30 rounded-lg">
            <div className="flex items-center gap-2 text-orange-100">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">
                {planData.backlogTasks.length} pending tasks from previous days
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysPlanProgressMeter;
