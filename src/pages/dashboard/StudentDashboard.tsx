import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation } from "react-router-dom";
import { MoodType } from "@/types/user";

// Import our mood theme CSS
import "@/mood-themes.css";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
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

  // Check URL parameters for onboarding status and retrieve saved mood
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNewUser = params.get('new') === 'true';
    
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
      try {
        const parsedData = JSON.parse(savedUserData);
        if (parsedData.mood) {
          setCurrentMood(parsedData.mood as MoodType);
          // Apply the mood theme
          document.body.classList.add(`mood-${parsedData.mood}`);
        }
      } catch (error) {
        console.error("Error parsing userData from localStorage", error);
      }
    }
  }, [location]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Mark that the user has seen the splash screen in this session
    sessionStorage.setItem("hasSeenSplash", "true");
    
    // Save a default optimistic mood if none is set
    if (!currentMood) {
      const defaultMood: MoodType = "motivated";
      setCurrentMood(defaultMood);
      document.body.classList.add(`mood-${defaultMood}`);
      
      try {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          parsedData.mood = defaultMood;
          localStorage.setItem("userData", JSON.stringify(parsedData));
        } else {
          localStorage.setItem("userData", JSON.stringify({ mood: defaultMood }));
        }
      } catch (error) {
        console.error("Error saving mood to localStorage", error);
      }
    }
  };

  // Handle mood changes
  const handleMoodChange = (mood: MoodType) => {
    // Remove all existing mood classes
    document.body.classList.forEach(className => {
      if (className.startsWith('mood-')) {
        document.body.classList.remove(className);
      }
    });
    
    // Add the new mood class
    document.body.classList.add(`mood-${mood}`);
    
    // Update state
    setCurrentMood(mood);
    
    // Save to localStorage
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } else {
        localStorage.setItem("userData", JSON.stringify({ mood }));
      }
    } catch (error) {
      console.error("Error saving mood to localStorage", error);
    }
  };

  // Show splash screen if needed
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} mood={currentMood} />;
  }

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Show onboarding flow for first-time users
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
      onMoodChange={handleMoodChange}
    />
  );
};

export default StudentDashboard;
