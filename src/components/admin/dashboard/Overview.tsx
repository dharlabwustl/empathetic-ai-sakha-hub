
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  DollarSign, 
  UserCheck, 
  Clock,
  Target,
  Brain,
  Award,
  Zap,
  Heart,
  Calendar,
  FileText,
  MessageSquare
} from 'lucide-react';

const Overview: React.FC = () => {
  // Business KPIs data
  const businessKpis = [
    {
      title: "Total Students",
      value: "2,543",
      change: "+12%",
      changeType: "positive",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      description: "from last month"
    },
    {
      title: "Active Sessions",
      value: "1,847",
      change: "+5%",
      changeType: "positive",
      icon: <Activity className="h-4 w-4 text-green-600" />,
      description: "from yesterday"
    },
    {
      title: "Monthly Revenue",
      value: "₹54,231",
      change: "+20%",
      changeType: "positive",
      icon: <DollarSign className="h-4 w-4 text-emerald-600" />,
      description: "from last month"
    },
    {
      title: "Course Completion",
      value: "78%",
      change: "+3%",
      changeType: "positive",
      icon: <BookOpen className="h-4 w-4 text-purple-600" />,
      description: "average rate"
    },
    {
      title: "Student Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      changeType: "positive",
      icon: <Heart className="h-4 w-4 text-red-600" />,
      description: "rating score"
    },
    {
      title: "Study Streak Avg",
      value: "12 days",
      change: "+2 days",
      changeType: "positive",
      icon: <Target className="h-4 w-4 text-orange-600" />,
      description: "per student"
    },
    {
      title: "AI Interactions",
      value: "8,432",
      change: "+15%",
      changeType: "positive",
      icon: <Brain className="h-4 w-4 text-indigo-600" />,
      description: "this week"
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "+2.3%",
      changeType: "positive",
      icon: <TrendingUp className="h-4 w-4 text-cyan-600" />,
      description: "free to paid"
    }
  ];

  const studyAnalytics = [
    { subject: "Mathematics", completion: 85, students: 1203 },
    { subject: "Physics", completion: 78, students: 987 },
    { subject: "Chemistry", completion: 82, students: 1156 },
    { subject: "Biology", completion: 89, students: 743 },
    { subject: "English", completion: 76, students: 1432 }
  ];

  const recentActivities = [
    { name: "Aryan Sharma", action: "Completed Physics Chapter 5", time: "2 minutes ago", type: "achievement" },
    { name: "Priya Patel", action: "Started NEET Mock Test", time: "5 minutes ago", type: "activity" },
    { name: "Rahul Kumar", action: "Joined Chemistry Study Group", time: "10 minutes ago", type: "social" },
    { name: "Ananya Desai", action: "Completed Math Assignment", time: "15 minutes ago", type: "achievement" },
    { name: "Vikram Singh", action: "Updated Study Plan", time: "20 minutes ago", type: "planning" }
  ];

  const quickActions = [
    { title: "Add Student", icon: <Users className="w-6 h-6" />, color: "text-blue-600", action: "user-management" },
    { title: "Create Content", icon: <BookOpen className="w-6 h-6" />, color: "text-green-600", action: "content-creation" },
    { title: "View Analytics", icon: <BarChart3 className="w-6 h-6" />, color: "text-purple-600", action: "analytics" },
    { title: "System Health", icon: <Activity className="w-6 h-6" />, color: "text-orange-600", action: "system-health" },
    { title: "AI Models", icon: <Brain className="w-6 h-6" />, color: "text-indigo-600", action: "ai-models" },
    { title: "Revenue Report", icon: <DollarSign className="w-6 h-6" />, color: "text-emerald-600", action: "revenue" },
    { title: "Send Notification", icon: <MessageSquare className="w-6 h-6" />, color: "text-red-600", action: "notifications" },
    { title: "Export Data", icon: <FileText className="w-6 h-6" />, color: "text-cyan-600", action: "export" }
  ];

  return (
    <div className="space-y-6">
      {/* Business KPIs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Business Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessKpis.map((kpi, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <div className="bg-gray-100 p-2 rounded-full">
                  {kpi.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs mt-1">
                  <span className={`font-medium ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                  <span className="text-muted-foreground ml-1">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Student Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Student Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'achievement' ? 'bg-green-100' :
                    activity.type === 'activity' ? 'bg-blue-100' :
                    activity.type === 'social' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    {activity.type === 'achievement' ? <Award className="w-4 h-4 text-green-600" /> :
                     activity.type === 'activity' ? <Zap className="w-4 h-4 text-blue-600" /> :
                     activity.type === 'social' ? <Users className="w-4 h-4 text-purple-600" /> :
                     <Calendar className="w-4 h-4 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Performance Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Subject Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyAnalytics.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{subject.students} students</span>
                      <span className="text-sm font-bold">{subject.completion}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                      style={{ width: `${subject.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Server Uptime</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-bold">99.9%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Database Performance</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-bold">Optimal</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">API Response Time</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-bold">245ms</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Usage</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-bold">67%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button 
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 hover:shadow-md text-center transition-all group"
                  onClick={() => {
                    // Handle navigation based on action type
                    const params = new URLSearchParams(window.location.search);
                    switch(action.action) {
                      case 'user-management':
                        params.set('tab', 'users');
                        break;
                      case 'content-creation':
                        params.set('tab', 'content');
                        break;
                      case 'analytics':
                        params.set('tab', 'analytics');
                        break;
                      case 'system-health':
                        params.set('tab', 'logs');
                        break;
                      case 'ai-models':
                        params.set('tab', 'ai-models');
                        break;
                      case 'revenue':
                        params.set('tab', 'revenue');
                        break;
                      case 'notifications':
                        params.set('tab', 'notifications');
                        break;
                      case 'export':
                        params.set('tab', 'database');
                        break;
                    }
                    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                >
                  <div className={`${action.color} mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
