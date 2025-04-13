
import React, { useState } from "react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import DashboardHeader from "./DashboardHeader";
import SidebarNavigation from "./SidebarNavigation";
import DashboardContent from "./DashboardContent";
import StudyPlanDialog from "./StudyPlanDialog";
import SurroundingInfluencesMeter from "@/components/dashboard/student/SurroundingInfluencesMeter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PanelLeft, X, ChevronDown, ChevronUp } from "lucide-react";
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { formatTime, formatDate } from "./utils/DateTimeFormatter";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavigation from "./MobileNavigation";
import { getFeatures } from "./utils/FeatureManager";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  suggestedNextAction
}: DashboardLayoutProps) => {
  const currentTime = new Date();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  const isMobile = useIsMobile();
  // Always start with influences section collapsed
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);
  
  // Get features from utility
  const features = getFeatures();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className={`transition-all duration-300 ${hideSidebar ? 'md:ml-0' : 'md:ml-64'} p-4 sm:p-6 pb-20 md:pb-6`}>
        {/* Top navigation controls */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          {/* Toggle sidebar button - improved position */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-1 bg-white shadow-sm hover:bg-purple-50 border-purple-200 text-purple-700"
              onClick={onToggleSidebar}
            >
              {hideSidebar ? 
                <><ChevronRight width={15} height={15} /> Show Sidebar</> : 
                <><PanelLeft width={15} height={15} /> Hide Sidebar</>
              }
            </Button>
          </motion.div>
          
          {/* Date/time display */}
          <div className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{formattedTime}</span>
          </div>
        </div>
        
        {/* Top header section */}
        <DashboardHeader 
          userProfile={userProfile}
          formattedTime={formattedTime}
          formattedDate={formattedDate}
          onViewStudyPlan={onViewStudyPlan}
        />

        {/* Surrounding Influences Meter - Using Collapsible component */}
        <Collapsible className="mt-4 sm:mt-6 mb-0 sm:mb-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-gray-800">Surrounding Influences</h2>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-1 text-gray-600"
                onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
              >
                {influenceMeterCollapsed ? (
                  <>
                    <ChevronDown width={16} height={16} />
                    <span>Expand</span>
                  </>
                ) : (
                  <>
                    <ChevronUp width={16} height={16} />
                    <span>Collapse</span>
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="overflow-hidden">
            <AnimatePresence>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SurroundingInfluencesMeter />
              </motion.div>
            </AnimatePresence>
          </CollapsibleContent>
        </Collapsible>
        
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
              <div className="flex items-center justify-end mb-4">
                {/* Toggle tabs visibility button with improved UI */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hideTabsNav ? 'show' : 'hide'}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 bg-white shadow-sm hover:bg-violet-50 border-violet-200 text-violet-700"
                      onClick={onToggleTabsNav}
                    >
                      {hideTabsNav ? 
                        <><ChevronRight width={15} height={15} /> Show Navigation</> : 
                        <><X width={15} height={15} /> Hide Navigation</>
                      }
                    </Button>
                  </motion.div>
                </AnimatePresence>
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
