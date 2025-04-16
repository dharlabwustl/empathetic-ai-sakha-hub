
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { UserPlus, Search, Filter, MoreVertical, Check, Trash, PenLine } from "lucide-react";
import { StudentData } from "@/types/admin";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserManagementTabProps {
  recentStudents: StudentData[];
}

const UserManagementTab: React.FC<UserManagementTabProps> = ({ recentStudents }) => {
  const { toast } = useToast();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserRole, setNewUserRole] = useState("content-creator");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [permissionUpload, setPermissionUpload] = useState(true);
  const [permissionGenerate, setPermissionGenerate] = useState(true);
  const [permissionAccess, setPermissionAccess] = useState(true);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!newUserEmail || !newUserName || !newUserRole) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send the data to your backend
    toast({
      title: "Content Creator Added",
      description: `${newUserName} has been added as a content creator with the specified permissions.`
    });
    
    // Reset form and close dialog
    setNewUserEmail("");
    setNewUserName("");
    setIsAddUserOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-lg font-medium">User Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage all users and their permissions
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <UserPlus size={16} />
                    Add Admin User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Content Creator Admin</DialogTitle>
                    <DialogDescription>
                      Create a new admin user with content creation permissions
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={newUserName} 
                        onChange={e => setNewUserName(e.target.value)} 
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={newUserEmail} 
                        onChange={e => setNewUserEmail(e.target.value)} 
                        placeholder="Enter email address"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Admin Role</Label>
                      <Select value={newUserRole} onValueChange={setNewUserRole}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="content-creator">Content Creator</SelectItem>
                          <SelectItem value="content-reviewer">Content Reviewer</SelectItem>
                          <SelectItem value="test-generator">Test Generator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Permissions</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="permission-upload" 
                            checked={permissionUpload} 
                            onCheckedChange={(checked) => setPermissionUpload(checked as boolean)} 
                          />
                          <Label htmlFor="permission-upload">Upload Content</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="permission-generate" 
                            checked={permissionGenerate} 
                            onCheckedChange={(checked) => setPermissionGenerate(checked as boolean)} 
                          />
                          <Label htmlFor="permission-generate">Generate Test Samples</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="permission-access" 
                            checked={permissionAccess} 
                            onCheckedChange={(checked) => setPermissionAccess(checked as boolean)} 
                          />
                          <Label htmlFor="permission-access">Access Content Creation Modules</Label>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Add User</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              
              <div className="flex">
                <Input 
                  placeholder="Search users..." 
                  className="max-w-sm rounded-r-none"
                />
                <Button 
                  variant="default" 
                  size="icon" 
                  className="rounded-l-none"
                >
                  <Search size={16} />
                </Button>
              </div>
              
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border bg-white dark:bg-gray-800">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div>{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">{student.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : student.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-gray-100 text-gray-700'
                      }`}>
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell>{student.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <PenLine size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing 5 of 25 users
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementTab;
