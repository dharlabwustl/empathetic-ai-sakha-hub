
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation } from "react-router-dom";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";
import { MoodType } from "@/types/user/base";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [showTourModal, setShowTourModal] = useState(false);
  const location = useLocation();
  
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

  // Check if it's the user's first login
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNewUser = params.get('new') === 'true';
    const completedOnboarding = params.get('completedOnboarding') === 'true';
    
    console.log("URL params:", { isNewUser, completedOnboarding });
    
    // Don't show splash screen for now
    setShowSplash(false);
    
    // Check if this is the first time user is visiting after signup
    const userData = localStorage.getItem("userData");
    const userDataObj = userData ? JSON.parse(userData) : {};
    const isFirstVisit = isNewUser || completedOnboarding || 
                        (userDataObj.loginCount === 1 && !userDataObj.sawWelcomeTour);
    
    // Show welcome tour only for first time visitors
    setShowTourModal(isFirstVisit);
    
    // Try to get saved mood from local storage
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.mood) {
          setCurrentMood(parsedData.mood);
        }
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }
  }, [location]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Mark that the user has seen the splash screen in this session
    sessionStorage.setItem("hasSeenSplash", "true");
    
    // Save a default optimistic mood if none is set
    if (!currentMood) {
      setCurrentMood(MoodType.Motivated);
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          parsedData.mood = MoodType.Motivated;
          localStorage.setItem("userData", JSON.stringify(parsedData));
        } catch (err) {
          console.error("Error updating mood in localStorage:", err);
        }
      }
    }
  };

  const handleSkipTourWrapper = () => {
    handleSkipTour();
    setShowTourModal(false);
    
    // Update user data to mark tour as seen
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        parsedData.sawWelcomeTour = true;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } catch (err) {
        console.error("Error updating user data:", err);
      }
    }
  };

  const handleCompleteTourWrapper = () => {
    handleCompleteTour();
    setShowTourModal(false);
    
    // Update user data to mark tour as seen
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        parsedData.sawWelcomeTour = true;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } catch (err) {
        console.error("Error updating user data:", err);
      }
    }
  };
  
  const handleOpenTour = () => {
    setShowTourModal(true);
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

  // Custom content based on active tab
  const getTabContent = () => {
    if (activeTab === "overview") {
      return <RedesignedDashboardOverview userProfile={userProfile} kpis={kpis} />;
    }
    
    // For other tabs, use the default tab content
    return null;
  };

  return (
    <>
      <DashboardLayout
        userProfile={userProfile}
        hideSidebar={hideSidebar}
        hideTabsNav={hideTabsNav}
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        showWelcomeTour={false} // We're controlling this with our own state now
        onTabChange={handleTabChange}
        onViewStudyPlan={handleViewStudyPlan}
        onToggleSidebar={toggleSidebar}
        onToggleTabsNav={toggleTabsNav}
        onSkipTour={handleSkipTourWrapper}
        onCompleteTour={handleCompleteTourWrapper}
        onOpenTour={handleOpenTour} // Add this prop for manual tour opening
        showStudyPlan={showStudyPlan}
        onCloseStudyPlan={handleCloseStudyPlan}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        currentMood={currentMood}
        onMoodChange={setCurrentMood}
      >
        {getTabContent()}
      </DashboardLayout>
      
      {/* Welcome Tour Modal - will show automatically for first-time users only */}
      <WelcomeTour
        open={showTourModal}
        onOpenChange={setShowTourModal}
        onSkipTour={handleSkipTourWrapper}
        onCompleteTour={handleCompleteTourWrapper}
        isFirstTimeUser={userProfile.loginCount === 1}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        loginCount={userProfile.loginCount}
      />
    </>
  );
};

export default StudentDashboard;
