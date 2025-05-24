
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Heart, TrendingUp, Users, Calendar, BarChart3, Filter, Download } from 'lucide-react';

const MoodAnalyticsTab: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const moodStats = {
    totalMoodEntries: 15247,
    activeUsers: 3456,
    moodImprovementRate: 68.5,
    averageMoodScore: 7.2,
    moodBasedPlanAdjustments: 892
  };

  const moodDistribution = [
    { mood: 'Motivated', count: 4521, percentage: 29.7, trend: 'up' },
    { mood: 'Focused', count: 3892, percentage: 25.5, trend: 'up' },
    { mood: 'Happy', count: 2341, percentage: 15.4, trend: 'up' },
    { mood: 'Okay', count: 1876, percentage: 12.3, trend: 'neutral' },
    { mood: 'Tired', count: 1543, percentage: 10.1, trend: 'down' },
    { mood: 'Stressed', count: 876, percentage: 5.7, trend: 'down' },
    { mood: 'Anxious', count: 198, percentage: 1.3, trend: 'down' }
  ];

  const recentMoodEntries = [
    { id: '1', studentName: 'John Doe', mood: 'Motivated', timestamp: '2024-01-15 14:30', planAdjusted: true },
    { id: '2', studentName: 'Jane Smith', mood: 'Focused', timestamp: '2024-01-15 14:25', planAdjusted: false },
    { id: '3', studentName: 'Mike Johnson', mood: 'Tired', timestamp: '2024-01-15 14:20', planAdjusted: true },
    { id: '4', studentName: 'Sarah Wilson', mood: 'Happy', timestamp: '2024-01-15 14:15', planAdjusted: false }
  ];

  return (
    <div className="space-y-6">
      {/* Mood Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mood Entries</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodStats.totalMoodEntries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodStats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Tracking mood</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodStats.moodImprovementRate}%</div>
            <p className="text-xs text-muted-foreground">Users showing improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Mood Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodStats.averageMoodScore}/10</div>
            <p className="text-xs text-muted-foreground">Platform average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plan Adjustments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodStats.moodBasedPlanAdjustments}</div>
            <p className="text-xs text-muted-foreground">Mood-based changes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="distribution">Mood Distribution</TabsTrigger>
          <TabsTrigger value="trends">Trends & Patterns</TabsTrigger>
          <TabsTrigger value="real-time">Real-time Feed</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mood Distribution Analysis</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moodDistribution.map((mood, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      <span className="font-medium">{mood.mood}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{mood.count.toLocaleString()} entries</span>
                      <Badge variant="outline">{mood.percentage}%</Badge>
                      <div className={`w-4 h-4 ${mood.trend === 'up' ? 'text-green-500' : mood.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                        <TrendingUp className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="real-time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Mood Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Mood</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Plan Adjusted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentMoodEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.studentName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.mood}</Badge>
                      </TableCell>
                      <TableCell>{entry.timestamp}</TableCell>
                      <TableCell>
                        <Badge className={entry.planAdjusted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {entry.planAdjusted ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodAnalyticsTab;
