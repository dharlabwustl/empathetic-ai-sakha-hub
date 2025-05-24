
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Clock, 
  Target,
  Download,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';

const AnalyticsReporting = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalUsers: 2450,
      activeUsers: 1850,
      studyHours: 12500,
      completionRate: 78.5,
      engagement: 85.2
    },
    trends: {
      userGrowth: '+12.5%',
      engagement: '+8.3%',
      retention: '+15.2%',
      performance: '+6.7%'
    },
    reports: [
      {
        id: '1',
        name: 'Student Engagement Report',
        type: 'Engagement',
        lastGenerated: '2024-01-15',
        status: 'ready',
        size: '2.3 MB'
      },
      {
        id: '2',
        name: 'Learning Progress Analytics',
        type: 'Progress',
        lastGenerated: '2024-01-14',
        status: 'generating',
        size: '1.8 MB'
      },
      {
        id: '3',
        name: 'Performance Correlation Study',
        type: 'Performance',
        lastGenerated: '2024-01-13',
        status: 'ready',
        size: '3.1 MB'
      }
    ]
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
          <p className="text-muted-foreground">Comprehensive insights and detailed reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{analyticsData.overview.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
                <Badge variant="secondary" className="text-xs mt-1">
                  {analyticsData.trends.userGrowth}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{analyticsData.overview.activeUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
                <Badge variant="secondary" className="text-xs mt-1">
                  {analyticsData.trends.engagement}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{analyticsData.overview.studyHours.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Study Hours</div>
                <Badge variant="secondary" className="text-xs mt-1">
                  This month
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{analyticsData.overview.completionRate}%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
                <Badge variant="secondary" className="text-xs mt-1">
                  {analyticsData.trends.performance}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <div>
                <div className="text-2xl font-bold">{analyticsData.overview.engagement}%</div>
                <div className="text-sm text-muted-foreground">Engagement</div>
                <Badge variant="secondary" className="text-xs mt-1">
                  {analyticsData.trends.retention}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Detailed Analytics</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                {selectedTimeRange}
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardTitle>
          <CardDescription>Deep insights into platform usage and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="engagement" className="space-y-4">
            <TabsList>
              <TabsTrigger value="engagement">User Engagement</TabsTrigger>
              <TabsTrigger value="learning">Learning Analytics</TabsTrigger>
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
              <TabsTrigger value="retention">Retention Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="engagement" className="space-y-4">
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">User Engagement Charts</p>
                  <p className="text-sm text-muted-foreground">Session duration, page views, feature usage</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-4">
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Learning Progress Analytics</p>
                  <p className="text-sm text-muted-foreground">Concept mastery, study patterns, completion rates</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Performance Metrics</p>
                  <p className="text-sm text-muted-foreground">Test scores, improvement trends, weak areas</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="retention" className="space-y-4">
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Retention Analysis</p>
                  <p className="text-sm text-muted-foreground">User retention, churn analysis, loyalty metrics</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Reports Management */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>Download and manage automated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.type} • Generated on {report.lastGenerated} • {report.size}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={report.status === 'ready' ? 'default' : 'secondary'}
                  >
                    {report.status}
                  </Badge>
                  {report.status === 'ready' && (
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReporting;
