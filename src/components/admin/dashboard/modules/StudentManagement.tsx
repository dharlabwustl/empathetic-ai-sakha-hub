import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Search, Filter, UserPlus, MoreHorizontal, 
  Calendar, Target, TrendingUp, Activity, Mail, Phone 
} from 'lucide-react';

const StudentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock student data
  const students = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      examGoal: 'NEET 2025',
      enrollmentDate: '2024-01-15',
      status: 'active',
      progress: 78,
      studyStreak: 15,
      lastActive: '2 hours ago',
      subscription: 'Pro',
      mood: 'motivated'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      examGoal: 'JEE Main 2025',
      enrollmentDate: '2024-02-10',
      status: 'active',
      progress: 85,
      studyStreak: 22,
      lastActive: '1 hour ago',
      subscription: 'Premium',
      mood: 'confident'
    },
    // Add more mock students...
  ];

  const onboardingData = [
    {
      step: 'Profile Setup',
      completed: 1420,
      total: 1500,
      percentage: 94.7
    },
    {
      step: 'Exam Goal Selection',
      completed: 1380,
      total: 1500,
      percentage: 92.0
    },
    {
      step: 'Study Plan Creation',
      completed: 1350,
      total: 1500,
      percentage: 90.0
    },
    {
      step: 'First Study Session',
      completed: 1250,
      total: 1500,
      percentage: 83.3
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Student List</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding Data</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="journey">User Journey</TabsTrigger>
          <TabsTrigger value="behavior">AI Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Student Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,420</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,340</div>
                <p className="text-xs text-muted-foreground">80.1% engagement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72.3%</div>
                <p className="text-xs text-muted-foreground">+5.2% improvement</p>
              </CardContent>
            </Card>
          </div>

          {/* Exam Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Exam Goal Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8,420</div>
                  <div className="text-sm text-muted-foreground">NEET</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4,230</div>
                  <div className="text-sm text-muted-foreground">JEE Main</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2,100</div>
                  <div className="text-sm text-muted-foreground">JEE Advanced</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">670</div>
                  <div className="text-sm text-muted-foreground">Others</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>

          {/* Students Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Student</th>
                      <th className="text-left p-4">Exam Goal</th>
                      <th className="text-left p-4">Progress</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Last Active</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{student.examGoal}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-sm">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant={student.status === 'active' ? 'default' : 'secondary'}
                          >
                            {student.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {student.lastActive}
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-6">
          <OnboardingDataViewer />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Student Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Comprehensive student analytics and reporting will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey">
          <Card>
            <CardHeader>
              <CardTitle>User Journey Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed user journey visualization and analysis tools.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentManagement;
