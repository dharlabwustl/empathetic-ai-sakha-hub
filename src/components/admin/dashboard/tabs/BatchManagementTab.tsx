
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Users, Plus, Search, MoreHorizontal, Crown, UserPlus, Settings, TrendingUp, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: 'leader' | 'member';
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
  progress: number;
  lastActive: string;
}

interface Batch {
  id: string;
  name: string;
  planType: 'group' | 'school' | 'corporate';
  maxMembers: number;
  currentMembers: number;
  status: 'active' | 'inactive' | 'expired';
  createdDate: string;
  expiryDate: string;
  revenue: number;
  members: BatchMember[];
  owner: {
    name: string;
    email: string;
  };
}

const mockBatches: Batch[] = [
  {
    id: 'batch-001',
    name: 'IIT JEE Prep Group 2024',
    planType: 'group',
    maxMembers: 5,
    currentMembers: 4,
    status: 'active',
    createdDate: '2024-01-10',
    expiryDate: '2024-12-31',
    revenue: 2999,
    owner: { name: 'Aryan Sharma', email: 'aryan@example.com' },
    members: [
      {
        id: 'mem-001',
        name: 'Aryan Sharma',
        email: 'aryan@example.com',
        role: 'leader',
        status: 'active',
        joinDate: '2024-01-10',
        progress: 78,
        lastActive: '2024-01-20'
      },
      {
        id: 'mem-002',
        name: 'Priya Patel',
        email: 'priya@example.com',
        role: 'member',
        status: 'active',
        joinDate: '2024-01-12',
        progress: 65,
        lastActive: '2024-01-19'
      }
    ]
  },
  {
    id: 'batch-002',
    name: 'NEET Medical Prep',
    planType: 'group',
    maxMembers: 10,
    currentMembers: 8,
    status: 'active',
    createdDate: '2024-01-05',
    expiryDate: '2024-12-31',
    revenue: 4999,
    owner: { name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com' },
    members: []
  },
  {
    id: 'batch-003',
    name: 'Delhi Public School - Class 12',
    planType: 'school',
    maxMembers: 50,
    currentMembers: 45,
    status: 'active',
    createdDate: '2024-01-01',
    expiryDate: '2024-12-31',
    revenue: 25000,
    owner: { name: 'Principal Sharma', email: 'principal@dps.edu' },
    members: []
  }
];

const BatchManagementTab: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const filteredBatches = batches.filter(batch =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.planType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = batches.reduce((sum, batch) => sum + batch.revenue, 0);
  const totalMembers = batches.reduce((sum, batch) => sum + batch.currentMembers, 0);
  const activeBatches = batches.filter(batch => batch.status === 'active').length;

  const handleCreateBatch = () => {
    const newBatch: Batch = {
      id: `batch-${Date.now()}`,
      name: 'New Study Group',
      planType: 'group',
      maxMembers: 5,
      currentMembers: 1,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      revenue: 999,
      owner: { name: 'Admin Created', email: 'admin@example.com' },
      members: []
    };

    setBatches([...batches, newBatch]);
    toast({
      title: "Batch Created",
      description: "New batch has been created successfully",
    });
  };

  const handleDeleteBatch = (batchId: string) => {
    setBatches(batches.filter(batch => batch.id !== batchId));
    toast({
      title: "Batch Deleted",
      description: "Batch has been deleted successfully",
    });
  };

  const handleAddMember = (batchId: string, email: string) => {
    const updatedBatches = batches.map(batch => {
      if (batch.id === batchId && batch.currentMembers < batch.maxMembers) {
        const newMember: BatchMember = {
          id: `mem-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: 'member',
          status: 'pending',
          joinDate: new Date().toISOString().split('T')[0],
          progress: 0,
          lastActive: new Date().toISOString().split('T')[0]
        };
        
        return {
          ...batch,
          currentMembers: batch.currentMembers + 1,
          members: [...batch.members, newMember]
        };
      }
      return batch;
    });

    setBatches(updatedBatches);
    toast({
      title: "Member Added",
      description: `${email} has been invited to the batch`,
    });
  };

  const getPlanTypeColor = (planType: string) => {
    switch (planType) {
      case 'group': return 'bg-blue-100 text-blue-800';
      case 'school': return 'bg-green-100 text-green-800';
      case 'corporate': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Batch Management</h2>
          <p className="text-muted-foreground">Manage student batches and group subscriptions</p>
        </div>
        <Button onClick={handleCreateBatch} className="flex items-center gap-2">
          <Plus size={16} />
          Create New Batch
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batches.length}</div>
            <div className="text-xs text-green-600 mt-1">+2 this month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBatches}</div>
            <div className="text-xs text-blue-600 mt-1">{Math.round((activeBatches/batches.length)*100)}% active</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <div className="text-xs text-purple-600 mt-1">Across all batches</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Batch Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">+15% this month</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="batches">All Batches</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search batches..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch) => (
              <Card key={batch.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{batch.name}</CardTitle>
                    <Badge className={getPlanTypeColor(batch.planType)}>
                      {batch.planType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {batch.currentMembers}/{batch.maxMembers} members
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Owner</span>
                      <span className="text-sm text-muted-foreground">{batch.owner.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Revenue</span>
                      <span className="text-sm font-bold text-green-600">₹{batch.revenue}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Created</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(batch.createdDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(batch.currentMembers / batch.maxMembers) * 100}%` }}
                      />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="flex-1">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{batch.name}</DialogTitle>
                            <DialogDescription>
                              Batch details and member management
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Plan Type</label>
                                <p className="text-sm text-muted-foreground">{batch.planType}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Status</label>
                                <p className="text-sm text-muted-foreground">{batch.status}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Max Members</label>
                                <p className="text-sm text-muted-foreground">{batch.maxMembers}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Current Members</label>
                                <p className="text-sm text-muted-foreground">{batch.currentMembers}</p>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block">Members</label>
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {batch.members.map((member) => (
                                  <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.email}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {member.role === 'leader' && (
                                        <Crown className="h-4 w-4 text-amber-500" />
                                      )}
                                      <Badge variant="outline">{member.status}</Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Input 
                                placeholder="Enter email to add member"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    const email = (e.target as HTMLInputElement).value;
                                    if (email) {
                                      handleAddMember(batch.id, email);
                                      (e.target as HTMLInputElement).value = '';
                                    }
                                  }
                                }}
                              />
                              <Button size="sm">
                                <UserPlus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="destructive" onClick={() => handleDeleteBatch(batch.id)}>
                              Delete Batch
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteBatch(batch.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="batches">
          <Card>
            <CardHeader>
              <CardTitle>All Batches</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Plan Type</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBatches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-medium">{batch.name}</TableCell>
                      <TableCell>
                        <Badge className={getPlanTypeColor(batch.planType)}>
                          {batch.planType}
                        </Badge>
                      </TableCell>
                      <TableCell>{batch.currentMembers}/{batch.maxMembers}</TableCell>
                      <TableCell>₹{batch.revenue}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(batch.status)}>
                          {batch.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{batch.owner.name}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Batch Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Month</span>
                    <span className="text-lg font-bold text-green-600">+2 batches</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Month</span>
                    <span className="text-lg font-bold">+1 batch</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Growth Rate</span>
                    <span className="text-lg font-bold text-blue-600">+100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Group Plans</span>
                    <span className="text-lg font-bold">₹{batches.filter(b => b.planType === 'group').reduce((sum, b) => sum + b.revenue, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">School Plans</span>
                    <span className="text-lg font-bold">₹{batches.filter(b => b.planType === 'school').reduce((sum, b) => sum + b.revenue, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Corporate Plans</span>
                    <span className="text-lg font-bold">₹{batches.filter(b => b.planType === 'corporate').reduce((sum, b) => sum + b.revenue, 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BatchManagementTab;
