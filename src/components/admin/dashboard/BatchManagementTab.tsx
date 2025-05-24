
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Users, Eye, Edit, Settings, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";

interface BatchData {
  id: string;
  name: string;
  examGoal: string;
  leader: string;
  members: number;
  maxMembers: number;
  status: 'active' | 'inactive';
  createdDate: string;
}

const BatchManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();

  const mockBatches: BatchData[] = [
    {
      id: "batch-001",
      name: "JEE Advanced 2025 Batch A",
      examGoal: "JEE Advanced",
      leader: "Aryan Sharma",
      members: 15,
      maxMembers: 20,
      status: "active",
      createdDate: "2023-09-01"
    },
    {
      id: "batch-002", 
      name: "NEET 2025 Group",
      examGoal: "NEET",
      leader: "Priya Patel",
      members: 12,
      maxMembers: 15,
      status: "active",
      createdDate: "2023-08-15"
    },
    {
      id: "batch-003",
      name: "CAT Preparation Group",
      examGoal: "CAT",
      leader: "Ananya Desai",
      members: 8,
      maxMembers: 10,
      status: "inactive",
      createdDate: "2023-07-20"
    }
  ];

  const filteredBatches = mockBatches.filter(batch => 
    batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.examGoal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateBatch = () => {
    openDialog('batch-create', 'New Batch', {
      name: '',
      examGoal: '',
      leader: '',
      maxMembers: 10,
      planType: 'group'
    });
  };

  const handleViewBatch = (batch: BatchData) => {
    openDialog('view', batch.name, {
      id: batch.id,
      name: batch.name,
      examGoal: batch.examGoal,
      leader: batch.leader,
      members: `${batch.members}/${batch.maxMembers}`,
      status: batch.status,
      createdDate: batch.createdDate,
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      averageProgress: '75%'
    });
  };

  const handleEditBatch = (batch: BatchData) => {
    openDialog('batch-create', batch.name, {
      name: batch.name,
      examGoal: batch.examGoal,
      leader: batch.leader,
      maxMembers: batch.maxMembers,
      planType: 'group'
    });
  };

  const handleBatchSettings = (batch: BatchData) => {
    openDialog('settings', batch.name, {
      id: batch.id,
      name: batch.name,
      activeStatus: batch.status === 'active',
      permissions: 'Standard Access',
      notifications: 'Enabled'
    });
  };

  const handleDeleteBatch = (batch: BatchData) => {
    openDialog('delete', batch.name, {
      id: batch.id,
      name: batch.name
    });
  };

  const handleSave = (data: any) => {
    toast({
      title: "Success",
      description: `${data.name} has been saved successfully.`,
    });
  };

  const handleConfirm = () => {
    const actionType = dialogState.type === 'delete' ? 'deleted' : 'processed';
    toast({
      title: "Success",
      description: `${dialogState.title} has been ${actionType}.`,
      variant: dialogState.type === 'delete' ? 'destructive' : 'default'
    });
  };

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Batch Management
              </CardTitle>
              <Button onClick={handleCreateBatch}>
                <UserPlus className="mr-2 h-4 w-4" />
                Create Batch
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search batches..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-8 gap-4 p-4 bg-muted/50 font-medium text-sm">
                <div>Batch Name</div>
                <div>Exam Goal</div>
                <div>Leader</div>
                <div>Members</div>
                <div>Status</div>
                <div>Created</div>
                <div>Actions</div>
              </div>
              
              {filteredBatches.map((batch) => (
                <div key={batch.id} className="grid grid-cols-8 gap-4 p-4 border-t">
                  <div className="font-medium">{batch.name}</div>
                  <div className="text-muted-foreground">{batch.examGoal}</div>
                  <div>{batch.leader}</div>
                  <div>{batch.members}/{batch.maxMembers}</div>
                  <div>
                    <Badge 
                      variant="outline" 
                      className={
                        batch.status === 'active' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }
                    >
                      {batch.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground">{batch.createdDate}</div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleViewBatch(batch)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditBatch(batch)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleBatchSettings(batch)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteBatch(batch)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ActionDialog
        type={dialogState.type!}
        title={dialogState.title}
        data={dialogState.data}
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onSave={handleSave}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default BatchManagementTab;
