
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Target, Calendar } from 'lucide-react';

export const WeeklyMonthlyDashboard = () => {
  const weeklyStats = {
    totalHours: 18,
    targetHours: 24,
    completedTopics: 12,
    totalTopics: 18,
    avgScore: 78
  };

  const monthlyStats = {
    totalHours: 72,
    targetHours: 96,
    completedTopics: 45,
    totalTopics: 72,
    avgScore: 82
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Study Hours</span>
                  <span>{weeklyStats.totalHours}/{weeklyStats.targetHours}h</span>
                </div>
                <Progress value={(weeklyStats.totalHours / weeklyStats.targetHours) * 100} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Topics Completed</span>
                  <span>{weeklyStats.completedTopics}/{weeklyStats.totalTopics}</span>
                </div>
                <Progress value={(weeklyStats.completedTopics / weeklyStats.totalTopics) * 100} />
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <span className="font-bold text-green-600">{weeklyStats.avgScore}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Study Hours</span>
                  <span>{monthlyStats.totalHours}/{monthlyStats.targetHours}h</span>
                </div>
                <Progress value={(monthlyStats.totalHours / monthlyStats.targetHours) * 100} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Topics Completed</span>
                  <span>{monthlyStats.completedTopics}/{monthlyStats.totalTopics}</span>
                </div>
                <Progress value={(monthlyStats.completedTopics / monthlyStats.totalTopics) * 100} />
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <span className="font-bold text-green-600">{monthlyStats.avgScore}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
