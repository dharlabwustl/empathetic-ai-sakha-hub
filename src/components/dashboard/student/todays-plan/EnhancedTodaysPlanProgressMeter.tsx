
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Clock, Flame, CheckCircle2, TrendingUp } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { motion } from 'framer-motion';

interface EnhancedTodaysPlanProgressMeterProps {
  planData: TodaysPlanData | null;
  isMobile?: boolean;
}

const EnhancedTodaysPlanProgressMeter: React.FC<EnhancedTodaysPlanProgressMeterProps> = ({ 
  planData, 
  isMobile = false 
}) => {
  if (!planData) return null;

  const progressPercentage = planData.totalTasks > 0 ? (planData.completedTasks / planData.totalTasks) * 100 : 0;
  const totalTimeCompleted = Math.round((progressPercentage / 100) * planData.timeAllocation.total);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white border-0 shadow-2xl relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-3 bg-white/20 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Calendar className="h-7 w-7" />
              </motion.div>
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
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {planData.examGoal || 'NEET'}
            </Badge>
          </div>

          {/* Enhanced Progress Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { icon: Target, value: `${planData.completedTasks}/${planData.totalTasks}`, label: 'Tasks', color: 'from-emerald-400 to-teal-500' },
              { icon: Clock, value: `${totalTimeCompleted}m`, label: 'Completed', color: 'from-amber-400 to-orange-500' },
              { icon: Flame, value: planData.streak, label: 'Day Streak', color: 'from-red-400 to-pink-500' },
              { icon: TrendingUp, value: `${Math.round(progressPercentage)}%`, label: 'Progress', color: 'from-violet-400 to-purple-500' }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg mb-2 backdrop-blur-sm shadow-lg`}>
                  <stat.icon className="h-6 w-6 mx-auto text-white" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Progress Bar */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Daily Progress</span>
              <span className="text-blue-100">{Math.round(progressPercentage)}% of {planData.timeAllocation.total}min</span>
            </div>
            
            <div className="relative">
              <Progress 
                value={progressPercentage} 
                className="h-6 bg-white/20 overflow-hidden"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white mix-blend-difference">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-blue-100">
              <span>Start: 9:00 AM</span>
              <span>Target: {planData.timeAllocation.total}min study time</span>
              <span>End: 6:00 PM</span>
            </div>
          </div>

          {/* Backlog Alert */}
          {planData.backlogTasks && planData.backlogTasks.length > 0 && (
            <motion.div 
              className="mt-6 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 text-orange-100">
                <div className="p-2 bg-orange-500/30 rounded-full">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">
                    {planData.backlogTasks.length} pending tasks from previous days
                  </div>
                  <div className="text-sm opacity-90">
                    Clear these to stay on track with your study goals
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedTodaysPlanProgressMeter;
