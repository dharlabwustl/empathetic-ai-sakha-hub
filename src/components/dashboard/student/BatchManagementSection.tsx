import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Crown, Users, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';

interface BatchManagementSectionProps {
  isLeader: boolean;
  batchName: string;
  batchCode: string;
  onJoinBatch?: (code: string) => Promise<boolean>;
}

const BatchManagementSection: React.FC<BatchManagementSectionProps> = ({ 
  isLeader,
  batchName,
  batchCode,
  onJoinBatch
}) => {
  const { toast } = useToast();
  const [batchCodeInput, setBatchCodeInput] = useState('');
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [joinStatus, setJoinStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { updateUserProfile } = useUserProfile(UserRole.Student);

  const [inviteEmail, setInviteEmail] = useState('');
  const [pendingRequests, setPendingRequests] = useState([
    { id: 'req-1', name: 'Arjun Singh', email: 'arjun@example.com', requestDate: '2025-04-20' },
    { id: 'req-2', name: 'Nisha Patel', email: 'nisha@example.com', requestDate: '2025-04-19' }
  ]);
  const [batchMembers, setBatchMembers] = useState([
    { id: 'mem-1', name: 'Vikram Sharma', email: 'vikram@example.com', joinDate: '2025-03-15', isOnline: true },
    { id: 'mem-2', name: 'Priya Gupta', email: 'priya@example.com', joinDate: '2025-03-20', isOnline: false },
    { id: 'mem-3', name: 'Rohit Kumar', email: 'rohit@example.com', joinDate: '2025-03-25', isOnline: true }
  ]);

  const handleJoinBatch = async () => {
    if (!batchCodeInput) {
      setErrorMessage('Please enter a batch code');
      return;
    }

    setJoinStatus('loading');
    
    try {
      if (onJoinBatch) {
        const success = await onJoinBatch(batchCodeInput);
        if (success) {
          setJoinStatus('success');
          setShowJoinDialog(false);
          
          updateUserProfile({
            batchName: `Study Group ${batchCodeInput.slice(-4)}`,
            batchCode: batchCodeInput,
            subscription: {
              id: `sub_${Date.now()}`,
              plan: 'group',
              status: 'active',
              expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
              isGroupLeader: false
            } as UserSubscription
          });
          
          toast({
            title: "Successfully joined batch",
            description: "You've been added to the study group with group plan benefits"
          });
        } else {
          setJoinStatus('error');
          setErrorMessage('Invalid batch code. Please check and try again.');
        }
      } else {
        setTimeout(() => {
          if (batchCodeInput === 'BATCH123' || batchCodeInput === 'TEST456' || batchCodeInput.startsWith('SAKHA-')) {
            setJoinStatus('success');
            
            updateUserProfile({
              batchName: `Study Group ${batchCodeInput.slice(-4)}`,
              batchCode: batchCodeInput,
              subscription: {
                id: `sub_${Date.now()}`,
                plan: 'group',
                status: 'active',
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                isGroupLeader: false
              } as UserSubscription
            });
            
            toast({
              title: "Successfully joined batch",
              description: "You've been added to the study group with group plan benefits"
            });
            setShowJoinDialog(false);
          } else {
            setJoinStatus('error');
            setErrorMessage('Invalid batch code. Please check and try again.');
          }
        }, 1500);
      }
    } catch (error) {
      setJoinStatus('error');
      setErrorMessage('An error occurred. Please try again.');
      console.error("Error joining batch:", error);
    }
  };

  const handleLeaveBatch = () => {
    updateUserProfile({
      batchName: '',
      batchCode: '',
      isGroupLeader: false,
      subscription: {
        id: `sub_${Date.now()}`,
        plan: 'basic',
        status: 'active',
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      } as UserSubscription
    });
    
    toast({
      title: "Left batch",
      description: "You've successfully left the batch",
      variant: "destructive"
    });
  };

  const handleInviteMember = () => {
    if (!inviteEmail) return;
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${inviteEmail}`
    });
    setInviteEmail('');
  };

  const handleApproveRequest = (id: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== id));
    
    toast({
      title: "Request approved",
      description: "The student has been added to your batch"
    });
  };

  const handleRejectRequest = (id: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== id));
    
    toast({
      title: "Request rejected",
      description: "The join request has been rejected"
    });
  };

  const handleRemoveMember = (id: string) => {
    setBatchMembers(prev => prev.filter(member => member.id !== id));
    
    toast({
      title: "Member removed",
      description: "The member has been removed from your batch"
    });
  };

  const isInBatch = batchName !== '';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Study Batch</h3>
        {!isInBatch && (
          <Button onClick={() => setShowJoinDialog(true)}>Join a Batch</Button>
        )}
      </div>

      {isInBatch ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-xl font-semibold flex items-center">
                  {batchName}
                  {isLeader && (
                    <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                      <Crown className="h-3 w-3 mr-1" /> Batch Leader
                    </Badge>
                  )}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Batch Code: <span className="font-mono">{batchCode}</span>
                </p>
              </div>
              {!isLeader && (
                <Button variant="outline" onClick={handleLeaveBatch}>
                  Leave Batch
                </Button>
              )}
            </div>

            {isLeader ? (
              <Tabs defaultValue="members" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="requests">Join Requests</TabsTrigger>
                </TabsList>
                
                <TabsContent value="members" className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter email address to invite"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleInviteMember}>
                      <UserPlus className="h-4 w-4 mr-1" /> Invite
                    </Button>
                  </div>
                  
                  <h4 className="font-medium mt-4">Batch Members ({batchMembers.length})</h4>
                  <div className="space-y-3">
                    {batchMembers.map(member => (
                      <div 
                        key={member.id} 
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{member.name}</p>
                            {member.isOnline && (
                              <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Joined: {new Date(member.joinDate).toLocaleDateString()}
                          </span>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(member.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="requests" className="mt-4 space-y-4">
                  <h4 className="font-medium">Pending Requests ({pendingRequests.length})</h4>
                  
                  {pendingRequests.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No pending requests
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {pendingRequests.map(request => (
                        <div 
                          key={request.id} 
                          className="flex justify-between items-center p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{request.name}</p>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              Requested: {new Date(request.requestDate).toLocaleDateString()}
                            </span>
                            <div className="space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-green-200 text-green-700 hover:bg-green-50"
                                onClick={() => handleApproveRequest(request.id)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-red-200 text-red-700 hover:bg-red-50"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-500" />
                  <span className="font-medium">You're a member of this batch</span>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Access the community tab to interact with your batch members and view discussions.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">You're not in a batch yet</h4>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join a study batch to connect with peers, participate in group discussions, and collaborate on exam preparation.
            </p>
            <Button onClick={() => setShowJoinDialog(true)}>Join a Batch</Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join a Study Batch</DialogTitle>
            <DialogDescription>
              Enter the batch code provided by your batch leader to join a study group.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batchCode">Batch Code</Label>
              <Input 
                id="batchCode"
                placeholder="Enter batch code"
                value={batchCodeInput}
                onChange={(e) => {
                  setBatchCodeInput(e.target.value);
                  setJoinStatus('idle');
                  setErrorMessage('');
                }}
              />
            </div>
            
            {joinStatus === 'error' && (
              <Alert variant="destructive" className="text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleJoinBatch} disabled={joinStatus === 'loading'}>
              {joinStatus === 'loading' ? 'Joining...' : 'Join Batch'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchManagementSection;
