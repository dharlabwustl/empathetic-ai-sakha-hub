
import { useEffect } from "react";
import { UserRole } from "@/types/user";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { useInitialization } from "./dashboard/useInitialization";
import { useNavigation } from "./dashboard/useNavigation";
import { useActivityTracking } from "./dashboard/useActivityTracking";
import { getGreeting } from "@/utils/timeUtils";

export const useStudentDashboard = () => {
  const { userProfile, loading: profileLoading, updateUserProfile } = useUserProfile(UserRole.Student);
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking(UserRole.Student);
  const { 
    loading, 
    showOnboarding, 
    showWelcomeTour, 
    setShowOnboarding,
    setShowWelcomeTour,
    initializeDashboard 
  } = useInitialization();
  
  const navigation = useNavigation();
  const { lastActivity, suggestedNextAction } = useActivityTracking();

  useEffect(() => {
    initializeDashboard();
  }, []);

  useEffect(() => {
    if (!profileLoading) {
      if (userProfile && !showOnboarding) {
        const currentLoginCount = userProfile.loginCount || 0;
        
        if (!sessionStorage.getItem('session_active')) {
          updateUserProfile({
            loginCount: currentLoginCount + 1
          } as Partial<typeof userProfile>);
          
          sessionStorage.setItem('session_active', 'true');
        }
      }
    }
  }, [profileLoading, userProfile, showOnboarding, updateUserProfile]);

  // Use the utility function to get the greeting based on current time
  const now = new Date();
  const currentTime = getGreeting(now.getHours());

  const features = {
    overview: true,
    subjects: true,
    quizzes: true,
    resources: true,
    community: true,
    progress: true,
    settings: true,
  };

  return {
    loading: loading || profileLoading,
    userProfile,
    ...navigation,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    kpis,
    nudges,
    features,
    lastActivity,
    suggestedNextAction,
    markNudgeAsRead,
    handleSkipTour: () => {
      setShowWelcomeTour(false);
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.sawWelcomeTour = true;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      }
    },
    handleCompleteTour: () => {
      setShowWelcomeTour(false);
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.sawWelcomeTour = true;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      }
    },
    handleCompleteOnboarding: () => {
      setShowOnboarding(false);
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.completedOnboarding = true;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      }
      setShowWelcomeTour(true);
    }
  };
};
