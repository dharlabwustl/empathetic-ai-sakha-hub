
import React from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { useIsMobile } from '@/hooks/use-mobile';
import DashboardWrapper from '@/components/dashboard/student/DashboardWrapper';

interface DashboardLayoutProps {
  userProfile: UserProfileBase;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  activeTab: string;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  showWelcomeTour: boolean;
  onTabChange: (tab: string) => void;
  onViewStudyPlan: () => void;
  onToggleSidebar: () => void;
  onToggleTabsNav: () => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  showStudyPlan: boolean;
  onCloseStudyPlan: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userProfile,
  hideSidebar,
  hideTabsNav,
  activeTab,
  kpis,
  nudges,
  markNudgeAsRead,
  showWelcomeTour,
  onTabChange,
  onViewStudyPlan,
  onToggleSidebar,
  onToggleTabsNav,
  onSkipTour,
  onCompleteTour,
  showStudyPlan,
  onCloseStudyPlan,
  lastActivity,
  suggestedNextAction,
  currentMood,
  onMoodChange,
  children
}) => {
  const isMobile = useIsMobile();
  const currentTime = new Date();

  return (
    <DashboardWrapper
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      features={[]}
      showWelcomeTour={showWelcomeTour}
      currentTime={currentTime}
      onTabChange={onTabChange}
      onViewStudyPlan={onViewStudyPlan}
      onToggleSidebar={onToggleSidebar}
      onToggleTabsNav={onToggleTabsNav}
      onSkipTour={onSkipTour}
      onCompleteTour={onCompleteTour}
      lastActivity={lastActivity}
      suggestedNextAction={suggestedNextAction}
    >
      {children}
    </DashboardWrapper>
  );
};

export default DashboardLayout;
