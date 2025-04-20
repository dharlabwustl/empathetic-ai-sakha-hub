
import React from 'react';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import { UserProfileType } from '@/types/user/base';

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
