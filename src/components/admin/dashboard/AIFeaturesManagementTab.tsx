
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Brain, Heart, MessageSquare, BarChart3, Settings, Activity, Zap } from 'lucide-react';

interface AIFeature {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  usageCount: number;
  successRate: number;
  category: 'tutor' | 'mood' | 'analytics';
  lastUpdated: string;
}

const AIFeaturesManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<AIFeature[]>([
    {
      id: '1',
      name: 'AI Tutor Chat',
      description: '24/7 intelligent tutoring system with personalized responses',
      status: 'active',
      usageCount: 2847,
      successRate: 94,
      category: 'tutor',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Feel Good Corner',
      description: 'Mood-based content and motivational resources',
      status: 'active',
      usageCount: 1923,
      successRate: 87,
      category: 'mood',
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      name: 'Mood Analytics',
      description: 'AI-powered mood tracking and analysis',
      status: 'active',
      usageCount: 3456,
      successRate: 92,
      category: 'analytics',
      lastUpdated: '2024-01-13'
    },
    {
      id: '4',
      name: 'Adaptive Learning',
      description: 'AI-driven difficulty adjustment based on performance',
      status: 'maintenance',
      usageCount: 1567,
      successRate: 89,
      category: 'tutor',
      lastUpdated: '2024-01-12'
    }
  ]);

  const toggleFeatureStatus = (featureId: string) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(feature =>
        feature.id === featureId
          ? { 
              ...feature, 
              status: feature.status === 'active' ? 'inactive' : 'active' 
            }
          : feature
      )
    );

    const feature = features.find(f => f.id === featureId);
    toast({
      title: "Feature Updated",
      description: `${feature?.name} is now ${feature?.status === 'active' ? 'inactive' : 'active'}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tutor': return <Brain className="h-5 w-5" />;
      case 'mood': return <Heart className="h-5 w-5" />;
      case 'analytics': return <BarChart3 className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  const groupedFeatures = {
    tutor: features.filter(f => f.category === 'tutor'),
    mood: features.filter(f => f.category === 'mood'),
    analytics: features.filter(f => f.category === 'analytics')
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AI Features</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.length}</div>
            <p className="text-xs text-muted-foreground">{features.filter(f => f.status === 'active').length} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {features.reduce((sum, f) => sum + f.usageCount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(features.reduce((sum, f) => sum + f.successRate, 0) / features.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all features</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tutor">AI Tutor</TabsTrigger>
          <TabsTrigger value="mood">Mood Features</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {features.map((feature) => (
              <Card key={feature.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        {getCategoryIcon(feature.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{feature.name}</h3>
                          <Badge className={getStatusColor(feature.status)}>
                            {feature.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {feature.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="text-sm text-gray-500">Usage Count</div>
                            <div className="font-semibold">{feature.usageCount.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Success Rate</div>
                            <div className="font-semibold">{feature.successRate}%</div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Performance</span>
                            <span>{feature.successRate}%</span>
                          </div>
                          <Progress value={feature.successRate} className="h-2" />
                        </div>
                        <div className="text-xs text-gray-500">
                          Last updated: {feature.lastUpdated}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={feature.status === 'active'}
                        onCheckedChange={() => toggleFeatureStatus(feature.id)}
                        disabled={feature.status === 'maintenance'}
                      />
                      <Button variant="outline" size="sm">
                        <Settings size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tutor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Tutor Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedFeatures.tutor.map((feature) => (
                  <div key={feature.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{feature.name}</h4>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        Usage: {feature.usageCount.toLocaleString()} | Success: {feature.successRate}%
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Configure</Button>
                        <Button variant="outline" size="sm">Test</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Mood & Wellness Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedFeatures.mood.map((feature) => (
                  <div key={feature.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{feature.name}</h4>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        Usage: {feature.usageCount.toLocaleString()} | Success: {feature.successRate}%
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Configure</Button>
                        <Button variant="outline" size="sm">Test</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groupedFeatures.analytics.map((feature) => (
                  <div key={feature.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{feature.name}</h4>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        Usage: {feature.usageCount.toLocaleString()} | Success: {feature.successRate}%
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Configure</Button>
                        <Button variant="outline" size="sm">Test</Button>
                      </div>
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

export default AIFeaturesManagementTab;
