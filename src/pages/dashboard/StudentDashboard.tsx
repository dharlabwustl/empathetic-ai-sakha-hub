
import React from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "./student/DashboardLoading";
import DashboardContainer from "@/components/dashboard/student/DashboardContainer";
import { MoodType } from "@/types/user";

const StudentDashboard = () => {
  const [currentMood, setCurrentMood] = React.useState<MoodType | undefined>(undefined);
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
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav,
    lastActivity,
    suggestedNextAction
  } = useStudentDashboard();

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Show onboarding flow for first-time users
  if (showOnboarding) {
    // Make sure we have a goal to work with
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

  // Convert features object to an array format expected by DashboardLayout
  const featuresArray = Object.keys(features).map(key => ({
    icon: null,
    title: key.charAt(0).toUpperCase() + key.slice(1),
    description: `${key.charAt(0).toUpperCase() + key.slice(1)} section`,
    path: key,
    isPremium: false
  }));

  // Handle mood selection
  const handleMoodSelect = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  return (
    <DashboardContainer
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      features={featuresArray}
      showWelcomeTour={showWelcomeTour}
      currentTime={new Date()}
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
      onMoodSelect={handleMoodSelect}
    />
  );
};

export default StudentDashboard;
