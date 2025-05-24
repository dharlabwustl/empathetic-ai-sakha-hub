
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  Brain, 
  TrendingUp, 
  GraduationCap, 
  Heart,
  Clock,
  CreditCard,
  UserCheck,
  Target,
  Zap,
  BarChart3,
  Settings,
  Eye,
  Edit
} from 'lucide-react';
import type { AdminDashboardStats } from '@/types/admin';

interface EnhancedDashboardStatsProps {
  stats: AdminDashboardStats;
}

const EnhancedDashboardStats: React.FC<EnhancedDashboardStatsProps> = ({ stats }) => {
  const kpiData = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: "+12.5%",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      color: "blue",
      actions: ["View", "Edit", "Export"]
    },
    {
      title: "Active Students",
      value: stats.activeStudents.toLocaleString(),
      change: "+8.3%",
      icon: <UserCheck className="h-5 w-5 text-green-600" />,
      color: "green",
      actions: ["View", "Manage", "Analytics"]
    },
    {
      title: "Total Revenue",
      value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`,
      change: "+20.1%",
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      color: "purple",
      actions: ["View", "Reports", "Trends"]
    },
    {
      title: "Study Plans Completed",
      value: "2,847",
      change: "+15.2%",
      icon: <Target className="h-5 w-5 text-orange-600" />,
      color: "orange",
      actions: ["View", "Analyze", "Optimize"]
    },
    {
      title: "Total Concepts",
      value: stats.averageConcepts.toLocaleString(),
      change: "+6.7%",
      icon: <Brain className="h-5 w-5 text-indigo-600" />,
      color: "indigo",
      actions: ["View", "Edit", "Add"]
    },
    {
      title: "Total Flashcards",
      value: (stats.totalFlashcards / 1000000).toFixed(1) + "M",
      change: "+18.4%",
      icon: <BookOpen className="h-5 w-5 text-cyan-600" />,
      color: "cyan",
      actions: ["View", "Manage", "Create"]
    },
    {
      title: "Stress Reduction Rate",
      value: `${stats.verifiedMoodImprovement}%`,
      change: "+11.8%",
      icon: <Heart className="h-5 w-5 text-pink-600" />,
      color: "pink",
      actions: ["View", "Analyze", "Improve"]
    },
    {
      title: "Avg Study Time",
      value: `${stats.averageStudyTimePerUser}h`,
      change: "+5.3%",
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      color: "yellow",
      actions: ["View", "Track", "Optimize"]
    },
    {
      title: "Total Exams",
      value: "45,280",
      change: "+9.1%",
      icon: <GraduationCap className="h-5 w-5 text-red-600" />,
      color: "red",
      actions: ["View", "Create", "Analyze"]
    },
    {
      title: "Avg Exam Readiness",
      value: "78.5%",
      change: "+7.2%",
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      color: "emerald",
      actions: ["View", "Improve", "Track"]
    },
    {
      title: "Monthly Active Users",
      value: "12.4K",
      change: "+14.6%",
      icon: <Users className="h-5 w-5 text-violet-600" />,
      color: "violet",
      actions: ["View", "Segment", "Engage"]
    },
    {
      title: "Daily Active Users",
      value: "3.2K",
      change: "+8.7%",
      icon: <Zap className="h-5 w-5 text-lime-600" />,
      color: "lime",
      actions: ["View", "Monitor", "Boost"]
    }
  ];

  const handleAction = (kpi: string, action: string) => {
    console.log(`${action} action for ${kpi}`);
    // This would navigate to specific pages or open modals
  };

  return (
    <div className="space-y-6">
      {/* Enhanced KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary" className="text-xs">
                  {kpi.change}
                </Badge>
                <div className="flex gap-1">
                  {kpi.actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 text-xs"
                      onClick={() => handleAction(kpi.title, action)}
                    >
                      {action === "View" && <Eye className="h-3 w-3" />}
                      {action === "Edit" && <Edit className="h-3 w-3" />}
                      {action === "Settings" && <Settings className="h-3 w-3" />}
                      {!["View", "Edit", "Settings"].includes(action) && action}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>User Engagement Trends</span>
              <Button size="sm" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Weekly Active Users</span>
                <span className="font-bold">8,450</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Session Duration</span>
                <span className="font-bold">24m avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '76%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span>Feature Adoption</span>
                <span className="font-bold">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Performance Metrics</span>
              <Button size="sm" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analyze
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Concept Completion Rate</span>
                <span className="font-bold text-green-600">89.2%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Exam Success Rate</span>
                <span className="font-bold text-blue-600">76.8%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Mood Improvement</span>
                <span className="font-bold text-purple-600">72%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Retention Rate</span>
                <span className="font-bold text-orange-600">85.4%</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Support Satisfaction</span>
                <span className="font-bold text-pink-600">4.6/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Center */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: "Add User", icon: <Users className="h-5 w-5" />, color: "blue" },
              { label: "Create Content", icon: <BookOpen className="h-5 w-5" />, color: "green" },
              { label: "View Analytics", icon: <BarChart3 className="h-5 w-5" />, color: "purple" },
              { label: "Manage Exams", icon: <GraduationCap className="h-5 w-5" />, color: "orange" },
              { label: "Check Health", icon: <Heart className="h-5 w-5" />, color: "pink" },
              { label: "Settings", icon: <Settings className="h-5 w-5" />, color: "gray" }
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => handleAction("Quick Action", action.label)}
              >
                {action.icon}
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDashboardStats;
