
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Check, X, Edit, Trash, Plus, RefreshCw } from "lucide-react";
import SubscriptionStats from './tabs/subscription/SubscriptionStats';

const SubscriptionManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const subscriptionPlans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "₹499/month",
      features: [
        "Access to basic concepts",
        "10 practice tests per month",
        "Standard support",
        "Mobile access"
      ],
      userLimit: 50,
      active: true
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: "₹999/month",
      features: [
        "Access to all concepts",
        "Unlimited practice tests",
        "Priority support",
        "Mobile access",
        "Offline downloads",
        "Advanced analytics"
      ],
      userLimit: 100,
      active: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "₹1999/month",
      features: [
        "All Premium features",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Custom reporting",
        "SLA guarantees"
      ],
      userLimit: 500,
      active: true
    }
  ];
  
  const recentSubscribers = [
    {
      id: "1",
      name: "Raj Kumar",
      email: "raj.kumar@example.com",
      plan: "Premium",
      date: "2023-10-15",
      active: true
    },
    {
      id: "2",
      name: "Priya Singh",
      email: "priya.singh@example.com",
      plan: "Basic",
      date: "2023-10-14",
      active: true
    },
    {
      id: "3",
      name: "Vikram Patel",
      email: "vikram.patel@example.com",
      plan: "Enterprise",
      date: "2023-10-13",
      active: false
    },
    {
      id: "4",
      name: "Ananya Sharma",
      email: "ananya.sharma@example.com",
      plan: "Premium",
      date: "2023-10-12",
      active: true
    },
    {
      id: "5",
      name: "Rahul Gupta",
      email: "rahul.gupta@example.com",
      plan: "Basic",
      date: "2023-10-11",
      active: true
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Subscription Management</h1>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <SubscriptionStats />
        </TabsContent>
        
        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {subscriptionPlans.map(plan => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {plan.name}
                    <div className="flex items-center">
                      <Switch checked={plan.active} />
                    </div>
                  </CardTitle>
                  <CardDescription className="text-lg font-bold">{plan.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Features:</h4>
                    <ul className="text-sm space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground">User limit: {plan.userLimit}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="w-full">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="subscribers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Subscribers</CardTitle>
              <CardDescription>Manage all user subscriptions from here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSubscribers.map(subscriber => (
                      <TableRow key={subscriber.id}>
                        <TableCell>{subscriber.name}</TableCell>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell>{subscriber.plan}</TableCell>
                        <TableCell>{subscriber.date}</TableCell>
                        <TableCell>
                          {subscriber.active ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              Inactive
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-500">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Settings</CardTitle>
              <CardDescription>Configure global subscription settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Payment Gateway</h4>
                <div className="flex items-center space-x-2">
                  <Input value="Stripe" />
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Subscription Email Templates</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Welcome Email</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment Success</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment Failed</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Subscription Expiring</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Subscription Periods</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="monthly" checked={true} />
                    <label htmlFor="monthly">Monthly</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="quarterly" checked={true} />
                    <label htmlFor="quarterly">Quarterly</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="annual" checked={true} />
                    <label htmlFor="annual">Annual</label>
                  </div>
                </div>
              </div>
              
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionManager;
