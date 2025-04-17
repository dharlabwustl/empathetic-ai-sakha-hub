
import React from "react";
import { UserProfileType, MoodType } from "@/types/user";
import { KpiData, NudgeData, FeatureData } from "@/components/dashboard/types/sidebar";
import ProfileCard from "@/components/dashboard/ProfileCard";
import DashboardContainer from "@/components/dashboard/student/DashboardContainer";
import DashboardHeader from "./DashboardHeader";
import DashboardTabs from "./DashboardTabs";
import MainContent from "@/components/dashboard/student/MainContent";
import SidebarNavigation from "./SidebarNavigation";
import StudyPlanDialog from "./StudyPlanDialog";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import TabContentViews from "./TabContentViews";

interface DashboardLayoutProps {
  userProfile: UserProfileType;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  activeTab: string;
  kpis: KpiData[];
  nudges: NudgeData[];
  features?: FeatureData[];
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
  peerComparisonData?: {
    position: number;
    totalPeers: number;
    percentile: number;
  };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userProfile,
  hideSidebar,
  hideTabsNav,
  activeTab,
  kpis,
  nudges,
  features,
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
  peerComparisonData
}) => {
  // Mock current mood - in a real app, this would be fetched from user state
  const currentMood: MoodType = "focused";

  return (
    <DashboardContainer>
      {/* Welcome Tour for first-time users */}
      {showWelcomeTour && (
        <WelcomeTour onSkip={onSkipTour} onComplete={onCompleteTour} />
      )}

      {/* Left Sidebar */}
      <SidebarNavigation
        profile={userProfile}
        isHidden={hideSidebar}
        onToggle={onToggleSidebar}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
      />

      {/* Main Content Area */}
      <MainContent>
        <DashboardHeader
          userProfile={userProfile}
          onViewStudyPlan={onViewStudyPlan}
        />

        {/* Dashboard Tabs Navigation */}
        {!hideTabsNav && (
          <DashboardTabs
            activeTab={activeTab}
            onTabChange={onTabChange}
            onToggle={onToggleTabsNav}
          />
        )}

        {/* Dashboard Content */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <ProfileCard 
                profile={userProfile} 
                currentMood={currentMood}
                peerComparison={peerComparisonData}
              />
            </div>
            
            {/* Tab Content */}
            <div className="md:col-span-2">
              <TabContentViews
                activeTab={activeTab}
                userProfile={userProfile}
                features={features}
              />
            </div>
          </div>
        </div>
      </MainContent>

      {/* Study Plan Dialog */}
      {showStudyPlan && (
        <StudyPlanDialog onClose={onCloseStudyPlan} />
      )}
    </DashboardContainer>
  );
};

export default DashboardLayout;
