
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Settings, Eye, Edit, Trash2 } from 'lucide-react';

interface Batch {
  id: string;
  name: string;
  planType: 'individual' | 'group' | 'school' | 'corporate';
  maxMembers: number;
  currentMembers: number;
  createdDate: string;
  status: 'active' | 'inactive' | 'suspended';
  adminId: string;
  features: string[];
}

const BatchManagementTab = () => {
  const { toast } = useToast();
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: '1',
      name: 'IIT-JEE Batch 2024',
      planType: 'group',
      maxMembers: 10,
      currentMembers: 8,
      createdDate: '2024-01-15',
      status: 'active',
      adminId: 'admin1',
      features: ['AI Tutor', 'Study Plans', 'Progress Tracking']
    },
    {
      id: '2',
      name: 'NEET Preparation Group',
      planType: 'school',
      maxMembers: 50,
      currentMembers: 45,
      createdDate: '2024-01-10',
      status: 'active',
      adminId: 'admin2',
      features: ['AI Tutor', 'Study Plans', 'Progress Tracking', 'Advanced Analytics']
    }
  ]);

  const [newBatch, setNewBatch] = useState({
    name: '',
    planType: 'individual' as const,
    maxMembers: 1
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateBatch = () => {
    if (!newBatch.name) {
      toast({
        title: "Error",
        description: "Batch name is required",
        variant: "destructive"
      });
      return;
    }

    const batch: Batch = {
      id: Date.now().toString(),
      name: newBatch.name,
      planType: newBatch.planType,
      maxMembers: newBatch.maxMembers,
      currentMembers: 0,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'active',
      adminId: 'current-admin',
      features: getFeaturesByPlan(newBatch.planType)
    };

    setBatches([...batches, batch]);
    setNewBatch({ name: '', planType: 'individual', maxMembers: 1 });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Batch created successfully",
    });
  };

  const getFeaturesByPlan = (planType: string): string[] => {
    switch (planType) {
      case 'individual':
        return ['Basic Study Plans'];
      case 'group':
        return ['AI Tutor', 'Study Plans', 'Progress Tracking'];
      case 'school':
        return ['AI Tutor', 'Study Plans', 'Progress Tracking', 'Advanced Analytics', 'Bulk Management'];
      case 'corporate':
        return ['AI Tutor', 'Study Plans', 'Progress Tracking', 'Advanced Analytics', 'Bulk Management', 'Custom Branding'];
      default:
        return [];
    }
  };

  const getMaxMembersByPlan = (planType: string): number => {
    switch (planType) {
      case 'individual':
        return 1;
      case 'group':
        return 10;
      case 'school':
        return 100;
      case 'corporate':
        return 500;
      default:
        return 1;
    }
  };

  const handlePlanTypeChange = (planType: string) => {
    setNewBatch({
      ...newBatch,
      planType: planType as any,
      maxMembers: getMaxMembersByPlan(planType)
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Batch Management</h2>
          <p className="text-gray-600">Create and manage study batches with different subscription capabilities</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Batch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="batchName">Batch Name</Label>
                <Input
                  id="batchName"
                  value={newBatch.name}
                  onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                  placeholder="Enter batch name"
                />
              </div>
              
              <div>
                <Label htmlFor="planType">Plan Type</Label>
                <Select value={newBatch.planType} onValueChange={handlePlanTypeChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual (1 member)</SelectItem>
                    <SelectItem value="group">Group (up to 10 members)</SelectItem>
                    <SelectItem value="school">School (up to 100 members)</SelectItem>
                    <SelectItem value="corporate">Corporate (up to 500 members)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Features Included</Label>
                <div className="mt-2 space-y-1">
                  {getFeaturesByPlan(newBatch.planType).map((feature, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button onClick={handleCreateBatch} className="w-full">
                Create Batch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Active Batches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch Name</TableHead>
                    <TableHead>Plan Type</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-medium">{batch.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{batch.planType}</Badge>
                      </TableCell>
                      <TableCell>
                        {batch.currentMembers}/{batch.maxMembers}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(batch.status)}>
                          {batch.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{batch.createdDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Batches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{batches.length}</div>
                <p className="text-sm text-gray-600">Active batches</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {batches.reduce((sum, batch) => sum + batch.currentMembers, 0)}
                </div>
                <p className="text-sm text-gray-600">Across all batches</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Capacity Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round((batches.reduce((sum, batch) => sum + batch.currentMembers, 0) / 
                    batches.reduce((sum, batch) => sum + batch.maxMembers, 0)) * 100)}%
                </div>
                <p className="text-sm text-gray-600">Overall utilization</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Batch Management Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Auto-approve new members</Label>
                    <Select defaultValue="manual">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Automatic</SelectItem>
                        <SelectItem value="manual">Manual approval</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Default batch size</Label>
                    <Select defaultValue="10">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 members</SelectItem>
                        <SelectItem value="10">10 members</SelectItem>
                        <SelectItem value="25">25 members</SelectItem>
                        <SelectItem value="50">50 members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BatchManagementTab;
