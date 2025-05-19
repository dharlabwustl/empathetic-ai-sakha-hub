
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import PlanHeader from './todays-plan/PlanHeader';
import NewTodaysPlanView from './todays-plan/NewTodaysPlanView';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const RedesignedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const goalTitle = userProfile?.goals?.[0]?.title || "NEET";
  
  // Get today's plan data
  const {
    loading,
    error,
    planData,
    activeView,
    setActiveView,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote
  } = useTodaysPlan(goalTitle, userProfile?.name || "Student");
  
  if (loading) {
    return <LoadingState message="Loading your study plan..." />;
  }
  
  if (error) {
    return (
      <ErrorState 
        title="Could not load study plan" 
        message={error} 
        action={
          <Button onClick={refreshData}>
            Try Again
          </Button>
        }
      />
    );
  }

  console.log("RedesignedTodaysPlan - Loaded plan data:", planData?.conceptCards?.length || 0, "concept cards");

  // Handle concept click to navigate to concept detail page
  const handleConceptClick = (conceptId: string) => {
    console.log("Navigating to concept detail page:", conceptId);
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  return (
    <SharedPageLayout
      title="Today's Plan"
      subtitle="Your personalized daily study schedule"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className={`space-y-4 sm:space-y-6 ${isMobile ? 'px-0' : ''}`}>
        <PlanHeader 
          planData={planData} 
          activeView={activeView}
          setActiveView={setActiveView}
          isMobile={isMobile}
        />
        
        <NewTodaysPlanView 
          planData={planData}
          onConceptClick={handleConceptClick}
          isMobile={isMobile}
        />
      </div>
    </SharedPageLayout>
  );
};

export default RedesignedTodaysPlan;
