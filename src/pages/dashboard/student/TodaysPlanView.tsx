
import React from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import NewTodaysPlanView from "@/components/dashboard/student/todays-plan/NewTodaysPlanView";

const TodaysPlanView = () => {
  const {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
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
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav,
  } = useStudentDashboard();
  
  // Get current mood from localStorage
  const [currentMood, setCurrentMood] = React.useState<any>(undefined);
  
  React.useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
    }
  }, []);
  
  const handleMoodChange = (mood: any) => {
    setCurrentMood(mood);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  };

  if (loading || !userProfile) {
    return <div className="p-8 text-center">Loading your study plan...</div>;
  }

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab="today"
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={false}
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
      <NewTodaysPlanView />
    </DashboardLayout>
  );
};

export default TodaysPlanView;
