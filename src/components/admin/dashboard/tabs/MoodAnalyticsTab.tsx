
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, AlertTriangle, Heart, Brain } from 'lucide-react';

const MoodAnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock mood trend data
  const moodTrendData = [
    { date: '2024-01-01', happy: 45, motivated: 38, stressed: 12, tired: 15, anxious: 8 },
    { date: '2024-01-02', happy: 52, motivated: 42, stressed: 10, tired: 13, anxious: 6 },
    { date: '2024-01-03', happy: 48, motivated: 45, stressed: 15, tired: 18, anxious: 12 },
    { date: '2024-01-04', happy: 55, motivated: 48, stressed: 8, tired: 12, anxious: 5 },
    { date: '2024-01-05', happy: 58, motivated: 52, stressed: 6, tired: 10, anxious: 4 },
    { date: '2024-01-06', happy: 61, motivated: 55, stressed: 9, tired: 14, anxious: 7 },
    { date: '2024-01-07', happy: 63, motivated: 58, stressed: 7, tired: 11, anxious: 5 }
  ];

  const moodDistribution = [
    { mood: 'Happy', count: 342, color: '#10B981' },
    { mood: 'Motivated', count: 298, color: '#3B82F6' },
    { mood: 'Focused', count: 256, color: '#8B5CF6' },
    { mood: 'Neutral', count: 189, color: '#6B7280' },
    { mood: 'Tired', count: 156, color: '#F59E0B' },
    { mood: 'Stressed', count: 98, color: '#EF4444' },
    { mood: 'Anxious', count: 67, color: '#F97316' }
  ];

  const interventionTriggers = [
    { id: 1, condition: 'Stressed for 3+ consecutive days', action: 'Suggest breathing exercises', active: true },
    { id: 2, condition: 'Low mood for 5+ days', action: 'Recommend counseling resources', active: true },
    { id: 3, condition: 'Anxiety spike detected', action: 'Trigger calm content', active: false },
    { id: 4, condition: 'Tired mood pattern', action: 'Suggest study schedule adjustment', active: true }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Mood Analytics & Management</h2>
          <p className="text-muted-foreground">Monitor emotional health and mood patterns across all users</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8/10</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +0.3 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students at Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -5 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Interventions</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Triggered this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Logs Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">89% of active users</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Mood Trends</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Trends Over Time</CardTitle>
              <CardDescription>Track mood patterns across your user base</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={moodTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="happy" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="motivated" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="stressed" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="tired" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="anxious" stroke="#F97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Mood Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="count"
                      label={(entry) => `${entry.mood}: ${entry.count}`}
                    >
                      {moodDistribution.map((entry, index) => (
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
                <CardTitle>Mood Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {moodDistribution.map((mood) => (
                  <div key={mood.mood} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mood.color }} />
                      <span className="font-medium">{mood.mood}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{mood.count}</div>
                      <div className="text-sm text-muted-foreground">
                        {((mood.count / moodDistribution.reduce((sum, m) => sum + m.count, 0)) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Intervention Triggers</CardTitle>
              <CardDescription>Configure automatic interventions based on mood patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interventionTriggers.map((trigger) => (
                  <div key={trigger.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{trigger.condition}</div>
                      <div className="text-sm text-muted-foreground">{trigger.action}</div>
                    </div>
                    <Badge variant={trigger.active ? "default" : "secondary"}>
                      {trigger.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                ))}
                <Button className="w-full" variant="outline">Add New Trigger</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effectiveness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood-Based Study Plan Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">73%</div>
                    <div className="text-sm text-muted-foreground">Improved Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">5.2hrs</div>
                    <div className="text-sm text-muted-foreground">Avg Time Saved/Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">89%</div>
                    <div className="text-sm text-muted-foreground">User Satisfaction</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodAnalyticsTab;
