
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { handleNewUser } from "@/pages/dashboard/student/utils/UserSessionManager";
import { useKpiTracking } from "@/hooks/useKpiTracking";
import { UserRole, MoodType } from "@/types/user/base";

export const useStudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [lastActivity, setLastActivity] = useState<{ type: string, description: string } | null>(null);
  const [suggestedNextAction, setSuggestedNextAction] = useState<string | null>(null);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
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
  
  // Get current mood from local storage
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
    }
  }, []);
  
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
        
        const { shouldShowOnboarding, shouldShowWelcomeTour } = handleNewUser(location, navigate);
        
        console.log("useStudentDashboard - Session result:", { 
          shouldShowOnboarding, 
          shouldShowWelcomeTour 
        });
        
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
            
            // Set current mood if it exists
            if (parsedData.mood) {
              setCurrentMood(parsedData.mood as MoodType);
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
      } finally {
        if (!profileLoading) {
          setLoading(false);
        }
      }
    };
    
    initDashboard();
  }, [location, navigate, profileLoading, userProfile, updateUserProfile]);
  
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
      title: "Welcome to Sakha AI!",
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
  
  const updateMood = (mood: MoodType) => {
    setCurrentMood(mood);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
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
    currentMood,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav,
    updateMood
  };
};
