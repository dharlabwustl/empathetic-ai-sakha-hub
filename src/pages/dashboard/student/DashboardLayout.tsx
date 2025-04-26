
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { BookOpen, MessageSquare, Brain, Heart } from "lucide-react";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";

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
  children
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
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
      icon: <MessageSquare className="h-4 w-4 mr-1" />, 
      path: "/dashboard/student/ai-tutor", 
      variant: "default" as const,
      className: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md"
    },
    { 
      name: "Academic Advisor", 
      icon: <Brain className="h-4 w-4 mr-1" />, 
      path: "/dashboard/student/academic-advisor", 
      variant: "default" as const,
      className: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-md"
    },
    { 
      name: "Feel Good Corner", 
      icon: <Heart className="h-4 w-4 mr-1" />, 
      path: "/dashboard/student/feel-good-corner", 
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
  
  // Handler for navigation button clicks
  const handleNavigateToSection = (path: string) => {
    navigate(path);
    // Extract tab from path
    const tabFromPath = path.split('/').pop() || 'overview';
    if (tabFromPath === 'ai-tutor') {
      onTabChange('tutor');
    } else if (tabFromPath === 'academic-advisor') {
      onTabChange('academic');
    } else if (tabFromPath === 'feel-good-corner') {
      onTabChange('feel-good');
    } else {
      onTabChange(tabFromPath);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 ${currentMood ? `mood-${currentMood}` : ''}`}>
      <SidebarNav userType="student" userName={userProfile?.name || "Student"} />
      
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
          />
        </div>

        {/* Enhanced Quick Access Navigation Bar */}
        <motion.div 
          className="flex flex-wrap items-center gap-2 mb-4 p-2 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navigationButtons.map((button, index) => (
            <motion.div
              key={button.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant={button.variant} 
                size="sm" 
                className={`flex items-center ${button.className}`}
                onClick={() => handleNavigateToSection(button.path)}
              >
                {button.icon}
                {button.name}
              </Button>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-auto"
          >
            <Button 
              variant="outline"
              size="sm"
              className="bg-gradient-to-r hover:from-violet-500 hover:to-indigo-500 hover:text-white border-violet-200"
              onClick={onViewStudyPlan}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              View Study Plan
            </Button>
          </motion.div>
        </motion.div>

        {/* Surrounding Influences Section - Enhanced with our redesigned component */}
        <SurroundingInfluencesSection 
          influenceMeterCollapsed={influenceMeterCollapsed}
          setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
        />
        
        {isMobile && (
          <div className="mb-6">
            <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
          </div>
        )}
        
        {/* Either render children or the default dashboard content */}
        {children ? (
          <div>{children}</div>
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
        isFirstTimeUser={!userProfile?.loginCount || userProfile.loginCount <= 1}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        loginCount={userProfile?.loginCount || 0}
        open={showTour}
        onOpenChange={setShowTour}
      />
    </div>
  );
};

export default DashboardLayout;
