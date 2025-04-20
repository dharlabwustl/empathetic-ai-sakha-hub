
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import BatchInvitationInput from '@/components/subscription/BatchInvitationInput';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import { CreditCard, CalendarClock, Clock, AlertCircle, CheckCircle, Users } from 'lucide-react';
import { SubscriptionPlan } from '@/types/user';
import { formatDateTime } from '@/utils/dateUtils';

interface UserSubscription {
  id: string;
  planName: string;
  startDate: string;
  endDate: string;
  nextBillingDate?: string;
  status: 'active' | 'inactive' | 'pending' | 'cancelled' | 'expired';
  price: number;
  isGroupPlan: boolean;
  groupId?: string;
  maxMembers?: number;
  memberCount?: number;
  isGroupLeader?: boolean;
}

export default function SubscriptionPage() {
  const {
    userProfile,
    loading,
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
  
  const [currentTab, setCurrentTab] = useState('current');
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [activationCode, setActivationCode] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [inviteCodes, setInviteCodes] = useState<string[]>([]);
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for state passed from checkout page
    const state = location.state as any;
    if (state?.planUpdated) {
      toast({
        title: "Subscription Updated",
        description: `You are now subscribed to ${state.newPlan.name}`,
      });
      
      if (state.isGroupLeader) {
        setInviteCodes(state.inviteCodes || []);
        setInvitedEmails(state.invitedEmails || []);
      }
      
      // Remove the state to prevent showing the message on refresh
      window.history.replaceState({}, document.title);
    }
    
    // Load mock subscription data
    const mockSubscription = {
      id: '123',
      planName: 'Premium Plan',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      endDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(), // 335 days in future
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days in future
      status: 'active' as const,
      price: 999,
      isGroupPlan: false,
    };
    
    setSubscription(mockSubscription);
    
    // If we have a groupId in the state, switch to the group tab
    if (state?.isGroupLeader) {
      setCurrentTab('group');
      setSubscription({
        ...mockSubscription,
        isGroupPlan: true,
        groupId: '456',
        maxMembers: 5,
        memberCount: state.invitedEmails?.length + 1 || 1,
        isGroupLeader: true,
        planName: 'Group Plan'
      });
    }
  }, [location.state]);
  
  const handleActivateCode = async (code: string): Promise<boolean> => {
    setIsActivating(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = code.startsWith('SAKHA-');
        
        if (success) {
          setActivationSuccess(true);
          
          toast({
            title: "Activation Successful",
            description: "Your subscription has been activated.",
          });
          
          setSubscription({
            id: '789',
            planName: 'Premium Plan',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            price: 999,
            isGroupPlan: false,
          });
        } else {
          toast({
            title: "Activation Failed",
            description: "Invalid activation code. Please try again.",
            variant: "destructive"
          });
        }
        
        setIsActivating(false);
        resolve(success);
      }, 1500);
    });
  };
  
  const handleSelectPlan = (plan: SubscriptionPlan, isGroup?: boolean) => {
    toast({
      title: "Plan Selected",
      description: `You selected the ${plan.name}. Proceeding to checkout.`,
    });
    
    if (isGroup) {
      navigate('/dashboard/student/group-checkout', { 
        state: { 
          plan: {
            ...plan,
            planType: 'group'
          }
        } 
      });
    } else {
      navigate('/checkout', { 
        state: { 
          selectedPlan: plan,
          isGroup: false
        } 
      });
    }
  };
  
  const handleManageBatch = () => {
    navigate('/dashboard/student/batch');
  };
  
  const handleManageSubscription = () => {
    toast({
      title: "Subscription Management",
      description: "Redirecting to billing portal...",
    });
    
    // Mock redirection to billing portal
    setTimeout(() => {
      window.open('https://billing.stripe.com/p/session/test_portal', '_blank');
    }, 1000);
  };
  
  const handleCancelSubscription = () => {
    toast({
      title: "Cancel Subscription",
      description: "Redirecting to billing portal to cancel your subscription...",
    });
    
    // Mock redirection to billing portal for cancellation
    setTimeout(() => {
      window.open('https://billing.stripe.com/p/session/test_portal', '_blank');
    }, 1000);
  };
  
  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

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
        <h1 className="text-3xl font-bold mb-2">Subscription</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Manage your subscription and plan details
        </p>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Plan</TabsTrigger>
            <TabsTrigger value="plans">Available Plans</TabsTrigger>
            <TabsTrigger value="group">Group Plans</TabsTrigger>
            <TabsTrigger value="activate">Activate Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            {subscription ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Current Subscription</CardTitle>
                        <CardDescription>Your active subscription details</CardDescription>
                      </div>
                      <Badge className={`${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {subscription.status === 'active' ? 'Active' : subscription.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border rounded-lg p-4 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-1">Plan</p>
                        <p className="text-lg font-semibold">{subscription.planName}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {subscription.isGroupPlan ? 'Group Plan' : 'Individual Plan'}
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-1">Price</p>
                        <p className="text-lg font-semibold">{formatPrice(subscription.price)}</p>
                        <p className="text-sm text-muted-foreground mt-1">per month</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-1">Renewal Date</p>
                        <p className="text-lg font-semibold">
                          {subscription.nextBillingDate ? formatDateTime(subscription.nextBillingDate) : 'N/A'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center">
                          <CalendarClock className="h-3 w-3 mr-1" /> 
                          Auto-renewal {subscription.status === 'active' ? 'enabled' : 'disabled'}
                        </p>
                      </div>
                    </div>
                    
                    {subscription.isGroupPlan && (
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="font-medium">Group Details</h3>
                            <p className="text-sm text-muted-foreground">
                              {subscription.memberCount} of {subscription.maxMembers} members
                            </p>
                          </div>
                          
                          {subscription.isGroupLeader && (
                            <Button onClick={handleManageBatch} variant="outline">
                              Manage Group
                            </Button>
                          )}
                        </div>
                        
                        {inviteCodes.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <h4 className="text-sm font-medium">Invitation Codes</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {inviteCodes.map((code, index) => (
                                <div key={index} className="flex items-center justify-between bg-muted p-2 rounded text-sm">
                                  <div className="flex items-center">
                                    <Users className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                    <span>{invitedEmails[index]}</span>
                                  </div>
                                  <span className="font-mono text-muted-foreground">{code}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Subscribed since {formatDateTime(subscription.startDate)}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCancelSubscription}>
                        Cancel Subscription
                      </Button>
                      <Button onClick={handleManageSubscription}>
                        Manage Billing
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Active Subscription</CardTitle>
                  <CardDescription>You don't have an active subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Explore our different plans to enhance your learning experience.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setCurrentTab('plans')}>View Plans</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="plans">
            <SubscriptionPlans
              currentPlanId={subscription?.id || ''}
              onSelectPlan={handleSelectPlan}
              activePlan={subscription ? {
                id: subscription.id,
                name: subscription.planName,
                nextBillingDate: subscription.nextBillingDate,
                status: subscription.status
              } : undefined}
            />
          </TabsContent>
          
          <TabsContent value="group">
            <SubscriptionPlans
              currentPlanId={subscription?.id || ''}
              onSelectPlan={handleSelectPlan}
              showGroupOption={true}
              activePlan={subscription?.isGroupPlan ? {
                id: subscription.id,
                name: subscription.planName,
                nextBillingDate: subscription.nextBillingDate,
                status: subscription.status
              } : undefined}
            />
          </TabsContent>
          
          <TabsContent value="activate">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activate Subscription Code</CardTitle>
                  <CardDescription>Have a subscription activation code? Enter it below.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter activation code"
                        value={activationCode}
                        onChange={(e) => setActivationCode(e.target.value)}
                        className="flex-1"
                        disabled={isActivating || activationSuccess}
                      />
                      <Button 
                        onClick={() => handleActivateCode(activationCode)} 
                        disabled={isActivating || activationSuccess || !activationCode.trim()}
                      >
                        {isActivating ? 'Activating...' : 'Activate'}
                      </Button>
                    </div>
                    
                    {activationSuccess && (
                      <div className="p-3 bg-green-50 text-green-800 rounded-md flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Subscription Activated!</p>
                          <p className="text-sm">Your subscription has been successfully activated.</p>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground">
                      Activation codes can be redeemed only once. After activation, your subscription will be immediately available.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <BatchInvitationInput 
                onJoinBatch={async (code) => {
                  toast({
                    title: "Processing",
                    description: "Verifying invitation code...",
                  });
                  
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  
                  toast({
                    title: "Success!",
                    description: "You've joined the batch successfully",
                  });
                }}
                onActivate={handleActivateCode}
                activationSuccess={activationSuccess}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
