
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
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from "@/components/dashboard/student/mood-tracking/moodUtils";
import { VoiceAnnouncerProvider, useVoiceAnnouncerContext, getVoiceSettings, speakMessage } from "@/components/dashboard/student/voice/VoiceAnnouncer";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [showTourModal, setShowTourModal] = useState(false);
  const [dashboardLoaded, setDashboardLoaded] = useState(false);
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

  const DashboardWithVoice = () => {
    const voiceAnnouncer = useVoiceAnnouncerContext();

    // Handle voice welcome when dashboard is loaded
    useEffect(() => {
      // Only proceed if dashboard is fully loaded and not in splash/onboarding screens
      if (dashboardLoaded && userProfile && !showSplash && !showOnboarding && !showTourModal) {
        const settings = getVoiceSettings();
        
        if (settings.enabled && settings.announceGreetings) {
          const isFirstTimeUser = userProfile.loginCount === 1 || localStorage.getItem('new_user_signup') === 'true';
          const examGoal = userProfile?.goals?.[0]?.title || '';
          
          // Delay greeting to allow UI to fully render first
          setTimeout(() => {
            if (isFirstTimeUser) {
              // Brief first-time greeting after tour 
              const message = `Welcome to PREPZR! I'm your voice assistant for ${examGoal || 'exam'} preparation. Click the voice icon when you need help.`;
              voiceAnnouncer.speak(message, true);
            } else {
              // For returning users, use context-aware greeting
              const welcomeMessage = voiceAnnouncer.getWelcomeMessage(
                false, 
                userProfile.name || '', 
                userProfile.loginCount || 1,
                examGoal
              );
              
              voiceAnnouncer.speak(welcomeMessage, true);
            }
          }, 2000); // 2 second delay after dashboard loads
        }
      }
    }, [dashboardLoaded, showSplash, userProfile, showOnboarding, showTourModal, voiceAnnouncer]);
    
    return null;
  };

  // Check URL parameters and localStorage for first-time user status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNewUser = params.get('new') === 'true' || localStorage.getItem('new_user_signup') === 'true';
    const completedOnboarding = params.get('completedOnboarding') === 'true';
    
    // Check if user has already seen the tour
    const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
    
    console.log("Checking tour status:", { isNewUser, completedOnboarding, hasSeenTour });
    
    // For new users or those who completed onboarding, show the tour
    if ((isNewUser || completedOnboarding) && !hasSeenTour) {
      setShowSplash(false);
      setShowTourModal(true);
    } 
    // For returning users
    else {
      // Check if the user has seen the splash screen in this session
      const hasSeen = sessionStorage.getItem("hasSeenSplash");
      setShowSplash(!hasSeen);
      
      // For returning users who haven't seen the tour but should
      if (!hasSeenTour && showWelcomeTour) {
        // Short timeout just to let the dashboard render first
        setTimeout(() => {
          setShowTourModal(true);
        }, 500);
      }
    }
    
    // Try to get saved mood from local storage
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, [location, showWelcomeTour]);
  
  // Mark dashboard as loaded when it renders
  useEffect(() => {
    if (!loading && userProfile && !showSplash && !showOnboarding) {
      setTimeout(() => {
        setDashboardLoaded(true);
      }, 500); // Small delay to ensure everything is rendered
    }
  }, [loading, userProfile, showSplash, showOnboarding]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Mark that the user has seen the splash screen in this session
    sessionStorage.setItem("hasSeenSplash", "true");
    
    // Save a default optimistic mood if none is set
    if (!currentMood) {
      const defaultMood = MoodType.Motivated;
      setCurrentMood(defaultMood);
      storeMoodInLocalStorage(defaultMood);
    }
  };

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    // Store mood in localStorage using the utility function
    storeMoodInLocalStorage(mood);
    
    // Voice feedback when mood changes
    const settings = getVoiceSettings();
    if (settings.enabled && settings.announceGreetings) {
      const examGoal = userProfile?.goals?.[0]?.title || '';
      
      let message = "";
      switch(mood) {
        case MoodType.Motivated:
          message = `Great motivation! Perfect for tackling difficult ${examGoal || 'exam'} topics today.`;
          break;
        case MoodType.Tired:
          message = `When tired, focus on revision rather than new topics for your ${examGoal || 'exam'}.`;
          break;
        case MoodType.Focused:
          message = `While focused, target complex problems for your ${examGoal || 'exam'} preparation.`;
          break;
        case MoodType.Anxious:
          message = `For anxiety, break ${examGoal || 'exam'} preparation into small achievements today.`;
          break;
        case MoodType.Stressed:
          message = `When stressed, focus on one ${examGoal || 'exam'} topic at a time. You'll do great!`;
          break;
        default:
          message = `I'll customize your ${examGoal || 'exam'} study suggestions based on your mood.`;
      }
      
      speakMessage(message);
    }
  };

  const handleSkipTourWrapper = () => {
    handleSkipTour();
    setShowTourModal(false);
    localStorage.setItem("hasSeenTour", "true");
    localStorage.removeItem('new_user_signup'); // Clear the new user flag
  };

  const handleCompleteTourWrapper = () => {
    handleCompleteTour();
    setShowTourModal(false);
    localStorage.setItem("hasSeenTour", "true");
    localStorage.removeItem('new_user_signup'); // Clear the new user flag
  };

  const handleCompleteOnboardingWrapper = () => {
    handleCompleteOnboarding();
    // Redirect to the welcome flow after onboarding
    navigate('/welcome-flow?completedOnboarding=true&new=true');
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

  // Get primary exam goal
  const examGoal = userProfile?.goals?.[0]?.title || '';

  // Custom content based on active tab
  const getTabContent = () => {
    if (activeTab === "overview") {
      return <RedesignedDashboardOverview userProfile={userProfile} kpis={kpis} />;
    }
    
    // For other tabs, use the default tab content
    return null;
  };

  return (
    <VoiceAnnouncerProvider>
      <DashboardWithVoice />
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
        showStudyPlan={showStudyPlan}
        onCloseStudyPlan={handleCloseStudyPlan}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
        examGoal={examGoal}
      >
        {getTabContent()}
      </DashboardLayout>
      
      {/* Welcome Tour Modal - will show once for new users */}
      <WelcomeTour
        open={showTourModal}
        onOpenChange={setShowTourModal}
        onSkipTour={handleSkipTourWrapper}
        onCompleteTour={handleCompleteTourWrapper}
        isFirstTimeUser={true}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        loginCount={userProfile.loginCount}
      />
    </VoiceAnnouncerProvider>
  );
};

export default StudentDashboard;
