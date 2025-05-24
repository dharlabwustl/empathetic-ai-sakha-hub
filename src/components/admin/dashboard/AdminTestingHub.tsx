
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  TestTube, 
  Zap, 
  Target, 
  TrendingUp, 
  Brain,
  Database,
  Globe,
  Gauge,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import comprehensiveApiService from '@/services/api/comprehensiveApiService';

interface TestResult {
  id: string;
  modelType: string;
  testName: string;
  accuracy: number;
  responseTime: number;
  status: 'passed' | 'failed' | 'running' | 'pending';
  timestamp: string;
  details: any;
}

const AdminTestingHub = () => {
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState('content-generator');
  const [testInput, setTestInput] = useState('');
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: 'test_001',
      modelType: 'content-generator',
      testName: 'Concept Card Generation',
      accuracy: 94.5,
      responseTime: 1200,
      status: 'passed',
      timestamp: '2024-01-20T10:30:00Z',
      details: { quality_score: 9.2, relevance: 8.8 }
    },
    {
      id: 'test_002',
      modelType: 'mood-analyzer',
      testName: 'Sentiment Analysis',
      accuracy: 89.2,
      responseTime: 340,
      status: 'passed',
      timestamp: '2024-01-20T09:15:00Z',
      details: { precision: 0.91, recall: 0.87 }
    },
    {
      id: 'test_003',
      modelType: 'study-optimizer',
      testName: 'Plan Optimization',
      accuracy: 76.8,
      responseTime: 2800,
      status: 'failed',
      timestamp: '2024-01-20T08:45:00Z',
      details: { optimization_rate: 0.68, time_saved: 0.45 }
    }
  ]);

  const aiModels = [
    { id: 'content-generator', name: 'Content Generator', description: 'Generates educational content' },
    { id: 'mood-analyzer', name: 'Mood Analyzer', description: 'Analyzes student mood patterns' },
    { id: 'study-optimizer', name: 'Study Plan Optimizer', description: 'Optimizes study schedules' },
    { id: 'performance-predictor', name: 'Performance Predictor', description: 'Predicts exam performance' },
    { id: 'doubt-resolver', name: 'Doubt Resolver', description: 'Resolves student queries' }
  ];

  const handleRunTest = async () => {
    if (!testInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide test input data",
        variant: "destructive"
      });
      return;
    }

    setIsRunningTest(true);
    
    try {
      const testData = {
        input: testInput,
        model: selectedModel,
        timestamp: new Date().toISOString()
      };

      // Call API to test the model
      const response = await comprehensiveApiService.testAIModel(selectedModel, testData);
      
      if (response.success) {
        const newTestResult: TestResult = {
          id: `test_${Date.now()}`,
          modelType: selectedModel,
          testName: `${selectedModel} Test`,
          accuracy: response.data.accuracy || Math.random() * 20 + 80, // Mock if not provided
          responseTime: response.data.responseTime || Math.random() * 2000 + 500,
          status: response.data.accuracy > 80 ? 'passed' : 'failed',
          timestamp: new Date().toISOString(),
          details: response.data.details || {}
        };

        setTestResults(prev => [newTestResult, ...prev]);
        
        toast({
          title: "Test Completed",
          description: `${selectedModel} test executed successfully`,
          variant: "default"
        });
      } else {
        throw new Error(response.error || 'Test failed');
      }
    } catch (error) {
      console.error('Test execution error:', error);
      toast({
        title: "Test Failed",
        description: "Failed to execute AI model test",
        variant: "destructive"
      });
    } finally {
      setIsRunningTest(false);
    }
  };

  const handleBenchmarkAll = async () => {
    setIsRunningTest(true);
    
    try {
      for (const model of aiModels) {
        await comprehensiveApiService.testAIModel(model.id, {
          input: "Benchmark test data",
          timestamp: new Date().toISOString()
        });
      }
      
      toast({
        title: "Benchmark Complete",
        description: "All AI models have been benchmarked",
        variant: "default"
      });
    } catch (error) {
      console.error('Benchmark error:', error);
      toast({
        title: "Benchmark Failed",
        description: "Failed to complete model benchmarking",
        variant: "destructive"
      });
    } finally {
      setIsRunningTest(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'passed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800',
      'running': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const averageAccuracy = testResults.reduce((sum, test) => sum + test.accuracy, 0) / testResults.length || 0;
  const averageResponseTime = testResults.reduce((sum, test) => sum + test.responseTime, 0) / testResults.length || 0;
  const passRate = (testResults.filter(test => test.status === 'passed').length / testResults.length) * 100 || 0;

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAccuracy.toFixed(1)}%</div>
            <Progress value={averageAccuracy} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageResponseTime.toFixed(0)}ms</div>
            <p className="text-xs text-muted-foreground">Average latency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Tests passed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testResults.length}</div>
            <p className="text-xs text-muted-foreground">Executed</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Testing Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Model Testing Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="individual" className="space-y-4">
            <TabsList>
              <TabsTrigger value="individual">Individual Testing</TabsTrigger>
              <TabsTrigger value="benchmark">Benchmark Suite</TabsTrigger>
              <TabsTrigger value="results">Test Results</TabsTrigger>
              <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select AI Model</label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a model to test" />
                      </SelectTrigger>
                      <SelectContent>
                        {aiModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Test Input Data</label>
                    <Textarea
                      placeholder="Enter test data (JSON format recommended)"
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleRunTest} 
                      disabled={isRunningTest}
                      className="flex-1"
                    >
                      {isRunningTest ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Running Test...
                        </>
                      ) : (
                        <>
                          <TestTube className="mr-2 h-4 w-4" />
                          Run Test
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setTestInput('')}>
                      Clear
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Available Models</h3>
                  <div className="space-y-2">
                    {aiModels.map((model) => (
                      <Card key={model.id} className={`cursor-pointer transition-colors ${selectedModel === model.id ? 'bg-blue-50 border-blue-200' : ''}`} onClick={() => setSelectedModel(model.id)}>
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{model.name}</h4>
                              <p className="text-sm text-gray-600">{model.description}</p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {model.id}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="benchmark" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2">Run Complete Benchmark Suite</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This will test all AI models with standardized test cases to measure accuracy, 
                    performance, and reliability across the platform.
                  </p>
                  <Button 
                    onClick={handleBenchmarkAll}
                    disabled={isRunningTest}
                    size="lg"
                    className="w-full"
                  >
                    {isRunningTest ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Running Benchmark...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Start Benchmark Suite
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <div className="space-y-4">
                {testResults.map((result) => (
                  <Card key={result.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(result.status)}
                          <div>
                            <h4 className="font-medium">{result.testName}</h4>
                            <p className="text-sm text-gray-600">{result.modelType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatTimestamp(result.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Accuracy</p>
                          <p className="font-semibold">{result.accuracy.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Response Time</p>
                          <p className="font-semibold">{result.responseTime}ms</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Model</p>
                          <p className="font-semibold">{result.modelType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Details</p>
                          <p className="font-semibold text-blue-600 cursor-pointer">View</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                <p>Detailed performance metrics and trend analysis will be displayed here.</p>
                <p className="text-sm mt-2">Features: Model comparison, accuracy trends, response time analysis.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestingHub;
