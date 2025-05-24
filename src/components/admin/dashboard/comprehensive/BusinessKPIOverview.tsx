
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Users, DollarSign, Target, BookOpen, Brain,
  Clock, Award, Zap, Heart
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const BusinessKPIOverview = () => {
  const kpiData = [
    { 
      title: 'Total Active Users', 
      value: '2,547', 
      change: '+12%', 
      trend: 'up', 
      icon: Users,
      color: 'text-blue-600' 
    },
    { 
      title: 'Monthly Revenue', 
      value: '₹45,890', 
      change: '+8%', 
      trend: 'up', 
      icon: DollarSign,
      color: 'text-green-600' 
    },
    { 
      title: 'User Engagement', 
      value: '78%', 
      change: '+5%', 
      trend: 'up', 
      icon: Target,
      color: 'text-purple-600' 
    },
    { 
      title: 'Content Views', 
      value: '89,234', 
      change: '+15%', 
      trend: 'up', 
      icon: BookOpen,
      color: 'text-orange-600' 
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 28000, users: 1800 },
    { month: 'Feb', revenue: 32000, users: 2100 },
    { month: 'Mar', revenue: 35000, users: 2300 },
    { month: 'Apr', revenue: 41000, users: 2500 },
    { month: 'May', revenue: 45890, users: 2547 }
  ];

  const engagementData = [
    { name: 'Daily Active', value: 1823, color: '#8884d8' },
    { name: 'Weekly Active', value: 2156, color: '#82ca9d' },
    { name: 'Monthly Active', value: 2547, color: '#ffc658' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue and User Growth Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Business Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Content Generation</span>
                <Badge variant="default">98% Success</Badge>
              </div>
              <div className="flex justify-between">
                <span>Personalization</span>
                <Badge variant="default">87% Effective</Badge>
              </div>
              <div className="flex justify-between">
                <span>Response Time</span>
                <Badge variant="secondary">1.2s Avg</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Student Wellbeing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Mood Tracking</span>
                <Badge variant="default">89% Positive</Badge>
              </div>
              <div className="flex justify-between">
                <span>Stress Levels</span>
                <Badge variant="secondary">Low</Badge>
              </div>
              <div className="flex justify-between">
                <span>Study Satisfaction</span>
                <Badge variant="default">8.4/10</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievement Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Goal Completion</span>
                <Badge variant="default">73%</Badge>
              </div>
              <div className="flex justify-between">
                <span>Study Streaks</span>
                <Badge variant="default">12.3 days avg</Badge>
              </div>
              <div className="flex justify-between">
                <span>Milestone Achievement</span>
                <Badge variant="default">67%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button>Generate Detailed Report</Button>
        <Button variant="outline">Export KPI Data</Button>
        <Button variant="outline">Schedule Reports</Button>
      </div>
    </div>
  );
};

export default BusinessKPIOverview;
