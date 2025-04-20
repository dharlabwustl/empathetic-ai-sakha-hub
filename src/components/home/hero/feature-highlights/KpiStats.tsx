
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart, TrendingUp, Activity, Users } from "lucide-react";

interface KpiStatsProps {
  title?: string;
}

const KpiStats: React.FC<KpiStatsProps> = ({ title = "Key Stats" }) => {
  const [stats, setStats] = useState({
    totalUsers: 2500,
    studyTime: 45000,
    taskCompletion: 83,
    examSuccess: 92
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-sm">Students</CardTitle>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">+125 this month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              <CardTitle className="text-sm">Study Hours</CardTitle>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{Math.floor(stats.studyTime / 60).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Across all users</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-sm">Task Completion</CardTitle>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{stats.taskCompletion}%</p>
              <p className="text-xs text-muted-foreground">+5% vs last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-sm">Exam Success</CardTitle>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">{stats.examSuccess}%</p>
              <p className="text-xs text-muted-foreground">Pass rate</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KpiStats;
