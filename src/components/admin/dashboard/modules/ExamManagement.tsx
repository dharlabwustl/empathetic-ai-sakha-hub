
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Target, Brain, TrendingUp, Plus, Filter } from 'lucide-react';

const ExamManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="exams">Exam Bank</TabsTrigger>
          <TabsTrigger value="ai-generation">AI Generation</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,750</div>
                <p className="text-xs text-muted-foreground">+15.2% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Generated</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,890</div>
                <p className="text-xs text-muted-foreground">90.2% of total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">74.3%</div>
                <p className="text-xs text-muted-foreground">+2.1% improvement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.7%</div>
                <p className="text-xs text-muted-foreground">High engagement</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exam Categories Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">3,420</div>
                  <div className="text-sm text-muted-foreground">Practice Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2,890</div>
                  <div className="text-sm text-muted-foreground">Mock Exams</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">1,760</div>
                  <div className="text-sm text-muted-foreground">Chapter Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">680</div>
                  <div className="text-sm text-muted-foreground">Full Length</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Exam Bank Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Exam
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>Comprehensive exam management with creation, editing, and analytics tools.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-generation">
          <Card>
            <CardHeader>
              <CardTitle>AI Exam Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>AI-powered exam creation with customizable parameters and difficulty levels.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Exam Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed analytics on exam performance, difficulty analysis, and student outcomes.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamManagement;
