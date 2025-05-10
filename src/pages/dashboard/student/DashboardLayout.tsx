
import React from "react";
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { MoodType } from "@/types/user/base";
import { SidebarProvider } from "@/components/ui/sidebar";
import UniversalSidebar from "@/components/dashboard/UniversalSidebar";
import DashboardContent from "@/components/dashboard/student/DashboardContent";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import StudyPlanDialog from "@/pages/dashboard/student/StudyPlanDialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userProfile: UserProfileBase;
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
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  onProfileImageUpdate?: (imageUrl: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userProfile,
  hideSidebar,
  hideTabsNav,
  activeTab,
  kpis,
  nudges,
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
  lastActivity,
  suggestedNextAction,
  currentMood,
  onMoodChange,
  onProfileImageUpdate
}) => {
  const isMobile = useIsMobile();
  
  // Mock features for dashboard - this would come from an API in a real app
  const features = [
    { title: "Concept Cards", description: "Master key concepts", path: "/dashboard/student/concepts" },
    { title: "Flashcards", description: "Review important facts", path: "/dashboard/student/flashcards" },
    { title: "Practice Exams", description: "Test your knowledge", path: "/dashboard/student/practice-exam" },
    { title: "Academic Advisor", description: "Get personalized guidance", path: "/dashboard/student/academic" }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Only show one sidebar - Universal Sidebar */}
      {!isMobile && <UniversalSidebar collapsed={hideSidebar} />}
      
      <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-6">
        {/* Main Dashboard Content */}
        <DashboardContent
          activeTab={activeTab}
          onTabChange={onTabChange}
          userProfile={userProfile}
          kpis={kpis}
          nudges={nudges}
          markNudgeAsRead={markNudgeAsRead}
          features={features}
          showWelcomeTour={showWelcomeTour}
          handleSkipTour={onSkipTour}
          handleCompleteTour={onCompleteTour}
          hideTabsNav={hideTabsNav}
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction}
        >
          {children}
        </DashboardContent>
      </main>
      
      {/* Chat assistant */}
      <ChatAssistant userType="student" />
      
      {/* Study Plan Dialog */}
      {showStudyPlan && (
        <StudyPlanDialog 
          userProfile={userProfile} 
          onClose={onCloseStudyPlan} 
        />
      )}
    </div>
  );
};

export default DashboardLayout;
