
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, MoreHorizontal, Eye, Edit, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";

const UsersManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();

  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Student", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Student", status: "Active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Teacher", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Student", status: "Pending" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Admin", status: "Active" },
  ];

  const handleAddUser = () => {
    openDialog('add', 'New User', {
      name: '',
      email: '',
      role: 'student',
      active: true
    });
  };

  const handleViewUser = (user: any) => {
    openDialog('view', user.name, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      joinedDate: '2023-10-01',
      lastActive: '2023-10-15'
    });
  };

  const handleEditUser = (user: any) => {
    openDialog('edit', user.name, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
  };

  const handleUserSettings = (user: any) => {
    openDialog('settings', user.name, {
      id: user.id,
      name: user.name,
      activeStatus: user.status === 'Active',
      permissions: 'Standard Access',
      notifications: 'Enabled'
    });
  };

  const handleSave = (data: any) => {
    toast({
      title: "Success",
      description: `${data.name} has been saved successfully.`,
    });
  };

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <Button onClick={handleAddUser}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-6 gap-4 p-4 bg-muted/50 font-medium text-sm">
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              
              {mockUsers.filter(user => 
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((user) => (
                <div key={user.id} className="grid grid-cols-6 gap-4 p-4 border-t">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-muted-foreground">{user.email}</div>
                  <div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">
                      {user.role}
                    </Badge>
                  </div>
                  <div>
                    <Badge 
                      variant="outline" 
                      className={
                        user.status === 'Active' ? 'bg-green-100 text-green-700' :
                        user.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleUserSettings(user)}>
                      <Settings className="h-4 w-4" />
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
      />
    </>
  );
};

export default UsersManagement;
