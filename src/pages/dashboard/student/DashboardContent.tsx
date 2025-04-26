
import React, { useState } from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import ReturnUserRecap from "@/components/dashboard/student/ReturnUserRecap";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { QuickAccess } from '@/components/dashboard/student/QuickAccess';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabContents?: Record<string, React.ReactNode>;
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
  children?: React.ReactNode;
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
  children
}: DashboardContentProps) => {
  // State to track whether the returning user recap has been closed
  const [showReturnRecap, setShowReturnRecap] = useState(
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

  // For the overview tab, use the standard layout
  if (activeTab === "overview") {
    return (
      <div className="h-full flex flex-col">
        {/* Returning User Recap - Show for users with login count > 1 */}
        {showReturnRecap && !showWelcomeTour && (
          <ReturnUserRecap
            userName={userProfile.name}
            lastLoginDate={lastActivity?.description || "recently"}
            suggestedNextTasks={suggestedNextAction ? [suggestedNextAction] : undefined}
            onClose={handleCloseRecap}
            loginCount={userProfile.loginCount}
          />
        )}
  
        {/* Quick Access Buttons for all pages */}
        <QuickAccess />
  
        {/* Tabs navigation */}
        {!hideTabsNav && (
          <DashboardTabs 
            activeTab={activeTab} 
            onTabChange={onTabChange} 
            tabContents={tabContents}
          />
        )}
  
        {/* Content area */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 flex-grow">
          {children || tabContents[activeTab] || (
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
  }

  // For other tabs, use the shared page layout for consistency
  const tabTitles = {
    "today": "Today's Plan",
    "academic": "Academic Advisor",
    "concepts": "Concept Cards",
    "flashcards": "Flashcards",
    "practice-exam": "Practice Exams",
    "feel-good": "Feel Good Corner",
    "notifications": "Notifications",
    "tutor": "24/7 AI Tutor"
  };

  const tabSubtitles = {
    "today": "Your personalized daily study schedule",
    "academic": "Get guidance for your academic journey",
    "concepts": "Master key concepts and fundamentals",
    "flashcards": "Review and memorize with smart flashcards",
    "practice-exam": "Test your knowledge and track progress",
    "feel-good": "Boost your motivation and wellbeing",
    "notifications": "Stay updated with important alerts",
    "tutor": "Get instant help with any subject"
  };

  return (
    <div className="h-full flex flex-col">
      {/* Quick Access Buttons for all pages */}
      <QuickAccess />
      
      {!hideTabsNav && (
        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          tabContents={tabContents}
        />
      )}

      <div className="mt-4">
        {children || (
          <SharedPageLayout
            title={tabTitles[activeTab as keyof typeof tabTitles]}
            subtitle={tabSubtitles[activeTab as keyof typeof tabSubtitles]}
            showQuickAccess={false}
          >
            {tabContents[activeTab] || (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Coming Soon</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This feature is under development. Check back later.
                </p>
              </div>
            )}
          </SharedPageLayout>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
export type { DashboardTabsProps };
