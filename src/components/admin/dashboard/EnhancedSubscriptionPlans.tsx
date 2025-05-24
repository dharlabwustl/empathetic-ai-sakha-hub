
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Users, Zap, Settings, DollarSign, TrendingUp, CreditCard, User, AlertTriangle } from 'lucide-react';
import { SubscriptionTypeValue } from '@/types/user/base';
import { useToast } from "@/hooks/use-toast";

interface SubscriptionPlan {
  id: string;
  name: string;
  type: SubscriptionTypeValue;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  userCount: number;
  revenue: number;
  isActive: boolean;
  description: string;
  limits: {
    studyPlans: number;
    aiTutorSessions: number;
    practiceTests: number;
    conceptCards: number;
  };
}

interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  planName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  paymentMethod: string;
}

const EnhancedSubscriptionPlans: React.FC = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([
    {
      id: '1',
      name: 'Free Plan',
      type: 'free',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Basic Content', 'Limited Practice Tests', 'Progress Tracking'],
      userCount: 15234,
      revenue: 0,
      isActive: true,
      description: 'Basic access to platform features',
      limits: {
        studyPlans: 1,
        aiTutorSessions: 5,
        practiceTests: 10,
        conceptCards: 50
      }
    },
    {
      id: '2',
      name: 'Pro Monthly',
      type: 'pro_monthly',
      price: 299,
      billingPeriod: 'monthly',
      features: ['AI Tutor', 'Unlimited Practice Tests', 'Progress Analytics', 'Priority Support'],
      userCount: 3456,
      revenue: 1033344,
      isActive: true,
      description: 'Full access with monthly billing',
      limits: {
        studyPlans: 10,
        aiTutorSessions: 100,
        practiceTests: -1, // unlimited
        conceptCards: 1000
      }
    },
    {
      id: '3',
      name: 'Pro Yearly',
      type: 'pro_yearly',
      price: 2999,
      billingPeriod: 'yearly',
      features: ['AI Tutor', 'Unlimited Practice Tests', 'Progress Analytics', 'Priority Support', 'Live Classes'],
      userCount: 1789,
      revenue: 5366211,
      isActive: true,
      description: 'Full access with yearly billing and bonus features',
      limits: {
        studyPlans: -1, // unlimited
        aiTutorSessions: -1, // unlimited
        practiceTests: -1, // unlimited
        conceptCards: -1 // unlimited
      }
    },
    {
      id: '4',
      name: 'Group Plan',
      type: 'group',
      price: 1999,
      billingPeriod: 'monthly',
      features: ['Everything in Pro', 'Team Dashboard', 'Bulk Management', 'Custom Analytics'],
      userCount: 234,
      revenue: 467766,
      isActive: true,
      description: 'Perfect for coaching institutes and study groups',
      limits: {
        studyPlans: -1, // unlimited
        aiTutorSessions: -1, // unlimited
        practiceTests: -1, // unlimited
        conceptCards: -1 // unlimited
      }
    }
  ]);

  const [transactions] = useState<PaymentTransaction[]>([
    {
      id: 'TXN001',
      userId: 'user_123',
      userName: 'John Doe',
      planName: 'Pro Monthly',
      amount: 299,
      status: 'completed',
      date: '2024-01-15T10:30:00Z',
      paymentMethod: 'Card ending in 4242'
    },
    {
      id: 'TXN002',
      userId: 'user_456',
      userName: 'Jane Smith',
      planName: 'Pro Yearly',
      amount: 2999,
      status: 'completed',
      date: '2024-01-15T09:15:00Z',
      paymentMethod: 'Card ending in 1234'
    },
    {
      id: 'TXN003',
      userId: 'user_789',
      userName: 'Bob Johnson',
      planName: 'Pro Monthly',
      amount: 299,
      status: 'failed',
      date: '2024-01-15T08:45:00Z',
      paymentMethod: 'Card ending in 5678'
    }
  ]);

  const [newPlan, setNewPlan] = useState({
    name: '',
    price: 0,
    billingPeriod: 'monthly' as 'monthly' | 'yearly',
    features: [''],
    description: ''
  });

  const togglePlan = (planId: string) => {
    setPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === planId
          ? { ...plan, isActive: !plan.isActive }
          : plan
      )
    );
    
    toast({
      title: "Plan Status Updated",
      description: "Subscription plan status has been changed successfully."
    });
  };

  const createNewPlan = () => {
    if (!newPlan.name || newPlan.price < 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      });
      return;
    }

    const plan: SubscriptionPlan = {
      id: Date.now().toString(),
      name: newPlan.name,
      type: 'premium',
      price: newPlan.price,
      billingPeriod: newPlan.billingPeriod,
      features: newPlan.features.filter(f => f.trim() !== ''),
      userCount: 0,
      revenue: 0,
      isActive: true,
      description: newPlan.description,
      limits: {
        studyPlans: 5,
        aiTutorSessions: 50,
        practiceTests: 100,
        conceptCards: 500
      }
    };

    setPlans(prev => [...prev, plan]);
    setNewPlan({
      name: '',
      price: 0,
      billingPeriod: 'monthly',
      features: [''],
      description: ''
    });

    toast({
      title: "Plan Created",
      description: `${newPlan.name} has been created successfully.`
    });
  };

  const adjustFeatureAccess = (planId: string, feature: string, enabled: boolean) => {
    toast({
      title: "Feature Access Updated",
      description: `${feature} access has been ${enabled ? 'enabled' : 'disabled'} for this plan.`
    });
  };

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalUsers = plans.reduce((sum, plan) => sum + plan.userCount, 0);
  const conversionRate = ((totalUsers - plans[0].userCount) / totalUsers * 100).toFixed(1);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800',
      'refunded': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Free to paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plans.filter(p => p.isActive).length}</div>
            <p className="text-xs text-muted-foreground">Out of {plans.length} total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="create">Create Plan</TabsTrigger>
          <TabsTrigger value="payments">Payment Monitoring</TabsTrigger>
          <TabsTrigger value="features">Feature Access</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {plans.map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{plan.name}</h3>
                          <Badge variant={plan.isActive ? "default" : "secondary"}>
                            {plan.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{plan.description}</p>
                      </div>
                      <Switch
                        checked={plan.isActive}
                        onCheckedChange={() => togglePlan(plan.id)}
                      />
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold">
                        ₹{plan.price}
                        <span className="text-lg font-normal text-gray-500">
                          /{plan.billingPeriod === 'yearly' ? 'year' : 'month'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium">Features:</h4>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <Zap className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium">Usage Limits:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Study Plans: {plan.limits.studyPlans === -1 ? '∞' : plan.limits.studyPlans}</div>
                        <div>AI Sessions: {plan.limits.aiTutorSessions === -1 ? '∞' : plan.limits.aiTutorSessions}</div>
                        <div>Practice Tests: {plan.limits.practiceTests === -1 ? '∞' : plan.limits.practiceTests}</div>
                        <div>Concept Cards: {plan.limits.conceptCards === -1 ? '∞' : plan.limits.conceptCards}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Subscribers</div>
                        <div className="font-semibold">{plan.userCount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Revenue</div>
                        <div className="font-semibold">₹{(plan.revenue / 100000).toFixed(1)}L</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Analytics
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Subscription Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plan-name">Plan Name</Label>
                  <Input
                    id="plan-name"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Premium Plus"
                  />
                </div>
                <div>
                  <Label htmlFor="plan-price">Price (₹)</Label>
                  <Input
                    id="plan-price"
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    placeholder="299"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="plan-description">Description</Label>
                <Input
                  id="plan-description"
                  value={newPlan.description}
                  onChange={(e) => setNewPlan(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the plan"
                />
              </div>

              <div>
                <Label>Billing Period</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="billing"
                      checked={newPlan.billingPeriod === 'monthly'}
                      onChange={() => setNewPlan(prev => ({ ...prev, billingPeriod: 'monthly' }))}
                      className="mr-2"
                    />
                    Monthly
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="billing"
                      checked={newPlan.billingPeriod === 'yearly'}
                      onChange={() => setNewPlan(prev => ({ ...prev, billingPeriod: 'yearly' }))}
                      className="mr-2"
                    />
                    Yearly
                  </label>
                </div>
              </div>

              <div>
                <Label>Features</Label>
                <div className="space-y-2 mt-2">
                  {newPlan.features.map((feature, index) => (
                    <Input
                      key={index}
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...newPlan.features];
                        newFeatures[index] = e.target.value;
                        setNewPlan(prev => ({ ...prev, features: newFeatures }));
                      }}
                      placeholder={`Feature ${index + 1}`}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setNewPlan(prev => ({ ...prev, features: [...prev.features, ''] }))}
                  >
                    Add Feature
                  </Button>
                </div>
              </div>

              <Button onClick={createNewPlan} className="w-full">
                <Crown className="mr-2 h-4 w-4" />
                Create Plan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Transaction Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {transactions.filter(t => t.status === 'completed').length}
                    </div>
                    <div className="text-sm text-gray-500">Completed</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {transactions.filter(t => t.status === 'pending').length}
                    </div>
                    <div className="text-sm text-gray-500">Pending</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {transactions.filter(t => t.status === 'failed').length}
                    </div>
                    <div className="text-sm text-gray-500">Failed</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">
                      ₹{transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Total Collected</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Recent Transactions</h4>
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{transaction.userName}</div>
                          <div className="text-sm text-gray-500">{transaction.planName}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{transaction.amount}</div>
                        <div className="text-sm text-gray-500">{transaction.paymentMethod}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Feature</th>
                      <th className="text-left py-3 px-4 font-medium">Free</th>
                      <th className="text-left py-3 px-4 font-medium">Pro Monthly</th>
                      <th className="text-left py-3 px-4 font-medium">Pro Yearly</th>
                      <th className="text-left py-3 px-4 font-medium">Group</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">AI Tutor</td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={false} onCheckedChange={(checked) => adjustFeatureAccess('1', 'AI Tutor', checked)} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} onCheckedChange={(checked) => adjustFeatureAccess('2', 'AI Tutor', checked)} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} onCheckedChange={(checked) => adjustFeatureAccess('3', 'AI Tutor', checked)} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} onCheckedChange={(checked) => adjustFeatureAccess('4', 'AI Tutor', checked)} />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Unlimited Practice Tests</td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={false} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Advanced Analytics</td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={false} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Live Classes</td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={false} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={false} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} />
                      </td>
                      <td className="py-3 px-4">
                        <Switch defaultChecked={true} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSubscriptionPlans;
