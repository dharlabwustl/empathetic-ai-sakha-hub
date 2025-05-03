
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WelcomeSlider from '@/components/welcome/WelcomeSlider';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/auth/AuthContext';
import PostLoginWelcome from '@/components/login/PostLoginWelcome';
import LoadingScreen from '@/components/common/LoadingScreen';

const PostLoginWelcomeBack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, user, loading, checkAuth } = useAuth();
  
  const [userData, setUserData] = useState<any>({});
  const [showSlider, setShowSlider] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authentication status first
  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        const isAuth = await checkAuth();
        if (!isAuth) {
          // If not authenticated after check, redirect to login
          navigate('/login', { replace: true });
          return;
        }
      }
      setIsLoading(false);
    };
    
    verifyAuth();
  }, [isAuthenticated, checkAuth, navigate]);
  
  useEffect(() => {
    if (isLoading || loading) return;
    
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        
        // Determine what screen to show
        const sawWelcomeSlider = localStorage.getItem('sawWelcomeSlider') === 'true';
        const sawWelcomeTour = localStorage.getItem('sawWelcomeTour') === 'true';
        const isFirstLogin = parsedData.loginCount === 1;
        
        // For first-time users: show welcome slider followed by tour
        if (isFirstLogin && !sawWelcomeSlider) {
          setShowSlider(true);
          setShowTour(false);
          setShowWelcomeBack(false);
        }
        // If they've seen the slider but not the tour
        else if (!sawWelcomeTour) {
          setShowSlider(false);
          setShowTour(true);
          setShowWelcomeBack(false);
        }
        // Returning users: show welcome back with pending tasks
        else {
          setShowSlider(false);
          setShowTour(false);
          setShowWelcomeBack(true);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setShowWelcomeBack(true); // Default to welcome back screen
      }
    } else {
      // If no user data but authenticated, create minimal user data
      if (user) {
        const newUserData = {
          name: user.name,
          email: user.email,
          loginCount: 1,
          lastLogin: new Date().toISOString()
        };
        localStorage.setItem("userData", JSON.stringify(newUserData));
        setUserData(newUserData);
        setShowSlider(true);
      } else {
        // Something went wrong, redirect to login
        navigate('/login');
        return;
      }
    }
    
    // Auto-redirect after 45 seconds if no action taken
    const timer = setTimeout(() => {
      navigate('/dashboard/student/today');
      toast({
        title: "Welcome to PREPZR!",
        description: "You've been automatically redirected to Today's Plan.",
      });
    }, 45000);
    
    return () => clearTimeout(timer);
  }, [isLoading, loading, navigate, toast, user]);

  const handleSliderComplete = () => {
    // Mark that they've seen the welcome slider
    localStorage.setItem('sawWelcomeSlider', 'true');
    setShowSlider(false);
    setShowTour(true);
    setShowWelcomeBack(false);
  };
  
  const handleTourSkip = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    setShowWelcomeBack(true);
    setShowTour(false);
    
    toast({
      title: "Welcome to your dashboard!",
      description: "You can always access the tour again from the help menu."
    });
  };
  
  const handleTourComplete = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    setShowWelcomeBack(true);
    setShowTour(false);
    
    toast({
      title: "Tour Completed!",
      description: "You're all set to start using PREPZR. Happy studying!"
    });
  };

  if (isLoading || loading) {
    return <LoadingScreen message="Preparing your personalized dashboard..." />;
  }

  // If showing welcome slider
  if (showSlider) {
    return <WelcomeSlider onComplete={handleSliderComplete} userData={userData} />;
  }
  
  // If showing welcome tour
  if (showTour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-purple-950/30">
        <WelcomeTour 
          open={true} 
          onOpenChange={() => {}} 
          onSkipTour={handleTourSkip} 
          onCompleteTour={handleTourComplete}
          isFirstTimeUser={true}
          loginCount={1}
        />
      </div>
    );
  }
  
  // If showing welcome back with pending tasks
  if (showWelcomeBack) {
    return <PostLoginWelcome />;
  }
  
  // Default loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <p className="text-xl">Loading your personalized dashboard...</p>
      </div>
    </div>
  );
};

export default PostLoginWelcomeBack;
