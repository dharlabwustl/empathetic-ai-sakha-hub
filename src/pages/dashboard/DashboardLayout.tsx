
import React from "react";
import { UserProfileType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";

interface DashboardLayoutProps {
  userProfile: UserProfileType;
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
  children?: React.ReactNode;
}

const DashboardLayout = ({
  userProfile,
  children
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          Welcome, {userProfile?.name || "User"}
        </h1>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
