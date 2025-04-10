
import React from "react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import DashboardHeader from "./DashboardHeader";
import SidebarNavigation from "./SidebarNavigation";
import DashboardContent from "./DashboardContent";
import StudyPlanDialog from "./StudyPlanDialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { formatTime, formatDate } from "./utils/DateTimeFormatter";

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
  onCloseStudyPlan
}: DashboardLayoutProps) => {
  const currentTime = new Date();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  
  // Get features from utility
  const { getFeatures } = require("./utils/FeatureManager");
  const features = getFeatures();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className={`transition-all duration-300 ${hideSidebar ? 'md:ml-0' : 'md:ml-64'} p-6 pb-20 md:pb-6`}>
        {/* Toggle sidebar button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-20 z-40 hidden md:flex bg-white shadow-md hover:bg-gray-100"
          onClick={onToggleSidebar}
        >
          {hideSidebar ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
        
        {/* Top header section */}
        <DashboardHeader 
          userProfile={userProfile}
          formattedTime={formattedTime}
          formattedDate={formattedDate}
          onViewStudyPlan={onViewStudyPlan}
        />
        
        {/* Main dashboard content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left navigation sidebar (desktop) */}
          {!hideSidebar && (
            <SidebarNavigation 
              activeTab={activeTab} 
              onTabChange={onTabChange} 
            />
          )}
          
          {/* Toggle tabs visibility button */}
          <div className="lg:col-span-9 xl:col-span-10">
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-white shadow-sm hover:bg-violet-50 border-violet-200 text-violet-700"
                onClick={onToggleTabsNav}
              >
                {hideTabsNav ? "Show Navigation" : "Hide Navigation"} 
                {hideTabsNav ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
              </Button>
            </div>
            
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
              hideTabsNav={hideTabsNav}
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
