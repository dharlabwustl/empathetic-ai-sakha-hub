
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionStats from "./subscription/SubscriptionStats";
import PlansManagement from "./subscription/PlansManagement";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const SubscriptionTab = () => {
  const [activeTab, setActiveTab] = React.useState<"overview" | "plans" | "coupons">("overview");
  const { toast } = useToast();

  const handleCouponAction = () => {
    toast({
      title: "Coming Soon",
      description: "Coupon management will be available in a future update.",
      variant: "default"
    });
  };
  
  // Mock data for charts
  const revenueData = [
    { name: 'Jan', revenue: 4500 },
    { name: 'Feb', revenue: 5200 },
    { name: 'Mar', revenue: 6800 },
    { name: 'Apr', revenue: 7400 },
    { name: 'May', revenue: 9100 },
    { name: 'Jun', revenue: 10500 },
  ];
  
  const planDistributionData = [
    { name: 'Free', users: 120 },
    { name: 'Basic', users: 78 },
    { name: 'Premium', users: 45 },
    { name: 'Ultimate', users: 23 },
    { name: 'Enterprise', users: 2 }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value: "overview" | "plans" | "coupons") => setActiveTab(value)}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Subscription & Monetization</h2>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$43,500</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                <div className="h-36 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">148</div>
                <p className="text-xs text-muted-foreground">55% of total users</p>
                <div className="h-36 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={planDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="users" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Subscription Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">MRR</span>
                    <span className="font-medium">$7,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ARPU</span>
                    <span className="font-medium">$49.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Churn Rate</span>
                    <span className="font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="font-medium">12.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">LTV</span>
                    <span className="font-medium">$850</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>john.doe@example.com</TableCell>
                    <TableCell>Premium (Monthly)</TableCell>
                    <TableCell>$19.99</TableCell>
                    <TableCell>2023-07-15</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Completed</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>sarah.smith@example.com</TableCell>
                    <TableCell>Basic (Annual)</TableCell>
                    <TableCell>$99.90</TableCell>
                    <TableCell>2023-07-14</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Completed</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>mike.jones@example.com</TableCell>
                    <TableCell>Ultimate (Monthly)</TableCell>
                    <TableCell>$29.99</TableCell>
                    <TableCell>2023-07-13</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Completed</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>emily.wilson@example.com</TableCell>
                    <TableCell>Premium (Monthly)</TableCell>
                    <TableCell>$19.99</TableCell>
                    <TableCell>2023-07-12</TableCell>
                    <TableCell><Badge className="bg-yellow-100 text-yellow-800">Pending</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>alex.turner@example.com</TableCell>
                    <TableCell>Basic (Monthly)</TableCell>
                    <TableCell>$9.99</TableCell>
                    <TableCell>2023-07-10</TableCell>
                    <TableCell><Badge className="bg-red-100 text-red-800">Failed</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <PlansManagement />
        </TabsContent>
        
        <TabsContent value="coupons">
          <div className="space-y-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Coupon Management</h3>
              <Button className="flex items-center gap-2" onClick={handleCouponAction}>
                <Plus size={16} />
                <span>Create Coupon</span>
              </Button>
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Valid From</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">STUDENT50</TableCell>
                    <TableCell>50% off</TableCell>
                    <TableCell>32/50 used</TableCell>
                    <TableCell>01/01/2023</TableCell>
                    <TableCell>31/12/2023</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleCouponAction}><Edit size={16} /></Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">WELCOME25</TableCell>
                    <TableCell>25% off</TableCell>
                    <TableCell>187/200 used</TableCell>
                    <TableCell>01/01/2023</TableCell>
                    <TableCell>31/12/2023</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleCouponAction}><Edit size={16} /></Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">FLASH30</TableCell>
                    <TableCell>30% off</TableCell>
                    <TableCell>43/100 used</TableCell>
                    <TableCell>01/01/2023</TableCell>
                    <TableCell>31/12/2023</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleCouponAction}><Edit size={16} /></Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SUMMER2022</TableCell>
                    <TableCell>20% off</TableCell>
                    <TableCell>500/500 used</TableCell>
                    <TableCell>01/06/2022</TableCell>
                    <TableCell>31/08/2022</TableCell>
                    <TableCell><Badge className="bg-red-100 text-red-800">Expired</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleCouponAction}><Edit size={16} /></Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionTab;
