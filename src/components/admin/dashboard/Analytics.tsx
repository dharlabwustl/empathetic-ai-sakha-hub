
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Analytics: React.FC = () => {
  const studentGrowthData = [
    { month: 'Jan', students: 1200, active: 950 },
    { month: 'Feb', students: 1350, active: 1080 },
    { month: 'Mar', students: 1500, active: 1200 },
    { month: 'Apr', students: 1750, active: 1400 },
    { month: 'May', students: 2000, active: 1600 },
    { month: 'Jun', students: 2350, active: 1880 }
  ];

  const examPerformanceData = [
    { exam: 'IIT-JEE', avgScore: 78, students: 850 },
    { exam: 'NEET', avgScore: 82, students: 920 },
    { exam: 'CAT', avgScore: 75, students: 450 },
    { exam: 'UPSC', avgScore: 68, students: 320 },
    { exam: 'GATE', avgScore: 72, students: 280 }
  ];

  const subscriptionData = [
    { name: 'Free', value: 60, color: '#8884d8' },
    { name: 'Basic', value: 25, color: '#82ca9d' },
    { name: 'Premium', value: 15, color: '#ffc658' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Study Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">+0.3h from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128K</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">+4.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studentGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="active" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exam Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={examPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="exam" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Course Completion Rate</span>
                <span className="text-green-600 font-bold">89%</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Student Satisfaction</span>
                <span className="text-blue-600 font-bold">4.7/5</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Churn Rate</span>
                <span className="text-red-600 font-bold">3.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Revenue per User</span>
                <span className="text-purple-600 font-bold">$24.50</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
