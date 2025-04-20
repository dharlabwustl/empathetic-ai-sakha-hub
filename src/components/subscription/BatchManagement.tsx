
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BatchMemberTable from "./batch/BatchMemberTable";
import BatchDetails from "./batch/BatchDetails";
import AddMemberDialog from "./batch/AddMemberDialog";
import TransferLeadershipDialog from "./batch/TransferLeadershipDialog";
import { BatchMember } from "./batch/types";

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

const BatchManagement: React.FC<BatchManagementProps> = ({
  batchMembers,
  batchName,
  planType,
  maxMembers,
  currentUserRole,
  onAddMember,
  onRemoveMember,
  onTransferLeadership,
}) => {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isConfirmingTransfer, setIsConfirmingTransfer] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const { toast } = useToast();

  const isLeader = currentUserRole === "leader" || 
                  currentUserRole === "school_admin" || 
                  currentUserRole === "corporate_admin";

  const activeMembers = batchMembers.filter(member => member.status === "active" || member.status === "pending");
  const isBatchFull = activeMembers.length >= maxMembers;

  const handleAddMember = async (values: { email: string }) => {
    try {
      const result = await onAddMember(values.email);
      
      if (result.success) {
        setInviteCode(result.inviteCode || null);
        toast({
          title: "Member invited",
          description: "An invitation has been sent to the email address",
        });
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

  const handleTransferLeadership = async () => {
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
              <Badge variant="secondary">
                {planType.charAt(0).toUpperCase() + planType.slice(1)} Plan
              </Badge>
            </CardDescription>
          </div>
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
            <BatchMemberTable
              batchMembers={batchMembers}
              isLeader={isLeader}
              onRemoveMember={handleRemoveMember}
              onTransferLeadership={(id) => {
                setSelectedMemberId(id);
                setIsConfirmingTransfer(true);
              }}
            />
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
            <div className="mt-4 rounded-md bg-amber

-50 dark:bg-amber-900/20 p-3">
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

      <AddMemberDialog
        isOpen={isAddingMember}
        onClose={() => setIsAddingMember(false)}
        onSubmit={handleAddMember}
      />
      
      <TransferLeadershipDialog
        isOpen={isConfirmingTransfer}
        onClose={() => setIsConfirmingTransfer(false)}
        onConfirm={handleTransferLeadership}
      />
    </div>
  );
};

export default BatchManagement;
