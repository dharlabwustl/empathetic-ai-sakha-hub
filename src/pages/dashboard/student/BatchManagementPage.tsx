import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Copy, 
  Check, 
  AlertTriangle,
  ArrowRight
} from "lucide-react";

const BatchManagementPage = () => {
  const [batchName, setBatchName] = useState('Sakha Super Batch');
  const [batchCode, setBatchCode] = useState('SAKHA-2024-SUPER');
  const [members, setMembers] = useState([
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'active' },
    { id: '2', name: 'Bob Williams', email: 'bob@example.com', status: 'pending' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'active' },
  ]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [isLeader, setIsLeader] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCodeGenerating, setIsCodeGenerating] = useState(false);
  const [isInviteSending, setIsInviteSending] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real application, this would fetch the batch details from the server
    // using the batch ID or code stored in the user's profile
    // For now, we'll use mock data
    
    // Simulate loading
    const timer = setTimeout(() => {
      // Mock API response
      const mockBatch = {
        name: 'Sakha Super Batch',
        code: 'SAKHA-2024-SUPER',
        members: [
          { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'active' },
          { id: '2', name: 'Bob Williams', email: 'bob@example.com', status: 'pending' },
          { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'active' },
        ]
      };
      
      setBatchName(mockBatch.name);
      setBatchCode(mockBatch.code);
      setMembers(mockBatch.members);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleGenerateCode = async () => {
    setIsCodeGenerating(true);
    
    // In a real application, this would call an API to generate a new batch code
    // For now, we'll use a mock implementation
    
    // Simulate API call
    setTimeout(() => {
      const newCode = `SAKHA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setBatchCode(newCode);
      setIsCodeGenerating(false);
      
      toast({
        title: "New Code Generated",
        description: "A new batch code has been generated successfully.",
        variant: "default",
      });
    }, 1000);
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(batchCode);
    setCopiedCode(true);
    
    toast({
      title: "Code Copied",
      description: "Batch code copied to clipboard!",
    });
    
    setTimeout(() => {
      setCopiedCode(false);
    }, 2000);
  };
  
  const handleSendInvite = async (code: string): Promise<boolean> => {
    setIsInviteSending(true);
    
    // In a real application, this would call an API to send an invitation email
    // For now, we'll use a mock implementation
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!inviteEmail) {
          toast({
            title: "Error",
            description: "Please enter an email address.",
            variant: "destructive",
          });
          setIsInviteSending(false);
          resolve(false);
          return;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inviteEmail)) {
          toast({
            title: "Error",
            description: "Please enter a valid email address.",
            variant: "destructive",
          });
          setIsInviteSending(false);
          resolve(false);
          return;
        }
        
        toast({
          title: "Invite Sent",
          description: `Invitation sent to ${inviteEmail} successfully!`,
        });
        
        setIsInviteSending(false);
        setInviteEmail('');
        resolve(true);
      }, 1000);
    });
  };
  
  const handleLeaveBatch = async () => {
    setIsLeaving(true);
    
    // In a real application, this would call an API to remove the user from the batch
    // For now, we'll use a mock implementation
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Batch Left",
        description: "You have successfully left the batch.",
      });
      
      setIsLeaving(false);
      setShowLeaveDialog(false);
      navigate('/dashboard/student/subscription');
    }, 1000);
  };
  
  const handleRemoveMember = async (memberId: string) => {
    setIsRemoving(true);
    
    // In a real application, this would call an API to remove the member from the batch
    // For now, we'll use a mock implementation
    
    // Simulate API call
    setTimeout(() => {
      setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
      setIsRemoving(false);
      setShowRemoveDialog(false);
      setSelectedMemberId(null);
      
      toast({
        title: "Member Removed",
        description: "Member removed from the batch successfully.",
      });
    }, 1000);
  };
  
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-col space-y-1.5">
          <CardTitle className="text-2xl">Study Batch Management</CardTitle>
          <CardDescription>
            Manage your study batch, invite members, and view batch details.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="batchName">Batch Name</Label>
            <Input 
              id="batchName" 
              value={batchName} 
              disabled={!isLeader}
              onChange={(e) => setBatchName(e.target.value)} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="batchCode">Batch Code</Label>
            <div className="flex items-center">
              <Input 
                id="batchCode" 
                value={batchCode} 
                readOnly 
                className="cursor-not-allowed" 
              />
              <Button 
                variant="secondary" 
                size="sm" 
                className="ml-2"
                onClick={handleCopyCode}
                disabled={isCodeGenerating}
              >
                {copiedCode ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copiedCode ? "Copied" : "Copy"}
              </Button>
            </div>
            
            {isLeader && (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto w-fit"
                onClick={handleGenerateCode}
                disabled={isCodeGenerating}
              >
                {isCodeGenerating ? "Generating..." : "Generate New Code"}
              </Button>
            )}
          </div>
          
          {isLeader ? (
            <div className="grid gap-2">
              <Label htmlFor="inviteEmail">Invite Member</Label>
              <div className="flex items-center">
                <Input 
                  type="email" 
                  id="inviteEmail" 
                  placeholder="member@example.com" 
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  disabled={isInviteSending}
                />
                <Button 
                  variant="default" 
                  size="sm" 
                  className="ml-2"
                  onClick={() => handleSendInvite(batchCode)}
                  disabled={isInviteSending}
                >
                  {isInviteSending ? "Sending..." : "Send Invite"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Share the batch code with your members or send them an invitation directly.
              </p>
            </div>
          ) : (
            <div className="rounded-md border p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-blue-500 mr-2" />
                <p className="text-sm text-blue-700">
                  Contact your batch leader to invite new members.
                </p>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Members</h3>
            {members.length === 0 ? (
              <p className="text-muted-foreground">No members in this batch yet.</p>
            ) : (
              <ul className="list-none space-y-2">
                {members.map((member) => (
                  <li key={member.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{member.name} ({member.email})</span>
                    </div>
                    
                    {isLeader && member.id !== 'your-user-id' ? (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setShowRemoveDialog(true);
                          setSelectedMemberId(member.id);
                        }}
                        disabled={isRemoving}
                      >
                        <UserMinus className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    ) : member.status === 'pending' ? (
                      <span className="text-sm text-gray-500">Pending</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            {!isLeader && (
              <Button 
                variant="destructive"
                onClick={() => setShowLeaveDialog(true)}
                disabled={isLeaving}
              >
                {isLeaving ? "Leaving..." : "Leave Batch"}
              </Button>
            )}
            
            <Button variant="secondary" onClick={() => navigate('/dashboard/student')}>
              Go to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Leave Batch Confirmation Dialog */}
      {showLeaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Leave Batch</CardTitle>
              <CardDescription>Are you sure you want to leave this batch?</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setShowLeaveDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleLeaveBatch} disabled={isLeaving}>
                {isLeaving ? "Leaving..." : "Leave"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Remove Member Confirmation Dialog */}
      {showRemoveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Remove Member</CardTitle>
              <CardDescription>Are you sure you want to remove this member from the batch?</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setShowRemoveDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => handleRemoveMember(selectedMemberId)} disabled={isRemoving}>
                {isRemoving ? "Removing..." : "Remove"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BatchManagementPage;
