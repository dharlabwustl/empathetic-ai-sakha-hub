
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Brain, BookOpen, Target, TrendingUp, Activity, 
  Server, Database, Zap, Shield, Clock, Award 
} from 'lucide-react';

const SystemOverview: React.FC = () => {
  // Mock data - replace with real API calls
  const systemStats = {
    totalStudents: 15420,
    activeStudents: 12340,
    totalContent: 8950,
    aiModelsActive: 12,
    studyPlansGenerated: 3420,
    examsTaken: 8750,
    systemUptime: "99.8%",
    serverLoad: 45,
    dbPerformance: 92,
    apiResponseTime: "120ms"
  };

  const recentActivities = [
    { id: 1, action: "New student registered", time: "2 minutes ago", type: "user" },
    { id: 2, action: "AI model updated - Study Plan Generator", time: "15 minutes ago", type: "system" },
    { id: 3, action: "Batch exam completed - NEET 2025", time: "1 hour ago", type: "exam" },
    { id: 4, action: "Mood analytics updated", time: "2 hours ago", type: "analytics" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">80.1% engagement rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Models Active</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.aiModelsActive}</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Items</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalContent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+320 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Server Load</span>
                <span>{systemStats.serverLoad}%</span>
              </div>
              <Progress value={systemStats.serverLoad} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Database Performance</span>
                <span>{systemStats.dbPerformance}%</span>
              </div>
              <Progress value={systemStats.dbPerformance} className="h-2" />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">System Uptime</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {systemStats.systemUptime}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">API Response Time</span>
              <Badge variant="outline">
                {systemStats.apiResponseTime}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Learning Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Study Plans Generated</span>
              <span className="font-bold">{systemStats.studyPlansGenerated.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Exams Taken</span>
              <span className="font-bold">{systemStats.examsTaken.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">AI Recommendations</span>
              <span className="font-bold">45,230</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Mood Entries</span>
              <span className="font-bold">23,410</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent System Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'system' ? 'bg-green-500' :
                    activity.type === 'exam' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`} />
                  <span className="text-sm">{activity.action}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <span className="text-sm">Manage Students</span>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Brain className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <span className="text-sm">AI Models</span>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <span className="text-sm">Content Library</span>
            </button>
            
            <button className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Shield className="h-6 w-6 mx-auto mb-2 text-red-500" />
              <span className="text-sm">Security Center</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemOverview;
