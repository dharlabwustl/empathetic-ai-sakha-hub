
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, Plus, RefreshCw, Users, X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface BatchManagementSectionProps {
  isLeader?: boolean;
  batchName?: string;
  batchCode?: string;
}

const BatchManagementSection: React.FC<BatchManagementSectionProps> = ({
  isLeader = false,
  batchName = '',
  batchCode = ''
}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newBatchName, setNewBatchName] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const isMemberOfBatch = !!batchName;
  
  // Sample batch members - In a real app, this would come from the API
  const batchMembers = [
    { id: '1', name: 'Amit Singh', avatar: '', role: 'Leader' },
    { id: '2', name: 'Priya Sharma', avatar: '', role: 'Member' },
    { id: '3', name: 'Raj Kumar', avatar: '', role: 'Member' },
  ];
  
  const handleJoinBatch = () => {
    if (!inviteCode) {
      toast({
        title: "Missing information",
        description: "Please enter a valid invite code",
        variant: "destructive",
      });
      return;
    }
    
    setIsJoining(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      toast({
        title: "Success",
        description: "You have successfully joined the batch!",
      });
      
      // In a real app, the page would be refreshed or state updated with new batch info
    }, 1500);
  };
  
  const handleCreateBatch = () => {
    if (!newBatchName) {
      toast({
        title: "Missing information",
        description: "Please enter a batch name",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      toast({
        title: "Success",
        description: "Batch created successfully!",
      });
      
      // In a real app, the page would be refreshed or state updated with new batch info
    }, 1500);
  };
  
  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(batchCode);
    setCopied(true);
    
    toast({
      title: "Copied!",
      description: "Invite code copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleLeaveBatch = () => {
    // Confirm before leaving batch
    if (!confirm("Are you sure you want to leave this batch?")) return;
    
    toast({
      title: "Left batch",
      description: "You have left the batch successfully",
    });
    
    // In a real app, the page would be refreshed or state updated
  };
  
  const handleRegenerateCode = () => {
    toast({
      title: "New invite code generated",
      description: "The invite code has been updated",
    });
    
    // In a real app, the code would be regenerated and updated
  };
  
  const handleRemoveMember = (memberId: string) => {
    toast({
      title: "Member removed",
      description: "The member has been removed from the batch",
    });
    
    // In a real app, the member would be removed from the batch
  };

  return (
    <div className="space-y-6">
      {isMemberOfBatch ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Your Study Batch</CardTitle>
                  <CardDescription>
                    You are currently part of a study batch
                  </CardDescription>
                </div>
                
                <Badge className="bg-green-500">Active</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                <div>
                  <div className="text-sm text-muted-foreground">Batch Name</div>
                  <div className="font-medium text-lg">{batchName}</div>
                </div>
                
                <div className="flex flex-col md:items-end">
                  <div className="text-sm text-muted-foreground">Your Role</div>
                  <Badge variant="outline" className={`${isLeader ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                    {isLeader ? 'Leader' : 'Member'}
                  </Badge>
                </div>
              </div>
              
              {isLeader && (
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                  <div className="flex-grow">
                    <div className="text-sm text-muted-foreground">Invite Code</div>
                    <div className="font-mono bg-white dark:bg-gray-700 py-2 px-3 rounded border mt-1">
                      {batchCode || 'BATCH-123456'}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 self-stretch sm:self-auto">
                    <Button 
                      variant="outline" 
                      onClick={handleCopyInviteCode}
                      className="flex-grow sm:flex-grow-0"
                    >
                      {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleRegenerateCode}
                      className="flex-grow sm:flex-grow-0"
                    >
                      <RefreshCw className="mr-1 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              )}
              
              {isLeader && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Batch Members</h3>
                  <div className="space-y-2">
                    {batchMembers.map(member => (
                      <div 
                        key={member.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium">
                            {member.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <Badge variant="outline" className={`text-xs ${member.role === 'Leader' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-700'}`}>
                              {member.role}
                            </Badge>
                          </div>
                        </div>
                        
                        {member.role !== 'Leader' && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <Button 
                  variant="destructive" 
                  onClick={handleLeaveBatch}
                >
                  {isLeader ? 'Disband Batch' : 'Leave Batch'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Join a Study Batch</CardTitle>
              <CardDescription>
                Enter an invite code to join an existing study group
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteCode">Invite Code</Label>
                <Input 
                  id="inviteCode"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Enter code (e.g., BATCH-123456)"
                />
              </div>
              
              <Button 
                className="w-full"
                onClick={handleJoinBatch}
                disabled={isJoining}
              >
                {isJoining ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Users className="mr-2 h-4 w-4" />
                    Join Batch
                  </>
                )}
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p>
                  By joining a batch, you agree to the batch's rules and guidelines.
                  You can leave the batch at any time.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Create a New Batch</CardTitle>
              <CardDescription>
                Start your own study group and invite friends
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="batchName">Batch Name</Label>
                <Input 
                  id="batchName"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  placeholder="e.g., IIT-JEE Champions"
                />
              </div>
              
              <Button 
                className="w-full"
                onClick={handleCreateBatch}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Batch
                  </>
                )}
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p>
                  As a batch leader, you'll be able to manage members and settings.
                  You'll also be able to create invite codes for others to join.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BatchManagementSection;
