
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation } from "react-router-dom";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";
import { MoodType } from "@/types/user/base";
import UnifiedVoiceAssistant from "@/components/voice/UnifiedVoiceAssistant";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(false);
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

  // Important: Force disable welcome tour completely
  const [shouldShowTour, setShouldShowTour] = useState(false);

  useEffect(() => {
    // Explicitly mark tour as seen to prevent it from appearing
    localStorage.setItem('sawWelcomeTour', 'true');
    localStorage.removeItem('new_user_signup');
    
    // Don't show splash screen for now
    setShowSplash(false);
    
    // Try to get saved mood from local storage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        if (parsedData.mood) {
          setCurrentMood(parsedData.mood);
        }
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }

    // Ensure profile image is available
    if (userProfile && userProfile.avatar) {
      localStorage.setItem('user_profile_image', userProfile.avatar);
    }
  }, [location, userProfile]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
    
    if (!currentMood) {
      setCurrentMood(MoodType.MOTIVATED);
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          parsedData.mood = MoodType.MOTIVATED;
          localStorage.setItem("userData", JSON.stringify(parsedData));
        } catch (err) {
          console.error("Error updating user data in localStorage:", err);
          localStorage.setItem("userData", JSON.stringify({ mood: MoodType.MOTIVATED }));
        }
      } else {
        localStorage.setItem("userData", JSON.stringify({ mood: MoodType.MOTIVATED }));
      }
    }
  };

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } catch (err) {
        console.error("Error updating mood in localStorage:", err);
        localStorage.setItem("userData", JSON.stringify({ mood }));
      }
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} mood={currentMood} />;
  }

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

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

  // Ensure the profile has the correct image
  const enhancedUserProfile = {
    ...userProfile,
    avatar: userProfile.avatar || localStorage.getItem('user_profile_image')
  };

  const getTabContent = () => {
    if (activeTab === "overview") {
      return <RedesignedDashboardOverview userProfile={enhancedUserProfile} kpis={kpis} />;
    }
    return null;
  };

  // Check if user is first time
  const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true' || 
                         !userProfile.loginCount || userProfile.loginCount <= 1;

  return (
    <>
      <DashboardLayout
        userProfile={enhancedUserProfile}
        hideSidebar={false}
        hideTabsNav={true}
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        showWelcomeTour={false}
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
      >
        {getTabContent()}
      </DashboardLayout>
      
      {/* Unified Voice Assistant that handles all dashboard messaging */}
      <UnifiedVoiceAssistant
        userName={userProfile.name}
        language="en-US"
        isFirstTimeUser={isFirstTimeUser}
        userMood={currentMood?.toString()}
      />
    </>
  );
};

export default StudentDashboard;
