
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import StudyPlanDialog from "./StudyPlanDialog";
import TopNavigationControls from "@/components/dashboard/student/TopNavigationControls";
import SurroundingInfluencesSection from "@/components/dashboard/student/SurroundingInfluencesSection";
import { UserProfileType, MoodType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { formatTime, formatDate } from "./utils/DateTimeFormatter";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavigation from "./MobileNavigation";
import { getFeatures } from "./utils/FeatureManager";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import SubscriptionBanner from "@/components/dashboard/SubscriptionBanner";
import EnhancedDashboardHeader from "@/components/dashboard/student/EnhancedDashboardHeader";
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
  const currentTime = new Date();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
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

  const getSubscriptionDetails = () => {
    if (!userProfile.subscription) {
      return {
        planType: 'free',
        isExpired: false
      };
    }
    
    if (typeof userProfile.subscription === 'object') {
      const isExpired = userProfile.subscription.expiryDate 
        ? new Date(userProfile.subscription.expiryDate) < new Date()
        : false;
        
      return {
        planType: userProfile.subscription.planType || 'free',
        expiryDate: userProfile.subscription.expiryDate,
        isExpired
      };
    }
    
    return {
      planType: userProfile.subscription as string,
      isExpired: false
    };
  };
  
  const subscriptionDetails = getSubscriptionDetails();

  return (
    <div className={`min-h-screen relative overflow-hidden ${currentMood ? `mood-${currentMood}` : ''}`}>
      {/* Premium Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50/80 to-purple-50/60 dark:from-violet-950/20 dark:via-indigo-950/10 dark:to-purple-950/5" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)]" />
      </div>

      <div className="flex min-h-screen relative">
        <main className={`transition-all duration-500 ease-in-out text-base flex-1 p-4 sm:p-6 pb-20 md:pb-6 relative`}>
          {/* Premium glass overlay for content */}
          <div className="absolute inset-4 sm:inset-6 bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-3xl border border-white/50 dark:border-white/10 shadow-2xl -z-10" />
          
          {/* Top Navigation Controls with premium styling */}
          <div className="relative z-10 mb-6">
            <div className="bg-white/60 dark:bg-black/30 backdrop-blur-md rounded-2xl border border-white/60 dark:border-white/10 shadow-lg p-4">
              <TopNavigationControls 
                hideSidebar={hideSidebar}
                onToggleSidebar={onToggleSidebar}
                formattedDate={formattedDate}
                formattedTime={formattedTime}
                onOpenTour={handleOpenTour}
                userName={userProfile.name}
                mood={currentMood}
                isFirstTimeUser={isFirstTimeUser}
                onViewStudyPlan={onViewStudyPlan}
              />
            </div>
          </div>

          {/* Subscription Banner with premium styling */}
          <div className="relative z-10 mb-6">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <SubscriptionBanner 
                planType={subscriptionDetails.planType}
                expiryDate={subscriptionDetails.expiryDate}
                isExpired={subscriptionDetails.isExpired}
              />
            </div>
          </div>

          {/* Enhanced Dashboard Header with premium container */}
          <div className="mb-6 relative z-10">
            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-white/40 dark:border-white/10 shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl">
              <EnhancedDashboardHeader 
                userProfile={userProfile}
                formattedTime={formattedTime}
                formattedDate={formattedDate}
                onViewStudyPlan={onViewStudyPlan}
                currentMood={currentMood}
                onMoodChange={onMoodChange}
                upcomingEvents={upcomingEvents}
              />
            </div>
          </div>

          {/* Surrounding Influences Section with premium styling */}
          <div className="relative z-10 mb-6">
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <SurroundingInfluencesSection 
                influenceMeterCollapsed={influenceMeterCollapsed}
                setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
              />
            </div>
          </div>
          
          {isMobile && (
            <div className="mb-6 relative z-10">
              <div className="bg-white/60 dark:bg-black/30 backdrop-blur-md rounded-2xl border border-white/50 dark:border-white/10 shadow-lg">
                <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
              </div>
            </div>
          )}
          
          {/* Main Content with premium container */}
          <div className="relative z-10">
            <div className="bg-white/40 dark:bg-black/10 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-white/5 shadow-xl p-6 min-h-[500px] transform transition-all duration-300 hover:shadow-2xl">
              {children ? (
                <div className="mt-6">{children}</div>
              ) : (
                <div className="mt-4 sm:mt-6">
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
            </div>
          </div>
        </main>
      </div>
      
      {/* Speech Recognition Button with premium styling */}
      <div className="fixed bottom-32 right-6 z-50">
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-1 rounded-full shadow-2xl">
          <SpeechRecognitionButton
            position="dashboard"
            onCommand={handleSpeechCommand}
            className="bg-white dark:bg-black rounded-full"
          />
        </div>
      </div>
      
      {showStudyPlan && (
        <div className="relative z-50">
          <StudyPlanDialog 
            userProfile={userProfile} 
            onClose={onCloseStudyPlan} 
          />
        </div>
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
