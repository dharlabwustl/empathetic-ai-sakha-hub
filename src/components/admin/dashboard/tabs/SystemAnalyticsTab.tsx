import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminService } from "@/services/adminService";
import { Activity, TrendingUp, Users } from "lucide-react";
import { motion } from 'framer-motion';

interface KpiStats {
  stressReduction: number;
  timeOptimization: number;
  habitFormation: number;
  examConfidence: number;
  userRetention: number;
  moodBasedUsage: number;
}

const SystemAnalyticsTab = () => {
  const [stats, setStats] = React.useState<KpiStats | null>(null);

  React.useEffect(() => {
    const fetchStats = async () => {
      const dashboardStats = await adminService.getDashboardStats();
      if (dashboardStats) {
        setStats({
          stressReduction: Math.min(Math.round((dashboardStats.averageMoodScore - 5) / 5 * 100), 100),
          timeOptimization: 5,
          habitFormation: Math.round((dashboardStats.studentsWithConsistentHabits / dashboardStats.totalStudents) * 100),
          examConfidence: Math.round((dashboardStats.averageConfidenceScore / 10) * 100),
          userRetention: Math.round((dashboardStats.activeStudents / dashboardStats.totalStudents) * 100),
          moodBasedUsage: Math.round((dashboardStats.moodBasedSessionsCount / dashboardStats.totalSessions) * 100)
        });
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Success Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Stress Reduction</span>
                <span className="font-bold">{stats.stressReduction}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Habit Formation</span>
                <span className="font-bold">{stats.habitFormation}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Exam Confidence</span>
                <span className="font-bold">80%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>User Retention</span>
                <span className="font-bold">{stats.userRetention}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Mood-Based Usage</span>
                <span className="font-bold">{stats.moodBasedUsage}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Time Optimization</span>
                <span className="font-bold">{stats.timeOptimization}+ hrs/week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <TrendingUp className="h-24 w-24 text-gray-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemAnalyticsTab;
