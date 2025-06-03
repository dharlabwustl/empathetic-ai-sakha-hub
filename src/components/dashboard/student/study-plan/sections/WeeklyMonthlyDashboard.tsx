
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Calendar, Target } from 'lucide-react';

export const WeeklyMonthlyDashboard = () => {
  const weeklyData = [
    { week: 'Week 1', physics: 85, chemistry: 70, biology: 90 },
    { week: 'Week 2', physics: 78, chemistry: 75, biology: 88 },
    { week: 'Week 3', physics: 82, chemistry: 80, biology: 85 },
    { week: 'Week 4', physics: 88, chemistry: 85, biology: 92 }
  ];

  const monthlyStats = {
    totalHours: 156,
    targetHours: 160,
    averageScore: 82,
    improvement: '+12%'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly & Monthly Progress Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Monthly Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{monthlyStats.totalHours}</div>
              <div className="text-sm text-gray-600">Hours Studied</div>
              <div className="text-xs text-gray-500">Target: {monthlyStats.targetHours}h</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{monthlyStats.averageScore}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{monthlyStats.improvement}</div>
              <div className="text-sm text-gray-600">Improvement</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">97%</div>
              <div className="text-sm text-gray-600">Goal Achievement</div>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="mb-6">
            <h3 className="font-medium mb-4">Weekly Subject Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Bar dataKey="physics" fill="#8B5CF6" name="Physics" />
                  <Bar dataKey="chemistry" fill="#10B981" name="Chemistry" />
                  <Bar dataKey="biology" fill="#F59E0B" name="Biology" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Progress Breakdown */}
          <div>
            <h3 className="font-medium mb-4">Current Month Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Physics</span>
                  <span className="text-sm text-gray-600">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Chemistry</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Biology</span>
                  <span className="text-sm text-gray-600">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
