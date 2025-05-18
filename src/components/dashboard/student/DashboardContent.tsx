
import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";
import ReturnUserRecap from "@/components/dashboard/student/ReturnUserRecap";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import ExamReadinessSection from '@/components/dashboard/student/ExamReadinessSection';
import VoiceTestPanel from '@/components/dashboard/student/VoiceTestPanel';
import FloatingVoiceAssistant from '@/components/dashboard/student/FloatingVoiceAssistant';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabContents?: Record<string, React.ReactNode>;
}

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileBase;
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
  currentMood?: MoodType;
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
  children,
  currentMood
}: DashboardContentProps) => {
  // State to track whether the returning user recap has been closed
  const [showReturnRecap, setShowReturnRecap] = useState(
    Boolean(userProfile.loginCount && userProfile.loginCount > 1 && lastActivity)
  );
  
  // State to track whether voice has been tested
  const [hasTestedVoice, setHasTestedVoice] = useState(() => {
    return localStorage.getItem('voice-tested') === 'true';
  });

  // Example weekly trends data for the exam readiness score
  const weeklyTrendsData = [
    { week: '1', score: 30 },
    { week: '2', score: 35 },
    { week: '3', score: 40 },
    { week: '4', score: 38 },
    { week: '5', score: 45 },
    { week: '6', score: 52 },
    { week: '7', score: 58 }
  ];
  
  // Example weak and strong areas
  const weakAreas = ['Organic Chemistry', 'Thermodynamics', 'Vectors'];
  const strongAreas = ['Algebra', 'Mechanics', 'Biology'];

  // Tips and suggestions for exam readiness
  const examReadinessTips = [
    "Focus on weak areas first to see the most improvement",
    "Review previously wrong answers to avoid repeating mistakes",
    "Use spaced repetition for better long-term retention",
    "Take regular practice tests to simulate exam conditions",
    "Ensure you understand concepts before memorizing formulas"
  ];

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
      
      {/* Voice Test Panel - Show only if voice hasn't been tested */}
      {!hasTestedVoice && (
        <div className="mb-4">
          <VoiceTestPanel userName={userProfile.name} />
        </div>
      )}
      
      {/* Exam Readiness Section - For the main dashboard */}
      {activeTab === 'overview' && (
        <div className="mb-6">
          <ExamReadinessSection 
            score={65}
            previousScore={58}
            weeklyTrends={weeklyTrendsData}
            weakAreas={weakAreas}
            strongAreas={strongAreas}
            tips={examReadinessTips}
          />
        </div>
      )}
      
      {/* Content area - Using custom content if provided, otherwise the generated tab content */}
      <div className="mt-4">
        {children || tabContents[activeTab] || (
          <SharedPageLayout
            title="Coming Soon"
            subtitle="This feature is under development. Check back later."
          >
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                This feature is currently being developed and will be available soon.
              </p>
            </div>
          </SharedPageLayout>
        )}
      </div>
      
      {/* Floating Voice Assistant */}
      <FloatingVoiceAssistant />
    </div>
  );
};

export default DashboardContent;
export type { DashboardTabsProps };
