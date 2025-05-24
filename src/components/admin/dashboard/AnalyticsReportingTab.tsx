
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, TrendingUp, Users, Clock, Eye, Download, 
  Calendar, Target, BookOpen, Brain
} from 'lucide-react';

interface AnalyticsData {
  metric: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

const AnalyticsReportingTab: React.FC = () => {
  const { toast } = useToast();
  
  const [engagementData] = useState<AnalyticsData[]>([
    { metric: 'Daily Active Users', value: '2,847', change: '+12.5%', trend: 'up' },
    { metric: 'Session Duration', value: '24m 33s', change: '+8.2%', trend: 'up' },
    { metric: 'Content Interactions', value: '15,234', change: '+18.7%', trend: 'up' },
    { metric: 'Study Sessions', value: '8,456', change: '+5.4%', trend: 'up' },
  ]);

  const [progressData] = useState<AnalyticsData[]>([
    { metric: 'Avg Completion Rate', value: '78.5%', change: '+3.2%', trend: 'up' },
    { metric: 'Study Plan Adherence', value: '82.1%', change: '+1.8%', trend: 'up' },
    { metric: 'Assessment Scores', value: '84.3%', change: '+2.1%', trend: 'up' },
    { metric: 'Goal Achievement', value: '71.2%', change: '-1.5%', trend: 'down' },
  ]);

  const [performanceData] = useState<AnalyticsData[]>([
    { metric: 'API Response Time', value: '245ms', change: '-12.3%', trend: 'up' },
    { metric: 'Page Load Speed', value: '1.8s', change: '-8.7%', trend: 'up' },
    { metric: 'Error Rate', value: '0.12%', change: '-45.2%', trend: 'up' },
    { metric: 'Uptime', value: '99.9%', change: '+0.1%', trend: 'up' },
  ]);

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "Generating Report",
      description: `Creating ${reportType} report. This may take a few moments.`,
    });
    
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: `${reportType} report has been generated and is ready for download.`,
      });
    }, 3000);
  };

  const handleExportData = (dataType: string) => {
    toast({
      title: "Exporting Data",
      description: `Exporting ${dataType} data to CSV format.`,
    });
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-3 w-3 text-green-600" /> : 
      <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,845</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,672</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234,567</div>
            <p className="text-xs text-muted-foreground">+22.1% increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% improvement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagement">Student Engagement</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="performance">System Performance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Engagement Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {engagementData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.metric}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell className={getTrendColor(item.trend)}>
                        {item.change}
                      </TableCell>
                      <TableCell>
                        {getTrendIcon(item.trend)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 flex gap-4">
                <Button onClick={() => handleExportData('engagement')}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline" onClick={() => handleGenerateReport('Engagement')}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {progressData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.metric}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell className={getTrendColor(item.trend)}>
                        {item.change}
                      </TableCell>
                      <TableCell>
                        {getTrendIcon(item.trend)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Subject Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Mathematics</span>
                      <span className="text-green-600">87.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Physics</span>
                      <span className="text-green-600">82.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chemistry</span>
                      <span className="text-yellow-600">78.5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Study Patterns</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Morning Study</span>
                      <span>45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Evening Study</span>
                      <span>35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Night Study</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Learning Methods</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Visual Learning</span>
                      <span>42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Practice Tests</span>
                      <span>38%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Video Content</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.metric}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell className={getTrendColor(item.trend)}>
                        {item.change}
                      </TableCell>
                      <TableCell>
                        {getTrendIcon(item.trend)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Automated Reports</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleGenerateReport('Daily Summary')}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Daily Summary Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleGenerateReport('Weekly Performance')}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Weekly Performance Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleGenerateReport('Monthly Analytics')}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Monthly Analytics Report
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Custom Reports</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleGenerateReport('Student Progress')}
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Student Progress Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleGenerateReport('Content Usage')}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Content Usage Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleGenerateReport('AI Performance')}
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      AI Performance Report
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Report Scheduling</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Set up automated report generation and delivery
                </p>
                <Button size="sm">
                  Configure Schedules
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsReportingTab;
