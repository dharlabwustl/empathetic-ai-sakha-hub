
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Check, X, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

interface Plan {
  id: number;
  name: string;
  price: number | "Custom";
  billingCycle: "Monthly" | "Annual" | "N/A";
  users: number;
  features: string[];
  isActive: boolean;
  featureDetails?: PlanFeature[];
}

const PlansManagement: React.FC = () => {
  const { toast } = useToast();
  
  const [plans, setPlans] = useState<Plan[]>([
    { 
      id: 1, 
      name: "Free", 
      price: 0, 
      billingCycle: "N/A", 
      users: 120, 
      features: ["Basic Content Access", "Limited Practice Tests", "Community Access"],
      isActive: true,
      featureDetails: [
        { id: "f1", name: "Basic Content Access", included: true },
        { id: "f2", name: "Limited Practice Tests", included: true },
        { id: "f3", name: "Community Access", included: true },
        { id: "f4", name: "Personalized Study Plan", included: false },
        { id: "f5", name: "Progress Tracking", included: false },
        { id: "f6", name: "1-on-1 Tutoring", included: false },
      ]
    },
    { 
      id: 2, 
      name: "Basic", 
      price: 9.99, 
      billingCycle: "Monthly", 
      users: 78, 
      features: ["All Free Features", "Unlimited Practice Tests", "Personalized Study Plan", "Progress Tracking"],
      isActive: true,
      featureDetails: [
        { id: "f1", name: "Basic Content Access", included: true },
        { id: "f2", name: "Unlimited Practice Tests", included: true },
        { id: "f3", name: "Community Access", included: true },
        { id: "f4", name: "Personalized Study Plan", included: true },
        { id: "f5", name: "Progress Tracking", included: true },
        { id: "f6", name: "1-on-1 Tutoring", included: false },
      ]
    },
    { 
      id: 3, 
      name: "Premium", 
      price: 19.99, 
      billingCycle: "Monthly", 
      users: 45, 
      features: ["All Basic Features", "1-on-1 Tutoring", "Advanced Analytics", "Exam Simulations"],
      isActive: true,
      featureDetails: [
        { id: "f1", name: "Basic Content Access", included: true },
        { id: "f2", name: "Unlimited Practice Tests", included: true },
        { id: "f3", name: "Community Access", included: true },
        { id: "f4", name: "Personalized Study Plan", included: true },
        { id: "f5", name: "Progress Tracking", included: true },
        { id: "f6", name: "1-on-1 Tutoring", included: true },
        { id: "f7", name: "Advanced Analytics", included: true },
        { id: "f8", name: "Exam Simulations", included: true },
      ]
    },
    { 
      id: 4, 
      name: "Ultimate", 
      price: 29.99, 
      billingCycle: "Monthly", 
      users: 23, 
      features: ["All Premium Features", "Priority Support", "Personalized AI Tutor", "Unlimited Resources"],
      isActive: true,
      featureDetails: [
        { id: "f1", name: "Basic Content Access", included: true },
        { id: "f2", name: "Unlimited Practice Tests", included: true },
        { id: "f3", name: "Community Access", included: true },
        { id: "f4", name: "Personalized Study Plan", included: true },
        { id: "f5", name: "Progress Tracking", included: true },
        { id: "f6", name: "1-on-1 Tutoring", included: true },
        { id: "f7", name: "Advanced Analytics", included: true },
        { id: "f8", name: "Exam Simulations", included: true },
        { id: "f9", name: "Priority Support", included: true },
        { id: "f10", name: "Personalized AI Tutor", included: true },
        { id: "f11", name: "Unlimited Resources", included: true },
      ]
    },
    { 
      id: 5, 
      name: "Enterprise", 
      price: "Custom", 
      billingCycle: "Annual", 
      users: 2, 
      features: ["All Ultimate Features", "Dedicated Support Manager", "Custom Content", "API Access"],
      isActive: false,
      featureDetails: [
        { id: "f1", name: "Basic Content Access", included: true },
        { id: "f2", name: "Unlimited Practice Tests", included: true },
        { id: "f3", name: "Community Access", included: true },
        { id: "f4", name: "Personalized Study Plan", included: true },
        { id: "f5", name: "Progress Tracking", included: true },
        { id: "f6", name: "1-on-1 Tutoring", included: true },
        { id: "f7", name: "Advanced Analytics", included: true },
        { id: "f8", name: "Exam Simulations", included: true },
        { id: "f9", name: "Priority Support", included: true },
        { id: "f10", name: "Personalized AI Tutor", included: true },
        { id: "f11", name: "Unlimited Resources", included: true },
        { id: "f12", name: "Dedicated Support Manager", included: true },
        { id: "f13", name: "Custom Content", included: true },
        { id: "f14", name: "API Access", included: true },
      ]
    }
  ]);
  
  const [editPlanId, setEditPlanId] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  
  const handleTogglePlanStatus = (planId: number) => {
    setPlans(plans.map(plan => 
      plan.id === planId ? { ...plan, isActive: !plan.isActive } : plan
    ));
    
    toast({
      title: "Plan status updated",
      description: `Plan has been ${plans.find(p => p.id === planId)?.isActive ? 'disabled' : 'activated'}.`
    });
  };
  
  const handleEditPlan = (planId: number) => {
    setEditPlanId(planId);
    setIsEditDialogOpen(true);
  };
  
  const handleSavePlan = () => {
    setIsEditDialogOpen(false);
    setIsAddPlanDialogOpen(false);
    
    toast({
      title: "Plan saved",
      description: "The subscription plan has been updated successfully."
    });
  };
  
  const handleDeletePlan = (planId: number) => {
    // In a real app, show a confirmation dialog and delete
    setPlans(plans.filter(plan => plan.id !== planId));
    
    toast({
      title: "Plan deleted",
      description: "The subscription plan has been deleted successfully.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Subscription Plans</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setIsFeatureDialogOpen(true)}
          >
            Manage Features
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setIsAddPlanDialogOpen(true)}>
            <Plus size={16} />
            <span>Add New Plan</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>
                    {typeof plan.price === 'number' ? 
                      plan.price === 0 ? 'Free' : `$${plan.price.toFixed(2)}` : 
                      plan.price}
                  </TableCell>
                  <TableCell>{plan.billingCycle}</TableCell>
                  <TableCell>{plan.users}</TableCell>
                  <TableCell>
                    {plan.isActive ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {plan.features.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleTogglePlanStatus(plan.id)}>
                        {plan.isActive ? (
                          <X className="h-4 w-4 text-red-500" />
                        ) : (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditPlan(plan.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-500"
                        disabled={plan.id === 1} // Can't delete Free plan
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Edit Plan Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>
              Update the details of the subscription plan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                placeholder="Enter plan name"
                defaultValue={editPlanId ? plans.find(p => p.id === editPlanId)?.name : ''}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="0.00"
                  type="number"
                  defaultValue={
                    editPlanId ? 
                    (typeof plans.find(p => p.id === editPlanId)?.price === 'number' ? 
                    plans.find(p => p.id === editPlanId)?.price : '') : ''
                  }
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="billing">Billing Cycle</Label>
                <select 
                  id="billing" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  defaultValue={editPlanId ? plans.find(p => p.id === editPlanId)?.billingCycle : 'Monthly'}
                >
                  <option>Monthly</option>
                  <option>Annual</option>
                  <option>N/A</option>
                </select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Features</Label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                {editPlanId && plans.find(p => p.id === editPlanId)?.featureDetails?.map(feature => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`feature-${feature.id}`} 
                      defaultChecked={feature.included}
                    />
                    <Label htmlFor={`feature-${feature.id}`} className="text-sm">
                      {feature.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="active" 
                defaultChecked={editPlanId ? plans.find(p => p.id === editPlanId)?.isActive : true}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePlan}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Plan Dialog */}
      <Dialog open={isAddPlanDialogOpen} onOpenChange={setIsAddPlanDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Subscription Plan</DialogTitle>
            <DialogDescription>
              Create a new subscription plan for your users.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="new-name">Plan Name</Label>
              <Input id="new-name" placeholder="Enter plan name" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-price">Price</Label>
                <Input id="new-price" placeholder="0.00" type="number" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="new-billing">Billing Cycle</Label>
                <select 
                  id="new-billing" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  defaultValue="Monthly"
                >
                  <option>Monthly</option>
                  <option>Annual</option>
                  <option>N/A</option>
                </select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Features</Label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                {[
                  "Basic Content Access",
                  "Practice Tests",
                  "Community Access",
                  "Personalized Study Plan",
                  "Progress Tracking",
                  "1-on-1 Tutoring",
                  "Advanced Analytics",
                  "Exam Simulations",
                  "Priority Support",
                  "Personalized AI Tutor",
                  "Unlimited Resources"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox id={`new-feature-${idx}`} />
                    <Label htmlFor={`new-feature-${idx}`} className="text-sm">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="new-active" defaultChecked />
              <Label htmlFor="new-active">Active</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPlanDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePlan}>
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Manage Features Dialog */}
      <Dialog open={isFeatureDialogOpen} onOpenChange={setIsFeatureDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Plan Features</DialogTitle>
            <DialogDescription>
              Add or edit features that can be included in subscription plans.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Features List</Label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-2">
                {[
                  "Basic Content Access",
                  "Limited Practice Tests",
                  "Community Access",
                  "Personalized Study Plan",
                  "Progress Tracking",
                  "1-on-1 Tutoring",
                  "Advanced Analytics",
                  "Exam Simulations",
                  "Priority Support",
                  "Personalized AI Tutor",
                  "Unlimited Resources",
                  "Dedicated Support Manager",
                  "Custom Content",
                  "API Access"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b last:border-0">
                    <span className="text-sm">{feature}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input placeholder="New feature name" />
              <Button>Add</Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsFeatureDialogOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlansManagement;
