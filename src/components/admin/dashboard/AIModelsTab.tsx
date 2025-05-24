
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Zap, 
  Settings, 
  BarChart3, 
  RefreshCw, 
  Play, 
  Pause,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  type: 'content-generation' | 'sentiment-analysis' | 'performance-prediction' | 'behavioral-analysis' | 'planning-algorithm' | 'spaced-repetition';
  version: string;
  status: 'active' | 'training' | 'testing' | 'inactive';
  accuracy: number;
  latency: number;
  lastTrained: string;
  usage: {
    requests: number;
    successRate: number;
    avgResponseTime: number;
  };
  features: string[];
}

const AIModelsTab = () => {
  const { toast } = useToast();
  const [models, setModels] = useState<AIModel[]>([
    {
      id: 'content-gen-v3',
      name: 'Content Generation Model',
      type: 'content-generation',
      version: 'v3.2.1',
      status: 'active',
      accuracy: 94.2,
      latency: 1.8,
      lastTrained: '2024-01-15',
      usage: { requests: 15680, successRate: 96.8, avgResponseTime: 1.65 },
      features: ['Concept Cards', 'Flashcards', 'Exam Questions', 'Interactive Content']
    },
    {
      id: 'sentiment-v2',
      name: 'Mood Analysis Model',
      type: 'sentiment-analysis',
      version: 'v2.1.0',
      status: 'active',
      accuracy: 89.7,
      latency: 0.8,
      lastTrained: '2024-01-12',
      usage: { requests: 8950, successRate: 94.2, avgResponseTime: 0.74 },
      features: ['Mood Tracking', 'Study Recommendations', 'Emotional Analysis']
    },
    {
      id: 'performance-pred-v2',
      name: 'Performance Prediction',
      type: 'performance-prediction',
      version: 'v2.0.3',
      status: 'active',
      accuracy: 91.5,
      latency: 2.1,
      lastTrained: '2024-01-10',
      usage: { requests: 5670, successRate: 93.1, avgResponseTime: 1.95 },
      features: ['Exam Readiness Score', 'Performance Analytics', 'Success Prediction']
    },
    {
      id: 'behavioral-v1',
      name: 'Surrounding Influences Model',
      type: 'behavioral-analysis',
      version: 'v1.3.2',
      status: 'active',
      accuracy: 86.3,
      latency: 1.4,
      lastTrained: '2024-01-08',
      usage: { requests: 4280, successRate: 91.7, avgResponseTime: 1.32 },
      features: ['Environment Analysis', 'Peer Influence', 'Study Conditions']
    },
    {
      id: 'planning-v3',
      name: 'Study Plan Algorithm',
      type: 'planning-algorithm',
      version: 'v3.1.0',
      status: 'active',
      accuracy: 92.8,
      latency: 2.5,
      lastTrained: '2024-01-14',
      usage: { requests: 7890, successRate: 95.4, avgResponseTime: 2.31 },
      features: ['Personalized Plans', 'Schedule Optimization', 'Goal Tracking']
    },
    {
      id: 'spaced-rep-v2',
      name: 'Spaced Repetition Engine',
      type: 'spaced-repetition',
      version: 'v2.0.1',
      status: 'training',
      accuracy: 88.9,
      latency: 0.6,
      lastTrained: '2024-01-16',
      usage: { requests: 12400, successRate: 97.2, avgResponseTime: 0.58 },
      features: ['Flashcard Scheduling', 'Memory Optimization', 'Retention Analysis']
    }
  ]);

  const [testingModel, setTestingModel] = useState<string | null>(null);

  const handleTestModel = async (modelId: string) => {
    setTestingModel(modelId);
    const model = models.find(m => m.id === modelId);
    
    toast({
      title: "Testing AI Model",
      description: `Running comprehensive tests for ${model?.name}`,
    });

    // Simulate testing process
    setTimeout(() => {
      setTestingModel(null);
      toast({
        title: "Test Complete",
        description: `${model?.name} passed all tests with ${Math.floor(Math.random() * 5) + 90}% accuracy`,
        variant: "default"
      });
    }, 3000);
  };

  const handleRetrainModel = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    
    setModels(prev => prev.map(m => 
      m.id === modelId 
        ? { ...m, status: 'training' as const }
        : m
    ));

    toast({
      title: "Retraining Started",
      description: `${model?.name} retraining process has been initiated`,
    });

    // Simulate retraining
    setTimeout(() => {
      setModels(prev => prev.map(m => 
        m.id === modelId 
          ? { 
              ...m, 
              status: 'active' as const,
              accuracy: Math.min(100, m.accuracy + Math.random() * 3),
              lastTrained: new Date().toISOString().split('T')[0]
            }
          : m
      ));
      
      toast({
        title: "Retraining Complete",
        description: `${model?.name} has been successfully retrained`,
      });
    }, 5000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'training': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'testing': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'inactive': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'training': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'testing': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'inactive': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Models Management</h2>
          <p className="text-muted-foreground">Monitor and manage all AI models powering student features</p>
        </div>
        <Button className="gap-2">
          <Brain className="h-4 w-4" />
          Deploy New Model
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="testing">Testing Hub</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Brain className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Version {model.version}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(model.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(model.status)}
                          {model.status}
                        </div>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                      <div className="text-xl font-bold text-green-600">{model.accuracy}%</div>
                      <Progress value={model.accuracy} className="mt-1 h-1" />
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Latency</div>
                      <div className="text-xl font-bold text-blue-600">{model.latency}s</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Requests</div>
                      <div className="text-xl font-bold text-purple-600">{model.usage.requests.toLocaleString()}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                      <div className="text-xl font-bold text-amber-600">{model.usage.successRate}%</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Connected Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {model.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTestModel(model.id)}
                      disabled={testingModel === model.id}
                      className="gap-1"
                    >
                      {testingModel === model.id ? (
                        <>
                          <RefreshCw className="h-3 w-3 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3" />
                          Test Model
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRetrainModel(model.id)}
                      disabled={model.status === 'training'}
                      className="gap-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Retrain
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Settings className="h-3 w-3" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <BarChart3 className="h-3 w-3" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Average Accuracy</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">90.6%</div>
                    <Progress value={90.6} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">Across all models</p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Average Latency</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">1.5s</div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">Target: &lt;2s</p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Total Requests</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-2">54.8K</div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">This month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {models.map((model) => (
                <Card key={model.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{model.name} Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Accuracy Trend</div>
                        <div className="text-lg font-semibold text-green-600">+2.3%</div>
                        <div className="text-xs text-muted-foreground">vs last month</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Response Time</div>
                        <div className="text-lg font-semibold text-blue-600">{model.usage.avgResponseTime}s</div>
                        <div className="text-xs text-muted-foreground">avg response</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Error Rate</div>
                        <div className="text-lg font-semibold text-red-600">{(100 - model.usage.successRate).toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">failure rate</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Usage Growth</div>
                        <div className="text-lg font-semibold text-purple-600">+15.2%</div>
                        <div className="text-xs text-muted-foreground">this week</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="testing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Testing Hub</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Run comprehensive tests on AI models to validate accuracy and performance
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {models.map((model) => (
                    <div key={model.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{model.name}</h4>
                          <p className="text-sm text-muted-foreground">Version {model.version}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleTestModel(model.id)}
                            disabled={testingModel === model.id}
                            className="gap-1"
                          >
                            {testingModel === model.id ? (
                              <>
                                <RefreshCw className="h-3 w-3 animate-spin" />
                                Testing...
                              </>
                            ) : (
                              <>
                                <Play className="h-3 w-3" />
                                Run Test Suite
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Last Test:</span>
                          <div className="font-medium">{model.lastTrained}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current Accuracy:</span>
                          <div className="font-medium">{model.accuracy}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <Badge className={`ml-2 ${getStatusColor(model.status)}`}>
                            {model.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="configuration">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Configuration</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure AI model parameters and settings
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {models.map((model) => (
                    <div key={model.id} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">{model.name} Configuration</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Model Version</label>
                          <Input value={model.version} readOnly />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Target Accuracy (%)</label>
                          <Input type="number" defaultValue={model.accuracy} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Max Latency (seconds)</label>
                          <Input type="number" step="0.1" defaultValue={model.latency} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Training Data Source</label>
                          <Input defaultValue="Production Dataset" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="text-sm font-medium mb-2 block">Model Description</label>
                        <Textarea 
                          placeholder="Enter model description and notes..."
                          className="min-h-[80px]"
                        />
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          Save Configuration
                        </Button>
                        <Button size="sm" variant="outline">
                          Reset to Default
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModelsTab;
