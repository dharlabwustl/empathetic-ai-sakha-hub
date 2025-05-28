
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation, useNavigate } from "react-router-dom";
import AdaptiveDashboardController from "@/components/dashboard/adaptive/AdaptiveDashboardController";
import { MoodType } from "@/types/user/base";
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from "@/components/dashboard/student/mood-tracking/moodUtils";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import WelcomeDashboardPrompt from "@/components/dashboard/student/WelcomeDashboardPrompt";
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

  // Load profile image and enhanced dashboard preferences
  useEffect(() => {
    const savedImage = localStorage.getItem('user_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }

    // Enhanced dashboard preferences for adaptive layout
    const savedPreferences = localStorage.getItem('dashboardPreferences');
    const isPersonalized = new URLSearchParams(location.search).get('personalized') === 'true';
    
    try {
      const preferences = savedPreferences ? JSON.parse(savedPreferences) : {
        examGoal: userProfile?.examGoal || 'NEET',
        learningStyle: userProfile?.learningStyle || 'visual',
        studyStyle: userProfile?.studyStyle || 'gradual',
        weakSubjects: userProfile?.weakSubjects || ['Physics', 'Organic Chemistry'],
        strongSubjects: userProfile?.strongSubjects || ['Biology'],
        performanceLevel: userProfile?.performanceLevel || 'intermediate',
        studyPreferences: userProfile?.studyPreferences || {
          pace: "Moderate",
          hoursPerDay: 4,
          preferredTimeStart: "18:00",
          preferredTimeEnd: "22:00"
        }
      };
      setDashboardPreferences(preferences);
    } catch (error) {
      console.error('Error loading dashboard preferences:', error);
      setDashboardPreferences({
        examGoal: userProfile?.examGoal || 'NEET',
        learningStyle: 'visual',
        studyStyle: 'gradual',
        weakSubjects: ['Physics', 'Organic Chemistry'],
        strongSubjects: ['Biology'],
        performanceLevel: 'intermediate'
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
    
    // Update dashboard preferences to trigger adaptive layout re-render
    setDashboardPreferences(prev => ({
      ...prev,
      currentMood: mood
    }));
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

  // Enhanced user profile with all adaptive data
  const enhancedUserProfile = {
    ...userProfile,
    avatar: profileImage || userProfile.avatar || userProfile.photoURL,
    currentMood: currentMood,
    examGoal: userProfile.examGoal || dashboardPreferences?.examGoal || 'NEET',
    learningStyle: userProfile.learningStyle || dashboardPreferences?.learningStyle || 'visual',
    studyStyle: userProfile.studyStyle || dashboardPreferences?.studyStyle || 'gradual',
    weakSubjects: userProfile.weakSubjects || dashboardPreferences?.weakSubjects || ['Physics', 'Organic Chemistry'],
    strongSubjects: userProfile.strongSubjects || dashboardPreferences?.strongSubjects || ['Biology'],
    performanceLevel: userProfile.performanceLevel || dashboardPreferences?.performanceLevel || 'intermediate',
    studyStreak: userProfile.studyStreak || 5,
    examDate: userProfile.examDate || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  return (
    <>
      {/* Main Adaptive Dashboard - Completely redesigned based on exam goals and learning profile */}
      <AdaptiveDashboardController 
        userProfile={enhancedUserProfile} 
        preferences={dashboardPreferences}
        onMoodChange={handleMoodChange}
        onViewStudyPlan={handleViewStudyPlan}
        showStudyPlan={showStudyPlan}
        onCloseStudyPlan={handleCloseStudyPlan}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        upcomingEvents={upcomingEvents}
      />
      
      <WelcomeTour
        open={showTourModal}
        onOpenChange={setShowTourModal}
        onSkipTour={() => {
          setShowTourModal(false);
          localStorage.setItem("hasSeenTour", "true");
          setShowWelcomePrompt(true);
        }}
        onCompleteTour={() => {
          setShowTourModal(false);
          localStorage.setItem("hasSeenTour", "true");
          setShowWelcomePrompt(true);
        }}
        isFirstTimeUser={isFirstTimeUser}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        loginCount={userProfile.loginCount}
      />

      {showWelcomePrompt && (
        <WelcomeDashboardPrompt 
          userName={userProfile.name || userProfile.firstName || 'Student'}
          onComplete={() => {
            setShowWelcomePrompt(false);
            localStorage.setItem("hasSeenDashboardWelcome", "true");
          }}
        />
      )}

      {/* Unified Voice Assistant */}
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
