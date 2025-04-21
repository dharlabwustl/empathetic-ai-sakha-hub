
import React from "react";
import { useEmployeeDashboard } from "@/hooks/useEmployeeDashboard";
import DashboardLayout from "./DashboardLayout";
import DashboardLoading from "./DashboardLoading";

const EmployeeDashboard = () => {
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
  } = useEmployeeDashboard();

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
            <h2 className="text-xl font-medium mb-4">Employee Dashboard</h2>
            <p>Welcome to your professional dashboard. Here you can manage your professional development, tasks, and resources.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
