
import React from 'react';
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import ReturnUserRecap from "@/components/dashboard/student/ReturnUserRecap";
import { TodaysPlanSection } from "@/components/dashboard/student/todays-plan";
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  // State to track whether the returning user recap has been closed
  const [showReturnRecap, setShowReturnRecap] = React.useState(
    Boolean(userProfile.loginCount && userProfile.loginCount > 1 && lastActivity)
  );

  // Generate tab contents once
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
  
  // Handle navigation to external sections
  const handleNavigateToSection = (section: string) => {
    switch(section) {
      case 'ai-tutor':
        navigate('/dashboard/student/ai-tutor');
        break;
      case 'academic-advisor':
        navigate('/dashboard/student/academic-advisor');
        break;
      case 'feel-good':
        onTabChange('feel-good');
        break;
      default:
        // Do nothing
        break;
    }
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
          onNavigateToSection={handleNavigateToSection}
        />
      )}

      {/* Tabs navigation */}
      {!hideTabsNav && (
        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          tabContents={tabContents}
        />
      )}

      {/* Tab content */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 flex-grow">
        {tabContents[activeTab] || (
          <TodaysPlanSection />
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
export type { DashboardTabsProps };
