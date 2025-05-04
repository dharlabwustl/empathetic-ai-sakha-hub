
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation, useNavigate } from "react-router-dom";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";
import { MoodType } from "@/types/user/base";
import { useVoiceAnnouncer } from "@/hooks/useVoiceAnnouncer";
import { getGreeting } from "@/components/dashboard/student/voice/voiceUtils";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(false); // Set to false to bypass splash screen
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [showTour, setShowTour] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  useEffect(() => {
    // Check URL parameters for welcome tour trigger
    const searchParams = new URLSearchParams(location.search);
    const isNewUser = searchParams.get('new') === 'true';
    const completedOnboarding = searchParams.get('completedOnboarding') === 'true';
    
    if (isNewUser && completedOnboarding) {
      // Clean URL parameters
      navigate(location.pathname, { replace: true });
      
      // Show the welcome tour for new users
      setShowTour(true);
      
      // Mark that they've seen the welcome slider
      localStorage.setItem('sawWelcomeSlider', 'true');
      
      // They should see the tour next
      localStorage.setItem('sawWelcomeTour', 'false');
      
      // Show toast notification
      toast({
        title: "Welcome to PREPZR!",
        description: "Let's take a quick tour of the dashboard to help you get started.",
      });
    }
    
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
  }, [location, navigate, userProfile, toast]);
  
  useEffect(() => {
    // Auto-start welcome voice greeting for new users or those who completed onboarding
    if (userProfile?.name && showTour) {
      const timer = setTimeout(() => {
        const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
        const welcomeMessage = `Welcome to PREPZR, ${userProfile.name}! I'm your voice assistant. 
        Your dashboard shows your personalized study plan and daily tasks. 
        You can ask me questions anytime by clicking the microphone icon. 
        PREPZR is committed to supporting you at every step of your exam preparation journey. 
        Good luck with your studies!`;
        
        speakMessage(welcomeMessage);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [userProfile, speakMessage, showTour]);

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
  
  const handleCloseTour = () => {
    setShowTour(false);
    localStorage.setItem('sawWelcomeTour', 'true');
    localStorage.removeItem('new_user_signup');
    handleSkipTour();
  };
  
  const handleCompleteTourAndClose = () => {
    setShowTour(false);
    localStorage.setItem('sawWelcomeTour', 'true');
    localStorage.removeItem('new_user_signup');
    handleCompleteTour();
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

  return (
    <>
      <DashboardLayout
        userProfile={enhancedUserProfile}
        hideSidebar={hideSidebar}
        hideTabsNav={hideTabsNav}
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        showWelcomeTour={false} // Don't automatically show welcome tour
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
      
      {/* Separate WelcomeTour component that can be controlled independently */}
      {showTour && (
        <WelcomeTour
          open={showTour}
          onOpenChange={setShowTour}
          onSkipTour={handleCloseTour}
          onCompleteTour={handleCompleteTourAndClose}
          isFirstTimeUser={true}
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction}
          loginCount={userProfile.loginCount}
        />
      )}
    </>
  );
};

export default StudentDashboard;
