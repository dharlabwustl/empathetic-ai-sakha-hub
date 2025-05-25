
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Settings, 
  Zap, 
  TestTube, 
  CheckCircle, 
  XCircle,
  Loader2,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import aiModelService, { AIModelConfig, ContentGenerationRequest } from '@/services/admin/aiModelService';

const AIModelIntegration: React.FC = () => {
  const { toast } = useToast();
  const [models, setModels] = useState<AIModelConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingModel, setTestingModel] = useState<string | null>(null);
  const [generatingContent, setGeneratingContent] = useState(false);

  useEffect(() => {
    loadAIModels();
  }, []);

  const loadAIModels = async () => {
    try {
      const response = await aiModelService.getAIModels();
      if (response.success) {
        setModels(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load AI models",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModelToggle = async (modelId: string, isActive: boolean) => {
    try {
      const response = await aiModelService.updateAIModel(modelId, { isActive });
      if (response.success) {
        setModels(prev => prev.map(model => 
          model.id === modelId ? { ...model, isActive } : model
        ));
        toast({
          title: "Model Updated",
          description: `Model ${isActive ? 'activated' : 'deactivated'} successfully`
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update model status",
        variant: "destructive"
      });
    }
  };

  const handleTestModel = async (modelId: string) => {
    setTestingModel(modelId);
    try {
      const response = await aiModelService.testModelConnection(modelId);
      if (response.success) {
        toast({
          title: "Connection Test Successful",
          description: `Response time: ${response.data.responseTime}ms`
        });
      } else {
        toast({
          title: "Connection Test Failed",
          description: response.error || "Unknown error",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Test Failed",
        description: "Failed to test model connection",
        variant: "destructive"
      });
    } finally {
      setTestingModel(null);
    }
  };

  const handleGenerateContent = async () => {
    setGeneratingContent(true);
    try {
      const request: ContentGenerationRequest = {
        type: 'concept-card',
        format: 'text-summary',
        subject: 'Physics',
        topic: 'Newton\'s Laws of Motion',
        difficulty: 'intermediate',
        targetAudience: 'High School Students',
        examType: 'JEE Main'
      };

      const response = await aiModelService.generateContent(request);
      if (response.success) {
        toast({
          title: "Content Generated Successfully",
          description: `Generated ${response.data.format} for ${response.data.metadata.topic}`
        });
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content",
        variant: "destructive"
      });
    } finally {
      setGeneratingContent(false);
    }
  };

  const getModelTypeColor = (type: string) => {
    switch (type) {
      case 'content-generation': return 'bg-blue-100 text-blue-800';
      case 'image-generation': return 'bg-green-100 text-green-800';
      case 'audio-processing': return 'bg-purple-100 text-purple-800';
      case 'text-analysis': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">AI Model Integration</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configure and manage AI models for content generation
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerateContent} disabled={generatingContent}>
            {generatingContent ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Zap className="h-4 w-4 mr-2" />
            )}
            Test Generation
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Model
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <div className="grid gap-4">
            {models.map((model) => (
              <Card key={model.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Brain className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{model.name}</h3>
                          <Badge className={getModelTypeColor(model.type)}>
                            {model.type.replace('-', ' ')}
                          </Badge>
                          {model.isActive ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Model Version: {model.modelVersion}</p>
                        <p className="text-xs text-gray-500">{model.apiEndpoint}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          Status: {model.isActive ? 'Active' : 'Inactive'}
                        </div>
                        {model.maxTokens && (
                          <div className="text-xs text-gray-500">
                            Max Tokens: {model.maxTokens}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTestModel(model.id)}
                          disabled={testingModel === model.id}
                        >
                          {testingModel === model.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <TestTube className="h-4 w-4" />
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Switch
                          checked={model.isActive}
                          onCheckedChange={(checked) => handleModelToggle(model.id, checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Generation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultModel">Default Model</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select default model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.filter(m => m.isActive).map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxRetries">Max Retries</Label>
                  <Input type="number" defaultValue="3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                  <Brain className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                    <p className="text-2xl font-bold">94.2%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response</p>
                    <p className="text-2xl font-bold">2.4s</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModelIntegration;
