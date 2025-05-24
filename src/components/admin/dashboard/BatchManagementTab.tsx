
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';

interface Batch {
  id: string;
  name: string;
  planType: string;
  memberCount: number;
  maxMembers: number;
  createdDate: string;
  status: 'active' | 'inactive' | 'expired';
  leader: string;
  examGoal: string;
}

const BatchManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: '1',
      name: 'JEE Main 2024 Batch',
      planType: 'group',
      memberCount: 8,
      maxMembers: 10,
      createdDate: '2024-01-15',
      status: 'active',
      leader: 'Raj Patel',
      examGoal: 'JEE Main'
    },
    {
      id: '2',
      name: 'NEET Prep Group',
      planType: 'group',
      memberCount: 5,
      maxMembers: 8,
      createdDate: '2024-01-20',
      status: 'active',
      leader: 'Priya Sharma',
      examGoal: 'NEET'
    },
    {
      id: '3',
      name: 'CAT 2024 Study Circle',
      planType: 'premium',
      memberCount: 12,
      maxMembers: 15,
      createdDate: '2024-01-10',
      status: 'active',
      leader: 'Arjun Kumar',
      examGoal: 'CAT'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newBatch, setNewBatch] = useState({
    name: '',
    planType: 'group',
    maxMembers: 10,
    examGoal: '',
    leader: ''
  });

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         batch.leader.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateBatch = () => {
    const batch: Batch = {
      id: (batches.length + 1).toString(),
      name: newBatch.name,
      planType: newBatch.planType,
      memberCount: 1,
      maxMembers: newBatch.maxMembers,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'active',
      leader: newBatch.leader,
      examGoal: newBatch.examGoal
    };

    setBatches([...batches, batch]);
    setIsCreateDialogOpen(false);
    setNewBatch({
      name: '',
      planType: 'group',
      maxMembers: 10,
      examGoal: '',
      leader: ''
    });

    toast({
      title: "Batch Created",
      description: `${batch.name} has been created successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanTypeColor = (planType: string) => {
    switch (planType) {
      case 'group': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'corporate': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batches.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batches.filter(b => b.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batches.reduce((sum, b) => sum + b.memberCount, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all batches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Batch Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(batches.reduce((sum, b) => sum + b.memberCount, 0) / batches.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Members per batch</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search batches..."
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
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
                  onChange={(e) => setNewBatch({...newBatch, name: e.target.value})}
                  placeholder="Enter batch name"
                />
              </div>
              <div>
                <Label htmlFor="examGoal">Exam Goal</Label>
                <Input
                  id="examGoal"
                  value={newBatch.examGoal}
                  onChange={(e) => setNewBatch({...newBatch, examGoal: e.target.value})}
                  placeholder="e.g., JEE Main, NEET, CAT"
                />
              </div>
              <div>
                <Label htmlFor="leader">Batch Leader</Label>
                <Input
                  id="leader"
                  value={newBatch.leader}
                  onChange={(e) => setNewBatch({...newBatch, leader: e.target.value})}
                  placeholder="Enter leader name"
                />
              </div>
              <div>
                <Label htmlFor="planType">Plan Type</Label>
                <Select value={newBatch.planType} onValueChange={(value) => setNewBatch({...newBatch, planType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group">Group Plan</SelectItem>
                    <SelectItem value="premium">Premium Plan</SelectItem>
                    <SelectItem value="corporate">Corporate Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maxMembers">Max Members</Label>
                <Input
                  id="maxMembers"
                  type="number"
                  value={newBatch.maxMembers}
                  onChange={(e) => setNewBatch({...newBatch, maxMembers: parseInt(e.target.value)})}
                  min="2"
                  max="50"
                />
              </div>
              <Button onClick={handleCreateBatch} className="w-full">
                Create Batch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Batches Table */}
      <Card>
        <CardHeader>
          <CardTitle>Batch Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Name</TableHead>
                <TableHead>Leader</TableHead>
                <TableHead>Exam Goal</TableHead>
                <TableHead>Plan Type</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">{batch.name}</TableCell>
                  <TableCell>{batch.leader}</TableCell>
                  <TableCell>{batch.examGoal}</TableCell>
                  <TableCell>
                    <Badge className={getPlanTypeColor(batch.planType)}>
                      {batch.planType}
                    </Badge>
                  </TableCell>
                  <TableCell>{batch.memberCount}/{batch.maxMembers}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{batch.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchManagementTab;
