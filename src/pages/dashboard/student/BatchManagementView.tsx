
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, Plus, UserPlus, Mail, Phone, Link as LinkIcon, 
  Key, ClipboardList, Check, ArrowLeft, UserMinus, Crown
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type BatchMember = {
  id: string;
  name: string;
  email: string;
  role: 'leader' | 'member';
  status: 'active' | 'pending' | 'inactive';
  progress?: number;
  joinDate?: string;
  avatar?: string;
};

type Batch = {
  id: string;
  name: string;
  examGoal: string;
  targetYear: string;
  createdAt: string;
  members: BatchMember[];
  inviteCode: string;
  maxMembers: number;
};

const BatchManagementView = () => {
  const { userProfile, loading } = useUserProfile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteMethod, setInviteMethod] = useState<'email' | 'phone' | 'link' | 'code'>('email');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [actionMemberId, setActionMemberId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'remove' | 'promote' | null>(null);
  
  // Sample batch data - in a real implementation this would come from an API
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: "batch-1",
      name: "IIT JEE Study Group",
      examGoal: "IIT JEE Advanced",
      targetYear: "2025",
      createdAt: "2023-10-15T10:30:00Z",
      inviteCode: "SAKHA-JEE25",
      maxMembers: 5,
      members: [
        {
          id: "user-1",
          name: "Rahul Kumar",
          email: "rahul@example.com",
          role: "leader",
          status: "active",
          progress: 78,
          joinDate: "2023-10-15T10:30:00Z",
          avatar: "https://i.pravatar.cc/150?img=1"
        },
        {
          id: "user-2",
          name: "Priya Singh",
          email: "priya@example.com",
          role: "member",
          status: "active",
          progress: 65,
          joinDate: "2023-10-16T14:22:00Z",
          avatar: "https://i.pravatar.cc/150?img=2"
        },
        {
          id: "user-3",
          name: "Amit Sharma",
          email: "amit@example.com",
          role: "member",
          status: "active",
          progress: 42,
          joinDate: "2023-10-18T09:15:00Z",
          avatar: "https://i.pravatar.cc/150?img=3"
        }
      ]
    }
  ]);
  
  const [newBatchData, setNewBatchData] = useState({
    name: "",
    examGoal: "",
    targetYear: new Date().getFullYear().toString()
  });
  
  const [inviteData, setInviteData] = useState({
    emails: "",
    phones: "",
    generatedLink: "",
    generatedCode: "SAKHA-" + Math.random().toString(36).substring(2, 8).toUpperCase()
  });
  
  // Handle batch creation
  const handleCreateBatch = () => {
    // In a real implementation, this would make an API call
    const newBatch: Batch = {
      id: "batch-" + (batches.length + 1),
      name: newBatchData.name,
      examGoal: newBatchData.examGoal,
      targetYear: newBatchData.targetYear,
      createdAt: new Date().toISOString(),
      inviteCode: "SAKHA-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      maxMembers: 5,
      members: [
        {
          id: userProfile?.id || "user-temp",
          name: userProfile?.name || "Current User",
          email: userProfile?.email || "user@example.com",
          role: "leader",
          status: "active",
          progress: 100,
          joinDate: new Date().toISOString(),
          avatar: userProfile?.avatar
        }
      ]
    };
    
    setBatches([...batches, newBatch]);
    setIsCreateDialogOpen(false);
    setNewBatchData({ name: "", examGoal: "", targetYear: new Date().getFullYear().toString() });
    
    toast({
      title: "Batch Created",
      description: `Your batch "${newBatch.name}" has been created successfully.`,
    });
  };
  
  // Handle member invitation
  const handleInviteMembers = () => {
    const activeBatch = batches[0]; // For simplicity, using the first batch
    let inviteCount = 0;
    
    if (inviteMethod === "email" && inviteData.emails) {
      const emailList = inviteData.emails.split(',').map(email => email.trim());
      inviteCount = emailList.length;
      
      // In a real implementation, this would make an API call to send invites
    } else if (inviteMethod === "phone" && inviteData.phones) {
      const phoneList = inviteData.phones.split(',').map(phone => phone.trim());
      inviteCount = phoneList.length;
      
      // In a real implementation, this would make an API call to send SMS invites
    }
    
    setIsInviteDialogOpen(false);
    setInviteData({
      emails: "",
      phones: "",
      generatedLink: "",
      generatedCode: "SAKHA-" + Math.random().toString(36).substring(2, 8).toUpperCase()
    });
    
    if (inviteCount > 0) {
      toast({
        title: "Invitations Sent",
        description: `${inviteCount} invitations have been sent to join your batch.`,
      });
    } else if (inviteMethod === "link") {
      toast({
        title: "Invite Link Generated",
        description: "Your invite link has been copied to clipboard.",
      });
    } else if (inviteMethod === "code") {
      toast({
        title: "Invite Code Generated",
        description: "Your invite code has been copied to clipboard.",
      });
    }
  };
  
  // Handle copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The invite information has been copied to your clipboard.",
    });
  };
  
  // Handle member action confirmation
  const handleConfirmAction = () => {
    if (!actionMemberId || !actionType) return;
    
    const updatedBatches = batches.map(batch => {
      const updatedMembers = batch.members.map(member => {
        if (member.id === actionMemberId) {
          if (actionType === 'remove') {
            return { ...member, status: 'inactive' };
          } else if (actionType === 'promote') {
            return { ...member, role: 'leader' as const };
          }
        } else if (actionType === 'promote' && member.role === 'leader') {
          return { ...member, role: 'member' as const };
        }
        return member;
      });
      
      // Filter out inactive members if removing
      const finalMembers = actionType === 'remove' 
        ? updatedMembers.filter(m => m.status !== 'inactive') 
        : updatedMembers;
      
      return {
        ...batch,
        members: finalMembers
      };
    });
    
    setBatches(updatedBatches);
    setIsConfirmDialogOpen(false);
    setActionMemberId(null);
    setActionType(null);
    
    toast({
      title: actionType === 'remove' ? "Member Removed" : "Leader Changed",
      description: actionType === 'remove' 
        ? "The member has been removed from your batch." 
        : "Leadership role has been transferred successfully.",
    });
  };
  
  // Initiate member action
  const initiateMemberAction = (memberId: string, action: 'remove' | 'promote') => {
    setActionMemberId(memberId);
    setActionType(action);
    setIsConfirmDialogOpen(true);
  };
  
  if (loading || !userProfile) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Loading batch information...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const activeBatch = batches.length > 0 ? batches[0] : null;
  const isBatchLeader = activeBatch?.members.some(member => 
    member.id === userProfile.id && member.role === 'leader'
  );

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="p-0 h-8 w-8" onClick={() => window.history.back()}>
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">Batch Management</h1>
          </div>
          
          {batches.length === 0 ? (
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus size={16} className="mr-1" />
              Create New Batch
            </Button>
          ) : (
            <Button onClick={() => setIsInviteDialogOpen(true)}>
              <UserPlus size={16} className="mr-1" />
              Invite Members
            </Button>
          )}
        </div>
        
        {batches.length === 0 ? (
          <Card className="p-6">
            <div className="text-center py-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold mb-2">No Batch Created Yet</h2>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Create your first study batch to invite members and collaborate with your peers.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus size={16} className="mr-1" />
                Create New Batch
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Batch Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span>{activeBatch?.name}</span>
                    <Badge>{activeBatch?.members.length}/{activeBatch?.maxMembers} Members</Badge>
                  </div>
                  <Badge variant="outline" className="border-amber-500 text-amber-600">
                    {activeBatch?.examGoal} - {activeBatch?.targetYear}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-4 mb-4 flex items-start">
                  <Key size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Batch Invite Code</p>
                    <div className="flex items-center mt-1">
                      <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-blue-800 dark:text-blue-200 font-mono">
                        {activeBatch?.inviteCode}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-2 h-7"
                        onClick={() => activeBatch && copyToClipboard(activeBatch.inviteCode)}
                      >
                        <ClipboardList size={14} />
                      </Button>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Share this code with others to join your batch. They can enter it in their profile page.
                    </p>
                  </div>
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Batch Created</h3>
                          <p>{new Date(activeBatch?.createdAt || "").toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Members</h3>
                          <p>{activeBatch?.members.filter(m => m.status === 'active').length}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Batch Leader</h3>
                          <p>{activeBatch?.members.find(m => m.role === 'leader')?.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Progress</h3>
                          <p>{Math.round(
                            (activeBatch?.members.reduce((sum, member) => sum + (member.progress || 0), 0) || 0) / 
                            (activeBatch?.members.length || 1)
                          )}%</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="members">
                    <ScrollArea className="h-[50vh]">
                      <div className="space-y-4">
                        {activeBatch?.members.map((member, index) => (
                          <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium">{member.name}</p>
                                  {member.role === 'leader' && (
                                    <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                      Leader
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                                <p className="text-xs text-muted-foreground">
                                  Joined {new Date(member.joinDate || "").toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            {isBatchLeader && member.id !== userProfile.id && (
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => initiateMemberAction(member.id, 'promote')}
                                >
                                  <Crown size={14} className="mr-1" />
                                  Make Leader
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => initiateMemberAction(member.id, 'remove')}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <UserMinus size={14} className="mr-1" />
                                  Remove
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="progress">
                    <div className="space-y-4">
                      {activeBatch?.members.map((member) => (
                        <div key={member.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                              </div>
                            </div>
                            <Badge variant={member.progress && member.progress > 70 ? "default" : "outline"}>
                              {member.progress || 0}% Complete
                            </Badge>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500" 
                              style={{ width: `${member.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Create Batch Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Study Batch</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div>
              <label htmlFor="batch-name" className="block text-sm font-medium mb-1">
                Batch Name
              </label>
              <Input 
                id="batch-name"
                placeholder="Enter batch name"
                value={newBatchData.name}
                onChange={(e) => setNewBatchData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label htmlFor="exam-goal" className="block text-sm font-medium mb-1">
                Exam Goal
              </label>
              <Input 
                id="exam-goal"
                placeholder="e.g., IIT JEE, NEET, GATE"
                value={newBatchData.examGoal}
                onChange={(e) => setNewBatchData(prev => ({ ...prev, examGoal: e.target.value }))}
              />
            </div>
            
            <div>
              <label htmlFor="target-year" className="block text-sm font-medium mb-1">
                Target Year
              </label>
              <Input 
                id="target-year"
                type="number"
                placeholder={new Date().getFullYear().toString()}
                value={newBatchData.targetYear}
                onChange={(e) => setNewBatchData(prev => ({ ...prev, targetYear: e.target.value }))}
              />
            </div>
            
            <div className="pt-3">
              <Button 
                onClick={handleCreateBatch}
                disabled={!newBatchData.name || !newBatchData.examGoal || !newBatchData.targetYear}
                className="w-full"
              >
                Create Batch
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Invite Members Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Invite Members to Your Batch</DialogTitle>
          </DialogHeader>
          <Tabs 
            value={inviteMethod} 
            onValueChange={(value) => setInviteMethod(value as 'email' | 'phone' | 'link' | 'code')}
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="email" className="flex items-center">
                <Mail size={14} className="mr-1" /> Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center">
                <Phone size={14} className="mr-1" /> Phone
              </TabsTrigger>
              <TabsTrigger value="link" className="flex items-center">
                <LinkIcon size={14} className="mr-1" /> Link
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center">
                <Key size={14} className="mr-1" /> Code
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-4 py-3">
              <TabsContent value="email">
                <div>
                  <label htmlFor="invite-emails" className="block text-sm font-medium mb-1">
                    Email Addresses (comma separated)
                  </label>
                  <Textarea 
                    id="invite-emails"
                    placeholder="e.g., student1@example.com, student2@example.com"
                    value={inviteData.emails}
                    onChange={(e) => setInviteData(prev => ({ ...prev, emails: e.target.value }))}
                    rows={4}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="phone">
                <div>
                  <label htmlFor="invite-phones" className="block text-sm font-medium mb-1">
                    Phone Numbers (comma separated)
                  </label>
                  <Textarea 
                    id="invite-phones"
                    placeholder="e.g., +91XXXXXXXXXX, +91XXXXXXXXXX"
                    value={inviteData.phones}
                    onChange={(e) => setInviteData(prev => ({ ...prev, phones: e.target.value }))}
                    rows={4}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="link">
                <div>
                  <label htmlFor="invite-link" className="block text-sm font-medium mb-1">
                    Invitation Link
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      id="invite-link"
                      value={`https://app.sakha.study/join?code=${inviteData.generatedCode}`}
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(`https://app.sakha.study/join?code=${inviteData.generatedCode}`)}
                    >
                      <ClipboardList size={16} />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Share this link with others to join your batch. The link will expire in 7 days.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="code">
                <div>
                  <label htmlFor="invite-code" className="block text-sm font-medium mb-1">
                    Invitation Code
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      id="invite-code"
                      value={inviteData.generatedCode}
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(inviteData.generatedCode)}
                    >
                      <ClipboardList size={16} />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Share this code with others to join your batch. The code will expire in 7 days.
                  </p>
                </div>
              </TabsContent>
              
              <div className="pt-3">
                <Button 
                  onClick={handleInviteMembers}
                  disabled={
                    (inviteMethod === 'email' && !inviteData.emails) || 
                    (inviteMethod === 'phone' && !inviteData.phones)
                  }
                  className="w-full"
                >
                  {inviteMethod === 'email' || inviteMethod === 'phone' ? 'Send Invitations' : 'Copy to Clipboard'}
                </Button>
              </div>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Action Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'remove' ? 'Remove Member' : 'Change Leader'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p className="mb-4">
              {actionType === 'remove' 
                ? 'Are you sure you want to remove this member from your batch? This action cannot be undone.'
                : 'Are you sure you want to transfer leadership to this member? You will become a regular member.'}
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmAction}
                variant={actionType === 'remove' ? 'destructive' : 'default'}
              >
                {actionType === 'remove' ? 'Remove' : 'Transfer Leadership'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default BatchManagementView;
