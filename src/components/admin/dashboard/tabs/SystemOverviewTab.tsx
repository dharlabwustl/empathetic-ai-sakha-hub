
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Brain, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  Clock,
  Target,
  Award,
  Zap,
  Heart,
  MessageSquare,
  Gamepad2,
  BarChart3,
  DollarSign,
  Server,
  Database
} from 'lucide-react';

const SystemOverviewTab = () => {
  const platformMetrics = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "AI-Generated Content",
      value: "15,234",
      change: "+24.1%",
      icon: BookOpen,
      color: "text-green-600"
    },
    {
      title: "Active AI Models",
      value: "12",
      change: "+2",
      icon: Brain,
      color: "text-purple-600"
    },
    {
      title: "Avg Exam Readiness",
      value: "87.5%",
      change: "+5.2%",
      icon: Target,
      color: "text-orange-600"
    },
    {
      title: "Daily Active Users",
      value: "1,923",
      change: "+8.7%",
      icon: Activity,
      color: "text-indigo-600"
    },
    {
      title: "Monthly Revenue",
      value: "$47,892",
      change: "+18.3%",
      icon: DollarSign,
      color: "text-emerald-600"
    }
  ];

  const aiModelStatus = [
    { name: "Study Plan Generator", status: "active", performance: 94, requests: "2.4k/day" },
    { name: "Content Creator", status: "active", performance: 89, requests: "5.7k/day" },
    { name: "Exam Generator", status: "active", performance: 92, requests: "1.2k/day" },
    { name: "Adaptive Learning Engine", status: "active", performance: 87, requests: "8.9k/day" },
    { name: "Voice Assistant", status: "active", performance: 91, requests: "3.1k/day" },
    { name: "Mood Analytics", status: "active", performance: 85, requests: "4.2k/day" },
    { name: "Formula Lab Generator", status: "active", performance: 93, requests: "1.8k/day" },
    { name: "Gamification Engine", status: "active", performance: 88, requests: "2.9k/day" },
    { name: "Assessment Creator", status: "active", performance: 90, requests: "1.5k/day" },
    { name: "Learning Analytics", status: "active", performance: 86, requests: "6.3k/day" },
    { name: "Batch Intelligence", status: "active", performance: 84, requests: "890/day" },
    { name: "Surrounding Influence AI", status: "active", performance: 82, requests: "1.1k/day" }
  ];

  const systemHealth = [
    { service: "Flask Backend API", status: "healthy", uptime: "99.9%", response: "45ms" },
    { service: "AI Model Endpoints", status: "healthy", uptime: "98.7%", response: "120ms" },
    { service: "Student Dashboard", status: "healthy", uptime: "99.8%", response: "35ms" },
    { service: "Content Generation", status: "healthy", uptime: "97.2%", response: "340ms" },
    { service: "Voice Processing", status: "healthy", uptime: "96.8%", response: "180ms" },
    { service: "Analytics Engine", status: "healthy", uptime: "99.5%", response: "67ms" },
    { service: "Database Cluster", status: "healthy", uptime: "99.9%", response: "12ms" },
    { service: "File Storage", status: "healthy", uptime: "99.7%", response: "23ms" }
  ];

  const recentActivities = [
    { type: "AI Generation", message: "1,247 concept cards generated across all subjects", time: "2 minutes ago" },
    { type: "Study Plans", message: "89 adaptive study plans updated based on student performance", time: "5 minutes ago" },
    { type: "Exams Created", message: "23 practice exams generated for JEE and NEET preparations", time: "8 minutes ago" },
    { type: "Voice Interactions", message: "342 voice assistant queries processed successfully", time: "12 minutes ago" },
    { type: "Mood Analytics", message: "1,567 mood-based study plan adjustments made", time: "15 minutes ago" },
    { type: "Batch Updates", message: "15 batch groups received collaborative learning content", time: "18 minutes ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{metric.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Models Performance Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Models Performance Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiModelStatus.map((model, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{model.name}</h4>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {model.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Performance</span>
                    <span>{model.performance}%</span>
                  </div>
                  <Progress value={model.performance} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {model.requests} requests
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health & Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2" />
              System Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-sm">{service.service}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-muted-foreground">Uptime: {service.uptime}</span>
                    <span className="text-muted-foreground">Avg: {service.response}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Platform Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm mt-1">{activity.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Student Journey Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Active Journeys</span>
                <span className="font-medium">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Completed Today</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Avg Completion Rate</span>
                <span className="font-medium">84.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">AI Content Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Generated Today</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Quality Score</span>
                <span className="font-medium">94.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Processing Queue</span>
                <span className="font-medium">23</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Business Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Revenue Today</span>
                <span className="font-medium">$1,596</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">New Subscriptions</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Churn Rate</span>
                <span className="font-medium">2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemOverviewTab;
