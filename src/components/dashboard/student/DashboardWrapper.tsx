
import React from 'react';
import { UserProfile } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import MainContent from "@/components/dashboard/student/MainContent";
import { useWindowSize } from '@/hooks/useWindowSize';

interface DashboardWrapperProps {
  userProfile: UserProfile;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  activeTab: string;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  currentTime: Date;
  onTabChange: (tab: string) => void;
  onViewStudyPlan: () => void;
  onToggleSidebar: () => void;
  onToggleTabsNav: () => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  children?: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
  userProfile,
  hideSidebar,
  hideTabsNav,
  activeTab,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  currentTime,
  onTabChange,
  onViewStudyPlan,
  onToggleSidebar,
  onToggleTabsNav,
  onSkipTour,
  onCompleteTour,
  lastActivity,
  suggestedNextAction,
  children
}) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 768;

  return (
    <div className={`flex-1 flex flex-col ${hideSidebar ? 'ml-0' : 'ml-0 md:ml-64'} transition-all duration-300`}>
      <main className="flex-1 px-4 md:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto py-6">
          {/* Main content area */}
          <MainContent
            hideTabsNav={hideTabsNav}
            activeTab={activeTab}
            userProfile={userProfile}
            kpis={kpis}
            nudges={nudges}
            markNudgeAsRead={markNudgeAsRead}
            features={features}
            showWelcomeTour={showWelcomeTour}
            onTabChange={onTabChange}
            onToggleTabsNav={onToggleTabsNav}
            onSkipTour={onSkipTour}
            onCompleteTour={onCompleteTour}
            isMobile={isMobile}
            lastActivity={lastActivity}
            suggestedNextAction={suggestedNextAction}
          />
          
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardWrapper;
