
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
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from "@/components/dashboard/student/mood-tracking/moodUtils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(false); // Set to false to bypass splash screen
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [showStudyPlanPrompt, setShowStudyPlanPrompt] = useState(false);
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
    
    // Don't show splash screen for now
    setShowSplash(false);
    
    // Try to get saved mood from local storage
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }

    // Ensure profile image is available
    if (userProfile && userProfile.avatar) {
      // Store the profile image in localStorage for persistence across sessions
      localStorage.setItem('user_profile_image', userProfile.avatar);
    }

    // Check if we should show study plan prompt for Google sign up users
    const shouldPromptStudyPlan = localStorage.getItem('should_prompt_study_plan') === 'true';
    if (shouldPromptStudyPlan) {
      setShowStudyPlanPrompt(true);
      // Remove the flag so it doesn't show again
      localStorage.removeItem('should_prompt_study_plan');
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
      storeMoodInLocalStorage(MoodType.Motivated);
    }
  };

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  const handleCreateStudyPlan = () => {
    setShowStudyPlanPrompt(false);
    navigate('/dashboard/student/academic');
  };
  
  const handleSkipStudyPlan = () => {
    setShowStudyPlanPrompt(false);
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
        hideSidebar={hideSidebar}
        hideTabsNav={hideTabsNav}
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
      
      {/* Study Plan Prompt Dialog for Google Sign-up users */}
      <Dialog open={showStudyPlanPrompt} onOpenChange={setShowStudyPlanPrompt}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-center">Create Your Study Plan</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Would you like to create a personalized study plan to help you prepare for your exams effectively?
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
              <Button
                variant="default"
                className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600"
                onClick={handleCreateStudyPlan}
              >
                Create Study Plan
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleSkipStudyPlan}
              >
                Skip for Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudentDashboard;
