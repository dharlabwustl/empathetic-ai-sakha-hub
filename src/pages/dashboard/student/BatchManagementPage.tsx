
import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Copy, 
  Check, 
  Star, 
  User, 
  Mail, 
  ArrowUp, 
  Clock, 
  ArrowRight, 
  Trash, 
  Send, 
  Plus,
  UserPlus 
} from 'lucide-react';

interface BatchMember {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'leader' | 'member';
  status: 'active' | 'pending';
  progressPercent: number;
  activeSince?: string;
  lastActive?: string;
  inviteCode?: string;
}

const BatchManagementPage = () => {
  const {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();
  
  const { toast } = useToast();
  
  // State management
  const [batchMembers, setBatchMembers] = useState<BatchMember[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [copiedInviteIndex, setCopiedInviteIndex] = useState<number | null>(null);
  const [isLeader, setIsLeader] = useState(true);
  
  useEffect(() => {
    // Fetch batch information - simulated for now
    const mockBatchData: BatchMember[] = [
      {
        id: '1',
        name: 'You',
        email: userProfile?.email || 'user@example.com',
        avatarUrl: userProfile?.avatar, // Changed from avatarUrl to avatar
        role: 'leader',
        status: 'active',
        progressPercent: 76,
        activeSince: '2025-03-15',
        lastActive: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Rahul Kumar',
        email: 'rahul@example.com',
        role: 'member',
        status: 'active',
        progressPercent: 68,
        activeSince: '2025-03-18',
        lastActive: '2025-04-18T14:30:00',
      },
      {
        id: '3',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        role: 'member',
        status: 'active',
        progressPercent: 92,
        activeSince: '2025-03-20',
        lastActive: '2025-04-19T09:15:00',
      },
      {
        id: '4',
        email: 'arun@example.com',
        name: '',
        role: 'member',
        status: 'pending',
        progressPercent: 0,
        inviteCode: 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      }
    ];
    
    setBatchMembers(mockBatchData);
    
    // Check if the current user is a leader or a member
    const currentUser = mockBatchData.find(member => member.email === userProfile?.email);
    setIsLeader(currentUser?.role === 'leader');
    
  }, [userProfile]);
  
  const handlePromoteToLeader = (memberId: string) => {
    setBatchMembers(prev => 
      prev.map(member => {
        if (member.id === memberId) {
          return { ...member, role: 'leader' };
        }
        if (member.id === '1') { // current user
          return { ...member, role: 'member' };
        }
        return member;
      })
    );
    
    toast({
      title: "Leadership Transferred",
      description: "You are no longer the batch leader.",
      variant: "default",
    });
  };
  
  const handleRemoveMember = (memberId: string) => {
    setBatchMembers(prev => prev.filter(member => member.id !== memberId));
    
    toast({
      title: "Member Removed",
      description: "The member has been removed from your batch.",
      variant: "default",
    });
  };
  
  const handleResendInvite = (memberId: string) => {
    toast({
      title: "Invitation Resent",
      description: "Your invitation has been sent again.",
      variant: "default",
    });
  };
  
  const handleAddMember = () => {
    if (!newEmail.trim() || !newEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if we already have 5 members (including pending)
    if (batchMembers.length >= 5) {
      toast({
        title: "Batch Full",
        description: "You can only have up to 5 members in your batch.",
        variant: "destructive",
      });
      return;
    }
    
    // Check for duplicate email
    if (batchMembers.some(member => member.email === newEmail)) {
      toast({
        title: "Duplicate Email",
        description: "This email is already in your batch.",
        variant: "destructive",
      });
      return;
    }
    
    // Add new member
    const newInviteCode = 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    setBatchMembers(prev => [
      ...prev, 
      {
        id: Math.random().toString(),
        email: newEmail,
        name: '',
        role: 'member',
        status: 'pending',
        progressPercent: 0,
        inviteCode: newInviteCode,
      }
    ]);
    
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${newEmail}.`,
      variant: "default",
    });
    
    setNewEmail('');
  };
  
  const copyInviteCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedInviteIndex(index);
    
    setTimeout(() => {
      setCopiedInviteIndex(null);
    }, 2000);
    
    toast({
      title: "Code Copied!",
      description: "Invitation code copied to clipboard",
    });
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };
  
  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Batch Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {isLeader ? 
              "Manage your batch members and monitor their progress" : 
              "View your batch details and member information"
            }
          </p>
        </div>
        
        {/* Batch Info Card */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Batch Information</CardTitle>
                <CardDescription>Group Pro Plan • 5 Member Capacity</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Members</div>
                <div className="text-2xl font-bold mt-1">{batchMembers.length} / 5</div>
                <div className="mt-2">
                  <Progress value={(batchMembers.length / 5) * 100} className="h-1" />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Batch Leader</div>
                <div className="text-lg font-semibold mt-1">
                  {batchMembers.find(m => m.role === 'leader')?.name || 'Unknown'}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Plan Expiry</div>
                <div className="text-lg font-semibold mt-1">May 19, 2025</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Add New Member (Only for Leader) */}
        {isLeader && (
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Add New Member</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Enter email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleAddMember} className="flex items-center gap-2">
                  <UserPlus size={16} />
                  <span>Send Invite</span>
                </Button>
              </div>
              
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {5 - batchMembers.length} invitation{5 - batchMembers.length !== 1 ? 's' : ''} remaining
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Members List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Batch Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {batchMembers.map((member, index) => (
                <div 
                  key={member.id || index} 
                  className="p-4 border rounded-lg border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800 shadow-sm">
                      <AvatarImage src={member.avatarUrl} alt={member.name || member.email} />
                      <AvatarFallback>
                        {(member.name || member.email).charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-lg">
                          {member.name || 'Pending User'}
                        </h3>
                        
                        {member.role === 'leader' && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                            <Star size={12} className="mr-1" />
                            Leader
                          </Badge>
                        )}
                        
                        {member.status === 'pending' && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Pending
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Mail size={14} className="mr-1" />
                        {member.email}
                      </div>
                      
                      {member.status === 'active' && (
                        <div className="mt-3 grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
                            <div className="mt-1 flex items-center gap-2">
                              <Progress value={member.progressPercent} className="flex-grow h-2" />
                              <span className="text-sm font-medium">{member.progressPercent}%</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col text-xs gap-1">
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1 text-gray-400" />
                              <span className="text-gray-500 dark:text-gray-400">
                                Member since: {formatDate(member.activeSince)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1 text-gray-400" />
                              <span className="text-gray-500 dark:text-gray-400">
                                Last active: {formatDateTime(member.lastActive)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {member.status === 'pending' && (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                            {member.inviteCode}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => copyInviteCode(member.inviteCode || '', index)}
                          >
                            {copiedInviteIndex === index ? (
                              <>
                                <Check size={12} className="mr-1" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy size={12} className="mr-1" /> Copy Code
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    {isLeader && member.id !== '1' && (
                      <div className="flex flex-col sm:flex-row gap-2 self-end sm:self-center mt-3 sm:mt-0">
                        {member.status === 'active' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handlePromoteToLeader(member.id)}
                              className="text-xs h-8"
                            >
                              <Star size={14} className="mr-1" /> Make Leader
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-xs h-8"
                            >
                              <Trash size={14} className="mr-1" /> Remove
                            </Button>
                          </>
                        )}
                        
                        {member.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleResendInvite(member.id)}
                              className="text-xs h-8"
                            >
                              <Send size={14} className="mr-1" /> Resend
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-xs h-8"
                            >
                              <Trash size={14} className="mr-1" /> Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BatchManagementPage;
