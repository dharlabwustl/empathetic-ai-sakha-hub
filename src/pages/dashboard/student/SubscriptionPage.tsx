
import React, { useState, useEffect } from 'react';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';
import { useToast } from '@/hooks/use-toast';

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
        description: "You are now a batch leader. Manage your group in the profile section.",
        variant: "default",
      });
      setCurrentPlan({
        id: 'group-pro',
        name: 'Group Pro',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
        isGroup: true
      });
    }
  }, []);
  
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
                      <Users size={16} className="mr-1" /> Group Plan (5 Users)
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
                {currentPlan.isGroup && (
                  <Button variant="default">
                    View Group Dashboard
                  </Button>
                )}
              </div>
            </div>
            
            {currentPlan.isGroup && (
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
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
          <SubscriptionPlans currentPlanId={currentPlan.id} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
