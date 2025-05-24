
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Target, BookOpen, Users, TrendingUp, Plus, Settings, Download } from 'lucide-react';

const StudyPlanManagementTab: React.FC = () => {
  const studyPlanStats = {
    totalPlans: 3456,
    activePlans: 3211,
    completionRate: 78.5,
    averageProgress: 64.2,
    adaptivePlans: 2567
  };

  const planTemplates = [
    { id: '1', name: 'JEE Main Preparation', exam: 'JEE Main', duration: '6 months', students: 1234, completion: 82 },
    { id: '2', name: 'NEET Biology Focus', exam: 'NEET', duration: '4 months', students: 987, completion: 76 },
    { id: '3', name: 'Class 12 Physics', exam: 'Board Exam', duration: '8 months', students: 567, completion: 89 },
    { id: '4', name: 'JEE Advanced Prep', exam: 'JEE Advanced', duration: '1 year', students: 345, completion: 71 }
  ];

  const recentPlanUpdates = [
    { id: '1', student: 'John Doe', planName: 'JEE Main Prep', action: 'Auto-adjusted', reason: 'Mood: Stressed', timestamp: '5 min ago' },
    { id: '2', student: 'Jane Smith', planName: 'NEET Biology', action: 'Completed Module', reason: 'Organic Chemistry', timestamp: '12 min ago' },
    { id: '3', student: 'Mike Johnson', planName: 'Class 12 Physics', action: 'Extended Deadline', reason: 'Slow Progress', timestamp: '25 min ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Study Plan Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyPlanStats.totalPlans.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All study plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyPlanStats.activePlans.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyPlanStats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Average completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyPlanStats.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">Current progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adaptive Plans</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyPlanStats.adaptivePlans.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">AI-adaptive plans</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Plan Templates</TabsTrigger>
          <TabsTrigger value="active">Active Plans</TabsTrigger>
          <TabsTrigger value="analytics">Plan Analytics</TabsTrigger>
          <TabsTrigger value="real-time">Real-time Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Study Plan Templates</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Students Using</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {planTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>{template.exam}</TableCell>
                      <TableCell>{template.duration}</TableCell>
                      <TableCell>{template.students.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{template.completion}%</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Clone
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="real-time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Plan Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPlanUpdates.map((update) => (
                  <div key={update.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{update.student}</span>
                          <Badge variant="outline">{update.action}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Plan: {update.planName} • Reason: {update.reason}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {update.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyPlanManagementTab;
