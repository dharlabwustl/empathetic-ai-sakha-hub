
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CreditCard, Download, FileText, Search, Settings, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';

// Mock data
const mockSubscriptions = [
  {
    id: 'sub_001',
    customerName: 'Raj Sharma',
    customerEmail: 'raj@example.com',
    planType: 'Pro Plan (Monthly)',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-06-15',
    amount: 999,
    lastPayment: '2024-04-01'
  },
  {
    id: 'sub_002',
    customerName: 'Priya Patel',
    customerEmail: 'priya@example.com',
    planType: 'Pro Plan (Annual)',
    status: 'active',
    startDate: '2024-02-10',
    endDate: '2025-02-10',
    amount: 9999,
    lastPayment: '2024-02-10'
  },
  {
    id: 'sub_003',
    customerName: 'Amit Kumar',
    customerEmail: 'amit@example.com',
    planType: 'Group Plan (5 Users)',
    status: 'active',
    startDate: '2024-03-05',
    endDate: '2024-06-05',
    amount: 3999,
    lastPayment: '2024-04-05'
  },
  {
    id: 'sub_004',
    customerName: 'Neha Singh',
    customerEmail: 'neha@example.com',
    planType: 'Pro Plan (Monthly)',
    status: 'canceled',
    startDate: '2024-02-20',
    endDate: '2024-05-20',
    amount: 999,
    lastPayment: '2024-04-20'
  }
];

const SubscriptionManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Subscription Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹54,399</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <p className="text-xs text-muted-foreground mt-1">+18 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Renewal Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground mt-1">+3% from last quarter</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="subscriptions">
        <TabsList>
          <TabsTrigger value="subscriptions">All Subscriptions</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="plans">Plan Configuration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscriptions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search subscriptions..." className="pl-8" />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button size="sm">
                <Users className="mr-2 h-4 w-4" />
                Add Subscription
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{sub.customerName}</p>
                          <p className="text-sm text-muted-foreground">{sub.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{sub.planType}</TableCell>
                      <TableCell>
                        <Badge variant={sub.status === 'active' ? 'default' : 'secondary'}>
                          {sub.status === 'active' ? 'Active' : 'Canceled'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{new Date(sub.startDate).toLocaleDateString()} - {new Date(sub.endDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>₹{sub.amount}</TableCell>
                      <TableCell>{new Date(sub.lastPayment).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans" className="space-y-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Current Plan Configuration</CardTitle>
              <CardDescription>View and update subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionPlans isAdmin={true} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>All currently active subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubscriptions
                    .filter(sub => sub.status === 'active')
                    .map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{sub.customerName}</p>
                            <p className="text-sm text-muted-foreground">{sub.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{sub.planType}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{new Date(sub.startDate).toLocaleDateString()} - {new Date(sub.endDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>₹{sub.amount}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="canceled">
          <Card>
            <CardHeader>
              <CardTitle>Canceled Subscriptions</CardTitle>
              <CardDescription>All canceled subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubscriptions
                    .filter(sub => sub.status === 'canceled')
                    .map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{sub.customerName}</p>
                            <p className="text-sm text-muted-foreground">{sub.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{sub.planType}</TableCell>
                        <TableCell>{new Date(sub.endDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expired">
          <Card>
            <CardHeader>
              <CardTitle>Expired Subscriptions</CardTitle>
              <CardDescription>All expired subscription plans that weren't renewed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <CreditCard className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Expired Subscriptions</h3>
                <p className="text-muted-foreground">
                  There are currently no expired subscriptions in the system.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionManagement;
