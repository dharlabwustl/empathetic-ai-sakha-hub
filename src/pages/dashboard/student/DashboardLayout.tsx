
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserProfileType } from '@/types/user';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import MainContent from '@/components/dashboard/student/MainContent';
import Sidebar from '@/components/dashboard/student/Sidebar';
import StudentOnboarding from '@/components/dashboard/student/StudentOnboarding';
import SidebarToggleButton from '@/components/dashboard/student/SidebarToggleButton';
import StationeryModal from '@/components/dashboard/student/StationeryModal';
import FeelGoodCorner from '@/components/dashboard/student/FeelGoodCorner';
import StudyPlanModal from '@/components/dashboard/student/StudyPlanModal';

export interface DashboardLayoutProps {
  loading: boolean;
  userProfile: UserProfileType;
  activeTab: string;
  showWelcomeTour: boolean;
  showOnboarding: boolean;
  showStudyPlan: boolean;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  kpis: KpiData[];
  nudges: NudgeData[];
  features: any[];
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  markNudgeAsRead: (id: string) => void;
  handleTabChange: (tab: string) => void;
  handleSkipTour: () => void;
  onCompleteTour: () => void;
  handleCompleteOnboarding: () => void;
  handleCloseStudyPlan: () => void;
  toggleSidebar: () => void;
  toggleTabsNav: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  loading,
  userProfile,
  activeTab,
  showWelcomeTour,
  showOnboarding,
  showStudyPlan,
  hideSidebar,
  hideTabsNav,
  kpis,
  nudges,
  features,
  lastActivity,
  suggestedNextAction,
  markNudgeAsRead,
  handleTabChange,
  handleSkipTour,
  onCompleteTour,
  handleCompleteOnboarding,
  handleCloseStudyPlan,
  toggleSidebar,
  toggleTabsNav
}) => {
  const [showStationery, setShowStationery] = useState(false);
  const [showFeelGood, setShowFeelGood] = useState(false);
  const location = useLocation();
  const isMobile = window.innerWidth < 768;
  
  // Show loading state if data is still loading
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-purple-600"></div>
      </div>
    );
  }
  
  // Show onboarding if needed
  if (showOnboarding) {
    return <StudentOnboarding onComplete={handleCompleteOnboarding} userProfile={userProfile} />;
  }
  
  const handleOpenStationery = () => {
    setShowStationery(true);
  };
  
  const handleCloseStationery = () => {
    setShowStationery(false);
  };
  
  const handleOpenFeelGood = () => {
    setShowFeelGood(true);
  };
  
  const handleCloseFeelGood = () => {
    setShowFeelGood(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        hideSidebar={hideSidebar} 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onOpenStationery={handleOpenStationery}
        onOpenFeelGood={handleOpenFeelGood}
      />
      
      {/* Sidebar toggle button */}
      <SidebarToggleButton hideSidebar={hideSidebar} onToggle={toggleSidebar} />
      
      {/* Main content area */}
      <main className={`transition-all duration-300 ${hideSidebar ? 'lg:ml-0' : 'lg:ml-60'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <MainContent 
              hideTabsNav={hideTabsNav}
              activeTab={activeTab} 
              userProfile={userProfile}
              kpis={kpis}
              nudges={nudges}
              markNudgeAsRead={markNudgeAsRead}
              features={features}
              showWelcomeTour={showWelcomeTour}
              onTabChange={handleTabChange} 
              onToggleTabsNav={toggleTabsNav}
              onSkipTour={handleSkipTour}
              onCompleteTour={onCompleteTour}
              isMobile={isMobile}
              lastActivity={lastActivity}
              suggestedNextAction={suggestedNextAction}
            />
          </div>
        </div>
      </main>
      
      {/* Modals */}
      <StationeryModal 
        isOpen={showStationery} 
        onClose={handleCloseStationery}
      />
      
      <StudyPlanModal
        isOpen={showStudyPlan}
        onClose={handleCloseStudyPlan}
      />
      
      {showFeelGood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative h-[90vh] w-[90vw] overflow-auto rounded-lg bg-white p-6">
            <button 
              onClick={handleCloseFeelGood}
              className="absolute right-4 top-4 rounded-full bg-gray-200 p-1 text-gray-800 hover:bg-gray-300"
            >
              &times;
            </button>
            <FeelGoodCorner />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
