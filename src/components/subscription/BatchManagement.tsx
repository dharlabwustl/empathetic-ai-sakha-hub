import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  UserPlus, 
  Settings, 
  Mail, 
  Check, 
  X, 
  UserRound,
  ChevronDown,
  ChevronUp,
  Shield,
  AlertTriangle,
  Copy
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'leader' | 'school_admin' | 'corporate_admin';
  status: 'active' | 'inactive' | 'pending';
  invitationCode?: string;
  joinedDate?: string;
  avatar?: string;
}

interface BatchManagementProps {
  batchMembers: BatchMember[];
  batchName: string;
  planType: 'group' | 'school' | 'corporate';
  maxMembers: number;
  currentUserRole: 'member' | 'leader' | 'school_admin' | 'corporate_admin';
  onAddMember: (email: string) => Promise<{ success: boolean; inviteCode?: string }>;
  onRemoveMember: (id: string) => Promise<boolean>;
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
  onChangeBatchName,
  onTransferLeadership
}) => {
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newBatchName, setNewBatchName] = useState(batchName);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<BatchMember | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { toast } = useToast();

  const activeMembers = batchMembers.filter(member => member.status !== 'inactive');
  const remainingSlots = maxMembers - activeMembers.length;
  
  const roleDisplay = {
    'leader': 'Batch Leader',
    'school_admin': 'School Administrator',
    'corporate_admin': 'Corporate Administrator',
    'member': 'Member'
  };
  
  const planTypeDisplay = {
    'group': 'Study Group',
    'school': 'School',
    'corporate': 'Corporate'
  };
  
  const handleAddMember = async () => {
    if (newMemberEmail.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (activeMembers.length >= maxMembers) {
      toast({
        title: "Error",
        description: `Your plan has a limit of ${maxMembers} members`,
        variant: "destructive",
      });
      return;
    }
    
    setIsAddingMember(true);
    try {
      const result = await onAddMember(newMemberEmail);
      if (result.success) {
        toast({
          title: "Member Added",
          description: `Invitation sent to ${newMemberEmail}`,
        });
        setNewMemberEmail('');
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
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAddingMember(false);
    }
  };
  
  const handleRemoveMember = async (id: string) => {
    try {
      const success = await onRemoveMember(id);
      if (success) {
        toast({
          title: "Member Removed",
          description: "The member has been removed from the batch",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to remove member",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };
  
  const handleSaveBatchName = async () => {
    if (newBatchName.trim() === '') {
      toast({
        title: "Error",
        description: "Batch name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const success = await onChangeBatchName(newBatchName);
      if (success) {
        toast({
          title: "Success",
          description: "Batch name updated successfully",
        });
        setIsEditingName(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to update batch name",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };
  
  const copyInviteCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    
    setTimeout(() => {
      setCopiedCodeIndex(null);
    }, 2000);
    
    toast({
      title: "Code Copied",
      description: "Invitation code copied to clipboard",
    });
  };
  
  const handleTransferLeadershipClick = (member: BatchMember) => {
    setSelectedMember(member);
    setShowTransferDialog(true);
  };
  
  const handleConfirmTransferLeadership = async () => {
    if (!selectedMember) return;
    
    setIsProcessing(true);
    try {
      const success = await onTransferLeadership(selectedMember.id);
      if (success) {
        toast({
          title: "Leadership Transferred",
          description: `${selectedMember.name} is now the ${roleDisplay[currentUserRole]}`,
        });
        setShowTransferDialog(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to transfer leadership",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users size={20} className="text-blue-500" /> 
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input 
                      value={newBatchName} 
                      onChange={(e) => setNewBatchName(e.target.value)}
                      className="w-[200px]" 
                    />
                    <Button size="sm" onClick={handleSaveBatchName}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingName(false)}>Cancel</Button>
                  </div>
                ) : (
                  <>
                    {batchName} 
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingName(true)}>
                      Edit
                    </Button>
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {planTypeDisplay[planType]} • {activeMembers.length}/{maxMembers} Members
              </CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              You are {roleDisplay[currentUserRole]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Add member section */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Add Member</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Enter email address" 
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  disabled={isAddingMember || activeMembers.length >= maxMembers}
                  className="flex-grow"
                />
                <Button 
                  onClick={handleAddMember}
                  disabled={isAddingMember || activeMembers.length >= maxMembers}
                  className="flex items-center gap-2"
                >
                  {isAddingMember ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Add Member
                    </>
                  )}
                </Button>
              </div>
              
              {activeMembers.length >= maxMembers && (
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
                  <AlertCircle size={16} />
                  <span>You've reached the maximum number of members for your plan</span>
                </div>
              )}
              
              {remainingSlots > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {remainingSlots} {remainingSlots === 1 ? 'slot' : 'slots'} available
                </p>
              )}
            </div>
            
            {/* Member list */}
            <div>
              <h3 className="text-lg font-medium mb-3">Members</h3>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Invitation</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batchMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full" />
                            ) : (
                              <User size={18} className="text-gray-400" />
                            )}
                            {member.name}
                          </div>
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${member.role === 'leader' || member.role === 'school_admin' || member.role === 'corporate_admin' ? 
                                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''
                              }
                            `}
                          >
                            {roleDisplay[member.role]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`
                              ${member.status === 'active' ? 
                                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                                member.status === 'pending' ?
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                              }
                            `}
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {member.status === 'pending' && member.invitationCode ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-mono truncate max-w-[80px]">
                                {member.invitationCode}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyInviteCode(member.invitationCode!, member.id)}
                              >
                                {copiedCodeIndex === member.id ? (
                                  <Check size={14} className="text-green-500" />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">
                              {member.joinedDate ? `Joined ${new Date(member.joinedDate).toLocaleDateString()}` : '-'}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {member.role === 'member' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8"
                                onClick={() => handleTransferLeadershipClick(member)}
                              >
                                <Shield size={14} className="mr-1" />
                                Make Leader
                              </Button>
                            )}
                            
                            {member.id !== 'current-user-id' && (
                              <>
                                {member.status === 'pending' && (
                                  <Button 
                                    variant="ghost"
                                    size="sm"
                                    className="h-8"
                                  >
                                    <Send size={14} className="mr-1" />
                                    Resend
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                                  onClick={() => handleRemoveMember(member.id)}
                                >
                                  <X size={14} />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Transfer Leadership Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Leadership</DialogTitle>
            <DialogDescription>
              Are you sure you want to transfer your {roleDisplay[currentUserRole]} role to this member? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="py-4">
              <div className="flex items-center p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="mr-4">
                  {selectedMember.avatar ? (
                    <img src={selectedMember.avatar} alt={selectedMember.name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <UserCog size={42} className="text-blue-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{selectedMember.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedMember.email}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Label htmlFor="confirm-role">New Role</Label>
                <Select defaultValue={currentUserRole} disabled>
                  <SelectTrigger id="confirm-role" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={currentUserRole}>{roleDisplay[currentUserRole]}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2 mt-6">
                <Award className="text-amber-500" size={18} />
                <p className="text-sm">
                  This will make {selectedMember.name} the new {roleDisplay[currentUserRole]} and change your role to Member.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowTransferDialog(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleConfirmTransferLeadership}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Transfer Leadership'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchManagement;
