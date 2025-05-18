
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
  
  // Don't force disable tour popup
  const [showTour, setShowTour] = useState(showWelcomeTour);
  
  // Check if user is brand new
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
    <div className={`min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 ${currentMood ? `mood-${currentMood}` : ''}`}>
      <div className="flex min-h-screen">
        {/* IMPORTANT: Only show the UniversalSidebar from the parent component - removed sidebar from here to fix double sidebar issue */}
        
        <main className={`transition-all duration-300 text-base flex-1 p-4 sm:p-6 pb-20 md:pb-6`}>
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

          {/* Subscription Banner */}
          <SubscriptionBanner 
            planType={subscriptionDetails.planType}
            expiryDate={subscriptionDetails.expiryDate}
            isExpired={subscriptionDetails.isExpired}
          />

          {/* Enhanced Dashboard Header */}
          <div className="mb-6">
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

          {/* Surrounding Influences Section */}
          <SurroundingInfluencesSection 
            influenceMeterCollapsed={influenceMeterCollapsed}
            setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
          />
          
          {isMobile && (
            <div className="mb-6">
              <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          )}
          
          {/* Main Content - either custom children or standard dashboard content */}
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
                currentMood={currentMood}
              />
            </div>
          )}
        </main>
      </div>
      
      {/* Chat assistant removed */}
      
      {showStudyPlan && (
        <StudyPlanDialog 
          userProfile={userProfile} 
          onClose={onCloseStudyPlan} 
        />
      )}
      
      {/* WelcomeTour */}
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
