
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Brain, Cpu, Zap, Settings, Activity, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';

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
      name: 'PrepZR AI Tutor',
      type: 'tutor',
      status: 'active',
      version: 'v2.1.0',
      accuracy: 94.5,
      requestsToday: 1247,
      avgResponseTime: 1.2,
      lastUpdated: '2024-01-15',
      description: 'Intelligent tutoring system for personalized learning'
    },
    {
      id: '2',
      name: 'Content Generator',
      type: 'content-generator',
      status: 'active',
      version: 'v1.8.3',
      accuracy: 89.2,
      requestsToday: 543,
      avgResponseTime: 2.1,
      lastUpdated: '2024-01-14',
      description: 'Generates practice questions and study materials'
    },
    {
      id: '3',
      name: 'Assessment Engine',
      type: 'assessment',
      status: 'training',
      version: 'v1.5.2',
      accuracy: 87.8,
      requestsToday: 0,
      avgResponseTime: 0.8,
      lastUpdated: '2024-01-13',
      description: 'Evaluates student performance and provides feedback'
    },
    {
      id: '4',
      name: 'Recommendation System',
      type: 'recommendation',
      status: 'active',
      version: 'v3.0.1',
      accuracy: 92.1,
      requestsToday: 2156,
      avgResponseTime: 0.5,
      lastUpdated: '2024-01-15',
      description: 'Recommends study paths and content based on performance'
    }
  ]);

  const toggleModelStatus = (modelId: string) => {
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
      'error': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      'tutor': <Brain className="h-4 w-4" />,
      'content-generator': <Zap className="h-4 w-4" />,
      'assessment': <BarChart3 className="h-4 w-4" />,
      'recommendation': <Settings className="h-4 w-4" />
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
            <CardTitle className="text-sm font-medium">Total Requests Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.reduce((sum, m) => sum + m.requestsToday, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all models</p>
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
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(models.reduce((sum, m) => sum + m.avgResponseTime, 0) / models.length).toFixed(1)}s</div>
            <p className="text-xs text-muted-foreground">Average across models</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Models Management */}
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
                          <span className="text-gray-500">Requests Today:</span>
                          <span className="font-medium ml-1">{model.requestsToday.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Response Time:</span>
                          <span className="font-medium ml-1">{model.avgResponseTime}s</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Updated:</span>
                          <span className="font-medium ml-1">{model.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={model.status === 'active'}
                      onCheckedChange={() => toggleModelStatus(model.id)}
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

      {/* Model Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Model Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Performance analytics chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <Activity className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Usage statistics chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIModelsTab;
