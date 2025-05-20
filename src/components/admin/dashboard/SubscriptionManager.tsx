
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SubscriptionTab from './tabs/SubscriptionTab';
import { SubscriptionType } from '@/types/user/base';

const SubscriptionManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Mock data
  const subscriptionMetrics = {
    totalSubscribers: 1071,
    monthlyRevenue: 98750,
    conversionRate: 23,
    churnRate: 5,
    subscriptionsByType: {
      [SubscriptionType.FREE]: 564,
      [SubscriptionType.BASIC]: 231,
      [SubscriptionType.PREMIUM]: 176,
      [SubscriptionType.PRO]: 82,
      [SubscriptionType.PRO_MONTHLY]: 12,
      [SubscriptionType.PRO_ANNUAL]: 5,
      [SubscriptionType.ENTERPRISE]: 1
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Subscription metrics display */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionMetrics.totalSubscribers.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">
              +5% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{subscriptionMetrics.monthlyRevenue.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">
              +10% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionMetrics.conversionRate}%</div>
            <div className="flex items-center space-x-1 text-xs mt-1">
              <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded">
                +2.5% vs Avg
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionMetrics.churnRate}%</div>
            <div className="flex items-center space-x-1 text-xs mt-1">
              <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded">
                -0.5% vs Target
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Free</span>
                  <span className="text-sm font-medium">{subscriptionMetrics.subscriptionsByType[SubscriptionType.FREE]} users ({Math.round((subscriptionMetrics.subscriptionsByType[SubscriptionType.FREE] / subscriptionMetrics.totalSubscribers) * 100)}%)</span>
                </div>
                <Progress value={(subscriptionMetrics.subscriptionsByType[SubscriptionType.FREE] / subscriptionMetrics.totalSubscribers) * 100} className="h-2 bg-gray-200" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Basic</span>
                  <span className="text-sm font-medium">{subscriptionMetrics.subscriptionsByType[SubscriptionType.BASIC]} users ({Math.round((subscriptionMetrics.subscriptionsByType[SubscriptionType.BASIC] / subscriptionMetrics.totalSubscribers) * 100)}%)</span>
                </div>
                <Progress value={(subscriptionMetrics.subscriptionsByType[SubscriptionType.BASIC] / subscriptionMetrics.totalSubscribers) * 100} className="h-2 bg-gray-200" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Premium</span>
                  <span className="text-sm font-medium">{subscriptionMetrics.subscriptionsByType[SubscriptionType.PREMIUM]} users ({Math.round((subscriptionMetrics.subscriptionsByType[SubscriptionType.PREMIUM] / subscriptionMetrics.totalSubscribers) * 100)}%)</span>
                </div>
                <Progress value={(subscriptionMetrics.subscriptionsByType[SubscriptionType.PREMIUM] / subscriptionMetrics.totalSubscribers) * 100} className="h-2 bg-gray-200" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pro</span>
                  <span className="text-sm font-medium">{subscriptionMetrics.subscriptionsByType[SubscriptionType.PRO]} users ({Math.round((subscriptionMetrics.subscriptionsByType[SubscriptionType.PRO] / subscriptionMetrics.totalSubscribers) * 100)}%)</span>
                </div>
                <Progress value={(subscriptionMetrics.subscriptionsByType[SubscriptionType.PRO] / subscriptionMetrics.totalSubscribers) * 100} className="h-2 bg-gray-200" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enterprise</span>
                  <span className="text-sm font-medium">{subscriptionMetrics.subscriptionsByType[SubscriptionType.ENTERPRISE]} user(s)</span>
                </div>
                <Progress value={(subscriptionMetrics.subscriptionsByType[SubscriptionType.ENTERPRISE] / subscriptionMetrics.totalSubscribers) * 100} className="h-2 bg-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Subscription Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Line chart showing subscription growth over time would go here</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Subscription Management Tab */}
      <SubscriptionTab />
    </div>
  );
};

export default SubscriptionManager;
