
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SubscriptionStats: React.FC = () => {
  // Mock data for subscription growth
  const subscriptionGrowthData = [
    { month: 'Jan', subscriptions: 85 },
    { month: 'Feb', subscriptions: 102 },
    { month: 'Mar', subscriptions: 123 },
    { month: 'Apr', subscriptions: 131 },
    { month: 'May', subscriptions: 142 },
    { month: 'Jun', subscriptions: 148 },
  ];
  
  // Mock data for revenue growth
  const revenueGrowthData = [
    { month: 'Jan', revenue: 2950 },
    { month: 'Feb', revenue: 3520 },
    { month: 'Mar', revenue: 4230 },
    { month: 'Apr', revenue: 4540 },
    { month: 'May', revenue: 5100 },
    { month: 'Jun', revenue: 5500 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Subscription Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={subscriptionGrowthData}>
                  <defs>
                    <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="subscriptions" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorSubs)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4, fill: 'white' }}
                    activeDot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2, fill: '#82ca9d' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">148</div>
              <p className="text-xs text-muted-foreground">Active Subscriptions</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">$7,250</div>
              <p className="text-xs text-muted-foreground">Monthly Recurring Revenue</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">Churn Rate</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">$49.00</div>
              <p className="text-xs text-muted-foreground">Average Revenue Per User</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionStats;
