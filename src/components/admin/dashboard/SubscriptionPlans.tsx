
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Crown, Users, Zap, Settings, DollarSign, TrendingUp } from 'lucide-react';
import { SubscriptionTypeValue } from '@/types/user/base';

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
}

const SubscriptionPlans: React.FC = () => {
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
      description: 'Basic access to platform features'
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
      description: 'Full access with monthly billing'
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
      description: 'Full access with yearly billing and bonus features'
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
      description: 'Perfect for coaching institutes and study groups'
    }
  ]);

  const togglePlan = (planId: string) => {
    setPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === planId
          ? { ...plan, isActive: !plan.isActive }
          : plan
      )
    );
  };

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalUsers = plans.reduce((sum, plan) => sum + plan.userCount, 0);

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
            <div className="text-2xl font-bold">12.5%</div>
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

      {/* Subscription Plans Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Subscription Plans Management</CardTitle>
            <Button>
              <Crown className="mr-2 h-4 w-4" />
              Create New Plan
            </Button>
          </div>
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

      {/* Feature-Plan Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Access Matrix</CardTitle>
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
                  <td className="py-3 px-4">❌</td>
                  <td className="py-3 px-4">✅</td>
                  <td className="py-3 px-4">✅</td>
                  <td className="py-3 px-4">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Practice Tests</td>
                  <td className="py-3 px-4">Limited</td>
                  <td className="py-3 px-4">Unlimited</td>
                  <td className="py-3 px-4">Unlimited</td>
                  <td className="py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Live Classes</td>
                  <td className="py-3 px-4">❌</td>
                  <td className="py-3 px-4">❌</td>
                  <td className="py-3 px-4">✅</td>
                  <td className="py-3 px-4">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Team Dashboard</td>
                  <td className="py-3 px-4">❌</td>
                  <td className="py-3 px-4">❌</td>
                  <td className="py-3 px-4">❌</td>
                  <td className="py-3 px-4">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
