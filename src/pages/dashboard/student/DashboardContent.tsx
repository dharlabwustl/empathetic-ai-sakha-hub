
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import ReturnUserRecap from "@/components/dashboard/student/ReturnUserRecap";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabContents?: Record<string, React.ReactNode>; // Added tabContents field
}

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  hideTabsNav: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
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
  hideTabsNav,
  lastActivity,
  suggestedNextAction
}: DashboardContentProps) => {
  // State to track whether the returning user recap has been closed
  const [showReturnRecap, setShowReturnRecap] = React.useState(
    Boolean(userProfile.loginCount && userProfile.loginCount > 1 && lastActivity)
  );

  // Generate tab contents
  const tabContents = generateTabContents({
    userProfile,
    kpis,
    nudges,
    markNudgeAsRead,
    features,
    showWelcomeTour,
    handleSkipTour,
    handleCompleteTour,
    lastActivity,
    suggestedNextAction
  });
  
  // Handle closing the recap
  const handleCloseRecap = () => {
    setShowReturnRecap(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Returning User Recap - Show for users with login count > 1 */}
      {showReturnRecap && activeTab === "overview" && !showWelcomeTour && (
        <ReturnUserRecap
          userName={userProfile.name}
          lastLoginDate={lastActivity?.description || "recently"}
          suggestedNextTasks={suggestedNextAction ? [suggestedNextAction] : undefined}
          onClose={handleCloseRecap}
          loginCount={userProfile.loginCount}
        />
      )}

      {/* Tabs navigation */}
      {!hideTabsNav && (
        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          tabContents={tabContents} // Pass tabContents down to DashboardTabs
        />
      )}

      {/* Tab content */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 flex-grow">
        {tabContents[activeTab] || (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Coming Soon</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This tab is not yet available. Check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
export type { DashboardTabsProps };
