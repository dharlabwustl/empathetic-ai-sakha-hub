import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DollarSign,
  CreditCard,
  Users,
  Tag,
  PieChart,
  Download,
  Copy,
  Edit,
  Check,
  X,
  Plus,
  User,
  Building,
  Building2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featureService, PlanType, SubscriptionInterval } from "@/services/featureService";

const SubscriptionTab = () => {
  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState<"overview" | "plans" | "coupons">("overview");

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const subscriptionPlans = await featureService.getSubscriptionPlans();
        setPlans(subscriptionPlans);
      } catch (error) {
        console.error("Failed to load subscription plans:", error);
      }
    };
    
    loadPlans();
  }, []);

  const getPlanIcon = (planType: PlanType) => {
    switch (planType) {
      case PlanType.Free:
      case PlanType.Basic:
      case PlanType.Premium:
        return <User size={16} />;
      case PlanType.Group:
        return <Users size={16} />;
      case PlanType.Institute:
        return <Building2 size={16} />;
      case PlanType.Corporate:
        return <Building size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getPlanBadge = (planType: PlanType) => {
    switch (planType) {
      case PlanType.Free:
        return <Badge className="bg-gray-100 text-gray-800">Free</Badge>;
      case PlanType.Basic:
        return <Badge className="bg-blue-100 text-blue-800">Basic</Badge>;
      case PlanType.Premium:
        return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>;
      case PlanType.Group:
        return <Badge className="bg-green-100 text-green-800">Group</Badge>;
      case PlanType.Institute:
        return <Badge className="bg-amber-100 text-amber-800">Institute</Badge>;
      case PlanType.Corporate:
        return <Badge className="bg-indigo-100 text-indigo-800">Corporate</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Other</Badge>;
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Monthly Revenue</h3>
                  <Badge className="bg-green-100 text-green-800">+15%</Badge>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">₹127,840</span>
                </div>
                <div className="h-10 bg-green-50 dark:bg-green-900/20 rounded-md mt-3 flex items-end">
                  <div className="bg-green-500 h-6 w-8 rounded-sm"></div>
                  <div className="bg-green-500 h-4 w-8 rounded-sm"></div>
                  <div className="bg-green-500 h-8 w-8 rounded-sm"></div>
                  <div className="bg-green-500 h-5 w-8 rounded-sm"></div>
                  <div className="bg-green-500 h-7 w-8 rounded-sm"></div>
                  <div className="bg-green-500 h-10 w-8 rounded-sm"></div>
                  <div className="bg-green-500 h-3 w-8 rounded-sm"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Paid Subscribers</h3>
                  <Badge className="bg-blue-100 text-blue-800">+8%</Badge>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">418</span>
                  <span className="text-sm text-gray-500">users</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">Free users: 1,932</span>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                    <Users size={12} />
                    <span>View All</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Conversion Rate</h3>
                  <Badge className="bg-purple-100 text-purple-800">+2%</Badge>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">17.8%</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">Prev. month: 15.6%</span>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                    <PieChart size={12} />
                    <span>Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Active Coupons</h3>
                  <Badge className="bg-amber-100 text-amber-800">8 Active</Badge>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">12.4%</span>
                  <span className="text-sm text-gray-500">usage</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">Best: STUDENT50 (24%)</span>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                    <Tag size={12} />
                    <span>Manage</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { 
                          id: 'INV-0012', 
                          customer: 'Ananya Singh', 
                          plan: 'Premium Yearly',
                          date: new Date(2023, 5, 15), 
                          amount: '₹9,999',
                          status: 'completed'
                        },
                        { 
                          id: 'INV-0011', 
                          customer: 'Rahul Patel', 
                          plan: 'Basic Monthly',
                          date: new Date(2023, 5, 14), 
                          amount: '₹499',
                          status: 'completed'
                        },
                        { 
                          id: 'INV-0010', 
                          customer: 'Priya Sharma', 
                          plan: 'Premium Monthly',
                          date: new Date(2023, 5, 14), 
                          amount: '₹999',
                          status: 'refunded'
                        },
                        { 
                          id: 'INV-0009', 
                          customer: 'Amit Kumar', 
                          plan: 'Group Monthly',
                          date: new Date(2023, 5, 13), 
                          amount: '₹3,999',
                          status: 'failed'
                        },
                      ].map((transaction, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-mono">{transaction.id}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell>{transaction.plan}</TableCell>
                          <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{transaction.amount}</TableCell>
                          <TableCell>
                            {transaction.status === 'completed' && (
                              <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            )}
                            {transaction.status === 'refunded' && (
                              <Badge className="bg-amber-100 text-amber-800">Refunded</Badge>
                            )}
                            {transaction.status === 'failed' && (
                              <Badge className="bg-red-100 text-red-800">Failed</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit size={14} />
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

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Coupon Code Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Create Coupon</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Input placeholder="Enter coupon code..." />
                      <Button variant="ghost" size="sm" className="absolute right-2 top-1">
                        <Copy size={14} />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Discount %..." className="w-1/2" />
                      <Input placeholder="Max uses..." className="w-1/2" />
                    </div>
                    <Button className="w-full mt-2 flex items-center gap-2">
                      <Plus size={16} />
                      <span>Create Coupon</span>
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Active Coupons</h3>
                  </div>
                  <div className="space-y-2 max-h-[180px] overflow-y-auto">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">STUDENT50</p>
                        <p className="text-xs text-gray-500">50% off • 32/50 used</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">WELCOME25</p>
                        <p className="text-xs text-gray-500">25% off • 187/200 used</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">FLASH30</p>
                        <p className="text-xs text-gray-500">30% off • 43/100 used</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">By Plan Type</h3>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Premium Plans</span>
                      <span className="text-sm font-medium">52%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Basic Plans</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Group Plans</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Institute Plans</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Corporate Plans</span>
                      <span className="text-sm font-medium">3%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">By Billing Cycle</h3>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Monthly Billing</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Annual Billing</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-lg mt-6">Top Referring Sources</h3>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Organic Search</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Direct</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Social Media</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">Subscription Plans</h3>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add New Plan</span>
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Billing</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Max Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                          {getPlanIcon(plan.type)}
                        </div>
                        <span className="capitalize">{plan.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>₹{plan.price}</TableCell>
                    <TableCell className="capitalize">{plan.interval}</TableCell>
                    <TableCell>{plan.features?.length || 0} features</TableCell>
                    <TableCell>{plan.maxUsers || 'N/A'}</TableCell>
                    <TableCell>
                      {getPlanBadge(plan.type)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Individual Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Free</span>
                    <Badge className="bg-gray-100 text-gray-800">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Basic</span>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Premium</span>
                    <Badge className="bg-purple-100 text-purple-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Group Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Group (5 users)</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Institute (50 users)</span>
                    <Badge className="bg-amber-100 text-amber-800">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Corporate (100 users)</span>
                    <Badge className="bg-indigo-100 text-indigo-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Billing Cycles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly</span>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Annual (20% off)</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quarterly (10% off)</span>
                    <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="coupons" className="space-y-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">Coupon Management</h3>
            <Button className="flex items-center gap-2">
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
                    <Button variant="ghost" size="sm"><Edit size={16} /></Button>
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
                    <Button variant="ghost" size="sm"><Edit size={16} /></Button>
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
                    <Button variant="ghost" size="sm"><Edit size={16} /></Button>
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
                    <Button variant="ghost" size="sm"><Edit size={16} /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionTab;
