
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  UserPlus, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Users,
  Brain,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentJourneyTab = () => {
  const { toast } = useToast();

  const journeyStages = [
    { stage: "Signup", completed: 2847, conversion: 100, icon: UserPlus, status: "active" },
    { stage: "Onboarding", completed: 2485, conversion: 87.3, icon: Users, status: "active" },
    { stage: "Goal Setting", completed: 2341, conversion: 82.2, icon: Target, status: "active" },
    { stage: "Study Plan Creation", completed: 2198, conversion: 77.2, icon: BookOpen, status: "active" },
    { stage: "Active Learning", completed: 1956, conversion: 68.7, icon: Brain, status: "active" },
    { stage: "Exam Ready", completed: 1623, conversion: 57.0, icon: TrendingUp, status: "success" }
  ];

  const onboardingInsights = [
    { metric: "Average Onboarding Time", value: "12.4 min", trend: "-2.3%" },
    { metric: "Personality Test Completion", value: "94.2%", trend: "+1.8%" },
    { metric: "Subject Selection Rate", value: "89.7%", trend: "+0.5%" },
    { metric: "Study Plan Acceptance", value: "91.3%", trend: "+3.2%" }
  ];

  const aiGeneratedPlans = [
    { examGoal: "JEE Main", plansGenerated: 234, avgReadiness: "82.3%", adaptationRate: "94.2%" },
    { examGoal: "NEET", plansGenerated: 189, avgReadiness: "79.8%", adaptationRate: "91.7%" },
    { examGoal: "CAT", plansGenerated: 156, avgReadiness: "86.1%", adaptationRate: "96.3%" },
    { examGoal: "GATE", plansGenerated: 98, avgReadiness: "88.7%", adaptationRate: "93.8%" }
  ];

  const handleOptimizeJourney = () => {
    toast({
      title: "Journey Optimization",
      description: "Connecting to AI optimization service...",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Student Journey Management</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Complete pipeline from signup to exam readiness with AI-driven personalization
          </p>
        </div>
        <Button 
          onClick={handleOptimizeJourney}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Brain className="h-4 w-4 mr-2" />
          Optimize Journey
        </Button>
      </div>

      {/* Journey Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Student Journey Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {journeyStages.map((stage, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  stage.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                }`}>
                  <stage.icon className={`h-5 w-5 ${
                    stage.status === 'success' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{stage.stage}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        {stage.completed.toLocaleString()} students
                      </span>
                      <Badge variant={stage.conversion >= 80 ? "default" : "secondary"}>
                        {stage.conversion.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={stage.conversion} className="h-2" />
                </div>
                {index < journeyStages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {onboardingInsights.map((insight, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="font-medium">{insight.metric}</div>
                    <div className="text-2xl font-bold text-blue-600">{insight.value}</div>
                  </div>
                  <Badge variant={insight.trend.startsWith('+') ? "default" : "secondary"}>
                    {insight.trend}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Study Plan Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiGeneratedPlans.map((plan, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{plan.examGoal}</span>
                    <Badge variant="outline">{plan.plansGenerated} plans</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Avg Readiness:</span>
                      <div className="font-semibold text-green-600">{plan.avgReadiness}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Adaptation Rate:</span>
                      <div className="font-semibold text-blue-600">{plan.adaptationRate}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Journey Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Journey Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-muted-foreground">New Signups (Last Hour)</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-muted-foreground">Onboarding Completions</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-muted-foreground">Study Plans Generated</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">89</div>
              <div className="text-sm text-muted-foreground">Active Learning Sessions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentJourneyTab;
