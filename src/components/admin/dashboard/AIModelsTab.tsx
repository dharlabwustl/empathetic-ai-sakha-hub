
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Brain, Cpu, Zap, Settings, Activity, AlertCircle, CheckCircle, BarChart3, User, FileText, Calendar, Heart, Play, Pause, RotateCcw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AIModel {
  id: string;
  name: string;
  type: 'classification' | 'content-generation' | 'planning' | 'emotion-analysis' | 'adaptive-learning';
  status: 'active' | 'inactive' | 'training' | 'error';
  version: string;
  accuracy: number;
  requestsToday: number;
  avgResponseTime: number;
  lastUpdated: string;
  description: string;
  flaskEndpoint: string;
  deploymentStatus: 'deployed' | 'deploying' | 'failed';
}

const AIModelsTab: React.FC = () => {
  const { toast } = useToast();
  const [models, setModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'User Classification Engine',
      type: 'classification',
      status: 'active',
      version: 'v2.1.0',
      accuracy: 94.5,
      requestsToday: 1247,
      avgResponseTime: 1.2,
      lastUpdated: '2024-01-15',
      description: 'Classifies users based on learning style, preferences, and behavior patterns',
      flaskEndpoint: '/api/ai/classify-user',
      deploymentStatus: 'deployed'
    },
    {
      id: '2',
      name: 'Content Generation Engine',
      type: 'content-generation',
      status: 'active',
      version: 'v1.8.3',
      accuracy: 89.2,
      requestsToday: 543,
      avgResponseTime: 2.1,
      lastUpdated: '2024-01-14',
      description: 'Generates concept cards, flashcards, exams, and formulas from uploaded resources',
      flaskEndpoint: '/api/ai/generate-content',
      deploymentStatus: 'deployed'
    },
    {
      id: '3',
      name: 'Dynamic Study Planner',
      type: 'planning',
      status: 'active',
      version: 'v3.0.1',
      accuracy: 92.1,
      requestsToday: 2156,
      avgResponseTime: 0.8,
      lastUpdated: '2024-01-15',
      description: 'Creates personalized study plans and daily distributions based on exam and subjects',
      flaskEndpoint: '/api/ai/generate-plan',
      deploymentStatus: 'deployed'
    },
    {
      id: '4',
      name: 'Emotional Analysis Engine',
      type: 'emotion-analysis',
      status: 'active',
      version: 'v1.5.2',
      accuracy: 87.8,
      requestsToday: 890,
      avgResponseTime: 0.5,
      lastUpdated: '2024-01-13',
      description: 'Analyzes tone, content, words, and mood for dynamic plan adjustments',
      flaskEndpoint: '/api/ai/analyze-emotion',
      deploymentStatus: 'deployed'
    },
    {
      id: '5',
      name: 'Adaptive Learning Engine',
      type: 'adaptive-learning',
      status: 'training',
      version: 'v2.0.0',
      accuracy: 91.3,
      requestsToday: 1456,
      avgResponseTime: 1.5,
      lastUpdated: '2024-01-12',
      description: 'Adapts plans based on learning behavior and daily progress patterns',
      flaskEndpoint: '/api/ai/adaptive-learning',
      deploymentStatus: 'deploying'
    }
  ]);

  const toggleModel = (modelId: string) => {
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === modelId
          ? { ...model, status: model.status === 'active' ? 'inactive' : 'active' }
          : model
      )
    );
    
    toast({
      title: "Model Status Updated",
      description: "AI model status has been changed successfully."
    });
  };

  const testModel = async (modelId: string, modelName: string) => {
    toast({
      title: "Testing Model",
      description: `Running accuracy and performance tests for ${modelName}...`
    });

    // Simulate API testing
    setTimeout(() => {
      const testResults = {
        accuracy: Math.random() * 5 + 90, // 90-95%
        responseTime: Math.random() * 1 + 0.5, // 0.5-1.5s
        throughput: Math.floor(Math.random() * 100) + 50 // 50-150 req/min
      };

      toast({
        title: "Test Complete",
        description: `Accuracy: ${testResults.accuracy.toFixed(1)}%, Response: ${testResults.responseTime.toFixed(2)}s`
      });
    }, 3000);
  };

  const retrainModel = (modelId: string, modelName: string) => {
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === modelId
          ? { ...model, status: 'training' }
          : model
      )
    );

    toast({
      title: "Retraining Started",
      description: `${modelName} is being retrained with latest data...`
    });

    // Simulate retraining process
    setTimeout(() => {
      setModels(prevModels =>
        prevModels.map(model =>
          model.id === modelId
            ? { 
                ...model, 
                status: 'active',
                accuracy: Math.random() * 3 + 92,
                version: `v${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9)}.${Math.floor(Math.random() * 9)}`
              }
            : model
        )
      );
      
      toast({
        title: "Retraining Complete",
        description: `${modelName} has been successfully retrained and deployed.`
      });
    }, 8000);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'training': 'bg-yellow-100 text-yellow-800',
      'error': 'bg-red-100 text-red-800',
      'deployed': 'bg-blue-100 text-blue-800',
      'deploying': 'bg-orange-100 text-orange-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      'classification': <User className="h-4 w-4" />,
      'content-generation': <FileText className="h-4 w-4" />,
      'planning': <Calendar className="h-4 w-4" />,
      'emotion-analysis': <Heart className="h-4 w-4" />,
      'adaptive-learning': <Brain className="h-4 w-4" />
    };
    return icons[type] || <Cpu className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.filter(m => m.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Out of {models.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.reduce((sum, m) => sum + m.requestsToday, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Today across all models</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Weighted average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployment Status</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.filter(m => m.deploymentStatus === 'deployed').length}/{models.length}</div>
            <p className="text-xs text-muted-foreground">Models deployed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="testing">Testing Protocols</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Models Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Brain className="mr-2 h-4 w-4" />
                    Train New Model
                  </Button>
                  <Button>
                    <Zap className="mr-2 h-4 w-4" />
                    Deploy Model
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {models.map((model) => (
                  <div key={model.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          {getTypeIcon(model.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{model.name}</h3>
                            <Badge className={getStatusColor(model.status)}>
                              {model.status}
                            </Badge>
                            <Badge className={getStatusColor(model.deploymentStatus)}>
                              {model.deploymentStatus}
                            </Badge>
                            <Badge variant="outline">{model.version}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {model.description}
                          </p>
                          
                          {/* Accuracy Progress Bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-500">Accuracy</span>
                              <span className="text-sm font-medium">{model.accuracy}%</span>
                            </div>
                            <Progress value={model.accuracy} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Requests Today:</span>
                              <span className="font-medium ml-1">{model.requestsToday.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Avg Response:</span>
                              <span className="font-medium ml-1">{model.avgResponseTime}s</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Last Updated:</span>
                              <span className="font-medium ml-1">{model.lastUpdated}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Endpoint:</span>
                              <span className="font-mono text-xs ml-1">{model.flaskEndpoint}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Switch
                          checked={model.status === 'active'}
                          onCheckedChange={() => toggleModel(model.id)}
                          disabled={model.status === 'training'}
                        />
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => testModel(model.id, model.name)}
                            disabled={model.status !== 'active'}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => retrainModel(model.id, model.name)}
                            disabled={model.status === 'training'}
                          >
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testing Protocols & Performance Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Automated Testing</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Daily Accuracy Tests</span>
                        <Badge className="bg-green-100 text-green-800">Running</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Automated tests run every 6 hours to assess model accuracy</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={85} className="flex-1 h-2" />
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Performance Benchmarks</span>
                        <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Response time and throughput testing</p>
                      <div className="mt-2 text-sm">
                        <div>Next run: 2 hours</div>
                        <div>Last avg: 1.2s response time</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Manual Testing</h3>
                  <div className="space-y-3">
                    <Button className="w-full" onClick={() => toast({ title: "Running comprehensive test suite..." })}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Run Full Test Suite
                    </Button>
                    <Button variant="outline" className="w-full">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Validate All Models
                    </Button>
                    <Button variant="outline" className="w-full">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Generate Test Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Deployment & API Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Deployment Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {models.map((model) => (
                      <div key={model.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(model.type)}
                          <span className="font-medium text-sm">{model.name}</span>
                        </div>
                        <Badge className={getStatusColor(model.deploymentStatus)}>
                          {model.deploymentStatus}
                        </Badge>
                        <div className="mt-2 text-xs text-gray-500">
                          <div>Endpoint: {model.flaskEndpoint}</div>
                          <div>Version: {model.version}</div>
                        </div>
                        {model.deploymentStatus === 'deploying' && (
                          <Progress value={65} className="mt-2 h-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">API Endpoints Status</h3>
                  <div className="space-y-2">
                    {models.map((model) => (
                      <div key={model.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <span className="font-mono text-sm">{model.flaskEndpoint}</span>
                          <span className="ml-2 text-xs text-gray-500">({model.name})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={model.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {model.status === 'active' ? 'Online' : 'Offline'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Test API
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModelsTab;
