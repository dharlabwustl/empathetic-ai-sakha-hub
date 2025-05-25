
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, Activity, Settings, Zap, Target, MessageSquare, 
  BookOpen, Calendar, Heart, TrendingUp, Server, Database 
} from 'lucide-react';

const AIModelsManagement: React.FC = () => {
  const [modelStates, setModelStates] = useState<Record<string, boolean>>({
    'study-plan-generator': true,
    'content-creator': true,
    'exam-generator': true,
    'mood-analyzer': true,
    'ai-tutor': true,
    'voice-assistant': false,
    'learning-adapter': true,
    'progress-predictor': true
  });

  const aiModels = [
    {
      id: 'study-plan-generator',
      name: 'Study Plan Generator',
      description: 'Creates personalized study plans based on exam goals and learning patterns',
      status: 'active',
      accuracy: 94.2,
      usage: 12450,
      icon: Calendar,
      category: 'Planning',
      lastUpdated: '2 hours ago',
      performance: 95,
      apiCalls: '24.5K/day'
    },
    {
      id: 'content-creator',
      name: 'Content Creator AI',
      description: 'Generates concept cards, flashcards, and interactive content',
      status: 'active',
      accuracy: 91.8,
      usage: 8930,
      icon: BookOpen,
      category: 'Content',
      lastUpdated: '1 hour ago',
      performance: 92,
      apiCalls: '18.2K/day'
    },
    {
      id: 'exam-generator',
      name: 'Exam Generator',
      description: 'Creates adaptive exams and practice tests',
      status: 'active',
      accuracy: 96.5,
      usage: 5670,
      icon: Target,
      category: 'Assessment',
      lastUpdated: '30 minutes ago',
      performance: 97,
      apiCalls: '12.8K/day'
    },
    {
      id: 'mood-analyzer',
      name: 'Mood Analyzer',
      description: 'Analyzes student mood and adapts content accordingly',
      status: 'active',
      accuracy: 88.9,
      usage: 15230,
      icon: Heart,
      category: 'Analytics',
      lastUpdated: '15 minutes ago',
      performance: 89,
      apiCalls: '32.1K/day'
    },
    {
      id: 'ai-tutor',
      name: 'AI Tutor',
      description: 'Provides personalized tutoring and doubt resolution',
      status: 'active',
      accuracy: 93.7,
      usage: 9840,
      icon: MessageSquare,
      category: 'Tutoring',
      lastUpdated: '45 minutes ago',
      performance: 94,
      apiCalls: '21.7K/day'
    },
    {
      id: 'voice-assistant',
      name: 'Voice Assistant',
      description: 'Voice-powered navigation and study assistance',
      status: 'maintenance',
      accuracy: 87.2,
      usage: 3240,
      icon: Brain,
      category: 'Interface',
      lastUpdated: '3 hours ago',
      performance: 85,
      apiCalls: '8.5K/day'
    },
    {
      id: 'learning-adapter',
      name: 'Learning Adapter',
      description: 'Adapts content difficulty based on student performance',
      status: 'active',
      accuracy: 92.4,
      usage: 11560,
      icon: TrendingUp,
      category: 'Adaptation',
      lastUpdated: '20 minutes ago',
      performance: 93,
      apiCalls: '26.3K/day'
    },
    {
      id: 'progress-predictor',
      name: 'Progress Predictor',
      description: 'Predicts student performance and suggests interventions',
      status: 'active',
      accuracy: 89.6,
      usage: 7890,
      icon: Activity,
      category: 'Prediction',
      lastUpdated: '1 hour ago',
      performance: 91,
      apiCalls: '15.9K/day'
    }
  ];

  const handleModelToggle = (modelId: string) => {
    setModelStates(prev => ({
      ...prev,
      [modelId]: !prev[modelId]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* AI System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Models</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">out of 8 models</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">159.8K</div>
                <p className="text-xs text-muted-foreground">Daily average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Accuracy</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">91.8%</div>
                <p className="text-xs text-muted-foreground">+2.3% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Load</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">Optimal range</p>
              </CardContent>
            </Card>
          </div>

          {/* Model Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiModels.slice(0, 4).map((model) => {
                  const Icon = model.icon;
                  return (
                    <div key={model.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">{model.name}</span>
                        </div>
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Accuracy</span>
                          <span className="font-medium">{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-1" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{model.apiCalls}</span>
                          <span>{model.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-6">
            {aiModels.map((model) => {
              const Icon = model.icon;
              const isActive = modelStates[model.id];
              
              return (
                <Card key={model.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{model.name}</h3>
                          <p className="text-sm text-muted-foreground">{model.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline">{model.category}</Badge>
                            <span className="text-xs text-muted-foreground">
                              Last updated: {model.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{model.accuracy}%</div>
                          <div className="text-xs text-muted-foreground">Accuracy</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{model.apiCalls}</div>
                          <div className="text-xs text-muted-foreground">API Calls</div>
                        </div>
                        <Switch
                          checked={isActive}
                          onCheckedChange={() => handleModelToggle(model.id)}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Performance</div>
                        <Progress value={model.performance} className="h-2" />
                        <div className="text-xs mt-1">{model.performance}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Usage</div>
                        <div className="text-lg font-bold">{model.usage.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">requests today</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Status</div>
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed performance metrics and analytics for all AI models.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configuration settings and parameters for AI models.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModelsManagement;
