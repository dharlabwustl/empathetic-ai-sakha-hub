
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, Edit, Trash2, Check, X, Save, 
  CreditCard, Users, Zap, CheckCircle, Activity 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionType } from "@/types/user/subscription";
import { Badge } from "@/components/ui/badge";

interface Plan {
  id: number;
  name: string;
  price: number | 'Custom';
  billingCycle: string;
  users: number;
  features: string[];
  isActive: boolean;
  type: SubscriptionType;
}

interface UsageStat {
  planId: number;
  totalUsers: number;
  activeUsers: number;
  monthlyRevenue: number;
  avgUserRetention: number;
}

const mockUsageStats: UsageStat[] = [
  { planId: 1, totalUsers: 120, activeUsers: 110, monthlyRevenue: 0, avgUserRetention: 85 },
  { planId: 2, totalUsers: 78, activeUsers: 65, monthlyRevenue: 779.22, avgUserRetention: 75 },
  { planId: 3, totalUsers: 45, activeUsers: 40, monthlyRevenue: 899.55, avgUserRetention: 80 },
  { planId: 4, totalUsers: 23, activeUsers: 22, monthlyRevenue: 689.77, avgUserRetention: 90 },
  { planId: 5, totalUsers: 2, activeUsers: 2, monthlyRevenue: 1000, avgUserRetention: 100 },
];

const SubscriptionManager: React.FC = () => {
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
      type: SubscriptionType.FREE
    },
    { 
      id: 2, 
      name: "Basic", 
      price: 9.99, 
      billingCycle: "Monthly", 
      users: 78, 
      features: ["All Free Features", "Unlimited Practice Tests", "Personalized Study Plan", "Progress Tracking"],
      isActive: true,
      type: SubscriptionType.BASIC
    },
    { 
      id: 3, 
      name: "Premium", 
      price: 19.99, 
      billingCycle: "Monthly", 
      users: 45, 
      features: ["All Basic Features", "1-on-1 Tutoring", "Advanced Analytics", "Exam Simulations"],
      isActive: true,
      type: SubscriptionType.PREMIUM
    },
    { 
      id: 4, 
      name: "Pro", 
      price: 29.99, 
      billingCycle: "Monthly", 
      users: 23, 
      features: ["All Premium Features", "Priority Support", "Personalized AI Tutor", "Unlimited Resources"],
      isActive: true,
      type: SubscriptionType.PRO
    },
    { 
      id: 5, 
      name: "Enterprise", 
      price: "Custom", 
      billingCycle: "Annual", 
      users: 2, 
      features: ["All Pro Features", "Dedicated Support Manager", "Custom Content", "API Access"],
      isActive: false,
      type: SubscriptionType.ENTERPRISE
    }
  ]);

  const [showAddPlanDialog, setShowAddPlanDialog] = useState(false);
  const [showEditPlanDialog, setShowEditPlanDialog] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    name: '',
    price: 0,
    billingCycle: 'Monthly',
    features: [],
    isActive: true,
    type: SubscriptionType.BASIC
  });
  const [newFeature, setNewFeature] = useState('');
  const [planToDelete, setPlanToDelete] = useState<number | null>(null);

  // Calculate total subscribed users and revenue
  const totalUsers = plans.reduce((sum, plan) => sum + plan.users, 0);
  const monthlyRevenue = plans.reduce((sum, plan) => {
    if (typeof plan.price === 'number') {
      return sum + (plan.price * plan.users);
    }
    return sum;
  }, 0);

  const handleAddFeature = () => {
    if (newFeature.trim() === '') return;
    
    if (currentPlan) {
      // Editing existing plan
      setCurrentPlan({
        ...currentPlan,
        features: [...currentPlan.features, newFeature]
      });
    } else {
      // Adding new plan
      setNewPlan({
        ...newPlan,
        features: [...(newPlan.features || []), newFeature]
      });
    }
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    if (currentPlan) {
      // Editing existing plan
      const updatedFeatures = [...currentPlan.features];
      updatedFeatures.splice(index, 1);
      setCurrentPlan({
        ...currentPlan,
        features: updatedFeatures
      });
    } else {
      // Adding new plan
      const updatedFeatures = [...(newPlan.features || [])];
      updatedFeatures.splice(index, 1);
      setNewPlan({
        ...newPlan,
        features: updatedFeatures
      });
    }
  };

  const handleAddPlan = () => {
    const newId = Math.max(0, ...plans.map(p => p.id)) + 1;
    const finalPlan: Plan = {
      id: newId,
      name: newPlan.name || 'New Plan',
      price: newPlan.price || 0,
      billingCycle: newPlan.billingCycle || 'Monthly',
      users: 0,
      features: newPlan.features || [],
      isActive: newPlan.isActive === undefined ? true : newPlan.isActive,
      type: newPlan.type || SubscriptionType.BASIC
    };
    
    setPlans([...plans, finalPlan]);
    setShowAddPlanDialog(false);
    setNewPlan({
      name: '',
      price: 0,
      billingCycle: 'Monthly',
      features: [],
      isActive: true,
      type: SubscriptionType.BASIC
    });
    
    toast({
      title: "Plan Added",
      description: `${finalPlan.name} has been added successfully.`
    });
  };

  const handleUpdatePlan = () => {
    if (!currentPlan) return;
    
    setPlans(plans.map(p => p.id === currentPlan.id ? currentPlan : p));
    setShowEditPlanDialog(false);
    setCurrentPlan(null);
    
    toast({
      title: "Plan Updated",
      description: `${currentPlan.name} has been updated successfully.`
    });
  };

  const handleEditPlan = (plan: Plan) => {
    setCurrentPlan({...plan});
    setShowEditPlanDialog(true);
  };

  const handleDeletePlan = (id: number) => {
    setPlanToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeletePlan = () => {
    if (planToDelete === null) return;
    
    const planName = plans.find(p => p.id === planToDelete)?.name || 'Plan';
    setPlans(plans.filter(p => p.id !== planToDelete));
    setShowDeleteConfirmation(false);
    setPlanToDelete(null);
    
    toast({
      title: "Plan Deleted",
      description: `${planName} has been deleted successfully.`
    });
  };

  const getPlanUsageStats = (planId: number): UsageStat | undefined => {
    return mockUsageStats.find(stat => stat.planId === planId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Subscription Plans</h2>
        <Button className="flex items-center gap-2" onClick={() => setShowAddPlanDialog(true)}>
          <Plus className="h-4 w-4" />
          Add New Plan
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{totalUsers}</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Across all subscription plans
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 text-green-500 mr-2" />
              <div className="text-2xl font-bold">${monthlyRevenue.toFixed(2)}</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-500">↑ 12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-emerald-500 mr-2" />
              <div className="text-2xl font-bold">{plans.filter(p => p.isActive).length}</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Out of {plans.length} total plans
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-purple-500 mr-2" />
              <div className="text-2xl font-bold">78.5%</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Average across all plans
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>Manage your subscription plans and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => {
                  const usageStats = getPlanUsageStats(plan.id);
                  return (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>{typeof plan.price === 'number' ? `$${plan.price}` : plan.price}</TableCell>
                      <TableCell>{plan.billingCycle}</TableCell>
                      <TableCell>
                        <div>
                          {plan.users}
                          {usageStats && (
                            <div className="text-xs text-muted-foreground">
                              {usageStats.activeUsers} active ({Math.round(usageStats.activeUsers / plan.users * 100)}%)
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {plan.isActive ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                            <Check className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            <X className="h-3 w-3 mr-1" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="truncate">{plan.features.join(", ")}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditPlan(plan)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeletePlan(plan.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Plan Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Usage Statistics</CardTitle>
          <CardDescription>Detailed metrics for each subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {plans.map((plan) => {
              const usageStat = getPlanUsageStats(plan.id);
              if (!usageStat) return null;
              
              return (
                <div key={`stats-${plan.id}`} className="border rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">{plan.name} Plan</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-xl font-semibold">{usageStat.totalUsers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-xl font-semibold">
                        {usageStat.activeUsers} 
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          ({Math.round(usageStat.activeUsers / usageStat.totalUsers * 100)}%)
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="text-xl font-semibold">${usageStat.monthlyRevenue.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">User Retention</p>
                      <p className="text-xl font-semibold">{usageStat.avgUserRetention}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Add Plan Dialog */}
      <Dialog open={showAddPlanDialog} onOpenChange={setShowAddPlanDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Subscription Plan</DialogTitle>
            <DialogDescription>Create a new subscription plan for your users.</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Plan Name</label>
              <Input 
                id="name" 
                value={newPlan.name || ''} 
                onChange={(e) => setNewPlan({...newPlan, name: e.target.value})} 
                placeholder="e.g. Premium Plan"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="price" className="text-sm font-medium">Price</label>
                <Input 
                  id="price" 
                  type="number"
                  value={typeof newPlan.price === 'number' ? newPlan.price : 0} 
                  onChange={(e) => setNewPlan({...newPlan, price: parseFloat(e.target.value)})} 
                  placeholder="0.00"
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Billing Cycle</label>
                <ToggleGroup type="single" value={newPlan.billingCycle} onValueChange={(value) => value && setNewPlan({...newPlan, billingCycle: value})}>
                  <ToggleGroupItem value="Monthly">Monthly</ToggleGroupItem>
                  <ToggleGroupItem value="Annual">Annual</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Status</label>
              <ToggleGroup type="single" value={newPlan.isActive ? "active" : "inactive"} onValueChange={(value) => value && setNewPlan({...newPlan, isActive: value === "active"})}>
                <ToggleGroupItem value="active">Active</ToggleGroupItem>
                <ToggleGroupItem value="inactive">Inactive</ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Features</label>
              <div className="flex gap-2">
                <Input 
                  value={newFeature} 
                  onChange={(e) => setNewFeature(e.target.value)} 
                  placeholder="Add a feature"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                />
                <Button type="button" onClick={handleAddFeature}>Add</Button>
              </div>
              
              <div className="mt-2">
                {(newPlan.features || []).map((feature, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md mb-1">
                    <span>{feature}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveFeature(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPlanDialog(false)}>Cancel</Button>
            <Button onClick={handleAddPlan}>Save Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Plan Dialog */}
      <Dialog open={showEditPlanDialog} onOpenChange={setShowEditPlanDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>Update the details of this subscription plan.</DialogDescription>
          </DialogHeader>
          
          {currentPlan && (
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-name" className="text-sm font-medium">Plan Name</label>
                <Input 
                  id="edit-name" 
                  value={currentPlan.name} 
                  onChange={(e) => setCurrentPlan({...currentPlan, name: e.target.value})} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="edit-price" className="text-sm font-medium">Price</label>
                  <Input 
                    id="edit-price" 
                    type="number"
                    value={typeof currentPlan.price === 'number' ? currentPlan.price : 0} 
                    onChange={(e) => setCurrentPlan({...currentPlan, price: parseFloat(e.target.value)})} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Billing Cycle</label>
                  <ToggleGroup type="single" value={currentPlan.billingCycle} onValueChange={(value) => value && setCurrentPlan({...currentPlan, billingCycle: value})}>
                    <ToggleGroupItem value="Monthly">Monthly</ToggleGroupItem>
                    <ToggleGroupItem value="Annual">Annual</ToggleGroupItem>
                    <ToggleGroupItem value="N/A">N/A</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Status</label>
                <ToggleGroup type="single" value={currentPlan.isActive ? "active" : "inactive"} onValueChange={(value) => value && setCurrentPlan({...currentPlan, isActive: value === "active"})}>
                  <ToggleGroupItem value="active">Active</ToggleGroupItem>
                  <ToggleGroupItem value="inactive">Inactive</ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Features</label>
                <div className="flex gap-2">
                  <Input 
                    value={newFeature} 
                    onChange={(e) => setNewFeature(e.target.value)} 
                    placeholder="Add a feature"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  />
                  <Button type="button" onClick={handleAddFeature}>Add</Button>
                </div>
                
                <div className="mt-2">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md mb-1">
                      <span>{feature}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveFeature(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditPlanDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdatePlan}>Update Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subscription plan? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeletePlan}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionManager;
