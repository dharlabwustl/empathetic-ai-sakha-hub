
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Target, 
  BookOpen,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  PieChart,
  LineChart,
  Activity,
  Award,
  Eye,
  Heart
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AnalyticsData {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

interface StudentEngagement {
  userId: string;
  userName: string;
  studyHours: number;
  completionRate: number;
  streak: number;
  lastActive: string;
  mood: string;
}

const AnalyticsReportingTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const keyMetrics: AnalyticsData[] = [
    {
      metric: 'Total Active Users',
      value: 12547,
      change: 8.2,
      trend: 'up',
      period: 'vs last week'
    },
    {
      metric: 'Study Hours Completed',
      value: 45672,
      change: 12.5,
      trend: 'up',
      period: 'vs last week'
    },
    {
      metric: 'Content Completion Rate',
      value: 84.3,
      change: -2.1,
      trend: 'down',
      period: 'vs last week'
    },
    {
      metric: 'Average Session Duration',
      value: 28.5,
      change: 5.8,
      trend: 'up',
      period: 'vs last week'
    }
  ];

  const engagementData: StudentEngagement[] = [
    {
      userId: '1',
      userName: 'Aryan Sharma',
      studyHours: 45.5,
      completionRate: 92,
      streak: 12,
      lastActive: '2 hours ago',
      mood: 'Motivated'
    },
    {
      userId: '2',
      userName: 'Priya Patel',
      studyHours: 38.2,
      completionRate: 88,
      streak: 8,
      lastActive: '30 minutes ago',
      mood: 'Focused'
    },
    {
      userId: '3',
      userName: 'Vikram Singh',
      studyHours: 52.1,
      completionRate: 95,
      streak: 15,
      lastActive: '1 hour ago',
      mood: 'Happy'
    },
    {
      userId: '4',
      userName: 'Ananya Gupta',
      studyHours: 41.8,
      completionRate: 87,
      streak: 10,
      lastActive: '3 hours ago',
      mood: 'Tired'
    },
    {
      userId: '5',
      userName: 'Rohit Kumar',
      studyHours: 47.3,
      completionRate: 91,
      streak: 14,
      lastActive: '45 minutes ago',
      mood: 'Curious'
    }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', averageScore: 78.5, completion: 84, students: 2341 },
    { subject: 'Physics', averageScore: 74.2, completion: 79, students: 1987 },
    { subject: 'Chemistry', averageScore: 81.3, completion: 88, students: 2156 },
    { subject: 'Biology', averageScore: 85.1, completion: 92, students: 1654 },
    { subject: 'English', averageScore: 79.8, completion: 86, students: 2789 }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3" />;
      case 'down': return <TrendingUp className="h-3 w-3 rotate-180" />;
      default: return <span className="h-3 w-3" />;
    }
  };

  const generateReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `${type} report has been generated and will be downloaded shortly.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              <div className={getTrendColor(metric.trend)}>
                {getTrendIcon(metric.trend)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.metric.includes('Rate') || metric.metric.includes('Duration') 
                  ? `${metric.value}${metric.metric.includes('Rate') ? '%' : ' min'}`
                  : metric.value.toLocaleString()
                }
              </div>
              <p className={`text-xs ${getTrendColor(metric.trend)}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}% {metric.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagement">Student Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports & Insights</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Student Engagement Analytics</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementData.map((student) => (
                  <div key={student.userId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{student.userName}</h3>
                        <p className="text-sm text-gray-500">Last active: {student.lastActive}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{student.mood}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {student.streak} day streak
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Study Hours</div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{student.studyHours}h</span>
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Completion Rate</div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{student.completionRate}%</span>
                          <Progress value={student.completionRate} className="w-16 h-2" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Performance</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Award key={i} className={`h-3 w-3 ${i < Math.floor(student.completionRate / 20) ? 'text-yellow-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{subject.subject}</span>
                        <div className="text-right">
                          <div className="font-semibold">{subject.averageScore}%</div>
                          <div className="text-xs text-gray-500">{subject.students} students</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={subject.completion} className="flex-1" />
                        <span className="text-sm text-gray-500">{subject.completion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Peak Study Hours</span>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Most active between 7-9 PM (34% of daily activity)</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Preferred Learning Style</span>
                      <Eye className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Visual learners: 45%, Auditory: 30%, Kinesthetic: 25%</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Average Session Length</span>
                      <Activity className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">28.5 minutes with 85% completion rate</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Mood Impact</span>
                      <Heart className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Motivated students perform 23% better than average</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Student Progress Report</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Comprehensive analysis of student learning progress and achievements.</p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => generateReport('Student Progress')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold">Performance Analytics</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Detailed performance metrics across subjects and learning modules.</p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => generateReport('Performance Analytics')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <h3 className="font-semibold">Engagement Trends</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Analysis of user engagement patterns and platform usage trends.</p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => generateReport('Engagement Trends')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-orange-500" />
                    <h3 className="font-semibold">Content Effectiveness</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Evaluation of content performance and learning outcomes.</p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => generateReport('Content Effectiveness')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold">Goal Achievement</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Tracking of student goal setting and achievement rates.</p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => generateReport('Goal Achievement')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-indigo-500" />
                    <h3 className="font-semibold">Custom Report</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Create custom reports with specific date ranges and metrics.</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                    onClick={() => generateReport('Custom')}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Configure Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
                    <span className="text-sm">Active Users</span>
                    <span className="font-bold text-green-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                    <span className="text-sm">Ongoing Sessions</span>
                    <span className="font-bold text-blue-600">856</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded border border-purple-200">
                    <span className="text-sm">Tests in Progress</span>
                    <span className="font-bold text-purple-600">234</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
                    <span className="text-sm">Content Views/hr</span>
                    <span className="font-bold text-orange-600">4,521</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Server Performance</span>
                      <span>98.5%</span>
                    </div>
                    <Progress value={98.5} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Database Response</span>
                      <span>94.2%</span>
                    </div>
                    <Progress value={94.2} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>API Performance</span>
                      <span>96.8%</span>
                    </div>
                    <Progress value={96.8} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Experience Score</span>
                      <span>91.3%</span>
                    </div>
                    <Progress value={91.3} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsReportingTab;
