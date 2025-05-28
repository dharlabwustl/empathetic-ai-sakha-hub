
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
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

  // Check URL parameters for first-time user status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNew = params.get('new') === 'true';
    setIsFirstTimeUser(isNew);
    
    // Try to get saved mood from local storage
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setCurrentMood(savedMood);
    } else {
      // Set default mood for new users
      const defaultMood = MoodType.MOTIVATED;
      setCurrentMood(defaultMood);
      storeMoodInLocalStorage(defaultMood);
    }
    
    // Clean up URL parameters after first load
    if (isNew) {
      navigate('/dashboard/student', { replace: true });
    }
  }, [location, navigate]);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
  };

  const handleCompleteOnboardingWrapper = () => {
    handleCompleteOnboarding();
    navigate('/dashboard/student?new=true');
  };

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Show onboarding flow only for users who haven't completed it
  if (showOnboarding) {
    const defaultGoal = "NEET";
    const goalTitle = userProfile?.goals?.[0]?.title || defaultGoal;
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
          <p className="text-muted-foreground mb-6">
            Please complete your onboarding to access your personalized dashboard.
          </p>
          <button 
            onClick={handleCompleteOnboardingWrapper}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Continue Setup
          </button>
        </div>
      </div>
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
