import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Users, Copy, Check, Crown, UserPlus } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';
import { useToast } from '@/hooks/use-toast';
import BatchInvitationInput from '@/components/subscription/BatchInvitationInput';

const SubscriptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  
  const [currentPlan, setCurrentPlan] = useState({
    id: 'free',
    name: 'Free Trial',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    isActive: true,
    isGroup: false
  });

  // For invited users to enter invitation code
  const [activateInviteCode, setActivateInviteCode] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);
  
  // For group leaders to manage invitations
  const [groupInvites, setGroupInvites] = useState<{code: string, email: string, used: boolean}[]>([]);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if there's any plan update from the checkout process
    if (location.state?.planUpdated && location.state?.newPlan) {
      const plan = location.state.newPlan;
      setCurrentPlan({
        id: plan.id,
        name: plan.name,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
        isGroup: plan.isGroup
      });
      
      // If it's a group plan and the user is the leader
      if (location.state.isGroupLeader && location.state.invitedEmails && location.state.inviteCodes) {
        // Create invitation records
        const invites = location.state.invitedEmails.map((email: string, index: number) => ({
          code: location.state.inviteCodes[index],
          email: email,
          used: false
        }));
        
        setGroupInvites(invites);
        
        toast({
          title: "Group Plan Activated",
          description: "You are now a batch leader. Manage your group in this section.",
          variant: "default",
        });
      }
    }
    
    // In a real application, this would fetch the user's subscription status
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('plan') === 'updated') {
      toast({
        title: "Subscription Updated",
        description: "Your plan has been updated successfully.",
        variant: "default",
      });
    } else if (urlParams.get('plan') === 'group-activated') {
      toast({
        title: "Group Plan Activated",
        description: "You are now a batch leader. Manage your group in this section.",
        variant: "default",
      });
      
      setCurrentPlan({
        id: 'group-pro',
        name: 'Group Pro',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
        isGroup: true
      });
      
      // Extract invitation codes and emails from URL params
      const codes = urlParams.get('codes')?.split(',') || [];
      const emails = urlParams.get('emails')?.split(',') || [];
      
      // Create invitation records
      const invites = codes.map((code, index) => ({
        code,
        email: emails[index] || `user${index + 1}@example.com`,
        used: false
      }));
      
      setGroupInvites(invites);
    }
  }, [location]);
  
  const handleActivateBatchCode = async (code: string): Promise<boolean> => {
    // In a real application, this would call an API to verify the code
    // and update the user's membership in the batch
    
    // Mock implementation for now
    if (code.startsWith('SAKHA-')) {
      toast({
        title: "Success!",
        description: "You have successfully joined the batch. Welcome!",
        variant: "default",
      });
      
      setActivationSuccess(true);
      // You would typically update the currentPlan state here based on the batch's plan
      setCurrentPlan({
        id: 'group-pro-member',
        name: 'Group Pro (Member)',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
        isGroup: true
      });
      
      return true;
    } else {
      return false;
    }
  };
  
  const copyInviteCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    
    setTimeout(() => {
      setCopiedCodeIndex(null);
    }, 2000);
    
    toast({
      title: "Code Copied!",
      description: "Invitation code copied to clipboard",
    });
  };
  
  const handleManageBatch = () => {
    navigate('/dashboard/student/batch');
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
          <h1 className="text-3xl font-bold mb-2">Your Subscription</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your subscription and see available plans
          </p>
        </div>
        
        {/* Current Plan Section */}
        <Card className="mb-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          <div className={`h-2 ${
            currentPlan.isActive ? 
              'bg-green-500' : 
              'bg-amber-500'
          }`} />
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Current Plan</CardTitle>
              <Badge className={`${
                currentPlan.isActive ? 
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                  'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
              }`}>
                {currentPlan.isActive ? 'Active' : 'Expiring Soon'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">{currentPlan.name}</h2>
                <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400">
                  {currentPlan.isGroup ? (
                    <span className="flex items-center">
                      <Users size={16} className="mr-1" /> 
                      {currentPlan.name.includes('Member') ? 'Group Plan Member' : 'Group Plan (5 Users)'}
                    </span>
                  ) : (
                    <span>Individual Plan</span>
                  )}
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {currentPlan.isActive ? 'Renews' : 'Expires'} on {formatDate(currentPlan.expiryDate.toISOString())}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                {currentPlan.isGroup && !currentPlan.name.includes('Member') ? (
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="mr-2">
                      Manage Subscription
                    </Button>
                    <Button variant="default" onClick={handleManageBatch}>
                      <Crown size={16} className="mr-2" />
                      Manage Batch
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant={currentPlan.isGroup ? "outline" : "default"} 
                    className="mr-2"
                    onClick={() => currentPlan.isGroup ? handleManageBatch() : {}}
                  >
                    {currentPlan.isGroup ? 'View Batch Details' : 'Manage Subscription'}
                  </Button>
                )}
              </div>
            </div>
            
            {currentPlan.isGroup && !currentPlan.name.includes('Member') && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <div className="flex items-start">
                  <CheckCircle size={18} className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-300">You are a Batch Leader</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      You can manage your group members, track their progress, and add or remove users from your batch.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-sm p-0 h-auto text-blue-600 dark:text-blue-400"
                      onClick={handleManageBatch}
                    >
                      Go to Batch Management
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {currentPlan.isGroup && currentPlan.name.includes('Member') && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <div className="flex items-start">
                  <CheckCircle size={18} className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-300">Group Plan Member</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      You're part of a study group. All premium features have been unlocked.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Group Invitation Management for Batch Leader */}
        {currentPlan.isGroup && !currentPlan.name.includes('Member') && groupInvites.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                <span>Manage Group Invitations</span>
                <Button size="sm" onClick={handleManageBatch}>
                  <UserPlus size={16} className="mr-1" />
                  Batch Management
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Share these invitation codes with your group members. They can enter these codes during signup or in their subscription page.
                </p>
                
                <div className="space-y-3">
                  {groupInvites.map((invite, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md border-gray-200 dark:border-gray-700">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{invite.email}</span>
                          <Badge className={invite.used ? 
                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : 
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }>
                            {invite.used ? "Activated" : "Pending"}
                          </Badge>
                        </div>
                        <div className="mt-1 font-mono text-xs text-gray-600 dark:text-gray-400">
                          Code: {invite.code}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs h-8 flex items-center gap-1"
                          onClick={() => copyInviteCode(invite.code, index)}
                        >
                          {copiedCodeIndex === index ? <Check size={14} /> : <Copy size={14} />}
                          {copiedCodeIndex === index ? "Copied" : "Copy Code"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleManageBatch}>
                    Go to Full Batch Management
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Activation Code Button for Non-Group Members */}
        {!currentPlan.isGroup && !activationSuccess && !activateInviteCode && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={20} className="text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium">Have a batch invitation code?</h3>
                </div>
                <Button onClick={() => setActivateInviteCode(true)}>Enter Code</Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Activation Code Form */}
        {!currentPlan.isGroup && !activationSuccess && activateInviteCode && (
          <BatchInvitationInput 
            onActivate={handleActivateBatchCode} 
            activationSuccess={activationSuccess}
          />
        )}
        
        {/* Successful Activation Message */}
        {activationSuccess && (
          <Card className="mb-8 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                    Group Plan Activated Successfully!
                  </h3>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                    You now have access to all premium features as part of the group plan.
                    Enjoy your enhanced learning experience!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Available Plans Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
          <SubscriptionPlans currentPlanId={currentPlan.id} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
