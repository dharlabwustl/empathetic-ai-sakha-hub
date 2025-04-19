import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, CheckCircle, Send, UserPlus, User, Users, Crown, BarChart3, Calendar, CreditCard } from 'lucide-react';

interface Member {
  email: string;
  isLeader: boolean;
  status: 'active' | 'invited' | 'inactive';
  name?: string;
  progress?: number;
  lastActive?: string;
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

export default function BatchManagement() {
  const { toast } = useToast();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  useEffect(() => {
    // Load subscription data from localStorage
    const savedData = localStorage.getItem('subscriptionData');
    if (savedData) {
      setSubscriptionData(JSON.parse(savedData));
    }
  }, []);
  
  const handleSendInvite = () => {
    if (!inviteEmail || !inviteName) {
      toast({
        title: "Error",
        description: "Please enter both name and email",
        variant: "destructive",
      });
      return;
    }
    
    if (!subscriptionData) return;
    
    setIsSubmitting(true);
    
    const activeMembers = subscriptionData.members.filter(m => m.status !== 'inactive').length;
    
    if (activeMembers >= subscriptionData.userCount) {
      toast({
        title: "Group Limit Reached",
        description: "You've reached the maximum number of members for your plan",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(() => {
      // Get a code from remaining codes
      const usedEmails = new Set(subscriptionData.members.map(m => m.email));
      if (usedEmails.has(inviteEmail)) {
        toast({
          title: "Duplicate Email",
          description: "This email has already been invited to your group",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Find an available invite code
      const codeIndex = subscriptionData.members.length - 1;
      const inviteCode = subscriptionData.inviteCodes[codeIndex] || `SAKHA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // Add the new member
      const updatedMembers = [
        ...subscriptionData.members,
        {
          email: inviteEmail,
          name: inviteName,
          isLeader: false,
          status: 'invited',
          progress: 0,
          joinDate: new Date().toISOString(),
        }
      ];
      
      const updatedData = {
        ...subscriptionData,
        members: updatedMembers,
      };
      
      setSubscriptionData(updatedData);
      localStorage.setItem('subscriptionData', JSON.stringify(updatedData));
      
      toast({
        title: "Invitation Sent",
        description: `${inviteName} has been invited to your group with code ${inviteCode}`,
      });
      
      setInviteEmail('');
      setInviteName('');
      setIsSubmitting(false);
      setShowInviteDialog(false);
    }, 1500);
  };
  
  const handleActivateCode = () => {
    if (!activationCode) {
      toast({
        title: "Error",
        description: "Please enter an activation code",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate code activation
    setTimeout(() => {
      // In a real app, this would validate with the backend
      const isValid = activationCode.startsWith('SAKHA-');
      
      if (isValid) {
        // Create subscription data for a group member
        const memberData: SubscriptionData = {
          planId: 'group',
          planName: 'Group Plan',
          price: 2499,
          userCount: 5,
          isGroupLeader: false,
          purchaseDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          members: [
            { email: 'groupleader@example.com', isLeader: true, status: 'active' },
            { email: localStorage.getItem('userEmail') || '', isLeader: false, status: 'active' },
            // Other members would be fetched from an API in a real implementation
          ],
          inviteCodes: [],
        };
        
        setSubscriptionData(memberData);
        localStorage.setItem('subscriptionData', JSON.stringify(memberData));
        
        toast({
          title: "Subscription Activated",
          description: "Your group plan membership has been activated successfully",
          variant: "default",
        });
        
        setShowActivateDialog(false);
      } else {
        toast({
          title: "Invalid Code",
          description: "Please check your activation code and try again",
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const assignNewLeader = (member: Member) => {
    if (!subscriptionData) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const updatedMembers = subscriptionData.members.map(m => ({
        ...m,
        isLeader: m.email === member.email
      }));
      
      const updatedData = {
        ...subscriptionData,
        isGroupLeader: member.email === localStorage.getItem('userEmail'),
        members: updatedMembers,
      };
      
      setSubscriptionData(updatedData);
      localStorage.setItem('subscriptionData', JSON.stringify(updatedData));
      
      toast({
        title: "Leader Changed",
        description: `${member.name || member.email} is now the group leader`,
      });
      
      setIsSubmitting(false);
      setSelectedMember(null);
    }, 1000);
  };
  
  const copyInviteCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    
    toast({
      title: "Code Copied",
      description: "Invitation code copied to clipboard",
    });
    
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  if (!subscriptionData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Group Management</CardTitle>
          <CardDescription>
            You are not part of any group plan yet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No Active Group Plan</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You need to either purchase a group plan or be invited to one.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="outline"
                onClick={() => setShowActivateDialog(true)}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Enter Invitation Code
              </Button>
              <Button asChild>
                <a href="/subscription">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Purchase Group Plan
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const isGroupLeader = subscriptionData.isGroupLeader;
  const availableSlots = subscriptionData.userCount - subscriptionData.members.filter(m => m.status !== 'inactive').length;
  const activeMembers = subscriptionData.members.filter(m => m.status === 'active');
  const pendingMembers = subscriptionData.members.filter(m => m.status === 'invited');
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="flex items-center">
              <Users className="h-5 w-5 mr-2" /> 
              Group Management
              {isGroupLeader && (
                <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Group Leader
                </Badge>
              )}
            </span>
            <span className="text-sm font-normal text-gray-500">
              {subscriptionData.members.filter(m => m.status !== 'inactive').length}/{subscriptionData.userCount} Members
            </span>
          </CardTitle>
          <CardDescription>
            {isGroupLeader 
              ? "Manage your group members and invitations" 
              : "You are part of a group plan membership"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="members">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="members" className="pt-4 space-y-4">
              {/* Plan & Slots Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Plan</h4>
                  <p className="font-medium text-lg">{subscriptionData.planName}</p>
                  <p className="text-sm text-gray-500">₹{subscriptionData.price}/month</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Status</h4>
                  <p className="font-medium text-lg flex items-center">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mr-2">
                      Active
                    </Badge>
                    <span className="text-sm text-gray-500">Until {new Date(subscriptionData.expiryDate).toLocaleDateString()}</span>
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Available Slots</h4>
                  <div className="flex items-end">
                    <p className="font-medium text-lg">{availableSlots}</p>
                    <p className="text-sm text-gray-500 ml-1">of {subscriptionData.userCount}</p>
                  </div>
                  <Progress value={(subscriptionData.userCount - availableSlots) / subscriptionData.userCount * 100} className="h-1.5 mt-2" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Active Members</h3>
                {isGroupLeader && availableSlots > 0 && (
                  <Button size="sm" onClick={() => setShowInviteDialog(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                )}
              </div>
              
              {/* Active Members Table */}
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Progress</TableHead>
                      {isGroupLeader && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeMembers.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                              {member.isLeader ? (
                                <Crown className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <User className="h-4 w-4 text-gray-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{member.name || 'User'}</p>
                              <p className="text-xs text-gray-500">{member.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-500">
                            {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Progress value={member.progress || 0} className="h-1.5 w-16 mr-2" />
                            <span className="text-sm">{member.progress || 0}%</span>
                          </div>
                        </TableCell>
                        {isGroupLeader && (
                          <TableCell className="text-right">
                            {!member.isLeader && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setSelectedMember(member)}
                              >
                                <Crown className="h-4 w-4 mr-1" />
                                Make Leader
                              </Button>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pending Invitations */}
              {pendingMembers.length > 0 && (
                <>
                  <h3 className="text-lg font-medium mt-6">Pending Invitations</h3>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Invite Code</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingMembers.map((member, index) => (
                          <TableRow key={index}>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800/30">
                                Invited
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {subscriptionData.inviteCodes[index] || "N/A"}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyInviteCode(subscriptionData.inviteCodes[index] || "", index)}
                              >
                                {copiedIndex === index ? (
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                ) : (
                                  <Copy className="h-4 w-4 mr-1" />
                                )}
                                {copiedIndex === index ? "Copied" : "Copy Code"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="activity" className="pt-4">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-900 border rounded-lg p-4">
                    <h3 className="font-medium flex items-center mb-4">
                      <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
                      Group Progress
                    </h3>
                    <div className="space-y-4">
                      {activeMembers.map((member, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{member.name || member.email}</span>
                            <span className="text-sm">{member.progress || Math.floor(Math.random() * 40) + 60}%</span>
                          </div>
                          <Progress value={member.progress || Math.floor(Math.random() * 40) + 60} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 border rounded-lg p-4">
                    <h3 className="font-medium flex items-center mb-4">
                      <Calendar className="h-4 w-4 mr-2 text-green-500" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-blue-500 pl-3 pb-4">
                        <p className="text-xs text-gray-500">Today</p>
                        <p className="text-sm">Amit completed Physics Mock Test with 85% score</p>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-3 pb-4">
                        <p className="text-xs text-gray-500">Yesterday</p>
                        <p className="text-sm">Priya joined study session for 2 hours</p>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-3">
                        <p className="text-xs text-gray-500">Apr 15, 2025</p>
                        <p className="text-sm">Suresh completed Chemistry assignment</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Group Study Plans</h3>
                  <div className="space-y-3">
                    <div className="border border-gray-100 dark:border-gray-800 rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">JEE Advanced Physics Revision</h4>
                          <p className="text-sm text-gray-500">Scheduled for April 25, 2025</p>
                        </div>
                        <Badge>Upcoming</Badge>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <div className="flex -space-x-2 mr-2">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                              <User className="h-3 w-3 text-gray-500" />
                            </div>
                          ))}
                        </div>
                        <span>3 members participating</span>
                      </div>
                    </div>
                    
                    <div className="border border-gray-100 dark:border-gray-800 rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Mock Test: Mathematics</h4>
                          <p className="text-sm text-gray-500">Scheduled for April 30, 2025</p>
                        </div>
                        <Badge>Upcoming</Badge>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <div className="flex -space-x-2 mr-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                              <User className="h-3 w-3 text-gray-500" />
                            </div>
                          ))}
                        </div>
                        <span>All members participating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="pt-4">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Subscription Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Plan</h4>
                      <p className="font-medium">{subscriptionData.planName}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Monthly Fee</h4>
                      <p className="font-medium">₹{subscriptionData.price}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Renewal Date</h4>
                      <p className="font-medium">{new Date(subscriptionData.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Started On</h4>
                      <p className="font-medium">{new Date(subscriptionData.purchaseDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Billing Cycle</h4>
                      <p className="font-medium">Monthly</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Max Members</h4>
                      <p className="font-medium">{subscriptionData.userCount}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex justify-end">
                    <Button variant="outline" className="mr-2">Cancel Subscription</Button>
                    <Button>Manage Payment Method</Button>
                  </div>
                </div>
                
                {isGroupLeader && (
                  <div className="bg-white dark:bg-gray-900 border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Group Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="groupName">Group Name</Label>
                          <Input id="groupName" defaultValue="JEE Study Group" className="mt-1" />
                        </div>
                        
                        <div>
                          <Label htmlFor="groupVisibility">Visibility</Label>
                          <Select defaultValue="private">
                            <SelectTrigger id="groupVisibility" className="mt-1">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="members">Members Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="groupDescription">Description</Label>
                        <textarea 
                          id="groupDescription" 
                          rows={3} 
                          defaultValue="A study group for JEE aspirants preparing together"
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Invite Member Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your group plan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Enter member's name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="Enter member's email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowInviteDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleSendInvite} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Send Invitation
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Activate Code Dialog */}
      <Dialog open={showActivateDialog} onOpenChange={setShowActivateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate Group Membership</DialogTitle>
            <DialogDescription>
              Enter your invitation code to join a group plan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="activationCode">Invitation Code</Label>
              <Input 
                id="activationCode"
                placeholder="e.g. SAKHA-AB12CD"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
              />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300">
              <p>
                This code was provided to you by the group leader. If you don't have a code, please contact them to receive one.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowActivateDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleActivateCode} disabled={isSubmitting}>
              {isSubmitting ? 'Activating...' : 'Activate Membership'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Change Leader Confirmation Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Group Leader</DialogTitle>
            <DialogDescription>
              Are you sure you want to transfer group leadership to {selectedMember?.name || selectedMember?.email}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md text-sm text-amber-700 dark:text-amber-300">
              <p className="font-medium mb-2">What happens when you transfer leadership?</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The new leader will have full control over the group</li>
                <li>They can invite or remove members</li>
                <li>They'll manage the subscription and billing</li>
                <li>You'll remain as a regular member of the group</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSelectedMember(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => selectedMember && assignNewLeader(selectedMember)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Transferring...' : 'Transfer Leadership'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
