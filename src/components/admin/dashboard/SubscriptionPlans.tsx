
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfileBase, SubscriptionTypeValue } from '@/types/user/base';
import { Users, DollarSign, TrendingUp, CreditCard } from 'lucide-react';

const SubscriptionPlans: React.FC = () => {
  const subscriptionStats = [
    {
      plan: 'Free' as SubscriptionTypeValue,
      users: 1245,
      revenue: 0,
      color: 'bg-gray-500',
      percentage: 62
    },
    {
      plan: 'basic' as SubscriptionTypeValue,
      users: 543,
      revenue: 16290,
      color: 'bg-blue-500',
      percentage: 27
    },
    {
      plan: 'premium' as SubscriptionTypeValue,
      users: 187,
      revenue: 28050,
      color: 'bg-purple-500',
      percentage: 9
    },
    {
      plan: 'pro' as SubscriptionTypeValue,
      users: 43,
      revenue: 12900,
      color: 'bg-gold-500',
      percentage: 2
    }
  ];

  const totalRevenue = subscriptionStats.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalUsers = subscriptionStats.reduce((sum, plan) => sum + plan.users, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Subscription Plans</h2>
          <p className="text-muted-foreground">Manage pricing and subscription analytics</p>
        </div>
        <Button>Create New Plan</Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue Per User</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{Math.round(totalRevenue / totalUsers)}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionStats.map((plan) => (
          <Card key={plan.plan} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="capitalize">{plan.plan} Plan</CardTitle>
                <Badge variant="secondary">{plan.percentage}%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{plan.users}</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{plan.revenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${plan.color} h-2 rounded-full`}
                    style={{ width: `${plan.percentage}%` }}
                  ></div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plan Management */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="font-semibold">Pricing Strategy</span>
                <span className="text-sm text-muted-foreground">Adjust pricing</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="font-semibold">Feature Access</span>
                <span className="text-sm text-muted-foreground">Manage features</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="font-semibold">Trial Periods</span>
                <span className="text-sm text-muted-foreground">Configure trials</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <span className="font-semibold">Promotions</span>
                <span className="text-sm text-muted-foreground">Create offers</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
