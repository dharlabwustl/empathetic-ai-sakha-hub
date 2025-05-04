
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeSlider from '@/components/welcome/WelcomeSlider';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import { useToast } from "@/hooks/use-toast";

const PostLoginWelcomeBack = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>({});
  const [showSlider, setShowSlider] = useState(true);
  const [showTour, setShowTour] = useState(false);
  
  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // If no user data, redirect to login
      navigate('/login');
      return;
    }
    
    // For new users (who came from signup), show tour immediately after welcome slider
    const isNewUser = localStorage.getItem('new_user_signup') === 'true';
    const sawWelcomeSlider = localStorage.getItem('sawWelcomeSlider') === 'true';
    
    // Check if new user and handle tour accordingly
    if (isNewUser) {
      // Skip welcome slider if they saw it already
      setShowSlider(!sawWelcomeSlider);
      
      // Show tour if they haven't seen it yet, after welcome slider
      if (sawWelcomeSlider) {
        setShowSlider(false);
        setShowTour(true);
      }
      return;
    }
    
    // For returning users who have seen both, skip directly to dashboard
    const sawWelcomeTour = localStorage.getItem('sawWelcomeTour') === 'true';
    
    if (sawWelcomeSlider && sawWelcomeTour) {
      navigate('/dashboard/student');
      return;
    }
    
    // If they've seen the slider but not the tour, show only the tour
    if (sawWelcomeSlider && !sawWelcomeTour) {
      setShowSlider(false);
      setShowTour(true);
    }
    
    // Auto-redirect after 45 seconds if no action taken
    const timer = setTimeout(() => {
      navigate('/dashboard/student');
      toast({
        title: "Welcome to PREPZR!",
        description: "You've been automatically redirected to Today's Plan.",
      });
    }, 45000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast]);

  const handleSliderComplete = () => {
    // Mark that they've seen the welcome slider
    localStorage.setItem('sawWelcomeSlider', 'true');
    setShowSlider(false);
    setShowTour(true); // Show tour immediately after welcome slider for new users
  };
  
  const handleTourSkip = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    navigate('/dashboard/student');
    toast({
      title: "Welcome to your dashboard!",
      description: "You can always access the tour again from the help menu."
    });
  };
  
  const handleTourComplete = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    navigate('/dashboard/student');
    toast({
      title: "Tour Completed!",
      description: "You're all set to start using PREPZR. Happy studying!"
    });
  };

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
          showFounderTabFirst={true} // Show founder tab first in the tour
        />
      </div>
    );
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
