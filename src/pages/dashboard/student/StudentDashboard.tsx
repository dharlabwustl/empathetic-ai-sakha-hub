
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation, useNavigate } from "react-router-dom";
import ReturningUserPrompt from "@/components/dashboard/student/ReturningUserPrompt";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showReturningPrompt, setShowReturningPrompt] = useState(false);
  const [currentMood, setCurrentMood] = useState<'sad' | 'neutral' | 'happy' | 'motivated' | undefined>(undefined);
  const [lastActivity, setLastActivity] = useState<any>(null);
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
    features,
    lastActivity: dashboardLastActivity,
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

  // Check URL parameters for onboarding status and returning user status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNewUser = params.get('new') === 'true';
    const completedOnboarding = params.get('completedOnboarding') === 'true';
    const isReturningUser = params.get('returning') === 'true';
    
    console.log("URL params:", { isNewUser, completedOnboarding, isReturningUser });
    
    // For returning users, show the continuation prompt
    if (isReturningUser) {
      // Get user data from localStorage
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        
        // Set last activity from stored data
        if (parsedData.lastActivity) {
          setLastActivity(parsedData.lastActivity);
          setShowReturningPrompt(true);
        }
        
        // Don't show splash for returning users
        setShowSplash(false);
      }
    } else if (isNewUser) {
      // Don't show splash screen for new users coming from signup flow
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
      
      // Check for last activity
      if (parsedData.lastActivity) {
        setLastActivity(parsedData.lastActivity);
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
  
  const handleContinueLastActivity = () => {
    setShowReturningPrompt(false);
    
    if (lastActivity) {
      if (lastActivity.type === 'concept') {
        navigate(`/dashboard/student/concepts/${lastActivity.id}`);
      } else if (lastActivity.type === 'flashcard') {
        navigate('/dashboard/student/flashcards');
      } else {
        // Default to main dashboard
        navigate('/dashboard/student/overview');
      }
    }
  };
  
  const handleSkipLastActivity = () => {
    setShowReturningPrompt(false);
  };

  // Show returning user prompt if needed
  if (showReturningPrompt && lastActivity) {
    return (
      <ReturningUserPrompt 
        lastActivity={lastActivity} 
        onContinue={handleContinueLastActivity}
        onSkip={handleSkipLastActivity}
      />
    );
  }

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

  // Update effect for handling navigation
  useEffect(() => {
    const path = location.pathname;
    const tab = path.split('/').pop() || 'overview';
    const returnParam = location.search.includes('returning=true');
    
    if (tab !== activeTab) {
      handleTabChange(tab);
    }
    
    // Preserve return parameter when navigating
    if (returnParam) {
      const params = new URLSearchParams(location.search);
      if (params.get('returning') === 'true') {
        navigate(`${location.pathname}?returning=true`, { replace: true });
      }
    }
  }, [location.pathname, activeTab, handleTabChange, location, navigate]);

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
    />
  );
};

export default StudentDashboard;
