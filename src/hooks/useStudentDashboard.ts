
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
  let currentTime = now;
  
  // Demo features array for dashboard - properly defined as an array
  const features = [
    {
      title: "Mock Tests",
      description: "Practice with full-length exams",
      path: "/dashboard/student/practice-exam",
      icon: null,
      isPremium: false,
    },
    {
      title: "Concept Library",
      description: "Master key concepts",
      path: "/dashboard/student/concepts",
      icon: null,
      isPremium: false,
    },
    {
      title: "AI Tutor",
      description: "Get personalized help 24/7",
      path: "/dashboard/student/tutor",
      icon: null,
      isPremium: false,
    },
    {
      title: "Notes & Flashcards",
      description: "Create and manage study materials",
      path: "/dashboard/student/flashcards",
      icon: null, 
      isPremium: true,
    }
  ];
  
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
            
            // Load saved mood if available
            if (parsedData.mood) {
              setCurrentMood(parsedData.mood as MoodType);
            }
          }
        }
        
        // Check for saved mood in localStorage (preferred over userData)
        const savedMood = localStorage.getItem('currentMood') as MoodType | null;
        if (savedMood) {
          setCurrentMood(savedMood);
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
    toggleTabsNav
  };
};
