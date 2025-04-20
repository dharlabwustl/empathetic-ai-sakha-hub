import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { featureService } from "@/services/featureService";
import { PlanType, SubscriptionPlan, SubscriptionInterval } from "@/types/features";

const PlansManagement = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<SubscriptionPlan>>({
    name: "",
    type: PlanType.Basic,
    price: 0,
    interval: SubscriptionInterval.Monthly,
    features: [],
    description: "",
    trialDays: 0
  });

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true);
        const fetchedPlans = await featureService.getSubscriptionPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Error loading plans:", error);
        toast({
          title: "Error",
          description: "Failed to load subscription plans",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPlans();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "price" ? Number(value) : value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setCurrentPlan(plan);
    setFormData({
      id: plan.id,
      name: plan.name,
      type: plan.type,
      price: plan.price,
      interval: plan.interval,
      features: [...plan.features],
      description: plan.description,
      maxUsers: plan.maxUsers,
      trialDays: plan.trialDays
    });
    setShowEditDialog(true);
  };

  const handleSavePlan = async () => {
    try {
      if (!formData.name || !formData.price || !formData.description) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      const updatedPlan = await featureService.updateSubscriptionPlan(formData as SubscriptionPlan);
      
      setPlans(plans.map(plan => plan.id === updatedPlan.id ? updatedPlan : plan));
      
      setShowEditDialog(false);
      toast({
        title: "Success",
        description: "Plan updated successfully"
      });
    } catch (error) {
      console.error("Error updating plan:", error);
      toast({
        title: "Error",
        description: "Failed to update subscription plan",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manage Subscription Plans</h2>
          <p className="text-muted-foreground">Customize your subscription offerings</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setShowAddDialog(true)}>
          <Plus size={16} />
          <span>Add Plan</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <CardHeader className={`
                ${plan.type === PlanType.Premium ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white" : 
                  plan.type === PlanType.Free ? "bg-gray-100" : 
                  plan.type === PlanType.Group ? "bg-blue-50" : 
                  plan.type === PlanType.Institute || plan.type === PlanType.Corporate ? "bg-amber-50" : "bg-gray-50"}
              `}>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={plan.type === PlanType.Premium ? "text-white" : ""}>{plan.name}</CardTitle>
                    <CardDescription className={plan.type === PlanType.Premium ? "text-white/80" : ""}>
                      {plan.type} • {plan.interval}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditPlan(plan)}>
                      <Pencil size={16} className={plan.type === PlanType.Premium ? "text-white" : ""} />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-2xl font-bold">
                  {formatPrice(plan.price)} 
                  <span className="text-sm font-normal">/{plan.interval === SubscriptionInterval.Monthly ? 'month' : 'year'}</span>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <p className="text-sm mb-4">{plan.description}</p>
                
                <div className="space-y-2">
                  {plan.maxUsers && (
                    <div className="text-sm flex items-center gap-2 mb-2">
                      <Badge variant="outline">Up to {plan.maxUsers} users</Badge>
                    </div>
                  )}
                  
                  <h4 className="text-sm font-semibold mb-2">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check size={14} className="text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 5 && (
                      <li className="text-sm text-muted-foreground">+{plan.features.length - 5} more features</li>
                    )}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex justify-end">
                <Button variant="outline" onClick={() => handleEditPlan(plan)}>
                  Edit Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Plan: {currentPlan?.name}</DialogTitle>
            <DialogDescription>
              Make changes to the subscription plan details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  placeholder="e.g. Premium Plan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Plan Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
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
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price || 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interval">Billing Interval</Label>
                <Select 
                  value={formData.interval} 
                  onValueChange={(value) => handleSelectChange("interval", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SubscriptionInterval.Monthly}>Monthly</SelectItem>
                    <SelectItem value={SubscriptionInterval.Yearly}>Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Describe what this plan offers"
                rows={3}
              />
            </div>
            
            {(formData.type === PlanType.Group || 
              formData.type === PlanType.Institute || 
              formData.type === PlanType.Corporate) && (
              <div className="space-y-2">
                <Label htmlFor="maxUsers">Maximum Users</Label>
                <Input
                  id="maxUsers"
                  name="maxUsers"
                  type="number"
                  value={formData.maxUsers || 1}
                  onChange={handleInputChange}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="trialDays">Trial Period (Days)</Label>
              <Input
                id="trialDays"
                name="trialDays"
                type="number"
                value={formData.trialDays || 0}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSavePlan}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlansManagement;
