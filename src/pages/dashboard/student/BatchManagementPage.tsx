
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import BatchManagement, { BatchMember } from '@/components/subscription/BatchManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCheck, ChartBar, Settings } from 'lucide-react';

export default function BatchManagementPage() {
  const {
    userProfile,
    activeTab,
    showWelcomeTour,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    showStudyPlan,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();
  
  const [currentTab, setCurrentTab] = useState<'members' | 'analytics' | 'settings'>('members');
  const [batchMembers, setBatchMembers] = useState<BatchMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [batchInfo, setBatchInfo] = useState({
    name: 'My Study Group',
    planType: 'group' as const,
    maxMembers: 5,
    currentUserRole: 'leader' as const,
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real application, this would fetch batch data from an API
    // For now, we'll just simulate with mock data
    setTimeout(() => {
      const mockMembers: BatchMember[] = [
        {
          id: 'current-user-id',
          name: userProfile?.name || 'Current User',
          email: userProfile?.email || 'user@example.com',
          role: 'leader',
          status: 'active',
          joinedDate: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Raj Patel',
          email: 'raj.patel@example.com',
          role: 'member',
          status: 'active',
          joinedDate: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Priya Sharma',
          email: 'priya.sharma@example.com',
          role: 'member',
          status: 'pending',
          invitationCode: 'SAKHA-123456'
        },
        {
          id: '4',
          name: 'Amit Kumar',
          email: 'amit.kumar@example.com',
          role: 'member',
          status: 'inactive',
          joinedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setBatchMembers(mockMembers);
      setIsLoading(false);
    }, 1000);
  }, [userProfile]);
  
  const handleAddMember = async (email: string): Promise<{ success: boolean; inviteCode?: string }> => {
    // In a real application, this would call an API to add a member
    return new Promise((resolve) => {
      setTimeout(() => {
        const inviteCode = 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const newMember: BatchMember = {
          id: Date.now().toString(),
          name: email.split('@')[0], // Use part of email as temporary name
          email,
          role: 'member',
          status: 'pending',
          invitationCode: inviteCode
        };
        
        setBatchMembers([...batchMembers, newMember]);
        resolve({ success: true, inviteCode });
      }, 1000);
    });
  };
  
  const handleRemoveMember = async (id: string): Promise<boolean> => {
    // In a real application, this would call an API to remove a member
    return new Promise((resolve) => {
      setTimeout(() => {
        setBatchMembers(batchMembers.filter(member => member.id !== id));
        resolve(true);
      }, 500);
    });
  };
  
  const handleChangeBatchName = async (name: string): Promise<boolean> => {
    // In a real application, this would call an API to update the batch name
    return new Promise((resolve) => {
      setTimeout(() => {
        setBatchInfo({...batchInfo, name});
        resolve(true);
      }, 500);
    });
  };
  
  const handleTransferLeadership = async (memberId: string): Promise<boolean> => {
    // In a real application, this would call an API to transfer leadership
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedMembers = batchMembers.map(member => {
          if (member.id === memberId) {
            return {...member, role: 'leader'};
          }
          if (member.id === 'current-user-id') {
            return {...member, role: 'member'};
          }
          return member;
        });
        
        setBatchMembers(updatedMembers);
        
        // In a real application, we might redirect the user after leadership transfer
        toast({
          title: "Leadership Transferred",
          description: "You are no longer the batch leader",
        });
        
        // Navigate after a short delay to let the user see the toast
        setTimeout(() => {
          navigate('/dashboard/student/subscription');
        }, 3000);
        
        resolve(true);
      }, 1500);
    });
  };

  if (isLoading || !userProfile) {
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
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Batch Management</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Manage your batch members and settings
        </p>
        
        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)}>
          <TabsList className="mb-6">
            <TabsTrigger value="members" className="flex items-center gap-2">
              <UserCheck size={16} />
              Members
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <ChartBar size={16} />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="members">
            <BatchManagement
              batchMembers={batchMembers}
              batchName={batchInfo.name}
              planType={batchInfo.planType}
              maxMembers={batchInfo.maxMembers}
              currentUserRole={batchInfo.currentUserRole}
              onAddMember={handleAddMember}
              onRemoveMember={handleRemoveMember}
              onChangeBatchName={handleChangeBatchName}
              onTransferLeadership={handleTransferLeadership}
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Batch Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  This feature will be available soon. Track your batch's progress and engagement metrics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Batch Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Additional settings for managing your batch will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
