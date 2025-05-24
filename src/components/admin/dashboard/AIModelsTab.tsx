
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Cpu, Zap, Settings, Activity, AlertCircle, CheckCircle, BarChart3, User, FileText, Calendar, Heart } from 'lucide-react';

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
}

const AIModelsTab: React.FC = () => {
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
      flaskEndpoint: '/api/ai/classify-user'
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
      flaskEndpoint: '/api/ai/generate-content'
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
      flaskEndpoint: '/api/ai/generate-plan'
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
      flaskEndpoint: '/api/ai/analyze-emotion'
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
      flaskEndpoint: '/api/ai/adaptive-learning'
    }
  ]);

  const contentFormats = [
    { type: 'text', name: 'Text-based Content', count: 2543, active: true },
    { type: 'visual', name: 'Visual Content', count: 1234, active: true },
    { type: 'diagrams', name: 'Diagrams', count: 876, active: true },
    { type: 'interactive', name: 'Interactive Visualizations', count: 456, active: false },
    { type: '3d', name: '3D Models', count: 234, active: true },
    { type: 'video', name: 'Video Content', count: 345, active: true }
  ];

  const flaskIntegration = [
    { endpoint: '/api/ai/classify-user', status: 'active', lastCall: '2 min ago', avgTime: '1.2s' },
    { endpoint: '/api/ai/generate-content', status: 'active', lastCall: '5 min ago', avgTime: '2.1s' },
    { endpoint: '/api/ai/generate-plan', status: 'active', lastCall: '1 min ago', avgTime: '0.8s' },
    { endpoint: '/api/ai/analyze-emotion', status: 'active', lastCall: '3 min ago', avgTime: '0.5s' },
    { endpoint: '/api/ai/adaptive-learning', status: 'degraded', lastCall: '10 min ago', avgTime: '1.5s' }
  ];

  const toggleModel = (modelId: string) => {
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === modelId
          ? { ...model, status: model.status === 'active' ? 'inactive' : 'active' }
          : model
      )
    );
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'training': 'bg-yellow-100 text-yellow-800',
      'error': 'bg-red-100 text-red-800',
      'degraded': 'bg-orange-100 text-orange-800'
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
            <CardTitle className="text-sm font-medium">Content Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2k</div>
            <p className="text-xs text-muted-foreground">Items this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="content">Content Generation</TabsTrigger>
          <TabsTrigger value="planning">Study Planning</TabsTrigger>
          <TabsTrigger value="flask">Flask Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Models Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">Train New Model</Button>
                  <Button>Deploy Model</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {models.map((model) => (
                  <div key={model.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
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
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {model.description}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Accuracy:</span>
                              <span className="font-medium ml-1">{model.accuracy}%</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Requests:</span>
                              <span className="font-medium ml-1">{model.requestsToday.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Response:</span>
                              <span className="font-medium ml-1">{model.avgResponseTime}s</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Endpoint:</span>
                              <span className="font-mono text-xs ml-1">{model.flaskEndpoint}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={model.status === 'active'}
                          onCheckedChange={() => toggleModel(model.id)}
                          disabled={model.status === 'training'}
                        />
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Generation Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contentFormats.map((format, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{format.name}</h3>
                      <Badge className={format.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {format.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">{format.count.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Generated this month</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Planning & Adaptation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Dynamic Plan Generation</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Exam-based Plans</span>
                      <Badge className="bg-blue-100 text-blue-800">2,543 active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Subject-linked Plans</span>
                      <Badge className="bg-blue-100 text-blue-800">1,847 active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Daily Distributions</span>
                      <Badge className="bg-green-100 text-green-800">98.2% accuracy</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Adaptive Learning</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Behavior Analysis</span>
                      <Badge className="bg-purple-100 text-purple-800">Real-time</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Progress Tracking</span>
                      <Badge className="bg-green-100 text-green-800">Daily updates</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>Mood-based Adaptation</span>
                      <Badge className="bg-orange-100 text-orange-800">Hourly</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flask" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flask API Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaskIntegration.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm">{endpoint.endpoint}</span>
                          <Badge className={getStatusColor(endpoint.status)}>
                            {endpoint.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Last Call: {endpoint.lastCall}</span>
                          <span>Avg Time: {endpoint.avgTime}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Test Endpoint
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModelsTab;
