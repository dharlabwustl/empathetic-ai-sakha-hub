
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation, useNavigate } from "react-router-dom";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";
import AdaptiveDashboardLayout from "@/components/dashboard/adaptive/AdaptiveDashboardLayout";
import { MoodType } from "@/types/user/base";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import VoiceGreeting from "@/components/dashboard/student/voice/VoiceGreeting";
import WelcomeDashboardPrompt from "@/components/dashboard/student/WelcomeDashboardPrompt";
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from "@/components/dashboard/student/mood-tracking/moodUtils";
import UnifiedVoiceAssistant from "@/components/voice/UnifiedVoiceAssistant";
import { useIsMobile } from "@/hooks/use-mobile";
import { FloatingVoiceButton } from '@/components/voice/EnhancedVoiceCircle';

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [showTourModal, setShowTourModal] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [dashboardPreferences, setDashboardPreferences] = useState<any>(null);
  const [useAdaptiveLayout, setUseAdaptiveLayout] = useState(true);
  
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

  // Load profile image and dashboard preferences
  useEffect(() => {
    const savedImage = localStorage.getItem('user_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }

    // Load dashboard preferences for adaptive layout
    const savedPreferences = localStorage.getItem('dashboardPreferences');
    const isPersonalized = new URLSearchParams(location.search).get('personalized') === 'true';
    
    try {
      const preferences = savedPreferences ? JSON.parse(savedPreferences) : {
        examGoal: userProfile?.examGoal || 'NEET',
        learningStyle: 'visual',
        studyStyle: 'gradual',
        weakSubjects: ['Physics', 'Organic Chemistry'],
        strongSubjects: ['Biology'],
        confidenceLevel: 'intermediate'
      };
      setDashboardPreferences(preferences);
      setUseAdaptiveLayout(true);
    } catch (error) {
      console.error('Error loading dashboard preferences:', error);
      setDashboardPreferences({
        examGoal: userProfile?.examGoal || 'NEET',
        learningStyle: 'visual',
        studyStyle: 'gradual',
        weakSubjects: ['Physics', 'Organic Chemistry'],
        strongSubjects: ['Biology'],
        confidenceLevel: 'intermediate'
      });
    }
  }, [location, userProfile]);

  // Check URL parameters and localStorage for first-time user status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNew = params.get('new') === 'true' || localStorage.getItem('new_user_signup') === 'true';
    const hasSeenTour = localStorage.getItem("hasSeenTour") === "true";
    const hasSeenDashboardWelcome = localStorage.getItem("hasSeenDashboardWelcome") === "true";
    
    if (isNew && !hasSeenTour) {
      setShowSplash(false);
      setShowTourModal(true);
      setShowWelcomePrompt(false);
      setIsFirstTimeUser(true);
    } else if (isNew && hasSeenTour && !hasSeenDashboardWelcome) {
      setShowSplash(false);
      setShowTourModal(false);
      setShowWelcomePrompt(true);
      setIsFirstTimeUser(true);
    } else {
      const hasSeen = sessionStorage.getItem("hasSeenSplash");
      setShowSplash(!hasSeen);
      setShowTourModal(false);
      setShowWelcomePrompt(false);
      setIsFirstTimeUser(false);
    }
    
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, [location]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
    
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
    
    // Update dashboard preferences to trigger re-render
    setDashboardPreferences(prev => ({
      ...prev,
      currentMood: mood
    }));
  };

  const handleProfileImageUpdate = (imageUrl: string) => {
    setProfileImage(imageUrl);
    localStorage.setItem('user_profile_image', imageUrl);
    
    if (userProfile) {
      userProfile.avatar = imageUrl;
    }
  };

  // Handle tour completion with route to weak subject
  const handleCompleteTourWrapper = () => {
    handleCompleteTour();
    setShowTourModal(false);
    localStorage.setItem("hasSeenTour", "true");
    
    // Show learning session prompt
    setShowWelcomePrompt(true);
  };

  const handleWelcomePromptComplete = () => {
    setShowWelcomePrompt(false);
    localStorage.setItem("hasSeenDashboardWelcome", "true");
    
    // Route to weak subject practice if available
    if (dashboardPreferences?.weakSubjects?.length > 0) {
      const weakSubject = dashboardPreferences.weakSubjects[0];
      navigate(`/dashboard/student/practice-exam?subject=${encodeURIComponent(weakSubject)}&focus=weak`);
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} mood={currentMood} />;
  }

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  if (showOnboarding) {
    const defaultGoal = "NEET";
    const goalTitle = userProfile?.goals?.[0]?.title || defaultGoal;
    
    return (
      <OnboardingFlow 
        userProfile={userProfile} 
        goalTitle={goalTitle}
        onComplete={handleCompleteOnboarding}
      />
    );
  }

  const enhancedUserProfile = {
    ...userProfile,
    avatar: profileImage || userProfile.avatar || userProfile.photoURL,
    currentMood: currentMood,
    examGoal: userProfile.examGoal || dashboardPreferences?.examGoal || 'NEET'
  };

  const getTabContent = () => {
    if (activeTab === "overview") {
      const content = <RedesignedDashboardOverview userProfile={enhancedUserProfile} kpis={kpis} />;
      
      // Always wrap in adaptive layout for enhanced experience
      return (
        <AdaptiveDashboardLayout 
          userProfile={enhancedUserProfile} 
          preferences={dashboardPreferences}
        >
          {content}
        </AdaptiveDashboardLayout>
      );
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
        onSkipTour={handleSkipTour}
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
      
      <WelcomeTour
        open={showTourModal}
        onOpenChange={setShowTourModal}
        onSkipTour={() => {
          setShowTourModal(false);
          localStorage.setItem("hasSeenTour", "true");
          setShowWelcomePrompt(true);
        }}
        onCompleteTour={handleCompleteTourWrapper}
        isFirstTimeUser={isFirstTimeUser}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        loginCount={userProfile.loginCount}
      />

      {showWelcomePrompt && (
        <WelcomeDashboardPrompt 
          userName={userProfile.name || userProfile.firstName || 'Student'}
          onComplete={handleWelcomePromptComplete}
        />
      )}

      {/* Unified Voice Assistant across the app */}
      <UnifiedVoiceAssistant
        userName={userProfile.name || userProfile.firstName || 'Student'}
        userProfile={enhancedUserProfile}
        language="en-US"
        onSpeakingChange={setIsSpeaking}
      />

      {/* Enhanced floating voice button */}
      <div className="fixed bottom-6 right-6 z-40">
        <FloatingVoiceButton 
          isSpeaking={isSpeaking}
          className="cursor-pointer"
        />
      </div>
    </>
  );
};

export default StudentDashboard;
