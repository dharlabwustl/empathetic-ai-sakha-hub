
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel, 
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  User, 
  Users, 
  UserCog, 
  Send, 
  AlertCircle,
  Award,
  Loader2
} from "lucide-react";
import BatchInvitationInput from "./BatchInvitationInput";

export interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "member" | "leader" | "school_admin" | "corporate_admin";
  status: "active" | "pending" | "inactive";
  joinedDate?: string;
  invitationCode?: string;
  avatar?: string;
}

interface BatchManagementProps {
  batchMembers: BatchMember[];
  batchName: string;
  planType: "group" | "school" | "corporate";
  maxMembers: number;
  currentUserRole: "member" | "leader" | "school_admin" | "corporate_admin";
  onAddMember: (email: string) => Promise<{ success: boolean; inviteCode?: string }>;
  onRemoveMember: (memberId: string) => Promise<boolean>;
  onChangeBatchName: (name: string) => Promise<boolean>;
  onTransferLeadership: (memberId: string) => Promise<boolean>;
}

// Form schema for adding new member
const addMemberSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Form schema for changing batch name
const batchNameSchema = z.object({
  name: z.string().min(3, { message: "Batch name must be at least 3 characters long" }),
});

const BatchManagement: React.FC<BatchManagementProps> = ({
  batchMembers,
  batchName,
  planType,
  maxMembers,
  currentUserRole,
  onAddMember,
  onRemoveMember,
  onChangeBatchName,
  onTransferLeadership,
}) => {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isChangingName, setIsChangingName] = useState(false);
  const [isConfirmingTransfer, setIsConfirmingTransfer] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const { toast } = useToast();

  const isLeader = currentUserRole === "leader" || 
                  currentUserRole === "school_admin" || 
                  currentUserRole === "corporate_admin";

  const activeMembers = batchMembers.filter(member => member.status === "active" || member.status === "pending");
  const isBatchFull = activeMembers.length >= maxMembers;

  // Form for adding member
  const addMemberForm = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form for changing batch name
  const batchNameForm = useForm<z.infer<typeof batchNameSchema>>({
    resolver: zodResolver(batchNameSchema),
    defaultValues: {
      name: batchName,
    },
  });

  const handleAddMember = async (values: z.infer<typeof addMemberSchema>) => {
    try {
      const result = await onAddMember(values.email);
      
      if (result.success) {
        setInviteCode(result.inviteCode || null);
        toast({
          title: "Member invited",
          description: "An invitation has been sent to the email address",
        });
        addMemberForm.reset();
      } else {
        toast({
          title: "Error",
          description: "Failed to add member. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      const success = await onRemoveMember(memberId);
      
      if (success) {
        toast({
          title: "Member removed",
          description: "The member has been removed from the batch",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to remove member. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleChangeBatchName = async (values: z.infer<typeof batchNameSchema>) => {
    try {
      const success = await onChangeBatchName(values.name);
      
      if (success) {
        toast({
          title: "Batch name updated",
          description: "Your batch name has been updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update batch name. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsChangingName(false);
    }
  };

  const handleConfirmTransfer = async () => {
    if (!selectedMemberId) return;
    
    try {
      const success = await onTransferLeadership(selectedMemberId);
      
      if (success) {
        toast({
          title: "Leadership transferred",
          description: "Batch leadership has been transferred successfully",
        });
        setIsConfirmingTransfer(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to transfer leadership. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const renderPlanTypeBadge = () => {
    if (planType === "group") {
      return <Badge variant="secondary">Group Plan</Badge>;
    } else if (planType === "school") {
      return <Badge variant="secondary">School Plan</Badge>;
    } else {
      return <Badge variant="secondary">Corporate Plan</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl font-bold">{batchName}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Users size={16} className="text-muted-foreground" />
              <span>
                {activeMembers.length} of {maxMembers} members
              </span>
              {renderPlanTypeBadge()}
            </CardDescription>
          </div>

          {isLeader && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsChangingName(true)}
              >
                Rename
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {batchMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">No members yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
                Add members to your batch by sending them invitation codes or emails
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        {member.avatar ? (
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-8 h-8 rounded-full" 
                          />
                        ) : (
                          <User size={16} className="text-gray-500" />
                        )}
                      </div>
                      {member.name}
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      {member.role === "leader" ? (
                        <Badge variant="secondary">Leader</Badge>
                      ) : member.role === "school_admin" ? (
                        <Badge variant="secondary">School Admin</Badge>
                      ) : member.role === "corporate_admin" ? (
                        <Badge variant="secondary">Corporate Admin</Badge>
                      ) : (
                        <Badge variant="outline">Member</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {member.status === "active" ? (
                        <Badge variant="success" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Active
                        </Badge>
                      ) : member.status === "pending" ? (
                        <Badge variant="default" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          Pending
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {member.joinedDate ? new Date(member.joinedDate).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {isLeader && member.id !== "current-user-id" && (
                        <div className="flex justify-end gap-2">
                          {member.status === "pending" && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Send invitation again</span>
                              <Send size={14} />
                            </Button>
                          )}
                          
                          {member.role === "member" && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8"
                              onClick={() => {
                                setSelectedMemberId(member.id);
                                setIsConfirmingTransfer(true);
                              }}
                            >
                              Transfer Leader
                            </Button>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {isLeader && !isBatchFull && (
            <Button 
              variant="default" 
              size="sm" 
              className="mt-4"
              onClick={() => setIsAddingMember(true)}
            >
              Add Member
            </Button>
          )}
          
          {isBatchFull && (
            <div className="mt-4 rounded-md bg-amber-50 dark:bg-amber-900/20 p-3">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Your batch has reached the maximum size of {maxMembers} members.
                Consider upgrading your plan to add more members.
              </p>
            </div>
          )}
          
          {inviteCode && (
            <div className="mt-4 rounded-md bg-blue-50 dark:bg-blue-900/20 p-3">
              <p className="font-medium text-blue-700 dark:text-blue-400 mb-1">
                Invitation Code
              </p>
              <div className="flex items-center">
                <code className="bg-blue-100 dark:bg-blue-800 rounded px-2 py-1 text-sm">
                  {inviteCode}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText(inviteCode);
                    toast({
                      title: "Copied to clipboard",
                      description: "The invitation code has been copied to your clipboard",
                    });
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Batch Details</CardTitle>
              <CardDescription>
                Information about your study batch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Plan Type</Label>
                  <Select defaultValue={planType} disabled>
                    <SelectTrigger>
                      <SelectValue placeholder={planType} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="group">Group Plan (Up to 5 members)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Your Role</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    {currentUserRole === "leader" || 
                     currentUserRole === "school_admin" || 
                     currentUserRole === "corporate_admin" ? (
                      <>
                        <Award size={16} className="text-amber-500" />
                        <span>{currentUserRole === "leader" ? "Batch Leader" : 
                              currentUserRole === "school_admin" ? "School Admin" : 
                              "Corporate Admin"}</span>
                      </>
                    ) : (
                      <>
                        <User size={16} className="text-gray-500" />
                        <span>Member</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <BatchInvitationInput
          onJoinBatch={async (code) => {
            // Simulate API call to join batch via code
            toast({
              title: "Processing",
              description: "Verifying invitation code...",
            });
            
            try {
              // In a real app, this would make an API call
              await new Promise(resolve => setTimeout(resolve, 1500));
              
              toast({
                title: "Success!",
                description: "You've joined the batch successfully",
              });
              
              return true;
            } catch (error) {
              return false;
            }
          }}
        />
      </div>

      {/* Add Member Dialog */}
      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
          </DialogHeader>
          
          <Form {...addMemberForm}>
            <form onSubmit={addMemberForm.handleSubmit(handleAddMember)} className="space-y-4">
              <FormField
                control={addMemberForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input placeholder="member@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setIsAddingMember(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={addMemberForm.formState.isSubmitting}
                >
                  {addMemberForm.formState.isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Add Member
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Change Batch Name Dialog */}
      <Dialog open={isChangingName} onOpenChange={setIsChangingName}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Batch</DialogTitle>
          </DialogHeader>
          
          <Form {...batchNameForm}>
            <form onSubmit={batchNameForm.handleSubmit(handleChangeBatchName)} className="space-y-4">
              <FormField
                control={batchNameForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => setIsChangingName(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={batchNameForm.formState.isSubmitting}
                >
                  {batchNameForm.formState.isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Leadership Transfer Dialog */}
      <Dialog open={isConfirmingTransfer} onOpenChange={setIsConfirmingTransfer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Leadership</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-muted-foreground">
              Are you sure you want to transfer batch leadership? This action cannot be undone.
            </p>
            <p className="mt-4 font-medium">
              You will lose administrative privileges over this batch.
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsConfirmingTransfer(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleConfirmTransfer}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Confirm Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchManagement;
