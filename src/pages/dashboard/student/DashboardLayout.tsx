
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import StudyPlanDialog from "./StudyPlanDialog";
import SurroundingInfluencesSection from "@/components/dashboard/student/SurroundingInfluencesSection";
import { UserProfileType, MoodType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavigation from "./MobileNavigation";
import { getFeatures } from "./utils/FeatureManager";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import SpeechRecognitionButton from "@/components/voice/SpeechRecognitionButton";

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
  onProfileImageUpdate?: (imageUrl: string) => void;
  upcomingEvents?: Array<{
    title: string;
    time: string;
    type: "exam" | "task" | "revision";
  }>;
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
  children,
  onProfileImageUpdate,
  upcomingEvents = []
}: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);
  const features = getFeatures();
  const navigate = useNavigate();
  
  const [showTour, setShowTour] = useState(showWelcomeTour);
  
  const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
  
  const handleOpenTour = () => {
    setShowTour(true);
  };
  
  const handleCloseTour = () => {
    setShowTour(false);
    localStorage.setItem('sawWelcomeTour', 'true');
    onSkipTour();
  };
  
  const handleCompleteTourAndClose = () => {
    setShowTour(false);
    localStorage.setItem('sawWelcomeTour', 'true');
    onCompleteTour();
  };

  const handleSpeechCommand = (command: string) => {
    console.log('Dashboard speech command received:', command);
    // Commands are processed within the SpeechRecognitionButton component
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 ${currentMood ? `mood-${currentMood}` : ''}`}>
      <div className="flex min-h-screen">
        <main className={`transition-all duration-300 text-base flex-1 ${isMobile ? 'p-3 pb-20' : 'p-4 sm:p-6 pb-20 md:pb-6'}`}>
          {/* Surrounding Influences Section - Hidden on mobile for cleaner experience */}
          {!isMobile && (
            <SurroundingInfluencesSection 
              influenceMeterCollapsed={influenceMeterCollapsed}
              setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
            />
          )}
          
          {/* Mobile Navigation - Fixed at bottom */}
          {isMobile && (
            <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
          )}
          
          {/* Main Content - Mobile optimized spacing */}
          {children ? (
            <div className={`${isMobile ? 'mt-2' : 'mt-6'}`}>{children}</div>
          ) : (
            <div className={`${isMobile ? 'mt-2' : 'mt-4 sm:mt-6'}`}>
              <DashboardContent
                activeTab={activeTab}
                onTabChange={onTabChange}
                userProfile={userProfile}
                kpis={kpis}
                nudges={nudges}
                markNudgeAsRead={markNudgeAsRead}
                features={features}
                showWelcomeTour={showTour}
                handleSkipTour={onSkipTour}
                handleCompleteTour={onCompleteTour}
                hideTabsNav={hideTabsNav || isMobile}
                lastActivity={lastActivity}
                suggestedNextAction={suggestedNextAction}
              />
            </div>
          )}
        </main>
      </div>
      
      {/* Speech Recognition Button positioned above voice assistant with mobile-friendly positioning */}
      <SpeechRecognitionButton
        position="dashboard"
        onCommand={handleSpeechCommand}
        className={`fixed z-50 ${isMobile ? 'bottom-32 right-4' : 'bottom-32 right-6'}`}
      />
      
      {showStudyPlan && (
        <StudyPlanDialog 
          userProfile={userProfile} 
          onClose={onCloseStudyPlan} 
        />
      )}
      
      <WelcomeTour
        onSkipTour={handleCloseTour}
        onCompleteTour={handleCompleteTourAndClose}
        isFirstTimeUser={isFirstTimeUser || !userProfile.loginCount || userProfile.loginCount <= 1}
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
