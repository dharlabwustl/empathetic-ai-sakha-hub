
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
import { usePrepzrVoiceAssistant } from "@/hooks/usePrepzrVoiceAssistant";

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
  
  // Determine if this is a first-time user
  const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
  const hasCompletedWelcome = localStorage.getItem('hasSpokenWelcome') === 'true';
  const loginCount = parseInt(localStorage.getItem('loginCount') || '1');
  
  // Use the enhanced voice assistant with proper user tracking
  const { isSpeaking, voiceEnabled, stopAllVoiceActivity } = usePrepzrVoiceAssistant({
    userName: userProfile.name,
    isLoggedIn: true,
    isFirstTimeUser: isFirstTimeUser && !hasCompletedWelcome,
    lastActivity: lastActivity?.description
  });
  
  // Update login count on mount
  useEffect(() => {
    const currentCount = parseInt(localStorage.getItem('loginCount') || '0');
    localStorage.setItem('loginCount', (currentCount + 1).toString());
  }, []);
  
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
    
    const lowerCommand = command.toLowerCase();
    
    // Handle navigation commands
    if (lowerCommand.includes('study plan')) {
      onTabChange('study-plan');
      navigate('/dashboard/student/study-plan');
    } else if (lowerCommand.includes('concept')) {
      onTabChange('concepts');
      navigate('/dashboard/student/concepts');
    } else if (lowerCommand.includes('practice') || lowerCommand.includes('exam')) {
      onTabChange('practice-exam');
      navigate('/dashboard/student/practice-exam');
    } else if (lowerCommand.includes('academic')) {
      onTabChange('academic');
      navigate('/dashboard/student/academic');
    } else if (lowerCommand.includes('flashcard')) {
      onTabChange('flashcards');
      navigate('/dashboard/student/flashcards');
    } else if (lowerCommand.includes('overview') || lowerCommand.includes('dashboard')) {
      onTabChange('overview');
      navigate('/dashboard/student');
    }
    
    // Handle voice assistant commands
    if (lowerCommand.includes('stop') || lowerCommand.includes('quiet') || lowerCommand.includes('silence')) {
      stopAllVoiceActivity();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 ${currentMood ? `mood-${currentMood}` : ''}`}>
      <div className="flex min-h-screen">
        <main className={`transition-all duration-300 text-base flex-1 p-4 sm:p-6 pb-20 md:pb-6`}>
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
      </div>
      
      {/* Enhanced Speech Recognition Button positioned above voice assistant with higher z-index */}
      <SpeechRecognitionButton
        position="dashboard"
        onCommand={handleSpeechCommand}
        className="fixed bottom-32 right-6 z-50"
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
