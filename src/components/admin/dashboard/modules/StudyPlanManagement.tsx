
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, Target, Brain, TrendingUp, Users, BookOpen, 
  Clock, CheckCircle, AlertCircle, Settings, Filter
} from 'lucide-react';

const StudyPlanManagement: React.FC = () => {
  const studyPlanStats = {
    totalPlans: 12450,
    activePlans: 9340,
    completionRate: 78.2,
    avgDuration: 180, // days
    aiGenerated: 11890,
    customized: 560
  };

  const planTemplates = [
    {
      id: 'neet-intensive',
      name: 'NEET Intensive Plan',
      duration: '365 days',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      difficulty: 'Advanced',
      usage: 4230,
      successRate: 82.5
    },
    {
      id: 'jee-main-standard',
      name: 'JEE Main Standard',
      duration: '300 days',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      difficulty: 'Intermediate',
      usage: 3180,
      successRate: 79.3
    },
    {
      id: 'jee-advanced-elite',
      name: 'JEE Advanced Elite',
      duration: '400 days',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      difficulty: 'Expert',
      usage: 1840,
      successRate: 84.7
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Study Plans</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ai-config">AI Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Study Plan Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Study Plans</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studyPlanStats.totalPlans.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studyPlanStats.activePlans.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">75.1% of total plans</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studyPlanStats.completionRate}%</div>
                <p className="text-xs text-muted-foreground">+3.4% improvement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Generated</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studyPlanStats.aiGenerated.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">95.5% of all plans</p>
              </CardContent>
            </Card>
          </div>

          {/* Plan Templates Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Plan Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{template.duration}</span>
                        <span>{template.subjects.join(', ')}</span>
                        <Badge variant="outline">{template.difficulty}</Badge>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-medium">{template.successRate}% success rate</div>
                      <div className="text-sm text-muted-foreground">{template.usage.toLocaleString()} students</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plan Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution by Exam</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>NEET</span>
                    <span className="font-medium">67.8%</span>
                  </div>
                  <Progress value={67.8} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>JEE Main</span>
                    <span className="font-medium">23.4%</span>
                  </div>
                  <Progress value={23.4} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>JEE Advanced</span>
                    <span className="font-medium">6.9%</span>
                  </div>
                  <Progress value={6.9} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>Others</span>
                    <span className="font-medium">1.9%</span>
                  </div>
                  <Progress value={1.9} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adaptive Learning Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Plans Auto-Adjusted</span>
                    <span className="font-bold">8,420</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Difficulty Adaptations</span>
                    <span className="font-bold">5,230</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pace Modifications</span>
                    <span className="font-bold">3,890</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Content Recommendations</span>
                    <span className="font-bold">12,560</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Study Plans</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Create Plan
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>Detailed list of all study plans with management capabilities.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Plan Templates Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage and create study plan templates for different exams and goals.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Study Plan Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Comprehensive analytics on study plan performance and effectiveness.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-config">
          <Card>
            <CardHeader>
              <CardTitle>AI Study Plan Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure AI parameters for study plan generation and adaptation.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyPlanManagement;
