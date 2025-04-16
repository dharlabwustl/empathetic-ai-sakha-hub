
import React, { useState } from "react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import DashboardHeader from "./DashboardHeader";
import SidebarNavigation from "./SidebarNavigation";
import DashboardContent from "./DashboardContent";
import StudyPlanDialog from "./StudyPlanDialog";
import TopNavigationControls from "@/components/dashboard/student/TopNavigationControls";
import SurroundingInfluencesSection from "@/components/dashboard/student/SurroundingInfluencesSection";
import NavigationToggleButton from "@/components/dashboard/student/NavigationToggleButton";
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { formatTime, formatDate } from "./utils/DateTimeFormatter";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavigation from "./MobileNavigation";
import { getFeatures } from "./utils/FeatureManager";
import MoodLogButton from "@/components/dashboard/student/MoodLogButton";

interface DashboardLayoutProps {
  userProfile: UserProfileType;
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
  currentMood?: 'sad' | 'neutral' | 'happy' | 'motivated';
}

const DashboardLayout = ({
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
  currentMood
}: DashboardLayoutProps) => {
  const currentTime = new Date();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  const isMobile = useIsMobile();
  // Always start with influences section collapsed
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);
  // State for mood
  const [userMood, setUserMood] = useState<'sad' | 'neutral' | 'happy' | 'motivated' | undefined>(currentMood);
  
  // Get features from utility
  const features = getFeatures();

  // Handle mood change
  const handleMoodChange = (mood: 'sad' | 'neutral' | 'happy' | 'motivated' | undefined) => {
    setUserMood(mood);
    // Here you would also update this in your global state or backend
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 ${userMood ? `mood-${userMood}` : ''}`}>
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className={`transition-all duration-300 ${hideSidebar ? 'md:ml-0' : 'md:ml-64'} p-4 sm:p-6 pb-20 md:pb-6`}>
        <TopNavigationControls 
          hideSidebar={hideSidebar}
          onToggleSidebar={onToggleSidebar}
          formattedDate={formattedDate}
          formattedTime={formattedTime}
        />
        
        {/* Top header section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <DashboardHeader 
            userProfile={userProfile}
            formattedTime={formattedTime}
            formattedDate={formattedDate}
            onViewStudyPlan={onViewStudyPlan}
          />
          
          {/* Mood Log Button */}
          <div className="flex-shrink-0">
            <MoodLogButton 
              currentMood={userMood} 
              onMoodChange={handleMoodChange} 
            />
          </div>
        </div>

        {/* Surrounding Influences Meter */}
        <SurroundingInfluencesSection 
          influenceMeterCollapsed={influenceMeterCollapsed}
          setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
        />
        
        {/* Mobile Navigation */}
        {isMobile && (
          <div className="mb-6">
            <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
          </div>
        )}
        
        {/* Main dashboard content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Left navigation sidebar (desktop) */}
          {!hideSidebar && !isMobile && (
            <SidebarNavigation 
              activeTab={activeTab} 
              onTabChange={onTabChange} 
            />
          )}
          
          {/* Main content area */}
          <div className="lg:col-span-9 xl:col-span-10">
            {!isMobile && (
              <NavigationToggleButton 
                hideTabsNav={hideTabsNav} 
                onToggleTabsNav={onToggleTabsNav}
              />
            )}
            
            {/* Main content area */}
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
              hideTabsNav={hideTabsNav || isMobile}
              lastActivity={lastActivity}
              suggestedNextAction={suggestedNextAction}
            />
          </div>
        </div>
      </main>
      
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
