
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { handleNewUser } from "@/pages/dashboard/student/utils/UserSessionManager";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { UserRole } from "@/types/user/base";

export const useStudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [lastActivity, setLastActivity] = useState<{ type: string, description: string } | null>(null);
  const [suggestedNextAction, setSuggestedNextAction] = useState<string | null>(null);
  const { userProfile, loading: profileLoading, updateUserProfile } = useUserProfile(UserRole.Student);
  const { kpis, nudges, markNudgeAsRead } = useKpiTracking(UserRole.Student);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { tab } = useParams<{ tab?: string }>();
  
  const [activeTab, setActiveTab] = useState(tab || "overview");
  
  const now = new Date();
  const hour = now.getHours();
  let currentTime = "";
  
  if (hour < 12) currentTime = "Good Morning";
  else if (hour < 17) currentTime = "Good Afternoon";
  else currentTime = "Good Evening";
  
  const features = {
    overview: true,
    subjects: true,
    quizzes: true,
    resources: true,
    community: true,
    progress: true,
    settings: true,
  };
  
  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);
  
  useEffect(() => {
    console.log("useStudentDashboard - Initializing dashboard");
    
    const initDashboard = async () => {
      try {
        setLoading(true);
        
        // Check URL params
        const params = new URLSearchParams(location.search);
        const isNewUser = params.get('new') === 'true';
        const completedOnboarding = params.get('completedOnboarding') === 'true';
        
        // Check local storage data
        const userData = localStorage.getItem("userData");
        const parsedUserData = userData ? JSON.parse(userData) : null;
        
        // Set onboarding states based on userData and URL params
        let shouldShowOnboarding = false;
        let shouldShowWelcomeTour = false;
        
        // Respect explicit URL parameters first (deep linking)
        if (completedOnboarding === false) {
          shouldShowOnboarding = true;
          shouldShowWelcomeTour = false;
        } else if (isNewUser) {
          shouldShowOnboarding = false;
          shouldShowWelcomeTour = true;
        } else if (parsedUserData) {
          // Then check localStorage data
          shouldShowOnboarding = parsedUserData.completedOnboarding === false;
          shouldShowWelcomeTour = parsedUserData.sawWelcomeTour === false;
        }
        
        console.log("useStudentDashboard - Session result:", { 
          shouldShowOnboarding, 
          shouldShowWelcomeTour,
          isNewUser,
          completedOnboarding
        });
        
        setShowOnboarding(shouldShowOnboarding);
        setShowWelcomeTour(shouldShowWelcomeTour);
        
        // Setup last activity and suggested actions for returning users
        if (!shouldShowOnboarding && parsedUserData) {
          if (parsedUserData.lastActivity) {
            setLastActivity(parsedUserData.lastActivity);
          } else {
            setLastActivity({
              type: "login",
              description: "You last logged in yesterday"
            });
          }
          
          if (parsedUserData.completedModules && parsedUserData.completedModules.length > 0) {
            const lastModule = parsedUserData.completedModules[parsedUserData.completedModules.length - 1];
            setSuggestedNextAction(`Continue with ${lastModule.nextModule || "Practice Exercises"}`);
          } else {
            setSuggestedNextAction("Start today's recommended study plan");
          }
        }
        
        // Update login count for existing users
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
      } finally {
        if (!profileLoading) {
          setLoading(false);
        }
      }
    };
    
    initDashboard();
  }, [location, navigate, profileLoading, userProfile, updateUserProfile, toast]);
  
  useEffect(() => {
    if (!profileLoading) {
      setLoading(false);
    }
  }, [profileLoading]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/student/${tab}`);
  };
  
  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };
  
  const toggleTabsNav = () => {
    setHideTabsNav(!hideTabsNav);
  };
  
  const handleSkipTour = () => {
    setShowWelcomeTour(false);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
  };
  
  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.sawWelcomeTour = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
    
    toast({
      title: "Welcome to Prepzr!",
      description: "You're all set to start your personalized learning journey.",
    });
  };
  
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.completedOnboarding = true;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }
    
    setShowWelcomeTour(true);
    
    toast({
      title: "Onboarding Complete!",
      description: "Your personalized learning plan is ready.",
    });
  };
  
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };
  
  return {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    features,
    lastActivity,
    suggestedNextAction,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  };
};
