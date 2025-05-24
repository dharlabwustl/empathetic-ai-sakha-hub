
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Bot, 
  MessageSquare, 
  Settings, 
  Activity,
  AlertCircle,
  CheckCircle,
  Zap,
  TrendingUp,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIModelsTab = () => {
  const { toast } = useToast();

  const aiModels = [
    { name: "Study Plan Generator", status: "active", performance: 96.2, requests: 1420, latency: "120ms" },
    { name: "Content Creator", status: "active", performance: 94.8, requests: 890, latency: "180ms" },
    { name: "Mood Analysis Engine", status: "warning", performance: 89.3, requests: 2340, latency: "95ms" },
    { name: "Voice Assistant", status: "active", performance: 92.7, requests: 560, latency: "140ms" },
    { name: "Exam Generator", status: "active", performance: 97.1, requests: 320, latency: "200ms" },
    { name: "Doubt Resolver", status: "active", performance: 91.4, requests: 780, latency: "160ms" }
  ];

  const getStatusIcon = (status: string) => {
    return status === "active" ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <AlertCircle className="h-4 w-4 text-yellow-500" />;
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "text-green-600" : "text-yellow-600";
  };

  const handleOptimizeModel = (modelName: string) => {
    toast({
      title: "Model Optimization",
      description: `Optimizing ${modelName}...`,
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Models Management</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Monitor and manage all AI models powering the educational platform
        </p>
      </div>

      {/* AI Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiModels.map((model, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                </div>
                {getStatusIcon(model.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span className={`font-semibold ${getStatusColor(model.status)}`}>
                    {model.performance}%
                  </span>
                </div>
                <Progress value={model.performance} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Requests/day:</span>
                  <div className="font-semibold">{model.requests}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Avg Latency:</span>
                  <div className="font-semibold">{model.latency}</div>
                </div>
              </div>
              
              <Button 
                onClick={() => handleOptimizeModel(model.name)}
                size="sm" 
                className="w-full"
                variant="outline"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Model Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-muted-foreground">Active Models</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <div className="text-sm text-muted-foreground">Avg Performance</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">6.3K</div>
              <div className="text-sm text-muted-foreground">Daily Requests</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">149ms</div>
              <div className="text-sm text-muted-foreground">Avg Latency</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelsTab;
