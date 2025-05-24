
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, Cpu, Activity, Settings, CheckCircle, AlertCircle, 
  PlayCircle, PauseCircle, RotateCcw, BarChart3, Zap
} from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  type: 'classification' | 'generation' | 'analysis' | 'prediction';
  status: 'active' | 'inactive' | 'training' | 'error';
  version: string;
  accuracy: number;
  lastTested: string;
  apiEndpoint: string;
  description: string;
}

const AIModelManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [models, setModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'Learning Style Classifier',
      type: 'classification',
      status: 'active',
      version: 'v2.1.0',
      accuracy: 94.2,
      lastTested: '2024-01-15T10:30:00Z',
      apiEndpoint: '/api/ai/classify-learning-style',
      description: 'Classifies student learning preferences and styles'
    },
    {
      id: '2',
      name: 'Content Generator',
      type: 'generation',
      status: 'active',
      version: 'v1.8.3',
      accuracy: 89.7,
      lastTested: '2024-01-14T15:45:00Z',
      apiEndpoint: '/api/ai/generate-content',
      description: 'Generates educational content from uploaded materials'
    },
    {
      id: '3',
      name: 'Mood Analyzer',
      type: 'analysis',
      status: 'training',
      version: 'v1.5.2',
      accuracy: 87.1,
      lastTested: '2024-01-13T09:15:00Z',
      apiEndpoint: '/api/ai/analyze-mood',
      description: 'Analyzes student emotional state from interactions'
    },
    {
      id: '4',
      name: 'Performance Predictor',
      type: 'prediction',
      status: 'active',
      version: 'v3.0.1',
      accuracy: 91.8,
      lastTested: '2024-01-15T14:20:00Z',
      apiEndpoint: '/api/ai/predict-performance',
      description: 'Predicts student performance based on study patterns'
    }
  ]);

  const handleToggleModel = (modelId: string) => {
    setModels(prev => prev.map(model => {
      if (model.id === modelId) {
        const newStatus = model.status === 'active' ? 'inactive' : 'active';
        toast({
          title: `Model ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
          description: `${model.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
        });
        return { ...model, status: newStatus };
      }
      return model;
    }));
  };

  const handleTestModel = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    toast({
      title: "Testing Model",
      description: `Running accuracy tests for ${model?.name}...`,
    });
    
    // Simulate testing
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: `${model?.name} test completed successfully.`,
      });
    }, 3000);
  };

  const handleRetrainModel = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    setModels(prev => prev.map(m => 
      m.id === modelId ? { ...m, status: 'training' } : m
    ));
    
    toast({
      title: "Retraining Started",
      description: `${model?.name} retraining process initiated.`,
    });
    
    // Simulate retraining
    setTimeout(() => {
      setModels(prev => prev.map(m => 
        m.id === modelId ? { ...m, status: 'active', accuracy: m.accuracy + Math.random() * 2 } : m
      ));
      toast({
        title: "Retraining Complete",
        description: `${model?.name} has been successfully retrained.`,
      });
    }, 8000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'classification': return <CheckCircle className="h-4 w-4" />;
      case 'generation': return <Zap className="h-4 w-4" />;
      case 'analysis': return <BarChart3 className="h-4 w-4" />;
      case 'prediction': return <Activity className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Models</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.length}</div>
            <p className="text-xs text-muted-foreground">AI models deployed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {models.filter(m => m.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Model performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Models in Training</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {models.filter(m => m.status === 'training').length}
            </div>
            <p className="text-xs text-muted-foreground">Being updated</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">Model Management</TabsTrigger>
          <TabsTrigger value="testing">Testing Protocols</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Model Management</CardTitle>
                <Button>
                  <Brain className="mr-2 h-4 w-4" />
                  Deploy New Model
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Last Tested</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {models.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-sm text-gray-500">{model.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(model.type)}
                          <span className="capitalize">{model.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{model.version}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={model.accuracy > 90 ? 'text-green-600' : model.accuracy > 80 ? 'text-yellow-600' : 'text-red-600'}>
                            {model.accuracy.toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(model.lastTested).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Switch
                            checked={model.status === 'active'}
                            onCheckedChange={() => handleToggleModel(model.id)}
                            disabled={model.status === 'training'}
                          />
                          <Button size="sm" variant="outline" onClick={() => handleTestModel(model.id)}>
                            <PlayCircle className="h-3 w-3 mr-1" />
                            Test
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRetrainModel(model.id)}>
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Retrain
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testing Protocols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Accuracy Testing</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Regular accuracy assessments using validation datasets
                    </p>
                    <Button size="sm" variant="outline">
                      Run Accuracy Tests
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Performance Testing</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Monitor response times and resource usage
                    </p>
                    <Button size="sm" variant="outline">
                      Run Performance Tests
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Load Testing</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Test model behavior under high request volumes
                    </p>
                    <Button size="sm" variant="outline">
                      Run Load Tests
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">A/B Testing</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Compare model versions for performance improvements
                    </p>
                    <Button size="sm" variant="outline">
                      Setup A/B Test
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
              <CardTitle>Model Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">API Endpoints</h3>
                  <div className="space-y-2">
                    {models.map((model) => (
                      <div key={model.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-mono text-sm">{model.apiEndpoint}</span>
                          <Badge className={getStatusColor(model.status)} size="sm" className="ml-2">
                            {model.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          View Docs
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Deployment Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Auto-scaling enabled</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Health monitoring</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Error logging</span>
                      <Switch defaultChecked />
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
