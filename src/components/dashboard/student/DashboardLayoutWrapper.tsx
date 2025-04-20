
import React from 'react';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import { UserProfileType } from '@/types/user/base';

// Import the component from the correct path or create a stub if needed
// Note: You'll need to create this file or import from the correct path
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface DashboardLayoutWrapperProps {
  userProfile: UserProfileType;
  children: React.ReactNode;
}

export const DashboardLayoutWrapper: React.FC<DashboardLayoutWrapperProps> = ({ userProfile, children }) => {
  const {
    activeTab,
    showWelcomeTour,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    handleTabChange,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav,
    handleSkipTour,
    handleCompleteTour
  } = useStudentDashboard();

  return (
    <DashboardLayout
      userProfile={userProfile}
      activeTab={activeTab}
      showWelcomeTour={showWelcomeTour}
      showStudyPlan={showStudyPlan}
      hideTabsNav={hideTabsNav}
      hideSidebar={hideSidebar}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
    >
      {children}
    </DashboardLayout>
  );
};
