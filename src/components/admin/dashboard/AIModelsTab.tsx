
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Brain, Cpu, Zap, Settings, Activity, AlertCircle, CheckCircle } from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  type: 'tutor' | 'content-generator' | 'assessment' | 'recommendation';
  status: 'active' | 'inactive' | 'training' | 'error';
  version: string;
  accuracy: number;
  requestsToday: number;
  avgResponseTime: number;
  lastUpdated: string;
  description: string;
}

const AIModelsTab: React.FC = () => {
  const [models, setModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'Academic Tutor AI',
      type: 'tutor',
      status: 'active',
      version: 'v2.1.4',
      accuracy: 94.2,
      requestsToday: 1247,
      avgResponseTime: 0.8,
      lastUpdated: '2024-01-15',
      description: 'Advanced AI tutor for personalized learning assistance'
    },
    {
      id: '2', 
      name: 'Content Generator Pro',
      type: 'content-generator',
      status: 'active',
      version: 'v1.8.2',
      accuracy: 89.7,
      requestsToday: 543,
      avgResponseTime: 1.2,
      lastUpdated: '2024-01-14',
      description: 'Generates practice questions and study materials'
    },
    {
      id: '3',
      name: 'Smart Assessment Engine',
      type: 'assessment',
      status: 'training',
      version: 'v3.0.1-beta',
      accuracy: 91.5,
      requestsToday: 0,
      avgResponseTime: 0.6,
      lastUpdated: '2024-01-16',
      description: 'Intelligent assessment and scoring system'
    },
    {
      id: '4',
      name: 'Recommendation System',
      type: 'recommendation',
      status: 'active',
      version: 'v1.5.7',
      accuracy: 87.3,
      requestsToday: 892,
      avgResponseTime: 0.4,
      lastUpdated: '2024-01-13',
      description: 'Personalized study path recommendations'
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800', 
      'training': 'bg-yellow-100 text-yellow-800',
      'error': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      'tutor': <Brain className="h-4 w-4" />,
      'content-generator': <Zap className="h-4 w-4" />,
      'assessment': <CheckCircle className="h-4 w-4" />,
      'recommendation': <Activity className="h-4 w-4" />
    };
    return icons[type] || <Cpu className="h-4 w-4" />;
  };

  const toggleModelStatus = (modelId: string) => {
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === modelId
          ? { ...model, status: model.status === 'active' ? 'inactive' : 'active' }
          : model
      )
    );
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
            <CardTitle className="text-sm font-medium">Total Requests Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.reduce((sum, m) => sum + m.requestsToday, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(models.reduce((sum, m) => sum + m.avgResponseTime, 0) / models.length).toFixed(1)}s
            </div>
            <p className="text-xs text-muted-foreground">Within target range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Above benchmark</p>
          </CardContent>
        </Card>
      </div>

      {/* Models Management */}
      <Card>
        <CardHeader>
          <CardTitle>AI Models Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {models.map((model) => (
              <div key={model.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      {getTypeIcon(model.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{model.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{model.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                        <span className="text-sm text-gray-500">v{model.version}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={model.status === 'active'}
                      onCheckedChange={() => toggleModelStatus(model.id)}
                      disabled={model.status === 'training'}
                    />
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{model.accuracy}%</div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{model.requestsToday.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Requests Today</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{model.avgResponseTime}s</div>
                    <div className="text-xs text-gray-500">Avg Response</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-xl font-bold text-gray-600">{model.lastUpdated}</div>
                    <div className="text-xs text-gray-500">Last Updated</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Model Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <Activity className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Performance charts will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request Volume by Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Request volume charts will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIModelsTab;
