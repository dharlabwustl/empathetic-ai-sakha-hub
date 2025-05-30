
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Users, Check, X, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { standardSubscriptionPlans, creditPacks } from '@/types/user/subscription';

// Merge individual and group plans
const plans = [
  ...standardSubscriptionPlans.individual.map(plan => ({
    id: plan.id,
    name: plan.name,
    price: plan.price,
    priceAnnual: plan.priceAnnual,
    billingCycle: plan.priceAnnual ? "Monthly/Annual" : "N/A",
    users: plan.id === 'free' ? 564 : plan.id === 'basic' ? 120 : plan.id === 'premium' ? 284 : 103,
    features: plan.features,
    isActive: true,
    maxUsers: 1,
    type: plan.type
  })),
  ...standardSubscriptionPlans.group.map(plan => ({
    id: plan.id,
    name: plan.name,
    price: plan.price,
    priceAnnual: plan.priceAnnual,
    billingCycle: "Monthly/Annual",
    users: plan.id === 'group_small' ? 45 : plan.id === 'group_medium' ? 23 : 17,
    features: plan.features,
    isActive: true,
    maxUsers: plan.maxMembers,
    type: plan.type
  }))
];

const PlansManagement = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  
  const handlePlanAction = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Plan management functionality will be available in the next update.",
    });
  };
  
  const formatPrice = (price: number, cycle?: string) => {
    if (price === 0) return "Free";
    const formattedPrice = `₹${price.toLocaleString()}`;
    if (cycle === "Monthly") return `${formattedPrice}/month`;
    if (cycle === "Annual") return `${formattedPrice}/year`;
    if (cycle === "Monthly/Annual") return `${formattedPrice}/month`;
    return formattedPrice;
  };
  
  // Calculate total revenue
  const calculateMonthlyRevenue = () => {
    return plans.reduce((sum, plan) => {
      if (plan.billingCycle === "Monthly" || plan.billingCycle === "Monthly/Annual") {
        return sum + (plan.price * plan.users);
      } else if (plan.billingCycle === "Annual") {
        return sum + ((plan.priceAnnual || 0) / 12 * plan.users);
      }
      return sum;
    }, 0);
  };
  
  const monthlyRevenue = calculateMonthlyRevenue();
  const totalUsers = plans.reduce((sum, plan) => sum + plan.users, 0);
  const groupUsers = plans
    .filter(p => p.id.startsWith('group_'))
    .reduce((sum, plan) => sum + plan.users, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold">Plan Management</h3>
        <Button className="flex items-center gap-2" onClick={handlePlanAction}>
          <Plus size={16} />
          <span>Create New Plan</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{monthlyRevenue.toLocaleString()}</div>
            <div className="text-xs text-emerald-600 mt-1 flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              ₹{Math.round(monthlyRevenue * 0.05).toLocaleString()} donated to UN Sustainability Goals
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalUsers - plans[0].users).toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Group Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Billing</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Max Users</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {plan.name}
                    {plan.id.startsWith('group_') && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        <Users size={12} className="mr-1" /> Group
                      </Badge>
                    )}
                    {plan.id === 'basic' && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                        Popular
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatPrice(plan.price, plan.billingCycle)}</TableCell>
                <TableCell>{plan.billingCycle}</TableCell>
                <TableCell>{plan.users.toLocaleString()}</TableCell>
                <TableCell>{plan.maxUsers === 1 ? "1" : `${plan.maxUsers} ${plan.id.startsWith('group_') ? "(₹799/user extra)" : ""}`}</TableCell>
                <TableCell>
                  {plan.isActive ? (
                    <div className="flex items-center text-green-600">
                      <Check size={16} className="mr-1" />
                      <span>Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <X size={16} className="mr-1" />
                      <span>Inactive</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedPlan(plan)}>
                          <Edit size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Plan: {plan.name}</DialogTitle>
                          <DialogDescription>
                            This feature is coming soon. You'll be able to edit plan details here.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <h4 className="font-medium mb-2">Features:</h4>
                          <ul className="space-y-1">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setSelectedPlan(null)}>
                            Cancel
                          </Button>
                          <Button type="button" onClick={handlePlanAction}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={handlePlanAction}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card Credit Packs section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Card Credit Packs</h3>
          <Button className="flex items-center gap-2" onClick={handlePlanAction}>
            <Plus size={16} />
            <span>Add Credit Pack</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {creditPacks.map((pack) => (
            <Card key={pack.id}>
              <CardHeader>
                <CardTitle className="text-base">{pack.name}</CardTitle>
                {pack.bestValue && (
                  <Badge className="bg-green-100 text-green-800">Best Value</Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">₹{pack.price}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  For creating {pack.credits} {pack.isExamCredits ? 'exam' : 'concept or flashcards'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 flex items-start gap-2">
          <Heart className="h-5 w-5 text-blue-500 mt-1" />
          <div>
            <h4 className="font-medium text-blue-700 dark:text-blue-400">UN Sustainability Support</h4>
            <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
              5% of all subscription and credit revenue supports UN Sustainability goals for inclusive and equitable quality education.
              This helps provide free access to our platform for underprivileged students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansManagement;
