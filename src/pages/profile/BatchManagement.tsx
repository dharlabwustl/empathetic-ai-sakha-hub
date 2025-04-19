
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Users, UserPlus, Mail, Clock, BarChart, Calendar, ShieldCheck, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Member {
  email: string;
  name: string;
  isLeader: boolean;
  status: 'active' | 'inactive' | 'invited';
  progress?: number;
  joinDate?: string;
}

interface SubscriptionData {
  planId: string;
  planName: string;
  price: number;
  userCount: number;
  isGroupLeader: boolean;
  purchaseDate: string;
  expiryDate: string;
  members: Member[];
  inviteCodes: string[];
}

const BatchManagement: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  
  // Load subscription data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('subscriptionData');
    
    if (storedData) {
      setSubscriptionData(JSON.parse(storedData));
    }
  }, []);
  
  const handleSendInvite = () => {
    if (!inviteEmail || !inviteName) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and name",
        variant: "destructive",
      });
      return;
    }
    
    setIsInviting(true);
    
    // Simulate server delay
    setTimeout(() => {
      if (subscriptionData) {
        // Check if we've reached the limit
        if (subscriptionData.members.length >= subscriptionData.userCount) {
          toast({
            title: "Group Full",
            description: `Your ${subscriptionData.planName} allows up to ${subscriptionData.userCount} members.`,
            variant: "destructive",
          });
          setIsInviting(false);
          return;
        }
        
        // Check if email is already in the group
        if (subscriptionData.members.some(member => member.email === inviteEmail)) {
          toast({
            title: "Already Invited",
            description: "This email is already part of your group.",
            variant: "destructive",
          });
          setIsInviting(false);
          return;
        }
        
        // Generate a new invite code if needed
        let newInviteCode = '';
        if (subscriptionData.inviteCodes.length > 0) {
          newInviteCode = subscriptionData.inviteCodes[0];
        } else {
          newInviteCode = 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        }
        
        // Add the new member
        const updatedMembers = [
          ...subscriptionData.members,
          {
            email: inviteEmail,
            name: inviteName,
            isLeader: false,
            status: 'invited',
            progress: 0,
            joinDate: new Date().toISOString()
          }
        ];
        
        // Update subscription data
        const updatedInviteCodes = [...subscriptionData.inviteCodes];
        if (updatedInviteCodes.includes(newInviteCode)) {
          updatedInviteCodes.splice(updatedInviteCodes.indexOf(newInviteCode), 1);
        }
        
        const updatedData = {
          ...subscriptionData,
          members: updatedMembers,
          inviteCodes: updatedInviteCodes
        };
        
        // Save to localStorage
        localStorage.setItem('subscriptionData', JSON.stringify(updatedData));
        setSubscriptionData(updatedData);
        
        toast({
          title: "Invitation Sent",
          description: `Invitation code ${newInviteCode} sent to ${inviteEmail}`,
        });
        
        // Clear form
        setInviteEmail('');
        setInviteName('');
        setIsInviting(false);
      }
    }, 1000);
  };
  
  const handleActivateCode = () => {
    if (!inviteCode) {
      toast({
        title: "Missing Code",
        description: "Please enter an invitation code",
        variant: "destructive",
      });
      return;
    }
    
    setIsActivating(true);
    
    // Simulate server delay
    setTimeout(() => {
      // In a real app, you'd validate the code against your database
      // and update the subscription status for this user
      
      // For demo purposes, we'll create a fake subscription
      if (inviteCode.startsWith('SAKHA-')) {
        const mockSubscriptionData: SubscriptionData = {
          planId: 'group-pro',
          planName: 'Group Pro',
          price: 3999,
          userCount: 5,
          isGroupLeader: false,
          purchaseDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          members: [
            {
              email: 'group-leader@example.com',
              name: 'Group Leader',
              isLeader: true,
              status: 'active',
              progress: 78,
              joinDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              email: user?.email || 'current-user@example.com',
              name: user?.name || 'Current User',
              isLeader: false,
              status: 'active',
              progress: 0,
              joinDate: new Date().toISOString()
            },
            {
              email: 'member3@example.com',
              name: 'Member 3',
              isLeader: false,
              status: 'active',
              progress: 45,
              joinDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            }
          ],
          inviteCodes: ['SAKHA-ABC123', 'SAKHA-DEF456']
        };
        
        // Save to localStorage
        localStorage.setItem('subscriptionData', JSON.stringify(mockSubscriptionData));
        setSubscriptionData(mockSubscriptionData);
        
        toast({
          title: "Code Activated",
          description: "You have successfully joined the group plan!",
        });
        
        setInviteCode('');
      } else {
        toast({
          title: "Invalid Code",
          description: "The invitation code you entered is not valid",
          variant: "destructive",
        });
      }
      
      setIsActivating(false);
    }, 1500);
  };
  
  const handleAssignLeader = (email: string) => {
    if (!subscriptionData) return;
    
    // Update the leader status
    const updatedMembers = subscriptionData.members.map(member => ({
      ...member,
      isLeader: member.email === email
    }));
    
    const updatedData = {
      ...subscriptionData,
      members: updatedMembers,
      isGroupLeader: email === user?.email
    };
    
    // Save to localStorage
    localStorage.setItem('subscriptionData', JSON.stringify(updatedData));
    setSubscriptionData(updatedData);
    
    toast({
      title: "Leader Assigned",
      description: `${email} is now the group leader`,
    });
  };
  
  const handleRemoveMember = (email: string) => {
    if (!subscriptionData) return;
    
    // Remove the member
    const updatedMembers = subscriptionData.members.filter(member => member.email !== email);
    
    // Generate a new invite code
    const newInviteCode = 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const updatedData = {
      ...subscriptionData,
      members: updatedMembers,
      inviteCodes: [...subscriptionData.inviteCodes, newInviteCode]
    };
    
    // Save to localStorage
    localStorage.setItem('subscriptionData', JSON.stringify(updatedData));
    setSubscriptionData(updatedData);
    
    toast({
      title: "Member Removed",
      description: `${email} has been removed from the group`,
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Subscription</h1>
      
      {subscriptionData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Group Plan Details</CardTitle>
                <CardDescription>
                  Manage your {subscriptionData.planName} subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Plan</span>
                      <span className="font-medium">{subscriptionData.planName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
                      <span className="font-medium">₹{subscriptionData.price}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Members</span>
                      <span className="font-medium">{subscriptionData.members.length}/{subscriptionData.userCount}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Start Date</span>
                      <span className="font-medium">{new Date(subscriptionData.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Renewal Date</span>
                      <span className="font-medium">{new Date(subscriptionData.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Your Role</span>
                      <span className="font-medium">
                        {subscriptionData.isGroupLeader ? (
                          <span className="flex items-center">
                            <Crown className="h-4 w-4 mr-1 text-amber-500" />
                            Group Leader
                          </span>
                        ) : 'Member'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="members" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="members" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Members
                </TabsTrigger>
                <TabsTrigger value="invites" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  Invite
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="members">
                <Card>
                  <CardHeader>
                    <CardTitle>Group Members</CardTitle>
                    <CardDescription>
                      {subscriptionData.members.length} of {subscriptionData.userCount} members
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {subscriptionData.members.map((member, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="mb-3 md:mb-0">
                            <div className="flex items-center">
                              <span className="font-medium">{member.name}</span>
                              {member.isLeader && (
                                <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                  Leader
                                </Badge>
                              )}
                              <Badge className={`ml-2 ${
                                member.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                member.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' :
                                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              }`}>
                                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{member.email}</div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              Joined: {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-gray-500 mb-1">Progress</div>
                              <div className="flex items-center">
                                <BarChart className="h-4 w-4 mr-1 text-blue-500" />
                                <span>{member.progress || 0}%</span>
                              </div>
                            </div>
                            
                            {subscriptionData.isGroupLeader && member.email !== user?.email && (
                              <div className="flex gap-2">
                                {!member.isLeader && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => handleAssignLeader(member.email)}
                                  >
                                    <Crown className="h-4 w-4 mr-1" />
                                    Make Leader
                                  </Button>
                                )}
                                
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => handleRemoveMember(member.email)}
                                >
                                  Remove
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="invites">
                <Card>
                  <CardHeader>
                    <CardTitle>Invite Members</CardTitle>
                    <CardDescription>
                      {subscriptionData.isGroupLeader ? 
                        "Add new members to your group" : 
                        "Your group leader can invite new members"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {subscriptionData.isGroupLeader ? (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="inviteEmail">Email Address</Label>
                            <Input 
                              id="inviteEmail" 
                              placeholder="friend@example.com" 
                              value={inviteEmail}
                              onChange={(e) => setInviteEmail(e.target.value)}
                              disabled={subscriptionData.members.length >= subscriptionData.userCount}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="inviteName">Name</Label>
                            <Input 
                              id="inviteName" 
                              placeholder="Friend's Name" 
                              value={inviteName}
                              onChange={(e) => setInviteName(e.target.value)}
                              disabled={subscriptionData.members.length >= subscriptionData.userCount}
                            />
                          </div>
                        </div>
                        
                        {subscriptionData.members.length >= subscriptionData.userCount && (
                          <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 p-3 rounded">
                            <p className="flex items-start">
                              <span className="mr-2">ℹ️</span>
                              <span>
                                Your group is full. To add more members, you need to remove existing members or upgrade your plan.
                              </span>
                            </p>
                          </div>
                        )}
                        
                        <div>
                          <Button 
                            onClick={handleSendInvite} 
                            disabled={isInviting || subscriptionData.members.length >= subscriptionData.userCount}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            {isInviting ? 'Sending...' : 'Send Invitation'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-center">
                        <ShieldCheck className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p className="mb-2">Only the group leader can send invitations.</p>
                        <p className="text-sm text-gray-500">
                          Contact your group leader if you want to invite someone to the group.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {subscriptionData.inviteCodes.length > 0 && subscriptionData.isGroupLeader && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Available Invitation Codes</CardTitle>
                  <CardDescription>
                    Share these codes with your group members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {subscriptionData.inviteCodes.map((code, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <code className="font-mono">{code}</code>
                        <Button size="sm" variant="outline" onClick={() => {
                          navigator.clipboard.writeText(code);
                          toast({ title: "Copied!", description: "Code copied to clipboard" });
                        }}>
                          Copy
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Subscription Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Days Remaining
                  </span>
                  <span className="font-medium">
                    {Math.ceil((new Date(subscriptionData.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full"
                    style={{ 
                      width: `${Math.max(0, Math.min(100, 100 - Math.ceil((new Date(subscriptionData.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30) * 100)))}%` 
                    }}
                  ></div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Manage Billing
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activate Invitation</CardTitle>
                <CardDescription>
                  Join a group with an invitation code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="inviteCode">Invitation Code</Label>
                  <Input 
                    id="inviteCode" 
                    placeholder="SAKHA-XXXXXX" 
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleActivateCode} 
                  disabled={isActivating || subscriptionData.isGroupLeader}
                  className="w-full"
                >
                  {isActivating ? 'Activating...' : 'Activate Code'}
                </Button>
                
                {subscriptionData.isGroupLeader && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded text-sm text-amber-800 dark:text-amber-200">
                    You are already a group leader. You cannot join another group.
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-xs text-gray-500">
                  By activating a code, you'll join the corresponding group plan.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
            <CardDescription>
              You don't have an active group subscription yet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-300">Join a Group Plan</h3>
              <p className="text-blue-700 dark:text-blue-200 mb-4 text-sm">
                You can either start a new group plan or join an existing one with an invitation code.
              </p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-blue-800 dark:text-blue-300">Create a Group</h4>
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => window.location.href = '/subscription'}
                  >
                    View Plans
                  </Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 text-blue-800 dark:text-blue-300">Join with Code</h4>
                  <div className="space-y-2">
                    <Input 
                      placeholder="SAKHA-XXXXXX" 
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleActivateCode}
                      disabled={isActivating}
                    >
                      {isActivating ? 'Activating...' : 'Activate'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Benefits of Group Plans</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Lower cost per student (save up to 40%)</li>
                <li>Collaborate with peers on your exam preparation</li>
                <li>Track and compare progress with your study group</li>
                <li>Share study resources and insights</li>
                <li>Group-specific features and challenges</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BatchManagement;
