
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardHeader from "@/pages/dashboard/student/DashboardHeader";
import SidebarNavigation from "@/pages/dashboard/student/SidebarNavigation";
import MobileNavigation from "@/pages/dashboard/student/MobileNavigation";
import SidebarToggleButton from '@/components/dashboard/student/SidebarToggleButton';
import TopNavigationControls from '@/components/dashboard/student/TopNavigationControls';
import SurroundingInfluencesSection from '@/components/dashboard/student/SurroundingInfluencesSection';
import MainContent from '@/components/dashboard/student/MainContent';
import { useIsMobile } from "@/hooks/use-mobile";
import MoodDashboard from "@/components/dashboard/student/mood-tracking/MoodDashboard";

interface DashboardLayoutProps {
  userProfile: UserProfileType;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  activeTab: string;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  currentTime: Date;
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
  currentMood?: 'sad' | 'neutral' | 'happy' | 'motivated' | undefined;
  children?: React.ReactNode;
}

const DashboardLayout = ({
  userProfile,
  hideSidebar,
  hideTabsNav,
  activeTab,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  currentTime,
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
  children
}) => {
  const isMobile = useIsMobile();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = React.useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar toggle button */}
      <SidebarToggleButton hideSidebar={hideSidebar} onToggle={onToggleSidebar} />
      
      {/* Top navigation controls */}
      <TopNavigationControls 
        hideSidebar={hideSidebar}
        onToggleSidebar={onToggleSidebar}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />
      
      {/* Dashboard header */}
      <DashboardHeader 
        userProfile={userProfile}
        formattedTime={formattedTime}
        formattedDate={formattedDate}
        onViewStudyPlan={onViewStudyPlan}
      />

      {/* Surrounding Influences Meter */}
      <SurroundingInfluencesSection 
        influenceMeterCollapsed={influenceMeterCollapsed}
        setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
      />
      
      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* New Mood Dashboard Section */}
          <section>
            <MoodDashboard />
          </section>
          
          {/* Child Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

// Import formatting utilities
import { formatTime, formatDate } from "@/pages/dashboard/student/utils/DateTimeFormatter";
