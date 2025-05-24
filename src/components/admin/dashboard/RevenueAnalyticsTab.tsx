
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, CreditCard, Calendar, BarChart3 } from 'lucide-react';

const RevenueAnalyticsTab: React.FC = () => {
  const revenueData = {
    totalRevenue: 54231,
    monthlyGrowth: 12.5,
    subscriptionRevenue: 48650,
    oneTimeRevenue: 5581,
    avgRevenuePerUser: 24.50,
    totalSubscribers: 2234,
    churnRate: 3.2,
    lifetimeValue: 245.80
  };

  const subscriptionBreakdown = [
    { plan: 'Free', count: 1567, revenue: 0, percentage: 70.1 },
    { plan: 'Pro Monthly', count: 543, revenue: 32580, percentage: 24.3 },
    { plan: 'Pro Yearly', count: 124, revenue: 22140, percentage: 5.6 }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 38500, subscribers: 1890 },
    { month: 'Feb', revenue: 42300, subscribers: 1945 },
    { month: 'Mar', revenue: 45100, subscribers: 2012 },
    { month: 'Apr', revenue: 48200, subscribers: 2087 },
    { month: 'May', revenue: 51800, subscribers: 2156 },
    { month: 'Jun', revenue: 54231, subscribers: 2234 }
  ];

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
            <div className="text-2xl font-bold">${revenueData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{revenueData.monthlyGrowth}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ARPU</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueData.avgRevenuePerUser}</div>
            <p className="text-xs text-muted-foreground">Average revenue per user</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueData.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active paid subscribers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LTV</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueData.lifetimeValue}</div>
            <p className="text-xs text-muted-foreground">Customer lifetime value</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionBreakdown.map((plan, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{plan.plan}</span>
                    <div className="text-right">
                      <div className="font-semibold">${plan.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{plan.count.toLocaleString()} users</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${plan.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{plan.percentage}% of total users</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Subscription Revenue</span>
                <span className="text-green-600 font-bold">${revenueData.subscriptionRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">One-time Revenue</span>
                <span className="text-blue-600 font-bold">${revenueData.oneTimeRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Churn Rate</span>
                <span className="text-red-600 font-bold">{revenueData.churnRate}%</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">Monthly Growth</span>
                <span className="text-green-600 font-bold">+{revenueData.monthlyGrowth}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {monthlyData.map((month, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-lg font-bold text-blue-600">${(month.revenue / 1000).toFixed(1)}K</div>
                <div className="text-sm text-gray-600">{month.month}</div>
                <div className="text-xs text-gray-500">{month.subscribers} subs</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Revenue growth chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Subscription distribution chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueAnalyticsTab;
