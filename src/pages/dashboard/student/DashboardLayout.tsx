import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import DashboardHeader from "./DashboardHeader";
import SidebarNavigation from "./SidebarNavigation";
import DashboardContent from "./DashboardContent";
import StudyPlanDialog from "./StudyPlanDialog";
import TopNavigationControls from "@/components/dashboard/student/TopNavigationControls";
import SurroundingInfluencesSection from "@/components/dashboard/student/SurroundingInfluencesSection";
import NavigationToggleButton from "@/components/dashboard/student/NavigationToggleButton";
import { UserProfileType, MoodType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { formatTime, formatDate } from "./utils/DateTimeFormatter";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavigation from "./MobileNavigation";
import { getFeatures } from "./utils/FeatureManager";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquareText, Brain } from "lucide-react";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import { QuickAccessButtons } from "@/components/dashboard/student/QuickAccessButtons";
import { QuickAccess } from "@/components/dashboard/student/QuickAccess";

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
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
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
  children
}: DashboardLayoutProps) => {
  const currentTime = new Date();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  const isMobile = useIsMobile();
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);
  
  const features = getFeatures();

  // Navigation buttons for quick access
  const navigationButtons = [
    { 
      name: "24/7 AI Tutor", 
      icon: <MessageSquareText className="h-4 w-4 mr-1" />, 
      path: "/dashboard/student/tutor", 
      variant: "default" as const,
      className: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md"
    },
    { 
      name: "Academic Advisor", 
      icon: <Brain className="h-4 w-4 mr-1" />, 
      path: "/dashboard/student/academic", 
      variant: "default" as const,
      className: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-md"
    },
    { 
      name: "Feel Good Corner", 
      icon: <BookOpen className="h-4 w-4 mr-1" />, 
      path: "/dashboard/student/feel-good", 
      variant: "default" as const,
      className: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-md"
    }
  ];
  
  const [showTour, setShowTour] = useState(showWelcomeTour);
  
  const handleOpenTour = () => {
    setShowTour(true);
  };
  
  const handleCloseTour = () => {
    setShowTour(false);
    onSkipTour();
  };
  
  const handleCompleteTourAndClose = () => {
    setShowTour(false);
    onCompleteTour();
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 ${currentMood ? `mood-${currentMood}` : ''}`}>
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className={`transition-all duration-300 ${hideSidebar ? 'md:ml-0' : 'md:ml-64'} p-4 sm:p-6 pb-20 md:pb-6`}>
        <TopNavigationControls 
          hideSidebar={hideSidebar}
          onToggleSidebar={onToggleSidebar}
          formattedDate={formattedDate}
          formattedTime={formattedTime}
          onOpenTour={handleOpenTour}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <DashboardHeader 
            userProfile={userProfile}
            formattedTime={formattedTime}
            formattedDate={formattedDate}
            onViewStudyPlan={onViewStudyPlan}
            currentMood={currentMood}
            onMoodChange={onMoodChange}
          />
        </div>

        {/* Surrounding Influences Section */}
        <SurroundingInfluencesSection 
          influenceMeterCollapsed={influenceMeterCollapsed}
          setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
        />
        
        {isMobile && (
          <div className="mb-6">
            <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
          </div>
        )}
        
        {/* Either render children (custom content) or the default dashboard content */}
        {children ? (
          <div className="mt-6">{children}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mt-4 sm:mt-6">
            {!hideSidebar && !isMobile && (
              <SidebarNavigation 
                activeTab={activeTab} 
                onTabChange={onTabChange} 
              />
            )}
            
            <div className="lg:col-span-9 xl:col-span-10">
              {!isMobile && (
                <NavigationToggleButton 
                  hideTabsNav={hideTabsNav} 
                  onToggleTabsNav={onToggleTabsNav}
                />
              )}
              
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
        )}
      </main>
      
      <ChatAssistant userType="student" />
      
      {showStudyPlan && (
        <StudyPlanDialog 
          userProfile={userProfile} 
          onClose={onCloseStudyPlan} 
        />
      )}
      
      <WelcomeTour
        onSkipTour={handleCloseTour}
        onCompleteTour={handleCompleteTourAndClose}
        isFirstTimeUser={!userProfile.loginCount || userProfile.loginCount <= 1}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        loginCount={userProfile.loginCount}
        open={showTour}
        onOpenChange={setShowTour}
      />
    </div>
  );
};

export default DashboardLayout;
