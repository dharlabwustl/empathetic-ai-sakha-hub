
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation } from "react-router-dom";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";
import { MoodType } from "@/types/user/base";
import { useVoiceAnnouncer } from "@/hooks/useVoiceAnnouncer";
import { getGreeting } from "@/components/dashboard/student/voice/voiceUtils";
import FloatingVoiceAssistant from "@/components/dashboard/student/FloatingVoiceAssistant";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(false); // Set to false to bypass splash screen
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

  // Voice announcer hook
  const { speakMessage, voiceSettings } = useVoiceAnnouncer({
    userName: userProfile?.name,
    initialSettings: {
      enabled: true,
      muted: false,
      language: 'en-IN',
      pitch: 1.1, // Higher pitch for female voice
      rate: 0.95  // Slightly faster for more energy
    }
  });

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
      // Store the profile image in localStorage for persistence across sessions
      localStorage.setItem('user_profile_image', userProfile.avatar);
    }

    // Auto-start voice greeting after 3 seconds
    if (userProfile?.name) {
      const timer = setTimeout(() => {
        const greeting = getGreeting(userProfile.name, currentMood?.toString(), false);
        speakMessage(greeting);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location, userProfile, speakMessage, currentMood]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
    
    if (!currentMood) {
      setCurrentMood(MoodType.Motivated);
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          parsedData.mood = MoodType.Motivated;
          localStorage.setItem("userData", JSON.stringify(parsedData));
        } catch (err) {
          console.error("Error updating user data in localStorage:", err);
          localStorage.setItem("userData", JSON.stringify({ mood: MoodType.Motivated }));
        }
      } else {
        localStorage.setItem("userData", JSON.stringify({ mood: MoodType.Motivated }));
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

  // Force welcome tour to never show
  const modifiedShowWelcomeTour = false;

  return (
    <>
      <DashboardLayout
        userProfile={enhancedUserProfile}
        hideSidebar={false}
        hideTabsNav={true} // Always hide tabs nav to prevent horizontal menu
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        showWelcomeTour={modifiedShowWelcomeTour}
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
      
      {/* Add the floating voice assistant */}
      <FloatingVoiceAssistant userName={userProfile.name} />
    </>
  );
};

export default StudentDashboard;
