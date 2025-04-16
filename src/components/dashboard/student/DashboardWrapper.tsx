
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
import HeroPanel from '@/components/dashboard/student/HeroPanel'; 
import { useIsMobile } from "@/hooks/use-mobile";
import { MoodType } from "@/types/user";

interface DashboardWrapperProps {
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
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  currentMood?: MoodType;
  onMoodSelect?: (mood: MoodType) => void;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
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
  lastActivity,
  suggestedNextAction,
  currentMood,
  onMoodSelect
}) => {
  const isMobile = useIsMobile();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = React.useState(true);

  // Get user's primary goal
  const primaryGoal = userProfile?.goals?.[0]?.title || "UPSC 2025";
  
  // Get user's streak
  const streak = userProfile?.stats?.studyStreak || 0;

  return (
    <main className={`transition-all duration-300 ${hideSidebar ? 'md:ml-0' : 'md:ml-64'} p-4 sm:p-6 pb-20 md:pb-6`}>
      {/* Sidebar toggle button */}
      <SidebarToggleButton hideSidebar={hideSidebar} onToggle={onToggleSidebar} />
      
      {/* Top navigation controls */}
      <TopNavigationControls 
        hideSidebar={hideSidebar}
        onToggleSidebar={onToggleSidebar}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />
      
      {/* Hero Panel - New feature */}
      <HeroPanel 
        userName={userProfile.name}
        primaryGoal={primaryGoal}
        streak={streak}
        lastActivity={lastActivity?.description}
        suggestedAction={suggestedNextAction}
        onViewStudyPlan={onViewStudyPlan}
        currentMood={currentMood}
        onMoodSelect={onMoodSelect}
      />

      {/* Dashboard header - Moving below Hero Panel */}
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
      
      {/* Main dashboard content area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left navigation sidebar (desktop) */}
        {!hideSidebar && !isMobile && (
          <SidebarNavigation 
            activeTab={activeTab} 
            onTabChange={onTabChange} 
          />
        )}
        
        {/* Main content area */}
        <MainContent 
          hideTabsNav={hideTabsNav}
          activeTab={activeTab}
          userProfile={userProfile}
          kpis={kpis}
          nudges={nudges}
          markNudgeAsRead={markNudgeAsRead}
          features={features}
          showWelcomeTour={showWelcomeTour}
          onTabChange={onTabChange}
          onToggleTabsNav={onToggleTabsNav}
          onSkipTour={onSkipTour}
          onCompleteTour={onCompleteTour}
          isMobile={isMobile}
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction}
        />
      </div>
    </main>
  );
};

export default DashboardWrapper;

// Import formatting utilities
import { formatTime, formatDate } from "@/pages/dashboard/student/utils/DateTimeFormatter";
