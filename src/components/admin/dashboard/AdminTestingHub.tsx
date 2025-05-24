
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
  TestTube, 
  Brain, 
  Zap, 
  BarChart3, 
  Play, 
  Pause, 
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Database,
  Heart,
  BookOpen,
  Target
} from 'lucide-react';

interface TestResult {
  id: string;
  modelName: string;
  testType: string;
  accuracy: number;
  latency: number;
  status: 'passed' | 'failed' | 'running' | 'pending';
  timestamp: Date;
  details?: string;
}

interface AIModel {
  id: string;
  name: string;
  type: 'mood-analysis' | 'content-generation' | 'performance-prediction' | 'surrounding-analysis';
  version: string;
  status: 'active' | 'testing' | 'disabled';
  accuracy: number;
  latency: number;
  lastTested: Date;
}

const AdminTestingHub = () => {
  const { toast } = useToast();
  const [activeTests, setActiveTests] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: '1',
      modelName: 'Mood Analysis v2.1',
      testType: 'Accuracy Test',
      accuracy: 94.2,
      latency: 120,
      status: 'passed',
      timestamp: new Date(),
      details: 'All test cases passed with high accuracy'
    },
    {
      id: '2',
      modelName: 'Content Generation v3.0',
      testType: 'Quality Test',
      accuracy: 91.8,
      latency: 250,
      status: 'passed',
      timestamp: new Date(),
      details: 'Generated content meets quality standards'
    },
    {
      id: '3',
      modelName: 'Surrounding Analysis v1.5',
      testType: 'Performance Test',
      accuracy: 87.5,
      latency: 180,
      status: 'failed',
      timestamp: new Date(),
      details: 'Performance below threshold in noise detection'
    }
  ]);

  const [aiModels] = useState<AIModel[]>([
    {
      id: 'mood-v2',
      name: 'Mood Analysis',
      type: 'mood-analysis',
      version: 'v2.1',
      status: 'active',
      accuracy: 94.2,
      latency: 120,
      lastTested: new Date()
    },
    {
      id: 'content-v3',
      name: 'Content Generation',
      type: 'content-generation',
      version: 'v3.0',
      status: 'active',
      accuracy: 91.8,
      latency: 250,
      lastTested: new Date()
    },
    {
      id: 'performance-v2',
      name: 'Performance Prediction',
      type: 'performance-prediction',
      version: 'v2.0',
      status: 'active',
      accuracy: 89.3,
      latency: 180,
      lastTested: new Date()
    },
    {
      id: 'surrounding-v1',
      name: 'Surrounding Analysis',
      type: 'surrounding-analysis',
      version: 'v1.5',
      status: 'testing',
      accuracy: 87.5,
      latency: 200,
      lastTested: new Date()
    }
  ]);

  const runModelTest = (modelId: string, testType: string) => {
    setActiveTests(prev => [...prev, modelId]);
    
    toast({
      title: "Starting Test",
      description: `Running ${testType} for model ${modelId}`,
    });

    // Simulate test execution
    setTimeout(() => {
      const newResult: TestResult = {
        id: Date.now().toString(),
        modelName: aiModels.find(m => m.id === modelId)?.name || 'Unknown',
        testType,
        accuracy: 85 + Math.random() * 15,
        latency: 100 + Math.random() * 200,
        status: Math.random() > 0.2 ? 'passed' : 'failed',
        timestamp: new Date(),
        details: `Test completed with ${Math.random() > 0.5 ? 'excellent' : 'good'} results`
      };

      setTestResults(prev => [newResult, ...prev]);
      setActiveTests(prev => prev.filter(id => id !== modelId));
      
      toast({
        title: "Test Complete",
        description: `${testType} finished with ${newResult.status} status`,
        variant: newResult.status === 'passed' ? 'default' : 'destructive'
      });
    }, 3000);
  };

  const runBulkTests = () => {
    aiModels.forEach(model => {
      runModelTest(model.id, 'Comprehensive Test');
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'mood-analysis': return <Heart className="h-4 w-4" />;
      case 'content-generation': return <BookOpen className="h-4 w-4" />;
      case 'performance-prediction': return <Target className="h-4 w-4" />;
      case 'surrounding-analysis': return <BarChart3 className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Testing Hub</h2>
          <p className="text-muted-foreground">Test and monitor AI model performance</p>
        </div>
        <Button onClick={runBulkTests} className="gap-2">
          <TestTube className="h-4 w-4" />
          Run All Tests
        </Button>
      </div>

      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="performance">Performance Monitor</TabsTrigger>
          <TabsTrigger value="custom">Custom Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <div className="grid gap-4">
            {aiModels.map((model) => (
              <Card key={model.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        {getModelIcon(model.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{model.version}</p>
                      </div>
                    </div>
                    <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                      {model.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{model.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{model.latency}ms</div>
                      <div className="text-sm text-muted-foreground">Latency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{model.lastTested.toLocaleDateString()}</div>
                      <div className="text-sm text-muted-foreground">Last Tested</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => runModelTest(model.id, 'Accuracy Test')}
                      disabled={activeTests.includes(model.id)}
                    >
                      {activeTests.includes(model.id) ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      Accuracy Test
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => runModelTest(model.id, 'Performance Test')}
                      disabled={activeTests.includes(model.id)}
                    >
                      Performance Test
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => runModelTest(model.id, 'Load Test')}
                      disabled={activeTests.includes(model.id)}
                    >
                      Load Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="space-y-4">
            {testResults.map((result) => (
              <Card key={result.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <h3 className="font-medium">{result.modelName}</h3>
                        <p className="text-sm text-muted-foreground">{result.testType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{result.timestamp.toLocaleString()}</div>
                      <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <div className="font-semibold">{result.accuracy.toFixed(1)}%</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Latency</span>
                      <div className="font-semibold">{result.latency}ms</div>
                    </div>
                  </div>
                  
                  {result.details && (
                    <p className="text-sm text-muted-foreground mt-2">{result.details}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">91.2%</div>
                    <div className="text-sm text-muted-foreground">Average Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">187ms</div>
                    <div className="text-sm text-muted-foreground">Average Latency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">99.8%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">24</div>
                    <div className="text-sm text-muted-foreground">Tests Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiModels.map((model) => (
                    <div key={model.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{model.name}</span>
                        <span className="text-sm text-muted-foreground">{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Test Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Test Input</label>
                <Textarea placeholder="Enter test data or scenario..." className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Expected Output</label>
                <Textarea placeholder="Enter expected results..." className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Test Parameters</label>
                <Input placeholder="Additional parameters (JSON format)" className="mt-1" />
              </div>
              <Button className="gap-2">
                <Play className="h-4 w-4" />
                Run Custom Test
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTestingHub;
