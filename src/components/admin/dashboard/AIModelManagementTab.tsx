
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Cpu, 
  Zap, 
  Settings, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  BarChart3, 
  User, 
  FileText, 
  Calendar, 
  Heart,
  Play,
  Pause,
  RefreshCw,
  Database,
  TestTube
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AIModel {
  id: string;
  name: string;
  type: 'classification' | 'content-generation' | 'planning' | 'emotion-analysis' | 'adaptive-learning';
  status: 'active' | 'inactive' | 'training' | 'testing' | 'error';
  version: string;
  accuracy: number;
  requestsToday: number;
  avgResponseTime: number;
  lastUpdated: string;
  description: string;
  endpoint: string;
  testsPassed: number;
  totalTests: number;
}

const AIModelManagementTab: React.FC = () => {
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
      endpoint: '/api/ai/classify-user',
      testsPassed: 48,
      totalTests: 50
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
      endpoint: '/api/ai/generate-content',
      testsPassed: 45,
      totalTests: 50
    },
    {
      id: '3',
      name: 'Dynamic Study Planner',
      type: 'planning',
      status: 'testing',
      version: 'v3.0.1',
      accuracy: 92.1,
      requestsToday: 2156,
      avgResponseTime: 0.8,
      lastUpdated: '2024-01-15',
      description: 'Creates personalized study plans and daily distributions based on exam and subjects',
      endpoint: '/api/ai/generate-plan',
      testsPassed: 42,
      totalTests: 50
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
      endpoint: '/api/ai/analyze-emotion',
      testsPassed: 47,
      totalTests: 50
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
      endpoint: '/api/ai/adaptive-learning',
      testsPassed: 40,
      totalTests: 50
    }
  ]);

  const handleModelAction = (modelId: string, action: 'toggle' | 'test' | 'retrain' | 'update') => {
    setModels(prevModels =>
      prevModels.map(model => {
        if (model.id === modelId) {
          switch (action) {
            case 'toggle':
              return { 
                ...model, 
                status: model.status === 'active' ? 'inactive' : 'active' 
              };
            case 'test':
              return { 
                ...model, 
                status: 'testing' 
              };
            case 'retrain':
              return { 
                ...model, 
                status: 'training' 
              };
            default:
              return model;
          }
        }
        return model;
      })
    );

    toast({
      title: "Model Action",
      description: `${action === 'toggle' ? 'Status changed' : action === 'test' ? 'Testing started' : 'Retraining initiated'} for model.`,
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'training': 'bg-yellow-100 text-yellow-800',
      'testing': 'bg-blue-100 text-blue-800',
      'error': 'bg-red-100 text-red-800'
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

  const totalRequests = models.reduce((sum, m) => sum + m.requestsToday, 0);
  const avgAccuracy = models.reduce((sum, m) => sum + m.accuracy, 0) / models.length;
  const activeModels = models.filter(m => m.status === 'active').length;

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
            <div className="text-2xl font-bold">{activeModels}</div>
            <p className="text-xs text-muted-foreground">Out of {models.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Today across all models</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAccuracy.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Weighted average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">Model Management</TabsTrigger>
          <TabsTrigger value="testing">Testing Protocols</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Models</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Deploy New Model
                  </Button>
                  <Button>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh All
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
                            <Badge variant="outline">{model.version}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {model.description}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Accuracy:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{model.accuracy}%</span>
                                <Progress value={model.accuracy} className="w-16 h-2" />
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Requests Today:</span>
                              <span className="font-medium ml-1">{model.requestsToday.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Response Time:</span>
                              <span className="font-medium ml-1">{model.avgResponseTime}s</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Tests:</span>
                              <span className="font-medium ml-1">{model.testsPassed}/{model.totalTests}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={model.status === 'active'}
                          onCheckedChange={() => handleModelAction(model.id, 'toggle')}
                          disabled={model.status === 'training' || model.status === 'testing'}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleModelAction(model.id, 'test')}
                        >
                          <TestTube className="h-3 w-3 mr-1" />
                          Test
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleModelAction(model.id, 'retrain')}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Retrain
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
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
              <CardTitle>Testing Protocols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Automated Tests</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Accuracy Validation</span>
                        <Badge className="bg-green-100 text-green-800">Passed</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Response Time Check</span>
                        <Badge className="bg-green-100 text-green-800">Passed</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Load Testing</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Running</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Manual Testing</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Output Quality Review</span>
                        <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>Edge Case Testing</span>
                        <Badge className="bg-green-100 text-green-800">Passed</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>User Acceptance Testing</span>
                        <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    Run Full Test Suite
                  </Button>
                  <Button variant="outline">
                    <TestTube className="h-4 w-4 mr-2" />
                    Custom Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Model Performance Trends</h3>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">Performance charts will be displayed here</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Resource Usage</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Usage</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span>58%</span>
                      </div>
                      <Progress value={58} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>GPU Usage</span>
                        <span>84%</span>
                      </div>
                      <Progress value={84} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} />
                    </div>
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

export default AIModelManagementTab;
