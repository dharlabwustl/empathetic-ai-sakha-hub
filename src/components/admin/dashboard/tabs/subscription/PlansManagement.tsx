
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Users, User, Building, Building2 } from "lucide-react";
import { PlanType, SubscriptionPlan, featureService } from "@/services/featureService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

const PlansManagement = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [isCreatingNewPlan, setIsCreatingNewPlan] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const loadedPlans = await featureService.getSubscriptionPlans();
        setPlans(loadedPlans);
      } catch (error) {
        console.error("Error loading subscription plans:", error);
        toast({
          title: "Error",
          description: "Failed to load subscription plans",
          variant: "destructive"
        });
      }
    };
    
    loadPlans();
  }, [toast]);
  
  const handleEditPlan = (plan: SubscriptionPlan) => {
    setCurrentPlan(plan);
    setIsCreatingNewPlan(false);
    setIsDialogOpen(true);
  };
  
  const handleCreatePlan = () => {
    setCurrentPlan({
      id: "",
      name: "",
      type: PlanType.Basic,
      price: 0,
      interval: SubscriptionInterval.Monthly,
      features: [],
      description: ""
    });
    setIsCreatingNewPlan(true);
    setIsDialogOpen(true);
  };
  
  const handleSavePlan = async () => {
    if (!currentPlan) return;
    
    try {
      let updatedPlan;
      if (isCreatingNewPlan) {
        // In a real app, this would create a new plan in the database
        updatedPlan = { ...currentPlan, id: `plan-${Date.now()}` };
        setPlans([...plans, updatedPlan]);
      } else {
        // Update existing plan
        updatedPlan = await featureService.updateSubscriptionPlan(currentPlan);
        setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
      }
      
      toast({
        title: isCreatingNewPlan ? "Plan Created" : "Plan Updated",
        description: `Successfully ${isCreatingNewPlan ? 'created' : 'updated'} ${currentPlan.name}`,
        variant: "default"
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving plan:", error);
      toast({
        title: "Error",
        description: `Failed to ${isCreatingNewPlan ? 'create' : 'update'} plan`,
        variant: "destructive"
      });
    }
  };
  
  const handlePlanChange = (field: keyof SubscriptionPlan, value: any) => {
    if (!currentPlan) return;
    setCurrentPlan({ ...currentPlan, [field]: value });
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-bold">Subscription Plans</h3>
        <Button className="flex items-center gap-2" onClick={handleCreatePlan}>
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
            {plans.map((plan, index) => (
              <TableRow key={plan.id || index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
                      {getPlanIcon(plan.type)}
                    </div>
                    <span>
                      {plan.type}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell className="max-w-xs truncate">{plan.description}</TableCell>
                <TableCell>{plan.features.length} features</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEditPlan(plan)}>
                    <Edit size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit/Create Plan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isCreatingNewPlan ? "Create New Plan" : "Edit Plan"}</DialogTitle>
            <DialogDescription>
              {isCreatingNewPlan ? "Create a new subscription plan" : "Make changes to the subscription plan here"}
            </DialogDescription>
          </DialogHeader>
          
          {currentPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="plan-name"
                  value={currentPlan.name}
                  onChange={(e) => handlePlanChange("name", e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={currentPlan.type} 
                  onValueChange={(value) => handlePlanChange("type", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select plan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PlanType.Free}>Free</SelectItem>
                    <SelectItem value={PlanType.Basic}>Basic</SelectItem>
                    <SelectItem value={PlanType.Premium}>Premium</SelectItem>
                    <SelectItem value={PlanType.Group}>Group</SelectItem>
                    <SelectItem value={PlanType.Institute}>Institute</SelectItem>
                    <SelectItem value={PlanType.Corporate}>Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-price" className="text-right">
                  Price
                </Label>
                <Input
                  id="plan-price"
                  type="number"
                  value={currentPlan.price}
                  onChange={(e) => handlePlanChange("price", Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-interval" className="text-right">
                  Interval
                </Label>
                <Select 
                  value={currentPlan.interval} 
                  onValueChange={(value: SubscriptionInterval) => handlePlanChange("interval", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select billing interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SubscriptionInterval.Monthly}>Monthly</SelectItem>
                    <SelectItem value={SubscriptionInterval.Yearly}>Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="plan-description"
                  value={currentPlan.description}
                  onChange={(e) => handlePlanChange("description", e.target.value)}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePlan}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlansManagement;
