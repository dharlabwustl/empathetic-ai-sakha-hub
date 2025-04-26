
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation, useNavigate } from "react-router-dom";
import ReturningUserPrompt from "@/components/dashboard/student/ReturningUserPrompt";
import { MoodType } from "@/types/user/base";
import DashboardContent from "./DashboardContent";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(false);
  const [showReturningPrompt, setShowReturningPrompt] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [lastActivity, setLastActivity] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get the active tab from the URL path
  const pathSegments = location.pathname.split('/');
  const currentTabFromPath = pathSegments[pathSegments.length - 1];
  
  const {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    features,
    dashboardLastActivity,
    suggestedNextAction,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav,
    trackUserActivity
  } = useStudentDashboard();

  // Check for user state directly from localStorage
  useEffect(() => {
    console.log("StudentDashboard - Checking user state");
    
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      
      // Set last activity from stored data if it exists
      if (parsedData.lastActivity) {
        setLastActivity(parsedData.lastActivity);
        
        // Show returning prompt only if user has logged in before and has activity
        if (parsedData.isReturningUser && parsedData.loginCount > 1) {
          setShowReturningPrompt(true);
        }
      }
      
      // Get saved mood from localStorage
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood as MoodType);
      }
    }
  }, []);
  
  // Handle tab changes based on URL path
  useEffect(() => {
    if (currentTabFromPath && currentTabFromPath !== activeTab && currentTabFromPath !== 'all') {
      handleTabChange(currentTabFromPath);
    }
  }, [location.pathname, activeTab]);
  
  const handleContinueLastActivity = () => {
    setShowReturningPrompt(false);
    
    if (lastActivity) {
      switch (lastActivity.type) {
        case 'concept':
          navigate(`/dashboard/student/concepts/${lastActivity.id}`);
          break;
        case 'flashcard':
          navigate('/dashboard/student/flashcards');
          break;
        case 'exam':
          navigate(`/dashboard/student/exams/${lastActivity.id}`);
          break;
        default:
          navigate('/dashboard/student/overview');
      }
    }
  };
  
  const handleSkipLastActivity = () => {
    setShowReturningPrompt(false);
    navigate('/dashboard/student/overview');
  };

  // Returning user prompt handling
  if (showReturningPrompt && lastActivity) {
    return (
      <ReturningUserPrompt 
        lastActivity={lastActivity} 
        onContinue={handleContinueLastActivity}
        onSkip={handleSkipLastActivity}
      />
    );
  }

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Onboarding flow for new users
  if (showOnboarding) {
    const defaultGoal = "IIT-JEE";
    const goalTitle = userProfile?.goals?.[0]?.title || defaultGoal;
    
    return (
      <OnboardingFlow 
        userProfile={userProfile} 
        goalTitle={goalTitle}
        onComplete={handleCompleteOnboarding}
      />
    );
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
      lastActivity={dashboardLastActivity}
      suggestedNextAction={suggestedNextAction}
      currentMood={currentMood}
    >
      <DashboardContent 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userProfile={userProfile}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        features={features}
        showWelcomeTour={showWelcomeTour}
        handleSkipTour={handleSkipTour}
        handleCompleteTour={handleCompleteTour}
        hideTabsNav={hideTabsNav}
        lastActivity={dashboardLastActivity}
        suggestedNextAction={suggestedNextAction}
      />
    </DashboardLayout>
  );
};

export default StudentDashboard;
