
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Brain, 
  BookOpen, 
  FileText, 
  Calendar, 
  Heart, 
  Target,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Users,
  Zap
} from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'ai' | 'learning' | 'analytics' | 'social' | 'performance';
  enabled: boolean;
  adminControlled: boolean;
  usage: {
    activeUsers: number;
    totalSessions: number;
    avgRating: number;
  };
  aiModel?: string;
  testingStatus: 'active' | 'testing' | 'disabled';
}

const FeatureManagementTab = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 'mood-tracking',
      name: 'Mood Tracking & Analytics',
      description: 'AI-powered mood analysis with study recommendations',
      category: 'ai',
      enabled: true,
      adminControlled: true,
      usage: { activeUsers: 1250, totalSessions: 15680, avgRating: 4.2 },
      aiModel: 'sentiment-analysis-v2',
      testingStatus: 'active'
    },
    {
      id: 'surrounding-influences',
      name: 'Surrounding Influences Meter',
      description: 'Environmental and social factors analysis',
      category: 'ai',
      enabled: true,
      adminControlled: true,
      usage: { activeUsers: 890, totalSessions: 8950, avgRating: 4.0 },
      aiModel: 'behavioral-analysis-v1',
      testingStatus: 'active'
    },
    {
      id: 'concept-cards',
      name: 'Interactive Concept Cards',
      description: 'AI-generated concept explanations with multiple formats',
      category: 'learning',
      enabled: true,
      adminControlled: true,
      usage: { activeUsers: 2150, totalSessions: 45600, avgRating: 4.5 },
      aiModel: 'content-generation-v3',
      testingStatus: 'active'
    },
    {
      id: 'flashcards',
      name: 'Smart Flashcards',
      description: 'Adaptive flashcard system with spaced repetition',
      category: 'learning',
      enabled: true,
      adminControlled: true,
      usage: { activeUsers: 1890, totalSessions: 67800, avgRating: 4.3 },
      aiModel: 'spaced-repetition-v2',
      testingStatus: 'active'
    },
    {
      id: 'exam-readiness',
      name: 'Exam Readiness Score',
      description: 'Comprehensive readiness assessment with predictions',
      category: 'analytics',
      enabled: true,
      adminControlled: true,
      usage: { activeUsers: 1650, totalSessions: 12400, avgRating: 4.1 },
      aiModel: 'performance-prediction-v2',
      testingStatus: 'active'
    },
    {
      id: 'study-plan-generator',
      name: 'AI Study Plan Generator',
      description: 'Personalized study plans based on learning patterns',
      category: 'ai',
      enabled: true,
      adminControlled: true,
      usage: { activeUsers: 2000, totalSessions: 18500, avgRating: 4.4 },
      aiModel: 'planning-algorithm-v3',
      testingStatus: 'active'
    },
    {
      id: 'voice-announcer',
      name: 'Voice Announcer',
      description: 'Text-to-speech for personalized announcements',
      category: 'performance',
      enabled: true,
      adminControlled: false,
      usage: { activeUsers: 750, totalSessions: 5600, avgRating: 3.8 },
      testingStatus: 'testing'
    },
    {
      id: 'academic-advisor',
      name: 'Academic Advisor AI',
      description: 'Personalized academic guidance and recommendations',
      category: 'ai',
      enabled: true,
      adminControlled: true,
      usage: { activeUsers: 1450, totalSessions: 9800, avgRating: 4.2 },
      aiModel: 'advisory-gpt-v2',
      testingStatus: 'active'
    }
  ]);

  const handleToggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ));
    
    toast({
      title: "Feature Updated",
      description: "Feature status has been updated successfully",
    });
  };

  const handleTestAIModel = (feature: Feature) => {
    toast({
      title: "Testing AI Model",
      description: `Running tests for ${feature.aiModel} used in ${feature.name}`,
    });
    
    // Simulate testing
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: `${feature.aiModel} passed all tests with 94% accuracy`,
      });
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return <Brain className="h-4 w-4" />;
      case 'learning': return <BookOpen className="h-4 w-4" />;
      case 'analytics': return <BarChart3 className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      case 'performance': return <Zap className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'learning': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'analytics': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'social': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'performance': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Feature Management</h2>
          <p className="text-muted-foreground">Manage all student dashboard features and AI models</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Feature
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-features">AI Features</TabsTrigger>
          <TabsTrigger value="learning-features">Learning Features</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4">
            {features.map((feature) => (
              <Card key={feature.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(feature.category)}`}>
                        {getCategoryIcon(feature.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={feature.testingStatus === 'active' ? 'default' : 'secondary'}>
                        {feature.testingStatus}
                      </Badge>
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={() => handleToggleFeature(feature.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Active Users</div>
                      <div className="text-lg font-semibold">{feature.usage.activeUsers.toLocaleString()}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Sessions</div>
                      <div className="text-lg font-semibold">{feature.usage.totalSessions.toLocaleString()}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Avg Rating</div>
                      <div className="text-lg font-semibold">{feature.usage.avgRating}/5</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">AI Model</div>
                      <div className="text-sm font-medium">{feature.aiModel || 'N/A'}</div>
                      {feature.aiModel && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-1 h-6 text-xs"
                          onClick={() => handleTestAIModel(feature)}
                        >
                          Test Model
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-features">
          <div className="grid gap-4">
            {features.filter(f => f.category === 'ai').map((feature) => (
              <Card key={feature.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      {feature.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-700">
                        {feature.aiModel}
                      </Badge>
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={() => handleToggleFeature(feature.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleTestAIModel(feature)}>
                      Test AI Model
                    </Button>
                    <Button size="sm" variant="outline">
                      View Performance
                    </Button>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learning-features">
          <div className="grid gap-4">
            {features.filter(f => f.category === 'learning').map((feature) => (
              <Card key={feature.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      {feature.name}
                    </CardTitle>
                    <Switch
                      checked={feature.enabled}
                      onCheckedChange={() => handleToggleFeature(feature.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">{feature.usage.activeUsers}</div>
                      <div className="text-xs text-muted-foreground">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">{feature.usage.totalSessions}</div>
                      <div className="text-xs text-muted-foreground">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">{feature.usage.avgRating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                  {feature.aiModel && (
                    <Button size="sm" variant="outline" onClick={() => handleTestAIModel(feature)}>
                      Test {feature.aiModel}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-4">
            {features.filter(f => f.category === 'analytics').map((feature) => (
              <Card key={feature.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      {feature.name}
                    </CardTitle>
                    <Switch
                      checked={feature.enabled}
                      onCheckedChange={() => handleToggleFeature(feature.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Analytics Data</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Data Points Collected:</span>
                        <div className="font-semibold">2.4M</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Accuracy Rate:</span>
                        <div className="font-semibold">92%</div>
                      </div>
                    </div>
                  </div>
                  {feature.aiModel && (
                    <Button size="sm" variant="outline" className="mt-4" onClick={() => handleTestAIModel(feature)}>
                      Test {feature.aiModel}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeatureManagementTab;
