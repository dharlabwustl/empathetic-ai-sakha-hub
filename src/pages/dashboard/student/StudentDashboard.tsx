
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation, useNavigate } from "react-router-dom";
import ReturningUserPrompt from "@/components/dashboard/student/ReturningUserPrompt";
import { MoodType } from "@/types/user/base";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showReturningPrompt, setShowReturningPrompt] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
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

  // Check URL parameters and localStorage for user status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNewUser = params.get('new') === 'true';
    const completedOnboarding = params.get('completedOnboarding') === 'true';
    const isReturningUser = params.get('returning') === 'true';
    
    console.log("URL params:", { isNewUser, completedOnboarding, isReturningUser });
    
    // For returning users, show continuation prompt
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
        
        // Get saved mood from localStorage
        if (parsedData.mood) {
          setCurrentMood(parsedData.mood as MoodType);
        }
      }
    } else if (isNewUser) {
      // New users from signup should see onboarding
      setShowSplash(false);
    } else {
      // Regular session start
      const hasSeen = sessionStorage.getItem("hasSeenSplash");
      setShowSplash(!hasSeen);
    }
    
    // Try to get saved mood from local storage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood as MoodType);
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
      const userData = localStorage.getItem("userData") ? 
        JSON.parse(localStorage.getItem("userData")!) : {};
      userData.mood = 'motivated';
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  };
  
  const handleContinueLastActivity = () => {
    setShowReturningPrompt(false);
    
    if (lastActivity) {
      if (lastActivity.type === 'concept') {
        navigate(`/dashboard/student/concepts/${lastActivity.id}`);
      } else if (lastActivity.type === 'flashcard') {
        navigate('/dashboard/student/flashcards');
      } else if (lastActivity.type === 'exam') {
        navigate(`/dashboard/student/exams/${lastActivity.id}`);
      } else {
        // Default to main dashboard
        navigate('/dashboard/student/overview');
      }
    }
  };
  
  const handleSkipLastActivity = () => {
    setShowReturningPrompt(false);
    navigate('/dashboard/student/overview');
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
