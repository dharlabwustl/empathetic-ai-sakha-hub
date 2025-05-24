
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Settings, UserCheck, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Batch {
  id: string;
  name: string;
  examType: string;
  maxMembers: number;
  currentMembers: number;
  planType: string;
  pricePerMember: number;
  totalRevenue: number;
  status: 'active' | 'inactive' | 'full';
  createdDate: string;
  adminName: string;
}

const BatchManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [newBatchData, setNewBatchData] = useState({
    name: '',
    examType: '',
    maxMembers: 50,
    planType: 'group',
    pricePerMember: 299
  });

  const [batches, setBatches] = useState<Batch[]>([
    {
      id: '1',
      name: 'NEET 2024 Batch A',
      examType: 'NEET',
      maxMembers: 50,
      currentMembers: 45,
      planType: 'group',
      pricePerMember: 299,
      totalRevenue: 13455,
      status: 'active',
      createdDate: '2024-01-15',
      adminName: 'Dr. Smith'
    },
    {
      id: '2',
      name: 'JEE Advanced Premium',
      examType: 'JEE',
      maxMembers: 30,
      currentMembers: 30,
      planType: 'premium_group',
      pricePerMember: 499,
      totalRevenue: 14970,
      status: 'full',
      createdDate: '2024-01-12',
      adminName: 'Prof. Johnson'
    },
    {
      id: '3',
      name: 'CAT Preparation 2024',
      examType: 'CAT',
      maxMembers: 25,
      currentMembers: 18,
      planType: 'group',
      pricePerMember: 399,
      totalRevenue: 7182,
      status: 'active',
      createdDate: '2024-01-10',
      adminName: 'Ms. Davis'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateBatch = () => {
    const newBatch: Batch = {
      id: `batch_${Date.now()}`,
      ...newBatchData,
      currentMembers: 0,
      totalRevenue: 0,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      adminName: 'Admin User'
    };

    setBatches(prev => [newBatch, ...prev]);
    setNewBatchData({
      name: '',
      examType: '',
      maxMembers: 50,
      planType: 'group',
      pricePerMember: 299
    });

    toast({
      title: "Batch Created",
      description: `${newBatch.name} has been created successfully.`,
    });
  };

  const filteredBatches = batches.filter(batch =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.examType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBatches = batches.length;
  const activeBatches = batches.filter(b => b.status === 'active').length;
  const totalMembers = batches.reduce((sum, batch) => sum + batch.currentMembers, 0);
  const totalRevenue = batches.reduce((sum, batch) => sum + batch.totalRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBatches}</div>
            <p className="text-xs text-muted-foreground">{activeBatches} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">Across all batches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Fill Rate</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalBatches > 0 ? Math.round((totalMembers / batches.reduce((sum, b) => sum + b.maxMembers, 0)) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Capacity utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Batch Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Batch Management</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Batch
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Batch</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="batchName">Batch Name</Label>
                    <Input
                      id="batchName"
                      value={newBatchData.name}
                      onChange={(e) => setNewBatchData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter batch name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="examType">Exam Type</Label>
                    <Select value={newBatchData.examType} onValueChange={(value) => setNewBatchData(prev => ({ ...prev, examType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEET">NEET</SelectItem>
                        <SelectItem value="JEE">JEE</SelectItem>
                        <SelectItem value="CAT">CAT</SelectItem>
                        <SelectItem value="UPSC">UPSC</SelectItem>
                        <SelectItem value="GATE">GATE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maxMembers">Maximum Members</Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      value={newBatchData.maxMembers}
                      onChange={(e) => setNewBatchData(prev => ({ ...prev, maxMembers: parseInt(e.target.value) || 50 }))}
                      min="1"
                      max="100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="planType">Plan Type</Label>
                    <Select value={newBatchData.planType} onValueChange={(value) => setNewBatchData(prev => ({ ...prev, planType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group">Group Plan</SelectItem>
                        <SelectItem value="premium_group">Premium Group</SelectItem>
                        <SelectItem value="enterprise_group">Enterprise Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pricePerMember">Price per Member (₹)</Label>
                    <Input
                      id="pricePerMember"
                      type="number"
                      value={newBatchData.pricePerMember}
                      onChange={(e) => setNewBatchData(prev => ({ ...prev, pricePerMember: parseInt(e.target.value) || 299 }))}
                      min="99"
                    />
                  </div>

                  <Button onClick={handleCreateBatch} className="w-full">
                    Create Batch
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Input
              placeholder="Search batches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Plan Type</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{batch.name}</div>
                        <div className="text-sm text-gray-500">Admin: {batch.adminName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{batch.examType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{batch.currentMembers}/{batch.maxMembers}</div>
                        <div className="text-gray-500">
                          {Math.round((batch.currentMembers / batch.maxMembers) * 100)}% filled
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{batch.planType.replace('_', ' ')}</div>
                        <div className="text-gray-500">₹{batch.pricePerMember}/member</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">₹{batch.totalRevenue.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(batch.status)}>
                        {batch.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {batch.createdDate}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchManagementTab;
