
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardContent from "@/pages/dashboard/student/DashboardContent";
import { generateTabContents } from './TabContentManager';
import DashboardTabs from './DashboardTabs';

interface MainContentProps {
  hideTabsNav: boolean;
  activeTab: string;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  onTabChange: (tab: string) => void;
  onToggleTabsNav: () => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isMobile: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

const MainContent: React.FC<MainContentProps> = ({
  hideTabsNav,
  activeTab,
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  onTabChange,
  onToggleTabsNav,
  onSkipTour,
  onCompleteTour,
  isMobile,
  lastActivity,
  suggestedNextAction
}) => {
  // Get tab contents from the manager
  const tabContents = generateTabContents({
    userProfile,
    kpis,
    nudges,
    markNudgeAsRead,
    features,
    showWelcomeTour,
    handleSkipTour: onSkipTour,
    handleCompleteTour: onCompleteTour,
    lastActivity,
    suggestedNextAction
  });

  return (
    <div className="lg:col-span-9 xl:col-span-10">
      {/* Navigation toggle button for desktop */}
      {!isMobile && (
        <NavigationToggleButton 
          hideTabsNav={hideTabsNav}
          onToggleTabsNav={onToggleTabsNav}
        />
      )}
      
      {/* Main tabs navigation */}
      <DashboardTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        tabContents={tabContents}
        hideTabsNav={hideTabsNav}
      />
    </div>
  );
};

export default MainContent;

// Import at the top to avoid circular dependency
import NavigationToggleButton from '@/components/dashboard/student/NavigationToggleButton';
