
import React, { useState, useEffect } from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import ReturnUserRecap from "@/components/dashboard/student/ReturnUserRecap";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import SharedNavigation from '@/components/dashboard/student/SharedNavigation';
import RedesignedTodaysPlan from '@/components/dashboard/student/todays-plan/RedesignedTodaysPlan';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import ConceptCardsView from '@/components/dashboard/student/concepts/ConceptCardsView';
import FlashcardsView from '@/components/dashboard/student/flashcards/FlashcardsView';
import PracticeExamsView from '@/components/dashboard/student/practice-exam/PracticeExamsView';
import { NotificationsView } from '@/components/dashboard/student/notifications/NotificationsView';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  const [showReturnRecap, setShowReturnRecap] = useState(
    Boolean(userProfile.loginCount && userProfile.loginCount > 1 && lastActivity)
  );
  const navigate = useNavigate();

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

  // Tab metadata for titles and subtitles
  const tabTitles = {
    "overview": "Dashboard Overview",
    "today": "Today's Plan",
    "academic": "Academic Advisor",
    "concepts": "Concept Cards",
    "flashcards": "Flashcards",
    "practice-exam": "Practice Exams",
    "notifications": "Notifications"
  };

  const tabSubtitles = {
    "overview": "Your personalized learning dashboard",
    "today": "Your personalized daily study schedule",
    "academic": "Get guidance for your academic journey",
    "concepts": "Master key concepts and fundamentals",
    "flashcards": "Review and memorize with smart flashcards",
    "practice-exam": "Test your knowledge and track progress",
    "notifications": "Stay updated with important alerts"
  };

  // Handle rendering specific tab content with navigation
  const renderTabContent = () => {
    if (children) {
      return children;
    }

    switch (activeTab) {
      case 'overview':
        return tabContents.overview;
      case 'today':
        return <RedesignedTodaysPlan />;
      case 'academic':
        return <AcademicAdvisorView userProfile={userProfile} />;
      case 'concepts':
        return <ConceptCardsView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'practice-exam':
        return <PracticeExamsView />;
      case 'notifications':
        return <NotificationsView />;
      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Coming Soon</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This feature is under development. Check back later.
            </p>
          </div>
        );
    }
  };

  // Determine if we need a back button (for standalone pages)
  const shouldShowBackButton = () => {
    // Add page paths that should have back buttons
    const standalonePages = [
      '/dashboard/student/concepts/card',
      '/dashboard/student/flashcards/practice',
      '/dashboard/student/practice-exam/start',
      '/dashboard/student/concepts/study'
    ];
    
    // Check if current path matches any standalone page pattern
    const currentPath = window.location.pathname;
    return standalonePages.some(path => currentPath.includes(path));
  };

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
      
      {/* Back button for standalone pages */}
      {shouldShowBackButton() && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 text-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      )}
      
      {/* Tabs navigation */}
      {!hideTabsNav && (
        <SharedNavigation activeTab={activeTab} onTabChange={onTabChange} />
      )}
      
      {/* Content area */}
      <div className="mt-4">
        <SharedPageLayout
          title={tabTitles[activeTab as keyof typeof tabTitles] || "Coming Soon"}
          subtitle={tabSubtitles[activeTab as keyof typeof tabSubtitles] || "This feature is under development"}
        >
          {renderTabContent()}
        </SharedPageLayout>
      </div>
    </div>
  );
};

export default DashboardContent;
export type { DashboardTabsProps };
