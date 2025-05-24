
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, TrendingUp, Users, BookOpen, Brain, 
  Target, Clock, Award, Download, Filter, Calendar,
  Activity, PieChart, LineChart, Eye
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface StudentEngagement {
  id: string;
  name: string;
  email: string;
  loginCount: number;
  studyHours: number;
  conceptsCompleted: number;
  testsCompleted: number;
  averageScore: number;
  lastActivity: string;
  engagementLevel: 'high' | 'medium' | 'low';
}

interface SubjectPerformance {
  subject: string;
  totalStudents: number;
  averageScore: number;
  completionRate: number;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface PerformanceMetric {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

const AnalyticsReporting: React.FC = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState('7d');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const [studentEngagement] = useState<StudentEngagement[]>([
    {
      id: '1',
      name: 'Arjun Kumar',
      email: 'arjun@example.com',
      loginCount: 45,
      studyHours: 128,
      conceptsCompleted: 89,
      testsCompleted: 23,
      averageScore: 87,
      lastActivity: '2024-01-16T10:30:00Z',
      engagementLevel: 'high'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      loginCount: 32,
      studyHours: 96,
      conceptsCompleted: 67,
      testsCompleted: 18,
      averageScore: 82,
      lastActivity: '2024-01-16T08:15:00Z',
      engagementLevel: 'high'
    },
    {
      id: '3',
      name: 'Rohit Singh',
      email: 'rohit@example.com',
      loginCount: 18,
      studyHours: 45,
      conceptsCompleted: 34,
      testsCompleted: 9,
      averageScore: 74,
      lastActivity: '2024-01-15T16:20:00Z',
      engagementLevel: 'medium'
    },
    {
      id: '4',
      name: 'Ananya Patel',
      email: 'ananya@example.com',
      loginCount: 8,
      studyHours: 22,
      conceptsCompleted: 15,
      testsCompleted: 4,
      averageScore: 68,
      lastActivity: '2024-01-14T14:10:00Z',
      engagementLevel: 'low'
    }
  ]);

  const [subjectPerformance] = useState<SubjectPerformance[]>([
    {
      subject: 'Physics',
      totalStudents: 1247,
      averageScore: 78,
      completionRate: 85,
      timeSpent: 45.2,
      difficulty: 'hard'
    },
    {
      subject: 'Chemistry',
      totalStudents: 1156,
      averageScore: 82,
      completionRate: 89,
      timeSpent: 42.8,
      difficulty: 'medium'
    },
    {
      subject: 'Mathematics',
      totalStudents: 1398,
      averageScore: 75,
      completionRate: 82,
      timeSpent: 48.5,
      difficulty: 'hard'
    },
    {
      subject: 'Biology',
      totalStudents: 987,
      averageScore: 85,
      completionRate: 92,
      timeSpent: 38.7,
      difficulty: 'medium'
    }
  ]);

  const [performanceMetrics] = useState<PerformanceMetric[]>([
    {
      metric: 'Active Users',
      value: 2456,
      change: 12.5,
      trend: 'up',
      period: 'Last 7 days'
    },
    {
      metric: 'Study Sessions',
      value: 8934,
      change: 8.3,
      trend: 'up',
      period: 'Last 7 days'
    },
    {
      metric: 'Average Session Time',
      value: 34.5,
      change: -2.1,
      trend: 'down',
      period: 'Minutes'
    },
    {
      metric: 'Completion Rate',
      value: 87.2,
      change: 5.4,
      trend: 'up',
      period: 'Percentage'
    },
    {
      metric: 'Test Scores',
      value: 79.8,
      change: 3.2,
      trend: 'up',
      period: 'Average'
    },
    {
      metric: 'Retention Rate',
      value: 92.1,
      change: 1.8,
      trend: 'up',
      period: '30-day'
    }
  ]);

  const generateReport = (reportType: string) => {
    toast({
      title: "Generating Report",
      description: `Creating ${reportType} report with current filters...`
    });

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: `${reportType} report has been generated and is ready for download.`
      });
    }, 2000);
  };

  const getEngagementColor = (level: string) => {
    const colors: Record<string, string> = {
      'high': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      'easy': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'hard': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
        <div className="flex flex-wrap gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">All Subjects</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="mathematics">Mathematics</option>
            <option value="biology">Biology</option>
          </select>
          <Button variant="outline" onClick={() => generateReport('Comprehensive')}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              {getTrendIcon(metric.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span>{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagement">Student Engagement</TabsTrigger>
          <TabsTrigger value="performance">Subject Performance</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="reports">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Student Engagement Analytics</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => generateReport('Engagement')}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentEngagement.map((student) => (
                  <div key={student.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{student.name}</h3>
                            <Badge className={getEngagementColor(student.engagementLevel)}>
                              {student.engagementLevel} engagement
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-gray-500">Study Hours:</span>
                              <span className="font-medium ml-1">{student.studyHours}h</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Concepts:</span>
                              <span className="font-medium ml-1">{student.conceptsCompleted}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Tests:</span>
                              <span className="font-medium ml-1">{student.testsCompleted}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Avg Score:</span>
                              <span className="font-medium ml-1">{student.averageScore}%</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Email: {student.email}</span>
                            <span>Logins: {student.loginCount}</span>
                            <span>Last Active: {new Date(student.lastActivity).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjectPerformance.map((subject) => (
                  <div key={subject.subject} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{subject.subject}</h3>
                      <Badge className={getDifficultyColor(subject.difficulty)}>
                        {subject.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Average Score</span>
                          <span className="font-medium">{subject.averageScore}%</span>
                        </div>
                        <Progress value={subject.averageScore} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completion Rate</span>
                          <span className="font-medium">{subject.completionRate}%</span>
                        </div>
                        <Progress value={subject.completionRate} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Students:</span>
                          <span className="font-medium ml-1">{subject.totalStudents.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Avg Time:</span>
                          <span className="font-medium ml-1">{subject.timeSpent}h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking & Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Learning Progress Trends</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Concept Mastery</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold">78.5%</div>
                      <div className="text-xs text-green-600">+5.2% from last week</div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Test Performance</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold">82.1%</div>
                      <div className="text-xs text-green-600">+3.8% from last week</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Study Habits Analysis</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Daily Active Time</span>
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold">2.4h</div>
                      <div className="text-xs text-blue-600">Optimal range</div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Consistency Score</span>
                        <Award className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold">89%</div>
                      <div className="text-xs text-purple-600">Excellent</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">AI Personalization Impact</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Adaptation Success</span>
                        <Brain className="h-4 w-4 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold">91.2%</div>
                      <div className="text-xs text-orange-600">Highly effective</div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Learning Efficiency</span>
                        <Target className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold">+34%</div>
                      <div className="text-xs text-green-600">vs traditional methods</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports & Data Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Quick Reports</h3>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline" onClick={() => generateReport('Student Performance')}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Student Performance Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => generateReport('Engagement')}>
                      <Activity className="mr-2 h-4 w-4" />
                      Engagement Analytics
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => generateReport('Subject Breakdown')}>
                      <PieChart className="mr-2 h-4 w-4" />
                      Subject Performance
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => generateReport('Learning Trends')}>
                      <LineChart className="mr-2 h-4 w-4" />
                      Learning Trends
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Custom Analytics</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <h4 className="font-medium mb-2">Time Period Analysis</h4>
                      <select className="w-full p-2 border rounded text-sm">
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                        <option>Last 6 months</option>
                        <option>Last year</option>
                      </select>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <h4 className="font-medium mb-2">Student Segments</h4>
                      <select className="w-full p-2 border rounded text-sm">
                        <option>All Students</option>
                        <option>High Performers</option>
                        <option>At Risk Students</option>
                        <option>New Students</option>
                      </select>
                    </div>
                    
                    <Button className="w-full">Generate Custom Report</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Data Export Options</h3>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export to CSV
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export to PDF
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export to Excel
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Report
                    </Button>
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

export default AnalyticsReporting;
