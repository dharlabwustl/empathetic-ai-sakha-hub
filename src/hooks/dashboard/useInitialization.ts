
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { handleNewUser } from "@/pages/dashboard/student/utils/UserSessionManager";

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
      const { shouldShowOnboarding, shouldShowWelcomeTour } = handleNewUser(location, navigate);
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
