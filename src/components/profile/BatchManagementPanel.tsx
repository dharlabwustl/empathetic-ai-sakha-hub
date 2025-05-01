
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserProfileType } from "@/types/user/base";
import { Search, User, Users, Plus, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BatchManagementPanelProps {
  userProfile: UserProfileType;
  onCreateBatch: () => void;
  canCreateBatch: boolean;
  isBatchLeader: boolean;
}

export const BatchManagementPanel = ({ 
  userProfile, 
  onCreateBatch,
  canCreateBatch,
  isBatchLeader
}: BatchManagementPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleRemoveMember = (memberId: string) => {
    // In a real app, this would call an API to remove the member
    toast({
      title: "Member Removed",
      description: "The member has been removed from your batch",
    });
  };

  const handleTransferLeadership = (memberId: string) => {
    // In a real app, this would call an API to transfer leadership
    toast({
      title: "Leadership Transferred",
      description: "Batch leadership has been transferred successfully",
    });
  };

  const handleResendInvite = (memberId: string) => {
    // In a real app, this would call an API to resend the invite
    toast({
      title: "Invite Resent",
      description: "The invitation has been resent successfully",
    });
  };

  const renderBatchContent = () => {
    if (!userProfile.batch) {
      if (canCreateBatch) {
        return (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Users size={28} />
            </div>
            <h2 className="text-xl font-bold mb-2">Create Your Study Batch</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Your subscription plan includes batch creation. Create a study batch to invite students and learn together!
            </p>
            <Button onClick={onCreateBatch}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Batch
            </Button>
          </div>
        );
      } else {
        return (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-600 mb-4">
              <Users size={28} />
            </div>
            <h2 className="text-xl font-bold mb-2">No Batch Available</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You're not part of any batch yet. Upgrade to a group plan to create a batch or use an invite code to join one.
            </p>
            <Button>
              Upgrade to Group Plan
            </Button>
          </div>
        );
      }
    }

    const batch = userProfile.batch!;
    const filteredMembers = batch.members.filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
      <>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{batch.name}</span>
            <Badge>{batch.members.length}/{batch.memberLimit} Members</Badge>
          </CardTitle>
          <CardDescription>
            {batch.examGoal} - {batch.targetYear}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {isBatchLeader && batch.members.length < batch.memberLimit && (
              <Button className="ml-2" onClick={onCreateBatch}>
                <Plus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            )}
          </div>
          
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Status</TableHead>
                  {isBatchLeader && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {member.joinStatus === 'joined' ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                      ) : member.joinStatus === 'declined' ? (
                        <Badge variant="outline" className="bg-red-100 text-red-800">Declined</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      )}
                    </TableCell>
                    {isBatchLeader && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {member.joinStatus === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleResendInvite(member.id)}
                            >
                              <Send className="h-3.5 w-3.5 mr-1" />
                              Resend
                            </Button>
                          )}
                          
                          {member.joinStatus === 'joined' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleTransferLeadership(member.id)}
                            >
                              <User className="h-3.5 w-3.5 mr-1" />
                              Make Leader
                            </Button>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          
          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-muted-foreground">
              Batch created on {new Date(batch.createdAt).toLocaleDateString()}
            </div>
            
            <div className="flex gap-2">
              {isBatchLeader && (
                <Button variant="outline">Batch Settings</Button>
              )}
              <Button variant="outline" className="text-red-500">
                {isBatchLeader ? "Dissolve Batch" : "Leave Batch"}
              </Button>
            </div>
          </div>
        </CardContent>
      </>
    );
  };

  return (
    <div className="p-6">
      <Card>
        {renderBatchContent()}
      </Card>
    </div>
  );
};
