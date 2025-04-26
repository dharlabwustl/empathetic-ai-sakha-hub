
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { handleNewUser } from "@/pages/dashboard/student/utils/UserSessionManager";
import { UserProfileType } from "@/types/user";

export function useInitialization(
  userProfile: UserProfileType | null,
  updateUserProfile: (updates: Partial<UserProfileType>) => void,
  setLoading: (loading: boolean) => void,
  setShowOnboarding: (show: boolean) => void,
  setShowWelcomeTour: (show: boolean) => void,
  setLastActivity: (activity: { type: string; description: string } | null) => void,
  setSuggestedNextAction: (action: string | null) => void
) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log("useInitialization - Initializing dashboard");
    
    const initDashboard = async () => {
      try {
        setLoading(true);
        
        const { shouldShowOnboarding, shouldShowWelcomeTour } = handleNewUser(location, navigate);
        
        setShowOnboarding(shouldShowOnboarding);
        setShowWelcomeTour(shouldShowWelcomeTour);
        
        if (!shouldShowOnboarding && !shouldShowWelcomeTour) {
          const userData = localStorage.getItem("userData");
          if (userData) {
            const parsedData = JSON.parse(userData);
            
            if (parsedData.lastActivity) {
              setLastActivity(parsedData.lastActivity);
            } else {
              setLastActivity({
                type: "login",
                description: "You last logged in yesterday"
              });
            }
            
            if (parsedData.completedModules && parsedData.completedModules.length > 0) {
              const lastModule = parsedData.completedModules[parsedData.completedModules.length - 1];
              setSuggestedNextAction(`Continue with ${lastModule.nextModule || "Practice Exercises"}`);
            } else {
              setSuggestedNextAction("Start today's recommended study plan");
            }
          }
        }
        
        if (userProfile && !shouldShowOnboarding) {
          const currentLoginCount = userProfile.loginCount || 0;
          
          if (!sessionStorage.getItem('session_active')) {
            updateUserProfile({
              loginCount: currentLoginCount + 1
            } as Partial<typeof userProfile>);
            
            sessionStorage.setItem('session_active', 'true');
          }
        }
      } catch (error) {
        console.error("Dashboard initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to initialize dashboard",
          variant: "destructive",
        });
      }
    };
    
    initDashboard();
  }, [location, navigate, userProfile, updateUserProfile]);
}
