
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target,
  Users,
  Clock,
  Activity,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdvancedAnalyticsTab = () => {
  const { toast } = useToast();

  const predictiveInsights = [
    { 
      prediction: "Student Dropout Risk", 
      accuracy: 94.2, 
      studentsAtRisk: 23, 
      intervention: "Early warning system active" 
    },
    { 
      prediction: "Exam Performance Forecast", 
      accuracy: 87.6, 
      expectedAvgScore: 78.3, 
      intervention: "Adaptive study plans deployed" 
    },
    { 
      prediction: "Learning Pace Optimization", 
      accuracy: 91.8, 
      improvement: "+23%", 
      intervention: "AI-adaptive content delivery" 
    },
    { 
      prediction: "Mood-Performance Correlation", 
      accuracy: 88.4, 
      correlation: "0.73", 
      intervention: "Mood-based plan adjustments" 
    }
  ];

  const learningAnalytics = [
    { metric: "Concept Mastery Speed", value: "15% faster", trend: "up" },
    { metric: "Knowledge Retention", value: "89.2%", trend: "up" },
    { metric: "Study Efficiency", value: "+34% improvement", trend: "up" },
    { metric: "Weak Area Recovery", value: "78% success rate", trend: "up" }
  ];

  const platformInsights = [
    { insight: "Peak Learning Hours", value: "7-9 PM", impact: "35% higher engagement" },
    { insight: "Optimal Session Length", value: "25 minutes", impact: "Best retention rate" },
    { insight: "Preferred Content Type", value: "Visual + Interactive", impact: "42% better comprehension" },
    { insight: "Effective Break Pattern", value: "5min every 25min", impact: "28% less fatigue" }
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Generating Analytics Report",
      description: "Creating comprehensive analytics report...",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Advanced Analytics & Insights</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Predictive analytics, learning behavior insights, and platform optimization data
          </p>
        </div>
        <Button 
          onClick={handleGenerateReport}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictiveInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100">{insight.prediction}</h4>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">
                    {insight.accuracy}% accuracy
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  {insight.studentsAtRisk && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Students at Risk:</span>
                      <span className="font-semibold text-red-600">{insight.studentsAtRisk}</span>
                    </div>
                  )}
                  {insight.expectedAvgScore && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Avg Score:</span>
                      <span className="font-semibold text-green-600">{insight.expectedAvgScore}%</span>
                    </div>
                  )}
                  {insight.improvement && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Improvement:</span>
                      <span className="font-semibold text-blue-600">{insight.improvement}</span>
                    </div>
                  )}
                  {insight.correlation && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Correlation:</span>
                      <span className="font-semibold text-orange-600">{insight.correlation}</span>
                    </div>
                  )}
                  
                  <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded text-xs text-muted-foreground">
                    <strong>Intervention:</strong> {insight.intervention}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Behavior Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Learning Behavior Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningAnalytics.map((analytic, index) => (
              <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-900 dark:text-green-100">{analytic.metric}</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-xl font-bold text-green-600">{analytic.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Optimization Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Platform Optimization Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">{insight.insight}</h4>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Optimized
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Optimal Value:</span>
                    <div className="font-semibold text-yellow-600">{insight.value}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Impact:</span>
                    <div className="font-semibold text-green-600">{insight.impact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Learning Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Active Learning Sessions</div>
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">Concepts Mastered (Today)</div>
                  <div className="text-2xl font-bold text-green-600">3,456</div>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div>
                  <div className="font-semibold">AI Interventions Triggered</div>
                  <div className="text-2xl font-bold text-purple-600">89</div>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">92.3%</div>
                  <div className="text-sm text-muted-foreground">Predicted Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">76.8</div>
                  <div className="text-sm text-muted-foreground">Expected Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">18 days</div>
                  <div className="text-sm text-muted-foreground">Avg Time to Readiness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">94.1%</div>
                  <div className="text-sm text-muted-foreground">Model Accuracy</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsTab;
