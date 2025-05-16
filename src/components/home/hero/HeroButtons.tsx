
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminAuth } from "@/contexts/auth/AdminAuthContext";

interface HeroButtonsProps {
  scrollToFeatures?: () => void;
  onAnalyzeClick?: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({
  scrollToFeatures,
  onAnalyzeClick,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { isAdminAuthenticated } = useAdminAuth();
  // Force component to re-render on mount to catch auth state changes
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    // Force re-render once on component mount to ensure proper button display
    forceUpdate({});
  }, []);
  
  const handleExploreFeatures = () => {
    if (scrollToFeatures) {
      scrollToFeatures();
    }
  };

  const handleAnalyze = () => {
    if (onAnalyzeClick) {
      onAnalyzeClick();
    } else {
      // Default fallback for when onAnalyzeClick is not provided
      navigate("/login");
    }
  };

  const handleDashboard = () => {
    if (isAdminAuthenticated) {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard/student");
    }
  };

  // Check current auth state directly from localStorage to avoid stale state
  const checkActualAuthState = () => {
    const isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    return isUserLoggedIn || isAdminLoggedIn;
  };

  // Show different buttons based on authentication state
  if (checkActualAuthState()) {
    // Get user role to determine which dashboard link to show
    const userData = localStorage.getItem('userData');
    const adminData = localStorage.getItem('admin_user');
    const isAdmin = !!adminData && adminData.includes('admin');
    
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="font-semibold rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8"
          onClick={() => isAdmin ? navigate("/admin/dashboard") : navigate("/dashboard/student")}
        >
          Go to {isAdmin ? "Admin" : ""} Dashboard <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="font-semibold border-2 rounded-full shadow px-8" 
          onClick={handleExploreFeatures}
        >
          Explore Features
        </Button>
      </div>
    );
  }

  // Show these buttons when logged out
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        size="lg" 
        className="font-semibold rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8"
        onClick={handleAnalyze}
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Exam Readiness Analyzer
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        className="font-semibold border-2 rounded-full shadow px-8" 
        onClick={() => navigate('/signup')}
      >
        Start 7-Day Free Trial
      </Button>
    </div>
  );
};

export default HeroButtons;
