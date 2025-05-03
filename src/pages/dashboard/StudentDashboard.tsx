
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
  const [dashboardReady, setDashboardReady] = useState(false);
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

    // Handle voice welcome when dashboard is fully loaded
    useEffect(() => {
      if (!showSplash && userProfile && !showOnboarding && dashboardReady) {
        // Mark dashboard as not first time anymore
        if (voiceAnnouncer.isFirstTimeUser) {
          // Give time for tour to finish before greeting
          setTimeout(() => {
            const settings = getVoiceSettings();
            if (settings.enabled && settings.announceGreetings) {
              const welcomeMessage = voiceAnnouncer.getWelcomeMessage(true, userProfile.name || '', 1);
              
              // Delay for user to see dashboard first
              setTimeout(() => {
                voiceAnnouncer.speak(welcomeMessage);
              }, 2000);
            }
          }, 1000);
        } else if (userProfile.examGoal || userProfile.goals?.[0]?.title) {
          // Set exam goal in voice context
          voiceAnnouncer.setExamGoal(userProfile.examGoal || userProfile.goals?.[0]?.title || '');
          
          // For returning users, delay greeting to let them see dashboard first
          setTimeout(() => {
            const settings = getVoiceSettings();
            if (settings.enabled && settings.announceGreetings) {
              const welcomeMessage = voiceAnnouncer.getWelcomeMessage(
                false, 
                userProfile.name || '', 
                userProfile.loginCount || 1
              );
              voiceAnnouncer.speak(welcomeMessage);
            }
          }, 3000);
        }
      }
    }, [showSplash, userProfile, showOnboarding, dashboardReady, voiceAnnouncer]);

    // Update screen context when tab changes
    useEffect(() => {
      if (dashboardReady && activeTab) {
        voiceAnnouncer.updateScreenContext(activeTab);
      }
    }, [activeTab, dashboardReady, voiceAnnouncer]);
    
    return null;
  };

  // Check URL parameters and localStorage for first-time user status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNewUser = params.get('new') === 'true' || localStorage.getItem('new_user_signup') === 'true';
    const completedOnboarding = params.get('completedOnboarding') === 'true';
    
    // Check if user has already seen the tour
    const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
    
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
  
  // Mark dashboard as ready after a delay to allow for rendering
  useEffect(() => {
    if (!loading && userProfile) {
      const timer = setTimeout(() => {
        setDashboardReady(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, userProfile]);
  
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
    
    // Voice feedback when mood changes - context aware and concise
    const settings = getVoiceSettings();
    if (settings.enabled && settings.announceGreetings) {
      let message = "";
      switch(mood) {
        case MoodType.Motivated:
          message = "Great motivation! Let's focus on challenging topics today.";
          break;
        case MoodType.Tired:
          message = "I'll suggest shorter study sessions with more breaks.";
          break;
        case MoodType.Focused:
          message = "With your focus, let's tackle difficult concepts now.";
          break;
        case MoodType.Anxious:
          message = "For anxiety, we'll break tasks into smaller steps.";
          break;
        case MoodType.Stressed:
          message = "To reduce stress, let's prioritize one task at a time.";
          break;
        default:
          message = "I'll adjust recommendations based on your mood.";
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
