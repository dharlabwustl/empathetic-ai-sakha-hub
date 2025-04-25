
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function useInitialization() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const initializeDashboard = async () => {
    try {
      setLoading(true);
      
      // Check if user needs onboarding
      const userData = localStorage.getItem("userData");
      const isNewUser = new URLSearchParams(location.search).get('new') === 'true';
      
      let shouldShowOnboarding = false;
      let shouldShowWelcomeTour = false;
      
      if (userData) {
        const parsedData = JSON.parse(userData);
        shouldShowOnboarding = !parsedData.completedOnboarding;
        shouldShowWelcomeTour = !parsedData.sawWelcomeTour && !shouldShowOnboarding;
      } else {
        // If no user data, create default data
        shouldShowOnboarding = true;
        const defaultUserData = {
          completedOnboarding: false,
          sawWelcomeTour: false,
          lastLogin: new Date().toISOString(),
        };
        localStorage.setItem("userData", JSON.stringify(defaultUserData));
        
        // If this is a new user coming from signup, redirect to onboarding
        if (isNewUser) {
          navigate('/dashboard/student/overview?completedOnboarding=false', { replace: true });
        }
      }
      
      setShowOnboarding(shouldShowOnboarding);
      setShowWelcomeTour(shouldShowWelcomeTour);
    } catch (error) {
      console.error("Dashboard initialization error:", error);
      toast({
        title: "Error",
        description: "Failed to initialize dashboard",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    showOnboarding,
    showWelcomeTour,
    setShowOnboarding,
    setShowWelcomeTour,
    initializeDashboard
  };
}
