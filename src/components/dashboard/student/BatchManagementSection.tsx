
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, Copy, CheckCircle, Crown, Mail, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserSubscription, BatchMember, BatchInvitation } from '@/types/user/subscription';

export interface BatchManagementSectionProps {
  isLeader: boolean;
  batchName: string;
  batchCode: string;
  subscription?: UserSubscription;
  members?: BatchMember[];
  invitations?: BatchInvitation[];
}

const BatchManagementSection: React.FC<BatchManagementSectionProps> = ({
  isLeader = false,
  batchName = "",
  batchCode = "",
  subscription,
  members = [],
  invitations = []
}) => {
  const { toast } = useToast();
  const [newEmail, setNewEmail] = useState("");
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [activeTab, setActiveTab] = useState("members");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleInviteMember = () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call an API to generate and send invitation
    setIsGeneratingCode(true);
    setTimeout(() => {
      toast({
        title: "Invitation sent",
        description: `Invitation has been sent to ${newEmail}`,
      });
      setNewEmail("");
      setIsGeneratingCode(false);
    }, 1500);
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    
    toast({
      title: "Code copied",
      description: "Invitation code copied to clipboard",
    });
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleRemoveMember = (memberId: string) => {
    // In a real app, this would call an API to remove the member
    toast({
      title: "Member removed",
      description: "Member has been removed from the batch",
    });
  };

  const handleMakeLeader = (memberId: string) => {
    // In a real app, this would call an API to make the member a leader
    toast({
      title: "Leader changed",
      description: "New batch leader has been assigned",
    });
  };

  const handleRevokeInvitation = (invitationId: string) => {
    // In a real app, this would call an API to revoke the invitation
    toast({
      title: "Invitation revoked",
      description: "Invitation has been revoked",
    });
  };

  // Mock data for demonstration
  const mockMembers: BatchMember[] = [
    {
      id: "1",
      userId: "user1",
      batchId: "batch1",
      role: "leader",
      joinedAt: new Date().toISOString(),
      name: "John Doe (You)",
      email: "john@example.com",
      status: "active"
    },
    {
      id: "2",
      userId: "user2",
      batchId: "batch1",
      role: "member",
      joinedAt: new Date().toISOString(),
      name: "Jane Smith",
      email: "jane@example.com",
      status: "active"
    }
  ];

  const mockInvitations: BatchInvitation[] = [
    {
      id: "inv1",
      batchId: "batch1",
      code: "SAKHA-ABC123",
      email: "alex@example.com",
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const currentMembers = members.length > 0 ? members : mockMembers;
  const currentInvitations = invitations.length > 0 ? invitations : mockInvitations;
  const currentSubscription: UserSubscription = subscription || {
    id: "sub1",
    userId: "user1",
    planId: "group-standard",
    status: "active",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: true,
    planName: "Group Standard",
    price: 1999,
    interval: "monthly",
    features: ["Access to all premium content", "Group study sessions", "Max 5 members"],
    maxMembers: 5,
    currentMembers: 2
  };

  if (!isLeader) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Study Batch</CardTitle>
          <CardDescription>You are part of a study batch</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h3 className="font-medium mb-2">Your Batch: {batchName || "Study Group A"}</h3>
            <p className="text-sm text-muted-foreground">
              You are part of a study batch. Contact your batch leader for any assistance.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>Study Batch Management</span>
            <Badge variant="outline" className="text-xs">
              Leader
            </Badge>
          </div>
          {currentSubscription && (
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30 text-xs"
            >
              {currentSubscription.currentMembers}/{currentSubscription.maxMembers} Members
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Manage your study batch and invite new members
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
          <h3 className="font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            {batchName || "Study Group A"} 
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your group code: <span className="font-mono">{batchCode || "SAKHA-XYZ789"}</span>
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="space-y-4">
            {currentMembers.map((member, index) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {member.name}
                      {member.role === "leader" && (
                        <Crown className="h-3.5 w-3.5 text-amber-500 inline ml-1" />
                      )}
                    </span>
                    <Badge variant={member.status === "active" ? "default" : "secondary"} className="text-xs">
                      {member.status === "active" ? "Active" : "Suspended"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{member.email}</p>
                </div>
                
                {member.role !== "leader" && (
                  <div className="flex mt-2 sm:mt-0 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-8"
                      onClick={() => handleMakeLeader(member.id)}
                    >
                      <Crown className="h-3.5 w-3.5 mr-1" />
                      Make Leader
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs h-8"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
            
            {currentSubscription && currentMembers.length < currentSubscription.maxMembers && (
              <div className="mt-4">
                <Label htmlFor="new-email" className="text-sm font-medium">Invite New Member</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="new-email"
                    placeholder="Enter email address"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleInviteMember} 
                    disabled={isGeneratingCode || !newEmail}
                    className="whitespace-nowrap"
                  >
                    {isGeneratingCode ? (
                      <>
                        <span className="animate-spin mr-1">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-1" />
                        Invite
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="invitations" className="space-y-4">
            {currentInvitations.length === 0 ? (
              <div className="text-center p-6 border border-dashed rounded-md">
                <p className="text-muted-foreground">No pending invitations</p>
              </div>
            ) : (
              currentInvitations.map((invitation, index) => (
                <div
                  key={invitation.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <span>{invitation.email}</span>
                      <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                        {invitation.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="mt-1 font-mono text-xs text-muted-foreground">
                      Code: {invitation.code}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Expires on {new Date(invitation.expiresAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex mt-2 sm:mt-0 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-8"
                      onClick={() => handleCopyCode(invitation.code, index)}
                    >
                      {copiedIndex === index ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          Copy Code
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs h-8"
                      onClick={() => handleRevokeInvitation(invitation.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BatchManagementSection;
