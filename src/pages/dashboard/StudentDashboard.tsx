
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation, useNavigate } from "react-router-dom";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";
import { MoodType } from "@/types/user/base";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import VoiceGreeting from "@/components/dashboard/student/voice/VoiceGreeting";
import WelcomeDashboardPrompt from "@/components/dashboard/student/WelcomeDashboardPrompt";
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from "@/components/dashboard/student/mood-tracking/moodUtils";
import DashboardVoiceAssistant from "@/components/voice/DashboardVoiceAssistant";
import FloatingVoiceButton from "@/components/voice/FloatingVoiceButton";
import { useIsMobile } from "@/hooks/use-mobile";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [showTourModal, setShowTourModal] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
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
    upcomingEvents,
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

  // Load profile image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('user_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Check URL parameters and localStorage for first-time user status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNew = params.get('new') === 'true' || localStorage.getItem('new_user_signup') === 'true';
    const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
    const hasSeenDashboardWelcome = localStorage.getItem("hasSeenDashboardWelcome") === "true";
    
    // Important: Fix for double tour/prompt issue - make sure we only show one UI element at a time
    if (isNew && !hasSeenTour) {
      // For new users who haven't seen the tour
      setShowSplash(false);
      setShowTourModal(true);
      setShowWelcomePrompt(false); // Ensure welcome prompt is hidden
      setIsFirstTimeUser(true);
      console.log("New user detected, showing welcome tour");
    } 
    else if (isNew && hasSeenTour && !hasSeenDashboardWelcome) {
      // For new users who have seen the tour but not the dashboard welcome
      setShowSplash(false);
      setShowTourModal(false); // Ensure tour is hidden
      setShowWelcomePrompt(true);
      setIsFirstTimeUser(true);
      console.log("New user needs dashboard welcome prompt");
    }
    else {
      // For returning users
      const hasSeen = sessionStorage.getItem("hasSeenSplash");
      setShowSplash(!hasSeen);
      
      // Make sure we don't show the tour or prompt for returning users who have seen it
      setShowTourModal(false);
      setShowWelcomePrompt(false);
      setIsFirstTimeUser(false);
      console.log("Returning user detected, not showing welcome tour");
    }
    
    // Try to get saved mood from local storage
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, [location]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
    
    // For new users, show the tour after splash
    const isNew = localStorage.getItem('new_user_signup') === 'true';
    const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
    const hasSeenDashboardWelcome = localStorage.getItem("hasSeenDashboardWelcome") === "true";
    
    if (isNew && !hasSeenTour) {
      setShowTourModal(true);
      setShowWelcomePrompt(false);
      setIsFirstTimeUser(true);
    } 
    else if (isNew && hasSeenTour && !hasSeenDashboardWelcome) {
      setShowTourModal(false);
      setShowWelcomePrompt(true);
      setIsFirstTimeUser(true);
    }
    
    if (!currentMood) {
      const defaultMood = MoodType.MOTIVATED;
      setCurrentMood(defaultMood);
      storeMoodInLocalStorage(defaultMood);
    }
  };

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  const handleProfileImageUpdate = (imageUrl: string) => {
    setProfileImage(imageUrl);
    localStorage.setItem('user_profile_image', imageUrl);
    
    // If user profile exists, update its avatar property
    if (userProfile) {
      userProfile.avatar = imageUrl;
    }
  };

  const handleSkipTourWrapper = () => {
    handleSkipTour();
    setShowTourModal(false);
    localStorage.setItem("hasSeenTour", "true");
    
    // After skipping tour, show welcome dashboard prompt
    setShowWelcomePrompt(true);
    
    console.log("Tour skipped and marked as seen");
  };

  const handleCompleteTourWrapper = () => {
    handleCompleteTour();
    setShowTourModal(false);
    localStorage.setItem("hasSeenTour", "true");
    
    // After completing tour, show welcome dashboard prompt
    setShowWelcomePrompt(true);
    
    console.log("Tour completed and marked as seen");
  };

  const handleWelcomePromptComplete = () => {
    setShowWelcomePrompt(false);
    localStorage.setItem("hasSeenDashboardWelcome", "true");
  };

  const handleCompleteOnboardingWrapper = () => {
    handleCompleteOnboarding();
    // Set the new user flag to show tour after onboarding
    localStorage.setItem('new_user_signup', 'true');
    navigate('/dashboard/student?new=true');
  };

  const handleOpenVoiceAssistant = () => {
    setShowVoiceAssistant(true);
  };

  const handleCloseVoiceAssistant = () => {
    setShowVoiceAssistant(false);
  };

  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} mood={currentMood} />;
  }

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Show onboarding flow only for users who haven't completed it
  if (showOnboarding) {
    const defaultGoal = "NEET";
    const goalTitle = userProfile?.goals?.[0]?.title || defaultGoal;
    
    return (
      <OnboardingFlow 
        userProfile={userProfile} 
        goalTitle={goalTitle}
        onComplete={handleCompleteOnboardingWrapper}
      />
    );
  }

  // Update user profile with the profile image from localStorage
  const enhancedUserProfile = {
    ...userProfile,
    avatar: profileImage || userProfile.avatar || userProfile.photoURL
  };

  // Custom content based on active tab
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
        showWelcomeTour={false}  {/* Important: We manage tour state independently */}
        onTabChange={handleTabChange}
        onViewStudyPlan={handleViewStudyPlan}
        onToggleSidebar={toggleSidebar}
        onToggleTabsNav={toggleTabsNav}
        onSkipTour={handleSkipTourWrapper}
        onCompleteTour={handleCompleteTourWrapper}
        showStudyPlan={showStudyPlan}
        onCloseStudyPlan={handleCloseStudyPlan}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
        onProfileImageUpdate={handleProfileImageUpdate}
        upcomingEvents={upcomingEvents}
      >
        {getTabContent()}
      </DashboardLayout>
      
      {/* Welcome Tour Modal - will show once for new users */}
      {showTourModal && (
        <WelcomeTour
          open={showTourModal}
          onOpenChange={setShowTourModal}
          onSkipTour={handleSkipTourWrapper}
          onCompleteTour={handleCompleteTourWrapper}
          isFirstTimeUser={isFirstTimeUser}
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction}
          loginCount={userProfile.loginCount}
        />
      )}

      {/* NEW: Welcome Dashboard Prompt - shows after tour completion */}
      {showWelcomePrompt && (
        <WelcomeDashboardPrompt 
          userName={userProfile.name || userProfile.firstName || 'Student'}
          onComplete={handleWelcomePromptComplete}
        />
      )}

      {/* Enhanced Voice Greeting with UN sustainability goals message */}
      <VoiceGreeting 
        isFirstTimeUser={isFirstTimeUser} 
        userName={userProfile.name || userProfile.firstName || 'Student'}
        language="en"
      />
      
      {/* Enhanced Dashboard Voice Assistant that considers user mood */}
      <DashboardVoiceAssistant
        userName={userProfile.name || userProfile.firstName || 'Student'}
        language="en-IN"
        userMood={currentMood}
      />

      {/* NEW: Floating voice assistant button with settings panel */}
      <FloatingVoiceButton 
        userName={userProfile.name || userProfile.firstName || 'Student'}
        language="en-IN"
        onNavigationCommand={handleNavigationCommand}
      />
    </>
  );
};

export default StudentDashboard;
