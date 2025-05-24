
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  Users, 
  DollarSign, 
  Settings, 
  TrendingUp, 
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  userCount: number;
  revenue: number;
  isActive: boolean;
  description: string;
  tier: 'free' | 'basic' | 'premium' | 'enterprise';
}

interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: 'success' | 'failed' | 'pending' | 'refunded';
  planName: string;
  date: string;
  paymentMethod: string;
}

const SubscriptionManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([
    {
      id: '1',
      name: 'Free Plan',
      price: 0,
      billingPeriod: 'monthly',
      features: ['Basic Content', 'Limited Practice Tests', 'Progress Tracking'],
      userCount: 15234,
      revenue: 0,
      isActive: true,
      description: 'Basic access to platform features',
      tier: 'free'
    },
    {
      id: '2',
      name: 'Basic Plan',
      price: 299,
      billingPeriod: 'monthly',
      features: ['All Free Features', 'Unlimited Practice Tests', 'AI Study Assistant', 'Progress Analytics'],
      userCount: 3456,
      revenue: 1033344,
      isActive: true,
      description: 'Essential features for serious students',
      tier: 'basic'
    },
    {
      id: '3',
      name: 'Premium Plan',
      price: 499,
      billingPeriod: 'monthly',
      features: ['All Basic Features', 'Personalized Study Plans', 'Live Doubt Clearing', 'Priority Support'],
      userCount: 1789,
      revenue: 892611,
      isActive: true,
      description: 'Advanced features for competitive exam preparation',
      tier: 'premium'
    },
    {
      id: '4',
      name: 'Enterprise',
      price: 999,
      billingPeriod: 'monthly',
      features: ['All Premium Features', 'Institution Dashboard', 'Bulk Management', 'Custom Analytics'],
      userCount: 234,
      revenue: 233766,
      isActive: true,
      description: 'Complete solution for educational institutions',
      tier: 'enterprise'
    }
  ]);

  const [transactions] = useState<PaymentTransaction[]>([
    {
      id: '1',
      userId: 'u1',
      userName: 'Aryan Sharma',
      amount: 299,
      status: 'success',
      planName: 'Basic Plan',
      date: '2024-01-15',
      paymentMethod: 'Card'
    },
    {
      id: '2',
      userId: 'u2',
      userName: 'Priya Patel',
      amount: 499,
      status: 'success',
      planName: 'Premium Plan',
      date: '2024-01-15',
      paymentMethod: 'UPI'
    },
    {
      id: '3',
      userId: 'u3',
      userName: 'Vikram Singh',
      amount: 299,
      status: 'failed',
      planName: 'Basic Plan',
      date: '2024-01-14',
      paymentMethod: 'Card'
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
    toast({
      title: "Plan Status Updated",
      description: "Subscription plan status has been updated successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'success': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'refunded': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      'free': 'bg-gray-100 text-gray-800',
      'basic': 'bg-blue-100 text-blue-800',
      'premium': 'bg-purple-100 text-purple-800',
      'enterprise': 'bg-gold-100 text-gold-800'
    };
    return colors[tier] || 'bg-gray-100 text-gray-800';
  };

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalUsers = plans.reduce((sum, plan) => sum + plan.userCount, 0);
  const activePlans = plans.filter(p => p.isActive).length;

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
            <div className="text-2xl font-bold">18.5%</div>
            <p className="text-xs text-muted-foreground">Free to paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePlans}</div>
            <p className="text-xs text-muted-foreground">Out of {plans.length} total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans">Plans Management</TabsTrigger>
          <TabsTrigger value="payments">Payment Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Subscription Plans</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
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
                          <Badge className={getTierColor(plan.tier)}>
                            {plan.tier}
                          </Badge>
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
                          /{plan.billingPeriod}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium">Features:</h4>
                      <ul className="space-y-1">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                        {plan.features.length > 3 && (
                          <li className="text-sm text-gray-500">
                            +{plan.features.length - 3} more features
                          </li>
                        )}
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
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-medium">{transaction.userName}</div>
                        <div className="text-sm text-gray-500">{transaction.userId}</div>
                      </TableCell>
                      <TableCell>{transaction.planName}</TableCell>
                      <TableCell className="font-medium">₹{transaction.amount}</TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plans.filter(p => p.revenue > 0).map((plan) => (
                    <div key={plan.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{plan.name}</span>
                        <div className="text-sm text-gray-500">{plan.userCount} subscribers</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{(plan.revenue / 100000).toFixed(1)}L</div>
                        <div className="text-sm text-gray-500">
                          {((plan.revenue / totalRevenue) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Monthly Recurring Revenue</span>
                    <span className="text-green-600 font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Average Revenue Per User</span>
                    <span className="text-blue-600 font-bold">₹{Math.round(totalRevenue / totalUsers)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Churn Rate</span>
                    <span className="text-red-600 font-bold">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Customer Lifetime Value</span>
                    <span className="text-purple-600 font-bold">₹12,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionManagementTab;
