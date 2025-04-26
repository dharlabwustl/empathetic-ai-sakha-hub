
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation, useParams } from "react-router-dom";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentMood, setCurrentMood] = useState<'sad' | 'neutral' | 'happy' | 'motivated' | undefined>(undefined);
  const location = useLocation();
  const params = useParams();
  
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
    features,
    lastActivity,
    suggestedNextAction,
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

  // Determine active tab from URL path
  useEffect(() => {
    const path = location.pathname;
    const tab = path.split('/').pop() || 'overview';
    
    // Only update if it's different from current tab to prevent unnecessary re-renders
    if (tab !== activeTab) {
      handleTabChange(tab);
    }
  }, [location.pathname]);

  // Check URL parameters for onboarding status
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const isNewUser = urlParams.get('new') === 'true';
    const completedOnboarding = urlParams.get('completedOnboarding') === 'true';
    const isReturningUser = urlParams.get('returning') === 'true';
    
    console.log("URL params:", { isNewUser, completedOnboarding, isReturningUser });
    
    // Don't show splash screen for new or returning users
    if (isNewUser || isReturningUser) {
      setShowSplash(false);
    } else {
      // Check if the user has seen the splash screen in this session
      const hasSeen = sessionStorage.getItem("hasSeenSplash");
      setShowSplash(!hasSeen);
    }
    
    // Try to get saved mood from local storage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
    }
  }, [location]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Mark that the user has seen the splash screen in this session
    sessionStorage.setItem("hasSeenSplash", "true");
    
    // Save a default optimistic mood if none is set
    if (!currentMood) {
      setCurrentMood('motivated');
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.mood = 'motivated';
        localStorage.setItem("userData", JSON.stringify(parsedData));
      }
    }
  };

  // Show splash screen if needed
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} mood={currentMood} />;
  }

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Show onboarding flow only for users who haven't completed it
  if (showOnboarding) {
    // Make sure we have a goal to work with
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
      lastActivity={lastActivity}
      suggestedNextAction={suggestedNextAction}
      currentMood={currentMood}
    />
  );
};

export default StudentDashboard;
