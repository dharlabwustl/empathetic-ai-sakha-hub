
import React, { useState, useEffect } from 'react';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Users, Copy, Check } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const SubscriptionPage = () => {
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
  const [inviteCode, setInviteCode] = useState('');
  const [activationSuccess, setActivationSuccess] = useState(false);
  
  // For group leaders to manage invitations
  const [groupInvites, setGroupInvites] = useState<{code: string, email: string, used: boolean}[]>([]);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  
  const { toast } = useToast();
  
  useEffect(() => {
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
  }, []);
  
  const handleActivateCode = () => {
    if (inviteCode.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a valid invitation code",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate code validation
    // In a real app, this would check against a database of valid codes
    setTimeout(() => {
      // Simulate successful activation
      if (inviteCode.startsWith('SAKHA-')) {
        toast({
          title: "Success!",
          description: "Your premium access has been activated. Welcome to the group!",
          variant: "default",
        });
        
        setActivationSuccess(true);
        setCurrentPlan({
          id: 'group-pro-member',
          name: 'Group Pro (Member)',
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          isActive: true,
          isGroup: true
        });
      } else {
        toast({
          title: "Invalid Code",
          description: "The invitation code you entered is not valid",
          variant: "destructive",
        });
      }
    }, 1000);
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
                <Button variant={currentPlan.isGroup ? "outline" : "default"} className="mr-2">
                  {currentPlan.isGroup ? 'Manage Group' : 'Manage Subscription'}
                </Button>
                {currentPlan.isGroup && !currentPlan.name.includes('Member') && (
                  <Button variant="default">
                    View Group Dashboard
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
              <CardTitle className="text-xl">Manage Group Invitations</CardTitle>
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
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Activation Code Section for Group Members */}
        {!currentPlan.isGroup && !activationSuccess && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Have an Invitation Code?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  If you were invited to join a group plan, enter your invitation code below to activate your premium access.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    placeholder="Enter your invitation code (e.g. SAKHA-ABC123)"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleActivateCode}>
                    Activate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
