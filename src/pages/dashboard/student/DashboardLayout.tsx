
import React from "react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import DashboardHeader from "./DashboardHeader";
import SidebarNavigation from "./SidebarNavigation";
import DashboardContent from "./DashboardContent";
import StudyPlanDialog from "./StudyPlanDialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PanelLeft, X } from "lucide-react";
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { formatTime, formatDate } from "./utils/DateTimeFormatter";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  // Get features from utility
  const { getFeatures } = require("./utils/FeatureManager");
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
                <><ChevronRight size={15} /> Show Sidebar</> : 
                <><PanelLeft size={15} /> Hide Sidebar</>
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
                        <><ChevronRight size={15} /> Show Navigation</> : 
                        <><X size={15} /> Hide Navigation</>
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

// Mobile Navigation Component
const MobileNavigation = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const navigate = require('react-router-dom').useNavigate();
  
  const navItems = [
    { icon: <ChevronRight size={16} />, title: "Dashboard", tab: "overview" },
    { icon: <ChevronRight size={16} />, title: "Today", tab: "today" },
    { icon: <ChevronRight size={16} />, title: "Academic", tab: "academic" },
    { icon: <ChevronRight size={16} />, title: "Tutor", tab: "tutor" },
    { icon: <ChevronRight size={16} />, title: "Flashcards", tab: "flashcards" },
    { icon: <ChevronRight size={16} />, title: "Exams", tab: "exams" },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    navigate(`/dashboard/student/${tab}`);
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max">
        {navItems.map((item) => (
          <Button
            key={item.tab}
            variant={activeTab === item.tab ? "default" : "outline"}
            size="sm"
            className={`flex-shrink-0 ${
              activeTab === item.tab 
                ? "bg-gradient-to-r from-sky-500 to-violet-500" 
                : ""
            }`}
            onClick={() => handleTabChange(item.tab)}
          >
            <span className="whitespace-nowrap">{item.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
