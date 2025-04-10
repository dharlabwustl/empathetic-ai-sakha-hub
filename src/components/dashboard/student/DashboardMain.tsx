
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardHeader from "@/pages/dashboard/student/DashboardHeader";
import DashboardContent from "@/pages/dashboard/student/DashboardContent";
import SidebarNavigation from "@/pages/dashboard/student/SidebarNavigation";
import MobileNavigation from "@/pages/dashboard/student/MobileNavigation";
import { formatTime, formatDate } from "@/pages/dashboard/student/utils/DateTimeFormatter";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardMainProps {
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
}

const DashboardMain: React.FC<DashboardMainProps> = ({
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
  onCompleteTour
}) => {
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  const isMobile = useIsMobile();

  return (
    <main className={`transition-all duration-300 ${hideSidebar ? 'md:ml-0' : 'md:ml-64'} p-4 sm:p-6 pb-20 md:pb-6`}>
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
        <div className="lg:col-span-9 xl:col-span-10">
          {!isMobile && (
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
          />
        </div>
      </div>
    </main>
  );
};

export default DashboardMain;
