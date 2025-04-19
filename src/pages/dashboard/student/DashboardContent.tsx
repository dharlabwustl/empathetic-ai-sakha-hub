
import React from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import ReturnUserRecap from "@/components/dashboard/student/ReturnUserRecap";
import { MoodType } from "@/types/user/base";

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
  currentMood?: MoodType; // Add currentMood prop
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
  suggestedNextAction,
  currentMood // Add currentMood prop
}: DashboardContentProps) => {
  // State to track whether the returning user recap has been closed
  const [showReturnRecap, setShowReturnRecap] = React.useState(
    Boolean(userProfile.loginCount && userProfile.loginCount > 1 && lastActivity)
  );

  // Generate tab contents once, passing the current mood for mood-adaptive content
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
    suggestedNextAction,
    currentMood // Pass mood to tab content generator
  });
  
  // Handle closing the recap
  const handleCloseRecap = () => {
    setShowReturnRecap(false);
  };

  // Determine content difficulty based on mood
  const getContentDifficulty = () => {
    if (!currentMood) return 'normal';
    
    switch (currentMood) {
      case 'motivated':
      case 'happy':
        return 'challenging'; // More challenging content for positive moods
      case 'sad':
        return 'easy'; // Easier content for negative moods
      default:
        return 'normal'; // Default difficulty
    }
  };

  const contentDifficulty = getContentDifficulty();

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
          tabContents={tabContents} // Pass tabContents to avoid regenerating
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
        
        {/* Content difficulty indicator based on mood - only show in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 text-xs text-gray-500 p-2 border border-gray-200 rounded">
            <span>Content difficulty: {contentDifficulty}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
export type { DashboardTabsProps };
