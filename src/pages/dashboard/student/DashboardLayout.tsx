import React, { useState, useEffect } from "react";
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
import { BookOpen, MessageSquareText, Sparkles, Brain } from "lucide-react";
import { getMoodMotivationalQuote, applyMoodTheme, saveMoodToLocalStorage, getMoodIcon } from "@/components/dashboard/student/mood-tracking/moodUtils";

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
  onMoodChange
}: DashboardLayoutProps) => {
  const currentTime = new Date();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  const isMobile = useIsMobile();
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);
  const [userMood, setUserMood] = useState<MoodType | undefined>(currentMood);
  const [motivationalQuote, setMotivationalQuote] = useState<string>("");

  const features = getFeatures();

  useEffect(() => {
    setUserMood(currentMood);
  }, [currentMood]);

  useEffect(() => {
    if (userMood) {
      const quote = getMoodMotivationalQuote(userMood);
      setMotivationalQuote(quote);
    }
  }, [userMood]);

  const handleMoodChange = (mood: MoodType) => {
    setUserMood(mood);
    
    if (onMoodChange) {
      onMoodChange(mood);
    } else {
      applyMoodTheme(mood);
      saveMoodToLocalStorage(mood);
    }
  };

  const navigationButtons = [
    { 
      name: "24/7 AI Tutor", 
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
    },
    { 
      name: "Academic Advisor", 
      icon: <Brain className="h-4 w-4 mr-1" />, 
      path: "/dashboard/student/advisor", 
      variant: "ghost" as const,
      className: "hover:bg-purple-100 hover:text-purple-700 text-sm"
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
            currentMood={userMood}
          />
          
          <div className="flex-shrink-0">
            <MoodLogButton 
              currentMood={userMood} 
              onMoodChange={handleMoodChange} 
            />
          </div>
        </div>

        {motivationalQuote && (
          <motion.div 
            className="mb-6 p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              {userMood && getMoodIcon(userMood)}
              <p className="text-sm italic">{motivationalQuote}</p>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="flex flex-wrap items-center gap-2 mb-4 p-2 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
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
              <Link to={button.path}>
                <Button 
                  variant={button.variant} 
                  size="sm" 
                  className={`flex items-center ${button.className}`}
                >
                  {button.icon}
                  {button.name}
                </Button>
              </Link>
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
              currentMood={userMood}
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
