
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroButtonsProps {
  scrollToFeatures?: () => void;
  onAnalyzeClick?: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({
  scrollToFeatures,
  onAnalyzeClick,
}) => {
  const navigate = useNavigate();
  
  // Use state to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check auth status on mount and when auth events occur
  useEffect(() => {
    const checkAuthStatus = () => {
      const studentLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      
      setIsLoggedIn(studentLoggedIn || adminLoggedIn);
      setIsAdmin(adminLoggedIn);
    };
    
    // Check on component mount
    checkAuthStatus();
    
    // Add event listener for auth state changes
    window.addEventListener('auth-state-changed', checkAuthStatus);
    
    // Add event listener for storage changes (for multi-tab support)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('auth-state-changed', checkAuthStatus);
      window.removeEventListener('storage', checkAuthStatus);
    };
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
      navigate("/login");
    }
  };

  const handleDashboard = () => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard/student");
    }
  };

  // Show different buttons based on authentication state
  if (isLoggedIn) {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="font-semibold rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8"
          onClick={handleDashboard}
        >
          Go to {isAdmin ? "Admin" : "Student"} Dashboard <ArrowRight className="ml-2 h-5 w-5" />
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
