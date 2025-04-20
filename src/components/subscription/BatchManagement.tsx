import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, UserMinus, Users, Mail, Edit } from "lucide-react";
import { getRelativeTime } from "@/utils/dateUtils";

export interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "member" | "leader" | "school_admin" | "corporate_admin";
  status: "active" | "inactive" | "pending";
  joinedDate?: string;
  invitationCode?: string;
  avatar?: string;
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  };
}

interface BatchManagementProps {
  batchMembers: BatchMember[];
  batchName: string;
  planType: "group" | "school" | "corporate";
  maxMembers: number;
  currentUserRole: "member" | "leader" | "school_admin" | "corporate_admin";
  onAddMember: (email: string) => Promise<{success: boolean; inviteCode?: string}>;
  onRemoveMember: (id: string) => Promise<void>;
  onChangeBatchName: (name: string) => Promise<boolean>;
  onTransferLeadership: (memberId: string) => Promise<void>;
}

const BatchManagement: React.FC<BatchManagementProps> = ({
  batchMembers,
  batchName,
  planType,
  maxMembers,
  currentUserRole,
  onAddMember,
  onRemoveMember,
  onChangeBatchName,
  onTransferLeadership
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newBatchName, setNewBatchName] = useState(batchName);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);
  const [transferId, setTransferId] = useState<string | null>(null);
  const [isNameUpdating, setIsNameUpdating] = useState(false);
  
  const isLeader = currentUserRole === "leader" || 
                   currentUserRole === "school_admin" || 
                   currentUserRole === "corporate_admin";
  
  const handleNameSave = async () => {
    if (newBatchName.trim() === "") {
      toast({
        title: "Error",
        description: "Batch name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    setIsNameUpdating(true);
    
    try {
      const success = await onChangeBatchName(newBatchName);
      
      if (success) {
        toast({
          title: "Success",
          description: "Batch name updated successfully",
        });
        setIsEditing(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to update batch name",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsNameUpdating(false);
    }
  };
  
  const handleAddMember = async () => {
    if (newMemberEmail.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }
    
    if (batchMembers.length >= maxMembers) {
      toast({
        title: "Error",
        description: `You've reached the maximum limit of ${maxMembers} members for your plan`,
        variant: "destructive"
      });
      return;
    }
    
    if (batchMembers.some(member => member.email === newMemberEmail)) {
      toast({
        title: "Error",
        description: "This email is already a member or has a pending invitation",
        variant: "destructive"
      });
      return;
    }
    
    setIsAddingMember(true);
    
    try {
      const result = await onAddMember(newMemberEmail);
      
      if (result.success) {
        toast({
          title: "Invitation Sent",
          description: `An invitation has been sent to ${newMemberEmail}`,
        });
        setNewMemberEmail("");
      } else {
        toast({
          title: "Error",
          description: "Failed to add member",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsAddingMember(false);
    }
  };
  
  const confirmRemoveMember = (id: string) => {
    setRemovingMemberId(id);
  };
  
  const handleRemoveMember = async () => {
    if (!removingMemberId) return;
    
    try {
      await onRemoveMember(removingMemberId);
      toast({
        title: "Success",
        description: "Member removed successfully",
      });
      setRemovingMemberId(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove member",
        variant: "destructive"
      });
    }
  };
  
  const confirmTransferLeadership = (id: string) => {
    setTransferId(id);
  };
  
  const handleTransferLeadership = async () => {
    if (!transferId) return;
    
    try {
      await onTransferLeadership(transferId);
      toast({
        title: "Leadership Transferred",
        description: "You have transferred leadership to another member",
      });
      setTransferId(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to transfer leadership",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="max-w-xs"
                  placeholder="Enter batch name"
                  disabled={isNameUpdating}
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={handleNameSave}
                  disabled={isNameUpdating}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => {
                    setIsEditing(false);
                    setNewBatchName(batchName);
                  }}
                  disabled={isNameUpdating}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CardTitle>{batchName}</CardTitle>
                {isLeader && (
                  <Button 
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <Badge variant="outline" className="capitalize">
            {planType} Plan
          </Badge>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-row justify-between items-center mb-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Members: {batchMembers.filter(m => m.status === "active").length} active, 
                {batchMembers.filter(m => m.status === "pending").length} pending
              </p>
              <p className="text-sm text-muted-foreground">
                Capacity: {batchMembers.length} / {maxMembers}
              </p>
            </div>
            
            {isLeader && (
              <div className="flex items-center gap-2">
                <Input 
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="max-w-xs"
                  disabled={isAddingMember}
                />
                <Button 
                  onClick={handleAddMember}
                  disabled={isAddingMember}
                  className="flex items-center gap-1"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Add</span>
                </Button>
              </div>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            {batchMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.name}</p>
                      {member.role === "leader" && (
                        <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 border-amber-200">
                          Leader
                        </Badge>
                      )}
                      {member.status === "pending" && (
                        <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                          Pending
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    
                    {member.status === "pending" ? (
                      <div className="flex items-center mt-1 gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          Invitation code: {member.invitationCode}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-1">
                        Joined {member.joinedDate ? getRelativeTime(member.joinedDate) : ""}
                      </p>
                    )}
                  </div>
                </div>
                
                {isLeader && member.id !== "current-user-id" && (
                  <div className="flex items-center gap-2">
                    {member.status === "active" && member.role !== "leader" && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => confirmTransferLeadership(member.id)}
                      >
                        <UserCheck className="h-3.5 w-3.5 mr-1" />
                        Make Leader
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => confirmRemoveMember(member.id)}
                    >
                      <UserMinus className="h-3.5 w-3.5 mr-1" />
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {batchMembers.length === 0 && (
            <div className="py-8 text-center">
              <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-muted-foreground">No members yet</p>
              <p className="text-sm text-muted-foreground">Add members to your batch using the form above</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Remove Member Dialog */}
      <AlertDialog open={removingMemberId !== null} onOpenChange={() => setRemovingMemberId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Removal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this member? They will lose access to all batch content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveMember} className="bg-red-600 hover:bg-red-700">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Transfer Leadership Dialog */}
      <AlertDialog open={transferId !== null} onOpenChange={() => setTransferId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transfer Leadership</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to transfer leadership to this member? You will become a regular member.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleTransferLeadership}>
              Transfer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BatchManagement;
