
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
import MoodLogButton from "@/components/dashboard/student/MoodLogButton";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Sparkles } from "lucide-react";

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
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);
  const [userMood, setUserMood] = useState<MoodType>(currentMood);
  
  const features = getFeatures();

  const handleMoodChange = (mood: MoodType) => {
    setUserMood(mood);
  };
  
  // Custom navigation buttons
  const navigationButtons = [
    { 
      name: "24x7 AI Tutor", 
      icon: <MessageSquareText className="h-4 w-4 mr-1" />, 
      path: "/dashboard/student/tutor", 
      variant: "ghost" as const,
      className: "hover:bg-indigo-100 hover:text-indigo-700 text-sm"
    },
    { 
      name: "Feel Good Corner", 
      icon: <Sparkles className="h-4 w-4 mr-1" />, 
      path: "/dashboard/student/feel-good", 
      variant: "ghost" as const,
      className: "hover:bg-pink-100 hover:text-pink-700 text-sm"
    }
  ];
  
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
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <DashboardHeader 
            userProfile={userProfile}
            formattedTime={formattedTime}
            formattedDate={formattedDate}
            onViewStudyPlan={onViewStudyPlan}
          />
          
          <div className="flex-shrink-0">
            <MoodLogButton 
              currentMood={userMood} 
              onMoodChange={handleMoodChange} 
            />
          </div>
        </div>

        {/* Enhanced Top Navigation Buttons - Quick Access */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {navigationButtons.map((button) => (
            <Link to={button.path} key={button.name}>
              <Button 
                variant={button.variant} 
                size="sm" 
                className={`flex items-center ${button.className}`}
              >
                {button.icon}
                {button.name}
              </Button>
            </Link>
          ))}
        </div>

        <SurroundingInfluencesSection 
          influenceMeterCollapsed={influenceMeterCollapsed}
          setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
        />
        
        {isMobile && (
          <div className="mb-6">
            <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
          </div>
        )}
        
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
      </main>
      
      <ChatAssistant userType="student" />
      
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
