
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import BatchManagementSection from '@/components/dashboard/student/BatchManagementSection';
import { useToast } from '@/hooks/use-toast';

const BatchManagementPage = () => {
  const {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
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
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLeader, setIsLeader] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [batchCode, setBatchCode] = useState('');
  
  useEffect(() => {
    if (userProfile) {
      setIsLeader(userProfile.isGroupLeader || false);
      setBatchName(userProfile.batchName || '');
      setBatchCode(userProfile.batchCode || '');
    }
  }, [userProfile]);
  
  const handleJoinBatch = async (code: string): Promise<boolean> => {
    // In a real app, this would call an API endpoint
    // For now, we'll simulate an API call with a timeout
    try {
      if (code.length < 6) {
        toast({
          title: "Invalid Code",
          description: "Batch code should be at least 6 characters",
          variant: "destructive"
        });
        return false;
      }
      
      // Check if it's a valid code (this would be done server-side in a real app)
      if (code.startsWith("BATCH") || code.startsWith("SAKHA")) {
        // Update local state
        setBatchCode(code);
        setBatchName("Study Batch " + code.slice(-4));
        
        // Update user profile (mock)
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          parsedData.batchCode = code;
          parsedData.batchName = "Study Batch " + code.slice(-4);
          localStorage.setItem("userData", JSON.stringify(parsedData));
        }
        
        // Simulate updating subscription to group plan
        const subscription = {
          id: `sub_${Date.now()}`,
          plan: 'group',
          status: 'active',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        // Update user profile with subscription
        if (userData) {
          const parsedData = JSON.parse(userData);
          parsedData.subscription = subscription;
          localStorage.setItem("userData", JSON.stringify(parsedData));
        }
        
        toast({
          title: "Success!",
          description: "You have successfully joined the batch. Your subscription has been upgraded to Group Plan."
        });
        
        // After a short delay, refresh the page to reflect changes
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        
        return true;
      } else {
        toast({
          title: "Invalid Code",
          description: "The batch code you entered is not valid.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Error joining batch:", error);
      toast({
        title: "Error",
        description: "Failed to join batch. Please try again.",
        variant: "destructive"
      });
      return false;
    }
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
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Study Batch Management</h1>
        
        <BatchManagementSection 
          isLeader={isLeader} 
          batchName={batchName} 
          batchCode={batchCode}
          onJoinBatch={handleJoinBatch}
        />
      </div>
    </DashboardLayout>
  );
};

export default BatchManagementPage;
