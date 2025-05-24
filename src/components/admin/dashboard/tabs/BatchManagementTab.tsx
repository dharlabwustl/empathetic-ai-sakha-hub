
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserPlus, 
  Settings, 
  TrendingUp,
  BookOpen,
  Target,
  Calendar,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BatchManagementTab = () => {
  const { toast } = useToast();

  const batches = [
    { 
      name: "JEE Main 2025 Batch A", 
      students: 245, 
      activeStudents: 234, 
      avgProgress: 78, 
      examDate: "2025-04-15",
      performance: "excellent"
    },
    { 
      name: "NEET 2025 Batch B", 
      students: 189, 
      activeStudents: 176, 
      avgProgress: 82, 
      examDate: "2025-05-05",
      performance: "excellent"
    },
    { 
      name: "CAT 2025 Batch C", 
      students: 156, 
      activeStudents: 151, 
      avgProgress: 69, 
      examDate: "2025-11-28",
      performance: "good"
    },
    { 
      name: "GATE 2026 Batch D", 
      students: 98, 
      activeStudents: 92, 
      avgProgress: 71, 
      examDate: "2026-02-14",
      performance: "good"
    }
  ];

  const batchAnalytics = [
    { metric: "Total Batches", value: 24, change: "+3 this month" },
    { metric: "Total Students", value: 2847, change: "+127 this week" },
    { metric: "Avg Attendance", value: "94.2%", change: "+2.1% improvement" },
    { metric: "Completion Rate", value: "87.5%", change: "+5.3% increase" }
  ];

  const handleCreateBatch = () => {
    toast({
      title: "Creating New Batch",
      description: "Setting up new batch configuration...",
      variant: "default"
    });
  };

  const getPerformanceBadge = (performance: string) => {
    const variants = {
      excellent: "bg-green-100 text-green-800",
      good: "bg-blue-100 text-blue-800",
      average: "bg-yellow-100 text-yellow-800",
      poor: "bg-red-100 text-red-800"
    };
    return variants[performance as keyof typeof variants] || variants.average;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Batch Management</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage student groups, track progress, and coordinate exam preparation
          </p>
        </div>
        <Button 
          onClick={handleCreateBatch}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Create Batch
        </Button>
      </div>

      {/* Batch Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {batchAnalytics.map((analytic, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-muted-foreground" />
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytic.value}</div>
              <p className="text-sm text-muted-foreground mb-1">{analytic.metric}</p>
              <p className="text-xs text-green-600">{analytic.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Batches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Active Batches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {batches.map((batch, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{batch.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Exam Date: {new Date(batch.examDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPerformanceBadge(batch.performance)}>
                      {batch.performance}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{batch.students}</div>
                    <div className="text-xs text-muted-foreground">Total Students</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{batch.activeStudents}</div>
                    <div className="text-xs text-muted-foreground">Active Students</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{batch.avgProgress}%</div>
                    <div className="text-xs text-muted-foreground">Avg Progress</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">
                      {Math.ceil((new Date(batch.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-xs text-muted-foreground">Days to Exam</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Batch Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Batch Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Study Plan Adherence</div>
                  <div className="text-2xl font-bold text-green-600">89.2%</div>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Mock Test Performance</div>
                  <div className="text-2xl font-bold text-blue-600">76.4%</div>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Concept Mastery</div>
                  <div className="text-2xl font-bold text-purple-600">82.7%</div>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100">JEE Main Mock Test</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">March 15, 2025</div>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    21 days
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-green-900 dark:text-green-100">NEET Practice Exam</div>
                    <div className="text-sm text-green-700 dark:text-green-300">March 25, 2025</div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    31 days
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-purple-900 dark:text-purple-100">CAT Sectional Test</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">April 5, 2025</div>
                  </div>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">
                    42 days
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BatchManagementTab;
