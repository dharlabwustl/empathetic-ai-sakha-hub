
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlansOverview from "./subscription/PlansOverview";
import SubscriptionStats from "./subscription/SubscriptionStats";
import PlansManagement from "./subscription/PlansManagement";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Link as LinkIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SubscriptionTab = () => {
  const [activeTab, setActiveTab] = React.useState<"overview" | "plans" | "coupons" | "features">("overview");
  const { toast } = useToast();

  const handleCouponAction = () => {
    toast({
      title: "Coming Soon",
      description: "Coupon management will be available in a future update.",
      variant: "default"
    });
  };
  
  const handleFeatureAction = () => {
    toast({
      title: "Feature Management",
      description: "Redirecting to feature management page...",
    });
    // In a real app, this would navigate to the features management page
    setTimeout(() => {
      window.location.href = "/admin/features";
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Tabs 
        value={activeTab} 
        onValueChange={(value: "overview" | "plans" | "coupons" | "features") => setActiveTab(value)}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Subscription & Monetization</h2>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <SubscriptionStats />
          <PlansOverview />
        </TabsContent>

        <TabsContent value="plans">
          <PlansManagement />
        </TabsContent>
        
        <TabsContent value="features">
          <div className="space-y-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Feature Management</h3>
              <Button 
                className="flex items-center gap-2" 
                onClick={handleFeatureAction}
              >
                <LinkIcon size={16} />
                <span>Go to Feature Management</span>
              </Button>
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Access Type</TableHead>
                    <TableHead>Available In Plans</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">AI Tutor</TableCell>
                    <TableCell>Personal AI tutor for guided learning</TableCell>
                    <TableCell><Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Premium</Badge></TableCell>
                    <TableCell>Premium, Enterprise</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleFeatureAction}><Edit size={16} /></Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Practice Exams</TableCell>
                    <TableCell>Full-length practice examinations</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Basic</Badge></TableCell>
                    <TableCell>Basic, Premium, Enterprise</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleFeatureAction}><Edit size={16} /></Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Concept Cards</TableCell>
                    <TableCell>Advanced topic and concept study cards</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Basic</Badge></TableCell>
                    <TableCell>Basic, Premium, Enterprise</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleFeatureAction}><Edit size={16} /></Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
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
