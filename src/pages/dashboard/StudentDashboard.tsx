
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { MoodType } from "@/types/user/base";
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from "@/components/dashboard/student/mood-tracking/moodUtils";
import { FloatingVoiceButton } from '@/components/voice/EnhancedVoiceCircle';
import PersonalizedDashboard from "@/components/dashboard/student/personalized/PersonalizedDashboard";
import UnifiedVoiceAssistant from "@/components/dashboard/student/voice/UnifiedVoiceAssistant";

const StudentDashboard = () => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuickOnboarding, setShowQuickOnboarding] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    loading,
    userProfile,
    activeTab,
    showOnboarding,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleCompleteOnboarding,
    lastActivity,
    suggestedNextAction,
    upcomingEvents
  } = useStudentDashboard();

  // Check for first-time user and setup
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNew = params.get('new') === 'true';
    const hasCompletedOnboarding = localStorage.getItem('completed_onboarding') === 'true';
    
    setIsFirstTimeUser(isNew);
    
    // Show quick onboarding only for brand new users who haven't seen it
    if (isNew && !hasCompletedOnboarding) {
      setShowQuickOnboarding(true);
    }
    
    // Setup mood
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    } else {
      const defaultMood = MoodType.MOTIVATED;
      setCurrentMood(defaultMood);
      storeMoodInLocalStorage(defaultMood);
    }
    
    // Clean up URL
    if (isNew) {
      navigate('/dashboard/student', { replace: true });
    }
  }, [location, navigate]);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  const handleCompleteQuickOnboarding = () => {
    setShowQuickOnboarding(false);
    localStorage.setItem('completed_onboarding', 'true');
    // Mark original onboarding as complete too
    handleCompleteOnboarding();
  };

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Show quick onboarding for new users
  if (showQuickOnboarding) {
    const goalTitle = userProfile?.goals?.[0]?.title || userProfile.examPreparation || "Your Exam";
    
    return (
      <OnboardingFlow 
        userProfile={userProfile} 
        goalTitle={goalTitle}
        onComplete={handleCompleteQuickOnboarding}
      />
    );
  }

  // Show original onboarding if it was never completed (fallback)
  if (showOnboarding) {
    const goalTitle = userProfile?.goals?.[0]?.title || userProfile.examPreparation || "Your Exam";
    
    return (
      <OnboardingFlow 
        userProfile={userProfile} 
        goalTitle={goalTitle}
        onComplete={handleCompleteOnboarding}
      />
    );
  }

  return (
    <>
      <DashboardLayout
        userProfile={userProfile}
        hideSidebar={false}
        hideTabsNav={true}
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        showWelcomeTour={false}
        onTabChange={handleTabChange}
        onViewStudyPlan={() => {}}
        onToggleSidebar={() => {}}
        onToggleTabsNav={() => {}}
        onSkipTour={() => {}}
        onCompleteTour={() => {}}
        showStudyPlan={false}
        onCloseStudyPlan={() => {}}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
        upcomingEvents={upcomingEvents}
      >
        {/* Enhanced Personalized Dashboard */}
        <PersonalizedDashboard 
          userProfile={userProfile}
          currentMood={currentMood || MoodType.MOTIVATED}
        />
      </DashboardLayout>
      
      {/* Single Unified Voice Assistant */}
      <UnifiedVoiceAssistant
        userProfile={userProfile}
        currentMood={currentMood || MoodType.MOTIVATED}
        isFirstTimeUser={isFirstTimeUser}
        onSpeakingChange={setIsSpeaking}
      />

      {/* Enhanced floating voice assistant button */}
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
