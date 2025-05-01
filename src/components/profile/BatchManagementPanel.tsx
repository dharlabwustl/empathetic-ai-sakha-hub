import React, { useState } from "react";
import { UserProfileBase } from "@/types/user/base";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
  DialogHeader, DialogFooter, DialogTrigger
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Mail, Trash2, UserPlus, Copy, CheckCircle,
  Users, ChevronRight, BarChart, Link, AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "leader" | "member";
  status: "active" | "pending";
  joinedDate?: string;
  lastActive?: string;
  progress?: number;
}

interface BatchManagementPanelProps {
  isLeader: boolean;
  userProfile: UserProfileBase;
}

// Mock batch data - in a real app, this would come from an API
const mockBatchData = {
  id: "batch-123",
  name: "JEE Champions 2025",
  examGoal: "JEE Advanced",
  targetYear: "2025",
  createdAt: "2023-10-15T12:00:00Z",
  inviteCode: "BATCH-ABC123",
  members: [
    {
      id: "member-1",
      name: "Rahul Sharma",
      email: "rahul.s@example.com",
      role: "leader",
      status: "active",
      joinedDate: "2023-10-15T12:00:00Z",
      lastActive: "2023-10-25T14:30:00Z",
      progress: 78
    },
    {
      id: "member-2",
      name: "Priya Desai",
      email: "priya.d@example.com",
      role: "member",
      status: "active",
      joinedDate: "2023-10-16T10:22:00Z",
      lastActive: "2023-10-24T16:45:00Z",
      progress: 65
    },
    {
      id: "member-3",
      name: "Amit Kumar",
      email: "amit.k@example.com",
      role: "member",
      status: "active",
      joinedDate: "2023-10-17T09:15:00Z",
      lastActive: "2023-10-23T11:20:00Z",
      progress: 42
    },
    {
      id: "member-4",
      name: "Neha Patel",
      email: "neha.p@example.com",
      role: "member",
      status: "pending",
      joinedDate: undefined,
      lastActive: undefined,
      progress: 0
    },
    {
      id: "member-5",
      name: "Vikram Singh",
      email: "vikram.s@example.com",
      role: "member",
      status: "pending",
      joinedDate: undefined,
      lastActive: undefined,
      progress: 0
    }
  ] as BatchMember[]
};

const BatchManagementPanel: React.FC<BatchManagementPanelProps> = ({ isLeader, userProfile }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [batchData, setBatchData] = useState(mockBatchData);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [newLeaderId, setNewLeaderId] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [sortOrder, setSortOrder] = useState<"name" | "status" | "progress">("name");
  
  // Current user is the leader if isLeader is true
  const currentUser = isLeader
    ? batchData.members.find(member => member.role === "leader")
    : batchData.members.find(member => member.email === userProfile.email);
  
  // For the leader view, filter out the leader from the members list
  // For member view, filter out the current user
  const otherMembers = isLeader
    ? batchData.members.filter(member => member.role !== "leader")
    : batchData.members.filter(member => member.email !== userProfile.email);
  
  const sortedMembers = [...otherMembers].sort((a, b) => {
    if (sortOrder === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "status") {
      return a.status === "active" ? -1 : 1;
    } else {
      return (b.progress || 0) - (a.progress || 0);
    }
  });
  
  const handleCopyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(batchData.inviteCode);
      setCopiedToClipboard(true);
      toast({
        title: "Invite code copied!",
        description: "The invite code has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedToClipboard(false), 3000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the invite code. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleInviteMember = () => {
    if (!newMemberEmail.trim() || !newMemberEmail.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if email already exists
    const emailExists = batchData.members.some(
      member => member.email.toLowerCase() === newMemberEmail.toLowerCase()
    );
    
    if (emailExists) {
      toast({
        title: "Member already exists",
        description: "This email is already invited to the batch.",
        variant: "destructive",
      });
      return;
    }
    
    // Add new member with pending status
    const newMember: BatchMember = {
      id: `member-${Date.now()}`,
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      role: "member",
      status: "pending",
      progress: 0
    };
    
    setBatchData({
      ...batchData,
      members: [...batchData.members, newMember]
    });
    
    toast({
      title: "Invitation sent!",
      description: `An invitation has been sent to ${newMemberEmail}.`,
    });
    
    setNewMemberEmail("");
  };
  
  const handleRemoveMember = (memberId: string) => {
    setBatchData({
      ...batchData,
      members: batchData.members.filter(member => member.id !== memberId)
    });
    
    toast({
      title: "Member removed",
      description: "The member has been removed from your batch.",
    });
  };
  
  const handleSendReminder = (memberEmail: string) => {
    toast({
      title: "Reminder sent",
      description: `A reminder has been sent to ${memberEmail}.`,
    });
  };
  
  const handleTransferLeadership = () => {
    if (!newLeaderId) {
      toast({
        title: "No member selected",
        description: "Please select a member to transfer leadership to.",
        variant: "destructive",
      });
      return;
    }
    
    // Update the roles
    const updatedMembers = batchData.members.map(member => {
      if (member.id === newLeaderId) {
        return { ...member, role: "leader" as const };
      }
      if (member.role === "leader") {
        return { ...member, role: "member" as const };
      }
      return member;
    });
    
    setBatchData({
      ...batchData,
      members: updatedMembers
    });
    
    toast({
      title: "Leadership transferred",
      description: "You are no longer the leader of this batch.",
    });
    
    setShowTransferDialog(false);
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const formatProgress = (progress?: number) => {
    if (progress === undefined) return "N/A";
    return `${progress}%`;
  };
  
  return (
    <div className="space-y-6">
      {/* Batch Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">{batchData.name}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground mb-3">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{batchData.members.length} members</span>
                </div>
                <span className="hidden sm:inline-block">•</span>
                <span>Goal: {batchData.examGoal} {batchData.targetYear}</span>
                <span className="hidden sm:inline-block">•</span>
                <span>Created: {formatDate(batchData.createdAt)}</span>
              </div>
            </div>
            
            {isLeader && (
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Invite New Members</DialogTitle>
                      <DialogDescription>
                        Add members to your batch by email or share the invite code.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="invite-email">Email Address</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="invite-email"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                            placeholder="Enter email address"
                          />
                          <Button onClick={handleInviteMember}>Send</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="invite-code">Batch Invite Code</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="invite-code"
                            value={batchData.inviteCode}
                            readOnly
                            className="font-mono"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopyInviteCode}
                          >
                            {copiedToClipboard ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Share this code with potential members. They can use it to join your batch.
                        </p>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>
                        Done
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Transfer Leadership
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Transfer Batch Leadership</DialogTitle>
                      <DialogDescription>
                        Select a member to transfer the batch leadership to.
                        You will become a regular member after the transfer.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4">
                      <Label htmlFor="new-leader">Select New Leader</Label>
                      <Select value={newLeaderId} onValueChange={setNewLeaderId}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a member" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortedMembers
                            .filter(member => member.status === "active")
                            .map(member => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name} ({member.email})
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      
                      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-amber-800 dark:text-amber-500">
                            This action cannot be undone. The new leader will have full control over this batch,
                            including the ability to remove members and manage invitations.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
                        Cancel
                      </Button>
                      <Button variant="default" onClick={handleTransferLeadership}>
                        Transfer Leadership
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={handleCopyInviteCode}>
              <Link className="h-4 w-4 mr-1" />
              {copiedToClipboard ? "Copied!" : "Copy Invite Code"}
            </Button>
            
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-1" />
              View Batch Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Members List Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Batch Members</CardTitle>
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as "name" | "status" | "progress")}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="status">Sort by Status</SelectItem>
                <SelectItem value="progress">Sort by Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* First show leader if current user is not leader */}
          {!isLeader && (
            <div className="border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {currentUser?.name?.slice(0, 2).toUpperCase() || 'ME'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{currentUser?.name}</span>
                    <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-500">
                      Leader
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                </div>
                
                <div className="text-sm text-right">
                  <div>Joined: {formatDate(currentUser?.joinedDate)}</div>
                  <div className="text-muted-foreground">
                    Last active: {currentUser?.lastActive ? "Today" : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Current User (if leader) */}
          {isLeader && currentUser && (
            <div className="border-b px-6 py-4 bg-primary/5">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userProfile?.avatar || ''} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {currentUser?.name?.slice(0, 2).toUpperCase() || 'ME'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{currentUser?.name} (You)</span>
                    <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-500">
                      Leader
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                </div>
                
                <div className="text-sm">
                  <div className="flex items-center gap-1.5">
                    <span>Progress:</span>
                    <Badge variant="outline" className="font-medium">
                      {formatProgress(currentUser?.progress)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Other Members */}
          <div className="divide-y">
            {sortedMembers.length > 0 ? (
              sortedMembers.map(member => (
                <div key={member.id} className="px-6 py-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{member.name}</span>
                        {member.status === "pending" && (
                          <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    
                    {isLeader ? (
                      <div className="flex items-center gap-2">
                        {member.status === "active" && (
                          <div className="text-sm mr-2">
                            <div className="flex items-center gap-1.5">
                              <span>Progress:</span>
                              <Badge variant="outline" className="font-medium">
                                {formatProgress(member.progress)}
                              </Badge>
                            </div>
                          </div>
                        )}
                        
                        {member.status === "pending" ? (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleSendReminder(member.email)}
                          >
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Send Reminder</span>
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/dashboard/student/profile/${member.id}`)}
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">View Profile</span>
                          </Button>
                        )}
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove Member</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Member</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove {member.name} from your batch?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemoveMember(member.id)}>
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ) : (
                      <div className="text-sm">
                        {member.status === "active" ? (
                          <div className="flex items-center gap-1.5">
                            <span>Progress:</span>
                            <Badge variant="outline" className="font-medium">
                              {formatProgress(member.progress)}
                            </Badge>
                          </div>
                        ) : (
                          <Badge variant="outline" className="font-medium">
                            Pending
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No other members in this batch yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchManagementPanel;
