
import React from "react";
import { useDoctorDashboard } from "@/hooks/useDoctorDashboard";
import DashboardLayout from "./DashboardLayout";
import DashboardLoading from "./DashboardLoading";

const DoctorDashboard = () => {
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
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useDoctorDashboard();

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div className="col-span-2">
            <h2 className="text-xl font-medium mb-4">Doctor Dashboard</h2>
            <p>Welcome to your professional medical dashboard. Here you can manage your patients, appointments, and medical resources.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
