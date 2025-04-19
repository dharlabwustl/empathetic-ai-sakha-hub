
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { UserProfileType } from '@/types/user/base';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsContent as TabsPanel, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, UserPlus, Mail, Copy, Check, Crown, BarChart3, 
  BookOpen, RefreshCcw, Trash, Clock, UserCog, PlusCircle
} from 'lucide-react';

interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: 'leader' | 'member';
  joinedDate: string;
  progress: number;
  studyHours: number;
  avatarUrl?: string;
  status: 'active' | 'inactive' | 'pending';
  inviteCode?: string;
}

export default function BatchManagementPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('members');
  const [inviteEmail, setInviteEmail] = useState('');
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  
  const {
    loading,
    userProfile,
    hideSidebar,
    hideTabsNav,
    kpis,
    nudges,
    markNudgeAsRead,
    showWelcomeTour,
    showStudyPlan,
    handleTabChange: setDashboardTab,
    handleSkipTour,
    handleCompleteTour,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav,
  } = useStudentDashboard();
  
  // Initialize batch members
  const [batchMembers, setBatchMembers] = useState<BatchMember[]>([
    {
      id: '1',
      name: userProfile?.name || 'You',
      email: userProfile?.email || 'you@example.com',
      role: 'leader',
      joinedDate: new Date().toISOString(),
      progress: 85,
      studyHours: 28,
      avatarUrl: userProfile?.avatar || '',
      status: 'active'
    },
    {
      id: '2',
      name: 'Anurag Singh',
      email: 'anurag@example.com',
      role: 'member',
      joinedDate: new Date().toISOString(),
      progress: 72,
      studyHours: 22,
      status: 'active'
    },
    {
      id: '3',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      role: 'member',
      joinedDate: new Date().toISOString(),
      progress: 60,
      studyHours: 18,
      status: 'active'
    },
    {
      id: '4',
      name: '',
      email: 'ravi@example.com',
      role: 'member',
      joinedDate: new Date().toISOString(),
      progress: 0,
      studyHours: 0,
      status: 'pending',
      inviteCode: 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    }
  ]);

  // Check if we have new invites
  useEffect(() => {
    const state = location.state;
    if (state?.invitedEmails && state?.inviteCodes) {
      // Add new invites to the batch members
      const newInvites = state.invitedEmails.map((email: string, index: number) => ({
        id: Math.random().toString(36).substring(2, 10),
        name: '',
        email: email,
        role: 'member' as const,
        joinedDate: new Date().toISOString(),
        progress: 0,
        studyHours: 0,
        status: 'pending' as const,
        inviteCode: state.inviteCodes[index]
      }));
      
      setBatchMembers(prev => {
        // Filter out duplicates by email
        const existingEmails = prev.map(member => member.email);
        const uniqueNewInvites = newInvites.filter(invite => !existingEmails.includes(invite.email));
        return [...prev, ...uniqueNewInvites];
      });
    }
  }, [location.state]);

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }
  
  const handleMakeLeader = (memberId: string) => {
    setBatchMembers(prev => prev.map(member => {
      if (member.id === memberId) {
        return { ...member, role: 'leader' };
      }
      if (member.role === 'leader') {
        return { ...member, role: 'member' };
      }
      return member;
    }));
    
    toast({
      title: "Batch Leader Changed",
      description: "Leadership has been transferred successfully.",
    });
  };
  
  const handleRemoveMember = (memberId: string) => {
    setBatchMembers(prev => prev.filter(member => member.id !== memberId));
    
    toast({
      title: "Member Removed",
      description: "The member has been removed from the batch.",
    });
  };
  
  const handleSendInvite = () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to send an invite.",
        variant: "destructive"
      });
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    if (batchMembers.some(member => member.email === inviteEmail)) {
      toast({
        title: "Already Invited",
        description: "This email has already been invited to your batch.",
        variant: "destructive"
      });
      return;
    }
    
    const newInviteCode = 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    setBatchMembers(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 10),
        name: '',
        email: inviteEmail,
        role: 'member',
        joinedDate: new Date().toISOString(),
        progress: 0,
        studyHours: 0,
        status: 'pending',
        inviteCode: newInviteCode
      }
    ]);
    
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteEmail}`,
    });
    
    setInviteEmail('');
  };

  const copyInviteCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    
    setTimeout(() => {
      setCopiedCodeIndex(null);
    }, 2000);
    
    toast({
      title: "Code Copied!",
      description: "Invitation code copied to clipboard"
    });
  };
  
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600 dark:text-green-400';
    if (progress >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab="batch"
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={setDashboardTab}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Batch Management</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your study group and track progress
            </p>
          </div>
          
          <div>
            <Button 
              className="flex items-center gap-2"
              onClick={() => navigate('/dashboard/student/subscription')}
            >
              <Users size={16} />
              Manage Subscription
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">
                  {batchMembers.filter(m => m.status !== 'pending').length}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">/</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">5 Max</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {batchMembers.filter(m => m.status === 'pending').length} invitation{
                  batchMembers.filter(m => m.status === 'pending').length !== 1 ? 's' : ''} pending
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">
                  {Math.round(batchMembers.filter(m => m.status !== 'pending').reduce((acc, m) => acc + m.progress, 0) / 
                  Math.max(batchMembers.filter(m => m.status !== 'pending').length, 1))}%
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Based on active members
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Study Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">
                  {batchMembers.reduce((acc, m) => acc + m.studyHours, 0)}h
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Across all members
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full space-y-6"
        >
          <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-6">
            <TabsTrigger value="members">
              <Users size={16} className="mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="invites">
              <UserPlus size={16} className="mr-2" />
              Invitations
            </TabsTrigger>
          </TabsList>
          
          {/* Members Tab */}
          <TabsPanel value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Batch Members</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={() => setActiveTab('invites')}
                  >
                    <UserPlus size={14} />
                    Add Member
                  </Button>
                </CardTitle>
                <CardDescription>
                  Manage members and track their progress
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {batchMembers.filter(member => member.status !== 'pending').map((member) => (
                    <div key={member.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {member.avatarUrl ? (
                            <AvatarImage src={member.avatarUrl} alt={member.name} />
                          ) : (
                            <AvatarFallback className="bg-primary text-white">
                              {member.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{member.name}</h3>
                            {member.role === 'leader' && (
                              <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                <Crown size={12} className="mr-1" /> Leader
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-3 sm:mt-0">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                          <span className={`font-medium ${getProgressColor(member.progress)}`}>{member.progress}%</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Study Hours</span>
                          <span className="font-medium">{member.studyHours}h</span>
                        </div>
                        
                        {member.id !== '1' && (
                          <div className="flex gap-2 ml-auto">
                            {member.role !== 'leader' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs h-8"
                                onClick={() => handleMakeLeader(member.id)}
                              >
                                <Crown size={14} className="mr-1" />
                                Make Leader
                              </Button>
                            )}
                            
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-8 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              <Trash size={14} className="mr-1" />
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
            
            <Card>
              <CardHeader>
                <CardTitle>Batch Progress Overview</CardTitle>
                <CardDescription>
                  Track your batch's study progress and performance
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="p-4 text-center bg-gray-50 dark:bg-gray-800 rounded-md">
                  <BarChart3 size={40} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium mb-1">Progress Charts</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Detailed progress analytics will be available here soon.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="w-full flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock size={14} className="mr-2" /> Last updated: Just now
                  </span>
                  <Button size="sm" variant="outline" className="text-xs h-8">
                    <RefreshCcw size={14} className="mr-1" />
                    Refresh Data
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsPanel>
          
          {/* Invites Tab */}
          <TabsPanel value="invites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Send New Invitation</CardTitle>
                <CardDescription>
                  Invite new members to join your batch
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input
                      placeholder="Enter email address"
                      className="pl-10"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendInvite()}
                    />
                  </div>
                  <Button onClick={handleSendInvite} className="whitespace-nowrap">
                    <Mail className="mr-2" size={16} />
                    Send Invite
                  </Button>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm text-blue-700 dark:text-blue-200">
                  <p>You can invite up to {5 - batchMembers.length} more member{5 - batchMembers.length !== 1 ? 's' : ''} to your batch.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pending Invitations</CardTitle>
                <CardDescription>
                  Track and manage sent invitations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {batchMembers.filter(member => member.status === 'pending').length > 0 ? (
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {batchMembers
                      .filter(member => member.status === 'pending')
                      .map((member, index) => (
                        <div key={member.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center">
                              <Mail size={16} className="mr-2 text-gray-400" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                                Pending
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 mt-3 sm:mt-0">
                            <div className="font-mono text-sm border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-gray-50 dark:bg-gray-800">
                              {member.inviteCode}
                            </div>
                            
                            <Button 
                              size="sm"
                              variant="ghost"
                              className="h-8 text-xs"
                              onClick={() => member.inviteCode && copyInviteCode(member.inviteCode, index)}
                            >
                              {copiedCodeIndex === index ? (
                                <>
                                  <Check size={14} className="mr-1" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={14} className="mr-1" />
                                  Copy
                                </>
                              )}
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 text-xs text-red-600 hover:text-red-700"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              <Trash size={14} className="mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <UserPlus size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                    <h3 className="text-lg font-medium mb-1">No Pending Invitations</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Send invites to add members to your batch
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => document.querySelector('input')?.focus()}
                    >
                      <PlusCircle size={16} className="mr-2" />
                      Send New Invite
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsPanel>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
