
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation } from "react-router-dom";
import ReturnUserWelcome from "@/components/dashboard/student/ReturnUserWelcome";
import { useAuth } from "@/contexts/auth/AuthContext";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentMood, setCurrentMood] = useState<'sad' | 'neutral' | 'happy' | 'motivated' | undefined>(undefined);
  const location = useLocation();
  const { user } = useAuth();
  
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

  // Check URL parameters for onboarding status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNewUser = params.get('new') === 'true';
    const completedOnboarding = params.get('completedOnboarding') === 'true';
    
    console.log("URL params:", { isNewUser, completedOnboarding });
    
    // Don't show splash screen for new users coming from signup flow
    if (isNewUser) {
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

  // Check if this is a returning user - show splash screen only for first-time visitors
  useEffect(() => {
    if (user) {
      // If user exists and has logged in before, don't show splash
      const loginCount = userProfile?.loginCount || 0;
      if (loginCount > 1) {
        setShowSplash(false);
      }
    }
  }, [user, userProfile]);

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

  // Return user welcome dialog will be shown if this is a returning user
  const showReturnUserWelcome = userProfile.loginCount && userProfile.loginCount > 1;

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} mood={currentMood} />
      ) : (
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
      )}
      
      {/* Welcome back dialog for returning users */}
      {showReturnUserWelcome && (
        <ReturnUserWelcome 
          userName={userProfile.name}
          lastActivity={lastActivity}
        />
      )}
    </>
  );
};

export default StudentDashboard;
