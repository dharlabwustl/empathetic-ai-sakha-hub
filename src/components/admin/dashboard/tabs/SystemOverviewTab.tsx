
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Users, 
  Brain, 
  Database, 
  Server, 
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const SystemOverviewTab = () => {
  const systemMetrics = [
    { label: "Platform Uptime", value: "99.9%", status: "excellent", icon: Activity },
    { label: "AI Model Performance", value: "94.2%", status: "good", icon: Brain },
    { label: "Database Health", value: "98.1%", status: "excellent", icon: Database },
    { label: "API Response Time", value: "127ms", status: "good", icon: Server }
  ];

  const realtimeStats = [
    { label: "Students Online", value: 1247, change: "+15%", icon: Users },
    { label: "AI Interactions/min", value: 342, change: "+8%", icon: Brain },
    { label: "Study Plans Generated", value: 23, change: "+12%", icon: TrendingUp },
    { label: "Content Created Today", value: 89, change: "+5%", icon: Zap }
  ];

  const getStatusIcon = (status: string) => {
    return status === "excellent" ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  };

  const getStatusColor = (status: string) => {
    return status === "excellent" ? "text-green-600" : "text-yellow-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">System Overview</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Real-time platform health, performance metrics, and AI system status
        </p>
      </div>

      {/* System Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <metric.icon className="h-5 w-5 text-muted-foreground" />
                {getStatusIcon(metric.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                {metric.value}
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Platform Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {realtimeStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <stat.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <Badge variant="outline" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Models Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Models Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Study Plan Generation AI</span>
                <span className="text-green-600 font-semibold">96.2%</span>
              </div>
              <Progress value={96.2} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Content Creation AI</span>
                <span className="text-green-600 font-semibold">94.8%</span>
              </div>
              <Progress value={94.8} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mood Analysis AI</span>
                <span className="text-yellow-600 font-semibold">89.3%</span>
              </div>
              <Progress value={89.3} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Voice Assistant AI</span>
                <span className="text-green-600 font-semibold">92.7%</span>
              </div>
              <Progress value={92.7} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Journey Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">87.3%</div>
                <div className="text-sm text-muted-foreground">Onboarding Completion</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">92.1%</div>
                <div className="text-sm text-muted-foreground">Study Plan Adherence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">78.9%</div>
                <div className="text-sm text-muted-foreground">Exam Readiness Avg</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">85.4%</div>
                <div className="text-sm text-muted-foreground">Student Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flask Backend Status */}
      <Card>
        <CardHeader>
          <CardTitle>Flask Backend Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-900 dark:text-green-100">API Gateway</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">All endpoints operational</p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-900 dark:text-green-100">AI Models API</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">Connected and responsive</p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-900 dark:text-green-100">Database Sync</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">Real-time synchronization</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverviewTab;
