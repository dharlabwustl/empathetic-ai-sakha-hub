
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Brain, Heart, MessageCircle, BarChart3, Settings, Play, Pause } from 'lucide-react';

interface AIFeature {
  id: string;
  name: string;
  type: 'feel-good-corner' | 'ai-tutor' | 'mood-analyzer' | 'study-optimizer';
  status: 'active' | 'inactive' | 'maintenance';
  usage: number;
  accuracy: number;
  lastUpdated: string;
}

interface AIModel {
  id: string;
  name: string;
  version: string;
  endpoint: string;
  status: 'active' | 'inactive';
  requests: number;
  avgResponseTime: number;
}

const AIFeaturesManagementTab = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<AIFeature[]>([
    {
      id: '1',
      name: 'Feel Good Corner',
      type: 'feel-good-corner',
      status: 'active',
      usage: 1245,
      accuracy: 94.5,
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      name: 'AI Tutor Chat',
      type: 'ai-tutor',
      status: 'active',
      usage: 3456,
      accuracy: 89.2,
      lastUpdated: '2024-01-19'
    },
    {
      id: '3',
      name: 'Mood Analyzer',
      type: 'mood-analyzer',
      status: 'active',
      usage: 789,
      accuracy: 87.8,
      lastUpdated: '2024-01-18'
    }
  ]);

  const [aiModels, setAiModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'GPT-4 Tutor Model',
      version: 'v1.2.3',
      endpoint: '/api/ai/tutor',
      status: 'active',
      requests: 12543,
      avgResponseTime: 1.2
    },
    {
      id: '2',
      name: 'Sentiment Analysis Model',
      version: 'v2.1.0',
      endpoint: '/api/ai/sentiment',
      status: 'active',
      requests: 8765,
      avgResponseTime: 0.8
    }
  ]);

  const [settings, setSettings] = useState({
    feelGoodCornerEnabled: true,
    aiTutorEnabled: true,
    moodTrackingEnabled: true,
    personalizedRecommendations: true,
    autoMoodDetection: false,
    responseCaching: true
  });

  const toggleFeatureStatus = (featureId: string) => {
    setFeatures(features.map(feature => 
      feature.id === featureId 
        ? { ...feature, status: feature.status === 'active' ? 'inactive' : 'active' }
        : feature
    ));
    
    toast({
      title: "Feature Updated",
      description: "AI feature status has been updated",
    });
  };

  const testAIModel = (modelId: string) => {
    toast({
      title: "Testing AI Model",
      description: "Running diagnostic tests on the AI model...",
    });
    
    // Simulate test
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: "AI model is functioning correctly",
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case 'feel-good-corner':
        return <Heart className="h-4 w-4" />;
      case 'ai-tutor':
        return <MessageCircle className="h-4 w-4" />;
      case 'mood-analyzer':
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Features Management</h2>
          <p className="text-gray-600">Monitor and configure AI-powered features and models</p>
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList>
          <TabsTrigger value="features">AI Features</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                AI Features Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature) => (
                    <TableRow key={feature.id}>
                      <TableCell className="flex items-center">
                        {getFeatureIcon(feature.type)}
                        <span className="ml-2 font-medium">{feature.name}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{feature.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(feature.status)}>
                          {feature.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{feature.usage.toLocaleString()}</TableCell>
                      <TableCell>{feature.accuracy}%</TableCell>
                      <TableCell>{feature.lastUpdated}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleFeatureStatus(feature.id)}
                        >
                          {feature.status === 'active' ? (
                            <Pause className="h-3 w-3" />
                          ) : (
                            <Play className="h-3 w-3" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>AI Models Backend</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model Name</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead>Avg Response Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aiModels.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell>{model.version}</TableCell>
                      <TableCell className="font-mono text-sm">{model.endpoint}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{model.requests.toLocaleString()}</TableCell>
                      <TableCell>{model.avgResponseTime}s</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => testAIModel(model.id)}
                        >
                          Test
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feel Good Corner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-sm text-gray-600">Total interactions</p>
                <div className="mt-2">
                  <span className="text-sm text-green-600">↑ 12% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Tutor Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,456</div>
                <p className="text-sm text-gray-600">Active sessions</p>
                <div className="mt-2">
                  <span className="text-sm text-green-600">↑ 8% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.2%</div>
                <p className="text-sm text-gray-600">Accuracy rate</p>
                <div className="mt-2">
                  <span className="text-sm text-green-600">↑ 2% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7/5</div>
                <p className="text-sm text-gray-600">User rating</p>
                <div className="mt-2">
                  <span className="text-sm text-green-600">↑ 0.2 from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                AI Features Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="feelGoodCorner">Feel Good Corner</Label>
                    <p className="text-sm text-gray-600">Enable mood-based content recommendations</p>
                  </div>
                  <Switch
                    id="feelGoodCorner"
                    checked={settings.feelGoodCornerEnabled}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, feelGoodCornerEnabled: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="aiTutor">AI Tutor</Label>
                    <p className="text-sm text-gray-600">Enable AI-powered tutoring assistance</p>
                  </div>
                  <Switch
                    id="aiTutor"
                    checked={settings.aiTutorEnabled}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, aiTutorEnabled: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="moodTracking">Mood Tracking</Label>
                    <p className="text-sm text-gray-600">Track and analyze student mood patterns</p>
                  </div>
                  <Switch
                    id="moodTracking"
                    checked={settings.moodTrackingEnabled}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, moodTrackingEnabled: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="personalizedRec">Personalized Recommendations</Label>
                    <p className="text-sm text-gray-600">AI-driven content personalization</p>
                  </div>
                  <Switch
                    id="personalizedRec"
                    checked={settings.personalizedRecommendations}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, personalizedRecommendations: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoMoodDetection">Auto Mood Detection</Label>
                    <p className="text-sm text-gray-600">Automatically detect mood from user behavior</p>
                  </div>
                  <Switch
                    id="autoMoodDetection"
                    checked={settings.autoMoodDetection}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, autoMoodDetection: checked })
                    }
                  />
                </div>

                <Button className="w-full">
                  Save AI Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIFeaturesManagementTab;
