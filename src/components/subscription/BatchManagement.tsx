import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BatchMemberTable from "./batch/BatchMemberTable";
import BatchHeader from "./batch/BatchHeader";
import EmptyBatchState from "./batch/EmptyBatchState";
import InvitationCodeDisplay from "./batch/InvitationCodeDisplay";
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

const BatchManagement = ({
  batchMembers,
  batchName,
  planType,
  maxMembers,
  currentUserRole,
  onAddMember,
  onRemoveMember,
  onTransferLeadership,
}: BatchManagementProps) => {
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
    <Card>
      <BatchHeader 
        batchName={batchName}
        activeMembers={activeMembers.length}
        maxMembers={maxMembers}
        planType={planType}
      />

      <CardContent>
        {batchMembers.length === 0 ? (
          <EmptyBatchState />
        ) : (
          <BatchMemberTable
            batchMembers={batchMembers}
            isLeader={isLeader}
            onRemoveMember={onRemoveMember}
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
          <div className="mt-4 rounded-md bg-amber-50 dark:bg-amber-900/20 p-3">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Your batch has reached the maximum size of {maxMembers} members.
              Consider upgrading your plan to add more members.
            </p>
          </div>
        )}
        
        {inviteCode && <InvitationCodeDisplay inviteCode={inviteCode} />}
      </CardContent>

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
    </Card>
  );
};

export default BatchManagement;
