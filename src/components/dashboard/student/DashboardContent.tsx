
import React, { useState, useEffect } from 'react';
import { UserProfileType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";
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
  
  // State to track whether voice has been tested
  const [hasTestedVoice, setHasTestedVoice] = useState(() => {
    return localStorage.getItem('voice-tested') === 'true';
  });

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
  
  // Mark voice as tested
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasTestedVoice(true);
      localStorage.setItem('voice-tested', 'true');
    }, 15000);
    
    return () => clearTimeout(timer);
  }, []);

  // Tab metadata for titles and subtitles
  const tabTitles = {
    "overview": "Dashboard Overview",
    "today": "Today's Plan",
    "academic": "Academic Advisor",
    "tutor": "24/7 AI Tutor",
    "concepts": "Concept Cards",
    "flashcards": "Flashcards",
    "practice-exam": "Practice Exams",
    "feel-good-corner": "Feel Good Corner",
    "notifications": "Notifications"
  };

  const tabSubtitles = {
    "overview": "Your personalized learning dashboard",
    "today": "Your personalized daily study schedule",
    "academic": "Get guidance for your academic journey",
    "tutor": "Get 24/7 help with your studies from our AI tutor",
    "concepts": "Master key concepts and fundamentals",
    "flashcards": "Review and memorize with smart flashcards",
    "practice-exam": "Test your knowledge and track progress",
    "feel-good-corner": "Take a break and boost your motivation",
    "notifications": "Stay updated with important alerts"
  };

  // Common layout structure for all tabs
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
      
      {/* Content area - Using custom content if provided, otherwise the generated tab content */}
      <div className="mt-4">
        {children || (
          <SharedPageLayout
            title={tabTitles[activeTab as keyof typeof tabTitles] || "Coming Soon"}
            subtitle={tabSubtitles[activeTab as keyof typeof tabSubtitles] || "This feature is under development"}
          >
            {tabContents[activeTab] || (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  This feature is currently being developed and will be available soon.
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
