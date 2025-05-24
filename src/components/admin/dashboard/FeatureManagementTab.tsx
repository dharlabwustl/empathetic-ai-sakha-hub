
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Crown, Shield, BookOpen, Brain, MessageSquare, BarChart3 } from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'premium' | 'experimental';
  enabled: boolean;
  subscriptionTiers: string[];
  usageCount: number;
  lastModified: string;
  icon: React.ReactNode;
}

const FeatureManagementTab: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: '1',
      name: 'AI Tutor',
      description: '24/7 intelligent tutoring system with personalized learning',
      category: 'premium',
      enabled: true,
      subscriptionTiers: ['Pro Monthly', 'Pro Yearly'],
      usageCount: 2847,
      lastModified: '2024-01-15',
      icon: <Brain className="h-5 w-5" />
    },
    {
      id: '2',
      name: 'Practice Tests',
      description: 'Comprehensive mock tests and practice questions',
      category: 'core',
      enabled: true,
      subscriptionTiers: ['Free', 'Pro Monthly', 'Pro Yearly'],
      usageCount: 5234,
      lastModified: '2024-01-14',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: '3',
      name: 'Progress Analytics',
      description: 'Detailed analytics and performance tracking',
      category: 'premium',
      enabled: true,
      subscriptionTiers: ['Pro Monthly', 'Pro Yearly'],
      usageCount: 1923,
      lastModified: '2024-01-13',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: '4',
      name: 'Live Doubt Resolution',
      description: 'Real-time doubt clearing with expert tutors',
      category: 'premium',
      enabled: false,
      subscriptionTiers: ['Pro Yearly'],
      usageCount: 0,
      lastModified: '2024-01-12',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      id: '5',
      name: 'Voice Assistant',
      description: 'Voice-enabled study assistant and navigation',
      category: 'experimental',
      enabled: true,
      subscriptionTiers: ['Pro Monthly', 'Pro Yearly'],
      usageCount: 456,
      lastModified: '2024-01-11',
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: '6',
      name: 'Study Groups',
      description: 'Collaborative learning and group study features',
      category: 'core',
      enabled: true,
      subscriptionTiers: ['Free', 'Pro Monthly', 'Pro Yearly'],
      usageCount: 1567,
      lastModified: '2024-01-10',
      icon: <Users className="h-5 w-5" />
    }
  ]);

  const toggleFeature = (featureId: string) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(feature =>
        feature.id === featureId
          ? { ...feature, enabled: !feature.enabled }
          : feature
      )
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'core': 'bg-blue-100 text-blue-800',
      'premium': 'bg-purple-100 text-purple-800',
      'experimental': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'core': <BookOpen className="h-4 w-4" />,
      'premium': <Crown className="h-4 w-4" />,
      'experimental': <Zap className="h-4 w-4" />
    };
    return icons[category] || <Shield className="h-4 w-4" />;
  };

  const groupedFeatures = {
    core: features.filter(f => f.category === 'core'),
    premium: features.filter(f => f.category === 'premium'),
    experimental: features.filter(f => f.category === 'experimental')
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.length}</div>
            <p className="text-xs text-muted-foreground">{features.filter(f => f.enabled).length} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Core Features</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupedFeatures.core.length}</div>
            <p className="text-xs text-muted-foreground">Available to all users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Features</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupedFeatures.premium.length}</div>
            <p className="text-xs text-muted-foreground">Subscription required</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.reduce((sum, f) => sum + f.usageCount, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Categories */}
      {Object.entries(groupedFeatures).map(([categoryName, categoryFeatures]) => (
        <Card key={categoryName}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {getCategoryIcon(categoryName)}
              <CardTitle className="capitalize">{categoryName} Features</CardTitle>
              <Badge className={getCategoryColor(categoryName)}>
                {categoryFeatures.length} features
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {categoryFeatures.map((feature) => (
                <div key={feature.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{feature.name}</h3>
                          <Badge className={getCategoryColor(feature.category)}>
                            {feature.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Usage: {feature.usageCount.toLocaleString()}</span>
                          <span>Modified: {feature.lastModified}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-xs text-gray-500">Available in:</span>
                          {feature.subscriptionTiers.map((tier, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tier}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureManagementTab;
