
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeSlider from '@/components/welcome/WelcomeSlider';
import WelcomeTour from '@/components/dashboard/student/WelcomeTour';
import { useToast } from "@/hooks/use-toast";
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';

const PostLoginWelcomeBack = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>({});
  const [showSlider, setShowSlider] = useState(true);
  const [showTour, setShowTour] = useState(false);
  const [userName, setUserName] = useState("Student");
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  
  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
        
        if (parsedData.isFirstTimeUser) {
          setIsFirstTimeUser(true);
        }
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // If no user data, redirect to login
      navigate('/login');
      return;
    }
    
    // For new users (who came from signup), go directly to tour
    // This is because they would have gone through the welcome-flow already
    const isNewUser = localStorage.getItem('new_user_signup') === 'true';
    const sawWelcomeSlider = localStorage.getItem('sawWelcomeSlider') === 'true';
    
    if (isNewUser) {
      // For new users, show tour immediately after welcome slider
      if (sawWelcomeSlider) {
        setShowSlider(false);
        setShowTour(true);
      }
      
      // Ensure we've set the login flag
      localStorage.setItem('isLoggedIn', 'true');
      return;
    }
    
    // For returning users who have seen both, skip directly to dashboard
    const sawWelcomeTour = localStorage.getItem('sawWelcomeTour') === 'true';
    
    if (sawWelcomeSlider && sawWelcomeTour) {
      navigate('/dashboard/student', { replace: true });
      return;
    }
    
    // If they've seen the slider but not the tour, show only the tour
    if (sawWelcomeSlider && !sawWelcomeTour) {
      setShowSlider(false);
      setShowTour(true);
    }
    
    // Auto-redirect after 45 seconds if no action taken
    const timer = setTimeout(() => {
      // Before redirecting, ensure login flag is set
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard/student', { replace: true });
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
    setShowTour(true); // Always show tour after welcome slider for all users
  };
  
  const handleTourSkip = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    // Use direct location change to ensure we go to the dashboard
    window.location.href = '/dashboard/student';
    toast({
      title: "Welcome to your dashboard!",
      description: "You can always access the tour again from the help menu."
    });
  };
  
  const handleTourComplete = () => {
    // Mark that they've seen the welcome tour
    localStorage.setItem('sawWelcomeTour', 'true');
    // Use direct location change to ensure we go to the dashboard
    window.location.href = '/dashboard/student';
    toast({
      title: "Tour Completed!",
      description: "You're all set to start using PREPZR. Happy studying!"
    });
  };

  return (
    <>
      {/* Single voice greeting component with context awareness */}
      <VoiceGreeting 
        isFirstTimeUser={isFirstTimeUser} 
        userName={userName}
      />
      
      {/* If showing welcome slider */}
      {showSlider && <WelcomeSlider onComplete={handleSliderComplete} userData={userData} />}
      
      {/* If showing welcome tour */}
      {showTour && (
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
      )}
      
      {/* Default loading state */}
      {!showSlider && !showTour && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="text-xl">Loading your personalized dashboard...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PostLoginWelcomeBack;
