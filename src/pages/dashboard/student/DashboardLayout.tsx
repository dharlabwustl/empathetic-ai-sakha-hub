
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
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-purple-50/30 dark:from-violet-950/20 dark:via-gray-900 dark:to-purple-950/20" />
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-purple-300/20 dark:bg-purple-500/10 rounded-full animate-float-subtle"
              style={{
                width: Math.random() * 8 + 4 + 'px',
                height: Math.random() * 8 + 4 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: (Math.random() * 3 + 4) + 's'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 pb-20 md:pb-6 backdrop-blur-sm">
        {/* Top Navigation with Premium Glass Effect */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl" />
          <div className="relative z-10 p-1">
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

        {/* Premium Subscription Banner */}
        <div className="mb-6 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <SubscriptionBanner 
              planType={subscriptionDetails.planType}
              expiryDate={subscriptionDetails.expiryDate}
              isExpired={subscriptionDetails.isExpired}
            />
          </div>
        </div>

        {/* Enhanced Dashboard Header with Premium Styling */}
        <div className="mb-6 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-purple-50/40 to-blue-50/40 dark:from-gray-800/40 dark:via-purple-900/20 dark:to-blue-900/20 rounded-3xl backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500" />
          <div className="relative z-10 p-1">
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

        {/* Premium Surrounding Influences Section */}
        <div className="mb-6 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-white/60 to-purple-50/50 dark:from-indigo-950/30 dark:via-gray-800/60 dark:to-purple-950/30 rounded-2xl backdrop-blur-sm border border-indigo-100/60 dark:border-indigo-800/30 shadow-xl group-hover:shadow-2xl transition-all duration-300" />
          <div className="relative z-10 p-1">
            <SurroundingInfluencesSection 
              influenceMeterCollapsed={influenceMeterCollapsed}
              setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
            />
          </div>
        </div>
        
        {isMobile && (
          <div className="mb-6 relative">
            <div className="glass-card rounded-2xl p-1 shadow-xl">
              <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          </div>
        )}
        
        {/* Main Content with Premium Container */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-purple-50/40 to-blue-50/60 dark:from-gray-800/60 dark:via-purple-900/20 dark:to-blue-900/40 rounded-3xl backdrop-blur-xl border border-white/60 dark:border-gray-700/40 shadow-2xl group-hover:shadow-3xl transition-all duration-500" />
          <div className="relative z-10 p-6">
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
      </div>
      
      {/* Premium Speech Recognition Button */}
      <div className="fixed bottom-32 right-6 z-50 group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
        <div className="relative">
          <SpeechRecognitionButton
            position="dashboard"
            onCommand={handleSpeechCommand}
            className="relative z-10 shadow-2xl border-2 border-white/20 backdrop-blur-sm"
          />
        </div>
      </div>
      
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
