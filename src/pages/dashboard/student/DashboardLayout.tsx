
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import DashboardContent from "@/components/dashboard/student/DashboardContent";
import TopNavigationControls from "@/components/dashboard/student/TopNavigationControls";
import SurroundingInfluencesSection from "@/components/dashboard/student/SurroundingInfluencesSection";
import { UserProfileType, MoodType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import { getFeatures } from "@/components/dashboard/student/utils/FeatureManager";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";
import SubscriptionBanner from "@/components/dashboard/SubscriptionBanner";
import EnhancedDashboardHeader from "@/components/dashboard/student/EnhancedDashboardHeader";
import UniversalSidebar from "@/components/dashboard/UniversalSidebar";
import SidebarLayout from "@/components/dashboard/SidebarLayout";

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
  currentMood?: MoodType | null;
  onMoodChange?: (mood: MoodType) => void;
  children?: React.ReactNode;
}

// Simple function to format date and time while we fix imports
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

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
}: DashboardLayoutProps) => {
  const currentTime = new Date();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  const isMobile = useIsMobile();
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);
  const features = getFeatures();
  const navigate = useNavigate();
  
  // Fixed: Don't force disable tour popup
  const [showTour, setShowTour] = useState(showWelcomeTour);
  
  // Check if user is brand new
  const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
  
  const handleOpenTour = () => {
    // Fixed: Actually open the tour when requested
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
      planType: 'free',
      isExpired: false
    };
  };
  
  const subscriptionDetails = getSubscriptionDetails();

  // Sample upcoming events (in a real app, these would come from a backend)
  const upcomingEvents = [
    { title: 'NEET Practice Test', time: 'Today, 4:00 PM', type: 'exam' as const },
    { title: 'Biology Revision', time: 'Tomorrow, 9:00 AM', type: 'task' as const }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 ${currentMood ? `mood-${currentMood}` : ''}`}>
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
        
        {/* Main Content */}
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
      </main>
      
      <ChatAssistant userType="student" />
      
      {showStudyPlan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-4">Study Plan</h2>
            <button onClick={onCloseStudyPlan} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
          </div>
        </div>
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
