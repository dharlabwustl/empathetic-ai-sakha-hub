
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Brain, 
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExamReadinessTab = () => {
  const { toast } = useToast();

  const readinessScores = [
    { examType: "JEE Main", avgScore: 87.3, studentsReady: 189, totalStudents: 245, improvement: "+5.2%" },
    { examType: "NEET", avgScore: 82.1, studentsReady: 156, totalStudents: 189, improvement: "+3.8%" },
    { examType: "CAT", avgScore: 79.4, studentsReady: 124, totalStudents: 156, improvement: "+7.1%" },
    { examType: "GATE", avgScore: 84.6, studentsReady: 78, totalStudents: 98, improvement: "+4.3%" }
  ];

  const readinessFactors = [
    { factor: "Concept Mastery", score: 85.2, status: "good" },
    { factor: "Practice Test Performance", score: 78.9, status: "average" },
    { factor: "Time Management", score: 71.4, status: "needs_improvement" },
    { factor: "Subject Balance", score: 88.7, status: "excellent" },
    { factor: "Stress Management", score: 76.3, status: "average" },
    { factor: "Revision Completion", score: 82.1, status: "good" }
  ];

  const criticalAreas = [
    { area: "Physics - Thermodynamics", studentsStruggling: 156, averageScore: 62.3, priority: "high" },
    { area: "Mathematics - Calculus", studentsStruggling: 123, averageScore: 68.7, priority: "medium" },
    { area: "Chemistry - Organic", studentsStruggling: 189, averageScore: 59.1, priority: "high" },
    { area: "Biology - Genetics", studentsStruggling: 98, averageScore: 71.2, priority: "medium" }
  ];

  const handleGenerateReadinessReport = () => {
    toast({
      title: "Generating Report",
      description: "Creating comprehensive exam readiness report...",
      variant: "default"
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: "text-green-600",
      good: "text-blue-600",
      average: "text-yellow-600",
      needs_improvement: "text-red-600"
    };
    return colors[status as keyof typeof colors] || colors.average;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      excellent: CheckCircle,
      good: CheckCircle,
      average: AlertTriangle,
      needs_improvement: AlertTriangle
    };
    const Icon = icons[status as keyof typeof icons] || AlertTriangle;
    const color = status === 'excellent' || status === 'good' ? 'text-green-500' : 
                  status === 'average' ? 'text-yellow-500' : 'text-red-500';
    return <Icon className={`h-4 w-4 ${color}`} />;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Exam Readiness Assessment</h2>
          <p className="text-gray-500 dark:text-gray-400">
            AI-powered readiness tracking and performance prediction for upcoming exams
          </p>
        </div>
        <Button 
          onClick={handleGenerateReadinessReport}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
        >
          <Target className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Exam Readiness Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Exam Readiness by Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {readinessScores.map((exam, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{exam.examType}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exam.studentsReady} of {exam.totalStudents} students ready
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-orange-100 text-orange-800">
                      {exam.improvement}
                    </Badge>
                    <div className="text-2xl font-bold text-orange-600">{exam.avgScore}%</div>
                  </div>
                </div>
                <Progress value={exam.avgScore} className="h-2" />
                <div className="mt-2 text-sm text-muted-foreground">
                  Readiness Rate: {Math.round((exam.studentsReady / exam.totalStudents) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Readiness Factors Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Readiness Factors Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {readinessFactors.map((factor, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{factor.factor}</span>
                  {getStatusIcon(factor.status)}
                </div>
                <div className={`text-xl font-bold ${getStatusColor(factor.status)} mb-1`}>
                  {factor.score}%
                </div>
                <Progress value={factor.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Areas Need Attention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Critical Areas Needing Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criticalAreas.map((area, index) => (
              <div key={index} className="p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-red-900 dark:text-red-100">{area.area}</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {area.studentsStruggling} students struggling • Avg Score: {area.averageScore}%
                    </p>
                  </div>
                  <Badge className={getPriorityBadge(area.priority)}>
                    {area.priority} priority
                  </Badge>
                </div>
                <div className="mt-2">
                  <Progress value={area.averageScore} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Readiness Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Immediate Actions</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                • Focus on Thermodynamics revision<br/>
                • Increase practice test frequency<br/>
                • Implement time management strategies
              </div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="font-semibold text-green-900 dark:text-green-100 mb-1">Strengths to Leverage</div>
              <div className="text-sm text-green-700 dark:text-green-300">
                • Strong subject balance maintenance<br/>
                • Excellent concept understanding<br/>
                • Good revision completion rate
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Readiness Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">87.3%</div>
                <div className="text-sm text-muted-foreground">Overall Readiness Score</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">547</div>
                  <div className="text-xs text-muted-foreground">Students Exam Ready</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">23</div>
                  <div className="text-xs text-muted-foreground">Days Avg to Readiness</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">92%</div>
                  <div className="text-xs text-muted-foreground">Predicted Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">78</div>
                  <div className="text-xs text-muted-foreground">Avg Expected Score</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamReadinessTab;
