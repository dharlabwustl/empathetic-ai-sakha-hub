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
import PostSignupVoiceAssistant from "@/components/voice/PostSignupVoiceAssistant";
import { FloatingVoiceButton } from '@/components/voice/EnhancedVoiceCircle';
import { useIsMobile } from "@/hooks/use-mobile";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [showTourModal, setShowTourModal] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isNewSignup, setIsNewSignup] = useState(false);
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
    
    // Check if this is a fresh signup (within last 5 minutes)
    const signupTime = localStorage.getItem('signup_timestamp');
    const isRecentSignup = signupTime && (Date.now() - parseInt(signupTime)) < 300000; // 5 minutes
    
    setIsNewSignup(Boolean(isRecentSignup));
    
    // For new users who haven't seen the tour
    if (isNew && !hasSeenTour) {
      setShowSplash(false);
      setShowTourModal(true);
      setShowWelcomePrompt(false);
      setIsFirstTimeUser(true);
      console.log("New user detected, showing welcome tour");
    } 
    // For new users who have seen the tour but not the dashboard welcome
    else if (isNew && hasSeenTour && !hasSeenDashboardWelcome) {
      setShowSplash(false);
      setShowTourModal(false);
      setShowWelcomePrompt(true);
      setIsFirstTimeUser(true);
      console.log("New user needs dashboard welcome prompt");
    }
    // For returning users
    else {
      const hasSeen = sessionStorage.getItem("hasSeenSplash");
      setShowSplash(!hasSeen);
      
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
    
    // For new users, show the tour after splash, but make sure welcome prompt is not shown simultaneously
    const isNew = localStorage.getItem('new_user_signup') === 'true';
    if (isNew) {
      const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
      if (!hasSeenTour) {
        setShowTourModal(true);
        setShowWelcomePrompt(false);
        setIsFirstTimeUser(true);
      }
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

  const handleCompleteOnboardingWrapper = () => {
    handleCompleteOnboarding();
    setShowOnboarding(false);
  };

  const handleSkipTourWrapper = () => {
    handleSkipTour();
    setShowTourModal(false);
  };

  const handleCompleteTourWrapper = () => {
    handleCompleteTour();
    setShowTourModal(false);
  };

  const handleWelcomePromptComplete = () => {
    setShowWelcomePrompt(false);
    localStorage.setItem("hasSeenDashboardWelcome", "true");
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
        showWelcomeTour={false}
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

      {/* Welcome Dashboard Prompt - shows after tour completion */}
      {showWelcomePrompt && (
        <WelcomeDashboardPrompt 
          userName={userProfile.name || userProfile.firstName || 'Student'}
          onComplete={handleWelcomePromptComplete}
        />
      )}

      {/* Post-signup congratulations voice assistant for new signups */}
      {isNewSignup && (
        <PostSignupVoiceAssistant
          userName={userProfile.name || userProfile.firstName || 'Student'}
          onSpeakingChange={setIsSpeaking}
        />
      )}

      {/* Enhanced Dashboard Voice Assistant with intelligent messaging */}
      {!isNewSignup && (
        <DashboardVoiceAssistant
          userName={userProfile.name || userProfile.firstName || 'Student'}
          isFirstTimeUser={isFirstTimeUser}
          loginCount={userProfile.loginCount}
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction}
          onSpeakingChange={setIsSpeaking}
        />
      )}

      {/* Enhanced floating voice assistant button with mobile positioning */}
      <FloatingVoiceButton 
        isSpeaking={isSpeaking}
        className={`cursor-pointer ${isMobile ? 'bottom-20 right-4' : 'bottom-6 right-6'}`}
      />
    </>
  );
};

export default StudentDashboard;
