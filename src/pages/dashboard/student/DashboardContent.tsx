
import React from 'react';
import DashboardTabs from '@/components/dashboard/student/DashboardTabs';
import { generateTabContents } from '@/components/dashboard/student/TabContentManager';
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { ReactNode } from 'react';

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: {
    icon: ReactNode;
    title: string;
    description: string;
    path: string;
    isPremium: boolean;
  }[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  hideTabsNav?: boolean;
}

const DashboardContent = ({
  activeTab,
  onTabChange,
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour,
  hideTabsNav = false
}: DashboardContentProps) => {
  
  const tabContents = generateTabContents({
    userProfile,
    kpis,
    nudges,
    markNudgeAsRead,
    features,
    showWelcomeTour,
    handleSkipTour,
    handleCompleteTour
  });

  return (
    <div className="lg:col-span-9 xl:col-span-10">
      <DashboardTabs 
        activeTab={activeTab}
        onTabChange={onTabChange}
        tabContents={tabContents}
        hideTabsNav={hideTabsNav}
      />
    </div>
  );
};

export default DashboardContent;
