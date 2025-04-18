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
import { individualPlans, groupPlans } from "@/components/pricing/pricingData";

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
                  <h3 className="font-medium">Active Plans</h3>
                  <Badge className="bg-blue-100 text-blue-800">6 Plans</Badge>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">418</span>
                  <span className="text-sm text-gray-500">subscribers</span>
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
                  <h3 className="font-medium">Premium Plan Share</h3>
                  <Badge className="bg-purple-100 text-purple-800">+5%</Badge>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">42%</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">Of total active plans</span>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                    <PieChart size={12} />
                    <span>Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Plans Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-4">Individual Plans</h3>
                  <div className="space-y-4">
                    {individualPlans.map((plan, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{plan.title}</p>
                          <p className="text-sm text-gray-500">{plan.price}{plan.period}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Group Plans</h3>
                  <div className="space-y-4">
                    {groupPlans.map((plan, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{plan.title}</p>
                          <p className="text-sm text-gray-500">{plan.price}{plan.period}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
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
                  <TableHead>Description</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...individualPlans, ...groupPlans].map((plan, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                          <Users size={16} />
                        </div>
                        <span>{plan.trial ? "Trial" : plan.title.includes("Group") ? "Group" : "Individual"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{plan.title}</TableCell>
                    <TableCell>{plan.price}</TableCell>
                    <TableCell className="max-w-xs truncate">{plan.description}</TableCell>
                    <TableCell>{plan.features.length} features</TableCell>
                    <TableCell>
                      <Badge className={`${plan.recommended ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {plan.recommended ? "Recommended" : "Active"}
                      </Badge>
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
        </TabsContent>
        
        <TabsContent value="coupons">
          <div className="space-y-6">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionTab;
