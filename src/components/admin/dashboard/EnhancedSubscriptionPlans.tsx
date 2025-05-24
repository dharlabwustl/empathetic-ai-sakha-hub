
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Edit, 
  Plus,
  Check,
  X
} from 'lucide-react';

const EnhancedSubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Mock subscription data
  const subscriptionStats = {
    totalRevenue: 125000,
    totalSubscribers: 2450,
    monthlyGrowth: 12.5,
    plans: {
      free: { count: 1250, revenue: 0 },
      basic: { count: 980, revenue: 49000 },
      premium: { count: 220, revenue: 76000 }
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      billing: 'forever',
      description: 'Basic access to study materials',
      features: [
        'Limited concept cards',
        'Basic flashcards',
        'Community access',
        'Progress tracking'
      ],
      limitations: [
        'No AI tutoring',
        'No practice exams',
        'Limited study plans'
      ],
      subscribers: 1250,
      color: 'gray'
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 49,
      billing: 'month',
      description: 'Enhanced learning with AI support',
      features: [
        'All Free features',
        'AI tutoring sessions',
        'Unlimited flashcards',
        'Practice exams',
        'Personalized study plans',
        'Progress analytics'
      ],
      limitations: [
        'Limited 3D models',
        'No priority support'
      ],
      subscribers: 980,
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99,
      billing: 'month',
      description: 'Complete exam preparation suite',
      features: [
        'All Basic features',
        'Unlimited 3D models',
        'Advanced AI insights',
        'Priority support',
        'Doubt resolution',
        'Live tutoring sessions',
        'Custom study schedules',
        'Performance predictions'
      ],
      limitations: [],
      subscribers: 220,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Subscription Management</h2>
          <p className="text-muted-foreground">Manage subscription plans, pricing, and features</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">${subscriptionStats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{subscriptionStats.totalSubscribers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Subscribers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">+{subscriptionStats.monthlyGrowth}%</div>
                <div className="text-sm text-muted-foreground">Monthly Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{plans.length}</div>
                <div className="text-sm text-muted-foreground">Active Plans</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Management */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>Manage and configure subscription tiers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Feature Matrix</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className={`relative ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <Badge variant={plan.color === 'purple' ? 'default' : 'secondary'}>
                          {plan.subscribers} users
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/{plan.billing}</span>
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {plan.limitations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Limitations:</h4>
                          <ul className="space-y-1">
                            {plan.limitations.map((limitation, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <X className="h-4 w-4 text-red-500" />
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex gap-2 pt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Feature Comparison Matrix</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 p-4 border-b">
                    <div className="grid grid-cols-4 gap-4 font-medium">
                      <div>Feature</div>
                      <div>Free</div>
                      <div>Basic</div>
                      <div>Premium</div>
                    </div>
                  </div>
                  {/* Feature matrix would be populated here */}
                  <div className="p-4 text-center text-muted-foreground">
                    Feature matrix configuration interface
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Subscription Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(subscriptionStats.plans).map(([planType, data]) => (
                    <Card key={planType}>
                      <CardContent className="p-4">
                        <div className="text-lg font-semibold capitalize">{planType}</div>
                        <div className="text-2xl font-bold">{data.count} users</div>
                        <div className="text-sm text-muted-foreground">
                          Revenue: ${data.revenue.toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Plan Settings</h3>
                <div className="text-center py-8 text-muted-foreground">
                  Global subscription settings and configuration options
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSubscriptionPlans;
