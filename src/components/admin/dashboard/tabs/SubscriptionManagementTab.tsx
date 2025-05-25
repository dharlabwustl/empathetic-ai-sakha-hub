
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Download,
  Settings,
  BarChart3
} from 'lucide-react';

const SubscriptionManagementTab: React.FC = () => {
  const [activeSubscriptions, setActiveSubscriptions] = useState([
    {
      id: '1',
      userName: 'John Doe',
      email: 'john@example.com',
      plan: 'Premium',
      status: 'active',
      startDate: '2024-01-15',
      nextBilling: '2024-12-15',
      amount: 999
    },
    {
      id: '2',
      userName: 'Jane Smith',
      email: 'jane@example.com',
      plan: 'Basic',
      status: 'active',
      startDate: '2024-02-01',
      nextBilling: '2024-12-01',
      amount: 499
    }
  ]);

  const subscriptionStats = {
    totalSubscribers: 1250,
    activeSubscriptions: 980,
    monthlyRevenue: 45680,
    churnRate: 3.2
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Subscription Management</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage subscription plans, billing, and revenue analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats.totalSubscribers}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{subscriptionStats.monthlyRevenue}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats.churnRate}%</div>
            <p className="text-xs text-muted-foreground">
              -2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="plans">Plan Management</TabsTrigger>
          <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>
                Manage all active subscription accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSubscriptions.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{subscription.userName}</h4>
                      <p className="text-sm text-gray-500">{subscription.email}</p>
                      <p className="text-xs text-gray-400">Started: {subscription.startDate}</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline">{subscription.plan}</Badge>
                      <p className="text-sm mt-1">₹{subscription.amount}/year</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Next billing</p>
                      <p className="text-xs text-gray-400">{subscription.nextBilling}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>
                Configure subscription plans and pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Plan management interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Detailed revenue and subscription analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Revenue analytics dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionManagementTab;
