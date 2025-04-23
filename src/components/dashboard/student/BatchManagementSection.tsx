
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, Check, Users, UserPlus, Mail, AlertTriangle, X, Crown
} from 'lucide-react';

interface BatchManagementSectionProps {
  isLeader: boolean;
  batchName: string;
  batchCode: string;
  onJoinBatch?: (code: string) => Promise<boolean>; // Optional for join batch flows
}

interface BatchMember {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending';
  role: 'leader' | 'member';
  joinedDate: string;
}

const BatchManagementSection: React.FC<BatchManagementSectionProps> = ({
  isLeader,
  batchName,
  batchCode,
  onJoinBatch
}) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [batchCodeInput, setBatchCodeInput] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Mock batch members for leader view
  const [batchMembers, setBatchMembers] = useState<BatchMember[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      role: 'leader',
      joinedDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      role: 'member',
      joinedDate: '2023-01-16'
    },
    {
      id: '3',
      name: 'Invited User',
      email: 'invited@example.com',
      status: 'pending',
      role: 'member',
      joinedDate: '2023-01-20'
    }
  ]);
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(batchCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Code Copied!",
      description: "Batch invitation code copied to clipboard.",
    });
  };
  
  const handleSendInvite = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsInviting(true);
    
    // Mock API call
    setTimeout(() => {
      // Add the new member to the list
      const newMember: BatchMember = {
        id: `member-${Date.now()}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        status: 'pending',
        role: 'member',
        joinedDate: new Date().toISOString().split('T')[0]
      };
      
      setBatchMembers([...batchMembers, newMember]);
      
      // Reset and notify
      setInviteEmail('');
      setIsInviting(false);
      toast({
        title: "Invitation Sent!",
        description: `An invitation has been sent to ${inviteEmail}`,
      });
    }, 1000);
  };
  
  const handleRemoveMember = (id: string) => {
    setBatchMembers(batchMembers.filter(member => member.id !== id));
    toast({
      title: "Member Removed",
      description: "The member has been removed from your batch.",
    });
  };
  
  const handlePromoteLeader = (id: string) => {
    setBatchMembers(batchMembers.map(member => ({
      ...member,
      role: member.id === id ? 'leader' : member.role === 'leader' ? 'member' : member.role
    })));
    
    toast({
      title: "Leader Assigned",
      description: "Batch leadership has been transferred.",
    });
  };
  
  const handleJoinBatch = async () => {
    if (!batchCodeInput.trim()) {
      toast({
        title: "Empty Code",
        description: "Please enter a batch invitation code.",
        variant: "destructive",
      });
      return;
    }
    
    setIsJoining(true);
    
    if (onJoinBatch) {
      try {
        const success = await onJoinBatch(batchCodeInput);
        if (success) {
          toast({
            title: "Success!",
            description: "You have joined the batch successfully.",
          });
        } else {
          toast({
            title: "Invalid Code",
            description: "The code you entered is invalid or expired.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to join batch. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsJoining(false);
      }
    } else {
      // Mock success for demo
      setTimeout(() => {
        toast({
          title: "Success!",
          description: "You have joined the batch successfully.",
        });
        setIsJoining(false);
      }, 1000);
    }
  };
  
  // If user is a leader, show batch management tools
  if (isLeader) {
    return (
      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
          <TabsTrigger value="settings">Batch Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Batch Members</CardTitle>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  {batchMembers.filter(m => m.status === 'active').length} Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {batchMembers.map((member) => (
                        <tr key={member.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                                {member.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium">{member.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{member.email}</div>
                              </div>
                              {member.role === 'leader' && (
                                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Leader
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge 
                              variant="outline" 
                              className={
                                member.status === 'active' 
                                  ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200'
                                  : 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200'
                              }
                            >
                              {member.status === 'active' ? 'Active' : 'Pending'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {member.joinedDate}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            {member.id !== '1' && (
                              <div className="flex justify-end space-x-2">
                                {member.role !== 'leader' && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handlePromoteLeader(member.id)}
                                  >
                                    Make Leader
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  onClick={() => handleRemoveMember(member.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invites">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Invite Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="batch-code">Your Batch Invitation Code</Label>
                <div className="flex mt-1.5">
                  <Input 
                    id="batch-code"
                    value={batchCode}
                    readOnly 
                    className="rounded-r-none flex-1"
                  />
                  <Button
                    className="rounded-l-none"
                    onClick={handleCopyCode}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Share this code with users you want to invite to your batch.
                </p>
              </div>
              
              <div className="border-t pt-4">
                <Label htmlFor="invite-email">Invite by Email</Label>
                <div className="flex mt-1.5">
                  <Input 
                    id="invite-email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="rounded-r-none flex-1"
                  />
                  <Button
                    className="rounded-l-none"
                    onClick={handleSendInvite}
                    disabled={isInviting}
                  >
                    {isInviting ? "Sending..." : "Send Invite"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  An email with instructions will be sent to this address.
                </p>
              </div>
              
              {/* Pending Invites Section */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Pending Invites</h3>
                <div className="space-y-2">
                  {batchMembers.filter(m => m.status === 'pending').map((member) => (
                    <div key={member.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="text-sm">{member.email}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {batchMembers.filter(m => m.status === 'pending').length === 0 && (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No pending invitations
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Batch Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="batch-name">Batch Name</Label>
                <Input id="batch-name" defaultValue={batchName} />
              </div>
              
              <div className="pt-2">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    );
  }
  
  // For non-leaders or users without a batch - show join batch form
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Join a Study Batch
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {batchCode ? (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <UserPlus className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  You're already part of a batch
                </h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                  <p>Your batch code: <strong>{batchCode}</strong></p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    You're not part of any batch
                  </h3>
                  <div className="mt-2 text-sm text-amber-700 dark:text-amber-200">
                    <p>Enter a batch invitation code below to join a study group.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="join-code">Batch Invitation Code</Label>
              <div className="flex">
                <Input 
                  id="join-code"
                  value={batchCodeInput}
                  onChange={(e) => setBatchCodeInput(e.target.value)}
                  placeholder="Enter invitation code"
                  className="rounded-r-none flex-1"
                />
                <Button
                  className="rounded-l-none"
                  onClick={handleJoinBatch}
                  disabled={isJoining}
                >
                  {isJoining ? "Joining..." : "Join Batch"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Ask your batch leader for the invitation code.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BatchManagementSection;
